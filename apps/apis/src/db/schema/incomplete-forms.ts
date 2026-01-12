import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const incomplete_forms = pgTable("incomplete_forms", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 10 }),
  missing_item: numeric("missing_item", { precision: 3 }),
});
