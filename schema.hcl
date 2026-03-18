schema "public" {
  comment = "standard public schema"
}

table "employees" {
  schema = schema.public
  column "id" {
    type = uuid
    default = sql("gen_random_uuid()")
  }
  column "organization_id" {
    type = uuid
    null = false
  }
  column "name" {
    type = text
    null = false
    comment = "PII"
  }
  column "deleted_at" {
    type = timestamp
    null = true
  }
  primary_key {
    columns = [column.id]
  }
  index "employees_organization_id_idx" {
    columns = [column.organization_id]
  }
}

table "kiwisavers" {
  schema = schema.public
  
  column "id" {
    type = uuid
    default = sql("gen_random_uuid()")
  }
  column "employee_id" {
    type = uuid
    null = false
  }
  column "employee_contribution_rate" {
    type = decimal(12, 2)
    null = false
  }
  column "employer_contribution_rate" {
    type = decimal(12, 2)
    null = false
  }
  column "opt_out_status" {
    type = boolean
    default = false
    null = false
  }
  column "temporary_rate_reduction_status" {
    type = boolean
    default = false
    null = false
  }
  column "savings_suspension_status" {
    type = boolean
    default = false
    null = false
  }
  column "esct_rate" {
    type = decimal(12, 2)
    null = false
  }
  column "organization_id" {
    type = uuid
    null = false
  }
  column "deleted_at" {
    type = timestamp
    null = true
  }
  primary_key {
    columns = [column.id]
  }

  index "kiwisavers_employee_id_idx" {
    columns = [column.employee_id]
  }
  index "kiwisavers_organization_id_idx" {
    columns = [column.organization_id]
  }

  foreign_key "kiwisavers_employee_id" {
    columns = [column.employee_id]
    ref_columns = [table.employees.column.id]
  }
}
