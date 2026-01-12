import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const corpProvider = pgTable("corp_provider", {
  idx: serial("idx").primaryKey(),
  provider: numeric("provider", { precision: 5, scale: 0 }),
  corp_id: varchar("corp_id", { length: 10 }),
  all_provider: numeric("all_provider", { precision: 1, scale: 0 }),
  category: varchar("category", { length: 5 }),
  benefit: numeric("benefit", { precision: 1, scale: 0 }),
  co_pay: numeric("co_pay", { precision: 1, scale: 0 }),
  copay_amt: numeric("copay_amt", { precision: 5, scale: 0 }),
  service: numeric("service", { precision: 3, scale: 0 }),
  anniv: numeric("anniv", { precision: 2, scale: 0 }),
  smart_sync: integer("smart_sync"),
  sync: integer("sync"),
  provider_class: integer("provider_class"),
  care_picked: integer("care_picked"),
  copay_type: numeric("copay_type", { precision: 2, scale: 0 }),
  copay_ceiling: numeric("copay_ceiling", { precision: 15, scale: 2 }),
});
