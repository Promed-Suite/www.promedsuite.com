import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const capitationDeposits = pgTable("capitation_deposits", {
  code: serial("code").primaryKey(),
  provider: numeric("provider", { precision: 5, scale: 0 }),
  cheque_no: varchar("cheque_no", { length: 10 }),
  cheque_date: date("cheque_date"),
  cheque_amt: numeric("cheque_amt", { precision: 10, scale: 2 }),
  corp_id: varchar("corp_id", { length: 5 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: date("date_entered").notNull().defaultNow(),
});
