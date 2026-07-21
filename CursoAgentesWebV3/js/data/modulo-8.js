/**
 * Módulo 8 — Integración IDEs
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
    {
      id: `modulo-8`,
      number: 8,
      icon: `💻`,
      title: `Integración IDEs`,
      subtitle: `OpenCode y Antigravity`,
      description: `Aprende a integrar agentes y skills en entornos de desarrollo modernos mediante archivos de configuración.`,
      difficulty: `advanced`,
      lessons: [
        {
          id: `8-1`,
          title: `Integración con IDEs Agenticos (OpenCode y Antigravity)`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# Módulo 8: Integración con IDEs Agenticos (OpenCode y Antigravity)

## 01. Introducción a OpenCode y Antigravity

A lo largo de los módulos anteriores, has aprendido la filosofía central de este curso: **Los agentes y las skills se definen en archivos Markdown (\`.md\`)**. Has visto cómo construir un motor propio para leer estos archivos y ejecutar tareas automatizadas, orquestando sistemas multi-agente complejos.

Sin embargo, en el mundo real del desarrollo de software, no siempre necesitas construir el motor desde cero. Existen entornos de desarrollo (IDEs) que ya traen motores de IA integrados y que **comparten exactamente la misma filosofía**.

Aquí es donde entran en juego **OpenCode** y **Antigravity**.

### ¿Qué es OpenCode?

**OpenCode** es un agente de programación de **código abierto** que vive principalmente en tu terminal (con interfaz TUI y aplicación de escritorio). A diferencia de un simple chat de IA, OpenCode entiende el contexto completo de tu proyecto: lee tus archivos, edita código, ejecuta comandos y planifica tareas de forma autónoma. Además, es **agnóstico de modelo**: puedes usarlo con Claude, GPT, Gemini o modelos locales.

### ¿Qué es Antigravity?

**Antigravity** es el IDE agéntico de **Google**, lanzado a finales de 2025 junto a Gemini 3. Es un fork de VS Code (heredero de Windsurf) que integra un gestor de agentes (Mission Control), un editor familiar y un navegador controlado por el agente para verificar lo que construye. Sus agentes no solo sugieren código: planifican, ejecutan y documentan su trabajo mediante *artefactos* verificables.

> ⚠️ **Ojo**: aunque se mencionan juntos con frecuencia, **OpenCode y Antigravity son proyectos independientes** — el primero es open-source y comunitario; el segundo, un producto de Google. No forman parte el uno del otro.

Ambos comparten una característica fundamental que enlaza perfectamente con todo lo aprendido en este curso: **su comportamiento, restricciones y capacidades extendidas se controlan mediante archivos Markdown**.

### La Sinergia con lo Aprendido en el Curso

Cuando usas estos entornos, no estás ante una "caja negra" inmodificable. Al igual que en tus prácticas anteriores con tu propio orquestador, puedes dictar cómo debe comportarse el agente simplemente dejando caer archivos \`.md\` en la raíz de tu proyecto.

- ¿Quieres que el agente siempre use una arquitectura específica? **Se lo dices en un Markdown**.
- ¿Quieres que tenga una herramienta nueva (Skill) para compilar tu proyecto de una manera especial? **Le creas un \`SKILL.md\`**.

En las siguientes lecciones de este módulo, aprenderás cómo adaptar las técnicas de creación de agentes y skills basadas en Markdown (que ya conoces) para configurar, potenciar y dominar estos entornos en tus propios proyectos de desarrollo.
`,
          exercise: null
        },
        {
          id: `8-2`,
          title: `Archivos de Configuración para IDEs Agenticos`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 02. Archivos de Configuración para IDEs Agenticos

Para dominar a un agente de IA como **Antigravity** dentro de tu IDE, necesitas comunicarte con él en su idioma nativo: **Archivos Markdown**. A diferencia de los modelos de chat donde escribes un prompt efímero, en el desarrollo asistido por IA, los *prompts* se convierten en archivos persistentes en tu repositorio.

## 1. El archivo \`specs.md\` (Especificaciones del Proyecto)

¿Recuerdas cómo en el Módulo 3 nuestro orquestador leía los archivos de la carpeta \`specs/\` antes de actuar? Los IDEs agenticos funcionan igual.

El archivo \`specs.md\` (a veces llamado \`PRD.md\` o Product Requirements Document) se coloca en la raíz de tu proyecto o en una carpeta específica. 

**Propósito:**
Proveer a Antigravity con el contexto general de lo que estás intentando construir. En lugar de explicarle en el chat "estoy haciendo una app de tareas en Python que usa SQLite", simplemente lo dejas documentado en este archivo.

**Ejemplo de un \`specs.md\` ideal para Antigravity:**
\`\`\`markdown
# Sistema de Gestión de Tareas

## Objetivo
Desarrollar una API RESTful en Python usando FastAPI para gestionar tareas pendientes.

## Arquitectura
- **Backend:** FastAPI (Python 3.10+)
- **Base de Datos:** SQLite con SQLAlchemy
- **Autenticación:** JWT Tokens

## Reglas de Negocio
- Una tarea no puede eliminarse, solo marcarse como "inactiva".
- Las tareas deben tener un campo \`criticidad\` (Alta, Media, Baja).

## Endpoints Esperados
- \`GET /tasks\`
- \`POST /tasks\`
- \`PUT /tasks/{id}\`
\`\`\`
Cuando le pidas a Antigravity: *"Crea el endpoint de actualización de tareas"*, el agente automáticamente leerá este archivo y sabrá qué stack tecnológico usar y qué reglas de negocio aplicar, sin necesidad de que se lo repitas.

## 2. El archivo \`AGENTS.md\` (Reglas y Comportamiento)

Así como en los módulos anteriores aprendimos que un agente tiene una sección de \`Personality\` y \`Rules\` en su archivo de definición, los agentes modernos buscan un archivo especial para definir sus reglas globales: \`AGENTS.md\` (ubicado en la **raíz de tu proyecto**, donde la mayoría de agentes lo leen automáticamente).

**Propósito:**
Dictar el estilo de código, las restricciones de seguridad, el tono de comunicación y las reglas universales del agente para ese proyecto en particular.

**Ejemplo de un \`AGENTS.md\`:**
\`\`\`markdown
# Reglas Globales del Proyecto

## Estilo de Código
- Usa \`flake8\` para mantener el estándar PEP-8.
- Siempre agrega Type Hints (tipado estático) a las funciones en Python.
- Los docstrings deben estar en formato Google.

## Restricciones Críticas
- **NUNCA** modifiques la estructura de la base de datos sin preguntar primero al usuario.
- **NUNCA** utilices librerías experimentales que no estén en \`requirements.txt\`.

## Comportamiento del Agente
- Sé extremadamente conciso. Muestra el código directamente sin largas explicaciones.
- Si una prueba (Test) falla, intenta solucionarla automáticamente hasta un máximo de 3 intentos antes de pedir ayuda.
\`\`\`

## 3. Otros archivos comunes (\`.clinerules\`)

Dependiendo de la extensión específica que uses (como Cline, RooCode, etc.), el nombre de los archivos puede variar. Un estándar emergente es \`.clinerules\`, que cumple la misma función que \`AGENTS.md\`.

Lo importante es **el concepto subyacente**: Transformar tu conocimiento sobre el proyecto en instrucciones persistentes legibles por la IA, asegurando que tus agentes siempre tengan el contexto correcto sin depender de tu memoria a corto plazo.

---

En la próxima lección veremos cómo llevar esto al siguiente nivel: Inyectando "Skills" o habilidades personalizadas en Antigravity para que pueda hacer cosas que por defecto no sabría hacer.
`,
          exercise: null
        },
        {
          id: `8-3`,
          title: `Desarrollo e Inyección de Skills en Antigravity`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 03. Desarrollo e Inyección de Skills en Antigravity

En el Módulo 3, aprendimos qué son las "Skills": piezas atómicas de funcionalidad que un agente puede invocar cuando se cumplen ciertas condiciones. 

Con **Antigravity**, este concepto se lleva a la práctica de una manera muy concreta. Puedes extender lo que Antigravity sabe hacer inyectando tus propios "Skills" en la raíz de tu proyecto o de forma global en tu IDE.

## Anatomía de un SKILL para Antigravity

Antigravity y sistemas similares buscan carpetas de Skills dentro del directorio de customizaciones (por ejemplo, \`.agents/skills/\`). Cada Skill es una subcarpeta que **debe contener** un archivo llamado \`SKILL.md\`.

El archivo \`SKILL.md\` se compone de dos partes esenciales:
1. **Frontmatter (YAML):** Define el nombre y la descripción para que Antigravity sepa *cuándo* usar la herramienta.
2. **Body (Markdown):** Contiene las instrucciones paso a paso que el agente debe seguir una vez que decide usar el skill.

### Ejemplo de un \`SKILL.md\`

Imagina que quieres que Antigravity tenga una habilidad especial para auditar la seguridad de tus contenedores Docker usando un script que tú escribiste.

Estructura de archivos:
\`\`\`
.agents/
└── skills/
    └── auditor_docker/
        ├── SKILL.md
        └── scripts/
            └── audit_security.py
\`\`\`

Contenido de \`.agents/skills/auditor_docker/SKILL.md\`:
\`\`\`markdown
---
name: auditor-seguridad-docker
description: Utiliza este skill cuando el usuario pida revisar la seguridad de un Dockerfile o de contenedores en ejecución.
---

# Instrucciones de Auditoría Docker

Has sido invocado para ejecutar la auditoría de seguridad. Sigue estos pasos de forma estricta:

1. Revisa si existe un \`Dockerfile\` en el directorio actual.
2. Ejecuta el script de auditoría ubicado en \`.agents/skills/auditor_docker/scripts/audit_security.py\` pasando el Dockerfile como argumento.
3. Lee el output del script (estará en formato JSON).
4. Genera un reporte en Markdown (crea un archivo llamado \`reporte_auditoria.md\`) usando los resultados.
5. Usa Alertas de Github (\`> [!WARNING]\`) para destacar vulnerabilidades graves.
\`\`\`

## Diferencia con los Agentes Tradicionales

En los primeros módulos del curso, tú construías el bucle (loop) en Python que leía los Markdowns y determinaba qué hacer (Ingeniería de Loops).

Con **OpenCode y Antigravity**, el IDE se encarga del bucle. Tu trabajo se centra puramente en **Ingeniería de Prompts y Diseño de Sistemas**: escribes el Markdown (\`AGENTS.md\`, \`specs.md\`, \`SKILL.md\`) y el agente Antigravity hace el resto, interpretando tus instrucciones al vuelo, ejecutando comandos en consola y editando los archivos reales de tu proyecto.

## Resumen del Módulo

Has aprendido cómo el paradigma "Agentes como Código" no es solo un ejercicio académico, sino el estándar de la industria hoy en día en IDEs modernos. Ya sea que orquestes tus propios agentes con scripts Python, o utilices herramientas de grado empresarial como **OpenCode** y **Antigravity**, el secreto siempre radica en saber comunicarte claramente a través de archivos **Markdown**.
`,
          exercise: null
        },
        {
          id: `8-4`,
          title: `El Ecosistema Real: specs.md y AGENTS.md`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 04. El Ecosistema Real: specs.md y AGENTS.md

A lo largo del Módulo 8 hemos hablado de la importancia de los archivos Markdown para gobernar a nuestros agentes. Esto no es solo teoría; allá afuera, la industria ya está adoptando estos conceptos como estándares oficiales para el desarrollo nativo con IA.

En esta lección exploraremos dos grandes iniciativas de código abierto: el estándar **AGENTS.md** y el framework **specs.md**. Veremos qué son, qué hacen, cómo se instalan y cómo se usan en proyectos reales.

---

## 1. El estándar \`AGENTS.md\`

### ¿Qué es y qué hace?
[AGENTS.md](https://agents.md) es una iniciativa de código abierto que propone un formato estándar, abierto y sencillo para guiar a cualquier agente de programación (como GitHub Copilot, Claude Code, Cursor, Antigravity, etc.).

Piensa en él como un \`README.md\`, pero diseñado exclusivamente para que lo lean las IAs. Su función principal es **proveer un contexto predecible**. Cuando un agente entra a tu proyecto, lo primero que busca es este archivo para entender las reglas del juego.

### ¿Cómo se "instala"?
Dado que es un estándar (un formato de texto) y no un programa, **no requiere instalación**. Funciona universalmente en casi cualquier IDE moderno impulsado por IA.

Para adoptarlo en tu proyecto, simplemente:
1. Abre la raíz de tu proyecto.
2. Crea un archivo llamado \`AGENTS.md\` (o \`.github/AGENTS.md\` si prefieres ocultarlo).

### ¿Cómo se usa?
Dentro de tu \`AGENTS.md\`, escribes instrucciones en Markdown natural. El agente las absorberá antes de realizar cualquier tarea.

**Ejemplo de uso (Plantilla básica):**
\`\`\`markdown
# Instrucciones para Agentes de IA (AGENTS.md)

## Entorno de Desarrollo
- Este es un proyecto de React con TypeScript usando Vite.
- Usa siempre \`pnpm\` en lugar de \`npm\` o \`yarn\`.
- Para levantar el entorno, ejecuta \`pnpm run dev\`.

## Reglas de Arquitectura
- Todos los componentes nuevos deben ir en la carpeta \`src/components\`.
- Utiliza Tailwind CSS para los estilos. No crees archivos \`.css\` independientes.
- Favorece los componentes funcionales de React sobre las clases.

## Restricciones
- Nunca modifiques los archivos dentro de la carpeta \`dist/\`.
- Antes de proponer un cambio en producción, corre \`pnpm test\`.
\`\`\`

Cuando le pidas a tu IDE "crea un botón", el agente revisará este archivo, sabrá que debe usar \`pnpm\`, creará el botón en \`src/components\` y usará Tailwind CSS sin que se lo tengas que pedir de forma explícita.

---

## 2. El framework \`specs.md\`

### ¿Qué es y qué hace?
[specs.md](https://specs.md) es mucho más que un archivo; es un **Framework de desarrollo nativo con IA** creado por Fabriqa. Mientras que \`AGENTS.md\` es pasivo (da instrucciones), \`specs.md\` es **activo**: incluye herramientas de línea de comandos (CLI) que orquestan el trabajo de múltiples IAs (como Claude Code, Gemini CLI, Codex) unificándolas en un solo flujo de trabajo.

Su función es usar archivos Markdown como "Especificaciones ejecutables". Escribes tu plan en un archivo, y el motor de \`specs.md\` se encarga de llamar a los agentes correctos para que ejecuten el código.

### ¿Cómo se instala?
Dado que este sí es un framework de software (basado en Node.js), necesitas instalarlo mediante tu terminal.

**Requisitos previos:**
Tener instalado Node.js en tu sistema.

**Instalación vía npx (recomendada):**
\`\`\`bash
npx specsmd@latest install
\`\`\`

El instalador te preguntará qué flujo quieres usar (**Simple**, **FIRE** o **AI-DLC**) y preparará los agentes para tu herramienta (Claude Code, Cursor, Antigravity, OpenCode, Gemini CLI...).

### ¿Cómo se usa?
El ciclo de trabajo con \`specs.md\` se basa en su "Flujo FIRE" (un modelo iterativo guiado por especificaciones).

**Paso 1: Define tu especificación**
Crea un archivo llamado \`feature-login.spec.md\` en tu proyecto:
\`\`\`markdown
# Funcionalidad de Login
Objetivo: Implementar un login usando Firebase Auth.

## Tareas
- [ ] Conectar Firebase Auth en \`src/lib/firebase.js\`.
- [ ] Crear un formulario de Login en \`src/pages/Login.jsx\`.
- [ ] Redirigir al usuario a \`/dashboard\` tras el login.
\`\`\`

**Paso 2: Invoca al agente del flujo**
Con el framework instalado, invoca al agente de tu flujo desde tu herramienta (Claude Code, Cursor, Antigravity, OpenCode...) y apúntale a tu especificación.

**Paso 3: El framework toma el control**
El agente leerá el Markdown, entenderá la arquitectura y ejecutará las tareas pendientes, marcando los \`[ ]\` como \`[x]\` en el archivo conforme avance, ¡tal como lo hacía nuestro orquestador en los módulos 3 y 4!

---

## Conclusión

El uso de **AGENTS.md** y **specs.md** demuestra que lo que has aprendido en este curso es la vanguardia de la ingeniería de software. Controlar a la inteligencia artificial mediante **Markdown** es hoy en día la forma más profesional, predecible y escalable de desarrollar software.
`,
          exercise: null
        }
      ]
    }
);
