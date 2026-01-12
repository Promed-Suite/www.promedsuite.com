import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const hais_smart_triggers = pgTable("hais_smart_triggers", {
  idx: serial("idx").primaryKey(),
  date_added: date("date_added"), // default: current_timestamp
  user_id: varchar("user_id", { length: 100 }),
  trigger_id: numeric("trigger_id").notNull(),
  trigger_ref: varchar("trigger_ref", { length: 150 }),
  reason: varchar("reason", { length: 150 }),
  smart_synced: numeric("smart_synced"),
});
