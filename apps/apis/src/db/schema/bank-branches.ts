import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const bankBranchesTable = pgTable("bank_branch", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  bank: integer().notNull(),
  bank_branch: varchar({ length: 255 }).notNull(),
  swift_code: varchar({ length: 255 }).notNull(),
  branch_code: varchar({ length: 255 }).notNull(),
});
