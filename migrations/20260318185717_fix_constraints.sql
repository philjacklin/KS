-- Modify "kiwisavers" table
ALTER TABLE "public"."kiwisavers" DROP CONSTRAINT "employer_contribution_rate_min";
ALTER TABLE "public"."kiwisavers" ADD CONSTRAINT "employer_contribution_rate_constraints" CHECK (employer_contribution_rate >= LEAST(0.035, employee_contribution_rate) AND employer_contribution_rate <= 0.30);
