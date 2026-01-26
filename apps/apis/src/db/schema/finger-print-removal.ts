import {
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const finger_print_removal = pgTable("finger_print_removal", {
  rec_id: serial("rec_id").primaryKey(),
  member_no: varchar("member_no", { length: 15 }),
  anniv: numeric("anniv", { precision: 2 }),
  reason: numeric("reason", { precision: 3 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  smart_sync: numeric("smart_sync", { precision: 1 }),
  sync: numeric("sync", { precision: 1 }),
});
