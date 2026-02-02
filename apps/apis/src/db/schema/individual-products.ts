import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const individual_products = pgTable("individual_products", {
  id: serial("id").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }),
  category: varchar("category", { length: 10 }),
  limit_amount: numeric("limit", { precision: 10 }),
  sharing: numeric("sharing", { precision: 2 }),
  sub_limit_of: numeric("sub_limit_of", { precision: 3 }),
  benefit: numeric("benefit", { precision: 3 }),
  waiting_period: numeric("waiting_period", { precision: 5 }),
  bed_limit: numeric("bed_limit", { precision: 10, scale: 2 }),
  re_insurer: numeric("re_insurer"),
});
