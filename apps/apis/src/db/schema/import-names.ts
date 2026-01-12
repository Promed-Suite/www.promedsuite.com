import {
  date,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const import_names = pgTable("import_names", {
  idx: serial("idx").primaryKey(),
  invoice_no: varchar("invoice_no", { length: 15 }).notNull(),
  import_m_names: varchar("import_m_names", { length: 30 }),
  invoiced_amount: numeric("invoiced_amount", { precision: 10 }),
  invoice_date: date("invoice_date"),
  user_id: varchar("user_id", { length: 100 }),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
  service: numeric("service", { precision: 2 }),
  refund: numeric("refund", { precision: 1 }),
  claim_nature: numeric("claim_nature", { precision: 2 }),
  import_flag: numeric("import", { precision: 1 }),
  provider: numeric("provider", { precision: 1 }),
  claim_no: varchar("claim_no", { length: 20 }),
});
