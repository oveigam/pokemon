import { createServerFn } from "@tanstack/start";
import { getCookie, setCookie } from "vinxi/http";
import { signupUser } from "./user.dal";
import { redirect } from "@tanstack/react-router";
import { createSession } from "@/server/auth/session";
import { db } from "@/server/db/database";
import { verifyPasswordHash } from "@/server/auth/password";

export const getTheme = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("ui-theme") as "light" | "dark" | "system" | undefined;
});

export const updateTheme = createServerFn({ method: "POST" })
  .validator((data: { theme: "light" | "dark" | "system" }) => data)
  .handler(({ data }) => {
    setCookie("ui-theme", data.theme); // TODO set maxAge, etc.
  });

export const getLanguage = createServerFn({ method: "GET" }).handler(() => {
  return getCookie("language") as "en" | "es" | undefined;
});

export const updateLanguage = createServerFn({ method: "POST" })
  .validator((data: { lng: "en" | "es" }) => data)
  .handler(({ data }) => {
    setCookie("language", data.lng); // TODO set maxAge, etc.
  });

export const signUpUser = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Data should be FormData");
    }
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    if (!name || !email || !password) {
      throw new Error("Fields are required");
    }

    return { name, email, password };
  })
  .handler(async ({ data }) => {
    const user = await signupUser({
      email: data.email.toString(),
      name: data.name.toString(),
      password: data.password.toString(),
    });

    const session = await createSession(user.id);
    setCookie("authentication", session.token); // TODO set maxAge, etc.

    throw redirect({ to: "/", replace: true });
  });

export const signInUser = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (!(data instanceof FormData)) {
      throw new Error("Data should be FormData");
    }
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      throw new Error("Fields are required");
    }

    return {
      email: email.toString(),
      password: password.toString(),
    };
  })
  .handler(async ({ data }) => {
    const user = await db.query.user.findFirst({
      columns: { passwordHash: true, id: true },
      where: (f, { eq }) => eq(f.email, data.email.toString()),
    });
    if (!user) {
      // Prob shouldn't give that much info
      throw new Error("User doesn't exist");
    }

    const validPassword = await verifyPasswordHash(user.passwordHash, data.password);
    if (!validPassword) {
      throw new Error("Unauthorized");
    }

    const session = await createSession(user.id);
    setCookie("authentication", session.token); // TODO set maxAge, etc.

    return session;
  });
