import { createClient } from "@libsql/client";
import { hashPassword } from "better-auth/crypto";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnvLocal() {
  try {
    const p = resolve(process.cwd(), ".env.local");
    const raw = readFileSync(p, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const k = m[1];
      let v = m[2];
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      if (!(k in process.env)) process.env[k] = v;
    }
  } catch {
    // ignore
  }
}

loadEnvLocal();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url) throw new Error("Missing TURSO_DATABASE_URL");

const name = process.argv[2];
const email = process.argv[3];
const password = process.argv[4];
if (!name || !email || !password) {
  console.error("Usage: node scripts/migrate-auth-phase1.mjs <name> <email> <password>");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function columnExists(table, column) {
  const rs = await client.execute(`PRAGMA table_info(${table})`);
  return rs.rows.some((r) => String(r.name) === column);
}

async function count(table) {
  const rs = await client.execute(`SELECT COUNT(*) as c FROM ${table}`);
  return Number(rs.rows[0].c);
}

async function main() {
  console.log("== Pre-migration counts ==");
  for (const t of ["seguimiento_student", "seguimiento_comment"]) {
    console.log(`${t}:`, await count(t));
  }

  console.log("\n== Creating auth tables ==");
  await client.execute(`CREATE TABLE IF NOT EXISTS user (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    email_verified INTEGER NOT NULL DEFAULT 0,
    image TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`);
  await client.execute(`CREATE TABLE IF NOT EXISTS session (
    id TEXT PRIMARY KEY NOT NULL,
    expires_at INTEGER NOT NULL,
    token TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE
  )`);
  await client.execute(`CREATE TABLE IF NOT EXISTS account (
    id TEXT PRIMARY KEY NOT NULL,
    account_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES user(id) ON DELETE CASCADE,
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    access_token_expires_at INTEGER,
    refresh_token_expires_at INTEGER,
    scope TEXT,
    password TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  )`);
  await client.execute(`CREATE TABLE IF NOT EXISTS verification (
    id TEXT PRIMARY KEY NOT NULL,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER,
    updated_at INTEGER
  )`);
  await client.execute(`CREATE INDEX IF NOT EXISTS session_user_idx ON session(user_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS account_user_idx ON account(user_id)`);

  console.log("\n== Adding user_id columns to seguimiento tables ==");
  if (!(await columnExists("seguimiento_student", "user_id"))) {
    await client.execute(`ALTER TABLE seguimiento_student ADD COLUMN user_id TEXT`);
    console.log("added seguimiento_student.user_id");
  } else {
    console.log("seguimiento_student.user_id already exists");
  }
  if (!(await columnExists("seguimiento_comment", "user_id"))) {
    await client.execute(`ALTER TABLE seguimiento_comment ADD COLUMN user_id TEXT`);
    console.log("added seguimiento_comment.user_id");
  } else {
    console.log("seguimiento_comment.user_id already exists");
  }
  await client.execute(`CREATE INDEX IF NOT EXISTS seguimiento_student_user_idx ON seguimiento_student(user_id)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS seguimiento_comment_user_idx ON seguimiento_comment(user_id)`);

  console.log("\n== Creating/finding seed user ==");
  const existing = await client.execute({
    sql: "SELECT id FROM user WHERE email = ? LIMIT 1",
    args: [email.toLowerCase()],
  });
  let userId;
  const now = Date.now();
  if (existing.rows.length > 0) {
    userId = String(existing.rows[0].id);
    console.log("user exists:", userId);
  } else {
    userId = randomUUID();
    const hashed = await hashPassword(password);
    await client.execute({
      sql: `INSERT INTO user (id,name,email,email_verified,image,created_at,updated_at) VALUES (?,?,?,?,?,?,?)`,
      args: [userId, name, email.toLowerCase(), 0, null, now, now],
    });
    await client.execute({
      sql: `INSERT INTO account (id,account_id,provider_id,user_id,access_token,refresh_token,id_token,access_token_expires_at,refresh_token_expires_at,scope,password,created_at,updated_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [randomUUID(), userId, "credential", userId, null, null, null, null, null, null, hashed, now, now],
    });
    console.log("created user:", userId);
  }

  console.log("\n== Backfilling seguimiento data ==");
  const s1 = await client.execute({
    sql: `UPDATE seguimiento_student SET user_id = ? WHERE user_id IS NULL`,
    args: [userId],
  });
  console.log("seguimiento_student backfilled rows:", s1.rowsAffected);
  const s2 = await client.execute({
    sql: `UPDATE seguimiento_comment SET user_id = ? WHERE user_id IS NULL`,
    args: [userId],
  });
  console.log("seguimiento_comment backfilled rows:", s2.rowsAffected);

  console.log("\n== Post-migration verification ==");
  for (const t of ["seguimiento_student", "seguimiento_comment"]) {
    const total = await count(t);
    const nulls = await client.execute(`SELECT COUNT(*) as c FROM ${t} WHERE user_id IS NULL`);
    console.log(`${t}: total=${total} null_user_id=${Number(nulls.rows[0].c)}`);
  }
  const userCount = await count("user");
  console.log("user count:", userCount);
  console.log("seed user id:", userId);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
