import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const err_mem = pgTable("err_mem", {
  code: serial("code").primaryKey(),
  old_mem: varchar("old_mem", { length: 50 }),
  new_mem: varchar("new_mem", { length: 20 }),
});
