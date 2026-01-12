import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const getmno = pgTable("getmno", {
  idx: serial("idx").primaryKey(),
  txt: varchar("txt", { length: 7000 }),
});
