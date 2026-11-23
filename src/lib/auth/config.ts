import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

const isProduction = process.env.NODE_ENV === "production";
const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret && isProduction) {
  throw new Error("BETTER_AUTH_SECRET es obligatorio en producción");
}

const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3010";
const trustedOrigins = Array.from(
  new Set([baseURL, process.env.NEXT_PUBLIC_APP_URL].filter((o): o is string => Boolean(o))),
);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  secret: authSecret ?? "dev-secret-change-in-production",
  baseURL,
  trustedOrigins,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  rateLimit: {
    enabled: true,
    storage: "memory",
    window: 60,
    max: 100,
    customRules: {
      "/sign-in/email": { window: 60, max: 10 },
    },
  },
});
