import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const exceed_invoice_sap = pgTable("exceed_invoice_sap", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 20 }),
  invoice_date: date("invoice_date"),
  exceeded_acct: varchar("exceeded_acct", { length: 20 }),
  invoice_amount: numeric("invoice_amount", { precision: 10, scale: 2 }),
  cost_crt: varchar("cost_crt", { length: 20 }),
  dr_cr: varchar("dr_cr", { length: 5 }),
  profit_crt: varchar("profit_crt", { length: 20 }),
  client_no: varchar("client_no", { length: 20 }),
  client_name: varchar("client_name", { length: 70 }),
  payment_type: varchar("payment_type", { length: 10 }),
  user_id: varchar("user_id", { length: 100 }),
  sent_status: varchar("sent_status", { length: 1 }),
  sent_date: timestamp("sent_date"),
  error_msg: varchar("error_msg", { length: 300 }),
});
