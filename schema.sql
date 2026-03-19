-- Add new schema named "atlas_schema_revisions"
CREATE SCHEMA "atlas_schema_revisions";
-- Add new schema named "public"
CREATE SCHEMA IF NOT EXISTS "public";
-- Set comment to schema: "public"
COMMENT ON SCHEMA "public" IS 'standard public schema';
-- Create "atlas_schema_revisions" table
CREATE TABLE "atlas_schema_revisions"."atlas_schema_revisions" (
  "version" character varying NOT NULL,
  "description" character varying NOT NULL,
  "type" bigint NOT NULL DEFAULT 2,
  "applied" bigint NOT NULL DEFAULT 0,
  "total" bigint NOT NULL DEFAULT 0,
  "executed_at" timestamptz NOT NULL,
  "execution_time" bigint NOT NULL,
  "error" text NULL,
  "error_stmt" text NULL,
  "hash" character varying NOT NULL,
  "partial_hashes" jsonb NULL,
  "operator_version" character varying NOT NULL,
  PRIMARY KEY ("version")
);
-- Create "employees" table
CREATE TABLE "public"."employees" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "organization_id" uuid NOT NULL,
  "name" text NOT NULL,
  "deleted_at" timestamp NULL,
  PRIMARY KEY ("id")
);
-- Create "kiwisavers" table
CREATE TABLE "public"."kiwisavers" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "employee_id" uuid NOT NULL,
  "employee_contribution_rate" numeric(5,4) NOT NULL,
  "employer_contribution_rate" numeric(5,4) NOT NULL,
  "opt_out_status" boolean NOT NULL DEFAULT false,
  "temporary_rate_reduction_status" boolean NOT NULL DEFAULT false,
  "savings_suspension_status" boolean NOT NULL DEFAULT false,
  "esct_rate" numeric(5,4) NOT NULL,
  "organization_id" uuid NOT NULL,
  "deleted_at" timestamp NULL,
  CONSTRAINT "kiwisaver_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "kiwisaver_employee_id" FOREIGN KEY ("employee_id") REFERENCES "public"."employees" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
);
