import {
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const member_provider_exempt = pgTable("member_provider_exempt", {
  idx: serial("idx").primaryKey(),
  provider: varchar("provider", { length: 10 }),
  anniv: numeric("anniv", { precision: 2 }),
  member_no: varchar("member_no", { length: 50 }),
  sync: numeric("sync", { precision: 1 }),
  smart_sync: numeric("smart_sync", { precision: 1 }),
});
