import {
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const member_exclusion = pgTable("member_exclusion", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  exclusion: numeric("exclusion", { precision: 2 }).notNull(),
});
