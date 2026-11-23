import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "./config";

export const getSession = cache(async () => {
  return auth.api.getSession({
    headers: await headers(),
  });
});

export type Session = NonNullable<Awaited<ReturnType<typeof getSession>>>;
export type SessionUser = Session["user"];
