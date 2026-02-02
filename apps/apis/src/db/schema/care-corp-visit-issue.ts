import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const careCorpVisitIssue = pgTable("care_corp_visit_issue", {
  issue_no: serial("issue_no").primaryKey(),
  visit_no: numeric("visit_no", { precision: 5, scale: 0 }),
  issue: numeric("issue", { precision: 3, scale: 0 }),
  assign_to: varchar("assign_to", { length: 10 }),
  complete_by: date("complete_by"),
  completed_on: date("completed_on"),
});
