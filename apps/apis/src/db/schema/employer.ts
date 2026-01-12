import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const employer = pgTable("employer", {
  code: serial("code").primaryKey(),
  employer: varchar("employer", { length: 60 }),
});
