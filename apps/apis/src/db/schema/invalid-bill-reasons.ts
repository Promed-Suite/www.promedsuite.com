import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const invalid_bill_reasons = pgTable("invalid_bill_reasons", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 50 }).notNull(),
  service: numeric("service", { precision: 5 }).notNull(),
  provider: varchar("provider", { length: 10 }).notNull(),
  reason: numeric("reason", { precision: 5 }).notNull(),
  notes: varchar("notes", { length: 100 }),
  reference_no: varchar("reference_no", { length: 20 }),
});
