import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const invalid_reasons = pgTable("invalid_reasons", {
  code: serial("code").primaryKey(),
  reason: varchar("reason", { length: 50 }),
});
