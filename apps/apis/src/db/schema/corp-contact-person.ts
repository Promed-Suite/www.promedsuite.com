import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const corpContactPerson = pgTable("corp_contact_person", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 10 }).notNull(),
  title: numeric("title", { precision: 2, scale: 0 }).notNull(),
  surname: varchar("surname", { length: 200 }),
  first_name: varchar("first_name", { length: 20 }),
  other_names: varchar("other_names", { length: 20 }),
  job_title: numeric("job_title", { precision: 2, scale: 0 }),
  mobile_no: varchar("mobile_no", { length: 30 }),
  tel_no: varchar("tel_no", { length: 20 }),
  email: varchar("email", { length: 100 }),
});
