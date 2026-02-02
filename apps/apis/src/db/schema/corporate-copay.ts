import { char, decimal, integer, pgTable, serial } from "drizzle-orm/pg-core";

export const corporateCopay = pgTable("corporate_copay", {
  copay_id: serial("copay_id").primaryKey(),
  benefit: integer("benefit"),
  copay_amt: decimal("copay_amt", { precision: 10, scale: 2 }),
  service: integer("service"),
  all_provider: integer("all_provider"),
  provider: integer("provider"),
  provider_class: integer("provider_class"),
  category: char("category", { length: 10 }),
  product_id: integer("product_id"),
});
