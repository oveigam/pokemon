import { sha256 } from "@oslojs/crypto/sha2";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { eq, type InferInsertModel } from "drizzle-orm";
import { db, schema } from "../db/database";

export async function createSession(userId: number, expiresInDays = 30) {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);

  const token = encodeBase32LowerCaseNoPadding(bytes);

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: InferInsertModel<typeof schema.session> = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * expiresInDays),
  };

  await db.insert(schema.session).values(session);

  return { session, token };
}

export async function validateSessionToken(token: string) {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({
      user: {
        id: schema.user.id,
        name: schema.user.name,
        email: schema.user.email,
        image: schema.user.image,
        isAdmin: schema.user.isAdmin,
      },
      session: schema.session,
    })
    .from(schema.session)
    .innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
    .where(eq(schema.session.id, sessionId));

  if (result.length < 1) {
    // Validate session exists
    return null;
  }

  const { user, session } = result[0]!;

  if (Date.now() >= session.expiresAt.getTime()) {
    // Validate session is not expired and delete it if expired
    await invalidateSession(session.id);
    return null;
  }

  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    // Validate session is close to expire (15 days) and extend it
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(schema.session)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(schema.session.id, session.id));
  }

  return { user, session };
}

export async function invalidateSession(sessionId: string) {
  const session = await db.query.session.findFirst({
    where: (f, { eq }) => eq(f.id, sessionId),
    columns: {},
    with: {
      user: {
        columns: { id: true, email: true },
      },
    },
  });
  if (session) {
    if (!session.user.email) {
      // user anonimo, lo borramos
      await db.delete(schema.user).where(eq(schema.user.id, session.user.id));
    } else {
      await db.delete(schema.session).where(eq(schema.session.id, sessionId));
    }
  }
}
