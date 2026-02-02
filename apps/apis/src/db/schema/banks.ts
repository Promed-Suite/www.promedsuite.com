import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const banksTable = pgTable("bank", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  bank: varchar({ length: 255 }).notNull().unique(),
});
