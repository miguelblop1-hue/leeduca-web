import { getSession, type SessionUser } from "./session";

export async function getOptionalUser(): Promise<SessionUser | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export async function requireUser(): Promise<SessionUser> {
  const user = await getOptionalUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}
