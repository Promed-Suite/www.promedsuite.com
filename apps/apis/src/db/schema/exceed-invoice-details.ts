import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const exceed_invoice_details = pgTable("exceed_invoice_details", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }),
  benefit: numeric("benefit"),
  amount: numeric("amount", { precision: 10, scale: 2 }),
  invoice_no: varchar("invoice_no", { length: 10 }),
});
