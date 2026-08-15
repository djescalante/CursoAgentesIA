/**
 * Módulo 3 — EC2: Tus Servidores
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-3`,
    number: 3,
    icon: `🖥️`,
    title: `EC2: Tus Servidores`,
    subtitle: `Instancias a la carta`,
    description: `Lanza servidores EC2 con el AWS CLI, automatiza su configuración con User Data y entiende el papel de las AMIs (Linux en floci, Windows en AWS real).`,
    difficulty: `intermediate`,
    lessons: [
      {
        id: `3-1`,
        title: `Lanzando tu Primera Instancia`,
        time: `25 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 3.1 - Lanzando tu Primera Instancia

## 🖥️ Qué es EC2

**EC2 (Elastic Compute Cloud)** es el servicio de máquinas virtuales de AWS. Cada máquina se llama **instancia** y se define por:

- **AMI** — la imagen (sistema operativo + config).
- **Tipo de instancia** — los recursos (CPU, RAM).
- **Subnet** — dónde vive.
- **Security Group** — qué tráfico se permite.

---

## 🚀 El comando run-instances

Vamos a lanzar el **Servidor A** en la subnet pública 1:

\`\`\`powershell
$web1 = aws --endpoint-url=http://localhost:4566 ec2 run-instances \`
  --image-id ami-0c02fb55956c7d316 \`
  --instance-type t3.micro \`
  --subnet-id $pub1 \`
  --security-group-ids $sgWeb \`
  --user-data file://labs/userdata/userdata-web-a.sh \`
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=curso-web-1}]" \`
  --output text --query "Instances[0].InstanceId"

Write-Host "Servidor A: $web1"
\`\`\`

---

## 🏷️ Parámetros clave

| Parámetro | Valor | Qué es |
|---|---|---|
| \`--image-id\` | \`ami-0c02fb55956c7d316\` | La AMI base |
| \`--instance-type\` | \`t3.micro\` | 2 vCPU · 1 GiB (free tier) |
| \`--subnet-id\` | \`$pub1\` | Red donde arranca |
| \`--security-group-ids\` | \`$sgWeb\` | Firewall |
| \`--user-data\` | \`file://...\` | Script de arranque (próxima lección) |

---

## ⏳ El ciclo de vida

\`\`\`powershell
# Ver el estado de la instancia
aws --endpoint-url=http://localhost:4566 ec2 describe-instances \`
  --instance-ids $web1 --query "Reservations[0].Instances[0].[InstanceId,State.Name]"

# Estados: pending → running (→ stopping/stopped → terminated)
\`\`\`

En floci la instancia pasa a \`running\` casi de inmediato (en AWS real tarda ~1 min).

---

## ⚠️ Gotcha de floci con subnets y SGs

Como adelantamos en el Módulo 2, **floci ignora la subnet y los security groups al lanzar instancias**:

- Las instancias terminan en la \`subnet-default-c\` de la \`vpc-default\`.
- Quedan asociadas al \`sg-default\`.
- Reportan IP privada en el rango \`172.18.0.x\` (la red bridge de Docker).

Esto **no rompe el curso**: el balanceador las alcanza igual por su IP de contenedor. Pero recuerda que en **AWS real** la subnet y el SG sí se respetan estrictamente.

---

## ✅ Resumen

- \`run-instances\` es el comando para lanzar servidores EC2.
- Define AMI, tipo, subnet y security group.
- \`describe-instances\` muestra el estado y las IPs.
- En floci, subnet y SG se ignoran (todo cae en la red por defecto); en AWS real se aplican.`,
        exercise: {
          title: `Tu primer servidor`,
          prompt: `Lanza la instancia curso-web-1 en tu VPC con floci, verifica su estado con describe-instances y anota su InstanceId, su IP privada y su estado.`
        }
      },
      {
        id: `3-2`,
        title: `User Data y Bootstrap (nginx A/B)`,
        time: `30 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 3.2 - User Data y Bootstrap (nginx A/B)

## 🎯 Qué es User Data

**User Data** es un script que se ejecuta **una sola vez, en el primer arranque** de la instancia. Es la forma estándar de "autoconfigurar" un servidor sin entrar a mano.

Con él instalaremos **nginx** y crearemos la página de cada servidor.

---

## 📄 El script de bootstrap

Creamos \`labs/userdata/userdata-web-a.sh\`:

\`\`\`bash
#!/bin/bash
dnf install -y nginx >/var/log/bootstrap.log 2>&1
echo "<h1>SERVIDOR A - us-east-1a</h1>" > /usr/share/nginx/html/index.html
systemctl enable nginx >/dev/null 2>&1
systemctl start nginx >>/var/log/bootstrap.log 2>&1 || nginx >>/var/log/bootstrap.log 2>&1
\`\`\`

Y su gemelo \`userdata-web-b.sh\` con **SERVIDOR B - us-east-1b**.

---

## 🧪 Probar el bootstrap

### 1. Ejecutar el script localmente (opcional)

Puedes probar el script en una máquina Linux o en el contenedor de floci para verificar que no tiene errores de sintaxis.

### 2. Lanzar las dos instancias con su user-data

Lanzamos los dos servidores web en las dos subnets públicas, capturando sus IDs en \`$web1\` y \`$web2\`:

\`\`\`powershell
# Servidor A (curso-web-1) en subnet pública 1
$web1 = aws --endpoint-url=http://localhost:4566 ec2 run-instances \`
  --image-id ami-0c02fb55956c7d316 \`
  --instance-type t3.micro \`
  --subnet-id $pub1 \`
  --security-group-ids $sgWeb \`
  --user-data file://labs/userdata/userdata-web-a.sh \`
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=curso-web-1}]" \`
  --output text --query "Instances[0].InstanceId"

# Servidor B (curso-web-2) en subnet pública 2
$web2 = aws --endpoint-url=http://localhost:4566 ec2 run-instances \`
  --image-id ami-0c02fb55956c7d316 \`
  --instance-type t3.micro \`
  --subnet-id $pub2 \`
  --security-group-ids $sgWeb \`
  --user-data file://labs/userdata/userdata-web-b.sh \`
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=curso-web-2}]" \`
  --output text --query "Instances[0].InstanceId"

Write-Host "Servidor A ($web1) y Servidor B ($web2) listos"
\`\`\`

> 💡 Guardamos las variables \`$web1\` y \`$web2\` porque las vas a necesitar en el Módulo 5 para agregarlas al Target Group de tu balanceador (ALB).

### 3. Verificar que nginx responde

Como floci emula la red con contenedores Docker, podemos verificar la respuesta de cada servidor:

\`\`\`powershell
$ipA = aws --endpoint-url=http://localhost:4566 ec2 describe-instances \`
  --instance-ids $web1 --query "Reservations[0].Instances[0].PrivateIpAddress" --output text

$ipB = aws --endpoint-url=http://localhost:4566 ec2 describe-instances \`
  --instance-ids $web2 --query "Reservations[0].Instances[0].PrivateIpAddress" --output text

Invoke-WebRequest -Uri "http://$ipA/" -UseBasicParsing | Select-Object StatusCode, Content
Invoke-WebRequest -Uri "http://$ipB/" -UseBasicParsing | Select-Object StatusCode, Content
\`\`\`

Deberías ver \`200\` en ambos y los mensajes "SERVIDOR A" y "SERVIDOR B".

---

## ⚠️ Gotcha de floci con User Data (CloudFormation)

En el lab de CloudFormation descubrimos un detalle muy importante:

- **floci espera el user-data en claro** (texto plano que empieza por \`#!/bin/bash\`).
- En AWS **real**, el user-data de CloudFormation debe ir **codificado en base64** (\`Fn::Base64\`).
- **En floci, si usas \`Fn::Base64\`, el provisioner lo pasa al emulador SIN decodificarlo**, y el script falla con: *"did not contain executable shellscript parts"*.

**Solución para floci:** escribe el user-data **plano** en el template. Anota en el curso que en AWS real debes usar \`Fn::Base64\`.

---

## ✅ Resumen

- **User Data** autoconfigura el servidor en el primer arranque.
- El script instala nginx y escribe una página distinta (A o B).
- Verifica con \`Invoke-WebRequest\` contra la IP privada.
- Gotcha: floci exige user-data en claro; AWS real exige base64.`,
        exercise: {
          title: `Automatiza tu servidor`,
          prompt: `Crea los scripts userdata-web-a.sh y userdata-web-b.sh, lanza ambas instancias con su user-data y comprueba que cada una responde con su página (SERVIDOR A / SERVIDOR B).`
        }
      },
      {
        id: `3-3`,
        title: `AMIs: Amazon Linux vs Windows Server`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 3.3 - AMIs: Amazon Linux vs Windows Server

## 🖼️ Qué es una AMI

Una **AMI (Amazon Machine Image)** es la plantilla de la que se crea una instancia: contiene el sistema operativo, el software y la configuración.

\`\`\`text
AMI  ──►  Instancia EC2
\`\`\`

Cuando ejecutas \`run-instances\` con \`--image-id\`, AWS "clona" esa imagen en tu instancia.

---

## 🐧 Amazon Linux (lo que usa floci)

En floci, cualquier AMI que le pidas cae en **Amazon Linux 2023** por defecto. Es la distribución de AWS:

- Gestor de paquetes: \`dnf\`.
- Servicio de arranque: \`systemd\`.
- Ideal para servidores web ligeros con nginx.

\`\`\`bash
# Dentro de la instancia (Linux):
cat /etc/os-release   # Amazon Linux 2023
\`\`\`

---

## 🪟 Windows Server (lo que verías en AWS real)

En AWS real, el proyecto del curso también contempla **servidores Windows Server** (la norma en empresas):

- Se accede por **RDP (Remote Desktop)** en el puerto 3389.
- Se usa **PowerShell** dentro del servidor.
- El bootstrap se hace con \`<powershell>...</powershell>\` en el user-data, **no** con bash.

\`\`\`powershell
# User-data de Windows (formato AWS real)
<powershell>
Install-WindowsFeature Web-Server
Set-Content -Path "C:\\inetpub\\wwwroot\\index.html" \`
  -Value "<h1>Servidor Windows A</h1>"
</powershell>
\`\`\`

---

## 🧯 Por qué practicar con Linux

Aunque el objetivo del curso es enseñar Windows real, **la infraestructura (VPC, EC2, RDS, ALB) es idéntica** sin importar el sistema operativo. Practicar con floci (Linux) te da:

1. Velocidad y cero costo.
2. Los mismos servicios y comandos de AWS.
3. Conceptos de Windows (RDP, security groups 3389) que aplicas mentalmente al caso real.

---

## 🔄 Resumen de la arquitectura del curso

\`\`\`text
Tu PC (Windows)                      floci (Linux, Docker)
──────────────                       ─────────────────────
PowerShell / AWS CLI  ──►  EC2 → Amazon Linux 2023 (nginx)
Terraform / CFN              RDS → PostgreSQL + MySQL
                             ALB  → balanceo A/B
\`\`\`

---

## ✅ Resumen

- La **AMI** define el sistema operativo de la instancia.
- floci usa **Amazon Linux 2023** (dnf/systemd) para cualquier AMI.
- En AWS real podrías usar **Windows Server** con acceso RDP (3389).
- La infraestructura que aprendes es la misma con cualquier SO.`,
        exercise: {
          title: `AMI y SO`,
          prompt: `Explica qué es una AMI, qué sistema operativo usa floci por defecto y cómo sería el user-data de un servidor Windows Server (RDP, IIS/PowerShell) frente al de Amazon Linux (nginx/bash).`
        }
      }
    ]
  }
);
