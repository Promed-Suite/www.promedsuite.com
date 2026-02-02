import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const hidex_test = pgTable("hidex_test", {
  idx: serial("idx").primaryKey(),
  testname: varchar("testname", { length: 30 }),
  loaded: numeric("loaded", { precision: 1 }),
});
