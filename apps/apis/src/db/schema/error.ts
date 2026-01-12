import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const error = pgTable("error", {
  idx: serial("idx").primaryKey(),
  error_code: varchar("error_code", { length: 100 }),
  error_desc: varchar("error_desc", { length: 2000 }),
  error_date: date("error_date"),
  user_id: varchar("user_id", { length: 100 }),
  solved: numeric("solved"),
});
