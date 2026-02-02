import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const applFormMissingItems = pgTable("appl_form_missing_items", {
  code: serial("code").primaryKey(),
  missing_item: varchar("missing_item", { length: 40 }).notNull(),
});
