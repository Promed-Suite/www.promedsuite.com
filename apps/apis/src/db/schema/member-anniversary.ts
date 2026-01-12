import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const member_anniversary_copy = pgTable("member_anniversary_copy", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  start_date: date("start_date"),
  end_date: date("end_date"),
  renewal_date: date("renewal_date"),
  anniv: numeric("anniv", { precision: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  sync: numeric("sync", { precision: 1 }),
  renewal_notified: numeric("renewal_notified", { precision: 1 }),
  agent_commis_rate: numeric("agent_commis_rate", { precision: 7, scale: 2 }),
  commis_whtax_rate: numeric("commis_whtax_rate", { precision: 7, scale: 2 }),
});
