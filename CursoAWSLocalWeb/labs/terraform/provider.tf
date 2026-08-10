terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # v5+ lee aws_db_instance por "dbi-resource-id", que floci no resuelve.
      # v4 usa el nombre del identificador -> compatible con floci.
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "test"
  secret_key = "test"

  # Conecta a floci en local en lugar de AWS real
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  skip_region_validation      = true

  endpoints {
    ec2   = "http://localhost:4566"
    rds   = "http://localhost:4566"
    elbv2 = "http://localhost:4566"
  }
}
