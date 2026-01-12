import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const allergy = pgTable("allergy", {
  code: serial("code").primaryKey(),
  allergy: varchar("allergy", { length: 20 }).notNull(),
});
