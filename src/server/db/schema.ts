import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `rell1_${name}`);

export const images = createTable(
  "image",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    fileName: d.varchar({ length: 256 }),
    imageName: d.varchar({ length: 256 }),
    imageUrl: d.varchar({ length: 1024 }).notNull(),
    userId: d.varchar({ length: 64 }).notNull(),
    brand: d.varchar({ length: 128 }), // ✅ NEW
    price: d.integer(),                // ✅ NEW
    description: d.text(),             // ✅ NEW
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  })
);

