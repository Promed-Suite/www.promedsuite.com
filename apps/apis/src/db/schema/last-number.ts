import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const last_number = pgTable("last_number", {
  task: serial("idx").primaryKey(),
  task_desk: varchar("task_desk", { length: 20 }),
  last_no: numeric("last_no", { precision: 10 }),
  locker: numeric("locker"),
});
