import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

// CLINICAL_DIAGNOSIS
export const clinicalDiagnosis = pgTable("clinical_diagnosis", {
  idx: serial("idx").primaryKey(),
  diagnosis_class: varchar("diagnosis_class", { length: 10 }),
  clinical_diagnosis: varchar("clinical_diagnosis", { length: 300 }),
  diag_code: varchar("diag_code", { length: 10 }),
  diag_category: varchar("diag_category", { length: 10 }),
  diag_title: varchar("diag_title", { length: 10 }),
});
