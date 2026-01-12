import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const mno = pgTable("mno", {
  code: serial("code").primaryKey(),
  mno: varchar("mno", { length: 50 }),
});
