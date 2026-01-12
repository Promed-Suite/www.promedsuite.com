import { numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const fund_invoice_details = pgTable("fund_invoice_details", {
  invoice_no: varchar("invoice_no", { length: 15 }).primaryKey(),
  category: numeric("category", { precision: 2 }),
  benefit: numeric("benefit", { precision: 3 }),
  re_insurer: numeric("re_insurer", { precision: 2 }),
  sharing: numeric("sharing", { precision: 2 }),
  shared_amt: numeric("shared_amt", { precision: 10, scale: 2 }),
});
