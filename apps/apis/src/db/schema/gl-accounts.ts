import { char, numeric, pgTable, serial } from "drizzle-orm/pg-core";

export const gl_accounts = pgTable("gl_accounts", {
  gl_id: serial("gl_id").primaryKey(),
  gl_acct_name: char("gl_acct_name", { length: 50 }),
  gl_desc: char("gl_desc", { length: 70 }),
  profit_center: char("profit_center", { length: 20 }),
  cost_center: char("cost_center", { length: 20 }),
  dr_cr: char("dr_cr", { length: 10 }),
  acct_id: numeric("acct_id"),
});
