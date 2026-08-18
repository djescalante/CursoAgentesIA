/**
 * Módulo 8 — IaC con Terraform
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-8`,
    number: 8,
    icon: `🏗️`,
    title: `IaC con Terraform`,
    subtitle: `Multinube declarativo`,
    description: `Automatiza la misma infraestructura con Terraform: providers, archivos .tf, apply y los gotchas específicos de floci (provider v4 y RDS).`,
    difficulty: `advanced`,
    lessons: [
      {
        id: `8-1`,
        title: `Terraform vs CloudFormation`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 8.1 - Terraform vs CloudFormation

## 🏗️ Qué es Terraform

**Terraform** (de HashiCorp) es la herramienta de IaC **multinube** más usada. Con los mismos conceptos gestionas AWS, Azure, GCP y más. Describe tu infraestructura en archivos \`.tf\` (HCL) y Terraform crea, actualiza o borra los recursos **comparando el estado real con tu configuración**.

---

## ⚖️ CloudFormation vs Terraform

| | CloudFormation | Terraform |
|---|---|---|
| **Fabricante** | AWS (nativo) | HashiCorp (multinube) |
| **Lenguaje** | YAML / JSON | HCL (\`.tf\`) |
| **Estado** | Lo gestiona AWS (el stack) | Archivo \`terraform.tfstate\` local/remoto |
| **Actualización** | \`update-stack\` | \`terraform plan\` + \`apply\` |
| **Comunidad** | Solo AWS | Multi-proveedor + módulos |

---

## 🔁 Ciclo de Terraform

\`\`\`text
terraform init    → descarga providers
terraform plan    → compara estado real vs config (muestra el plan)
terraform apply   → aplica los cambios
terraform destroy → borra TODO lo que gestiona
\`\`\`

---

## 📄 Estructura de archivos

\`\`\`text
labs/terraform/
├── provider.tf   # el provider de AWS + endpoints a floci
├── variables.tf  # variables (AZ, CIDR, AMI, password)
├── main.tf       # los recursos
├── outputs.tf    # salidas (DNS, endpoints)
└── terraform.tfstate  # el estado (se genera solo)
\`\`\`

---

## ✅ Resumen

- **Terraform** es IaC declarativo y **multinube** en HCL.
- Ciclo: \`init\` → \`plan\` → \`apply\` (→ \`destroy\`).
- Mantiene un **estado** (\`terraform.tfstate\`) que compara con la realidad.
- Mismo resultado que CloudFormation, pero con otro lenguaje y filosofía.`,
        exercise: {
          title: `Terraform vs CFN`,
          prompt: `Compara Terraform y CloudFormation en 4 aspectos (fabricante, lenguaje, estado y cómo se actualiza). ¿Cuándo elegirías cada uno?`
        }
      },
      {
        id: `8-2`,
        title: `Escribiendo tu Configuración`,
        time: `40 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 8.2 - Escribiendo tu Configuración

## 🔌 provider.tf — Apuntar a floci

El provider de AWS con los endpoints del emulador. **Importante:** fíjate en la versión, es el corazón del gotcha del RDS:

\`\`\`hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"   # 👈 esencial para RDS en floci (ver 8-3)
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

---

## 🧱 main.tf — Los recursos

Los recursos son casi idénticos a los nombres de AWS. Ejemplos clave:

### VPC y subnets

\`\`\`hcl
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = { Name = "curso-vpc-tf" }
}

resource "aws_subnet" "pub1" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
  availability_zone = var.az1
  map_public_ip_on_launch = true
  tags = { Name = "curso-pub-1" }
}
\`\`\`

### Instancias con user-data

\`\`\`hcl
resource "aws_instance" "web1" {
  ami           = var.ami_id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.pub1.id
  vpc_security_group_ids = [aws_security_group.web.id]
  user_data     = local.userdata_web1
  tags = { Name = "curso-web-1" }

  lifecycle {
    ignore_changes = [subnet_id, vpc_security_group_ids]
  }
}
\`\`\`

> ⚠️ El \`ignore_changes\` es necesario porque **floci ignora subnet/SG** al lanzar (visto en el Módulo 3) y, sin él, Terraform intentaría "corregirlo" en cada apply.

### RDS

\`\`\`hcl
resource "aws_db_instance" "pedidos" {
  identifier        = "db-pedidos-tf"
  engine            = "postgres"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  username          = "admin"
  password          = var.db_password
  db_subnet_group_name = aws_db_subnet_group.main.name
  skip_final_snapshot  = true
  auto_minor_version_upgrade = false   # evita drift en floci
}
\`\`\`

### ALB

\`\`\`hcl
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
\`\`\`

---

## 📦 outputs.tf

\`\`\`hcl
output "alb_dns_name" {
  value = aws_lb.main.dns_name
}

output "db_pedidos_endpoint" {
  value = format("%s:%s", aws_db_instance.pedidos.address, aws_db_instance.pedidos.port)
}
\`\`\`

---

## ✅ Resumen

- \`provider.tf\` apunta a floci y fija el provider **~> 4.0**.
- \`main.tf\` declara los 22 recursos con referencias entre sí.
- \`ignore_changes\` evita el reemplazo perpetuo por los gotchas de floci.
- \`outputs.tf\` expone DNS y endpoints con \`format\`.`,
        exercise: {
          title: `Escribe tu .tf`,
          prompt: `Escribe tu provider.tf (con versión ~> 4.0 y endpoints a floci) y los recursos aws_lb, aws_lb_target_group y aws_db_instance de main.tf.`
        }
      },
      {
        id: `8-3`,
        title: `Apply, Gestión y Gotchas de floci`,
        time: `35 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 8.3 - Apply, Gestión y Gotchas de floci

## 🚀 El ciclo completo

\`\`\`powershell
cd labs/terraform

# 1. Descargar el provider
terraform init

# 2. Ver el plan (sin tocar nada)
terraform plan

# 3. Aplicar
terraform apply -auto-approve

# 4. Ver salidas
terraform output
\`\`\`

Salida esperada (algo así):

\`\`\`text
Apply complete! Resources: 22 added, 0 changed, 0 destroyed.

alb_dns_name          = "curso-alb-tf-xxxx.elb.localhost.floci.io"
db_pedidos_endpoint   = "172.18.0.2:7003"
db_inventario_endpoint= "172.18.0.2:7004"
\`\`\`

---

## 🐛 Gotcha #1 — RDS: provider v5/v6 NO funciona

Este es el gotcha más importante del curso. Fue descubierto y resuelto durante el desarrollo:

- Terraform **v5/v6** del provider \`hashicorp/aws\` usa el **DBI Resource ID** como identidad del recurso \`aws_db_instance\` (es un ID interno tipo \`db-XXXXXXXX\`).
- Al leer, el provider consulta por ese ID. **floci solo resuelve lecturas por el NOMBRE** del identificador.
- Resultado: \`reading RDS DB Instance (db-pedidos-tf): empty result\`.

**Solución:** fijar el provider a la serie **v4** (\`~> 4.0\`), donde el recurso se identifica por su **nombre**:

\`\`\`hcl
version = "~> 4.0"
\`\`\`

Con v4, \`terraform apply\` crea las bases y las lee sin problema.

---

## 🐛 Gotcha #2 — Drift en RDS

Con provider v4, floci devuelve \`auto_minor_version_upgrade = false\` siempre. Si no lo pones en la config, **cada apply mostrará "1 to change"** (drift perpetuo).

**Solución:**

\`\`\`hcl
auto_minor_version_upgrade = false
\`\`\`

---

## 🐛 Gotcha #3 — Instancias: subnet y SG ignorados

floci lanza las instancias en \`subnet-default-c\` / \`sg-default\`, ignorando tu configuración. Sin remedio, Terraform intenta "corregir" el subnet en cada apply → **reemplazo perpetuo**.

**Solución:** el \`lifecycle.ignore_changes\` visto en 8-2.

---

## 🐛 Gotcha #4 — \`terraform destroy\` se puede colgar

Validado hands-on contra floci v1.6.0: al borrar un Security Group, el provider de Terraform llama primero a \`DescribeNetworkInterfaces\` para comprobar que no queden ENIs enganchadas. En floci esa llamada puede devolver un \`NullPointerException\` sin manejar. El SDK de Terraform trata ese error como reintentable y **lo reintenta para siempre**, así que \`terraform destroy\` nunca termina por sí solo.

**Cómo detectarlo:** si el destroy lleva varios minutos sin que \`terraform state list\` encoja, revisa los logs del contenedor:

\`\`\`powershell
docker logs floci --since 5m | Select-String "DescribeNetworkInterfaces"
\`\`\`

Si ves \`Unhandled error dispatching Query action DescribeNetworkInterfaces ... NullPointerException\` repetido, es este gotcha.

**Solución:** mata el proceso y termina el borrado a mano con AWS CLI (Security Groups → Subnets → VPC, en ese orden):

\`\`\`powershell
# Windows: corta terraform.exe y su plugin
Stop-Process -Name terraform -Force

$EP = "http://localhost:4566"
aws --endpoint-url $EP ec2 delete-security-group --group-id sg-xxxx
aws --endpoint-url $EP ec2 delete-subnet --subnet-id subnet-xxxx
aws --endpoint-url $EP ec2 delete-vpc --vpc-id vpc-xxxx
\`\`\`

> 📌 \`cloudformation delete-stack\` (Módulo 7) dispara el mismo bug de floci una vez por recurso, pero **tolera el error y sigue** — solo el reintento infinito de Terraform lo convierte en un cuelgue.

---

## ✅ El apply idempotente

Con los 3 gotchas resueltos, el segundo apply queda limpio:

\`\`\`text
No changes. Your infrastructure matches the configuration.
Apply complete! Resources: 0 added, 0 changed, 0 destroyed.
\`\`\`

---

## 🧹 Gestión

\`\`\`powershell
terraform state list        # recursos gestionados
terraform plan -out=tf.out  # guardar el plan
terraform destroy           # borrar TODO
\`\`\`

> ⚠️ Si cambias de versión de provider (p. ej. v6 → v4) con un estado ya creado, puede haber incompatibilidades. Lo más limpio: \`destroy\` del viejo (o limpiar floci) y empezar de cero.

---

## 🏁 Resultado verificado del curso

\`\`\`text
terraform init/validate     → OK (provider v4.67.0)
terraform apply             → 22 added, 0 changed, 0 destroyed
terraform apply (2ª vez)    → No changes ✓
targets ALB                 → healthy
terraform destroy           → colgado por Gotcha #4 (NullPointerException en floci)
                               → destroy manual de SG/Subnets/VPC vía AWS CLI ✓
\`\`\`

---

## ✅ Resumen

- Ciclo: \`init\` → \`plan\` → \`apply\` → \`output\` (→ \`destroy\`).
- **RDS necesita provider v4** (\`~> 4.0\`) porque floci no resuelve \`dbi-resource-id\`.
- Evita el drift con \`auto_minor_version_upgrade = false\`.
- Evita el reemplazo con \`ignore_changes\` en las instancias.
- El \`destroy\` puede colgarse por un bug de floci en \`DescribeNetworkInterfaces\`: si no avanza, termínalo a mano con AWS CLI.
- Con esto, los **3 labs (CLI, CloudFormation y Terraform) despliegan la misma infraestructura** en floci.`,
        exercise: {
          title: `Cierra con Terraform`,
          prompt: `Ejecuta terraform init/plan/apply contra floci, comprueba que el segundo apply dice "No changes", espera a los health checks y muestra el resultado del round-robin A/B. Explica el gotcha del dbi-resource-id.`
        }
      }
    ]
  }
);
