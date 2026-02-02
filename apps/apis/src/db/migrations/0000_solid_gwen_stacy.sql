CREATE TABLE "a" (
	"id" serial PRIMARY KEY NOT NULL,
	"voucher_no" varchar(30),
	"cheque_no" varchar(50),
	"cheque_date" date,
	"cheque_amount" numeric(10, 2),
	"cheque_no_new" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "admin_fee_invoice" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(30) NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"invoice_date" date NOT NULL,
	"quantity" numeric(10, 0),
	"unit_amount" numeric(10, 2),
	"gross_amount" numeric(10, 2),
	"disc_percent" numeric(10, 2),
	"net_amount" numeric(10, 2),
	"invoice_period" varchar(25),
	"next_invoice_month" varchar(10),
	"disc_amount" numeric(10, 2),
	"vat_rate" numeric(7, 2),
	"vat_amount" numeric(10, 2),
	"interval" numeric(1, 0),
	"allocated_amt" numeric(10, 2),
	"test1" numeric(1, 0),
	"user_id" varchar(100),
	"date_entered" date DEFAULT now(),
	"anniv" numeric(2, 0),
	"uploaded" numeric(1, 0),
	"excise_duty" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "admin_fee_receipt" (
	"idx" serial PRIMARY KEY NOT NULL,
	"receipt_no" char(50) NOT NULL,
	"receipt_date" date NOT NULL,
	"receipt_amt" numeric(10, 2) NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"date_entered" date DEFAULT now(),
	"user_id" varchar(100),
	"invoice_no" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "admin_fee_sap_status" (
	"admin_id" serial PRIMARY KEY NOT NULL,
	"invoice_no" char(20) NOT NULL,
	"sent_to_sap" char(1),
	"sent_to_sap_date" date,
	"return_erro_msg" char(300),
	"return_error_msg" char(300)
);
--> statement-breakpoint
CREATE TABLE "admin_fee_sap" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" char(50) NOT NULL,
	"invoice_date" date,
	"admin_acct" char(50),
	"admin_amount" numeric(10, 2),
	"admin_cost_crt" char(20),
	"admin_dr_cr" char(5),
	"admin_narr" char(50),
	"admin_profit_crt" char(20),
	"admin_currency" char(5),
	"agent_type" char(5),
	"fund_acct" char(20),
	"fund_amt" numeric(10, 2),
	"fund_currency" char(5),
	"fund_cost_crt" char(20),
	"fund_profit_crt" char(20),
	"fund_dr_cr" char(5),
	"fund_narr" char(50)
);
--> statement-breakpoint
CREATE TABLE "agent_commis_rates" (
	"idx" serial PRIMARY KEY NOT NULL,
	"agent_id" varchar(50),
	"benefit" numeric(3, 0),
	"newbuz" numeric(5, 2),
	"renewalbuz" numeric(5, 2),
	"withholding_tax" numeric(5, 2),
	"override_new_intermediary" numeric(5, 2),
	"override_new_direct" numeric(5, 2),
	"override_renew_intermediary" numeric(5, 2),
	"override_renew_direct" numeric(5, 2),
	"override_withholding_tax" numeric(5, 2),
	"date_entered" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "agent_deductions" (
	"idx" serial PRIMARY KEY NOT NULL,
	"agent_id" varchar(10) NOT NULL,
	"deduction_type" numeric(2, 0) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"date_entered" date DEFAULT now(),
	"user_id" varchar(100),
	"recover" numeric(1, 0),
	"vno" varchar(10),
	"pay_no" numeric(10, 0)
);
--> statement-breakpoint
CREATE TABLE "agent_rates" (
	"idx" serial PRIMARY KEY NOT NULL,
	"agent_id" varchar(50) NOT NULL,
	"ip" numeric(7, 2),
	"op" numeric(7, 2),
	"dental" numeric(7, 2),
	"optical" numeric(7, 2),
	"pa" numeric(7, 2),
	"funeral" numeric(7, 2),
	"rate_id" numeric(2, 0),
	"year" numeric(4, 0),
	"maternity" numeric(7, 2),
	"override" numeric(7, 2),
	"wh_tax" numeric(7, 2),
	"ovr_ren_rate" numeric(7, 2)
);
--> statement-breakpoint
CREATE TABLE "agent" (
	"agent_id" varchar(50),
	"agent_name" varchar(70) NOT NULL,
	"agent_type" numeric(10, 0) NOT NULL,
	"tel_no" numeric(10, 0),
	"mobile_no" numeric(10, 0) NOT NULL,
	"fax_no" numeric(10, 0),
	"postal_add" varchar(30),
	"town" varchar(20),
	"phy_loc" varchar(20),
	"email" varchar(30) NOT NULL,
	"contact_person" varchar(30),
	"contact_mobile" varchar(30),
	"contact_tel" varchar(30),
	"user_id" varchar(100),
	"date_entered" date DEFAULT now(),
	"unit_manager" varchar(30),
	"branch" varchar(30) NOT NULL,
	"account_code" varchar(20),
	"uploaded" numeric(10, 0),
	"commiss_rate" numeric(10, 0) NOT NULL,
	"whtx_rate" numeric(10, 0) NOT NULL,
	"runoff" varchar(2) NOT NULL,
	"agn_status" varchar(10) NOT NULL,
	"unit" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "allergy" (
	"code" serial PRIMARY KEY NOT NULL,
	"allergy" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "api_auth" (
	"idx" serial PRIMARY KEY NOT NULL,
	"client_id" varchar(150) NOT NULL,
	"client_name" varchar(100) NOT NULL,
	"secret_key" varchar(200) NOT NULL,
	"token" varchar(2048) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"password" varchar(100),
	"email" varchar(50),
	"api_key" varchar(750)
);
--> statement-breakpoint
CREATE TABLE "api_diagnosis" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(50) NOT NULL,
	"invoice_no" varchar(255) NOT NULL,
	"diagnosis" varchar(255) NOT NULL,
	"parent_id" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "appl_form_missing_items" (
	"code" serial PRIMARY KEY NOT NULL,
	"missing_item" varchar(40) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "approved_vouchers" (
	"idx" serial PRIMARY KEY NOT NULL,
	"voucher_no" varchar(50) NOT NULL,
	"approved_date" date NOT NULL,
	"approved_by" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "authorization_limits" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_type" integer NOT NULL,
	"role" integer NOT NULL,
	"min_auth" numeric(18, 2) NOT NULL,
	"max_auth" numeric(18, 2) NOT NULL,
	"user_name" varchar(50) NOT NULL,
	"date_entered" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank_branch" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bank_branch_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bank" integer NOT NULL,
	"bank_branch" varchar(255) NOT NULL,
	"swift_code" varchar(255) NOT NULL,
	"branch_code" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bank" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bank_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bank" varchar(255) NOT NULL,
	CONSTRAINT "bank_bank_unique" UNIQUE("bank")
);
--> statement-breakpoint
CREATE TABLE "benefit_sharing" (
	"code" serial PRIMARY KEY NOT NULL,
	"sharing" varchar(15) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "benefit" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "benefit_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"benefit" varchar(255) NOT NULL,
	"class" integer NOT NULL,
	"require_lou" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "benefit_benefit_unique" UNIQUE("benefit")
);
--> statement-breakpoint
CREATE TABLE "bill_details" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(20) NOT NULL,
	"service" varchar(10) NOT NULL,
	"name" varchar(50),
	"quantity" numeric(30, 0) NOT NULL,
	"member_no" varchar(30),
	"parent_id" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "bill_payment_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"voucher_no" varchar(20),
	"status_date" timestamp DEFAULT now(),
	"status" integer,
	"error" varchar(200)
);
--> statement-breakpoint
CREATE TABLE "bill_procedure" (
	"procedure_code" serial PRIMARY KEY NOT NULL,
	"claim_no" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "bill_vet" (
	"id" serial PRIMARY KEY NOT NULL,
	"claim_no" varchar(25),
	"invoice_no" varchar(150),
	"service" numeric(5, 0),
	"provider" numeric(5, 0),
	"vet_status" numeric(1, 0),
	"reasons" numeric(10, 0),
	"remarks" varchar(50),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bills_params" (
	"code" serial PRIMARY KEY NOT NULL,
	"stale_period" numeric(3, 0)
);
--> statement-breakpoint
CREATE TABLE "bills_payment" (
	"payment_no" serial PRIMARY KEY NOT NULL,
	"cheque_no" varchar(20) NOT NULL,
	"cheque_date" date NOT NULL,
	"cheque_amount" numeric(10, 2) NOT NULL,
	"provider" varchar(7),
	"member_no" varchar(20),
	"corp_id" varchar(10),
	"dispatched" numeric(1, 0),
	"date_dispatched" date,
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"admin_fee" numeric(10, 2),
	"corp_paid_for" varchar(10),
	"acct_no" varchar(10),
	"bank" numeric(2, 0),
	"self_fund" numeric(1, 0),
	"agent_id" varchar(10),
	"user_dispatched" varchar(100),
	"cheque_acc" varchar(30),
	"voucher_no" varchar(30) NOT NULL,
	"cancelled" numeric(1, 0),
	"proxy_payee" varchar(70),
	"payee" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "bills" (
	"id" serial PRIMARY KEY NOT NULL,
	"claim_no" varchar(25),
	"invoice_no" varchar(150),
	"claim_form_no" varchar(25),
	"provider" numeric(5, 0),
	"member_no" varchar(20),
	"service" numeric(2, 0),
	"claim_nature" numeric(2, 0),
	"referred_by" numeric(5, 0),
	"ip_doctor" numeric(5, 0),
	"invoice_date" date,
	"invoiced_amount" numeric(10, 2),
	"deduction_amount" numeric(10, 2),
	"deduction_reason" numeric(5, 0),
	"amount_payable" numeric(10, 2),
	"deduction_notes" varchar(50),
	"paid" numeric(1, 0),
	"voucher_no" varchar(10),
	"payment_no" varchar(10),
	"sent_to_re" numeric(1, 0),
	"batch_no" varchar(15),
	"payment_date" date,
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"refund" numeric(1, 0),
	"claimed_cancelled" numeric(1, 0),
	"anniv" numeric(3, 0),
	"capped" numeric(1, 0),
	"admin_fee" numeric(10, 2),
	"fund" numeric(1, 0),
	"re_insurer" numeric(2, 0),
	"date_received" date,
	"vet_status" numeric(1, 0),
	"entry_notes" varchar(30),
	"voucher_user" varchar(100),
	"bill_serial_no" varchar(20),
	"contra_amt" numeric(10, 2),
	"corp_expense" numeric(1, 0),
	"pre_auth_no" numeric(7, 0),
	"voucher_date" date,
	"in_excess" numeric(1, 0),
	"proxy_payee" varchar(50),
	"member_id" varchar(20),
	"import" numeric(1, 0),
	"corp_id" varchar(10),
	"family_no" varchar(20),
	"hsp" varchar(70),
	"cheque_no" varchar(20),
	"cheque_date" varchar(20),
	"cheque_desc" varchar(30),
	"uploaded" numeric(1, 0),
	"fms_pv_uploaded" numeric(1, 0),
	"pv_authorized" numeric(1, 0),
	"pv_authorized_date" date,
	"pv_authorized_by" varchar(100),
	"old_amt_payable" numeric(10, 2),
	"re_rate" numeric(5, 0),
	"re_recoverable_amt" numeric(10, 0),
	"cheque_code" varchar(20),
	"rejected_pv" numeric(1, 0),
	"category" varchar(10),
	"sub_bene" numeric(1, 0),
	"pri_dep" numeric(2, 0),
	"smart_bill_id" varchar(20),
	"wht_tax_rate" numeric(10, 2),
	"wht_tax_amt" numeric(10, 2),
	"net_amt_payable" numeric(10, 2),
	"care_picked" numeric(1, 0),
	"upload_bills_smart" integer,
	"copay_amt" numeric(10, 2),
	"excess_amt" numeric(10, 2),
	"excess_invoiced" integer,
	"excess_invoice_no" varchar(20),
	"excess_receipt_no" varchar(50),
	"excess_repaid_amt" numeric(10, 2),
	"d_voucher" varchar(20),
	"exgratia_amt" numeric(18, 2),
	"rem_provider" integer,
	"rem_reason" integer,
	"rem_prov_proxy" varchar(70),
	"foreign_amt" numeric(18, 2),
	"foreign_curr" integer,
	"foreign_rate" numeric(18, 2),
	"re_assigned_to" varchar(15),
	"re_assigned_on" date,
	"loss_date" date,
	"service_description" varchar(255),
	"voucher_batch_no" varchar(200),
	"is_foreign" numeric(1, 0)
);
--> statement-breakpoint
CREATE TABLE "blood_group" (
	"code" serial PRIMARY KEY NOT NULL,
	"blood_group" varchar(5) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "buzz_segment" (
	"code" serial PRIMARY KEY NOT NULL,
	"segment" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "cancel_params" (
	"code" serial PRIMARY KEY NOT NULL,
	"wait_days" numeric(5, 0),
	"corp_id" varchar(15),
	"default_wait" numeric(15, 0)
);
--> statement-breakpoint
CREATE TABLE "cancel_reason" (
	"code" serial PRIMARY KEY NOT NULL,
	"cancel_reason" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "cancelled_receipt_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"receipt_no" varchar(50),
	"status_date" date,
	"status" integer,
	"error" varchar(300)
);
--> statement-breakpoint
CREATE TABLE "capitation_deposits" (
	"code" serial PRIMARY KEY NOT NULL,
	"provider" numeric(5, 0),
	"cheque_no" varchar(10),
	"cheque_date" date,
	"cheque_amt" numeric(10, 2),
	"corp_id" varchar(5),
	"user_id" varchar(100),
	"date_entered" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "card_invoice_receipt" (
	"idx" serial PRIMARY KEY NOT NULL,
	"receipt_no" varchar(50),
	"receipt_amount" numeric(10, 2),
	"receipt_date" date,
	"invoice_no" varchar(20),
	"corp_id" varchar(20),
	"user_id" varchar(100),
	"date_entered" date DEFAULT now() NOT NULL,
	"cancelled" integer
);
--> statement-breakpoint
CREATE TABLE "card_invoice_sap" (
	"inv_id" integer PRIMARY KEY NOT NULL,
	"card_invoice_acct" varchar(20),
	"card_invoice_amt" numeric(10, 2),
	"cost_crt" varchar(20),
	"currency" varchar(5),
	"card_invoice_dr_cr" varchar(5),
	"narration" varchar(50),
	"profit_crt" varchar(20),
	"cust_acct" varchar(20),
	"cust_dr_cr" varchar(5),
	"sent_to_sap" varchar(1),
	"sent_to_sap_date" timestamp,
	"error_msg" varchar(300),
	"invoice_no" varchar(20),
	"invoice_date" date
);
--> statement-breakpoint
CREATE TABLE "card_invoice_schedule" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(30),
	"corp_id" varchar(30),
	"invoice_no" varchar(30),
	"narr" varchar(10),
	"date_entered" date DEFAULT now() NOT NULL,
	"user_id" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "card_invoice" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(30),
	"invoice_no" varchar(30) NOT NULL,
	"invoice_date" date,
	"corp_id" varchar(10),
	"quantity" integer,
	"card_type" integer,
	"unit_cost" numeric(10, 2),
	"invoice_amount" numeric(10, 2),
	"narr" varchar(10),
	"date_entered" date DEFAULT now() NOT NULL,
	"user_id" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "cards_received" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"received_date" date,
	"card_serial_no" varchar(20),
	"delivery_note_no" varchar(20),
	"invoice_no" varchar(20),
	"card_unit_cost" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "care_admission" (
	"member_no" varchar(15) NOT NULL,
	"pre_auth_no" numeric(7, 0) NOT NULL,
	"provider" numeric(7, 0) NOT NULL,
	"date_admitted" date NOT NULL,
	"admitting_doc" varchar(20),
	"admission_no" varchar(20),
	"ward" varchar(20),
	"room_no" varchar(10),
	"bed_no" varchar(10),
	"diagnosis" varchar(70),
	"date_discharged" date
);
--> statement-breakpoint
CREATE TABLE "care_corp_issue" (
	"code" serial PRIMARY KEY NOT NULL,
	"corp_issue" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "care_corp_visit_issue" (
	"issue_no" serial PRIMARY KEY NOT NULL,
	"visit_no" numeric(5, 0),
	"issue" numeric(3, 0),
	"assign_to" varchar(10),
	"complete_by" date,
	"completed_on" date
);
--> statement-breakpoint
CREATE TABLE "care_corp_visit" (
	"visit_no" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"visit_date" date NOT NULL,
	"visited_by" varchar(10) NOT NULL,
	"met_with" varchar(30),
	"next_visit_date" date,
	"met_with_title" numeric(3, 0)
);
--> statement-breakpoint
CREATE TABLE "care_engine_errors" (
	"id" serial PRIMARY KEY NOT NULL,
	"care_error" varchar(700)
);
--> statement-breakpoint
CREATE TABLE "care_visit" (
	"visit_no" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(15),
	"pre_auth_no" numeric(7, 0),
	"visit_date" date,
	"visited_by" varchar(10),
	"presented" numeric(3, 0),
	"incurred_amt" numeric(10, 2),
	"exp_discharge_date" date,
	"care_nurse_comments" varchar(70),
	"doc_comments" varchar(70)
);
--> statement-breakpoint
CREATE TABLE "cash_book_trans_types" (
	"code" serial PRIMARY KEY NOT NULL,
	"trans_type" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "cash_book" (
	"trans_no" serial PRIMARY KEY NOT NULL,
	"ledger_acct" numeric(10, 0),
	"trans_date" date,
	"receipt_no" varchar(10),
	"cheque_no" varchar(10),
	"debit" numeric(10, 2),
	"credit" numeric(10, 2),
	"balance" numeric(15, 2),
	"trans_type" numeric(2, 0),
	"date_entered" date DEFAULT now() NOT NULL,
	"display_name" varchar(5),
	"account" numeric(5, 0)
);
--> statement-breakpoint
CREATE TABLE "cheque_payment" (
	"payment_no" serial PRIMARY KEY NOT NULL,
	"cheque_no" varchar(10),
	"cheque_date" date,
	"cheque_amount" numeric(10, 2),
	"payee" varchar(100),
	"payee_type" numeric(3, 0),
	"dispatched" numeric(1, 0),
	"date_dispatched" date,
	"user_id" varchar(100),
	"date_entered" date DEFAULT now() NOT NULL,
	"deduction" numeric(10, 2),
	"vno_ovrd" varchar(10),
	"pno_ovrd" numeric(10, 0),
	"pay_ovrd" numeric(1, 0),
	"override_amt" numeric(10, 2),
	"vno_ovrd_exec" varchar(10),
	"pno_ovrd_exec" numeric(10, 0),
	"pay_ovrd_exec" numeric(1, 0),
	"override_amt_exec" numeric(10, 2),
	"total_commission" numeric(10, 2),
	"wh_tax_rate" numeric(10, 2),
	"wh_tax_amt" numeric(10, 2),
	"override_rate" numeric(10, 2),
	"commis_deduction" numeric(10, 2),
	"agent_id" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "claim_form" (
	"id" serial PRIMARY KEY NOT NULL,
	"claim_no" varchar(25),
	"visit_date" date,
	"attending_doc" numeric(5, 0),
	"doctor_sign" numeric(1, 0),
	"doctor_date" date,
	"claim_form_signed" numeric(1, 0),
	"date_admitted" date,
	"date_discharged" date,
	"user_id" varchar(100),
	"date_entered" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "claim_lines" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_name" varchar(255),
	"quantity" numeric(5, 0),
	"unit_price" numeric(15, 2),
	"total_amount" numeric(15, 2),
	"claim_no" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "claims_batch" (
	"idx" serial PRIMARY KEY NOT NULL,
	"batch_no" varchar(10),
	"batch_date" date,
	"batch_user" varchar(100),
	"claims_count" numeric(3, 0),
	"data_entry_user" varchar(100),
	"date_entry_date" date,
	"vetting_user" varchar(100),
	"vetting_user_date" date,
	"authorising_user" varchar(100),
	"authorising_user_date" date,
	"finance_user" varchar(100),
	"finance_user_date" date,
	"provider" numeric(5, 0),
	"date_received" date
);
--> statement-breakpoint
CREATE TABLE "claims_reserve" (
	"id" serial PRIMARY KEY NOT NULL,
	"pre_auth_no" numeric(7, 0),
	"member_no" varchar(30),
	"trans_type" numeric(1, 0),
	"debit" numeric(10, 2),
	"credit" numeric(10, 2),
	"user_id" varchar(100),
	"date_entered" date DEFAULT now() NOT NULL,
	"old_amt" numeric(10, 2),
	"pre_auth_code" varchar(30),
	"care_picked" integer,
	"sc_id" integer,
	"pre_auth_edit_id" integer
);
--> statement-breakpoint
CREATE TABLE "claims_roles_excess" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" integer,
	"benefit" integer,
	"user_id" varchar(100),
	"claim_stage" integer,
	"user_name" varchar(30),
	"date_entered" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "claims_voucher_authorization" (
	"idx" serial PRIMARY KEY NOT NULL,
	"title" integer,
	"min_amount" numeric(10, 2),
	"max_amount" numeric(10, 2),
	"benefit" integer
);
--> statement-breakpoint
CREATE TABLE "client_package" (
	"code" serial PRIMARY KEY NOT NULL,
	"package_prefix" varchar(10),
	"package_prefix_name" varchar(50),
	"binded" integer,
	"client_class" integer,
	"cut_off_age" numeric(2, 0)
);
--> statement-breakpoint
CREATE TABLE "client_rates" (
	"idx" serial PRIMARY KEY NOT NULL,
	"benefit" numeric(10, 0),
	"premium_type" numeric(2, 0),
	"family_size" numeric(2, 0),
	"limit" numeric(10, 2),
	"premium" numeric(10, 2),
	"min_age" numeric(3, 0),
	"max_age" numeric(3, 0),
	"re_rate" numeric(10, 2),
	"individual" numeric(2, 0),
	"insurer" numeric(2, 0),
	"corp_id" varchar(10),
	"principal_applicant" varchar(20),
	"member_status" varchar(30),
	"category" varchar(20),
	"prorated" integer,
	"anniv" numeric(3, 0)
);
--> statement-breakpoint
CREATE TABLE "client_standard_rates" (
	"idx" serial PRIMARY KEY NOT NULL,
	"benefit" numeric(10, 0),
	"limit" numeric(10, 0),
	"fam_size" varchar(10),
	"premium" numeric(10, 0),
	"option" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "client_unallocated_amt" (
	"client" varchar(15) PRIMARY KEY NOT NULL,
	"unallocated_amt" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "clinical_diagnosis" (
	"idx" serial PRIMARY KEY NOT NULL,
	"diagnosis_class" varchar(10),
	"clinical_diagnosis" varchar(300),
	"diag_code" varchar(10),
	"diag_category" varchar(10),
	"diag_title" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "clinical_procedure" (
	"idx" serial PRIMARY KEY NOT NULL,
	"procedure_class" varchar(10),
	"clinical_procedure" varchar(120)
);
--> statement-breakpoint
CREATE TABLE "comment_complaint" (
	"code" serial PRIMARY KEY NOT NULL,
	"comment" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "commis_reversal" (
	"commis_rev_id" serial PRIMARY KEY NOT NULL,
	"commis_voucher" varchar(30),
	"rev_reason_id" integer,
	"user_name" varchar(30),
	"date_entered" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commission_deduction" (
	"idx" serial PRIMARY KEY NOT NULL,
	"deduction" numeric(10, 2) NOT NULL,
	"voucher_no" varchar(10) NOT NULL,
	"payment_no" numeric(5, 0),
	"amount" numeric(10, 2) NOT NULL,
	"receipt_no" varchar(15)
);
--> statement-breakpoint
CREATE TABLE "contact_relation" (
	"code" serial PRIMARY KEY NOT NULL,
	"relation" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "contra_cheques" (
	"idx" serial PRIMARY KEY NOT NULL,
	"item_name" varchar(255),
	"cheque_date" date NOT NULL,
	"unit_price" numeric(15, 2)
);
--> statement-breakpoint
CREATE TABLE "corp_admin_fee" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"anniv" numeric(3, 0) NOT NULL,
	"admin_fee_type" numeric(2, 0),
	"admin_fee_rate" numeric(10, 2),
	"admin_fee_amt" numeric(10, 2),
	"employer_copay" numeric(10, 2),
	"employee_copay" numeric(10, 2),
	"upfront_copay" numeric(10, 2),
	"agent_commis_rate" numeric(7, 2),
	"commis_whtax_rate" numeric(7, 2),
	"rem_rule" integer
);
--> statement-breakpoint
CREATE TABLE "corp_anniversary" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"anniv" numeric(2, 0) NOT NULL,
	"start_date" date,
	"end_date" date,
	"renewal_date" date,
	"agent_id" varchar(10),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"renewal_notified" numeric(1, 0),
	"sync" numeric(1, 0),
	"smart_sync" numeric(1, 0),
	"corp_status" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "corp_benefits" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"anniv" numeric(2, 0) NOT NULL,
	"category" numeric(2, 0) NOT NULL,
	"benefit" numeric(3, 0) NOT NULL,
	"sharing" numeric(1, 0),
	"start_date" date,
	"end_date" date,
	"renewal_date" date,
	"agent_id" varchar(10),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"fund_amt" numeric(10, 2),
	"re_insurer" numeric(2, 0)
);
--> statement-breakpoint
CREATE TABLE "corp_contact_person" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"title" numeric(2, 0) NOT NULL,
	"surname" varchar(200),
	"first_name" varchar(20),
	"other_names" varchar(20),
	"job_title" numeric(2, 0),
	"mobile_no" varchar(30),
	"tel_no" varchar(20),
	"email" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "corp_fund_rules" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"anniv" numeric(1, 0) NOT NULL,
	"rules" numeric(2, 0) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "corp_fund_share" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"fund_amt" numeric(10, 2),
	"sharing" numeric(1, 0),
	"shared_amt" numeric(10, 2),
	"anniv" numeric(1, 0)
);
--> statement-breakpoint
CREATE TABLE "corp_groups" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10) NOT NULL,
	"anniv" numeric(2, 0) NOT NULL,
	"category" varchar(10) NOT NULL,
	"benefit" numeric(3, 0) NOT NULL,
	"fund" numeric(1, 0),
	"limit" numeric(10, 2),
	"sub_limit_of" numeric(3, 0),
	"sharing" numeric(1, 0),
	"sync" numeric(1, 0),
	"smart_sync" numeric(1, 0),
	"utilize" numeric(4, 2),
	"suspend_at" integer,
	"waiting_period" integer,
	"start_date" date,
	"end_date" date,
	"bed_limit" numeric(18, 2),
	"allocate_to" integer,
	"allocated_to" integer,
	"ward_bed" integer,
	"group_limit" numeric(15, 2),
	"smart_picked" integer,
	"frequency" numeric(5, 0)
);
--> statement-breakpoint
CREATE TABLE "corp_provider" (
	"idx" serial PRIMARY KEY NOT NULL,
	"provider" numeric(5, 0),
	"corp_id" varchar(10),
	"all_provider" numeric(1, 0),
	"category" varchar(5),
	"benefit" numeric(1, 0),
	"co_pay" numeric(1, 0),
	"copay_amt" numeric(5, 0),
	"service" numeric(3, 0),
	"anniv" numeric(2, 0),
	"smart_sync" integer,
	"sync" integer,
	"provider_class" integer,
	"care_picked" integer,
	"copay_type" numeric(2, 0),
	"copay_ceiling" numeric(15, 2)
);
--> statement-breakpoint
CREATE TABLE "corp_service_points" (
	"idx" serial PRIMARY KEY NOT NULL,
	"provider" varchar(10),
	"anniv" numeric(2, 0),
	"corp_id" varchar(10),
	"sync" numeric(1, 0),
	"smart_sync" numeric(1, 0),
	"category" varchar(15)
);
--> statement-breakpoint
CREATE TABLE "corp_xol_setup" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10),
	"benefit" numeric(5, 0),
	"anniv" numeric(2, 0),
	"group_limit" numeric(15, 2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"expenditure" numeric(15, 2)
);
--> statement-breakpoint
CREATE TABLE "corporate_copay" (
	"copay_id" serial PRIMARY KEY NOT NULL,
	"benefit" integer,
	"copay_amt" numeric(10, 2),
	"service" integer,
	"all_provider" integer,
	"provider" integer,
	"provider_class" integer,
	"category" char(10),
	"product_id" integer
);
--> statement-breakpoint
CREATE TABLE "corporate_products" (
	"corp_prid" serial PRIMARY KEY NOT NULL,
	"product_id" integer,
	"category" char(10),
	"benefit" integer,
	"limit" numeric(10, 2),
	"sub_limit_of" integer,
	"sharing" integer,
	"waiting_prd" integer,
	"bed_limit" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "corporate_rules" (
	"rule_id" serial PRIMARY KEY NOT NULL,
	"rules" char(100),
	"min" integer,
	"max" integer,
	"product_id" integer,
	"abbreviation" char(5)
);
--> statement-breakpoint
CREATE TABLE "corporate_status" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(20) NOT NULL,
	"status_id" integer NOT NULL,
	"anniv" integer,
	"date_can" date NOT NULL,
	"reason" integer,
	"date_entered" date,
	"user_id" varchar(100),
	"sync" integer,
	"smart_sync" integer
);
--> statement-breakpoint
CREATE TABLE "corporate" (
	"corp_id" varchar(10) NOT NULL,
	"corporate" varchar(70),
	"tel_no" varchar(20),
	"fax_no" varchar(20),
	"mobile_no" varchar(30),
	"postal_add" varchar(20),
	"town" numeric(5, 0),
	"phy_loc" varchar(100),
	"email" varchar(300),
	"user_id" varchar(100),
	"agent_id" varchar(10),
	"scheme" varchar(10),
	"cancelled" numeric(1, 0),
	"insurer" numeric(3, 0),
	"underwrite" numeric(1, 0),
	"waiting_period" numeric(2, 0),
	"enhanced" numeric(1, 0),
	"acct_no" varchar(10),
	"policy_no" varchar(30),
	"individual" numeric(1, 0),
	"idx" serial PRIMARY KEY NOT NULL,
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"branch" varchar(10),
	"abbreviation" varchar(20),
	"uploaded" numeric(1, 0),
	"corp_pin" varchar(50),
	"care_picked" numeric(1, 0),
	"client_code" varchar(10),
	"currency" varchar(10),
	"age_cut_off" integer,
	"smart_sync" integer,
	"sync" integer,
	"authorized" integer,
	"authorized_date" timestamp,
	"authorized_by" varchar(100),
	"locked" integer,
	"segment" numeric(2, 0),
	"over_age_at" numeric(2, 0),
	CONSTRAINT "corporate_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
CREATE TABLE "country" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "country_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" varchar(255) NOT NULL,
	CONSTRAINT "country_country_unique" UNIQUE("country")
);
--> statement-breakpoint
CREATE TABLE "cover_placing" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10),
	"principal_no" varchar(15),
	"start_date" date,
	"end_date" date,
	"benefit" numeric(5, 0) NOT NULL,
	"premium" numeric(10, 2),
	"family_count" numeric(5, 0),
	"total_premium" numeric(10, 2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"insurer" numeric(2, 0)
);
--> statement-breakpoint
CREATE TABLE "credited_fund" (
	"code" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10),
	"date_credited" date,
	"fund_amount" numeric(10, 2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"cheque_no" varchar(50),
	"receipt_no" varchar(20),
	"invoice_no" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "dat" (
	"Column1" varchar(254),
	"Column2" varchar(254),
	"Column3" varchar(254),
	"Column4" varchar(254),
	"Column5" varchar(254),
	"Column6" varchar(254),
	"Column7" varchar(254),
	"Column8" varchar(254),
	"Column9" varchar(254),
	"Column10" varchar(254),
	"Column11" varchar(254),
	"Column12" varchar(254),
	"Column13" varchar(254),
	"Column14" varchar(254)
);
--> statement-breakpoint
CREATE TABLE "data" (
	"Column1" varchar(254),
	"Column2" varchar(254),
	"Column3" varchar(254),
	"Column4" varchar(254),
	"Column5" varchar(254),
	"Column6" varchar(254),
	"Column7" varchar(254),
	"Column8" varchar(254),
	"Column9" varchar(254),
	"Column10" varchar(254),
	"Column11" varchar(254),
	"Column12" varchar(254),
	"Column13" varchar(254),
	"Column14" varchar(254)
);
--> statement-breakpoint
CREATE TABLE "decline_letter" (
	"code" numeric(10, 0) PRIMARY KEY NOT NULL,
	"member_no" varchar(20),
	"provider" numeric(10, 0),
	"decline_date" date,
	"admitted_date" date,
	"decline_reason" numeric(2, 0),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"family_no" varchar(15),
	"decline_notes" varchar(70)
);
--> statement-breakpoint
CREATE TABLE "deduction_reason" (
	"code" serial PRIMARY KEY NOT NULL,
	"deduct_reason" varchar(100),
	"category" numeric(2, 0)
);
--> statement-breakpoint
CREATE TABLE "delete_log" (
	"code" serial PRIMARY KEY NOT NULL,
	"testname" varchar(32) NOT NULL,
	"timetested" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deleted_log" (
	"code" serial PRIMARY KEY NOT NULL,
	"deleted_info" varchar(100),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"deleted_class" numeric(2, 0)
);
--> statement-breakpoint
CREATE TABLE "department" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "department_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"department" varchar(255) NOT NULL,
	CONSTRAINT "department_department_unique" UNIQUE("department")
);
--> statement-breakpoint
CREATE TABLE "diagnosis" (
	"code" serial PRIMARY KEY NOT NULL,
	"diagnosis" varchar(200)
);
--> statement-breakpoint
CREATE TABLE "discount_rate" (
	"code" serial PRIMARY KEY NOT NULL,
	"min_discount_amount" numeric(20, 2),
	"discount_level" numeric(2, 0),
	"provider" numeric(10, 0),
	"discount" numeric(7, 2),
	"max_discount_amt" numeric(20, 2)
);
--> statement-breakpoint
CREATE TABLE "doctor" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "doctor_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"doctor" varchar(255) NOT NULL,
	"tel_no" varchar(20) NOT NULL,
	"mobile_no" varchar(20) NOT NULL,
	"fax_no" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "doctor_doctor_unique" UNIQUE("doctor"),
	CONSTRAINT "doctor_tel_no_unique" UNIQUE("tel_no"),
	CONSTRAINT "doctor_mobile_no_unique" UNIQUE("mobile_no"),
	CONSTRAINT "doctor_fax_no_unique" UNIQUE("fax_no"),
	CONSTRAINT "doctor_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "drugs_list" (
	"code" numeric(10, 0) PRIMARY KEY NOT NULL,
	"drug_code" varchar(10),
	"drug_name" varchar(50),
	"unit_price" numeric(10, 2),
	"updated" timestamp
);
--> statement-breakpoint
CREATE TABLE "dummy" (
	"dental" varchar(30),
	"optical" varchar(30),
	"maternity" varchar(30),
	"numeric_one" numeric(10, 2),
	"numeric_two" numeric(10, 2),
	"numeric_three" numeric(10, 2),
	"numeric_four" numeric(10, 2),
	"numeric_five" numeric(10, 2),
	"numeric_six" numeric(10, 2),
	"numeric_seven" numeric(10, 2),
	"date_one" date,
	"start_date" date,
	"end_date" date,
	"principal_name" varchar(100),
	"string_five" varchar(30),
	"numeric_8" numeric(10, 0),
	"string_six" varchar(30),
	"string_seven" varchar(60),
	"string_eight" varchar(60),
	"string_9" varchar(60),
	"string_10" varchar(10),
	"string_11" varchar(70),
	"string_12" varchar(30),
	"string_13" varchar(10) PRIMARY KEY NOT NULL,
	"string_14" varchar(70),
	"numeric_9" numeric(5, 0),
	"numeric_10" numeric(5, 0),
	"numeric_11" numeric(5, 0),
	"numeric_12" numeric(5, 0),
	"date_4" date,
	"numeric_14" numeric(5, 0),
	"numeric_15" numeric(5, 0),
	"numeric_16" numeric(5, 0),
	"numeric_17" numeric(5, 0),
	"string_15" varchar(10),
	"date_5" date,
	"time_1" time,
	"date_6" date,
	"string_18" varchar(10),
	"string_19" varchar(10),
	"numeric_18" numeric(5, 0),
	"num_19" numeric(10, 2),
	"num_20" numeric(10, 2),
	"num_21" numeric(10, 2),
	"num_22" numeric(10, 2),
	"num_23" numeric(10, 2),
	"num_24" numeric(10, 2),
	"family_no" varchar(20),
	"member_no" varchar(20),
	"scheme_no" varchar(20),
	"surname" varchar(60),
	"first_name" varchar(60),
	"other_names" varchar(60),
	"mobile_no" varchar(30),
	"dob" varchar(30),
	"idno" varchar(30),
	"pre_dep" varchar(30),
	"gender" varchar(30),
	"category" varchar(30),
	"corp_id" varchar(30),
	"fam_rela" varchar(30),
	"idx" varchar(20),
	"voucher_no" varchar(20),
	"voucher_date" date,
	"voucher_amt" numeric(10, 2),
	"payee_code" varchar(20),
	"payee_name" varchar(100),
	"user_id" varchar(100),
	"inpatient" varchar(20),
	"outpatient" varchar(20),
	"corporate" varchar(100),
	"policy_no" varchar(20),
	"member_name" varchar(100),
	"provider" varchar(100),
	"invoice_date" date,
	"invoice_no" varchar(50),
	"invoice_amount" numeric(10, 0),
	"link" numeric(5, 0),
	"error_desc" varchar(100),
	"claim_no" varchar(50),
	"paid_amt" numeric(10, 2),
	"recover_rate" numeric(10, 2),
	"recover_amt" numeric(10, 2),
	"benefit" varchar(50),
	"insured" varchar(50),
	"gross_prem" numeric(10, 2),
	"cede_prem" numeric(10, 2),
	"commission_amt" numeric(10, 2),
	"prem_tax" numeric(10, 2),
	"cheque_no" varchar(20),
	"claimant" varchar(60),
	"cheque_amt" numeric(10, 2),
	"cheque_date" date,
	"client" varchar(50),
	"trans_date" date,
	"transaction" varchar(20),
	"debit_gross" numeric(10, 2),
	"phcf" numeric(10, 2),
	"tl" numeric(10, 2),
	"sd" numeric(10, 2),
	"debit" numeric(10, 2),
	"credit" numeric(10, 2),
	"ip_prem" numeric(10, 2),
	"op_prem" numeric(10, 2),
	"tax" numeric(10, 2),
	"net_premium" numeric(10, 2),
	"principal" varchar(70),
	"renewal_date" date,
	"anniv" numeric(3, 0),
	"date_received" date,
	"batch_no" varchar(20),
	"batch_user" varchar(10),
	"claims_count" numeric(20, 0),
	"data_entrant" varchar(10),
	"entrant_date" date,
	"vetter" varchar(10),
	"vetting_date" date,
	"authoriser" varchar(10),
	"authorising_date" date,
	"finance" varchar(10),
	"finance_date" date,
	"batch_period" numeric(3, 0),
	"personal_accident" varchar(10),
	"last_expense" varchar(10),
	"pre_existing_diagnosis" varchar(10),
	"congenital" varchar(10),
	"psychiatric" varchar(10),
	"first_emergency_cs" varchar(10),
	"ip_non_accidental_dental" varchar(10),
	"ip_non_accidental_optical" varchar(10),
	"post_hospitalization" varchar(10),
	"inpatient_and_outpatient" varchar(10),
	"dental_optical" varchar(10),
	"batch_date" date,
	"proxy_payee" varchar(20),
	"bill_amt" numeric(10, 2),
	"string_one" varchar(50),
	"string_two" varchar(50),
	"string_three" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "email_details" (
	"idx" serial PRIMARY KEY NOT NULL,
	"title_sub" varchar(50),
	"body" varchar(600),
	"group_id" numeric,
	"email_status" numeric
);
--> statement-breakpoint
CREATE TABLE "email" (
	"code" serial PRIMARY KEY NOT NULL,
	"email_address" varchar(50),
	"group_id" numeric,
	"email_status" numeric
);
--> statement-breakpoint
CREATE TABLE "employer" (
	"code" serial PRIMARY KEY NOT NULL,
	"employer" varchar(60)
);
--> statement-breakpoint
CREATE TABLE "err_mem" (
	"code" serial PRIMARY KEY NOT NULL,
	"old_mem" varchar(50),
	"new_mem" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "error" (
	"idx" serial PRIMARY KEY NOT NULL,
	"error_code" varchar(100),
	"error_desc" varchar(2000),
	"error_date" date,
	"user_id" varchar(100),
	"solved" numeric
);
--> statement-breakpoint
CREATE TABLE "exceed_invoice_details" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20),
	"benefit" numeric,
	"amount" numeric(10, 2),
	"invoice_no" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "exceed_invoice_sap" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(20),
	"invoice_date" date,
	"exceeded_acct" varchar(20),
	"invoice_amount" numeric(10, 2),
	"cost_crt" varchar(20),
	"dr_cr" varchar(5),
	"profit_crt" varchar(20),
	"client_no" varchar(20),
	"client_name" varchar(70),
	"payment_type" varchar(10),
	"user_id" varchar(100),
	"sent_status" varchar(1),
	"sent_date" timestamp,
	"error_msg" varchar(300)
);
--> statement-breakpoint
CREATE TABLE "exceeded_limit_invoice_sap" (
	"inv_id" serial PRIMARY KEY NOT NULL,
	"exceeded_acct" varchar(20),
	"exceeded_amt" numeric(10, 2),
	"cost_crt" varchar(20),
	"currency" varchar(5),
	"exceeded_dr_cr" varchar(5),
	"narration" varchar(50),
	"profit_crt" varchar(20),
	"cust_acct" varchar(20),
	"cust_dr_cr" varchar(5),
	"sent_to_sap" varchar(1),
	"sent_to_sap_date" timestamp,
	"error_msg" varchar(300),
	"invoice_no" varchar(20),
	"invoice_date" date
);
--> statement-breakpoint
CREATE TABLE "exceeded_limit_invoice" (
	"invoice_no" varchar(10) PRIMARY KEY NOT NULL,
	"corp_id" varchar(10),
	"member_no" varchar(20),
	"invoice_date" date,
	"invoice_amt" numeric(10, 2),
	"idx" numeric,
	"agent_id" varchar(10),
	"anniv" numeric,
	"date_entered" date,
	"user_id" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "exceeded_limit_receipt" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(30),
	"receipt_no" varchar(20),
	"corp_id" varchar(5),
	"member_no" varchar(20),
	"receipt_date" date,
	"receipt_amt" numeric(10, 2),
	"agent_id" varchar(5),
	"user_id" varchar(100),
	"date_entered" date,
	"cancelled" numeric
);
--> statement-breakpoint
CREATE TABLE "excise_duty" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(20) NOT NULL,
	"invoice_date" date,
	"excise_acct" varchar(20),
	"excise_narr" varchar(50),
	"excise_amount" numeric(10, 2),
	"excise_dr_cr" varchar(5),
	"currency" varchar(5),
	"profit_crt" varchar(20),
	"cost_crt" varchar(20),
	"cust_acct" varchar(20),
	"cust_narr" varchar(50),
	"cust_amount" numeric(10, 2),
	"cust_dr_cr" varchar(5),
	"acct" varchar(20),
	"acct_narr" varchar(50),
	"acct_amount" numeric(10, 2),
	"acct_dr_cr" varchar(5),
	"sent_to_sap" varchar(1),
	"sent_to_sap_date" timestamp,
	"error_msg" varchar(300)
);
--> statement-breakpoint
CREATE TABLE "exclusions" (
	"code" serial PRIMARY KEY NOT NULL,
	"exclusion" varchar(70)
);
--> statement-breakpoint
CREATE TABLE "external_claim_sources" (
	"code" serial PRIMARY KEY NOT NULL,
	"source_name" varchar(5)
);
--> statement-breakpoint
CREATE TABLE "family_deposit" (
	"idx" serial PRIMARY KEY NOT NULL,
	"anniv" numeric(2),
	"family_no" varchar(20),
	"member_no" varchar(20),
	"amount" numeric(10, 2),
	"pay_date" date,
	"pay_mode" numeric(2),
	"cheque_no" varchar(10),
	"receipt_no" varchar(10),
	"bank" numeric(5),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar(100),
	"admin_fee" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "family_relation" (
	"code" serial PRIMARY KEY NOT NULL,
	"relation" varchar(30),
	"class" numeric(2),
	"nuclear" numeric(2)
);
--> statement-breakpoint
CREATE TABLE "financer_conditions" (
	"fin_code" serial PRIMARY KEY NOT NULL,
	"condition" numeric(2),
	"description" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "financer" (
	"fin_code" serial PRIMARY KEY NOT NULL,
	"financer" varchar(50),
	"rate" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "finger_print_removal" (
	"rec_id" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(15),
	"anniv" numeric(2),
	"reason" numeric(3),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"smart_sync" numeric(1),
	"sync" numeric(1)
);
--> statement-breakpoint
CREATE TABLE "fund_deposit" (
	"invoice_no" varchar(10) PRIMARY KEY NOT NULL,
	"corp_id" varchar(20),
	"member_no" varchar(20),
	"agent_id" varchar(5),
	"client_code" varchar(20),
	"deposit_amount" numeric(10, 2),
	"top_up_amount" numeric(10, 2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"uploaded" numeric(1),
	"idx" numeric(10),
	"anniv" numeric(2)
);
--> statement-breakpoint
CREATE TABLE "fund_invoice_details" (
	"invoice_no" varchar(15) PRIMARY KEY NOT NULL,
	"category" numeric(2),
	"benefit" numeric(3),
	"re_insurer" numeric(2),
	"sharing" numeric(2),
	"shared_amt" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "fund_journal_status" (
	"fund_id" serial PRIMARY KEY NOT NULL,
	"voucher_no" char(20),
	"sent_to_sap" char(1),
	"sent_to_sap_date" timestamp,
	"return_error_msg" char(300)
);
--> statement-breakpoint
CREATE TABLE "get_receipt_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"receipt_no" varchar(50),
	"status_date" date,
	"status" numeric,
	"error" varchar(300)
);
--> statement-breakpoint
CREATE TABLE "getdubclns" (
	"idx" serial PRIMARY KEY NOT NULL,
	"clno" varchar(20),
	"vdate" date,
	"skip" numeric(1),
	"docsin" numeric(1),
	"docdate" date,
	"formsin" numeric(1),
	"adm" date,
	"disch" date,
	"userid" varchar(10),
	"dateent" date
);
--> statement-breakpoint
CREATE TABLE "getdubinvs" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invs" varchar(20) NOT NULL,
	"prov" numeric(5) NOT NULL,
	"serv" numeric(3) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "getmno" (
	"idx" serial PRIMARY KEY NOT NULL,
	"txt" varchar(7000)
);
--> statement-breakpoint
CREATE TABLE "gl_accounts" (
	"gl_id" serial PRIMARY KEY NOT NULL,
	"gl_acct_name" char(50),
	"gl_desc" char(70),
	"profit_center" char(20),
	"cost_center" char(20),
	"dr_cr" char(10),
	"acct_id" numeric
);
--> statement-breakpoint
CREATE TABLE "group_role" (
	"idx" serial PRIMARY KEY NOT NULL,
	"group" numeric(3),
	"roles" numeric(3)
);
--> statement-breakpoint
CREATE TABLE "hais_smart_triggers" (
	"idx" serial PRIMARY KEY NOT NULL,
	"date_added" date,
	"user_id" varchar(100),
	"trigger_id" numeric NOT NULL,
	"trigger_ref" varchar(150),
	"reason" varchar(150),
	"smart_synced" numeric
);
--> statement-breakpoint
CREATE TABLE "hidex_test" (
	"idx" serial PRIMARY KEY NOT NULL,
	"testname" varchar(30),
	"loaded" numeric(1)
);
--> statement-breakpoint
CREATE TABLE "import_names" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(15) NOT NULL,
	"import_m_names" varchar(30),
	"invoiced_amount" numeric(10),
	"invoice_date" date,
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"service" numeric(2),
	"refund" numeric(1),
	"claim_nature" numeric(2),
	"import" numeric(1),
	"provider" numeric(1),
	"claim_no" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "incomplete_forms" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(10),
	"missing_item" numeric(3)
);
--> statement-breakpoint
CREATE TABLE "individual_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(10),
	"category" varchar(10),
	"limit" numeric(10),
	"sharing" numeric(2),
	"sub_limit_of" numeric(3),
	"benefit" numeric(3),
	"waiting_period" numeric(5),
	"bed_limit" numeric(10, 2),
	"re_insurer" numeric
);
--> statement-breakpoint
CREATE TABLE "individual_provider_copay" (
	"idx" serial PRIMARY KEY NOT NULL,
	"corp_id" varchar(20),
	"provider" numeric(5),
	"all_provider" numeric(1),
	"benefit" numeric(1),
	"co_pay" numeric(1),
	"copay_amt" numeric(20, 2),
	"copay_service" numeric(2),
	"provider_class" numeric,
	"client_id" numeric,
	"category" char(10)
);
--> statement-breakpoint
CREATE TABLE "insurer" (
	"insurer_code" numeric(3) NOT NULL,
	"insurer_name" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "insurer_invoice" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(7),
	"invoice_date" date,
	"invoice_amt" numeric(10, 2),
	"client" varchar(10),
	"insurer" numeric(2),
	"date_entered" date,
	"user_id" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "insurer_receipt" (
	"codidxe" serial PRIMARY KEY NOT NULL,
	"receipt_no" varchar(7) NOT NULL,
	"cheque_no" varchar(10),
	"receipt_date" date,
	"receipt_amt" numeric(10, 2),
	"insurer" numeric(2),
	"invoice_no" varchar(20),
	"client" varchar(10),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"bank" numeric(10)
);
--> statement-breakpoint
CREATE TABLE "insuring_rates" (
	"code" numeric(3) PRIMARY KEY NOT NULL,
	"full_desc" varchar(35),
	"benefit" numeric(2),
	"limit" numeric(10, 2),
	"family_size" numeric(2),
	"premium" numeric(10, 2),
	"client" numeric(1),
	"year" numeric(4),
	"insurer" numeric(2)
);
--> statement-breakpoint
CREATE TABLE "invalid_bill_reasons" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(50) NOT NULL,
	"service" numeric(5) NOT NULL,
	"provider" varchar(10) NOT NULL,
	"reason" numeric(5) NOT NULL,
	"notes" varchar(100),
	"reference_no" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "invalid_bills" (
	"idx" serial PRIMARY KEY NOT NULL,
	"invoice_no" varchar(50) NOT NULL,
	"service" numeric(2) NOT NULL,
	"provider" numeric(5) NOT NULL,
	"valid" numeric(1),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"member_no" varchar(20),
	"invoice_amt" numeric(10, 2),
	"invoice_date" date,
	"batch_no" varchar(10),
	"reference_no" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "invalid_reasons" (
	"code" serial PRIMARY KEY NOT NULL,
	"reason" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "investor_contribution" (
	"idx" serial PRIMARY KEY NOT NULL,
	"policy_no" varchar(20),
	"period" date,
	"injection" numeric(1),
	"total_premium" numeric(10, 2),
	"life_premium" numeric(10, 2),
	"pa_premium" numeric(10, 2),
	"funeral_premium" numeric(10, 2),
	"policy_fee" numeric(10, 2),
	"phcf" numeric(10, 2),
	"agent_commission" numeric(10, 2),
	"monthly_investment" numeric(10, 2),
	"annual_rate" numeric(10, 2),
	"monthly_rate" numeric(10, 2),
	"monthly_interest" numeric(10, 2),
	"total_investment" numeric(10, 2),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar(100),
	"opening_balance" numeric(10, 2),
	"allocation" numeric(5, 2),
	"investment_allocation" numeric(10, 2),
	"retained_allocation" numeric(10, 2),
	"next_period" varchar(6),
	"unit_price" numeric(10, 2),
	"no_of_units" numeric(10, 2),
	"receipt_date" date,
	"receipt_no" varchar(15),
	"frequency" varchar(1)
);
--> statement-breakpoint
CREATE TABLE "investor_suspense" (
	"idx" serial PRIMARY KEY NOT NULL,
	"policy_no" varchar(20),
	"description" numeric(2),
	"resolved" numeric(1),
	"amount" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "invoice_detail" (
	"code" serial PRIMARY KEY NOT NULL,
	"service" numeric(2),
	"claim_no" varchar(15),
	"invoice_no" varchar(15),
	"item_id" varchar(10),
	"unit_cost" numeric(10, 2),
	"quantity" numeric(10, 2),
	"expected_cost" numeric(10, 2),
	"invoiced_cost" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "invoice_interval" (
	"code" serial PRIMARY KEY NOT NULL,
	"interval" varchar(15)
);
--> statement-breakpoint
CREATE TABLE "kumemnos" (
	"idx" serial PRIMARY KEY NOT NULL,
	"fam" varchar(10),
	"famno" varchar(15),
	"memno" varchar(15),
	"surname" varchar(40),
	"firstname" varchar(40),
	"grad" varchar(20),
	"desig" varchar(50),
	"dob" date,
	"famsize" varchar(15),
	"gende" varchar(1),
	"fampos" numeric(5)
);
--> statement-breakpoint
CREATE TABLE "last_number" (
	"idx" serial PRIMARY KEY NOT NULL,
	"task_desk" varchar(20),
	"last_no" numeric(10),
	"locker" numeric
);
--> statement-breakpoint
CREATE TABLE "ledger_trans_types" (
	"code" serial PRIMARY KEY NOT NULL,
	"trans_type" varchar(40)
);
--> statement-breakpoint
CREATE TABLE "login_tries" (
	"code" serial PRIMARY KEY NOT NULL,
	"user_id" varchar(100),
	"date_tried" date,
	"password_tried" varchar(20),
	"success" numeric(1),
	"time_tried" time
);
--> statement-breakpoint
CREATE TABLE "mb_pre_auth" (
	"idx" serial PRIMARY KEY NOT NULL,
	"pre_auth_no" serial NOT NULL,
	"member_no" varchar(20),
	"date_requested" date,
	"diagnosis" varchar(255),
	"ben_code" numeric(5),
	"prov_code" varchar(15),
	"requested_amt" numeric(15, 2),
	"deducted_amt" numeric(15, 2),
	"deduction_reason" varchar(255),
	"approved_amount" numeric(15, 2),
	"request_notes" varchar(255),
	"requested_by" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "member_acceptance" (
	"code" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"status" numeric(1),
	"status_date" date,
	"comments" varchar(70),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"def_rej" numeric(2)
);
--> statement-breakpoint
CREATE TABLE "member_admissions" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"hospital" varchar(40),
	"attending_doc" varchar(40),
	"addmission_date" date,
	"discharge_date" date,
	"addmission_no" varchar(10)
);
--> statement-breakpoint
CREATE TABLE "member_allergy" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"allergy" numeric(2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_anniversary_copy" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"start_date" date,
	"end_date" date,
	"renewal_date" date,
	"anniv" numeric(2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"sync" numeric(1),
	"renewal_notified" numeric(1),
	"agent_commis_rate" numeric(7, 2),
	"commis_whtax_rate" numeric(7, 2)
);
--> statement-breakpoint
CREATE TABLE "member_benefits" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"benefit" numeric(3) NOT NULL,
	"limit" numeric(10, 2),
	"sharing" numeric(1),
	"re_insurer" numeric(2),
	"anniv" numeric(2) NOT NULL,
	"sub_limit_of" numeric(3),
	"suspended" numeric(1),
	"category" varchar(10),
	"fund" numeric(1),
	"suspended_date" date,
	"capitated" numeric(1),
	"waiting_period" numeric(3),
	"utilize" numeric(3, 2),
	"expense" numeric(10, 2),
	"balance" numeric(10, 2),
	"threshold" numeric(10, 2),
	"care_picked" numeric(1),
	"reserve_amt" numeric(10, 2),
	"smart_sync" integer,
	"sync" integer,
	"suspend_at" integer,
	"bed_limit" numeric(10, 2),
	"group_limit" numeric(15, 2),
	"frequency" numeric(5)
);
--> statement-breakpoint
CREATE TABLE "member_cancellation" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"cancelled" numeric(1) NOT NULL,
	"date_can" date,
	"anniv" numeric(2),
	"reason" numeric(2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"sync" numeric(1),
	"smart_sync" numeric(1)
);
--> statement-breakpoint
CREATE TABLE "member_diagnosis" (
	"idx" serial PRIMARY KEY NOT NULL,
	"claim_no" varchar(25) NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"diagnosis" numeric(5) NOT NULL,
	"id" numeric(10)
);
--> statement-breakpoint
CREATE TABLE "member_differ_reject" (
	"idx" serial PRIMARY KEY NOT NULL,
	"reason" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "member_doctor" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"doctor" varchar(20) NOT NULL,
	"tel_no" varchar(20),
	"mobile_no" varchar(20),
	"postal_add" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "member_exclusion" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"exclusion" numeric(2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_info" (
	"idx" serial PRIMARY KEY NOT NULL,
	"family_no" varchar(20) NOT NULL,
	"member_no" varchar(20) NOT NULL,
	"surname" varchar(40),
	"first_name" varchar(40),
	"other_names" varchar(40),
	"dob" date,
	"occupation" numeric(2),
	"id_pp_no" varchar(15),
	"blood_group" numeric(2),
	"relation_to_principal" numeric(2),
	"user_id" varchar(100),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"family_title" numeric(2),
	"dealing_user" varchar(10),
	"cancelled" numeric(1),
	"employment_no" varchar(30),
	"gender" numeric(1),
	"card_to_member" date,
	"passport_no" varchar(15),
	"nhif_card_no" varchar(15),
	"height" varchar(10),
	"weight" varchar(10),
	"photo_n_form" numeric(1),
	"photo_no" numeric(5),
	"info_to_printer" date,
	"card_from_printer" date,
	"app_form_date" date,
	"marital_status" numeric(1),
	"date_employed" date,
	"member_id" varchar(20),
	"corp_id" varchar(5),
	"family_size" numeric(2),
	"mem_pin" varchar(50),
	"single_parent" numeric(1),
	"care_picked" numeric(1),
	"age" integer,
	"card_serial_no" varchar(50),
	"excempt_cut" integer,
	"vip" numeric(1),
	"smart_sync" integer,
	"smart_picked" integer,
	"cat_change_picked" integer,
	"insurer" numeric(5)
);
--> statement-breakpoint
CREATE TABLE "member_medical" (
	"idx" serial PRIMARY KEY NOT NULL,
	"member_no" varchar(20),
	"anniv" numeric(2),
	"asthma" numeric(1),
	"diabetes" numeric(1),
	"hypertension" numeric(1),
	"convulsion_epilepsy" numeric(1),
	"gastric_duodenal_ulcers" numeric(1),
	"heart_disease" numeric(1),
	"neurological_disease" numeric(1),
	"currently_ill" numeric(1),
	"current_ill_details" varchar(300),
	"gallstones" numeric(1),
	"recent_consulted_doc" numeric(1),
	"recent_consulted_details" varchar(300),
	"diabled" numeric(1),
	"disability_details" varchar(30),
	"past_deliveries" numeric(2),
	"normal" numeric(2),
	"caesarian" numeric(2),
	"expectant" numeric(1),
	"expected_delivery_date" date,
	"psychiatric_illness" numeric(1),
	"recurrent_tonsillitis" numeric(1),
	"arthritis_fibroids" numeric(1),
	"menstrual_disorder" numeric(1),
	"cancer" numeric(1),
	"smokes" numeric(1),
	"takes_alcohol" numeric(1),
	"on_regular_medication" numeric(1),
	"regular_medication_details" varchar(300),
	"future_hospitalization" varchar(30),
	"current_doctor" varchar(30)
);
--> statement-breakpoint
CREATE TABLE "member_procedure" (
	"idx" serial PRIMARY KEY NOT NULL,
	"claim_no" varchar(20),
	"member_no" varchar(20),
	"clinical_procedure" numeric(5),
	"procedure_amt" numeric(10, 2)
);
--> statement-breakpoint
CREATE TABLE "member_provider" (
	"idx" serial PRIMARY KEY NOT NULL,
	"provider" numeric(5),
	"member_no" varchar(20),
	"all_provider" numeric(1),
	"benefit" numeric(1),
	"co_pay" numeric(1),
	"copay_amt" numeric(20, 2),
	"copay_service" numeric(2),
	"anniv" numeric(2),
	"provider_class" integer,
	"sync" integer,
	"smart_sync" integer,
	"copay_type" numeric(2)
);
--> statement-breakpoint
CREATE TABLE "member_provider_exempt" (
	"idx" serial PRIMARY KEY NOT NULL,
	"provider" varchar(10),
	"anniv" numeric(2),
	"member_no" varchar(50),
	"sync" numeric(1),
	"smart_sync" numeric(1)
);
--> statement-breakpoint
CREATE TABLE "mems" (
	"idx" serial PRIMARY KEY NOT NULL,
	"family_no" varchar(50),
	"member_no" varchar(50),
	"member" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "misc_payments" (
	"idx" serial PRIMARY KEY NOT NULL,
	"payee" numeric(2),
	"cheque_no" varchar(10),
	"cheque_date" date,
	"paid_amount" numeric(10, 2),
	"notes" varchar(50),
	"date_entered" timestamp DEFAULT now() NOT NULL,
	"user_id" varchar(100),
	"payment_type" numeric(2)
);
--> statement-breakpoint
CREATE TABLE "mno" (
	"code" serial PRIMARY KEY NOT NULL,
	"mno" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "provider" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "provider_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"provider" varchar(255) NOT NULL,
	"status" boolean DEFAULT false,
	"country" integer NOT NULL,
	"town" integer NOT NULL,
	"pin" varchar(255) NOT NULL,
	"tel_no" varchar(20) NOT NULL,
	"phone_no" varchar(20) NOT NULL,
	"email" varchar(255) NOT NULL,
	"postal_add" varchar(255) NOT NULL,
	"contact_person" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "provider_pin_unique" UNIQUE("pin"),
	CONSTRAINT "provider_tel_no_unique" UNIQUE("tel_no"),
	CONSTRAINT "provider_phone_no_unique" UNIQUE("phone_no")
);
--> statement-breakpoint
CREATE TABLE "service" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "service_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"service" varchar(255) NOT NULL,
	CONSTRAINT "service_service_unique" UNIQUE("service")
);
--> statement-breakpoint
CREATE TABLE "town" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "town_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"town" varchar(255) NOT NULL,
	CONSTRAINT "town_town_unique" UNIQUE("town")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_name" varchar(255) NOT NULL,
	"user_pass" varchar(255) NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"department" integer NOT NULL,
	"super_user" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider" ADD CONSTRAINT "provider_country_country_code_fk" FOREIGN KEY ("country") REFERENCES "public"."country"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider" ADD CONSTRAINT "provider_town_town_code_fk" FOREIGN KEY ("town") REFERENCES "public"."town"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_department_department_code_fk" FOREIGN KEY ("department") REFERENCES "public"."department"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");