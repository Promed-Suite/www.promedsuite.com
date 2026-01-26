import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const getdubinvs = pgTable("getdubinvs", {
  idx: serial("idx").primaryKey(),
  invs: varchar("invs", { length: 20 }).notNull(),
  prov: numeric("prov", { precision: 5 }).notNull(),
  serv: numeric("serv", { precision: 3 }).notNull(),
});
