import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const claimsBatch = pgTable("claims_batch", {
  idx: serial("idx").primaryKey(),
  batch_no: varchar("batch_no", { length: 10 }),
  batch_date: date("batch_date"),
  batch_user: varchar("batch_user", { length: 100 }),
  claims_count: numeric("claims_count", { precision: 3, scale: 0 }),
  data_entry_user: varchar("data_entry_user", { length: 100 }),
  date_entry_date: date("date_entry_date"),
  vetting_user: varchar("vetting_user", { length: 100 }),
  vetting_user_date: date("vetting_user_date"),
  authorising_user: varchar("authorising_user", { length: 100 }),
  authorising_user_date: date("authorising_user_date"),
  finance_user: varchar("finance_user", { length: 100 }),
  finance_user_date: date("finance_user_date"),
  provider: numeric("provider", { precision: 5, scale: 0 }),
  date_received: date("date_received"),
});
