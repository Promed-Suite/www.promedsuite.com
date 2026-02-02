import { pgTable, varchar } from "drizzle-orm/pg-core";

export const dataTable = pgTable("data", {
  Column1: varchar("Column1", { length: 254 }),
  Column2: varchar("Column2", { length: 254 }),
  Column3: varchar("Column3", { length: 254 }),
  Column4: varchar("Column4", { length: 254 }),
  Column5: varchar("Column5", { length: 254 }),
  Column6: varchar("Column6", { length: 254 }),
  Column7: varchar("Column7", { length: 254 }),
  Column8: varchar("Column8", { length: 254 }),
  Column9: varchar("Column9", { length: 254 }),
  Column10: varchar("Column10", { length: 254 }),
  Column11: varchar("Column11", { length: 254 }),
  Column12: varchar("Column12", { length: 254 }),
  Column13: varchar("Column13", { length: 254 }),
  Column14: varchar("Column14", { length: 254 }),
});
