import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const countriesTable = pgTable("country", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  country: varchar({ length: 255 }).notNull().unique(),
});
