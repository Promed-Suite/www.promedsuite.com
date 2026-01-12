import { date, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const agentDeductions = pgTable("agent_deductions", {
  idx: serial("idx").primaryKey(),
  agent_id: varchar("agent_id", { length: 10 }).notNull(),
  deduction_type: numeric("deduction_type", {
    precision: 2,
    scale: 0,
  }).notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  date_entered: date("date_entered").defaultNow(),
  user_id: varchar("user_id", { length: 100 }),
  recover: numeric("recover", { precision: 1, scale: 0 }),
  vno: varchar("vno", { length: 10 }),
  pay_no: numeric("pay_no", { precision: 10, scale: 0 }),
});
