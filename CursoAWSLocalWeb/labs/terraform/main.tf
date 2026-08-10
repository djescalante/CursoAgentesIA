locals {
  userdata_web1 = <<-EOT
    #!/bin/bash
    dnf install -y nginx >/var/log/bootstrap.log 2>&1
    echo "<h1>SERVIDOR A - ${var.az1}</h1>" > /usr/share/nginx/html/index.html
    systemctl enable nginx >/dev/null 2>&1
    systemctl start nginx >>/var/log/bootstrap.log 2>&1 || nginx >>/var/log/bootstrap.log 2>&1
  EOT

  userdata_web2 = <<-EOT
    #!/bin/bash
    dnf install -y nginx >/var/log/bootstrap.log 2>&1
    echo "<h1>SERVIDOR B - ${var.az2}</h1>" > /usr/share/nginx/html/index.html
    systemctl enable nginx >/dev/null 2>&1
    systemctl start nginx >>/var/log/bootstrap.log 2>&1 || nginx >>/var/log/bootstrap.log 2>&1
  EOT
}

# ---------------------------------------------------------------- Red
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = { Name = "curso-vpc-tf" }
}

resource "aws_subnet" "pub1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.az1
  map_public_ip_on_launch = true

  tags = { Name = "curso-pub-1" }
}

resource "aws_subnet" "pub2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.2.0/24"
  availability_zone = var.az2
  map_public_ip_on_launch = true

  tags = { Name = "curso-pub-2" }
}

resource "aws_subnet" "priv1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.11.0/24"
  availability_zone = var.az1

  tags = { Name = "curso-priv-1" }
}

resource "aws_subnet" "priv2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.12.0/24"
  availability_zone = var.az2

  tags = { Name = "curso-priv-2" }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = { Name = "curso-igw-tf" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  tags = { Name = "curso-rt-public" }
}

resource "aws_route" "default" {
  route_table_id         = aws_route_table.public.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.main.id
}

resource "aws_route_table_association" "pub1" {
  subnet_id      = aws_subnet.pub1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "pub2" {
  subnet_id      = aws_subnet.pub2.id
  route_table_id = aws_route_table.public.id
}

# ---------------------------------------------------------------- Seguridad
resource "aws_security_group" "web" {
  name        = "curso-web-tf"
  description = "SG de los servidores web del curso"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 3389
    to_port     = 3389
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "curso-web-tf" }
}

resource "aws_security_group" "alb" {
  name        = "curso-alb-tf"
  description = "SG del Application Load Balancer"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "curso-alb-tf" }
}

# ---------------------------------------------------------------- Servidores
resource "aws_instance" "web1" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.pub1.id
  vpc_security_group_ids = [aws_security_group.web.id]
  user_data     = local.userdata_web1

  tags = { Name = "curso-web-1" }

  # floci ignora subnet_id y security groups al lanzar instancias
  # (las coloca en vpc-default / sg-default). Evita reemplazo perpetuo.
  lifecycle {
    ignore_changes = [subnet_id, vpc_security_group_ids]
  }
}

resource "aws_instance" "web2" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.pub2.id
  vpc_security_group_ids = [aws_security_group.web.id]
  user_data     = local.userdata_web2

  tags = { Name = "curso-web-2" }

  lifecycle {
    ignore_changes = [subnet_id, vpc_security_group_ids]
  }
}

# ---------------------------------------------------------------- Bases de datos
resource "aws_db_subnet_group" "main" {
  name       = "curso-db-tf"
  subnet_ids = [aws_subnet.priv1.id, aws_subnet.priv2.id]
}

resource "aws_db_instance" "pedidos" {
  identifier        = "db-pedidos-tf"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  username          = "admin"
  password          = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  skip_final_snapshot  = true
  # floci no devuelve este campo y lo lee como false; fijarlo evita drift.
  auto_minor_version_upgrade = false
}

resource "aws_db_instance" "inventario" {
  identifier        = "db-inventario-tf"
  engine            = "mysql"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  username          = "admin"
  password          = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  skip_final_snapshot  = true
  auto_minor_version_upgrade = false
}

# ---------------------------------------------------------------- Load Balancer
resource "aws_lb" "main" {
  name               = "curso-alb-tf"
  internal           = false
  load_balancer_type = "application"
  subnets            = [aws_subnet.pub1.id, aws_subnet.pub2.id]
  security_groups    = [aws_security_group.alb.id]
}

resource "aws_lb_target_group" "web" {
  name     = "curso-web-tg-tf"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

resource "aws_lb_target_group_attachment" "web1" {
  target_group_arn = aws_lb_target_group.web.arn
  target_id        = aws_instance.web1.id
}

resource "aws_lb_target_group_attachment" "web2" {
  target_group_arn = aws_lb_target_group.web.arn
  target_id        = aws_instance.web2.id
}
