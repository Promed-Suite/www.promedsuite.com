import { char, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const individual_provider_copay = pgTable("individual_provider_copay", {
  idx: serial("idx").primaryKey(),
  corp_id: varchar("corp_id", { length: 20 }),
  provider: numeric("provider", { precision: 5 }),
  all_provider: numeric("all_provider", { precision: 1 }),
  benefit: numeric("benefit", { precision: 1 }),
  co_pay: numeric("co_pay", { precision: 1 }),
  copay_amt: numeric("copay_amt", { precision: 20, scale: 2 }),
  copay_service: numeric("copay_service", { precision: 2 }),
  provider_class: numeric("provider_class"),
  client_id: numeric("client_id"),
  category: char("category", { length: 10 }),
});
