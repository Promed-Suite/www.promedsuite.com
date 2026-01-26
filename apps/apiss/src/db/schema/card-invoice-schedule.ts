import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cardInvoiceSchedule = pgTable("card_invoice_schedule", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 30 }),
  corp_id: varchar("corp_id", { length: 30 }),
  invoice_no: varchar("invoice_no", { length: 30 }),
  narr: varchar("narr", { length: 10 }),
  date_entered: date("date_entered").notNull().defaultNow(),
  user_id: varchar("user_id", { length: 100 }),
});
