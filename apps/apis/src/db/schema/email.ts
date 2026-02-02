import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const email = pgTable("email", {
  code: serial("code").primaryKey(),
  email_address: varchar("email_address", { length: 50 }),
  group_id: numeric("group_id"),
  email_status: numeric("email_status"),
});
