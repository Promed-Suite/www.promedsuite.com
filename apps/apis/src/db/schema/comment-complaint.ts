import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const commentComplaint = pgTable("comment_complaint", {
  code: serial("code").primaryKey(),
  comment: varchar("comment", { length: 30 }),
});
