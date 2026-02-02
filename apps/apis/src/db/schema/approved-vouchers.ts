import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const approvedVouchers = pgTable("approved_vouchers", {
  idx: serial("idx").primaryKey(),
  voucher_no: varchar("voucher_no", { length: 50 }).notNull(),
  approved_date: date("approved_date").notNull(),
  approved_by: varchar("approved_by", { length: 50 }).notNull(),
});
