import {
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const family_relation = pgTable("family_relation", {
  code: serial("code").primaryKey(),
  relation: varchar("relation", { length: 30 }),
  class: numeric("class", { precision: 2 }),
  nuclear: numeric("nuclear", { precision: 2 }),
});
