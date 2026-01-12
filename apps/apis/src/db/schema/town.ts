import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const townsTable = pgTable("town", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  town: varchar({ length: 255 }).notNull().unique(),
});
