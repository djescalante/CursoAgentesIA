/**
 * Módulo 1 — Fundamentos
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
    {
      id: `modulo-1`,
      number: 1,
      icon: `🧠`,
      title: `Fundamentos`,
      subtitle: `¿Qué son los Agentes y Skills?`,
      description: `Comprende los conceptos fundamentales: qué son los agentes IA, qué son los skills, y por qué usar Markdown para definirlos.`,
      difficulty: `beginner`,
      lessons: [
        {
          id: `1-1`,
          title: `¿Qué son los Agentes y Skills?`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 1.1 - ¿Qué son los Agentes y Skills?

## 🤖 Introducción

En el mundo del desarrollo con IA, los **agentes** y **skills** son conceptos fundamentales que permiten crear sistemas inteligentes modulares y reutilizables.

---

## ¿Qué es un Agente?

Un **agente** es una entidad de IA con:

- **Personalidad definida**: Cómo se comporta y comunica
- **Conocimiento especializado**: Dominio o área de expertise
- **Capacidades**: Qué puede hacer (usar herramientas, acceder APIs, etc.)
- **Contexto**: Memoria y comprensión de la conversación
- **Objetivos**: Propósito específico para el que fue diseñado

### Ejemplo Conceptual

\`\`\`
Agente: "Asistente de Código Python"
- Personalidad: Técnico, preciso, educativo
- Conocimiento: Python, mejores prácticas, debugging
- Capacidades: Analizar código, sugerir mejoras, detectar bugs
- Contexto: Recuerda el código que estás trabajando
- Objetivo: Ayudar a escribir mejor código Python
\`\`\`

---

## ¿Qué es un Skill?

Un **skill** es una habilidad específica que un agente puede usar. Es como una "herramienta" o "capacidad" modular.

### Características de un Skill

- **Especializado**: Hace una cosa muy bien
- **Reutilizable**: Puede usarse en múltiples agentes
- **Activable**: Se activa bajo condiciones específicas
- **Documentado**: Incluye cuándo y cómo usarse

### Ejemplo Conceptual

\`\`\`
Skill: "Análisis de CSV"
- Propósito: Leer y analizar archivos CSV
- Trigger: Usuario menciona archivo .csv o datos tabulares
- Capacidades: 
  - Leer archivos CSV
  - Detectar estructura
  - Generar estadísticas básicas
  - Visualizar datos
\`\`\`

---

## 🔄 Diferencias Clave

| Aspecto | Agente | Skill |
|---------|--------|-------|
| **Alcance** | Sistema completo | Capacidad específica |
| **Personalidad** | Tiene personalidad propia | Neutral, es una herramienta |
| **Autonomía** | Toma decisiones | Ejecuta cuando se le llama |
| **Composición** | Usa múltiples skills | Es atómico (no usa otros skills) |
| **Contexto** | Mantiene conversación | Ejecución puntual |

---

## 🏗️ Arquitectura Típica

\`\`\`
┌─────────────────────────────────────┐
│           AGENTE                    │
│  (Personalidad + Contexto)          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ Skill A │  │ Skill B │          │
│  │ (CSV)   │  │ (JSON)  │          │
│  └─────────┘  └─────────┘          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ Skill C │  │ Skill D │          │
│  │ (API)   │  │ (Email) │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
\`\`\`

---

## 💼 Casos de Uso Reales

### Agentes en Acción

1. **Agente de Desarrollo**: Ayuda a escribir, revisar y optimizar código
2. **Agente de Análisis**: Procesa datos y genera insights
3. **Agente de Documentación**: Crea y mantiene documentación técnica
4. **Agente de Testing**: Genera y ejecuta pruebas automatizadas

### Skills en Acción

1. **Skill de Lectura de PDF**: Extrae texto de documentos PDF
2. **Skill de API REST**: Realiza llamadas a APIs externas
3. **Skill de Web Scraping**: Obtiene datos de páginas web
4. **Skill de Visualización**: Genera gráficos y dashboards

---

## 🎯 Por Qué Usar Archivos Markdown

Los archivos \`.md\` son perfectos para definir agentes y skills porque:

1. **Legibles**: Humanos pueden leerlos y entenderlos fácilmente
2. **Versionables**: Funcionan perfectamente con Git
3. **Estructurados**: Markdown permite organizar información claramente
4. **Estándar**: Ampliamente adoptado en la industria
5. **Flexibles**: Fáciles de editar con cualquier editor de texto

---

## 📝 Ejemplo Básico de Archivo de Agente

\`\`\`markdown
# Agente: Asistente de Python

## Descripción
Soy un experto en Python que ayuda a desarrolladores a escribir código limpio y eficiente.

## Personalidad
- Técnico pero amigable
- Explico conceptos complejos de forma simple
- Siempre sugiero mejores prácticas

## Capacidades
- Análisis de código Python
- Sugerencias de optimización
- Detección de bugs comunes
- Explicación de errores

## Reglas
- Siempre proporciono ejemplos de código
- Explico el "por qué" detrás de cada sugerencia
- Priorizo la legibilidad sobre la complejidad
\`\`\`

---

## 📝 Ejemplo Básico de Archivo de Skill

\`\`\`markdown
# SKILL: Análisis de CSV

## Descripción
Analiza archivos CSV y proporciona estadísticas básicas.

## Triggers
- Usuario menciona archivo .csv
- Usuario pide "analizar datos"
- Usuario sube un archivo CSV

## Procedimiento
1. Leer el archivo CSV
2. Detectar columnas y tipos de datos
3. Calcular estadísticas básicas (media, mediana, moda)
4. Identificar valores faltantes
5. Generar resumen

## Salida
- Tabla con estadísticas
- Reporte de calidad de datos
- Sugerencias de limpieza (si es necesario)
\`\`\`

---

## 🚀 Próximos Pasos

Ahora que entiendes los conceptos básicos:

1. ✅ Sabes qué es un agente
2. ✅ Sabes qué es un skill
3. ✅ Entiendes sus diferencias
4. ✅ Conoces casos de uso reales

👉 **Siguiente**: [1.2 - Por qué usar archivos Markdown](#1-2)

---

## 💡 Ejercicio Práctico

**Piensa en tu trabajo diario**: 

- ¿Qué agente te sería útil?
- ¿Qué skills necesitaría ese agente?
- Escribe una descripción de 3-5 líneas de cada uno

*Ejemplo*:
\`\`\`
Agente: Organizador de Emails
Skills necesarios:
- Clasificar emails por importancia
- Extraer fechas y crear eventos
- Resumir conversaciones largas
\`\`\`

---

**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐ Principiante
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

**Piensa en tu trabajo diario**: 

- ¿Qué agente te sería útil?
- ¿Qué skills necesitaría ese agente?
- Escribe una descripción de 3-5 líneas de cada uno

*Ejemplo*:
\`\`\`
Agente: Organizador de Emails
Skills necesarios:
- Clasificar emails por importancia
- Extraer fechas y crear eventos
- Resumir conversaciones largas
\`\`\``,
            type: `text`
          }
        },
        {
          id: `1-2`,
          title: `Por qué usar archivos Markdown`,
          time: `10 min`,
          difficulty: `⭐ Principiante`,
          content: `# 1.2 - Por qué usar archivos Markdown

## 🎯 Introducción

En el ecosistema de la Inteligencia Artificial, existen múltiples formas de configurar agentes y skills (JSON, YAML, bases de datos). Sin embargo, en este curso nos centramos en el uso de archivos **Markdown (.md)** como la práctica estándar y más efectiva. ¿Por qué esta decisión?

---

## 📖 1. Legibilidad Humana y de IA

Los Modelos de Lenguaje Grande (LLMs) como Claude, GPT o Gemini han sido entrenados extensamente con documentación en Markdown procedente de repositorios de código (GitHub) y foros.

- **Para la IA**: Entienden de manera natural la jerarquía de los encabezados (\`#\`, \`##\`), listas, bloques de código e iteraciones.
- **Para humanos**: Es un texto limpio y fácil de leer sin el ruido visual de etiquetas complejas o llaves de cierre como en JSON/XML.

---

## 🛠️ 2. Estructura y Flexibilidad

Markdown proporciona el equilibrio perfecto entre texto libre y estructura estricta:

- Puedes escribir un bloque largo de contexto conversacional (texto libre) y enseguida un bloque muy estructurado de ejemplos de uso usando tablas o listas.
- **Metadatos (Frontmatter)**: Puedes combinar YAML dentro del Markdown (generalmente al inicio) para variables estrictas como versión, autor o estado, y dejar el cuerpo para las instrucciones.

---

## 🔄 3. Control de Versiones (Git)

Al ser archivos de texto plano:
- Son 100% compatibles con herramientas como Git.
- Permiten hacer **pull requests** y ver diferencias (diffs) claras línea por línea cuando modificas el comportamiento de un agente.
- Facilitan el trabajo colaborativo en equipos de ingeniería de prompts.

---

## 🧩 4. Independencia de Plataforma

Un archivo Markdown no te ata a ninguna plataforma específica. 
Si el día de mañana decides cambiar el framework de orquestación de tu agente (por ejemplo, pasar de LangChain a AutoGen o a una solución propia), el núcleo de tu agente (el prompt base, las instrucciones, la personalidad) permanece seguro y portable en tu archivo \`.md\`.

---

## 🚀 Próximos Pasos

Ahora que entiendes por qué hemos elegido Markdown como nuestro vehículo principal para definir el comportamiento:

1. ✅ Entiendes las ventajas del texto plano estructurado.
2. ✅ Comprendes el valor de tener prompts en control de versiones.
3. ✅ Conoces la sinergia entre LLMs y el formato Markdown.

👉 **Siguiente**: [1.3 - Anatomía de un archivo de configuración](#1-3)

---

## 💡 Ejercicio Práctico

**Analiza un caso de uso**:

- Abre tu editor de texto favorito (como VS Code o bloc de notas).
- Intenta escribir cómo le darías instrucciones a una IA usando un formato JSON rígido vs un formato Markdown libre pero estructurado.
- ¿Cuál te resulta más natural para describir un comportamiento abstracto como la "empatía" o la "precisión"?

---

**Tiempo estimado**: 10 minutos  
**Dificultad**: ⭐ Principiante
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

**Analiza un caso de uso**:

- Abre tu editor de texto favorito (como VS Code o bloc de notas).
- Intenta escribir cómo le darías instrucciones a una IA usando un formato JSON rígido vs un formato Markdown libre pero estructurado.
- ¿Cuál te resulta más natural para describir un comportamiento abstracto como la "empatía" o la "precisión"?`,
            type: `text`
          }
        },
        {
          id: `1-3`,
          title: `Anatomía de un archivo de configuración`,
          time: `10 min`,
          difficulty: `⭐ Principiante`,
          content: `# 1.3 - Anatomía de un archivo de configuración

## 🔬 Introducción

Ya sabemos qué son los agentes/skills y por qué utilizamos Markdown para configurarlos. Ahora, analizaremos la estructura interna ("anatomía") típica que debe tener un buen archivo de definición para garantizar que el LLM lo interprete correctamente.

---

## 🏗️ Estructura General

Un archivo \`.md\` de definición de agente o skill suele dividirse en secciones jerárquicas lógicas. A continuación, desglosamos las partes más comunes:

### 1. Frontmatter o Metadatos (Opcional pero recomendado)
Suele ir al principio del archivo para definir variables de sistema.

\`\`\`yaml
---
name: "Analista de Datos"
version: "1.0.0"
type: "agent"
---
\`\`\`

### 2. Título y Propósito General (\`#\`)
Define de inmediato quién es el agente o qué hace el skill.

\`\`\`markdown
# Analista de Datos Senior

Eres un experto en el análisis de bases de datos que ayuda a extraer conclusiones de valor de tablas complejas.
\`\`\`

### 3. Personalidad y Tono (\`##\`)
Solo aplica para agentes. Le da instrucciones al modelo sobre su comportamiento, forma de hablar e idioma.

\`\`\`markdown
## 🎭 Tono de Comunicación
- Profesional pero accesible.
- Respondes en español neutro.
- Evitas jergas innecesarias si el usuario no tiene nivel técnico avanzado.
\`\`\`

### 4. Reglas Estrictas / Constraints (\`##\`)
Límites que el agente o skill NUNCA debe cruzar. Muy importante para la seguridad.

\`\`\`markdown
## ⚠️ Reglas
- NUNCA compartas credenciales, contraseñas o tokens.
- SIEMPRE verifica que el archivo exista antes de intentar leerlo.
- NUNCA inventes (alucines) datos si no los encuentras en el texto proporcionado.
\`\`\`

### 5. Capabilities / Habilidades (\`##\`)
En el caso de un agente, se listan los skills a los que tiene acceso. En el caso de un skill, se listan los pasos de su algoritmo interno.

\`\`\`markdown
## ⚙️ Procedimiento
1. Lee el input del usuario.
2. Identifica las columnas clave.
3. Filtra los valores nulos.
4. Devuelve un formato JSON estructurado.
\`\`\`

### 6. Ejemplos (Few-Shot Prompting) (\`##\`)
La mejor forma de que una IA entienda qué quieres es dándole ejemplos concretos de Entrada/Salida.

\`\`\`markdown
## 📝 Ejemplos

**Entrada:** "Resume estas ventas"
**Salida:** 
- Total: \$1500
- Promedio: \$300
\`\`\`

---

## 📌 Mejores Prácticas

- **Usa Markdown Semántico**: Los encabezados H1 (\`#\`) y H2 (\`##\`) le dan mucho contexto a la IA sobre la jerarquía del documento.
- **Sé Directo**: No uses frases ambiguas. En lugar de *"Trata de ser amable"*, usa *"Debes ser amable en cada respuesta"*.
- **Orden de Importancia**: Coloca las directivas más críticas al principio y al final del archivo. La IA suele prestar más atención a los extremos del prompt.

---

## 🚀 Próximos Pasos

Con esto concluimos el **Módulo 1: Fundamentos**.

1. ✅ Conoces los conceptos básicos.
2. ✅ Entiendes las ventajas del Markdown.
3. ✅ Te familiarizaste con la estructura interna.

👉 **Siguiente paso**: Es hora de crear algo real. Pasa al [Módulo 2: Creando tu Primer Agente](#2-1)

---

## 💡 Ejercicio Práctico

**Dibuja tu propio esqueleto**:

- Crea un archivo vacío llamado \`mi-primer-agente.md\`.
- Agrega únicamente los títulos (\`## Personalidad\`, \`## Reglas\`, \`## Ejemplos\`) que creas que va a necesitar.
- No lo llenes aún, simplemente visualiza la estructura que usaremos en el próximo módulo.

---

**Tiempo estimado**: 10 minutos  
**Dificultad**: ⭐ Principiante
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

**Dibuja tu propio esqueleto**:

- Crea un archivo vacío llamado \`mi-primer-agente.md\`.
- Agrega únicamente los títulos (\`## Personalidad\`, \`## Reglas\`, \`## Ejemplos\`) que creas que va a necesitar.
- No lo llenes aún, simplemente visualiza la estructura que usaremos en el próximo módulo.`,
            type: `text`
          }
        }
      ]
    }
);
