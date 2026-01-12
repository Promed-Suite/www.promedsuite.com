import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const corpAnniversary = pgTable("corp_anniversary", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  anniv: numeric("anniv", { precision: 2, scale: 0 }).notNull(),
  start_date: date("start_date"),
  end_date: date("end_date"),
  renewal_date: date("renewal_date"),
  agent_id: varchar("agent_id", { length: 10 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  renewal_notified: numeric("renewal_notified", { precision: 1, scale: 0 }),
  sync: numeric("sync", { precision: 1, scale: 0 }),
  smart_sync: numeric("smart_sync", { precision: 1, scale: 0 }),
  corp_status: varchar("corp_status", { length: 10 }),
});
