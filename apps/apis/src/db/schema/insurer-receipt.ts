import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const insurer_receipt = pgTable("insurer_receipt", {
  idx: serial("codidxe").primaryKey(),
  receipt_no: varchar("receipt_no", { length: 7 }).notNull(),
  cheque_no: varchar("cheque_no", { length: 10 }),
  receipt_date: date("receipt_date"),
  receipt_amt: numeric("receipt_amt", { precision: 10, scale: 2 }),
  insurer: numeric("insurer", { precision: 2 }),
  invoice_no: varchar("invoice_no", { length: 20 }),
  client: varchar("client", { length: 10 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  bank: numeric("bank", { precision: 10 }),
});
