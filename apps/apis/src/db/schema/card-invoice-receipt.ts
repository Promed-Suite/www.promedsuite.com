import {
  date,
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const cardInvoiceReceipt = pgTable("card_invoice_receipt", {
  idx: serial("idx").primaryKey(),
  receipt_no: varchar("receipt_no", { length: 50 }),
  receipt_amount: decimal("receipt_amount", { precision: 10, scale: 2 }),
  receipt_date: date("receipt_date"),
  invoice_no: varchar("invoice_no", { length: 20 }),
  corp_id: varchar("corp_id", { length: 20 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: date("date_entered").notNull().defaultNow(),
  cancelled: integer("cancelled"),
});
