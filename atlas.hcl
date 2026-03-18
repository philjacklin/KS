env "tea" {
  url = "postgres://postgres:ph11Jack11n@host.docker.internal:5432/KS?sslmode=disable"
  migration {
    dir = "file://migrations"
  }
  schema {
    src = "file://schema.hcl"
  }
}

env "dev" {
  url = "postgres://postgres:ph11Jack11n@host.docker.internal:5432/KS_dev?sslmode=disable"
  dev = "docker://postgres/15/dev?search_path=public"
  migration {
    dir = "file://migrations"
  }
  schema {
    src = "file://schema.hcl"
  }
}
