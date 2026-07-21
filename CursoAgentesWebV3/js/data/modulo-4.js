/**
 * Módulo 4 — Integración y Workflows
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
    {
      id: `modulo-4`,
      number: 4,
      icon: `🔗`,
      title: `Integración y Workflows`,
      subtitle: `Conecta agentes y skills`,
      description: `Aprende a encadenar múltiples agentes, coordinar llamadas a herramientas y gestionar la memoria compartida del sistema.`,
      difficulty: `intermediate`,
      lessons: [
        {
          id: `4-1`,
          title: `Combinando Múltiples Skills`,
          time: `90 min`,
          difficulty: `⭐⭐⭐ Intermedio-Avanzado`,
          content: `# 4.1 - Combinando Múltiples Skills

> Cómo crear agentes versátiles con múltiples capacidades

---

## 🎯 Objetivos

Aprenderás a:
- Combinar skills sin conflictos
- Orquestar múltiples capacidades
- Crear flujos de trabajo complejos
- Manejar ambigüedad entre skills

---

## 🧩 ¿Por Qué Combinar Skills?

**Un solo skill** = Agente limitado
**Múltiples skills** = Agente versátil y útil

### Ejemplo Real:

**Agente con 1 skill**:
\`\`\`
User: "Analyze this data and create a report"
Agent: "I can analyze the data, but I can't create reports"
\`\`\`

**Agente con múltiples skills**:
\`\`\`
User: "Analyze this data and create a report"
Agent: "Perfect! I'll:
1. Analyze the data (Data Analyzer skill)
2. Generate insights (Insight Generator skill)
3. Create a formatted report (Report Writer skill)

Let me start..."
\`\`\`

---

## 🏗️ Arquitectura de Skills Múltiples

### Pattern 1: Secuencial

Skills se ejecutan uno después del otro:

\`\`\`
Input → Skill A → Output A → Skill B → Output B → Final Result
\`\`\`

**Ejemplo**: Análisis de Datos + Reporte
\`\`\`markdown
# AGENT: Data Reporter

## Available Skills
1. CSV Analyzer - Analiza archivos CSV
2. Insight Generator - Identifica patrones
3. Report Writer - Crea reportes formateados

## Workflow
User uploads CSV → 
  Skill 1 (CSV Analyzer) analyzes data →
    Skill 2 (Insight Generator) finds patterns →
      Skill 3 (Report Writer) creates report →
        Return final report to user
\`\`\`

---

### Pattern 2: Paralelo

Múltiples skills se ejecutan simultáneamente:

\`\`\`
Input → ┌─ Skill A → Output A ─┐
        ├─ Skill B → Output B ─┤→ Combined Result
        └─ Skill C → Output C ─┘
\`\`\`

**Ejemplo**: Análisis Multi-Perspectiva
\`\`\`markdown
# AGENT: Business Analyst

## Available Skills
1. Financial Analyzer - Perspectiva financiera
2. Customer Analyzer - Perspectiva de clientes
3. Operational Analyzer - Perspectiva operacional

## Workflow
User asks: "Analyze Q1 performance" →
  → Skill 1 analyzes finances
  → Skill 2 analyzes customers    } All at once
  → Skill 3 analyzes operations
    → Combine all perspectives → Comprehensive report
\`\`\`

---

### Pattern 3: Condicional

Skills se activan según condiciones:

\`\`\`
Input → Condition Check → 
  IF condition A → Skill A
  IF condition B → Skill B
  IF condition C → Skill C
\`\`\`

**Ejemplo**: Support Bot Adaptativo
\`\`\`markdown
# AGENT: Smart Support

## Skills
1. FAQ Searcher - Para preguntas comunes
2. Order Tracker - Para status de órdenes
3. Technical Troubleshooter - Para problemas técnicos
4. Escalation Manager - Para casos complejos

## Routing Logic
\`\`\`
IF user_query contains "order" OR "tracking":
    USE Order Tracker skill

ELSE IF user_query matches FAQ topics:
    USE FAQ Searcher skill

ELSE IF user_query describes technical problem:
    USE Technical Troubleshooter skill

ELSE IF user seems frustrated OR issue unresolved:
    USE Escalation Manager skill
\`\`\`
\`\`\`

---

## 📝 Implementación: Agente Multi-Skill

### Ejemplo Completo: Content Creator Assistant

\`\`\`markdown
# AGENT: Content Creator Assistant

## Identity
You are ContentBot, a versatile assistant for content creators.
You help with ideation, writing, editing, and optimization.

## Available Skills

### 1. Idea Generator
**When to use**: User needs content ideas
**Triggers**: "idea", "topic", "what should I write about"
**Output**: List of creative ideas with rationales

### 2. Outline Creator
**When to use**: User needs structure for content
**Triggers**: "outline", "structure", "organize"
**Output**: Hierarchical outline with main points

### 3. Draft Writer
**When to use**: User needs content written
**Triggers**: "write", "draft", "create content"
**Output**: Full draft based on outline or topic

### 4. Editor
**When to use**: User has content to improve
**Triggers**: "edit", "improve", "review", content provided
**Output**: Edited version with explanations

### 5. SEO Optimizer
**When to use**: User wants SEO improvements
**Triggers**: "SEO", "optimize", "keywords", "search"
**Output**: Optimized content + SEO analysis

## Skill Orchestration

### Single Skill Requests
User: "Give me 5 blog post ideas about AI"
→ USE Idea Generator only

User: "Edit this paragraph: [text]"
→ USE Editor only

### Multi-Skill Workflows

#### Workflow 1: Idea to Published
User: "I need a blog post about productivity hacks"

Step 1: Idea Generator
  → Generate specific angle: "7 Science-Backed Productivity Hacks"

Step 2: Outline Creator
  → Create structure with intro, 7 sections, conclusion

Step 3: Draft Writer
  → Write full blog post from outline

Step 4: Editor
  → Polish and improve draft

Step 5: SEO Optimizer
  → Add keywords, optimize headers, meta description

Result: Complete, optimized blog post

#### Workflow 2: Improvement Pipeline
User: "I wrote this article but it needs help: [article]"

Step 1: Editor (Analysis Phase)
  → Identify issues: structure, clarity, flow

Step 2: Outline Creator
  → Suggest better structure if needed

Step 3: Editor (Revision Phase)
  → Rewrite with improvements

Step 4: SEO Optimizer
  → Enhance for search if requested

Result: Significantly improved article

## Skill Selection Logic

\`\`\`
DETERMINE user intent:
  NEEDS_IDEAS → Idea Generator
  NEEDS_STRUCTURE → Outline Creator
  NEEDS_CONTENT → Check if outline exists
    YES → Draft Writer with outline
    NO → Ask: "Would you like me to create an outline first?"
  HAS_CONTENT → Check what user wants
    IMPROVEMENT → Editor
    SEO → SEO Optimizer
    COMPLETE_OVERHAUL → Multi-skill workflow

IF multiple skills needed:
  ASK user: "I can help with this using [Skill A], [Skill B], and [Skill C].
             Would you like me to:
             1. Do all at once (I'll guide you through)
             2. Start with [first step] only
             3. Something else?"
\`\`\`

## Example Interactions

### Example 1: Simple Request
User: "Can you help me brainstorm blog topics about meditation?"

Agent: "Absolutely! I'll use my Idea Generator to create some compelling 
topics for you.

BLOG TOPIC IDEAS: Meditation

1. **"5-Minute Meditation Techniques for Busy Professionals"**
   Why: Targets common barrier (time), specific audience

2. **"Science-Backed Benefits of Daily Meditation"**
   Why: Evidence-based, builds credibility

3. **"Meditation Myths Debunked: What Actually Works"**
   Why: Addresses misconceptions, engaging angle

[5 more ideas...]

Which idea resonates with you? Or would you like me to create an 
outline for any of these?"

### Example 2: Complex Request
User: "I want to write about remote work but I'm not sure where to start"

Agent: "Let me help you create a complete blog post! Here's my plan:

1. First, I'll generate specific angles on remote work
2. You pick your favorite
3. I'll create a detailed outline
4. Then write the full draft
5. Polish it
6. Optimize for SEO

Sound good? Let's start with ideas!

REMOTE WORK ANGLES:
[generates ideas...]

Which direction interests you most?"

### Example 3: Editing Request
User: "Can you improve this intro paragraph: [text]"

Agent: "I'll edit this for you. Let me analyze it first:

**Current Issues**:
- Hook could be stronger
- Second sentence is unclear
- Missing smooth transition to main point

**Edited Version**:
[improved text]

**What I changed**:
- Opened with intriguing question (stronger hook)
- Simplified complex sentence
- Added transitional phrase

Want me to edit more of your article?"
\`\`\`

---

## 🔧 Manejo de Conflictos Entre Skills

### Problema: Skills Superpuestos

\`\`\`markdown
Skill A: "General Editor" - Edits any text
Skill B: "Technical Writer" - Writes/edits technical content
Skill C: "Marketing Copy Editor" - Edits marketing content

User: "Edit this technical blog post"
→ Which skill to use? A, B, or both?
\`\`\`

### Solución: Jerarquía Clara

\`\`\`markdown
## Skill Selection Priority

WHEN user provides content to edit:
  1. CHECK content type
     - Technical content → Technical Writer (Skill B)
     - Marketing copy → Marketing Copy Editor (Skill C)
     - General/unclear → General Editor (Skill A)

  2. IF multiple skills apply:
     USE most specific skill first
     THEN offer general editing as follow-up

  3. IF uncertain:
     ASK user: "Is this technical documentation or general content?"
\`\`\`

---

### Problema: Skills Interdependientes

\`\`\`markdown
Skill A: "Data Analyzer" - Analyzes data
Skill B: "Report Writer" - Creates reports

Problem: Report Writer needs Data Analyzer's output
\`\`\`

### Solución: Pipeline Explícito

\`\`\`markdown
## Skill Dependencies

### Report Writer Skill
**Dependencies**: Requires data analysis first

**Workflow**:
\`\`\`
IF user requests report AND no analysis yet:
  1. INFORM: "To create a report, I need to analyze the data first"
  2. ASK: "May I proceed with analysis?"
  3. IF yes:
     a. RUN Data Analyzer
     b. THEN run Report Writer
  4. IF no:
     EXPLAIN: "I'll need the analysis to create an accurate report"
\`\`\`

**Example**:
User: "Create a report on this CSV"

Agent: "To create a comprehensive report, I'll first analyze your data 
to identify key insights. Then I'll format everything into a report.

Step 1: Analyzing data...
[runs Data Analyzer]

Found: [key metrics]

Step 2: Creating report...
[runs Report Writer]

Here's your report: [report]"
\`\`\`

---

## 📊 Skill Combination Matrix

| Situation | Skills Used | Order |
|-----------|------------|-------|
| "Analyze CSV and report" | Analyzer + Reporter | Sequential |
| "Compare these datasets" | Analyzer (2x) + Comparator | Parallel → Sequential |
| "Help me write content" | Ideator OR Outliner OR Writer | Conditional |
| "Review this article" | Editor + SEO Optimizer | Sequential (optional 2nd) |
| "Fix my code" | Debugger → Reviewer | Conditional chain |

---

## 💡 Best Practices

### ✅ Do's

1. **Comunicar el Plan**
\`\`\`markdown
"I'll use [Skill A] to [purpose], then [Skill B] to [purpose]"
\`\`\`

2. **Mostrar Progreso**
\`\`\`markdown
"Step 1/3: Analyzing... ✓
 Step 2/3: Generating insights... ✓
 Step 3/3: Creating report... ✓"
\`\`\`

3. **Ofrecer Opciones**
\`\`\`markdown
"I can:
1. Just analyze (quick)
2. Analyze + create report (complete)
Which would help most?"
\`\`\`

4. **Validar Entre Skills**
\`\`\`markdown
"Analysis complete. Before I create the report, does this summary 
look correct? [summary]"
\`\`\`

### ❌ Don'ts

1. **No ejecutar skills silenciosamente**
\`\`\`markdown
❌ [Runs 5 skills without telling user]
✅ "I'll use these 3 skills: [list]. Starting now..."
\`\`\`

2. **No asumir necesidades**
\`\`\`markdown
❌ User asks for analysis → Agent generates full report unsolicited
✅ "Analysis done. Want me to create a report too?"
\`\`\`

3. **No encadenar sin validación**
\`\`\`markdown
❌ Skill A → Skill B → Skill C automáticamente
✅ Skill A → "Look good?" → Skill B → "Continue?" → Skill C
\`\`\`

---

## 🎓 Ejercicio Práctico

Diseña un agente con 4+ skills que se complementen:

**Tema**: Agente de Fitness

**Skills a incluir**:
1. Workout Planner
2. Meal Plan Creator
3. Progress Tracker
4. Motivation Coach

**Tu tarea**:
1. Define cuándo usar cada skill
2. Diseña 2 workflows multi-skill
3. Maneja al menos 1 conflicto potencial
4. Escribe 3 ejemplos de interacción

---

## 📋 Checklist de Skills Múltiples

\`\`\`markdown
□ Cada skill tiene triggers claros y distintos
□ Hay jerarquía para skills superpuestos
□ Workflows multi-skill están documentados
□ Agente comunica qué skill está usando
□ Hay validación entre pasos cuando necesario
□ Skills pueden usarse independientemente
□ Ejemplos muestran uso individual Y combinado
□ Manejo de dependencies está claro
\`\`\`

---

## 🚀 Próximos Pasos

Ahora que sabes combinar skills:

1. Toma un agente existente
2. Agrégale 2-3 skills compatibles
3. Define workflows multi-skill
4. Prueba con escenarios complejos

👉 **Siguiente**: [4.2 - Cadenas de Agentes](#4-2)

---

**Tiempo estimado**: 90 minutos  
**Dificultad**: ⭐⭐⭐ Intermedio-Avanzado  
**Importancia**: 🔥🔥🔥 ALTA - Esto hace agentes realmente útiles
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

Diseña un agente con 4+ skills que se complementen:

**Tema**: Agente de Fitness

**Skills a incluir**:
1. Workout Planner
2. Meal Plan Creator
3. Progress Tracker
4. Motivation Coach

**Tu tarea**:
1. Define cuándo usar cada skill
2. Diseña 2 workflows multi-skill
3. Maneja al menos 1 conflicto potencial
4. Escribe 3 ejemplos de interacción`,
            type: `text`
          }
        },
        {
          id: `4-2`,
          title: `Cadenas de Agentes (Chaining)`,
          time: `25 min`,
          difficulty: `⭐⭐⭐ Avanzado`,
          content: `# 4.2 - Cadenas de Agentes (Chaining)

## 🎯 Objetivo

Aprender a conectar múltiples Agentes Inteligentes de forma secuencial, donde el resultado de uno se convierte en el insumo (input) del siguiente, para resolver tareas altamente complejas que ningún agente individual podría manejar por sí solo.

---

## 🔗 ¿Qué es una Cadena de Agentes?

En la automatización con IA, una **cadena (chain)** es un patrón de diseño donde varios agentes colaboran pasando información de uno a otro. Cada agente es un **especialista** que realiza una tarea concreta y luego transfiere su resultado al siguiente eslabón de la cadena.

Imagina una línea de ensamblaje en una fábrica de autos. El trabajador de chasis no ensambla el motor ni pinta el vehículo; simplemente termina su tarea y se la pasa al siguiente especialista. La calidad del auto final depende de que cada especialista haga su parte a la perfección.

### 🤔 ¿Por qué NO usar un solo agente para todo?

Un único agente que intenta hacer todo sufre de varios problemas:

| Problema | Descripción |
|---|---|
| **Distracción cognitiva** | El modelo "piensa" en demasiadas cosas a la vez, perdiendo precisión |
| **Sesgos de confirmación** | El mismo agente que crea algo también lo revisa, tendiendo a ignorar sus propios errores |
| **Contexto contaminado** | El proceso de "borrador" ensucia la ventana de contexto del resultado final |
| **Difícil de depurar** | Si falla, no sabes en qué etapa ocurrió el error |
| **No escalable** | Para mejorarlo, debes reescribir todo |

### ✅ ¿Por qué SÍ encadenar agentes?

1. **Calidad superior:** Un agente que solo hace "Review" siempre será más crítico que el agente que escribió el contenido originalmente. La separación de responsabilidades elimina el sesgo.
2. **Contexto limpio:** El agente final recibe únicamente el output pulido del anterior, sin el "ruido" ni los pasos intermedios que usó el primer agente.
3. **Escalabilidad:** Puedes reemplazar el "Agente Redactor" por una versión mejorada sin afectar al "Agente Traductor" que va después.
4. **Depuración sencilla:** Si la cadena falla, puedes ver exactamente qué agente produjo el output incorrecto.
5. **Especialización profunda:** Cada agente puede tener un prompt perfectamente optimizado para UNA sola tarea.

---

## 🏗️ Anatomía de una Cadena Típica

Una cadena clásica suele seguir el patrón **Planificación → Ejecución → Revisión**.

### Ejemplo: Cadena de Creación de Software

\`\`\`mermaid
graph LR
    A[Agente Arquitecto] -->|Plan de Diseño| B(Agente Programador)
    B -->|Código Inicial| C{Agente Tester}
    C -->|Bugs Encontrados| B
    C -->|Código Limpio| D[Agente Documentador]
\`\`\`

1. **Agente Arquitecto**: Recibe el prompt del humano. Diseña la estructura de carpetas y el diagrama UML. Pasa su resultado.
2. **Agente Programador**: Recibe la estructura. Escribe el código en Python.
3. **Agente Tester**: Revisa el código. Si falla, hace un bucle de vuelta al programador. Si pasa, lo envía adelante.
4. **Agente Documentador**: Recibe el código limpio y genera un \`README.md\`.

### Tipos de flujo en una cadena

\`\`\`
Flujo Lineal (más común):
A → B → C → D → Output

Flujo con Bucle de Retroalimentación:
A → B → C → (¿OK?) --No--> B
                  --Sí--> D → Output

Flujo con Ramificación:
A → B → ¿Tipo de tarea?
          ├─ Si es X → Agente X → Output
          ├─ Si es Y → Agente Y → Output
          └─ Si es Z → Agente Z → Output
\`\`\`

---

## 📝 Implementando Cadenas con Archivos Markdown

Cuando trabajamos con orquestadores (como LangChain, AutoGen, CrewAI o sistemas custom), los archivos \`.md\` de cada agente deben indicar claramente qué formato esperan recibir y qué formato deben entregar para que el acople sea perfecto.

### Agente 1 (El que envía)
En su archivo de configuración, añadimos:

\`\`\`markdown
## Salida Obligatoria (Output Format)
Debes retornar ÚNICAMENTE un bloque de código JSON con los datos extraídos, sin texto introductorio ni conclusiones.

Ejemplo de salida correcta:
\`\`\`json
{
  "producto": "Laptop Pro X",
  "precio": 1299.99,
  "disponibilidad": true,
  "categoria": "electronica"
}
\`\`\`
\`\`\`

### Agente 2 (El que recibe)
En su archivo de configuración, añadimos:

\`\`\`markdown
## Entrada Esperada (Input Format)
Recibirás un bloque JSON con datos estructurados de ventas. Tu trabajo es leer esos datos y generar un reporte narrativo en español.

Ejemplo de entrada:
\`\`\`json
{
  "producto": "Laptop Pro X",
  "precio": 1299.99,
  "disponibilidad": true,
  "categoria": "electronica"
}
\`\`\`

A partir de este JSON, genera un párrafo descriptivo profesional.
\`\`\`

---

## 🧪 Ejemplos Completos de Cadenas Reales

### Ejemplo 1: Cadena de Análisis y Reporte de Ventas

**Caso de uso:** El área comercial necesita un reporte semanal automatizado de ventas.

\`\`\`
Input del Usuario:
"Genera el reporte de ventas de esta semana con los datos del archivo."

Cadena:
[Agente Extractor] → [Agente Analítico] → [Agente Redactor] → [Agente Formateador]
\`\`\`

**Agente Extractor** (\`extractor-ventas.md\`):
\`\`\`markdown
# AGENT: Extractor de Datos de Ventas

## Rol
Eres un especialista en extracción de datos. Tu única tarea es leer el archivo
de ventas crudo y convertirlo en un JSON estructurado y limpio.

## Output Obligatorio
Retorna SOLO el siguiente JSON sin ningún texto adicional:
\`\`\`json
{
  "semana": "YYYY-WXX",
  "total_ventas": 0.00,
  "num_transacciones": 0,
  "producto_top": "nombre",
  "regiones": [{"nombre": "region", "ventas": 0.00}]
}
\`\`\`
\`\`\`

**Agente Analítico** (\`analista-ventas.md\`):
\`\`\`markdown
# AGENT: Analista de Tendencias

## Input Esperado
Recibirás un JSON de ventas estructurado del Agente Extractor.

## Tarea
Analiza los datos y genera un JSON de insights con:
- Porcentaje de crecimiento vs semana anterior
- Top 3 productos
- Región con mayor caída
- Alerta si alguna métrica está fuera del rango normal

## Output
\`\`\`json
{
  "crecimiento_pct": 0.0,
  "alertas": [],
  "top_productos": [],
  "insights": []
}
\`\`\`
\`\`\`

---

### Ejemplo 2: Cadena de Generación de Contenido para Blog

\`\`\`
Input: Tema del artículo ("Beneficios del trabajo remoto")

[Agente Investigador] → [Agente Redactor] → [Agente SEO] → [Agente Editor Final]
      ↓                       ↓                  ↓                  ↓
 Datos y fuentes         Borrador 800w       Título + meta       Artículo pulido
\`\`\`

Esta cadena es especialmente poderosa porque:
- El **Investigador** no escribe, solo recopila hechos verificables.
- El **Redactor** no investiga, solo crea narrativa fluida.
- El **SEO** no reescribe, solo optimiza palabras clave y metadatos.
- El **Editor** no inventa, solo pule el estilo y la coherencia.

---

### Ejemplo 3: Cadena con Bucle de Calidad (QA Loop)

Este patrón es ideal cuando la calidad es crítica y no puedes permitirte errores.

\`\`\`
[Agente Generador] → [Agente Validador]
        ↑                    |
        |                    | ¿Validación OK?
        |                    |
        |-- No, hay errores --'
        |
        '-- Sí → [Agente Publicador]
\`\`\`

**Configuración del Agente Validador:**
\`\`\`markdown
# AGENT: Validador de Calidad

## Entrada
Recibirás el output del Agente Generador.

## Proceso
1. Verifica que el output cumple TODOS los criterios de calidad
2. Puntúa de 0 a 100
3. Si la puntuación es < 85, devuelve el output al Generador con feedback específico
4. Si la puntuación es >= 85, aprueba y pasa al Publicador

## Output
\`\`\`json
{
  "puntuacion": 0,
  "aprobado": false,
  "feedback": "Lista de mejoras específicas necesarias",
  "iteracion_actual": 1,
  "max_iteraciones": 3
}
\`\`\`

## IMPORTANTE
- Nunca superes las 3 iteraciones (max_iterations: 3)
- Si llegas a 3 iteraciones sin aprobar, pasa con puntuación actual y una nota de advertencia
\`\`\`

---

## ⚙️ Protocolo de Comunicación Entre Agentes

Para que la cadena funcione sin "teléfono roto", cada agente debe usar un protocolo estándar de entrada/salida.

### Estructura JSON Recomendada

\`\`\`json
{
  "task_id": "tarea_001",
  "version": "1.0",
  "from_agent": "agente-redactor",
  "to_agent": "agente-editor",
  "timestamp": "2026-05-31T10:00:00Z",
  "context": {
    "query_original": "Escribe un artículo sobre IA",
    "instrucciones_adicionales": "Tono formal, máximo 800 palabras"
  },
  "payload": {
    "contenido": "El texto generado va aquí...",
    "metadata": {
      "palabras": 750,
      "idioma": "es"
    }
  },
  "estado": "completado",
  "notas_para_siguiente": "El artículo necesita revisión de título SEO"
}
\`\`\`

---

## ⚠️ Retos Comunes en el Chaining

### 1. El Teléfono Roto (Degradación del Contexto)
Si el Agente 1 omite un dato crucial, el Agente 3 nunca lo sabrá y fallará silenciosamente o producirá un output incorrecto.

**Solución:** Incluye siempre el \`query_original\` del usuario en el JSON que se pasa entre agentes. Así cualquier agente puede consultar el objetivo original si lo necesita.

\`\`\`markdown
## Regla de Oro
Todo agente de la cadena DEBE recibir y repasar el "query_original" del usuario
para no perder de vista el objetivo final.
\`\`\`

### 2. Ciclos Infinitos (Infinite Loops)
Cuando dos agentes están encadenados en modo de retroalimentación (Crítico → Redactor → Crítico), pueden quedarse debatiendo por siempre.

**Solución:** Establece un límite máximo de iteraciones en el archivo de configuración:
\`\`\`markdown
## Control de Iteraciones
- max_iterations: 3
- Si se alcanza el límite, retornar el mejor resultado obtenido con una nota de advertencia
- Nunca bloquear el flujo completo
\`\`\`

### 3. Formato Incompatible (Handshake Fallido)
El Agente 1 entrega un formato que el Agente 2 no espera.

**Solución:** Define un "contrato de interfaz" claro en ambos archivos \`.md\`:
\`\`\`markdown
# Agente A - Output Format
Siempre retornar JSON válido con las claves: {producto, precio, stock}

# Agente B - Input Format
Esperando JSON con las claves obligatorias: {producto, precio, stock}
Si falta alguna clave, generar un error descriptivo y detener el proceso.
\`\`\`

### 4. Pérdida de Desempeño en Cadenas Largas
Las cadenas muy largas (más de 5 agentes) pueden volverse lentas y costosas.

**Soluciones:**
- Usa agentes en paralelo cuando las tareas sean independientes entre sí.
- Considera si dos agentes consecutivos pueden fusionarse en uno sin perder calidad.
- Cachea los resultados de agentes "lentos" cuando el input no cambia.

---

## 🚀 Próximos Pasos

Dominar las cadenas secuenciales abre la puerta a arquitecturas mucho más robustas. Pero, ¿cómo logramos que durante esta larga cadena el sistema no olvide las preferencias del usuario o el objetivo original de la tarea?

👉 **Siguiente**: [4.3 - Manejo de contexto y memoria](#4-3)

---

## 💡 Ejercicio Práctico

**Diseña tu propia cadena**:
1. Piensa en un proceso tedioso de tu empresa o de tu vida diaria (ej. Buscar vuelos, comparar precios, planear un viaje, escribir un artículo para un blog).
2. Divídelo en 3-4 "estaciones" de trabajo.
3. Ponle un nombre y rol a cada agente.
4. Define:
   - Qué entrega el Agente 1 al Agente 2
   - Qué entrega el Agente 2 al Agente 3
   - Cuál es el output final que recibe el usuario
5. Identifica posibles puntos de fallo y cómo los manejarías.

**Plantilla para tu ejercicio:**
\`\`\`
NOMBRE DE MI CADENA: _______________

Agente 1: [Nombre] - [Rol]
  Input: (lo que recibe del usuario)
  Output: (lo que entrega al siguiente)

Agente 2: [Nombre] - [Rol]
  Input: (lo que recibe del Agente 1)
  Output: (lo que entrega al siguiente)

Agente 3: [Nombre] - [Rol]
  Input: (lo que recibe del Agente 2)
  Output: (resultado final para el usuario)

Posibles fallos y soluciones:
  - Riesgo 1: ___  → Solución: ___
  - Riesgo 2: ___  → Solución: ___
\`\`\`

---

**Tiempo estimado**: 25 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

**Diseña tu propia cadena**:
1. Piensa en un proceso tedioso de tu empresa o de tu vida diaria (ej. Buscar vuelos, comparar precios, planear un viaje, escribir un artículo para un blog).
2. Divídelo en 3-4 "estaciones" de trabajo.
3. Ponle un nombre y rol a cada agente.
4. Define:
   - Qué entrega el Agente 1 al Agente 2
   - Qué entrega el Agente 2 al Agente 3
   - Cuál es el output final que recibe el usuario
5. Identifica posibles puntos de fallo y cómo los manejarías.

**Plantilla para tu ejercicio:**
\`\`\`
NOMBRE DE MI CADENA: _______________

Agente 1: [Nombre] - [Rol]
  Input: (lo que recibe del usuario)
  Output: (lo que entrega al siguiente)

Agente 2: [Nombre] - [Rol]
  Input: (lo que recibe del Agente 1)
  Output: (lo que entrega al siguiente)

Agente 3: [Nombre] - [Rol]
  Input: (lo que recibe del Agente 2)
  Output: (resultado final para el usuario)

Posibles fallos y soluciones:
  - Riesgo 1: ___  → Solución: ___
  - Riesgo 2: ___  → Solución: ___
\`\`\``,
            type: `text`
          }
        },
        {
          id: `4-3`,
          title: `Manejo de Contexto y Memoria`,
          time: `15 min`,
          difficulty: `⭐⭐⭐ Avanzado`,
          content: `# 4.3 - Manejo de Contexto y Memoria

## 🎯 Objetivo

Comprender cómo dotar a nuestros agentes de la capacidad de "recordar" información vital a corto y largo plazo sin saturar los límites de tokens del Modelo de Lenguaje.

---

## 🧠 El Problema de la Amnesia en la IA

Por defecto, los Modelos de Lenguaje (LLMs) son **apátridas (stateless)**. Esto significa que cada mensaje que les envías es tratado de forma completamente aislada. Si le dices "Mi nombre es Ana" y en el siguiente mensaje le preguntas "¿Cómo me llamo?", el modelo no lo sabrá a menos que le vuelvas a enviar el historial de la conversación.

Si le enviamos el historial completo cada vez, rápidamente superaremos la "Ventana de Contexto" (Context Window) y el costo de la API se disparará.

---

## 🛠️ Tipos de Memoria para Agentes

Existen tres formas principales de gestionar la memoria, y podemos configurarlas en nuestros archivos Markdown.

### 1. Memoria de Corto Plazo (Historial Reciente)
Consiste en pasar únicamente los últimos *N* mensajes intercambiados (por ejemplo, los últimos 5 mensajes). Es útil para mantener el hilo de una conversación casual.

*En tu archivo Markdown de configuración puedes dictar una regla sobre esto:*
\`\`\`markdown
## Reglas de Memoria
- Al responder, haz referencia siempre a los datos del mensaje inmediatamente anterior para mantener fluidez.
\`\`\`

### 2. Memoria de Trabajo (Resumen de Contexto)
En lugar de recordar palabra por palabra, el sistema mantiene un resumen actualizado. Cada vez que hay nueva información, un pequeño "Skill resumidor" reescribe el estado actual.

*Puedes definir un agente que haga esto:*
\`\`\`markdown
## Capacidades
- Eres el encargado de leer el resumen antiguo y el nuevo turno de conversación. 
- Debes emitir un nuevo resumen consolidado, borrando información irrelevante y conservando fechas y nombres clave.
\`\`\`

### 3. Memoria de Largo Plazo (RAG - Retrieval-Augmented Generation)
Esta es la técnica más avanzada. Consiste en guardar datos en una base de datos externa (como una base de datos vectorial) e inyectar al agente solo los fragmentos relevantes cuando hace una búsqueda.

*Cómo documentar esto en el Markdown de tu agente principal:*
\`\`\`markdown
## Habilidades (Skills)
- Tienes acceso al skill \`Consultar_Base_Conocimiento\`. Úsalo SIEMPRE que el usuario te pregunte sobre políticas de la empresa, historia o datos de clientes pasados, antes de intentar responder con tus datos pre-entrenados.
\`\`\`

---

## 🏗️ Implementando Variables de Contexto (Context Injection)

A menudo, no necesitas bases de datos complejas. Puedes simplemente usar "placeholders" en tu prompt de Markdown, que tu código Python/Node llenará antes de enviarlo a la IA.

### Ejemplo de Archivo de Configuración Dinámico

\`\`\`markdown
# Agente: Asistente de Ventas

## Contexto del Cliente Actual
**Nombre:** {{CLIENT_NAME}}
**Última compra:** {{LAST_PURCHASE_DATE}}
**Nivel de queja:** {{COMPLAINT_LEVEL}}

## Instrucciones
Hola Asistente. Estás hablando con {{CLIENT_NAME}}. Su última compra fue el {{LAST_PURCHASE_DATE}}. 
Si el nivel de queja es ALTO, debes usar un tono extremadamente empático y ofrecer un reembolso.
\`\`\`

Al utilizar esta plantilla, tu sistema simplemente reemplaza las variables \`{{...}}\` antes de enviarle el Markdown al modelo. ¡Felicidades, le acabas de dar memoria instantánea a tu agente!

---

## 🛠️ Caso Práctico: Memoria Persistente con Engram y MCP

En el desarrollo profesional de agentes (por ejemplo, usando frameworks como **Claude Code**, **Cursor**, **Windsurf** o el CLI de Gemini), las variables de contexto dinámicas a menudo se quedan cortas. Los agentes necesitan recordar decisiones arquitectónicas, reglas de nombrado de variables y soluciones a bugs anteriores a lo largo de múltiples sesiones.

Aquí es donde entra **Engram**, un sistema de memoria persistente de código abierto creado para agentes de IA.

### ¿Qué es Engram?
**Engram** es un binario autocontenido escrito en Go que actúa como un cerebro local para tus agentes. Se comunica mediante el protocolo **MCP (Model Context Protocol)** y almacena la información de forma estructurada en un archivo local SQLite con indexación de búsqueda de texto completo (FTS5).

\`\`\`
[ Agente (Claude Code/Cursor/VS Code) ]
                 ↓ (Protocolo MCP)
          [ Engram (Go) ]
                 ↓
  [ SQLite + FTS5 (~/.engram/engram.db) ]
\`\`\`

### ¿Por qué utilizar Engram y MCP?
* **Cero dependencias pesadas**: No requiere Docker, Python, Node ni bases de datos vectoriales complejas. Es un solo archivo binario con una base de datos local rápida.
* **Persistencia entre sesiones**: El agente puede guardar observaciones sobre el código y cargarlas en el futuro, resolviendo el problema de la "amnesia" cuando cierras la terminal o el editor.
* **Sincronización con Git (Git Sync)**: Permite empaquetar memorias en pequeños archivos comprimidos para subirlos al repositorio de Git, permitiendo que otros desarrolladores (y sus agentes) compartan la misma base de conocimiento.
* **Integración con SDD**: Engram se complementa perfectamente con metodologías como **Spec-Driven Development (SDD)**, permitiendo a los agentes tener un contexto permanente sobre las especificaciones funcionales y arquitectónicas del proyecto.
* **TUI (Terminal UI)**: Posee una interfaz visual interactiva en la terminal para que puedas leer, buscar y gestionar lo que el agente ha recordado.

### Configuración Rápida en 3 Pasos

#### Paso 1: Instalación
Si usas macOS/Linux (Homebrew):
\`\`\`bash
brew install gentleman-programming/tap/engram
\`\`\`
Si usas Windows o deseas instalarlo manualmente, puedes descargar el binario directamente desde los releases de GitHub y agregarlo a tu variable de entorno \`PATH\`.

#### Paso 2: Conectar el Servidor MCP al Agente
Una vez instalado, configúralo en tu editor o agente favorito:

* **Claude Code**:
  \`\`\`bash
  claude plugin marketplace add Gentleman-Programming/engram && claude plugin install engram
  \`\`\`
* **VS Code (Copilot u otros)**:
  Añade el servidor MCP a la configuración:
  \`\`\`json
  "mcpServers": {
    "engram": {
      "command": "engram",
      "args": ["mcp"]
    }
  }
  \`\`\`
* **Cursor / Windsurf**:
  Ve a Configuración > MCP > Agregar nuevo servidor:
  * **Nombre**: engram
  * **Tipo**: stdio
  * **Comando**: \`engram\` (o la ruta absoluta a tu ejecutable \`engram.exe\` en Windows)
  * **Argumentos**: \`mcp\`

#### Paso 3: Flujo de Trabajo en Acción (What/Why/Where)
Cuando el agente tiene configurado Engram, gana acceso a herramientas como \`mem_save\` y \`mem_search\`. El flujo es automático:

1. **Guardar memoria**: Le dices al agente: *"Recuerda que a partir de ahora todas las funciones de base de datos deben usar camelCase y estar en \`/src/db\`"*.
2. El agente llamará a \`mem_save\` y creará una entrada con la estructura:
   * **Título**: DB function naming convention
   * **Categoría**: architecture
   * **Qué/Por qué/Dónde/Aprendido**: Detalles del estándar acordado.
3. **Recuperación**: En tu próxima sesión de desarrollo (incluso días después), puedes preguntarle al agente: *"¿Qué convención acordamos para las funciones de base de datos?"*. El agente buscará en Engram mediante \`mem_search\` y responderá con precisión sin haber alucinado o consultado prompts extensos.

*💡 **Integración con SDD**: Si utilizas la metodología **SDD (Spec-Driven Development)**, Engram es fundamental para que tus agentes mantengan el contexto de las especificaciones y reglas del proyecto de forma persistente.*

Puedes ver e interactuar con estas memorias ejecutando en tu terminal:
\`\`\`bash
engram tui
\`\`\`

---

## 🚀 Próximos Pasos

Dominar el contexto significa que tus agentes ya no sufrirán de amnesia ni alucinarán inventando datos para llenar los vacíos. Con agentes especializados, skills y ahora memoria, estás listo para armar un ecosistema completo.

👉 **Siguiente**: [4.4 - Proyecto: Sistema multi-agente](#4-4)

---

## 💡 Ejercicio Práctico

1. Abre el archivo de tu Agente Asistente Personal del Módulo 2.
2. Agrega una sección llamada \`## Contexto Actual\`.
3. Introduce 3 o 4 variables dinámicas (usando la sintaxis \`{{VARIABLE}}\`) que el agente necesitaría saber sobre ti todos los días para ser verdaderamente útil (ej. \`{{HORA_ACTUAL}}\`, \`{{TAREAS_PENDIENTES}}\`).

---

**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

1. Abre el archivo de tu Agente Asistente Personal del Módulo 2.
2. Agrega una sección llamada \`## Contexto Actual\`.
3. Introduce 3 o 4 variables dinámicas (usando la sintaxis \`{{VARIABLE}}\`) que el agente necesitaría saber sobre ti todos los días para ser verdaderamente útil (ej. \`{{HORA_ACTUAL}}\`, \`{{TAREAS_PENDIENTES}}\`).`,
            type: `text`
          }
        },
        {
          id: `4-4`,
          title: `Proyecto: Sistema Multi-Agente`,
          time: `30 min`,
          difficulty: `⭐⭐⭐ Avanzado`,
          content: `# 4.4 - Proyecto: Sistema Multi-Agente

## 🎯 Objetivo

Integrar los conceptos de múltiples agentes, skills, encadenamiento (chaining) y contexto creando los archivos de configuración para un ecosistema de redacción colaborativa.

---

## 📝 El Reto: "La Fábrica de Contenido"

En este proyecto, vas a crear tres archivos Markdown. Juntos, formarán un sistema donde tres agentes distintos colaboran para escribir artículos de blog de alta calidad a partir de un tema simple.

**Los tres roles son:**
1. **Agente Investigador** (Recopila datos crudos).
2. **Agente Redactor** (Escribe el borrador con estilo).
3. **Agente Editor** (Revisa, corrige y aprueba el texto final).

---

## 🏗️ Paso a Paso Guiado

### 1. El Archivo del Investigador (\`agente_investigador.md\`)

Crea este primer archivo. Su único objetivo es buscar información y estructurarla.

\`\`\`markdown
# Agente Investigador

## 🎭 Propósito y Personalidad
Eres un investigador académico extremadamente analítico. Tu objetivo es encontrar hechos, estadísticas y fuentes confiables sobre el tema que el usuario proporcione. No eres creativo, eres 100% factual.

## ⚙️ Capacidades
- Extraer puntos clave de un tema.
- Listar al menos 3 fuentes o referencias lógicas.
- Organizar la información en un esquema (Outline).

## ⚠️ Output Esperado
Debes entregar ÚNICAMENTE un formato estructurado con:
- Título del tema.
- 5 Bullet points con información clave.
- Posibles enfoques para el redactor.
NO escribas párrafos largos, solo entrega la estructura cruda.
\`\`\`

### 2. El Archivo del Redactor (\`agente_redactor.md\`)

Este agente recibirá el *Output* del Investigador como *Input* para su tarea.

\`\`\`markdown
# Agente Redactor Creativo

## 🎭 Propósito y Personalidad
Eres un redactor estrella (Copywriter) especializado en artículos de blog persuasivos. Tu tono es entusiasta, cercano y fácil de leer.

## 📥 Entrada Esperada (Input)
Recibirás un bloque de notas estructurado (Outline) de parte del equipo de investigación.

## ⚙️ Capacidades y Procedimiento
1. Toma el outline de investigación.
2. Escribe una introducción gancho (hook).
3. Desarrolla los 5 bullet points en párrafos atractivos.
4. Escribe una conclusión con un llamado a la acción (CTA).

## ⚠️ Output Esperado
Debes entregar el artículo completo formateado en Markdown. No incluyas comentarios sobre el proceso de investigación, simplemente entrega la pieza final.
\`\`\`

### 3. El Archivo del Editor (\`agente_editor.md\`)

Este es el filtro final de la cadena de agentes. Garantiza la calidad.

\`\`\`markdown
# Agente Editor en Jefe

## 🎭 Propósito y Personalidad
Eres un Editor en Jefe implacable pero constructivo. Tienes un ojo agudo para los errores ortográficos, el tono inadecuado y la redundancia.

## 📥 Entrada Esperada (Input)
Recibirás el borrador final de un artículo escrito por el Agente Redactor.

## ⚙️ Procedimiento
1. Revisa la gramática y ortografía.
2. Asegúrate de que el tono no sea excesivamente informal.
3. Si el artículo tiene menos de 300 palabras, EXPÁNDELO agregando ejemplos relevantes.
4. Si el artículo está perfecto, añade al inicio "[APROBADO POR EDICIÓN]".

## ⚠️ Salida Obligatoria
Entrega el artículo final corregido y pulido, listo para publicar.
\`\`\`

---

## ✅ Validación del Ecosistema

Para verificar que has estructurado bien tus tres archivos, hazte las siguientes preguntas:
- [ ] ¿El Agente 1 (Investigador) tiene restringido hacer el trabajo creativo del Agente 2?
- [ ] ¿El Agente 2 sabe exactamente en qué formato va a recibir los datos?
- [ ] ¿El Agente 3 tiene instrucciones claras de qué hacer si el artículo no cumple los estándares?

¡Felicidades! Has definido arquitectónicamente un sistema que divide y conquista tareas complejas.

---

## 🚀 Próximos Pasos

Hemos finalizado el **Módulo 4: Integración y Workflows**. Ya tienes la lógica de orquestación cubierta. En el siguiente módulo analizaremos **Casos de Uso Reales** que ya están listos para salir a producción, empezando por agentes de desarrollo y atención al cliente.

👉 **Siguiente**: [5.1 - Agente de desarrollo de código](#5-1)

---

**Tiempo estimado**: 30 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
`,
          exercise: null
        }
      ]
    }
);
