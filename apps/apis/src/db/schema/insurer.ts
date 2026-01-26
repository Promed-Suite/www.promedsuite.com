import { numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const insurer = pgTable("insurer", {
  insurer_code: numeric("insurer_code", { precision: 3 }).notNull(),
  insurer_name: varchar("insurer_name", { length: 50 }),
});
