env "tea" {
  url = getenv("DATABASE_URL")
  migration {
    dir = "file://migrations"
  }
  schema {
    src = "file://schema.hcl"
  }
}

env "dev" {
  url = getenv("DEV_DATABASE_URL")
  migration {
    dir = "file://migrations"
  }
  schema {
    src = "file://schema.hcl"
  }
}
