# Curso práctico: VPC con 2 AZ, 2 servidores Windows Server, 2 RDS y balanceador de carga, usando Floci (emulador AWS gratuito)

Autor del laboratorio: David — practicando arquitecturas AWS sin gastar dinero, con [floci.io](https://floci.io/), emulador local MIT que replica el protocolo real de AWS en `localhost:4566` (69 servicios, incluyendo EC2, VPC, RDS y ELBv2). No requiere cuenta ni tarjeta de crédito.

**Importante sobre el alcance:** Floci emula la API de AWS (crea y devuelve los mismos objetos y metadatos que devolvería AWS real: VPC IDs, instancias, endpoints RDS, ARNs de balanceadores). Para RDS levanta motores reales (PostgreSQL/MySQL) en contenedores Docker. Para EC2, las instancias se registran y responden como en AWS real pero **no arrancan un sistema operativo Windows real** (no hay consola RDP funcional ni AMI de Windows ejecutándose). El valor del curso es 100% práctica de la arquitectura, el CLI, CloudFormation y Terraform tal como los usarías contra una cuenta real — el día que apliques esto contra AWS de verdad, los mismos comandos y plantillas funcionan sin cambios (solo apuntando al endpoint real).

---

## Objetivo de la arquitectura

Construir, tres veces (CLI, CloudFormation, Terraform), la misma infraestructura:

- 1 VPC (`10.0.0.0/16`)
- 2 Zonas de disponibilidad (simuladas: `us-east-1a`, `us-east-1b`)
- 4 subredes: 2 públicas (ALB) y 2 privadas (EC2 + RDS)
- Internet Gateway + tabla de rutas pública
- 2 instancias EC2 tipo Windows Server (una por AZ)
- 2 instancias RDS (una por AZ, motor MySQL)
- 1 Application Load Balancer con target group apuntando a las 2 instancias Windows
- Security Groups: uno para el ALB (80/443 desde internet), uno para EC2 (3389 y HTTP desde el SG del ALB), uno para RDS (3306 solo desde el SG de EC2)

---

## Módulo 0 — Preparar el entorno

### 0.1 Instalar floci-cli

macOS/Linux:
```bash
curl -fsSL https://floci.io/install.sh | sh
```

Windows (PowerShell):
```powershell
irm https://floci.io/install.ps1 | iex
```

### 0.2 Levantar el emulador AWS y cargar variables

```bash
floci start
eval $(floci env)
floci doctor   # valida que todo esté corriendo (puerto 4566)
```

Esto exporta automáticamente `AWS_ENDPOINT_URL=http://localhost:4566`, `AWS_ACCESS_KEY_ID=test` y `AWS_SECRET_ACCESS_KEY=test`. Si preferís hacerlo a mano:

```bash
export AWS_ENDPOINT_URL=http://localhost:4566
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-east-1
```

### 0.3 Verificar

```bash
aws sts get-caller-identity
aws ec2 describe-regions
```

Si ambos comandos responden, el entorno está listo para los tres módulos siguientes.

---

## Módulo 1 — Despliegue con AWS CLI

Todos los comandos se ejecutan contra el endpoint local; no hace falta `--endpoint-url` si ya exportaste `AWS_ENDPOINT_URL`.

### 1.1 Crear la VPC

```bash
VPC_ID=$(aws ec2 create-vpc --cidr-block 10.0.0.0/16 \
  --query 'Vpc.VpcId' --output text)

aws ec2 create-tags --resources $VPC_ID --tags Key=Name,Value=curso-vpc
```

### 1.2 Subredes en dos AZ

```bash
# Públicas (para el ALB)
SUBNET_PUB_A=$(aws ec2 create-subnet --vpc-id $VPC_ID \
  --cidr-block 10.0.1.0/24 --availability-zone us-east-1a \
  --query 'Subnet.SubnetId' --output text)

SUBNET_PUB_B=$(aws ec2 create-subnet --vpc-id $VPC_ID \
  --cidr-block 10.0.2.0/24 --availability-zone us-east-1b \
  --query 'Subnet.SubnetId' --output text)

# Privadas (para EC2 y RDS)
SUBNET_PRIV_A=$(aws ec2 create-subnet --vpc-id $VPC_ID \
  --cidr-block 10.0.11.0/24 --availability-zone us-east-1a \
  --query 'Subnet.SubnetId' --output text)

SUBNET_PRIV_B=$(aws ec2 create-subnet --vpc-id $VPC_ID \
  --cidr-block 10.0.12.0/24 --availability-zone us-east-1b \
  --query 'Subnet.SubnetId' --output text)
```

### 1.3 Internet Gateway y ruteo público

```bash
IGW_ID=$(aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --internet-gateway-id $IGW_ID --vpc-id $VPC_ID

RTB_ID=$(aws ec2 create-route-table --vpc-id $VPC_ID --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $RTB_ID --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID

aws ec2 associate-route-table --route-table-id $RTB_ID --subnet-id $SUBNET_PUB_A
aws ec2 associate-route-table --route-table-id $RTB_ID --subnet-id $SUBNET_PUB_B
```

### 1.4 Security Groups

```bash
SG_ALB=$(aws ec2 create-security-group --group-name sg-alb --description "ALB SG" \
  --vpc-id $VPC_ID --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $SG_ALB --protocol tcp --port 80 --cidr 0.0.0.0/0

SG_EC2=$(aws ec2 create-security-group --group-name sg-windows --description "Windows EC2 SG" \
  --vpc-id $VPC_ID --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $SG_EC2 --protocol tcp --port 80 --source-group $SG_ALB
aws ec2 authorize-security-group-ingress --group-id $SG_EC2 --protocol tcp --port 3389 --cidr 10.0.0.0/16

SG_RDS=$(aws ec2 create-security-group --group-name sg-rds --description "RDS SG" \
  --vpc-id $VPC_ID --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $SG_RDS --protocol tcp --port 3306 --source-group $SG_EC2
```

### 1.5 Dos instancias Windows Server (una por AZ)

```bash
INSTANCE_A=$(aws ec2 run-instances \
  --image-id ami-windows-2022 \
  --instance-type t3.medium \
  --subnet-id $SUBNET_PRIV_A \
  --security-group-ids $SG_EC2 \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=win-server-az-a}]' \
  --query 'Instances[0].InstanceId' --output text)

INSTANCE_B=$(aws ec2 run-instances \
  --image-id ami-windows-2022 \
  --instance-type t3.medium \
  --subnet-id $SUBNET_PRIV_B \
  --security-group-ids $SG_EC2 \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=win-server-az-b}]' \
  --query 'Instances[0].InstanceId' --output text)
```

> En AWS real reemplazá `ami-windows-2022` por el AMI ID real de Windows Server (buscalo con `aws ec2 describe-images --owners amazon --filters "Name=name,Values=Windows_Server-2022-English-Full-Base*"`).

### 1.6 DB Subnet Group y dos instancias RDS

```bash
aws rds create-db-subnet-group \
  --db-subnet-group-name curso-db-subnets \
  --db-subnet-group-description "Subnets privadas para RDS" \
  --subnet-ids $SUBNET_PRIV_A $SUBNET_PRIV_B

aws rds create-db-instance \
  --db-instance-identifier rds-az-a \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password Passw0rd123! \
  --allocated-storage 20 \
  --vpc-security-group-ids $SG_RDS \
  --db-subnet-group-name curso-db-subnets \
  --availability-zone us-east-1a

aws rds create-db-instance \
  --db-instance-identifier rds-az-b \
  --db-instance-class db.t3.micro \
  --engine mysql \
  --master-username admin \
  --master-user-password Passw0rd123! \
  --allocated-storage 20 \
  --vpc-security-group-ids $SG_RDS \
  --db-subnet-group-name curso-db-subnets \
  --availability-zone us-east-1b
```

### 1.7 Application Load Balancer + Target Group

```bash
ALB_ARN=$(aws elbv2 create-load-balancer \
  --name curso-alb \
  --subnets $SUBNET_PUB_A $SUBNET_PUB_B \
  --security-groups $SG_ALB \
  --scheme internet-facing --type application \
  --query 'LoadBalancers[0].LoadBalancerArn' --output text)

TG_ARN=$(aws elbv2 create-target-group \
  --name curso-tg-windows \
  --protocol HTTP --port 80 \
  --vpc-id $VPC_ID \
  --target-type instance \
  --query 'TargetGroups[0].TargetGroupArn' --output text)

aws elbv2 register-targets --target-group-arn $TG_ARN \
  --targets Id=$INSTANCE_A Id=$INSTANCE_B

aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTP --port 80 \
  --default-actions Type=forward,TargetGroupArn=$TG_ARN
```

### 1.8 Verificar y limpiar

```bash
aws elbv2 describe-load-balancers --names curso-alb
aws ec2 describe-instances --instance-ids $INSTANCE_A $INSTANCE_B
aws rds describe-db-instances
```

Limpieza (orden inverso — ALB, RDS, EC2, SGs, subredes, IGW, VPC):
```bash
aws elbv2 delete-load-balancer --load-balancer-arn $ALB_ARN
aws rds delete-db-instance --db-instance-identifier rds-az-a --skip-final-snapshot
aws rds delete-db-instance --db-instance-identifier rds-az-b --skip-final-snapshot
aws ec2 terminate-instances --instance-ids $INSTANCE_A $INSTANCE_B
aws ec2 delete-vpc --vpc-id $VPC_ID   # falla si quedan dependencias; borrá SGs/subredes/IGW antes
```

---

## Módulo 2 — Despliegue con CloudFormation

Guardá esto como `infra.yaml`.

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: VPC 2AZ + 2 Windows Server + 2 RDS + ALB (curso Floci)

Parameters:
  DbPassword:
    Type: String
    NoEcho: true
    Default: Passw0rd123!

Resources:
  VPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      Tags: [{ Key: Name, Value: curso-vpc }]

  IGW:
    Type: AWS::EC2::InternetGateway

  IGWAttachment:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref VPC
      InternetGatewayId: !Ref IGW

  SubnetPubA:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: us-east-1a
      MapPublicIpOnLaunch: true

  SubnetPubB:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: us-east-1b
      MapPublicIpOnLaunch: true

  SubnetPrivA:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.11.0/24
      AvailabilityZone: us-east-1a

  SubnetPrivB:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref VPC
      CidrBlock: 10.0.12.0/24
      AvailabilityZone: us-east-1b

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref VPC

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: IGWAttachment
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref IGW

  RouteAssocA:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPubA
      RouteTableId: !Ref PublicRouteTable

  RouteAssocB:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref SubnetPubB
      RouteTableId: !Ref PublicRouteTable

  SGAlb:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: ALB SG
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 80, ToPort: 80, CidrIp: 0.0.0.0/0 }

  SGWindows:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Windows EC2 SG
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 80, ToPort: 80, SourceSecurityGroupId: !Ref SGAlb }
        - { IpProtocol: tcp, FromPort: 3389, ToPort: 3389, CidrIp: 10.0.0.0/16 }

  SGRds:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: RDS SG
      VpcId: !Ref VPC
      SecurityGroupIngress:
        - { IpProtocol: tcp, FromPort: 3306, ToPort: 3306, SourceSecurityGroupId: !Ref SGWindows }

  WinServerA:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-windows-2022
      InstanceType: t3.medium
      SubnetId: !Ref SubnetPrivA
      SecurityGroupIds: [!Ref SGWindows]
      Tags: [{ Key: Name, Value: win-server-az-a }]

  WinServerB:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-windows-2022
      InstanceType: t3.medium
      SubnetId: !Ref SubnetPrivB
      SecurityGroupIds: [!Ref SGWindows]
      Tags: [{ Key: Name, Value: win-server-az-b }]

  DbSubnetGroup:
    Type: AWS::RDS::DBSubnetGroup
    Properties:
      DBSubnetGroupDescription: Subnets privadas RDS
      SubnetIds: [!Ref SubnetPrivA, !Ref SubnetPrivB]

  RdsA:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: rds-az-a
      Engine: mysql
      DBInstanceClass: db.t3.micro
      AllocatedStorage: "20"
      MasterUsername: admin
      MasterUserPassword: !Ref DbPassword
      VPCSecurityGroups: [!Ref SGRds]
      DBSubnetGroupName: !Ref DbSubnetGroup
      AvailabilityZone: us-east-1a

  RdsB:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceIdentifier: rds-az-b
      Engine: mysql
      DBInstanceClass: db.t3.micro
      AllocatedStorage: "20"
      MasterUsername: admin
      MasterUserPassword: !Ref DbPassword
      VPCSecurityGroups: [!Ref SGRds]
      DBSubnetGroupName: !Ref DbSubnetGroup
      AvailabilityZone: us-east-1b

  ALB:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: curso-alb
      Subnets: [!Ref SubnetPubA, !Ref SubnetPubB]
      SecurityGroups: [!Ref SGAlb]
      Scheme: internet-facing
      Type: application

  TargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: curso-tg-windows
      Port: 80
      Protocol: HTTP
      VpcId: !Ref VPC
      TargetType: instance
      Targets:
        - { Id: !Ref WinServerA }
        - { Id: !Ref WinServerB }

  Listener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref ALB
      Port: 80
      Protocol: HTTP
      DefaultActions:
        - { Type: forward, TargetGroupArn: !Ref TargetGroup }

