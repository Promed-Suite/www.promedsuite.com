import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

import { departmentsTable } from "./department";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_name: varchar({ length: 255 }).notNull().unique(),
  user_pass: varchar({ length: 255 }).notNull(),
  full_name: varchar({ length: 255 }).notNull(),
  department: integer("department").references(() => departmentsTable.code),
  super_user: integer("super_user").notNull(),
  blocked: integer("department").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

// export const usersRelations = relations(users, ({ one }) => ({
//   invitee: one(users, {
//     fields: [users.invitedBy],
//     references: [users.id],
//   }),
// }));
