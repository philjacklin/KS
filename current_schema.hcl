table "atlas_schema_revisions" {
  schema = schema.atlas_schema_revisions
  column "version" {
    null = false
    type = character_varying
  }
  column "description" {
    null = false
    type = character_varying
  }
  column "type" {
    null    = false
    type    = bigint
    default = 2
  }
  column "applied" {
    null    = false
    type    = bigint
    default = 0
  }
  column "total" {
    null    = false
    type    = bigint
    default = 0
  }
  column "executed_at" {
    null = false
    type = timestamptz
  }
  column "execution_time" {
    null = false
    type = bigint
  }
  column "error" {
    null = true
    type = text
  }
  column "error_stmt" {
    null = true
    type = text
  }
  column "hash" {
    null = false
    type = character_varying
  }
  column "partial_hashes" {
    null = true
    type = jsonb
  }
  column "operator_version" {
    null = false
    type = character_varying
  }
  primary_key {
    columns = [column.version]
  }
}
table "employees" {
  schema = schema.public
  column "id" {
    null    = false
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "organization_id" {
    null = false
    type = uuid
  }
  column "name" {
    null = false
    type = text
  }
  column "deleted_at" {
    null = true
    type = timestamp
  }
  primary_key {
    columns = [column.id]
  }
}
table "kiwisavers" {
  schema = schema.public
  column "id" {
    null    = false
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "employee_id" {
    null = false
    type = uuid
  }
  column "employee_contribution_rate" {
    null = false
    type = numeric(5,4)
  }
  column "employer_contribution_rate" {
    null = false
    type = numeric(5,4)
  }
  column "opt_out_status" {
    null    = false
    type    = boolean
    default = false
  }
  column "temporary_rate_reduction_status" {
    null    = false
    type    = boolean
    default = false
  }
  column "savings_suspension_status" {
    null    = false
    type    = boolean
    default = false
  }
  column "esct_rate" {
    null = false
    type = numeric(5,4)
  }
  column "organization_id" {
    null = false
    type = uuid
  }
  column "deleted_at" {
    null = true
    type = timestamp
  }
  primary_key "kiwisaver_pkey" {
    columns = [column.id]
  }
  foreign_key "kiwisaver_employee_id" {
    columns     = [column.employee_id]
    ref_columns = [table.employees.column.id]
    on_update   = NO_ACTION
    on_delete   = NO_ACTION
  }
  check "employer_contribution_rate_min" {
    expr = "(employer_contribution_rate >= 0.03)"
  }
}
schema "atlas_schema_revisions" {
}
schema "public" {
  comment = "standard public schema"
}
