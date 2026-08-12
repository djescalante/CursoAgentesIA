/**
 * SECCIÓN RECURSOS — cheatsheets y guías de referencia.
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.resources.push(
  {
    icon: `📌`,
    title: `Cheatsheet AWS CLI`,
    tag: `CLI`,
    description: `Los comandos esenciales del curso, de un vistazo.`,
    content: `# Cheatsheet AWS CLI (floci)

## Red

\`\`\`bash
# VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16

# Subnet
aws ec2 create-subnet --vpc-id <vpc> --cidr-block 10.0.1.0/24 --availability-zone us-east-1a

# Internet Gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --internet-gateway-id <igw> --vpc-id <vpc>

# Ruta por defecto
aws ec2 create-route --route-table-id <rt> --destination-cidr-block 0.0.0.0/0 --gateway-id <igw>

# Security Group
aws ec2 create-security-group --group-name <name> --description "..." --vpc-id <vpc>
aws ec2 authorize-security-group-ingress --group-id <sg> --protocol tcp --port 80 --cidr 0.0.0.0/0
\`\`\`

## Servidores (EC2)

\`\`\`bash
aws ec2 run-instances --image-id ami-0c02fb55956c7d316 --instance-type t3.micro --subnet-id <sub> --user-data file://script.sh
aws ec2 describe-instances --instance-ids <id>
aws ec2 terminate-instances --instance-ids <id>
\`\`\`

## Bases de datos (RDS)

\`\`\`bash
aws rds create-db-subnet-group --db-subnet-group-name <name> --subnet-ids <a> <b>
aws rds create-db-instance --db-instance-identifier db-x --db-instance-class db.t3.micro --engine postgres --allocated-storage 20 --master-username admin --master-user-password "ChangeMe123!" --db-subnet-group-name <name> --backup-retention-period 0
aws rds describe-db-instances
aws rds delete-db-instance --db-instance-identifier db-x --skip-final-snapshot
\`\`\`

## Balanceo (ELBv2)

\`\`\`bash
aws elbv2 create-target-group --name <tg> --protocol HTTP --port 80 --vpc-id <vpc>
aws elbv2 register-targets --target-group-arn <tg> --targets Id=<i1> Id=<i2>
aws elbv2 create-load-balancer --name <alb> --subnets <s1> <s2> --type application
aws elbv2 create-listener --load-balancer-arn <lb> --protocol HTTP --port 80 --default-actions "Type=forward,TargetGroupArn=<tg>"
aws elbv2 describe-target-health --target-group-arn <tg>
aws elbv2 delete-load-balancer --load-balancer-arn <lb>
\`\`\`

## CloudFormation

\`\`\`bash
aws cloudformation validate-template --template-body file://template.yaml
aws cloudformation create-stack --stack-name <name> --template-body file://template.yaml
aws cloudformation describe-stacks --stack-name <name>
aws cloudformation describe-stack-resources --stack-name <name>
aws cloudformation delete-stack --stack-name <name>
\`\`\`

> Recuerda añadir \`--endpoint-url=http://localhost:4566\` en floci.`
  },
  {
    icon: `⚙️`,
    title: `Cheatsheet PowerShell`,
    tag: `PowerShell`,
    description: `Patrones de PowerShell usados en todos los labs.`,
    content: `# Cheatsheet PowerShell

## Variables de entorno de floci

\`\`\`powershell
$env:AWS_ACCESS_KEY_ID='test'
$env:AWS_SECRET_ACCESS_KEY='test'
$env:AWS_DEFAULT_REGION='us-east-1'
$EP = '--endpoint-url=http://localhost:4566'
\`\`\`

## Capturar el ID de un comando

\`\`\`powershell
$vpcId = aws $EP ec2 create-vpc --cidr-block 10.0.0.0/16 \`
  --output text --query "Vpc.VpcId"
\`\`\`

## Esperar un estado

\`\`\`powershell
do {
  Start-Sleep -Seconds 10
  $st = aws $EP rds describe-db-instances --db-instance-identifier db-pedidos \`
    --query "DBInstances[0].DBInstanceStatus" --output text
} until ($st -eq 'available')
\`\`\`

## Manejo de errores (¡importante!)

\`\`\`powershell
$ErrorActionPreference = 'Continue'   # NO 'Stop'
aws ... 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) { Write-Warning "Falló (código $LASTEXITCODE)" }
\`\`\`

> ⚠️ Con \`$ErrorActionPreference='Stop'\`, PowerShell 5.1 convierte el stderr de procesos nativos en un error terminante y rompe el script.

## Contadores de hashtable

\`\`\`powershell
$counts['A'] = [int]$counts['A'] + 1   # $counts['A']++ NO funciona en PS 5.1
\`\`\``
  },
  {
    icon: `🔌`,
    title: `Puertos y Endpoints de floci`,
    tag: `floci`,
    description: `Qué puerto usa cada servicio del emulador.`,
    content: `# Puertos de floci

| Puerto | Servicio |
|---|---|
| \`4566\` | Endpoint principal de la API de AWS |
| \`80\` | DNS de los ALB (host port del contenedor) |
| \`7001-7099\` | Puertos dinámicos de contenedores EC2/RDS |
| \`9169\` | Puertos internos varios |
| \`4500\` | Consola web **floci-ui** (http://localhost:4500) |

## Endpoint de las bases de datos

Cada RDS publica su endpoint real al crearse. Ejemplo típico del curso:

\`\`\`text
db-pedidos      → 172.18.0.2:7001  (PostgreSQL)
db-inventario   → 172.18.0.2:7002  (MySQL)
db-pedidos-tf   → 172.18.0.2:7003  (PostgreSQL)
db-inventario-tf→ 172.18.0.2:7004  (MySQL)
\`\`\`

> ⚠️ El puerto REAL es el que devuelve \`describe-db-instances\` (7001-7099), no el de manual (5432/3306).

## Consola web (floci-ui)

Levantada con el compose, abre \`http://localhost:4500\` para ver tus recursos EC2, RDS, S3, Lambda y EKS en una interfaz estilo AWS Console. Es de solo inspección: para crear o borrar usa el AWS CLI.

## ALB

Cada ALB publica un DNS \`<name>-<hash>.elb.localhost.floci.io\`. Usa siempre ese DNS, **no** \`localhost\` (si hay varios ALB, \`localhost:80\` devuelve 502).`
  },
  {
    icon: `🐛`,
    title: `Gotchas de floci (resumen)`,
    tag: `floci`,
    description: `Los comportamientos que difieren de AWS real.`,
    content: `# Gotchas de floci — Resumen

Estos 8 comportamientos fueron descubiertos validando los labs del curso contra floci. **No son bugs tuyos**: son del emulador.

| # | Gotcha | Solución |
|---|---|---|
| 1 | UserData CFN exige texto **plano** (no \`Fn::Base64\`) | Usar \`UserData: |\` plano en floci |
| 2 | El SG creado por CFN puede quedar **sin reglas** | No depende de él: el ALB usa IP de contenedor |
| 3 | El Target Group de CFN **no auto-registra** targets | \`register-targets\` manual post-deploy |
| 4 | Health checks tardan ~2,5 min (\`initial\` → \`healthy\`) | Esperar 5 respuestas OK consecutivas |
| 5 | Varios ALB compiten por el **host port 80** | Usar siempre el DNSName del ALB |
| 6 | \`run-instances\` **ignora** subnet y SGs | \`ignore_changes\` en Terraform |
| 7 | **RDS**: provider v5/v6 lee por \`dbi-resource-id\` → \`empty result\` | Fijar provider \`~> 4.0\` |
| 8 | RDS: \`auto_minor_version_upgrade\` siempre \`false\` | Ponerlo a \`false\` en config |

## PowerShell

- Evita \`$ErrorActionPreference='Stop'\` con stderr nativo.
- Usa ruta **absoluta** con \`file://\` en el AWS CLI.`
  },
  {
    icon: `📐`,
    title: `Tabla CIDR rápida`,
    tag: `Redes`,
    description: `Los rangos de IP de la VPC del curso.`,
    content: `# CIDR de un vistazo

| CIDR | Rango | IPs útiles |
|---|---|---|
| \`10.0.0.0/16\` | 10.0.0.0 – 10.0.255.255 | ~65.000 |
| \`10.0.1.0/24\` | 10.0.1.0 – 10.0.1.255 | ~251 |
| \`10.0.2.0/24\` | 10.0.2.0 – 10.0.2.255 | ~251 |
| \`10.0.11.0/24\` | 10.0.11.0 – 10.0.11.255 | ~251 |
| \`10.0.12.0/24\` | 10.0.12.0 – 10.0.12.255 | ~251 |

## Reglas de oro

- Las subnets **no pueden solaparse** dentro de la VPC.
- \`/24\` = 256 IPs, de las que 5 se reserva AWS (útiles ~251).
- Usa rangos privados: \`10.0.0.0/8\`, \`172.16.0.0/12\`, \`192.168.0.0/16\`.`
  },
  {
    icon: `🧱`,
    title: `Estados de los recursos`,
    tag: `Referencia`,
    description: `Ciclos de vida de EC2, RDS, CloudFormation y Terraform.`,
    content: `# Estados de los recursos

## EC2

\`\`\`text
pending → running → (stopping → stopped) → terminated
\`\`\`

## RDS

\`\`\`text
creating → available → (backing-up / modifying) → deleting
\`\`\`

## CloudFormation (stack)

\`\`\`text
CREATE_IN_PROGRESS → CREATE_COMPLETE (o ROLLBACK_COMPLETE si falla)
UPDATE_IN_PROGRESS → UPDATE_COMPLETE
DELETE_IN_PROGRESS → (desaparece)
\`\`\`

## Health check del ALB

\`\`\`text
initial (probando) → healthy (tras 5 OK) | unhealthy (tras fallos)
\`\`\`

## Terraform

\`\`\`text
init → plan → apply (crea/actualiza) → destroy
\`\`\``
  }
);
