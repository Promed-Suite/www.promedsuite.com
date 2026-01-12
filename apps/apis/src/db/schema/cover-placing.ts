import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const coverPlacing = pgTable("cover_placing", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }),
  principal_no: varchar("principal_no", { length: 15 }),
  start_date: date("start_date"),
  end_date: date("end_date"),
  benefit: numeric("benefit", { precision: 5, scale: 0 }).notNull(),
  premium: numeric("premium", { precision: 10, scale: 2 }),
  family_count: numeric("family_count", { precision: 5, scale: 0 }),
  total_premium: numeric("total_premium", { precision: 10, scale: 2 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  insurer: numeric("insurer", { precision: 2, scale: 0 }),
});
