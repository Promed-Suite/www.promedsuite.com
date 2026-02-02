import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const claimLines = pgTable("claim_lines", {
  id: serial("id").primaryKey(),
  item_name: varchar("item_name", { length: 255 }),
  quantity: numeric("quantity", { precision: 5, scale: 0 }),
  unit_price: numeric("unit_price", { precision: 15, scale: 2 }),
  total_amount: numeric("total_amount", { precision: 15, scale: 2 }),
  claim_no: varchar("claim_no", { length: 100 }),
});
