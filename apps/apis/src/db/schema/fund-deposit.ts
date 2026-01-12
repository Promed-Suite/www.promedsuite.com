import {
  numeric,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const fund_deposit = pgTable("fund_deposit", {
  invoice_no: varchar("invoice_no", { length: 10 }).primaryKey(),
  corp_id: varchar("corp_id", { length: 20 }),
  member_no: varchar("member_no", { length: 20 }),
  agent_id: varchar("agent_id", { length: 5 }),
  client_code: varchar("client_code", { length: 20 }),
  deposit_amount: numeric("deposit_amount", { precision: 10, scale: 2 }),
  top_up_amount: numeric("top_up_amount", { precision: 10, scale: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  uploaded: numeric("uploaded", { precision: 1 }),
  idx: numeric("idx", { precision: 10 }),
  anniv: numeric("anniv", { precision: 2 }),
});