Outputs:
  ALBDNSName:
    Value: !GetAtt ALB.DNSName
  VpcId:
    Value: !Ref VPC
```

Desplegar contra Floci:

```bash
aws cloudformation create-stack \
  --stack-name curso-infra \
  --template-body file://infra.yaml

aws cloudformation wait stack-create-complete --stack-name curso-infra
aws cloudformation describe-stacks --stack-name curso-infra --query 'Stacks[0].Outputs'
```

Eliminar todo:
```bash
aws cloudformation delete-stack --stack-name curso-infra
```

---

## Módulo 3 — Despliegue con Terraform

Estructura de archivos sugerida: `main.tf`, `variables.tf`, `outputs.tf`.

### `main.tf`

```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region                      = "us-east-1"
  access_key                  = "test"
  secret_key                  = "test"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true

  endpoints {
    ec2      = "http://localhost:4566"
    rds      = "http://localhost:4566"
    elbv2    = "http://localhost:4566"
    iam      = "http://localhost:4566"
    sts      = "http://localhost:4566"
    cloudformation = "http://localhost:4566"
  }
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags       = { Name = "curso-vpc" }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_subnet" "public" {
  for_each                = { a = { cidr = "10.0.1.0/24", az = "us-east-1a" }, b = { cidr = "10.0.2.0/24", az = "us-east-1b" } }
  vpc_id                  = aws_vpc.main.id
  cidr_block               = each.value.cidr
  availability_zone        = each.value.az
  map_public_ip_on_launch  = true
  tags = { Name = "public-${each.key}" }
}

