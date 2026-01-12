import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const servicesTable = pgTable("service", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  service: varchar({ length: 255 }).notNull().unique(),
});
