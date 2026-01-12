import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const a = pgTable("a", {
  id: serial("id").primaryKey(),
  voucher_no: varchar("voucher_no", { length: 30 }),
  cheque_no: varchar("cheque_no", { length: 50 }),
  cheque_date: date("cheque_date"),
  cheque_amount: numeric("cheque_amount", { precision: 10, scale: 2 }),
  cheque_no_new: varchar("cheque_no_new", { length: 50 }),
});
