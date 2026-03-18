-- Create "employees" table
CREATE TABLE "employees" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "organization_id" uuid NOT NULL,
  "name" text NOT NULL,
  "deleted_at" timestamp NULL,
  PRIMARY KEY ("id")
);
ALTER TABLE "employees" ENABLE ROW LEVEL SECURITY;
-- Define RLS policy for "employees"
CREATE POLICY "employees_policy" ON "employees" FOR ALL USING (organization_id = (SELECT current_setting('app.org_id')::uuid));
-- Create index "employees_organization_id_idx" to table: "employees"
CREATE INDEX "employees_organization_id_idx" ON "employees" ("organization_id");
-- Set comment to column: "name" on table: "employees"
COMMENT ON COLUMN "employees"."name" IS 'PII';

-- Create "kiwisavers" table
CREATE TABLE "kiwisavers" (
  "id" uuid NOT NULL DEFAULT gen_random_uuid(),
  "employee_id" uuid NOT NULL,
  "employee_contribution_rate" DECIMAL(12, 2) NOT NULL,
  "employer_contribution_rate" DECIMAL(12, 2) NOT NULL,
  "opt_out_status" boolean NOT NULL DEFAULT false,
  "temporary_rate_reduction_status" boolean NOT NULL DEFAULT false,
  "savings_suspension_status" boolean NOT NULL DEFAULT false,
  "esct_rate" DECIMAL(12, 2) NOT NULL,
  "organization_id" uuid NOT NULL,
  "deleted_at" timestamp NULL,
  PRIMARY KEY ("id"),
  CONSTRAINT "kiwisavers_employee_id" FOREIGN KEY ("employee_id") REFERENCES "employees" ("id")
);
ALTER TABLE "kiwisavers" ENABLE ROW LEVEL SECURITY;
-- Define RLS policy for "kiwisavers"
CREATE POLICY "kiwisavers_policy" ON "kiwisavers" FOR ALL USING (organization_id = (SELECT current_setting('app.org_id')::uuid));
-- Create index "kiwisavers_employee_id_idx" to table: "kiwisavers"
CREATE INDEX "kiwisavers_employee_id_idx" ON "kiwisavers" ("employee_id");
-- Create index "kiwisavers_organization_id_idx" to table: "kiwisavers"
CREATE INDEX "kiwisavers_organization_id_idx" ON "kiwisavers" ("organization_id");
