import {
  char,
  date,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const adminFeeReceipt = pgTable("admin_fee_receipt", {
  idx: serial("idx").primaryKey(),
  receipt_no: char("receipt_no", { length: 50 }).notNull(),
  receipt_date: date("receipt_date").notNull(),
  receipt_amt: numeric("receipt_amt", { precision: 10, scale: 2 }).notNull(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  date_entered: date("date_entered").defaultNow(),
  user_id: varchar("user_id", { length: 100 }),
  invoice_no: varchar("invoice_no", { length: 20 }),
});
