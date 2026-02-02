import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const billProcedure = pgTable("bill_procedure", {
  procedure_code: serial("procedure_code").primaryKey(),
  claim_no: varchar("claim_no", { length: 20 }),
});
