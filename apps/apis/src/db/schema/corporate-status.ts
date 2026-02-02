import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const corporateStatus = pgTable("corporate_status", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 20 }).notNull(),
  status_id: integer("status_id").notNull(),
  anniv: integer("anniv"),
  date_can: date("date_can").notNull(),
  reason: integer("reason"),
  date_entered: date("date_entered"),
  user_id: varchar("user_id", { length: 100 }),
  sync: integer("sync"),
  smart_sync: integer("smart_sync"),
});
