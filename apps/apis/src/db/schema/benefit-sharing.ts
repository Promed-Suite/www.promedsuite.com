import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const benefitSharing = pgTable("benefit_sharing", {
  code: serial("code").primaryKey(),
  sharing: varchar("sharing", { length: 15 }).notNull(),
});
