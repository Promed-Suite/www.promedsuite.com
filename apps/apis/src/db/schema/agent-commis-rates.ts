import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const agentCommisRates = pgTable("agent_commis_rates", {
  idx: serial("idx").primaryKey(),
  agent_id: varchar("agent_id", { length: 50 }),
  benefit: numeric("benefit", { precision: 3, scale: 0 }),
  newbuz: numeric("newbuz", { precision: 5, scale: 2 }),
  renewalbuz: numeric("renewalbuz", { precision: 5, scale: 2 }),
  withholding_tax: numeric("withholding_tax", { precision: 5, scale: 2 }),
  override_new_intermediary: numeric("override_new_intermediary", {
    precision: 5,
    scale: 2,
  }),
  override_new_direct: numeric("override_new_direct", {
    precision: 5,
    scale: 2,
  }),
  override_renew_intermediary: numeric("override_renew_intermediary", {
    precision: 5,
    scale: 2,
  }),
  override_renew_direct: numeric("override_renew_direct", {
    precision: 5,
    scale: 2,
  }),
  override_withholding_tax: numeric("override_withholding_tax", {
    precision: 5,
    scale: 2,
  }),
  date_entered: date("date_entered").defaultNow(),
});
