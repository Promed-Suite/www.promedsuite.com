import {
  date,
  decimal,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const mb_pre_auth = pgTable("mb_pre_auth", {
  idx: serial("idx").primaryKey(),
  pre_auth_no: serial("pre_auth_no").notNull(),
  member_no: varchar("member_no", { length: 20 }),
  date_requested: date("date_requested"),
  diagnosis: varchar("diagnosis", { length: 255 }),
  ben_code: numeric("ben_code", { precision: 5 }),
  prov_code: varchar("prov_code", { length: 15 }),
  requested_amt: decimal("requested_amt", { precision: 15, scale: 2 }),
  deducted_amt: decimal("deducted_amt", { precision: 15, scale: 2 }),
  deduction_reason: varchar("deduction_reason", { length: 255 }),
  approved_amount: decimal("approved_amount", { precision: 15, scale: 2 }),
  request_notes: varchar("request_notes", { length: 255 }),
  requested_by: varchar("requested_by", { length: 50 }),
});
