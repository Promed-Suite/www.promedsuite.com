import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const member_differ_reject = pgTable("member_differ_reject", {
  idx: serial("idx").primaryKey(),
  reason: varchar("reason", { length: 50 }),
});
