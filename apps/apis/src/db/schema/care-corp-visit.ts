import {
  date,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const careCorpVisit = pgTable("care_corp_visit", {
  visit_no: serial("visit_no").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  visit_date: date("visit_date").notNull(),
  visited_by: varchar("visited_by", { length: 10 }).notNull(),
  met_with: varchar("met_with", { length: 30 }),
  next_visit_date: date("next_visit_date"),
  met_with_title: numeric("met_with_title", { precision: 3, scale: 0 }),
});
