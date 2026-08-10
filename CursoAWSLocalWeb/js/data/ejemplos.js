/**
 * SECCIÓN EJEMPLOS — implementaciones completas del curso.
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.examples.push(
  {
    icon: `📜`,
    title: `Stack completo con AWS CLI`,
    description: `El lab CLI: 5 scripts + cleanup para desplegar toda la infraestructura.`,
    content: `# Ejemplo: Stack AWS CLI

## Estructura

\`\`\`text
labs/awscli/
├── env.ps1              # endpoint + credenciales
├── 01-vpc.ps1           # VPC, subnets, IGW, rutas, SGs
├── 02-instances.ps1     # 2 EC2 con user-data
├── 03-rds.ps1           # db-pedidos + db-inventario
├── 04-alb.ps1           # TG + ALB + Listener
├── 05-test.ps1          # round-robin A/B
└── 99-cleanup.ps1       # borra todo
\`\`\`

## Orden de ejecución

\`\`\`powershell
.\\01-vpc.ps1
.\\02-instances.ps1
.\\03-rds.ps1
.\\04-alb.ps1
.\\05-test.ps1      # espera healthy + verifica A=3 B=3
\`\`\`

## Pieza clave: env.ps1

\`\`\`powershell
$env:AWS_ACCESS_KEY_ID = 'test'
$env:AWS_SECRET_ACCESS_KEY = 'test'
$env:AWS_DEFAULT_REGION = 'us-east-1'
$script:EP = '--endpoint-url=http://localhost:4566'
\`\`\`

## Salida del test (verificada)

\`\`\`text
req 1 -> HTTP 200 SERVIDOR A
req 2 -> HTTP 200 SERVIDOR B
...
ROUND-ROBIN CORRECTO: A=3 B=3 ✓
\`\`\``
  },
  {
    icon: `🧩`,
    title: `Stack completo con CloudFormation`,
    description: `20 recursos en un template YAML + deploy y verificación.`,
    content: `# Ejemplo: Stack CloudFormation

## Recursos del stack (20)

- 1 VPC + 4 Subnets + 1 IGW + 1 Route Table + 1 Ruta + 2 Asociaciones
- 2 Security Groups (web, alb)
- 1 DB Subnet Group + 2 RDS (postgres, mysql)
- 2 EC2 (curso-cfn-web-1/2)
- 1 Target Group + 1 ALB + 1 Listener

## Deploy

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 cloudformation validate-template \`
  --template-body file://C:/ruta/absoluta/template.yaml

aws --endpoint-url=http://localhost:4566 cloudformation create-stack \`
  --stack-name curso-cfn --template-body file://C:/ruta/absoluta/template.yaml
\`\`\`

## Después del CREATE_COMPLETE

\`\`\`powershell
# 1. Registrar targets (gotcha: no se auto-registran en floci)
aws --endpoint-url=http://localhost:4566 elbv2 register-targets \`
  --target-group-arn $tgArn --targets Id=$web1 Id=$web2

# 2. Esperar healthy (~2,5 min) y verificar round-robin
# 3. delete-stack para limpiar
\`\`\`

## Resultado verificado

\`\`\`text
create-stack → CREATE_COMPLETE (20 recursos)
user-data plano → nginx A/B activo
targets → healthy
round-robin → A=3 B=3 ✓
delete-stack → limpieza completa
\`\`\``
  },
  {
    icon: `🏗️`,
    title: `Stack completo con Terraform`,
    description: `22 recursos en .tf + provider v4 para que RDS funcione.`,
    content: `# Ejemplo: Stack Terraform

## Archivos

\`\`\`text
labs/terraform/
├── provider.tf   # aws ~>4.0 + endpoints floci
├── variables.tf  # az1, az2, vpc_cidr, ami_id, instance_type, db_password
├── main.tf       # 22 recursos
└── outputs.tf    # alb_dns_name, endpoints, ids
\`\`\`

## Ciclo

\`\`\`powershell
cd labs/terraform
terraform init
terraform plan
terraform apply -auto-approve
terraform output
\`\`\`

## Salida (verificada)

\`\`\`text
Apply complete! Resources: 22 added, 0 changed, 0 destroyed.

alb_dns_name           = "curso-alb-tf-xxxx.elb.localhost.floci.io"
db_pedidos_endpoint    = "172.18.0.2:7003"
db_inventario_endpoint = "172.18.0.2:7004"
\`\`\`

## Segundo apply (idempotente)

\`\`\`text
No changes. Your infrastructure matches the configuration.
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
\`\`\`

## Gotchas aplicados

- Provider \`~> 4.0\` → RDS lee por nombre (floci OK).
- \`auto_minor_version_upgrade = false\` → sin drift.
- \`ignore_changes = [subnet_id, vpc_security_group_ids]\` → sin reemplazo perpetuo.`
  },
  {
    icon: `🖥️`,
    title: `Windows real vs Linux en floci`,
    description: `Cómo el mismo proyecto se ve en ambos mundos.`,
    content: `# Ejemplo: Windows real vs floci (Linux)

## Vista del alumno (Windows)

\`\`\`text
PowerShell 5.1+
├── Docker Desktop (floci en contenedor)
├── AWS CLI v2 (apunta a localhost:4566)
├── Terraform 1.5+
└── psql / mysql (clientes de BD)
\`\`\`

## Vista del emulador (Linux en floci)

\`\`\`text
floci (contenedor Docker, Amazon Linux)
├── EC2 → contenedores Linux con nginx
├── RDS → contenedores PostgreSQL 16 y MySQL 8
└── ALB → balanceo por contenedor (172.18.0.x)
\`\`\`

## En AWS real con Windows Server

El **mismo proyecto** en AWS real podría usar instancias Windows Server:

- Acceso por **RDP (3389)**.
- Bootstrap con \`<powershell>…</powershell>\` (IIS en vez de nginx).
- Los servicios (VPC, EC2, RDS, ALB) y los comandos son **idénticos**.

\`\`\`powershell
# user-data de Windows (AWS real)
<powershell>
Install-WindowsFeature Web-Server
Set-Content -Path "C:\\inetpub\\wwwroot\\index.html" -Value "<h1>Servidor Windows A</h1>"
</powershell>
\`\`\`

## Conclusión

Aprendes infraestructura AWS con la velocidad y el costo de un emulador local, y los conceptos son 100% transferibles a entornos reales con Windows o Linux.`
  }
);
