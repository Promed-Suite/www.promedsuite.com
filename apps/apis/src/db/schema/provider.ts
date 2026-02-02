import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { countriesTable } from "./country";
import { townsTable } from "./town";

export const providersTable = pgTable("provider", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  provider: varchar({ length: 255 }).notNull(),
  status: boolean().default(false),
  country: integer()
    .references(() => countriesTable.code)
    .notNull(),
  town: integer()
    .references(() => townsTable.code)
    .notNull(),
  pin: varchar({ length: 255 }).notNull().unique(),
  tel_no: varchar({ length: 20 }).notNull().unique(),
  phone_no: varchar({ length: 20 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull(),
  postal_add: varchar({ length: 255 }).notNull(),
  contact_person: varchar({ length: 255 }),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});
