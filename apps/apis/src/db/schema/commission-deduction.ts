import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const commissionDeduction = pgTable("commission_deduction", {
  idx: serial("idx").primaryKey(),
  deduction: numeric("deduction", { precision: 10, scale: 2 }).notNull(),
  voucher_no: varchar("voucher_no", { length: 10 }).notNull(),
  payment_no: numeric("payment_no", { precision: 5, scale: 0 }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  receipt_no: varchar("receipt_no", { length: 15 }),
});
