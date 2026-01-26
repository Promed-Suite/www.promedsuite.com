import {
  char,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";

export const fund_journal_status = pgTable("fund_journal_status", {
  fund_id: serial("fund_id").primaryKey(),
  voucher_no: char("voucher_no", { length: 20 }),
  sent_to_sap: char("sent_to_sap", { length: 1 }),
  sent_to_sap_date: timestamp("sent_to_sap_date"),
  return_error_msg: char("return_error_msg", { length: 300 }),
});
