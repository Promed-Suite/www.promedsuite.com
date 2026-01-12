import {
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const corpXolSetup = pgTable("corp_xol_setup", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }),
  benefit: numeric("benefit", { precision: 5, scale: 0 }),
  anniv: numeric("anniv", { precision: 2, scale: 0 }),
  group_limit: numeric("group_limit", { precision: 15, scale: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  expenditure: numeric("expenditure", { precision: 15, scale: 2 }),
});
