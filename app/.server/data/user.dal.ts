import { db } from "../db/database";

export async function getUser(userId: number) {
  const user = await db.query.user.findFirst({
    where: (f, { eq }) => eq(f.id, userId),
  });

  return user ?? null;
}
