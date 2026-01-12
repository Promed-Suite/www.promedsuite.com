import { numeric, pgTable, serial } from "drizzle-orm/pg-core";

export const billsParams = pgTable("bills_params", {
  code: serial("code").primaryKey(),
  stale_period: numeric("stale_period", { precision: 3, scale: 0 }),
});
