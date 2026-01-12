import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cashBook = pgTable("cash_book", {
  trans_no: serial("trans_no").primaryKey(),
  ledger_acct: numeric("ledger_acct", { precision: 10, scale: 0 }),
  trans_date: date("trans_date"),
  receipt_no: varchar("receipt_no", { length: 10 }),
  cheque_no: varchar("cheque_no", { length: 10 }),
  debit: numeric("debit", { precision: 10, scale: 2 }),
  credit: numeric("credit", { precision: 10, scale: 2 }),
  balance: numeric("balance", { precision: 15, scale: 2 }),
  trans_type: numeric("trans_type", { precision: 2, scale: 0 }),
  date_entered: date("date_entered").notNull().defaultNow(),
  display_name: varchar("display_name", { length: 5 }),
  account: numeric("account", { precision: 5, scale: 0 }),
});
