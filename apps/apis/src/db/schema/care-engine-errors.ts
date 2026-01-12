import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const careEngineErrors = pgTable("care_engine_errors", {
  id: serial("id").primaryKey(),
  care_error: varchar("care_error", { length: 700 }),
});
