import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const invoice_detail = pgTable("invoice_detail", {
  code: serial("code").primaryKey(),
  service: numeric("service", { precision: 2 }),
  claim_no: varchar("claim_no", { length: 15 }),
  invoice_no: varchar("invoice_no", { length: 15 }),
  item_id: varchar("item_id", { length: 10 }),
  unit_cost: numeric("unit_cost", { precision: 10, scale: 2 }),
  quantity: numeric("quantity", { precision: 10, scale: 2 }),
  expected_cost: numeric("expected_cost", { precision: 10, scale: 2 }),
  invoiced_cost: numeric("invoiced_cost", { precision: 10, scale: 2 }),
});
