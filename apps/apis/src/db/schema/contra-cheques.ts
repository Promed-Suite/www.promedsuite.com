import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const contraCheques = pgTable("contra_cheques", {
  idx: serial("idx").primaryKey(),
  cheque_no: varchar("item_name", { length: 255 }),
  cheque_date: date("cheque_date").notNull(),
  cheque_amt: numeric("unit_price", { precision: 15, scale: 2 }),
});
