import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const clinicalProcedure = pgTable("clinical_procedure", {
  idx: serial("idx").primaryKey(),
  procedure_class: varchar("procedure_class", { length: 10 }),
  clinical_procedure: varchar("clinical_procedure", { length: 120 }),
});
