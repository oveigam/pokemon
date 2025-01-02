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
    .returning({
      id: schema.user.id,
      name: schema.user.name,
      email: schema.user.email,
      image: schema.user.image,
      isAdmin: schema.user.isAdmin,
    });

  return createdUser[0]!;
}