resource "aws_subnet" "private" {
  for_each          = { a = { cidr = "10.0.11.0/24", az = "us-east-1a" }, b = { cidr = "10.0.12.0/24", az = "us-east-1b" } }
  vpc_id            = aws_vpc.main.id
  cidr_block        = each.value.cidr
  availability_zone = each.value.az
  tags = { Name = "private-${each.key}" }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public" {
  for_each       = aws_subnet.public
  subnet_id      = each.value.id
  route_table_id = aws_route_table.public.id
}

resource "aws_security_group" "alb" {
  name   = "sg-alb"
  vpc_id = aws_vpc.main.id
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "windows" {
  name   = "sg-windows"
  vpc_id = aws_vpc.main.id
  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }
  ingress {
    from_port   = 3389
    to_port     = 3389
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }
  egress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "rds" {
  name   = "sg-rds"
  vpc_id = aws_vpc.main.id
  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    security_groups = [aws_security_group.windows.id]
  }
}

resource "aws_instance" "windows" {
  for_each        = { a = aws_subnet.private["a"].id, b = aws_subnet.private["b"].id }
  ami             = "ami-windows-2022"
  instance_type   = "t3.medium"
  subnet_id       = each.value
  security_groups = [aws_security_group.windows.id]
  tags            = { Name = "win-server-az-${each.key}" }
}

