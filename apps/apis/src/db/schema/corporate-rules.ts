import { char, integer, pgTable, serial } from "drizzle-orm/pg-core";

export const corporateRules = pgTable("corporate_rules", {
  rule_id: serial("rule_id").primaryKey(),
  rules: char("rules", { length: 100 }),
  min: integer("min"),
  max: integer("max"),
  product_id: integer("product_id"),
  abbreviation: char("abbreviation", { length: 5 }),
});
