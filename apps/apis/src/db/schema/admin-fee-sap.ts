import { char, date, numeric, pgTable, serial } from "drizzle-orm/pg-core";

export const adminFeeSap = pgTable("admin_fee_sap", {
  idx: serial("idx").primaryKey(),
  invoice_no: char("invoice_no", { length: 50 }).notNull(),
  invoice_date: date("invoice_date"),
  admin_acct: char("admin_acct", { length: 50 }),
  admin_amount: numeric("admin_amount", { precision: 10, scale: 2 }),
  admin_cost_crt: char("admin_cost_crt", { length: 20 }),
  admin_dr_cr: char("admin_dr_cr", { length: 5 }),
  admin_narr: char("admin_narr", { length: 50 }),
  admin_profit_crt: char("admin_profit_crt", { length: 20 }),
  admin_currency: char("admin_currency", { length: 5 }),
  agent_type: char("agent_type", { length: 5 }),
  fund_acct: char("fund_acct", { length: 20 }),
  fund_amt: numeric("fund_amt", { precision: 10, scale: 2 }),
  fund_currency: char("fund_currency", { length: 5 }),
  fund_cost_crt: char("fund_cost_crt", { length: 20 }),
  fund_profit_crt: char("fund_profit_crt", { length: 20 }),
  fund_dr_cr: char("fund_dr_cr", { length: 5 }),
  fund_narr: char("fund_narr", { length: 50 }),
});
