import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const creditedFund = pgTable("credited_fund", {
  code: serial("code").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }),
  date_credited: date("date_credited"),
  fund_amount: numeric("fund_amount", { precision: 10, scale: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  cheque_no: varchar("cheque_no", { length: 50 }),
  receipt_no: varchar("receipt_no", { length: 20 }),
  invoice_no: varchar("invoice_no", { length: 20 }),
});
