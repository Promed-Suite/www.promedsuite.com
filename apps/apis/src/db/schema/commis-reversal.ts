import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const commisReversal = pgTable("commis_reversal", {
  commis_rev_id: serial("commis_rev_id").primaryKey(),
  commis_voucher: varchar("commis_voucher", { length: 30 }),
  rev_reason_id: integer("rev_reason_id"),
  user_name: varchar("user_name", { length: 30 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
});
