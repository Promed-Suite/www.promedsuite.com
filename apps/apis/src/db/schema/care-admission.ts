import { date, numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const careAdmission = pgTable("care_admission", {
  member_no: varchar("member_no", { length: 15 }).notNull(),
  pre_auth_no: numeric("pre_auth_no", { precision: 7, scale: 0 }).notNull(),
  provider: numeric("provider", { precision: 7, scale: 0 }).notNull(),
  date_admitted: date("date_admitted").notNull(),
  admitting_doc: varchar("admitting_doc", { length: 20 }),
  admission_no: varchar("admission_no", { length: 20 }),
  ward: varchar("ward", { length: 20 }),
  room_no: varchar("room_no", { length: 10 }),
  bed_no: varchar("bed_no", { length: 10 }),
  diagnosis: varchar("diagnosis", { length: 70 }),
  date_discharged: date("date_discharged"),
});
