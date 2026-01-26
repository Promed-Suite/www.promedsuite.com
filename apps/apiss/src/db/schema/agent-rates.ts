import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const agentRates = pgTable("agent_rates", {
  idx: serial("idx").primaryKey(),
  agent_id: varchar("agent_id", { length: 50 }).notNull(),
  ip: numeric("ip", { precision: 7, scale: 2 }),
  op: numeric("op", { precision: 7, scale: 2 }),
  dental: numeric("dental", { precision: 7, scale: 2 }),
  optical: numeric("optical", { precision: 7, scale: 2 }),
  pa: numeric("pa", { precision: 7, scale: 2 }),
  funeral: numeric("funeral", { precision: 7, scale: 2 }),
  rate_id: numeric("rate_id", { precision: 2, scale: 0 }),
  year: numeric("year", { precision: 4, scale: 0 }),
  maternity: numeric("maternity", { precision: 7, scale: 2 }),
  override: numeric("override", { precision: 7, scale: 2 }),
  wh_tax: numeric("wh_tax", { precision: 7, scale: 2 }),
  ovr_ren_rate: numeric("ovr_ren_rate", { precision: 7, scale: 2 }),
});
