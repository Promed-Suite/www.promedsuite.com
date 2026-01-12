import {
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const billVet = pgTable("bill_vet", {
  id: serial("id").primaryKey(),
  claim_no: varchar("claim_no", { length: 25 }),
  invoice_no: varchar("invoice_no", { length: 150 }),
  service: numeric("service", { precision: 5, scale: 0 }),
  provider: numeric("provider", { precision: 5, scale: 0 }),
  vet_status: numeric("vet_status", { precision: 1, scale: 0 }),
  reasons: numeric("reasons", { precision: 10, scale: 0 }),
  remarks: varchar("remarks", { length: 50 }),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
});
