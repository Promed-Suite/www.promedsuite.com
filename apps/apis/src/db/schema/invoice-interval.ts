import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const invoice_interval = pgTable("invoice_interval", {
  code: serial("code").primaryKey(),
  interval: varchar("interval", { length: 15 }),
});
