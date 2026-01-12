import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const family_deposit = pgTable("family_deposit", {
  idx: serial("idx").primaryKey(),
  anniv: numeric("anniv", { precision: 2 }),
  family_no: varchar("family_no", { length: 20 }),
  member_no: varchar("member_no", { length: 20 }),
  amount: numeric("amount", { precision: 10, scale: 2 }),
  pay_date: date("pay_date"),
  pay_mode: numeric("pay_mode", { precision: 2 }),
  cheque_no: varchar("cheque_no", { length: 10 }),
  receipt_no: varchar("receipt_no", { length: 10 }),
  bank: numeric("bank", { precision: 5 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  user_id: varchar("user_id", { length: 100 }),
  admin_fee: numeric("admin_fee", { precision: 10, scale: 2 }),
});
