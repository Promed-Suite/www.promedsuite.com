import {
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const member_doctor = pgTable("member_doctor", {
  idx: serial("idx").primaryKey(),
  member_no: varchar("member_no", { length: 20 }).notNull(),
  doctor: varchar("doctor", { length: 20 }).notNull(),
  tel_no: varchar("tel_no", { length: 20 }),
  mobile_no: varchar("mobile_no", { length: 20 }),
  postal_add: varchar("postal_add", { length: 20 }),
});
