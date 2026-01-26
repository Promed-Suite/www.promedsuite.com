import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const ledger_trans_types = pgTable("ledger_trans_types", {
  code: serial("code").primaryKey(),
  trans_type: varchar("trans_type", { length: 40 }),
});
