import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const invalid_bills = pgTable("invalid_bills", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 50 }).notNull(),
  service: numeric("service", { precision: 2 }).notNull(),
  provider: numeric("provider", { precision: 5 }).notNull(),
  valid: numeric("valid", { precision: 1 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  member_no: varchar("member_no", { length: 20 }),
  invoice_amt: numeric("invoice_amt", { precision: 10, scale: 2 }),
  invoice_date: date("invoice_date"),
  batch_no: varchar("batch_no", { length: 10 }),
  reference_no: varchar("reference_no", { length: 20 }),
});
