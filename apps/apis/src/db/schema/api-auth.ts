import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const apiAuth = pgTable("api_auth", {
  idx: serial("idx").primaryKey(),
  client_id: varchar("client_id", { length: 150 }).notNull(),
  client_name: varchar("client_name", { length: 100 }).notNull(),
  secret_key: varchar("secret_key", { length: 200 }).notNull(),
  token: varchar("token", { length: 2048 }).notNull(),
  created: timestamp("created").notNull().defaultNow(),
  password: varchar("password", { length: 100 }),
  email: varchar("email", { length: 50 }),
  api_key: varchar("api_key", { length: 750 }),
});
