-- Modify "kiwisavers" table
ALTER TABLE "public"."kiwisavers" ADD CONSTRAINT "employer_contribution_rate_min" CHECK (employer_contribution_rate >= 0.03);
