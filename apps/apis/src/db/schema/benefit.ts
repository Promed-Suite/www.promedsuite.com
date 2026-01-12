import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { toZodV4SchemaTyped } from "../../lib/zod-utils";

export const benefitsTable = pgTable("benefit", {
  code: integer().primaryKey().generatedAlwaysAsIdentity(),
  benefit: varchar({ length: 255 }).notNull().unique(),
  class: integer().notNull(),
  require_lou: integer().default(0).notNull(),
});

export const selectBenefitsSchema = toZodV4SchemaTyped(
  createSelectSchema(benefitsTable),
);

export const insertBenefitsSchema = toZodV4SchemaTyped(
  createInsertSchema(benefitsTable),
);

// @ts-expect-error partial exists on zod v4 type
export const patchBenefitsSchema = insertBenefitsSchema.partial();
