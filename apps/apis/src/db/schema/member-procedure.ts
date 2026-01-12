import {
  decimal,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const member_procedure = pgTable("member_procedure", {
  idx: serial("idx").primaryKey(),
  claim_no: varchar("claim_no", { length: 20 }),
  member_no: varchar("member_no", { length: 20 }),
  clinical_procedure: numeric("clinical_procedure", {
    precision: 5,
  }),
  procedure_amt: decimal("procedure_amt", { precision: 10, scale: 2 }),
});
