import {
  date,
  numeric,
  pgTable,
  serial,
  time,
  varchar,
} from "drizzle-orm/pg-core";

export const login_tries = pgTable("login_tries", {
  code: serial("code").primaryKey(),
  user_id: varchar("user_id", { length: 100 }),
  date_tried: date("date_tried"),
  password_tried: varchar("password_tried", { length: 20 }),
  success: numeric("success", { precision: 1 }),
  time_tried: time("time_tried"),
});
