import {
  date,
  decimal,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const cardInvoice = pgTable("card_invoice", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 30 }),
  invoice_no: varchar("invoice_no", { length: 30 }).notNull(),
  invoice_date: date("invoice_date"),
  corp_id: varchar("corp_id", { length: 10 }),
  quantity: integer("quantity"),
  card_type: integer("card_type"),
  unit_cost: decimal("unit_cost", { precision: 10, scale: 2 }),
  invoice_amount: decimal("invoice_amount", { precision: 10, scale: 2 }),
  narr: varchar("narr", { length: 10 }),
  date_entered: date("date_entered").notNull().defaultNow(),
  user_id: varchar("user_id", { length: 100 }),
});
