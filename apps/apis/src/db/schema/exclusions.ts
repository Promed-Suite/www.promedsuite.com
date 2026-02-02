import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const exclusions = pgTable("exclusions", {
  code: serial("code").primaryKey(),
  exclusion: varchar("exclusion", { length: 70 }),
});
