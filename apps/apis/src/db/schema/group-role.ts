import { numeric, pgTable, serial } from "drizzle-orm/pg-core";

export const group_role = pgTable("group_role", {
  idx: serial("idx").primaryKey(),
  group: numeric("group", { precision: 3 }),
  roles: numeric("roles", { precision: 3 }),
});
