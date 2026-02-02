import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const exceeded_limit_invoice_sap = pgTable(
  "exceeded_limit_invoice_sap",
  {
    inv_id: serial("inv_id").primaryKey(),
    exceeded_acct: varchar("exceeded_acct", { length: 20 }),
    exceeded_amt: numeric("exceeded_amt", { precision: 10, scale: 2 }),
    cost_crt: varchar("cost_crt", { length: 20 }),
    currency: varchar("currency", { length: 5 }),
    exceeded_dr_cr: varchar("exceeded_dr_cr", { length: 5 }),
    narration: varchar("narration", { length: 50 }),
    profit_crt: varchar("profit_crt", { length: 20 }),
    cust_acct: varchar("cust_acct", { length: 20 }),
    cust_dr_cr: varchar("cust_dr_cr", { length: 5 }),
    sent_to_sap: varchar("sent_to_sap", { length: 1 }),
    sent_to_sap_date: timestamp("sent_to_sap_date"),
    error_msg: varchar("error_msg", { length: 300 }),
    invoice_no: varchar("invoice_no", { length: 20 }),
    invoice_date: date("invoice_date"),
  },
);
