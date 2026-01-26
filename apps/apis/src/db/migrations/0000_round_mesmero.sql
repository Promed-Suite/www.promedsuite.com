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
CREATE TABLE "country" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "country_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"country" varchar(255) NOT NULL,
	CONSTRAINT "country_country_unique" UNIQUE("country")
);
--> statement-breakpoint
CREATE TABLE "department" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "department_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"department" varchar(255) NOT NULL,
	CONSTRAINT "department_department_unique" UNIQUE("department")
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
CREATE TABLE "service" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "service_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"service" varchar(255) NOT NULL,
	CONSTRAINT "service_service_unique" UNIQUE("service")
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
CREATE TABLE "town" (
	"code" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "town_code_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"town" varchar(255) NOT NULL,
	CONSTRAINT "town_town_unique" UNIQUE("town")
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
ALTER TABLE "users" ADD CONSTRAINT "users_department_department_code_fk" FOREIGN KEY ("department") REFERENCES "public"."department"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider" ADD CONSTRAINT "provider_country_country_code_fk" FOREIGN KEY ("country") REFERENCES "public"."country"("code") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "provider" ADD CONSTRAINT "provider_town_town_code_fk" FOREIGN KEY ("town") REFERENCES "public"."town"("code") ON DELETE no action ON UPDATE no action;