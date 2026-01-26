import {
  date,
  decimal,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const cardInvoiceSap = pgTable("card_invoice_sap", {
  inv_id: integer("inv_id").primaryKey(),
  card_invoice_acct: varchar("card_invoice_acct", { length: 20 }),
  card_invoice_amt: decimal("card_invoice_amt", { precision: 10, scale: 2 }),
  cost_crt: varchar("cost_crt", { length: 20 }),
  currency: varchar("currency", { length: 5 }),
  card_invoice_dr_cr: varchar("card_invoice_dr_cr", { length: 5 }),
  narration: varchar("narration", { length: 50 }),
  profit_crt: varchar("profit_crt", { length: 20 }),
  cust_acct: varchar("cust_acct", { length: 20 }),
  cust_dr_cr: varchar("cust_dr_cr", { length: 5 }),
  sent_to_sap: varchar("sent_to_sap", { length: 1 }),
  sent_to_sap_date: timestamp("sent_to_sap_date"),
  error_msg: varchar("error_msg", { length: 300 }),
  invoice_no: varchar("invoice_no", { length: 20 }),
  invoice_date: date("invoice_date"),
});
