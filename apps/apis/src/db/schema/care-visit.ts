import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const careVisit = pgTable("care_visit", {
  visit_no: serial("visit_no").primaryKey(),
  member_no: varchar("member_no", { length: 15 }),
  pre_auth_no: numeric("pre_auth_no", { precision: 7, scale: 0 }),
  visit_date: date("visit_date"),
  visited_by: varchar("visited_by", { length: 10 }),
  presented: numeric("presented", { precision: 3, scale: 0 }),
  incurred_amt: numeric("incurred_amt", { precision: 10, scale: 2 }),
  exp_discharge_date: date("exp_discharge_date"),
  care_nurse_comments: varchar("care_nurse_comments", { length: 70 }),
  doc_comments: varchar("doc_comments", { length: 70 }),
});
