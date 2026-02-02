import { char, date, pgTable, serial } from "drizzle-orm/pg-core";

export const adminFeeSapStatus = pgTable("admin_fee_sap_status", {
  idx: serial("admin_id").primaryKey(),
  invoice_no: char("invoice_no", { length: 20 }).notNull(),
  sent_to_sap: char("sent_to_sap", { length: 1 }),
  sent_to_sap_date: date("sent_to_sap_date"),
  return_erro_msg: char("return_erro_msg", { length: 300 }),
  return_error_msg: char("return_error_msg", { length: 300 }),
});
