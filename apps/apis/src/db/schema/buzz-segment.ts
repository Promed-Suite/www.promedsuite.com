import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const buzzSegment = pgTable("buzz_segment", {
  code: serial("code").primaryKey(),
  segment: varchar("segment", { length: 100 }),
});
