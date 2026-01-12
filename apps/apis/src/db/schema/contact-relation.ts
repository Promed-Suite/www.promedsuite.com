import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const contactRelation = pgTable("contact_relation", {
  code: serial("code").primaryKey(),
  relation: varchar("relation", { length: 100 }),
});
