import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const billPaymentStatus = pgTable("bill_payment_status", {
  id: serial("id").primaryKey(),
  voucher_no: varchar("voucher_no", { length: 20 }),
  status_date: timestamp("status_date").defaultNow(),
  status: integer("status"),
  error: varchar("error", { length: 200 }),
});
