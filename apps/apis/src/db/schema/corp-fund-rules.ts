import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const corpFundRules = pgTable("corp_fund_rules", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  anniv: numeric("anniv", { precision: 1, scale: 0 }).notNull(),
  rules: numeric("rules", { precision: 2, scale: 0 }).notNull(),
});
