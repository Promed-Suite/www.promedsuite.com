import {
  integer,
  numeric,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const clientPackage = pgTable("client_package", {
  code: serial("code").primaryKey(),
  package_prefix: varchar("package_prefix", { length: 10 }),
  package_prefix_name: varchar("package_prefix_name", { length: 50 }),
  binded: integer("binded"),
  client_class: integer("client_class"),
  cut_off_age: numeric("cut_off_age", { precision: 2, scale: 0 }),
});
