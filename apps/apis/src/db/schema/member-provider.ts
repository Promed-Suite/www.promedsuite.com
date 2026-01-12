import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const member_provider = pgTable("member_provider", {
  idx: serial("idx").primaryKey(),
  provider: numeric("provider", { precision: 5 }),
  member_no: varchar("member_no", { length: 20 }),
  all_provider: numeric("all_provider", { precision: 1 }),
  benefit: numeric("benefit", { precision: 1 }),
  co_pay: numeric("co_pay", { precision: 1 }),
  copay_amt: numeric("copay_amt", { precision: 20, scale: 2 }),
  copay_service: numeric("copay_service", { precision: 2 }),
  anniv: numeric("anniv", { precision: 2 }),
  provider_class: integer("provider_class"),
  sync: integer("sync"),
  smart_sync: integer("smart_sync"),
  copay_type: numeric("copay_type", { precision: 2 }),
});
