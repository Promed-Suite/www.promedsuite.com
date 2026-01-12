import {
  date,
  decimal,
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const claimsReserve = pgTable("claims_reserve", {
  id: serial("id").primaryKey(),
  pre_auth_no: numeric("pre_auth_no", { precision: 7, scale: 0 }),
  member_no: varchar("member_no", { length: 30 }),
  trans_type: numeric("trans_type", { precision: 1, scale: 0 }),
  debit: numeric("debit", { precision: 10, scale: 2 }),
  credit: numeric("credit", { precision: 10, scale: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: date("date_entered").notNull().defaultNow(),
  old_amt: decimal("old_amt", { precision: 10, scale: 2 }),
  pre_auth_code: varchar("pre_auth_code", { length: 30 }),
  care_picked: integer("care_picked"),
  sc_id: integer("sc_id"),
  pre_auth_edit_id: integer("pre_auth_edit_id"),
});
