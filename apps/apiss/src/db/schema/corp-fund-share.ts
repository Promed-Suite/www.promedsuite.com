import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const corpFundShare = pgTable("corp_fund_share", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  fund_amt: numeric("fund_amt", { precision: 10, scale: 2 }),
  sharing: numeric("sharing", { precision: 1, scale: 0 }),
  shared_amt: numeric("shared_amt", { precision: 10, scale: 2 }),
  anniv: numeric("anniv", { precision: 1, scale: 0 }),
});
