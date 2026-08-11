/**
 * Módulo 1 — Fundamentos de AWS y floci
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-1`,
    number: 1,
    icon: `☁️`,
    title: `Fundamentos de AWS y floci`,
    subtitle: `Tu AWS en local`,
    description: `Qué es AWS, por qué emularlo en tu máquina con floci y cómo configurar el AWS CLI para hablar con tu emulador.`,
    difficulty: `beginner`,
    lessons: [
      {
        id: `1-1`,
        title: `Qué es AWS y por qué emularlo`,
        time: `20 min`,
        difficulty: `🟢 Principiante`,
        content: `# 1.1 - Qué es AWS y por qué emularlo

## 🌍 Amazon Web Services

**Amazon Web Services (AWS)** es la plataforma de nube más grande del mundo. Proporciona cientos de servicios, entre los más conocidos:

- **EC2** — máquinas virtuales (servidores).
- **VPC** — redes privadas virtuales.
- **RDS** — bases de datos gestionadas.
- **ELB** — balanceadores de carga.
- **S3** — almacenamiento de objetos.

Con estos servicios puedes levantar desde un blog hasta la infraestructura completa de una empresa, **sin comprar hardware**.

---

## 🤔 El Problema de Aprender AWS

AWS real tiene **costos**, y los recursos no se crean ni se borran al instante. Aprender cometiendo errores puede costarte dinero.

Imagina que estás practicando balanceadores y olvidas apagar una instancia una semana: **ya tienes una factura inesperada.**

Aquí entra el emulador.

---

## ☁️ Qué es un Emulador de AWS

Un **emulador de AWS** replica en tu máquina local los endpoints y el comportamiento de los servicios de AWS, para que tus herramientas y tu código hablen con él **exactamente igual** que con AWS real.

### floci

**floci** es un emulador de AWS gratuito y open source que corre en un contenedor Docker:

- No requiere cuenta, token ni tarjetas.
- Expone los endpoints en \`http://localhost:4566\`.
- Acepta **cualquier credencial** (usamos \`test\`/\`test\`).
- Es compatible con las herramientas profesionales: AWS CLI, CloudFormation y Terraform.

> 💡 floci usa el mismo puerto que LocalStack, el emulador más famoso del ecosistema. Todo lo que aprendas aquí también funciona apuntando a LocalStack.

---

## 🔁 El Mismo Código, Distinto Destino

La clave del curso es esta idea:

\`\`\`text
Herramientas (CLI / CFN / Terraform)
        │
        ▼
endpoint = http://localhost:4566  ──► floci (emulador)
endpoint = https://...amazonaws.com ──► AWS real
\`\`\`

Solo cambia el **endpoint** al que apuntas. Los comandos, los templates y los recursos son los mismos.

---

## 🧱 Servicios que Vas a Usar en el Curso

| Servicio | Qué hace en nuestro proyecto |
|---|---|
| **VPC** | La red completa (subnets, rutas, gateways) |
| **EC2** | Los 2 servidores web (nginx) |
| **RDS** | Las 2 bases de datos (PostgreSQL y MySQL) |
| **ELBv2 (ALB)** | El balanceador que reparte tráfico |

---

## ✅ Resumen

- AWS es la nube más usada del mundo; EC2, VPC, RDS y ELB son sus bloques básicos.
- Un emulador local replica el comportamiento de AWS sin costo.
- floci corre en Docker en \`localhost:4566\` y acepta cualquier credencial.
- El código que escribes es el mismo para AWS real; solo cambia el endpoint.`,
        exercise: {
          title: `Conceptos clave`,
          prompt: `Explica con tus palabras la diferencia entre AWS real y floci (emulador), y nombra 3 servicios de AWS que vayas a usar en este curso.`
        }
      },
      {
        id: `1-2`,
        title: `Instalando y arrancando floci`,
        time: `20 min`,
        difficulty: `🟢 Principiante`,
        content: `# 1.2 - Instalando y arrancando floci

## 🐳 Requisito: Docker Desktop

Primero necesitas **Docker Desktop** instalado y en marcha. Verifica que funcione:

\`\`\`powershell
docker version --format "{{.Server.Version}}"
\`\`\`

Si responde con una versión, Docker está listo.

---

## 🧩 El docker-compose de floci

Creamos una carpeta \`labs/floci\` con este \`compose.yaml\`:

\`\`\`yaml
services:
  floci:
    image: floci/floci:latest
    container_name: floci
    ports:
      - "4566:4566"            # API de AWS (endpoint http://localhost:4566)
      - "80:80"                # Listener HTTP del ALB
      - "7001-7099:7001-7099"  # RDS proxy (PostgreSQL/MySQL/MariaDB)
      - "9169:9169"            # IMDS para las instancias EC2
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - floci-data:/app/data
    environment:
      FLOCI_STORAGE_MODE: persistent
      FLOCI_STORAGE_PERSISTENT_PATH: /app/data
      FLOCI_DEFAULT_REGION: us-east-1

  floci-ui:
    image: floci/floci-ui:latest
    container_name: floci-ui
    ports:
      - "4500:4500"            # Consola web (http://localhost:4500)
    environment:
      FLOCI_ENDPOINT: http://floci:4566
      AWS_REGION: us-east-1
      AWS_ACCESS_KEY_ID: "000000000000"
      AWS_SECRET_ACCESS_KEY: floci
    depends_on:
      - floci

volumes:
  floci-data:
\`\`\`

### ¿Por qué esos puertos?

- **4566**: endpoint principal de la API de AWS.
- **80**: los balanceadores ALB publican su DNS aquí.
- **7001-7099**: puertos dinámicos de los contenedores de EC2 y RDS.
- **9169**: IMDS (los servidores EC2 consultan aquí sus metadatos).
- El volumen **persistente** conserva la infraestructura entre reinicios.
- **4500**: la consola web **floci-ui** (más abajo).

> ⚠️ **Ojo con el volumen:** en la imagen base la persistencia no viene activada por defecto. Con \`FLOCI_STORAGE_MODE=persistent\` tus VPC, instancias y bases de datos sobreviven a los reinicios del contenedor.

> 🔌 **\`docker.sock\`:** es lo que le permite a floci crear los contenedores reales de EC2, RDS y Lambda en tu Docker. Sin este volumen, esos servicios no funcionan.

---

## ▶️ Arrancar floci

Desde la carpeta del compose:

\`\`\`powershell
docker compose up -d
docker compose logs -f floci   # ver logs en vivo (Ctrl+C para salir)
\`\`\`

Cuando veas algo como *"floci is ready"*, el emulador está listo.

### Verificar que responde

\`\`\`powershell
curl http://localhost:4566/_localstack/health
\`\`\`

Deberías ver un JSON con los servicios y su estado. En floci también puedes usar:

\`\`\`powershell
docker ps
\`\`\`

---

## 🖥️ La consola web: floci-ui

floci viene con una **consola web estilo AWS Console** llamada **floci-ui**. Es opcional: todo lo del curso funciona por CLI, pero te da una vista gráfica de tus recursos (EC2, RDS, S3, Lambda, EKS...).

> 💡 **No es un servicio de AWS emulado:** es una herramienta de visualización que lee la API de floci y la muestra en el navegador.

### Cómo se levanta

Si incluiste el servicio \`floci-ui\` en tu \`compose.yaml\`, arranca junto con el emulador:

\`\`\`powershell
docker compose up -d
\`\`\`

Luego abre la consola en tu navegador:

\`\`\`
http://localhost:4500
\`\`\`

### Qué verás ahí

- **Cloud Explorer**: explora los recursos reales que has creado (instancias EC2, bases RDS, buckets S3, colas SQS...).
- **Console Home**: estado de cada servicio y aviso claro cuando un servicio aún no está implementado.
- Los datos son **reales** (los lee de tu floci), no maquetas.

> ⚠️ floci-ui es un proyecto reciente: algunos servicios aparecen como *"coming soon"* o solo lectura. Para crear/borrar recursos sigue usando el AWS CLI; la consola es para **inspeccionar**.

---

## 🛑 Detener el emulador

\`\`\`powershell
docker compose down          # detiene el contenedor (los datos persisten)
docker compose down -v       # detiene Y BORRA los datos del volumen
\`\`\`

> ⚠️ **Cuidado con \`-v\`:** borra toda tu infraestructura emulada.

---

## ✅ Resumen

- Instala Docker Desktop y verifica \`docker version\`.
- Crea un \`compose.yaml\` que expone los puertos 4566, 80, 7001-7099 y 9169.
- Arranca con \`docker compose up -d\` y verifica con \`docker ps\`.
- Opcional: abre **floci-ui** en \`http://localhost:4500\` para ver tus recursos en una consola web.
- Usa persistencia para no perder tu infraestructura entre reinicios.`,
        exercise: {
          title: `Levanta tu emulador`,
          prompt: `Crea el compose.yaml de floci, ejecuta docker compose up -d y describe qué puertos expones y por qué es importante el volumen de persistencia.`
        }
      },
      {
        id: `1-3`,
        title: `AWS CLI contra tu AWS local`,
        time: `20 min`,
        difficulty: `🟢 Principiante`,
        content: `# 1.3 - AWS CLI contra tu AWS local

## 🧰 Qué es el AWS CLI

El **AWS CLI** (Command Line Interface) es la herramienta oficial de Amazon para gestionar AWS desde la terminal. Todo lo que haces en la consola web, lo puedes hacer con comandos.

\`\`\`powershell
aws ec2 describe-instances
aws rds describe-db-instances
aws elbv2 describe-load-balancers
\`\`\`

---

## 🔑 Credenciales y Endpoint

Para que el CLI hable con **floci** en lugar de con AWS real, necesitas dos cosas:

1. **Credenciales** — floci acepta cualquier valor; usamos \`test\`/\`test\`.
2. **Endpoint** — \`--endpoint-url http://localhost:4566\` en cada comando (o configuración de perfil).

En PowerShell, la forma más cómoda para el curso es definir variables de entorno:

\`\`\`powershell
$env:AWS_ACCESS_KEY_ID='test'
$env:AWS_SECRET_ACCESS_KEY='test'
$env:AWS_DEFAULT_REGION='us-east-1'
\`\`\`

---

## 🧪 Primeras pruebas

Probemos que el emulador responde a los servicios del curso:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 ec2 describe-vpcs
aws --endpoint-url=http://localhost:4566 rds describe-db-instances
aws --endpoint-url=http://localhost:4566 elbv2 describe-load-balancers
\`\`\`

Si todo funciona verás JSON con las listas (pueden estar vacías, es normal). Si algo fallara, el error dirá que no puede conectar al endpoint.

---

## ⚙️ Perfil opcional (config)

Para no escribir \`--endpoint-url\` cada vez, puedes crear un perfil en \`~/.aws/config\`:

\`\`\`ini
[profile floci]
region = us-east-1
aws_access_key_id = test
aws_secret_access_key = test
\`\`\`

Y usar \`--profile floci\`. Pero en los labs del curso usaremos las variables de entorno + \`--endpoint-url\` explícito, porque así se ve claro **a dónde** apunta cada comando.

---

## ⚠️ PowerShell: un detalle importante

Cuando ejecutes comandos del AWS CLI en PowerShell, **el texto de error va por stderr**. Si en tus scripts pones \`$ErrorActionPreference = "Stop"\` y capturas \`2>&1\`, PowerShell 5.1 puede convertirlo en un error terminante y romper el script.

**Regla práctica para los scripts del curso:**

\`\`\`powershell
$ErrorActionPreference = 'Continue'   # no "Stop"
aws ... 2>&1 | Out-Host
if ($LASTEXITCODE -ne 0) { Write-Host "FALLÓ: $LASTEXITCODE" }
\`\`\`

---

## ✅ Resumen

- El AWS CLI es la herramienta oficial para gestionar AWS desde terminal.
- floci acepta credenciales arbitrarias (\`test\`/\`test\`) y región \`us-east-1\`.
- Usa \`--endpoint-url=http://localhost:4566\` para apuntar al emulador.
- Verifica con \`describe-*\` que los servicios respondan.
- En PowerShell, evita \`$ErrorActionPreference='Stop'\` al capturar stderr de procesos nativos.`,
        exercise: {
          title: `Conecta tu CLI`,
          prompt: `Configura las variables de entorno test/test/us-east-1 y ejecuta los tres comandos describe (vpcs, db-instances, load-balancers). Copia el resultado JSON y coméntalo.`
        }
      }
    ]
  }
);
