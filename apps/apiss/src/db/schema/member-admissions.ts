import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const member_admissions = pgTable("member_admissions", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  hospital: varchar("hospital", { length: 40 }),
  attending_doc: varchar("attending_doc", { length: 40 }),
  addmission_date: date("addmission_date"),
  discharge_date: date("discharge_date"),
  addmission_no: varchar("addmission_no", { length: 10 }),
});
