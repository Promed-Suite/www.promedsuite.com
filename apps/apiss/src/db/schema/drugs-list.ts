import {
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const drugs_list = pgTable("drugs_list", {
  code: numeric("code", { precision: 10, scale: 0 }).primaryKey(),
  drug_code: varchar("drug_code", { length: 10 }),
  drug_name: varchar("drug_name", { length: 50 }),
  unit_price: numeric("unit_price", { precision: 10, scale: 2 }),
  updated: timestamp("updated"),
});
