import { numeric, pgTable, serial } from "drizzle-orm/pg-core";

export const discount_rate = pgTable("discount_rate", {
  code: serial("code").primaryKey(),
  min_discount_amount: numeric("min_discount_amount", {
    precision: 20,
    scale: 2,
  }),
  discount_level: numeric("discount_level", { precision: 2, scale: 0 }),
  provider: numeric("provider", { precision: 10, scale: 0 }),
  discount: numeric("discount", { precision: 7, scale: 2 }),
  max_discount_amt: numeric("max_discount_amt", { precision: 20, scale: 2 }),
});
