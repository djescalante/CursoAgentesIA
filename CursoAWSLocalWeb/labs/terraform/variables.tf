variable "az1" {
  type    = string
  default = "us-east-1a"
}

variable "az2" {
  type    = string
  default = "us-east-1b"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}

variable "ami_id" {
  # En AWS real se usa una AMI de Windows Server 2022.
  # floci no conoce esta AMI y cae al Amazon Linux 2023 por defecto.
  type    = string
  default = "ami-0c02fb55956c7d316"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "db_password" {
  type      = string
  default   = "ChangeMe123!"
  sensitive = true
}
