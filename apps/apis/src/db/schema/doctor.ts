import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const doctorsTable = pgTable("doctor", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  doctor: varchar({ length: 255 }).notNull().unique(),
  tel_no: varchar({ length: 20 }).notNull().unique(),
  mobile_no: varchar({ length: 20 }).notNull().unique(),
  fax_no: varchar({ length: 20 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
});
