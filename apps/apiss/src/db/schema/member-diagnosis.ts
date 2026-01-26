import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const member_diagnosis = pgTable("member_diagnosis", {
  idx: serial("idx").primaryKey(),
  claim_no: varchar("claim_no", { length: 25 }).notNull(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  diagnosis: numeric("diagnosis", { precision: 5 }).notNull(),
  id: numeric("id", { precision: 10 }),
});
