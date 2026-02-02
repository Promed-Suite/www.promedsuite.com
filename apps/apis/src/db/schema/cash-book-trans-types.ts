import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cashBookTransTypes = pgTable("cash_book_trans_types", {
  code: serial("code").primaryKey(),
  trans_type: varchar("trans_type", { length: 30 }),
});
