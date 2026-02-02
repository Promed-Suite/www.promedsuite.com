import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const diagnosis = pgTable("diagnosis", {
  code: serial("code").primaryKey(),
  diagnosis: varchar("diagnosis", { length: 200 }),
});
