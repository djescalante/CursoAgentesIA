/**
 * SECCIÓN TEMPLATES — plantillas listas para usar.
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.templates.push(
  {
    icon: `🐳`,
    title: `compose.yaml de floci`,
    description: `Levanta el emulador con persistencia y todos los puertos.`,
    content: `# compose.yaml — floci

\`\`\`yaml
services:
  floci:
    image: floci/floci:latest
    ports:
      - "4566:4566"
      - "80:80"
      - "7001-7099:7001-7099"
    volumes:
      - floci-data:/data/floci
    environment:
      - FLOCI_STORAGE_MODE=persistent
volumes:
  floci-data:
\`\`\`

\`\`\`bash
docker compose up -d
docker ps
\`\`\`

> ⚠️ \`docker compose down -v\` borra TODA tu infraestructura emulada.`
  },
  {
    icon: `🐧`,
    title: `userdata-web-a.sh`,
    description: `Bootstrap de nginx para el Servidor A.`,
    content: `# userdata-web-a.sh — Servidor A

\`\`\`bash
#!/bin/bash
dnf install -y nginx >/var/log/bootstrap.log 2>&1
echo "<h1>SERVIDOR A - us-east-1a</h1>" > /usr/share/nginx/html/index.html
systemctl enable nginx >/dev/null 2>&1
systemctl start nginx >>/var/log/bootstrap.log 2>&1 || nginx >>/var/log/bootstrap.log 2>&1
\`\`\`

**Servidor B:** igual, pero con \`SERVIDOR B - us-east-1b\`.`
  },
  {
    icon: `🧩`,
    title: `template.yaml (CloudFormation)`,
    description: `Esqueleto del stack de 20 recursos.`,
    content: `# template.yaml — esqueleto

\`\`\`yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: Stack AWS Local (floci) - 2 AZ, 2 EC2, 2 RDS, ALB

Parameters:
  Az1:
    Type: String
    Default: us-east-1a
  Az2:
    Type: String
    Default: us-east-1b
  AmiId:
    Type: String
    Default: ami-0c02fb55956c7d316

Resources:
  Vpc:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true

  Pub1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref Vpc
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Ref Az1
      MapPublicIpOnLaunch: true

  Pub2:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref Vpc
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Ref Az2
      MapPublicIpOnLaunch: true

  # (priv1, priv2, IGW, RouteTable, Route, asociaciones,
  #  SGs, DBSubnetGroup, 2 RDS, 2 EC2, TG, ALB, Listener…)

Outputs:
  AlbDns:
    Value: !GetAtt Alb.DNSName
\`\`\`

> ⚠️ En floci usa \`UserData\` en **texto plano** (sin \`Fn::Base64\`).`
  },
  {
    icon: `🏗️`,
    title: `provider.tf (Terraform)`,
    description: `Provider de AWS apuntando a floci (v4 para RDS).`,
    content: `# provider.tf — Terraform + floci

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"   # v4: RDS se lee por nombre (floci OK)
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  access_key = "test"
  secret_key = "test"

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
\`\`\`

> ⚠️ Con provider v5/v6, RDS falla con \`empty result\` (floci no resuelve \`dbi-resource-id\`).`
  },
  {
    icon: `🧪`,
    title: `05-test.ps1 (round-robin)`,
    description: `Verifica el balanceo A/B esperando health checks.`,
    content: `# 05-test.ps1 — round-robin

\`\`\`powershell
. .\\env.ps1

# Esperar a que los targets estén healthy
do {
  Start-Sleep -Seconds 30
  $healthy = aws $EP elbv2 describe-target-health --target-group-arn $tgArn \`
    --query "TargetHealthDescriptions[?TargetHealth.State=='healthy']" --output text
} while (-not $healthy)
Write-Host "Targets healthy ✓"

# Obtener DNS del ALB
$dns = aws $EP elbv2 describe-load-balancers --names curso-alb \`
  --query "LoadBalancers[0].DNSName" --output text

# 6 peticiones → contar A/B
$counts = @{}
for ($i = 1; $i -le 6; $i++) {
  $r = Invoke-WebRequest -Uri "http://$dns/" -UseBasicParsing
  $m = [regex]::Match($r.Content, 'SERVIDOR ([A-Z])')
  $k = if ($m.Success) { $m.Groups[1].Value } else { '?' }
  $counts[$k] = [int]$counts[$k] + 1
  Write-Host "req $i -> HTTP $($r.StatusCode) SERVIDOR $k"
}
Write-Host "RESULTADO: A=$([int]$counts['A']) B=$([int]$counts['B'])"
\`\`\`

Esperado: **A=3 B=3**.`
  },
  {
    icon: `🗑️`,
    title: `99-cleanup.ps1 (patrón)`,
    description: `Limpieza idempotente en orden inverso.`,
    content: `# 99-cleanup.ps1 — patrón

\`\`\`powershell
. .\\env.ps1
$ErrorActionPreference = 'Continue'

# Borrar en orden inverso: dependientes primero
aws $EP elbv2 delete-load-balancer --load-balancer-arn $lbArn 2>&1 | Out-Host
aws $EP elbv2 delete-target-group --target-group-arn $tgArn 2>&1 | Out-Host
aws $EP rds delete-db-instance --db-instance-identifier db-pedidos --skip-final-snapshot 2>&1 | Out-Host
aws $EP rds delete-db-instance --db-instance-identifier db-inventario --skip-final-snapshot 2>&1 | Out-Host
aws $EP ec2 terminate-instances --instance-ids $web1 $web2 2>&1 | Out-Host
aws $EP ec2 detach-internet-gateway --internet-gateway-id $igw --vpc-id $vpcId 2>&1 | Out-Host
aws $EP ec2 delete-internet-gateway --internet-gateway-id $igw 2>&1 | Out-Host
aws $EP ec2 delete-subnet --subnet-id $pub1 2>&1 | Out-Host
aws $EP ec2 delete-subnet --subnet-id $pub2 2>&1 | Out-Host
aws $EP ec2 delete-vpc --vpc-id $vpcId 2>&1 | Out-Host
Write-Host "Limpieza completada (los errores son recursos ya borrados)."
\`\`\`

> Idempotente: con \`$LASTEXITCODE\` comprobado, borrar dos veces no falla.`
  }
);
