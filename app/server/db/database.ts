import { drizzle } from "drizzle-orm/postgres-js";

import * as relations from "./relations.db";
import * as schema from "./schema.db";

export const db = drizzle(process.env.DATABASE_URL!, {
  // logger: true,
  casing: "snake_case",
  schema: {
    ...schema,
    ...relations,
  },
});

export * from "./types.db";

export { schema };
