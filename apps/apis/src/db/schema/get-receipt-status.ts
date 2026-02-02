import {
  date,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const get_receipt_status = pgTable("get_receipt_status", {
  id: serial("id").primaryKey(),
  receipt_no: varchar("receipt_no", { length: 50 }),
  status_date: date("status_date"),
  status: numeric("status"),
  error: varchar("error", { length: 300 }),
});
