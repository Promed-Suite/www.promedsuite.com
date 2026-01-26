import {
  date,
  numeric,
  pgTable,
  varchar,
} from "drizzle-orm/pg-core";

export const exceeded_limit_invoice = pgTable("exceeded_limit_invoice", {
  invoice_no: varchar("invoice_no", { length: 10 }).primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }),
  member_no: varchar("member_no", { length: 20 }),
  invoice_date: date("invoice_date"),
  invoice_amt: numeric("invoice_amt", { precision: 10, scale: 2 }),
  idx: numeric("idx"),
  agent_id: varchar("agent_id", { length: 10 }),
  anniv: numeric("anniv"),
  date_entered: date("date_entered"),
  user_id: varchar("user_id", { length: 100 }),
});
