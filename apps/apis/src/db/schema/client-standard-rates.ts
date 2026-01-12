import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const clientStandardRates = pgTable("client_standard_rates", {
  idx: serial("idx").primaryKey(),
  benefit: numeric("benefit", { precision: 10, scale: 0 }),
  limit: numeric("limit", { precision: 10, scale: 0 }),
  fam_size: varchar("fam_size", { length: 10 }),
  premium: numeric("premium", { precision: 10, scale: 0 }),
  option: varchar("option", { length: 10 }),
});
