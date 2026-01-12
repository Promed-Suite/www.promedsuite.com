import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const external_claim_sources = pgTable("external_claim_sources", {
  code: serial("code").primaryKey(),
  source_name: varchar("source_name", { length: 5 }),
});