resource "aws_db_subnet_group" "main" {
  name       = "curso-db-subnets"
  subnet_ids = [for s in aws_subnet.private : s.id]
}

resource "aws_db_instance" "main" {
  for_each               = aws_subnet.private
  identifier              = "rds-az-${each.key}"
  engine                  = "mysql"
  instance_class          = "db.t3.micro"
  allocated_storage       = 20
  username                = "admin"
  password                = var.db_password
  db_subnet_group_name    = aws_db_subnet_group.main.name
  vpc_security_group_ids  = [aws_security_group.rds.id]
  availability_zone       = each.value.availability_zone
  skip_final_snapshot     = true
}

resource "aws_lb" "main" {
  name               = "curso-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [for s in aws_subnet.public : s.id]
}

resource "aws_lb_target_group" "windows" {
  name     = "curso-tg-windows"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_target_group_attachment" "windows" {
  for_each         = aws_instance.windows
  target_group_arn = aws_lb_target_group.windows.arn
  target_id        = each.value.id
  port             = 80
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.windows.arn
  }
}
```

### `variables.tf`

```hcl
variable "db_password" {
  type      = string
  default   = "Passw0rd123!"
  sensitive = true
}
```

### `outputs.tf`

```hcl
output "alb_dns_name" {
  value = aws_lb.main.dns_name
}

