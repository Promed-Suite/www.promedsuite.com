import { numeric, pgTable, varchar } from "drizzle-orm/pg-core";

export const clientUnallocatedAmt = pgTable("client_unallocated_amt", {
  client: varchar("client", { length: 15 }).primaryKey(),
  unallocated_amt: numeric("unallocated_amt", { precision: 10, scale: 2 }),
});
