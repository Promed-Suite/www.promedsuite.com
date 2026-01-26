import { char, decimal, integer, pgTable, serial } from "drizzle-orm/pg-core";

export const corporateProducts = pgTable("corporate_products", {
  corp_prid: serial("corp_prid").primaryKey(),
  product_id: integer("product_id"),
  category: char("category", { length: 10 }),
  benefit: integer("benefit"),
  limit: decimal("limit", { precision: 10, scale: 2 }),
  sub_limit_of: integer("sub_limit_of"),
  sharing: integer("sharing"),
  waiting_prd: integer("waiting_prd"),
  bed_limit: decimal("bed_limit", { precision: 10, scale: 2 }),
});
