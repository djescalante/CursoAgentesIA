/**
 * Módulo 6 — IaC con AWS CLI
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-6`,
    number: 6,
    icon: `📜`,
    title: `IaC con AWS CLI`,
    subtitle: `Tu infraestructura en scripts`,
    description: `Convierte todo el montaje manual en scripts reutilizables de AWS CLI y PowerShell: deploy, verificación y cleanup reproducibles.`,
    difficulty: `advanced`,
    lessons: [
      {
        id: `6-1`,
        title: `Infraestructura como Código`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 6.1 - Infraestructura como Código

## 🤔 El problema de hacerlo "a mano"

En los módulos anteriores creaste la infraestructura con comandos sueltos. Eso funciona para aprender, pero en el mundo real tiene problemas:

- No es **reproducible** (cada persona la monta distinta).
- No se **versiona** (no hay historial de cambios).
- No se puede **auditar** (¿quién cambió qué y cuándo?).

La solución es la **Infraestructura como Código (IaC)**.

---

## 📜 Qué es IaC

**IaC** consiste en describir tu infraestructura en **archivos de texto** que se ejecutan de forma declarativa o imperativa.

\`\`\`text
Sin IaC:   clicks y comandos sueltos en la consola
Con IaC:   archivos + ejecutar → infraestructura idéntica cada vez
\`\`\`

**Beneficios:**

- ✅ Reproducible: mismo código → misma infraestructura.
- ✅ Versionable: guarda los archivos en Git.
- ✅ Reversible: \`destroy\`/cleanup borra todo.
- ✅ Documentado: el propio código es la documentación.

---

## 🛠️ Tres formas de IaC (las 3 en este curso)

| Herramienta | Paradigma | Tipo |
|---|---|---|
| **AWS CLI** (scripts) | Imperativo | Scripts de comandos en orden |
| **CloudFormation** | Declarativo | Template YAML (nativo AWS) |
| **Terraform** | Declarativo | Archivos .tf (multinube) |

En este módulo automatizamos con **scripts del CLI**. En los dos siguientes veremos los declarativos.

---

## 📁 Estructura del lab CLI

\`\`\`text
labs/awscli/
├── env.ps1              # variables compartidas (endpoint, credenciales)
├── 01-vpc.ps1           # VPC, subnets, IGW, rutas, SGs
├── 02-instances.ps1     # 2 instancias EC2 con user-data
├── 03-rds.ps1           # 2 bases de datos RDS
├── 04-alb.ps1           # Target Group + ALB + Listener
├── 05-test.ps1          # round-robin A/B
└── 99-cleanup.ps1       # borra todo
\`\`\`

---

## 🧩 Scripts imperativos vs. declarativos

Un script imperativo dice **CÓMO** hacerlo (el orden de los pasos):

\`\`\`powershell
# Imperativo: "crea A, luego B, luego C"
$vpc = aws ... create-vpc ...
$igw = aws ... create-internet-gateway ...
aws ... attach-internet-gateway --vpc-id $vpc --igw-id $igw
\`\`\`

Un template declarativo dice **QUÉ** quieres (el orden lo decide la herramienta):

\`\`\`yaml
# Declarativo: "existe una VPC y un IGW adjunto"
Vpc:
  CidrBlock: 10.0.0.0/16
Igw:
  VpcId: !Ref Vpc
\`\`\`

---

## ✅ Resumen

- La **IaC** describe la infraestructura en archivos versionables.
- Hay 3 enfoques en el curso: scripts CLI (imperativo), CloudFormation y Terraform (declarativos).
- Los scripts imperativos son ideales para aprender el orden real de las operaciones.`,
        exercise: {
          title: `IaC vs manual`,
          prompt: `Explica con tus palabras qué es la Infraestructura como Código, qué ventajas tiene frente a configurar a mano y la diferencia entre enfoque imperativo y declarativo.`
        }
      },
      {
        id: `6-2`,
        title: `Tu Stack con AWS CLI`,
        time: `35 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 6.2 - Tu Stack con AWS CLI

## 🧱 Un script por capa

Vamos a ver los scripts clave del lab. Todos usan las mismas variables de entorno (\`env.ps1\`):

\`\`\`powershell
# env.ps1
$env:AWS_ACCESS_KEY_ID = 'test'
$env:AWS_SECRET_ACCESS_KEY = 'test'
$env:AWS_DEFAULT_REGION = 'us-east-1'
$script:EP = '--endpoint-url=http://localhost:4566'
\`\`\`

---

## 📄 01-vpc.ps1 — La red

\`\`\`powershell
. .\\env.ps1

# VPC
$vpcId = aws $EP ec2 create-vpc --cidr-block 10.0.0.0/16 \`
  --output text --query "Vpc.VpcId"
aws $EP ec2 create-tags --resources $vpcId --tags Key=Name,Value=curso-vpc

# Subnets públicas (map-public-ip) + privadas
# IGW + adjuntar
# Route table + ruta 0.0.0.0/0 + asociar subnets públicas
# Security groups (web y alb)
\`\`\`

---

## 📄 02-instances.ps1 — Los servidores

\`\`\`powershell
$web1 = aws $EP ec2 run-instances \`
  --image-id ami-0c02fb55956c7d316 \`
  --instance-type t3.micro \`
  --subnet-id $pub1 \`
  --security-group-ids $sgWeb \`
  --user-data file://../userdata/userdata-web-a.sh \`
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=curso-web-1}]" \`
  --output text --query "Instances[0].InstanceId"
\`\`\`

---

## 📄 03-rds.ps1 — Las bases de datos

\`\`\`powershell
aws $EP rds create-db-subnet-group \`
  --db-subnet-group-name curso-db-subnet \`
  --subnet-ids $priv1 $priv2

aws $EP rds create-db-instance \`
  --db-instance-identifier db-pedidos \`
  --db-instance-class db.t3.micro --engine postgres \`
  --allocated-storage 20 --master-username admin \`
  --master-user-password "ChangeMe123!" \`
  --db-subnet-group-name curso-db-subnet --backup-retention-period 0
\`\`\`

---

## 📄 04-alb.ps1 — El balanceador

\`\`\`powershell
$tgArn = aws $EP elbv2 create-target-group \`
  --name curso-web-tg --protocol HTTP --port 80 \`
  --vpc-id $vpcId --health-check-protocol HTTP \`
  --health-check-path "/" --output text --query "TargetGroups[0].TargetGroupArn"

aws $EP elbv2 register-targets --target-group-arn $tgArn \`
  --targets Id=$web1 Id=$web2

$lbArn = aws $EP elbv2 create-load-balancer \`
  --name curso-alb --subnets $pub1 $pub2 \`
  --security-groups $sgAlb --scheme internet-facing \`
  --type application --output text --query "LoadBalancers[0].LoadBalancerArn"

aws $EP elbv2 create-listener --load-balancer-arn $lbArn \`
  --protocol HTTP --port 80 \`
  --default-actions Type=forward,TargetGroupArn=$tgArn
\`\`\`

---

## ⏳ Espere a que todo esté listo

Un buen script **espera estados**, no supone. Ejemplo:

\`\`\`powershell
# Esperar a que las instancias estén running
do {
  Start-Sleep -Seconds 5
  $state = aws $EP ec2 describe-instances --instance-ids $web1 \`
    --query "Reservations[0].Instances[0].State.Name" --output text
} until ($state -eq "running")

# Esperar a que las BD estén available
do {
  Start-Sleep -Seconds 10
  $st = aws $EP rds describe-db-instances --db-instance-identifier db-pedidos \`
    --query "DBInstances[0].DBInstanceStatus" --output text
} until ($st -eq "available")
\`\`\`

---

## ✅ Resumen

- Separa tu stack en scripts por **capa** (red, instancias, BD, ALB).
- Centraliza endpoint y credenciales en \`env.ps1\`.
- Usa \`file://\` con **ruta absoluta** (el CLI local no resuelve relativas en todos los casos).
- Espera los estados (\`running\`, \`available\`) antes de seguir.`,
        exercise: {
          title: `Escribe tu stack`,
          prompt: `Escribe los scripts 01-vpc.ps1 y 04-alb.ps1 completos (los vistos en la lección) y explica qué hace cada bloque de 04-alb.ps1.`
        }
      },
      {
        id: `6-3`,
        title: `Lab CLI: Deploy y Cleanup`,
        time: `30 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 6.3 - Lab CLI: Deploy y Cleanup

## 🚀 Desplegar todo el stack

Con los scripts listos, el deploy es una línea:

\`\`\`powershell
.\\01-vpc.ps1
.\\02-instances.ps1
.\\03-rds.ps1
.\\04-alb.ps1
\`\`\`

---

## 🧪 Verificar con 05-test.ps1

El script de test espera a que los targets estén sanos y hace el round-robin:

\`\`\`powershell
# Esperar health checks (intervalo 30s, umbral 5)
do {
  Start-Sleep -Seconds 30
  $health = aws $EP elbv2 describe-target-health --target-group-arn $tgArn \`
    --query "TargetHealthDescriptions[?TargetHealth.State=='healthy']" --output text
} while (-not $health)

# Round-robin
$url = "http://$(aws $EP elbv2 describe-load-balancers --names curso-alb \`
  --query "LoadBalancers[0].DNSName" --output text)/"
# ... 6 peticiones, contar A/B ...
\`\`\`

Salida esperada:

\`\`\`text
ROUND-ROBIN CORRECTO: A=3 B=3 ✓
\`\`\`

---

## 🧹 Cleanup con 99-cleanup.ps1

Borrar todo **en orden inverso** al de creación (los dependientes primero):

\`\`\`powershell
# 1. Listener y ALB
aws $EP elbv2 delete-load-balancer --load-balancer-arn $lbArn
# 2. Target group
aws $EP elbv2 delete-target-group --target-group-arn $tgArn
# 3. Bases de datos
aws $EP rds delete-db-instance --db-instance-identifier db-pedidos --skip-final-snapshot
aws $EP rds delete-db-instance --db-instance-identifier db-inventario --skip-final-snapshot
# 4. Instancias
aws $EP ec2 terminate-instances --instance-ids $web1 $web2
# 5. Red: desadjuntar IGW, borrar rutas, subnets, VPC
\`\`\`

> 💡 El cleanup debe ser **idempotente**: si un recurso ya no existe, el script no debe fallar. Se consigue capturando \`$LASTEXITCODE\` y continuando.

---

## 🔁 El ciclo completo

\`\`\`powershell
# Deploy
.\\01-vpc.ps1; .\\02-instances.ps1; .\\03-rds.ps1; .\\04-alb.ps1
# Test (~3 min por health checks)
.\\05-test.ps1
# Limpieza total
.\\99-cleanup.ps1
\`\`\`

Puedes repetirlo cuantas veces quieras: **siempre sale la misma infraestructura** y siempre se borra por completo.

---

## ⚠️ PowerShell: manejo de errores nativo

Recordatorio importante (visto en el Módulo 1):

\`\`\`powershell
$ErrorActionPreference = 'Continue'
aws ... 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) {
  Write-Warning "El comando falló (código $LASTEXITCODE) — continuando"
}
\`\`\`

Si usas \`$ErrorActionPreference = 'Stop'\`, el stderr de procesos nativos se convierte en un error terminante y el script se corta en el primer fallo.

---

## ✅ Resumen

- El deploy completo son **4 scripts en orden** (red → instancias → BD → ALB).
- El test espera a los health checks y verifica **A=3 B=3**.
- El cleanup borra **en orden inverso** y es **idempotente**.
- Maneja los errores con \`$LASTEXITCODE\`, no con \`$ErrorActionPreference='Stop'\`.`,
        exercise: {
          title: `Cierra el ciclo`,
          prompt: `Ejecuta el ciclo completo (deploy → test → cleanup) contra floci y copia la salida del test de round-robin y la confirmación del cleanup.`
        }
      }
    ]
  }
);
