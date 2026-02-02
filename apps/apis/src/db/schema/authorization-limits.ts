import {
  integer,
  numeric,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const authorizationLimits = pgTable("authorization_limits", {
  id: serial("id").primaryKey(),
  auth_type: integer("auth_type").notNull(),
  role: integer("role").notNull(),
  min_auth: numeric("min_auth", { precision: 18, scale: 2 }).notNull(),
  max_auth: numeric("max_auth", { precision: 18, scale: 2 }).notNull(),
  user_name: varchar("user_name", { length: 50 }).notNull(),
  date_entered: timestamp("date_entered").notNull().defaultNow(),
});
