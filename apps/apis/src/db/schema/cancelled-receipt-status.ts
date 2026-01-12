import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cancelledReceiptStatus = pgTable("cancelled_receipt_status", {
  id: serial("id").primaryKey(),
  receipt_no: varchar("receipt_no", { length: 50 }),
  status_date: date("status_date"),
  status: integer("status"),
  error: varchar("error", { length: 300 }),
});
