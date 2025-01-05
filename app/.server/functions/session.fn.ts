import { createServerFn } from "@tanstack/start";
import { getCookie, deleteCookie } from "vinxi/http";
import { dal } from "../data/_dal";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const token = getCookie("authentication");

  if (token) {
    const session = await dal.session.validateSessionToken(token);
    return session;
  }

  return null;
});

export const deleteSession = createServerFn({ method: "POST" }).handler(async () => {
  const token = getCookie("authentication");

  if (token) {
    await dal.session.invalidateSession(token);
    deleteCookie("authentication");
  }

  return null;
});
