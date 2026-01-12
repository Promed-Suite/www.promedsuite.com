import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const member_cancellation = pgTable("member_cancellation", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  cancelled: numeric("cancelled", { precision: 1 }).notNull(),
  date_can: date("date_can"),
  anniv: numeric("anniv", { precision: 2 }),
  reason: numeric("reason", { precision: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  sync: numeric("sync", { precision: 1 }),
  smart_sync: numeric("smart_sync", { precision: 1 }),
});
