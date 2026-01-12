import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const clientRates = pgTable("client_rates", {
  idx: serial("idx").primaryKey(),
  benefit: numeric("benefit", { precision: 10, scale: 0 }),
  premium_type: numeric("premium_type", { precision: 2, scale: 0 }),
  family_size: numeric("family_size", { precision: 2, scale: 0 }),
  limit: numeric("limit", { precision: 10, scale: 2 }),
  premium: numeric("premium", { precision: 10, scale: 2 }),
  min_age: numeric("min_age", { precision: 3, scale: 0 }),
  max_age: numeric("max_age", { precision: 3, scale: 0 }),
  re_rate: numeric("re_rate", { precision: 10, scale: 2 }),
  individual: numeric("individual", { precision: 2, scale: 0 }),
  insurer: numeric("insurer", { precision: 2, scale: 0 }),
  corp_id: varchar("corp_id", { length: 10 }),
  principal_applicant: varchar("principal_applicant", { length: 20 }),
  member_status: varchar("member_status", { length: 30 }),
  category: varchar("category", { length: 20 }),
  prorated: integer("prorated"),
  anniv: numeric("anniv", { precision: 3, scale: 0 }),
});
