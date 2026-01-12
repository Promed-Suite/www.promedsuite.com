import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const corpBenefits = pgTable("corp_benefits", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  anniv: numeric("anniv", { precision: 2, scale: 0 }).notNull(),
  category: numeric("category", { precision: 2, scale: 0 }).notNull(),
  benefit: numeric("benefit", { precision: 3, scale: 0 }).notNull(),
  sharing: numeric("sharing", { precision: 1, scale: 0 }),
  start_date: date("start_date"),
  end_date: date("end_date"),
  renewal_date: date("renewal_date"),
  agent_id: varchar("agent_id", { length: 10 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  fund_amt: numeric("fund_amt", { precision: 10, scale: 2 }),
  re_insurer: numeric("re_insurer", { precision: 2, scale: 0 }),
});
