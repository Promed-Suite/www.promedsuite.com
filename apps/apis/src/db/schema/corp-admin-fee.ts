import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const corpAdminFee = pgTable("corp_admin_fee", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  anniv: numeric("anniv", { precision: 3, scale: 0 }).notNull(),
  admin_fee_type: numeric("admin_fee_type", { precision: 2, scale: 0 }),
  admin_fee_rate: numeric("admin_fee_rate", { precision: 10, scale: 2 }),
  admin_fee_amt: numeric("admin_fee_amt", { precision: 10, scale: 2 }),
  employer_copay: numeric("employer_copay", { precision: 10, scale: 2 }),
  employee_copay: numeric("employee_copay", { precision: 10, scale: 2 }),
  upfront_copay: numeric("upfront_copay", { precision: 10, scale: 2 }),
  agent_commis_rate: numeric("agent_commis_rate", { precision: 7, scale: 2 }),
  commis_whtax_rate: numeric("commis_whtax_rate", { precision: 7, scale: 2 }),
  rem_rule: integer("rem_rule"),
});
