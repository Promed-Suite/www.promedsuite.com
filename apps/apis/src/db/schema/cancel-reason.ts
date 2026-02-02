import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cancelReason = pgTable("cancel_reason", {
  code: serial("code").primaryKey(),
  cancel_reason: varchar("cancel_reason", { length: 50 }),
});
