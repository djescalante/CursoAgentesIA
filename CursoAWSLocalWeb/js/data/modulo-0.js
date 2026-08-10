/**
 * Módulo 0 — Inicio y Mapa de Ruta
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-0`,
    number: 0,
    icon: `🧭`,
    title: `Inicio y Mapa de Ruta`,
    subtitle: `Tu punto de partida`,
    description: `El mapa de ruta completo del curso: qué vas a construir, qué herramientas vas a usar y cómo está organizado cada módulo.`,
    difficulty: `beginner`,
    lessons: [
      {
        id: `0-1`,
        title: `Mapa de Ruta del Aprendizaje`,
        time: `15 min`,
        difficulty: `🟢 Principiante`,
        content: `# 0.1 - Mapa de Ruta del Aprendizaje

## ☁️ Introducción al Curso

¡Bienvenido al **Curso Práctico de AWS Local con Floci**! En este curso vas a aprender a construir **infraestructura de AWS real** — pero corriendo **100% en tu propia máquina**, sin cuenta, sin tarjeta de crédito y sin gastos.

La idea central es simple:

> **Vas a levantar un emulador de AWS (floci) en Docker y apuntar las mismas herramientas profesionales — AWS CLI, CloudFormation y Terraform — contra él.**

Todo lo que aprendas aquí es **directamente aplicable a AWS real**: los servicios, los comandos y los archivos de infraestructura son los mismos. Solo cambia el endpoint al que apuntas.

---

## 🗺️ Qué Vas a Construir

A lo largo del curso vas a levantar esta arquitectura, tres veces (una por cada herramienta de automatización):

- Una **VPC** con subnets públicas y privadas en **2 zonas de disponibilidad (AZ)**.
- **2 servidores web (EC2)** que sirven una página cada uno (Servidor A y Servidor B).
- **2 bases de datos (RDS)**: una PostgreSQL y una MySQL.
- Un **Application Load Balancer (ALB)** que reparte el tráfico entre los dos servidores.

El resultado final: al visitar una única URL, el balanceador te muestra alternando **Servidor A** y **Servidor B** — balanceo de carga real.

---

## 📅 Estructura del Curso (9 Módulos · 28 Lecciones)

| Módulo | Tema | Lecciones |
|---|---|---|
| 0 | Inicio y Mapa de Ruta | 2 |
| 1 | Fundamentos de AWS y floci | 3 |
| 2 | Redes: VPC, Subnets y Rutas | 4 |
| 3 | EC2: Tus Servidores | 3 |
| 4 | RDS: Tus Bases de Datos | 3 |
| 5 | ALB: Balanceo de Carga | 3 |
| 6 | IaC con AWS CLI | 3 |
| 7 | IaC con CloudFormation | 4 |
| 8 | IaC con Terraform | 3 |

**Total: 28 lecciones**, con ejercicios prácticos, plantillas y ejemplos reales que ya fueron verificados contra un emulador en funcionamiento.

---

## 🛠️ Herramientas del Curso

1. **Docker Desktop** — para ejecutar el contenedor de floci.
2. **floci** — el emulador de AWS (gratis, open source, corre en local).
3. **AWS CLI v2** — la herramienta de línea de comandos de AWS.
4. **CloudFormation** — infraestructura como código (AWS nativa).
5. **Terraform** — infraestructura como código (multinube).

---

## 🎓 Niveles y Dificultad

Cada lección tiene un nivel:
- 🟢 **Principiante** — conceptos y primeros pasos.
- 🟡 **Intermedio** — construcción y configuración.
- 🔴 **Avanzado** — automatización y optimización.

No hace falta ser experto en AWS ni en la nube: **el curso empieza desde cero** y va subiendo de nivel de forma progresiva.

---

## ✅ Objetivos al Terminar

- Levantar un emulador de AWS local en menos de 5 minutos.
- Crear y entender redes AWS (VPC, subnets, rutas, security groups).
- Lanzar servidores y bases de datos con un comando.
- Balancear tráfico entre servidores con un ALB.
- Automatizar toda la infraestructura con **3 herramientas distintas** y compararlas.

¡Empecemos! 🚀`,
        exercise: {
          title: `Tu primer objetivo`,
          prompt: `Escribe con tus palabras: ¿qué infraestructura vas a construir en este curso y qué herramienta de automatización te llama más la atención (CLI, CloudFormation o Terraform) y por qué?`
        }
      },
      {
        id: `0-2`,
        title: `Tu Entorno de Trabajo`,
        time: `15 min`,
        difficulty: `🟢 Principiante`,
        content: `# 0.2 - Tu Entorno de Trabajo

## 🖥️ Windows Real y Linux en floci

Un punto importante del curso: el objetivo es que aprendas AWS **de verdad**, y eso incluye servidores **Windows Server** — que son la norma en entornos empresariales.

El plan de trabajo es el siguiente:

- **En tu PC real (Windows):** instalas y ejecutas Docker, AWS CLI, Terraform y el emulador floci. Todo se hace desde PowerShell.
- **En floci (Linux):** el emulador lanza contenedores Linux (Amazon Linux 2023) que actúan como tus servidores EC2.

Es decir: **gestionas desde Windows, y la infraestructura emulada corre en Linux dentro de floci.** En el curso, cuando veas "servidor web", piensa en Amazon Linux; cuando veas conceptos como Remote Desktop o security groups, recuerda que en AWS real esos servidores podrían ser Windows.

---

## 📁 Estructura de Carpetas del Curso

Te recomiendo crear una carpeta de trabajo con esta estructura (es la que usamos en los labs):

\`\`\`text
curso-aws-local/
├── labs/
│   ├── floci/            # docker-compose para levantar el emulador
│   ├── userdata/         # scripts de bootstrap de los servidores
│   ├── awscli/           # scripts PowerShell del lab con AWS CLI
│   ├── cloudformation/   # template YAML + scripts del lab CFN
│   └── terraform/        # archivos .tf del lab Terraform
\`\`\`

---

## ⚙️ Requisitos Mínimos

| Requisito | Versión | Nota |
|---|---|---|
| Windows 10/11 | — | PowerShell 5.1+ |
| Docker Desktop | 4.x | WSL2 recomendado |
| AWS CLI | v2 | se configura contra localhost |
| Terraform | 1.5+ | se usa en el Módulo 8 |
| floci | latest | imagen de Docker |

> 💡 **Nota:** floci usa el mismo puerto (4566) que LocalStack, así que la configuración de credenciales y endpoints que verás es compatible con ambos emuladores.

---

## 🧪 ¿Por Qué Emular en Local?

- **Costo cero:** practicas todo lo que quieras sin factura.
- **Velocidad:** las instancias se lanzan en segundos, no en minutos.
- **Seguridad:** no tocas recursos reales ni expones nada.
- **Reproducible:** cada lab es un script o un archivo que puedes borrar y volver a crear cuantas veces quieras.

---

## ✅ Resumen

En esta lección viste el mapa del curso y el entorno de trabajo. En el Módulo 1 vas a instalar Docker, arrancar floci y configurar el AWS CLI para que hable con tu AWS local.`,
        exercise: {
          title: `Prepárate`,
          prompt: `Lista los programas que ya tienes instalados en tu máquina (Docker Desktop, AWS CLI, Terraform, Git) y cuáles te faltan por instalar según la tabla de requisitos.`
        }
      }
    ]
  }
);
