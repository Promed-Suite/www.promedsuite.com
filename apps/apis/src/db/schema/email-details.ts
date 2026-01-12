import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const email_details = pgTable("email_details", {
  idx: serial("idx").primaryKey(),
  title_sub: varchar("title_sub", { length: 50 }),
  body: varchar("body", { length: 600 }),
  group_id: numeric("group_id"),
  email_status: numeric("email_status"),
});
