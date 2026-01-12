import {
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const deleted_log = pgTable("deleted_log", {
  code: serial("code").primaryKey(),
  deleted_info: varchar("deleted_info", { length: 100 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  deleted_class: numeric("deleted_class", { precision: 2, scale: 0 }),
});
