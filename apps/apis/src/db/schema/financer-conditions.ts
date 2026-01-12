import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const financer_conditions = pgTable("financer_conditions", {
  fin_code: serial("fin_code").primaryKey(),
  condition: numeric("condition", { precision: 2 }),
  description: varchar("description", { length: 50 }),
});
