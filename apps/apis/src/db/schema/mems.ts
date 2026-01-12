import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const mems = pgTable("mems", {
  idx: serial("idx").primaryKey(),
  family_no: varchar("family_no", { length: 50 }),
  member_no: varchar("member_no", { length: 50 }),
  member: varchar("member", { length: 50 }),
});
