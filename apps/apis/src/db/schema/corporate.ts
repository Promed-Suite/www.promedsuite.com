import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { toZodV4SchemaTyped } from "@/lib/zod-utils";

export const corporateTable = pgTable("corporate", {
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  corporate: varchar("corporate", { length: 70 }),
  tel_no: varchar("tel_no", { length: 20 }),
  fax_no: varchar("fax_no", { length: 20 }),
  mobile_no: varchar("mobile_no", { length: 30 }),
  postal_add: varchar("postal_add", { length: 20 }),
  town: numeric("town", { precision: 5, scale: 0 }),
  phy_loc: varchar("phy_loc", { length: 100 }),
  email: varchar("email", { length: 300 }),
  user_id: varchar("user_id", { length: 100 }),
  agent_id: varchar("agent_id", { length: 10 }),
  scheme: varchar("scheme", { length: 10 }),
  cancelled: numeric("cancelled", { precision: 1, scale: 0 }),
  insurer: numeric("insurer", { precision: 3, scale: 0 }),
  underwrite: numeric("underwrite", { precision: 1, scale: 0 }),
  waiting_period: numeric("waiting_period", { precision: 2, scale: 0 }),
  enhanced: numeric("enhanced", { precision: 1, scale: 0 }),
  acct_no: varchar("acct_no", { length: 10 }),
  policy_no: varchar("policy_no", { length: 30 }),
  individual: numeric("individual", { precision: 1, scale: 0 }),
  idx: serial("idx").primaryKey(),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  branch: varchar("branch", { length: 10 }),
  abbreviation: varchar("abbreviation", { length: 20 }).unique(),
  uploaded: numeric("uploaded", { precision: 1, scale: 0 }),
  corp_pin: varchar("corp_pin", { length: 50 }),
  care_picked: numeric("care_picked", { precision: 1, scale: 0 }),
  client_code: varchar("client_code", { length: 10 }),
  currency: varchar("currency", { length: 10 }),
  age_cut_off: integer("age_cut_off"),
  smart_sync: integer("smart_sync"),
  sync: integer("sync"),
  authorized: integer("authorized"),
  authorized_date: timestamp("authorized_date"),
  authorized_by: varchar("authorized_by", { length: 100 }),
  locked: integer("locked"),
  segment: numeric("segment", { precision: 2, scale: 0 }),
  over_age_at: numeric("over_age_at", { precision: 2, scale: 0 }),
});

export const selectCorporateSchema = toZodV4SchemaTyped(
  createSelectSchema(corporateTable),
);

export const insertCorporateSchema = toZodV4SchemaTyped(
  createInsertSchema(corporateTable),
);

// @ts-expect-error partial exists on zod v4 type
export const patchCorporateSchema = insertCorporateSchema.partial();
