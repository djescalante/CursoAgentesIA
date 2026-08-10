/**
 * Módulo 2 — Redes: VPC, Subnets y Rutas
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-2`,
    number: 2,
    icon: `🌐`,
    title: `Redes: VPC, Subnets y Rutas`,
    subtitle: `El cimiento de todo`,
    description: `Diseña la red de tu proyecto: VPC, subnets públicas y privadas en 2 AZ, Internet Gateway, tablas de rutas y security groups.`,
    difficulty: `intermediate`,
    lessons: [
      {
        id: `2-1`,
        title: `Conceptos de Red en AWS`,
        time: `25 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 2.1 - Conceptos de Red en AWS

## 🕸️ VPC — Virtual Private Cloud

Una **VPC** es tu red privada dentro de AWS. Es un espacio aislado donde viven todos tus recursos (servidores, bases de datos, balanceadores).

Cada VPC define:

- Un **bloque CIDR** (rango de IPs privadas), por ejemplo \`10.0.0.0/16\`.
- Una **región** (ej. \`us-east-1\`, Norte de Virginia).

\`\`\`text
VPC 10.0.0.0/16 (us-east-1)
└── red privada aislada donde vive TODO tu proyecto
\`\`\`

---

## 📐 CIDR: Cómo se dividen las IPs

**CIDR** (\`Classless Inter-Domain Routing\`) define el tamaño de la red. El sufijo \`/16\` o \`/24\` indica cuántos bits son de red:

| CIDR | Rango | IPs útiles | Uso típico |
|---|---|---|---|
| \`10.0.0.0/16\` | 10.0.0.0 – 10.0.255.255 | ~65.000 | Toda la VPC |
| \`10.0.1.0/24\` | 10.0.1.0 – 10.0.1.255 | ~251 | Subnet pública 1 |
| \`10.0.11.0/24\` | 10.0.11.0 – 10.0.11.255 | ~251 | Subnet privada 1 |

> 📌 Regla de oro: **los rangos de las subnets no pueden solaparse dentro de la VPC.**

---

## 📡 Zonas de Disponibilidad (AZ)

Las **Zonas de Disponibilidad** son centros de datos separados dentro de una región. Si tu infraestructura vive en 2 AZ distintas, **la caída de una zona no tumba tu aplicación**.

En el curso usamos:

\`\`\`text
us-east-1a  ──► subnet pública + subnet privada (Servidor A)
us-east-1b  ──► subnet pública + subnet privada (Servidor B)
\`\`\`

---

## 🏷️ Subnets Públicas y Privadas

Una subnet es pública si tiene salida a Internet (su tabla de rutas apunta a un Internet Gateway). En nuestro proyecto:

| Subnet | CIDR | AZ | Tipo |
|---|---|---|---|
| pub1 | \`10.0.1.0/24\` | us-east-1a | Pública (servidores web) |
| pub2 | \`10.0.2.0/24\` | us-east-1b | Pública (servidores web) |
| priv1 | \`10.0.11.0/24\` | us-east-1a | Privada (bases de datos) |
| priv2 | \`10.0.12.0/24\` | us-east-1b | Privada (bases de datos) |

---

## ✅ Resumen

- Una **VPC** aísla tu red dentro de una región con un rango CIDR.
- Las **subnets** dividen la VPC en segmentos por AZ.
- Las subnets **públicas** tienen salida a Internet; las **privadas**, no.
- No solapes rangos y usa **2 AZ** para alta disponibilidad.`,
        exercise: {
          title: `Diseña tu red`,
          prompt: `Diseña la tabla de subnets de tu proyecto: VPC /16 con 2 subnets públicas y 2 privadas en 2 AZ. Explica qué CIDR le pondrías a cada una y por qué no deben solaparse.`
        }
      },
      {
        id: `2-2`,
        title: `Creando tu VPC y Subnets`,
        time: `25 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 2.2 - Creando tu VPC y Subnets

## 🛠️ Crear la VPC

Vamos a crear la VPC con el CLI. Necesitamos capturar su ID, porque todo lo demás depende de ella.

\`\`\`powershell
# 1. Crear la VPC
$vpcId = aws --endpoint-url=http://localhost:4566 ec2 create-vpc \`
  --cidr-block 10.0.0.0/16 --output text --query "Vpc.VpcId"

# 2. Etiquetarla para reconocerla
aws --endpoint-url=http://localhost:4566 ec2 create-tags \`
  --resources $vpcId --tags Key=Name,Value=curso-vpc

Write-Host "VPC creada: $vpcId"
\`\`\`

> 💡 En PowerShell, el carácter \`\`\` (backtick) al final de línea continúa el comando en la siguiente línea.

---

## 🧩 Crear las 4 Subnets

Cada subnet pertenece a una VPC, tiene su CIDR y su AZ:

\`\`\`powershell
$subnets = @(
  @{ Name='curso-pub-1';  Cidr='10.0.1.0/24';  Az='us-east-1a' },
  @{ Name='curso-pub-2';  Cidr='10.0.2.0/24';  Az='us-east-1b' },
  @{ Name='curso-priv-1'; Cidr='10.0.11.0/24'; Az='us-east-1a' },
  @{ Name='curso-priv-2'; Cidr='10.0.12.0/24'; Az='us-east-1b' }
)

foreach ($s in $subnets) {
  $id = aws --endpoint-url=http://localhost:4566 ec2 create-subnet \`
    --vpc-id $vpcId --cidr-block $s.Cidr --availability-zone $s.Az \`
    --output text --query "Subnet.SubnetId"
  aws --endpoint-url=http://localhost:4566 ec2 create-tags \`
    --resources $id --tags Key=Name,Value=$($s.Name)
  Write-Host "$($s.Name) = $id"
}
\`\`\`

---

## 🌐 Activar IPs públicas automáticas

Para que las instancias de las subnets **públicas** obtengan IP pública automáticamente:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 ec2 modify-subnet-attribute \`
  --subnet-id $pub1 --map-public-ip-on-launch
aws --endpoint-url=http://localhost:4566 ec2 modify-subnet-attribute \`
  --subnet-id $pub2 --map-public-ip-on-launch
\`\`\`

---

## ✅ Verificar

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 ec2 describe-subnets \`
  --filters "Name=vpc-id,Values=$vpcId"
\`\`\`

Verás las 4 subnets con sus CIDR y AZ.

---

## ✅ Resumen

- \`create-vpc\` te devuelve el \`VpcId\`; guarda ese ID en una variable.
- \`create-subnet\` requiere \`--vpc-id\`, \`--cidr-block\` y \`--availability-zone\`.
- Las subnets públicas deben tener \`map-public-ip-on-launch\`.
- Etiqueta todo con \`Name\` para reconocer tus recursos.`,
        exercise: {
          title: `Tu primera VPC`,
          prompt: `Ejecuta los comandos create-vpc y create-subnet contra floci, captura los IDs y pega el resultado de describe-subnets mostrando las 4 subnets.`
        }
      },
      {
        id: `2-3`,
        title: `Internet Gateway y Tablas de Rutas`,
        time: `25 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 2.3 - Internet Gateway y Tablas de Rutas

## 🌍 Internet Gateway (IGW)

Un **Internet Gateway** es la "puerta" que conecta tu VPC con Internet. Sin él, nada de tu VPC puede salir ni recibir tráfico público.

\`\`\`powershell
# 1. Crear el gateway
$igwId = aws --endpoint-url=http://localhost:4566 ec2 create-internet-gateway \`
  --output text --query "InternetGateway.InternetGatewayId"

# 2. Adjuntarlo a la VPC
aws --endpoint-url=http://localhost:4566 ec2 attach-internet-gateway \`
  --internet-gateway-id $igwId --vpc-id $vpcId

# 3. Etiquetarlo
aws --endpoint-url=http://localhost:4566 ec2 create-tags \`
  --resources $igwId --tags Key=Name,Value=curso-igw
\`\`\`

---

## 🗺️ Tablas de Rutas

Una **Route Table** define "por dónde sale el tráfico" de cada subnet.

Para que una subnet sea **pública**, su tabla debe tener una ruta:

\`\`\`text
0.0.0.0/0  ──►  Internet Gateway
\`\`\`

(es decir: todo el tráfico que no tenga una ruta específica sale por el IGW).

\`\`\`powershell
# 1. Crear la tabla de rutas pública
$rtId = aws --endpoint-url=http://localhost:4566 ec2 create-route-table \`
  --vpc-id $vpcId --output text --query "RouteTable.RouteTableId"

# 2. Añadir la ruta por defecto al IGW
aws --endpoint-url=http://localhost:4566 ec2 create-route \`
  --route-table-id $rtId --destination-cidr-block 0.0.0.0/0 \`
  --gateway-id $igwId

# 3. Asociar las subnets públicas a esta tabla
aws --endpoint-url=http://localhost:4566 ec2 associate-route-table \`
  --route-table-id $rtId --subnet-id $pub1
aws --endpoint-url=http://localhost:4566 ec2 associate-route-table \`
  --route-table-id $rtId --subnet-id $pub2
\`\`\`

---

## 🔒 Subnets Privadas

Las subnets **privadas** usan la tabla de rutas por defecto de la VPC (solo rutas locales), por lo que **no tienen salida a Internet**. Ahí van las bases de datos: nadie puede alcanzarlas desde fuera.

---

## 📊 Esquema Final

\`\`\`text
        Internet
           │
     [Internet Gateway]
           │
  [Route Table pública] 0.0.0.0/0 → IGW
     ┌────┴────┐
  pub1 (1a)  pub2 (1b)      ← servidores web (EC2)
  priv1 (1a) priv2 (1b)     ← bases de datos (RDS) [sin salida]
\`\`\`

---

## ✅ Resumen

- El **IGW** conecta la VPC con Internet y se adjunta a la VPC.
- La **tabla de rutas** decide el camino del tráfico de cada subnet.
- Ruta \`0.0.0.0/0 → IGW\` = subnet pública.
- Subnets sin esa ruta = privadas (perfectas para bases de datos).`,
        exercise: {
          title: `Conecta tu red`,
          prompt: `Crea un Internet Gateway, adjúntalo a tu VPC, crea una tabla de rutas con la ruta 0.0.0.0/0 hacia el gateway y asocia las dos subnets públicas. Describe el esquema resultante.`
        }
      },
      {
        id: `2-4`,
        title: `Seguridad: Security Groups`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 2.4 - Seguridad: Security Groups

## 🛡️ Qué es un Security Group

Un **Security Group (SG)** es un firewall virtual que controla qué tráfico puede entrar y salir de tus recursos (instancias, balanceadores, RDS).

**Características clave:**

- Es **stateful**: si permites una conexión de entrada, la respuesta de salida se permite sola.
- Solo tiene reglas **allow** (por defecto todo se bloquea).
- Se asocia a uno o varios recursos.

---

## 🌐 El SG de los Servidores Web

Los servidores deben aceptar HTTP (80) y SSH (22). En AWS real, además, podrías abrir RDP (3389) para servidores Windows:

\`\`\`powershell
$sgWeb = aws --endpoint-url=http://localhost:4566 ec2 create-security-group \`
  --group-name curso-web-sg --description "SG de los servidores web" \`
  --vpc-id $vpcId --output text --query "GroupId"

# HTTP
aws --endpoint-url=http://localhost:4566 ec2 authorize-security-group-ingress \`
  --group-id $sgWeb --protocol tcp --port 80 --cidr 0.0.0.0/0

# SSH
aws --endpoint-url=http://localhost:4566 ec2 authorize-security-group-ingress \`
  --group-id $sgWeb --protocol tcp --port 22 --cidr 0.0.0.0/0

# RDP (para servidores Windows reales)
aws --endpoint-url=http://localhost:4566 ec2 authorize-security-group-ingress \`
  --group-id $sgWeb --protocol tcp --port 3389 --cidr 0.0.0.0/0
\`\`\`

---

## ⚖️ El SG del Balanceador

El ALB recibe tráfico del mundo en el puerto 80:

\`\`\`powershell
$sgAlb = aws --endpoint-url=http://localhost:4566 ec2 create-security-group \`
  --group-name curso-alb-sg --description "SG del ALB" \`
  --vpc-id $vpcId --output text --query "GroupId"

aws --endpoint-url=http://localhost:4566 ec2 authorize-security-group-ingress \`
  --group-id $sgAlb --protocol tcp --port 80 --cidr 0.0.0.0/0
\`\`\`

---

## 🗄️ El SG de las Bases de Datos

Las bases de datos solo deberían recibir conexiones desde los servidores web. Lo ideal es una regla que referencie el SG de los servidores:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 ec2 authorize-security-group-ingress \`
  --group-id $sgRds --protocol tcp --port 5432 --source-group $sgWeb
aws --endpoint-url=http://localhost:4566 ec2 authorize-security-group-ingress \`
  --group-id $sgRds --protocol tcp --port 3306 --source-group $sgWeb
\`\`\`

> 💡 Referenciar un **source group** es la mejor práctica: solo las instancias con ese SG pueden conectarse, sin importar su IP.

---

## ⚠️ Gotcha de floci con SG (importante)

Descubrimos durante el desarrollo de este curso que **floci no replica al 100% los security groups**:

1. Al crear un SG **desde CloudFormation**, floci puede dejarlo **sin reglas de entrada** (la respuesta del emulador no incluye los ingress).
2. floci **ignora los security groups** que le pides en \`run-instances\`: las instancias quedan asociadas al \`sg-default\`.
3. El ALB, sin embargo, sigue funcionando porque resuelve los targets por su **IP de contenedor** (\`containerBridgeIp\`), no por las reglas del SG.

**Qué significa para el curso:** los SGs los creas y los entiendes por conceptos, pero no dependas de ellos para el funcionamiento del emulador.

---

## ✅ Resumen

- El **SG** es un firewall stateful con reglas de solo "permitir".
- Abre 80/22/3389 en los servidores web y 80 en el ALB.
- Usa \`--source-group\` para limitar el acceso a las bases de datos.
- En floci, los SGs existen pero **no se aplican de forma estricta**; el ALB resuelve targets por IP de contenedor.`,
        exercise: {
          title: `Protege tus recursos`,
          prompt: `Crea los security groups de servidores, balanceador y bases de datos con las reglas de ingreso correspondientes. Explica qué puertos abres en cada uno y por qué.`
        }
      }
    ]
  }
);
