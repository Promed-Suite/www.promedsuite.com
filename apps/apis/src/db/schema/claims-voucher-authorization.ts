import { decimal, integer, pgTable, serial } from "drizzle-orm/pg-core";

export const claimsVoucherAuthorization = pgTable(
  "claims_voucher_authorization",
  {
    idx: serial("idx").primaryKey(),
    title: integer("title"),
    min_amount: decimal("min_amount", { precision: 10, scale: 2 }),
    max_amount: decimal("max_amount", { precision: 10, scale: 2 }),
    benefit: integer("benefit"),
  },
);
