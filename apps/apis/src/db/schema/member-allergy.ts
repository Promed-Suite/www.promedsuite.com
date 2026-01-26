import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const member_allergy = pgTable("member_allergy", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  allergy: numeric("allergy", { precision: 2 }).notNull(),
});
