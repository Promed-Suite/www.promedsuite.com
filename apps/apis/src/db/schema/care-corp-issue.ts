import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const careCorpIssue = pgTable("care_corp_issue", {
  code: serial("code").primaryKey(),
  corp_issue: varchar("corp_issue", { length: 30 }),
});
