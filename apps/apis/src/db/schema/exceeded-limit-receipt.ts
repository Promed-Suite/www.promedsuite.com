import {
  date,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const exceeded_limit_receipt = pgTable("exceeded_limit_receipt", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 30 }),
  receipt_no: varchar("receipt_no", { length: 20 }),
  corp_id: varchar("corp_id", { length: 5 }),
  member_no: varchar("member_no", { length: 20 }),
  receipt_date: date("receipt_date"),
  receipt_amt: numeric("receipt_amt", { precision: 10, scale: 2 }),
  agent_id: varchar("agent_id", { length: 5 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: date("date_entered"),
  cancelled: numeric("cancelled"),
});
