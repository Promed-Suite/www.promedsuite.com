import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const departmentsTable = pgTable("department", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  department: varchar({ length: 255 }).notNull().unique(),
});
