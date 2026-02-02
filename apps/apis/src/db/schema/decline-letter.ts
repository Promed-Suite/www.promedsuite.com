import {
  date,
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const decline_letter = pgTable("decline_letter", {
  code: numeric("code", { precision: 10, scale: 0 }).primaryKey(),
  member_no: varchar("member_no", { length: 20 }),
  provider: numeric("provider", { precision: 10, scale: 0 }),
  decline_date: date("decline_date"),
  admitted_date: date("admitted_date"),
  decline_reason: numeric("decline_reason", { precision: 2, scale: 0 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  family_no: varchar("family_no", { length: 15 }),
  decline_notes: varchar("decline_notes", { length: 70 }),
});
