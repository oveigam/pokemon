import { createServerFn } from "@tanstack/start";
import { getCookie, deleteCookie } from "vinxi/http";

import { invalidateSession, validateSessionToken } from "@/server/auth/session";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("authentication");

  if (token) {
    const session = await validateSessionToken(token);
    return session;
  }

  return null;
});

export const deleteSession = createServerFn({ method: "POST" }).handler(async () => {
  const token = getCookie("authentication");

  if (token) {
    await invalidateSession(token);
    deleteCookie("authentication");
  }

  return null;
});
