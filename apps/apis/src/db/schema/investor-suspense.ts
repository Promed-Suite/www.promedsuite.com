import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const investor_suspense = pgTable("investor_suspense", {
  idx: serial("idx").primaryKey(),
  policy_no: varchar("policy_no", { length: 20 }),
  description: numeric("description", { precision: 2 }),
  resolved: numeric("resolved", { precision: 1 }),
  amount: numeric("amount", { precision: 10, scale: 2 }),
});
