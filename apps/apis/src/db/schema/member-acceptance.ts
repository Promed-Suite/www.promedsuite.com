import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const member_acceptance = pgTable("member_acceptance", {
  code: serial("code").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  status: numeric("status", { precision: 1 }),
  status_date: date("status_date"),
  comments: varchar("comments", { length: 70 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  def_rej: numeric("def_rej", { precision: 2 }),
});
