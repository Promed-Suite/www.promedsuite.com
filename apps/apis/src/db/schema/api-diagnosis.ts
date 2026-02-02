import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const apiDiagnosis = pgTable("api_diagnosis", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 50 }).notNull(),
  invoice_no: varchar("invoice_no", { length: 255 }).notNull(),
  diagnosis: varchar("diagnosis", { length: 255 }).notNull(),
  parent_id: varchar("parent_id", { length: 255 }),
});
