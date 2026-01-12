import {
  date,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const getdubclns = pgTable("getdubclns", {
  idx: serial("idx").primaryKey(),
  clno: varchar("clno", { length: 20 }),
  vdate: date("vdate"),
  skip: numeric("skip", { precision: 1 }),
  docsin: numeric("docsin", { precision: 1 }),
  docdate: date("docdate"),
  formsin: numeric("formsin", { precision: 1 }),
  adm: date("adm"),
  disch: date("disch"),
  userid: varchar("userid", { length: 10 }),
  dateent: date("dateent"),
});
