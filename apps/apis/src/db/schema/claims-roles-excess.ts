import { date, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const claimsRolesExcess = pgTable("claims_roles_excess", {
  id: serial("id").primaryKey(),
  role: integer("role"),
  benefit: integer("benefit"),
  user_id: varchar("user_id", { length: 100 }),
  claim_stage: integer("claim_stage"),
  user_name: varchar("user_name", { length: 30 }),
  date_entered: date("date_entered").notNull().defaultNow(),
});
