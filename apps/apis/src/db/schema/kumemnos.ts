import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const kumemnos = pgTable("kumemnos", {
  idx: serial("idx").primaryKey(),
  fam: varchar("fam", { length: 10 }),
  famno: varchar("famno", { length: 15 }),
  memno: varchar("memno", { length: 15 }),
  surname: varchar("surname", { length: 40 }),
  firstname: varchar("firstname", { length: 40 }),
  grad: varchar("grad", { length: 20 }),
  desig: varchar("desig", { length: 50 }),
  dob: date("dob"),
  famsize: varchar("famsize", { length: 15 }),
  gende: varchar("gende", { length: 1 }),
  fampos: numeric("fampos", { precision: 5 }),
});
