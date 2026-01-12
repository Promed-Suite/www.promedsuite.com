import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const billDetails = pgTable("bill_details", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 20 }).notNull(),
  service: varchar("service", { length: 10 }).notNull(),
  name: varchar("name", { length: 50 }),
  quantity: numeric("quantity", { precision: 30, scale: 0 }).notNull(),
  cost: numeric("quantity", { precision: 30, scale: 0 }).notNull(),
  member_no: varchar("member_no", { length: 30 }),
  parent_id: varchar("parent_id", { length: 100 }),
});
