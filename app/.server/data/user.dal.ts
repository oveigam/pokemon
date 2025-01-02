import { db, schema } from "../db/database";
import { hashPassword } from "../util/password";

export async function signupUser(user: {
  name: string;
  email: string;
  password: string;
  image?: string;
}) {
  const passwordHash = await hashPassword(user.password);
  const createdUser = await db
    .insert(schema.user)
    .values({
      passwordHash,
      name: user.name,
      email: user.email,
      image: user.image,
    })
    .returning({ id: schema.user.id });

  return createdUser[0]!;
}