output "vpc_id" {
  value = aws_vpc.main.id
}
```

Ejecución:

```bash
terraform init
terraform plan
terraform apply -auto-approve
terraform output
```

Destruir todo:
```bash
terraform destroy -auto-approve
```

---

## Módulo 4 — Comparación de los tres enfoques

En el mundo real de trabajo DevOps, los tres métodos tienen usos distintos: la CLI sirve para explorar y depurar rápido, CloudFormation es nativo de AWS y útil si el resto del stack ya vive en su ecosistema (Service Catalog, StackSets), y Terraform es multi-nube y el más usado en equipos que gestionan AWS junto a otros proveedores. Practicar los tres contra Floci te permite comparar la misma arquitectura sin gastar un centavo y sin arriesgar una cuenta real, y trasladar directamente lo aprendido: los mismos YAML y HCL funcionan contra AWS real cambiando solo el endpoint y el AMI de Windows por uno válido.

---

## Módulo 5 — Troubleshooting común

Si `aws ec2 create-vpc` falla con error de conexión, confirmá que `floci start` sigue corriendo y que `AWS_ENDPOINT_URL` apunta a `http://localhost:4566`. Si CloudFormation se queda en `CREATE_IN_PROGRESS`, revisá los logs de Floci con `floci logs` (o `docker logs` si corriste el contenedor manualmente). Si Terraform reclama credenciales, revisá que el bloque `endpoints` cubra todos los servicios usados (agregá `cloudformation`, `logs`, etc. si el plan falla en un recurso nuevo). Para inspeccionar visualmente lo creado, usá `floci-ui`, el dashboard oficial que lista VPCs, instancias EC2, bases RDS y balanceadores desde el navegador.

---

## Siguientes pasos sugeridos

Una vez cómodo con esta arquitectura, buenas extensiones para seguir practicando: agregar Auto Scaling Group en vez de instancias fijas, mover el estado de Terraform a S3 (también emulado por Floci) con locking vía DynamoDB, y agregar un módulo de CloudWatch/alarmas para simular observabilidad antes de replicar todo esto en una cuenta AWS real.
