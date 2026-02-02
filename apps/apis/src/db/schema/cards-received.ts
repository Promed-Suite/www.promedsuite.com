import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const cardsReceived = pgTable("cards_received", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  received_date: date("received_date"),
  card_serial_no: varchar("card_serial_no", { length: 20 }),
  delivery_note_no: varchar("delivery_note_no", { length: 20 }),
  invoice_no: varchar("invoice_no", { length: 20 }),
  card_unit_cost: numeric("card_unit_cost", { precision: 10, scale: 2 }),
});
