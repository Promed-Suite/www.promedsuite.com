import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const claimForm = pgTable("claim_form", {
  id: serial("id").primaryKey(),
  claim_no: varchar("claim_no", { length: 25 }),
  visit_date: date("visit_date"),
  attending_doc: numeric("attending_doc", { precision: 5, scale: 0 }),
  doctor_sign: numeric("doctor_sign", { precision: 1, scale: 0 }),
  doctor_date: date("doctor_date"),
  claim_form_signed: numeric("claim_form_signed", { precision: 1, scale: 0 }),
  date_admitted: date("date_admitted"),
  date_discharged: date("date_discharged"),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: date("date_entered").notNull().defaultNow(),
});
