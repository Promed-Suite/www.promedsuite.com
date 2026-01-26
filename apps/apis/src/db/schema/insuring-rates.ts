import { numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const insuring_rates = pgTable("insuring_rates", {
  code: numeric("code", { precision: 3 }).primaryKey(),
  full_desc: varchar("full_desc", { length: 35 }),
  benefit: numeric("benefit", { precision: 2 }),
  limit_amount: numeric("limit", { precision: 10, scale: 2 }),
  family_size: numeric("family_size", { precision: 2 }),
  premium: numeric("premium", { precision: 10, scale: 2 }),
  client: numeric("client", { precision: 1 }),
  year: numeric("year", { precision: 4 }),
  insurer: numeric("insurer", { precision: 2 }),
});
