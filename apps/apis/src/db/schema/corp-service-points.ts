import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const corpServicePoints = pgTable("corp_service_points", {
  idx: serial("idx").primaryKey(),
  provider: varchar("provider", { length: 10 }),
  anniv: numeric("anniv", { precision: 2, scale: 0 }),
  corp_id: varchar("corp_id", { length: 10 }),
  sync: numeric("sync", { precision: 1, scale: 0 }),
  smart_sync: numeric("smart_sync", { precision: 1, scale: 0 }),
  category: varchar("category", { length: 15 }),
});
