import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const misc_payments = pgTable("misc_payments", {
  idx: serial("idx").primaryKey(),
  payee: numeric("payee", { precision: 2 }),
  cheque_no: varchar("cheque_no", { length: 10 }),
  cheque_date: date("cheque_date"),
  paid_amount: numeric("paid_amount", { precision: 10, scale: 2 }),
  notes: varchar("notes", { length: 50 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  user_id: varchar("user_id", { length: 100 }),
  payment_type: numeric("payment_type", { precision: 2 }),
});
