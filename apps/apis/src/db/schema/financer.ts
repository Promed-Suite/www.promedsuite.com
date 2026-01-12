import {
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const financer = pgTable("financer", {
  fin_code: serial("fin_code").primaryKey(),
  financer: varchar("financer", { length: 50 }),
  rate: numeric("rate", { precision: 10, scale: 2 }),
});
