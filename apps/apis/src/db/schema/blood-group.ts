import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const bloodGroup = pgTable("blood_group", {
  code: serial("code").primaryKey(),
  blood_group: varchar("blood_group", { length: 5 }).notNull(),
});
