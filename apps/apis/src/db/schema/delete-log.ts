import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const delete_log = pgTable("delete_log", {
  code: serial("code").primaryKey(),
  testname: varchar("testname", { length: 32 }).notNull(),
  timetested: timestamp("timetested").notNull().defaultNow(),
});
