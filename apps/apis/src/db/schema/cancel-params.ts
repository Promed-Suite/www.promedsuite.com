import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

// CANCEL_PARAMS
export const cancelParams = pgTable("cancel_params", {
  code: serial("code").primaryKey(),
  wait_days: numeric("wait_days", { precision: 5, scale: 0 }),
  corp_id: varchar("corp_id", { length: 15 }),
  default_wait: numeric("default_wait", { precision: 15, scale: 0 }),
});
