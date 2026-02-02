import {
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const deduction_reason = pgTable("deduction_reason", {
  code: serial("code").primaryKey(),
  deduct_reason: varchar("deduct_reason", { length: 100 }),
  category: numeric("category", { precision: 2, scale: 0 }),
});
