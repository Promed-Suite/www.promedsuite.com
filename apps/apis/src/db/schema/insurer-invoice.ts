import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const insurer_invoice = pgTable("insurer_invoice", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 7 }),
  invoice_date: date("invoice_date"),
  invoice_amt: numeric("invoice_amt", { precision: 10, scale: 2 }),
  client: varchar("client", { length: 10 }),
  insurer: numeric("insurer", { precision: 2 }),
  date_entered: date("date_entered"),
  user_id: varchar("user_id", { length: 100 }),
});
