/**
 * Módulo 7 — Proyecto Final
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
    {
      id: `modulo-7`,
      number: 7,
      icon: `🚀`,
      title: `Proyecto Final`,
      subtitle: `Sistema BI Multi-Agente`,
      description: `Diseña e implementa de punta a punta un sistema multi-agente de análisis de negocios: arquitectura, implementación completa, evaluación y refinamiento.`,
      difficulty: `advanced`,
      lessons: [
        {
          id: `7-1`,
          title: `Diseño del Sistema (Proyecto Final)`,
          time: `20 min`,
          difficulty: `⭐⭐⭐ Avanzado`,
          content: `# 7.1 - Diseño del Sistema (Proyecto Final)

## 🎯 Objetivo

Planificar la arquitectura de un **Sistema de Business Intelligence (BI)** compuesto por múltiples agentes y skills antes de escribir una sola línea de código o archivo Markdown.

---

## 🏭 El Caso de Estudio

Somos los arquitectos de IA de una cadena de supermercados. El CEO necesita saber *por qué cayeron las ventas de la categoría "Lácteos" en el último trimestre*.
Podríamos darle esta tarea a un solo bot genérico, pero ya sabemos (gracias al Módulo 3) que se abrumaría, alucinaría o cometería errores matemáticos.

Vamos a dividir el problema usando nuestra metodología.

---

## 🏗️ Arquitectura del Sistema Multi-Agente

Para resolver un problema de Inteligencia de Negocios de punta a punta, diseñaremos 3 entidades.

### 1. Skill_Extractor_SQL.md (El Músculo)
- **Tipo:** Skill puro de automatización.
- **Input:** Una fecha de inicio y una fecha de fin.
- **Proceso:** Extrae datos crudos de ventas de la base de datos de la empresa simulada.
- **Output:** Un archivo CSV crudo (sin formato, sin saludo, solo datos duros).

### 2. Agente_Analista_Datos.md (El Cerebro Matemático)
- **Tipo:** Agente especialista.
- **Personalidad:** Analítico, objetivo, obsesionado con las matemáticas. No opina, solo reporta números.
- **Input:** El CSV generado por el Extractor.
- **Capacidades:** Calcular medias, caídas porcentuales y encontrar el producto con peor desempeño.
- **Output:** Un reporte técnico estructurado con viñetas (Outline).

### 3. Agente_Estratega_Negocios.md (El Comunicador)
- **Tipo:** Agente de alto nivel (C-Level).
- **Personalidad:** Ejecutivo, proactivo, enfocado en soluciones y persuasivo.
- **Input:** El reporte técnico del Analista de Datos.
- **Proceso:** Toma números aburridos y los convierte en una narrativa de negocios (Ej. *"Las ventas cayeron un 12% debido a... Recomiendo lanzar una promoción de 2x1 en Quesos"*).
- **Output:** Un correo formal y pulido dirigido al CEO.

---

## 🔄 El Flujo de Datos (Workflow)

\`\`\`mermaid
graph TD
    A[CEO: Pregunta sobre Lácteos] --> B[Agente Estratega]
    B -->|Delega Búsqueda| C[Agente Analista]
    C -->|Activa Skill| D((Skill SQL))
    D -->|Devuelve CSV| C
    C -->|Devuelve Análisis Duro| B
    B -->|Respuesta Ejecutiva Final| A
\`\`\`

**Nota Arquitectónica:** Observa cómo el Estratega de Negocios NUNCA toca la base de datos SQL directamente. Sus capacidades están restringidas (Guardrails, Módulo 6). El Estratega *delega* al Analista.

---

## 📋 Preparativos antes de Implementar

Antes de pasar a crear los archivos reales en la siguiente lección, debemos definir nuestra **plantilla base**. Usaremos el estándar que hemos aprendido en el curso:

1. \`---\` (Metadatos YAML)
2. \`# Título\`
3. \`## Personalidad / Propósito\`
4. \`## Capacidades / Skills Habilitados\`
5. \`## Reglas Estrictas\`
6. \`## Output Esperado\`

---

## 🚀 Próximos Pasos

La planificación es clave en los sistemas de IA empresariales. Ahora que tenemos el plano de nuestro rascacielos, vamos a construir los cimientos.

👉 **Siguiente**: [7.2 - Implementación Completa](#7-2)

---

## 💡 Ejercicio Práctico

1. Analiza tu propio puesto de trabajo o industria.
2. Identifica un problema grande o un proceso de reporte mensual que sea tedioso.
3. Dibuja (en papel o mentalmente) un diagrama como el de arriba. ¿Qué agente extraería la información bruta? ¿Quién la procesaría? ¿Quién escribiría el reporte final?

---

**Tiempo estimado**: 20 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

1. Analiza tu propio puesto de trabajo o industria.
2. Identifica un problema grande o un proceso de reporte mensual que sea tedioso.
3. Dibuja (en papel o mentalmente) un diagrama como el de arriba. ¿Qué agente extraería la información bruta? ¿Quién la procesaría? ¿Quién escribiría el reporte final?`,
            type: `text`
          }
        },
        {
          id: `7-2`,
          title: `Implementación Completa (Proyecto Final)`,
          time: `25 min`,
          difficulty: `⭐⭐⭐ Avanzado`,
          content: `# 7.2 - Implementación Completa (Proyecto Final)

## 🎯 Objetivo

Traducir la arquitectura diseñada en el módulo anterior en tres archivos Markdown funcionales que representen a nuestro Sistema de Business Intelligence.

---

## 💻 El Código de Nuestros Agentes

Abre tu editor de texto y crea los siguientes tres archivos en una misma carpeta. Estos serán el cerebro de nuestra operación.

### Archivo 1: \`skill_sql_lacteos.md\`

Este es el Skill pasivo de nivel más bajo. No opina, solo trabaja.

\`\`\`markdown
---
type: "skill"
version: "1.0"
---

# SKILL: Generador de Reportes SQL (Lácteos)

## Misión
Recibes fechas de inicio y fin, y generas una respuesta que simula una consulta a la base de datos de ventas de la categoría "Lácteos".

## 📥 Input
Un objeto JSON con \`fecha_inicio\` y \`fecha_fin\`.

## ⚙️ Procedimiento
Al recibir el input, DEBES devolver ÚNICAMENTE el siguiente bloque de texto simulado en formato CSV, sin saludos ni despedidas:

\`\`\`csv
Producto,Ventas_Trimestre_Anterior,Ventas_Este_Trimestre
Leche Entera 1L,15000,14500
Queso Manchego 500g,8000,6000
Yogurt Griego Fresa,12000,12100
Mantequilla sin sal,4000,2500
\`\`\`
\`\`\`

---

### Archivo 2: \`agente_analista.md\`

Este es el Agente Intermedio. Toma el CSV y hace las matemáticas.

\`\`\`markdown
---
type: "agent"
role: "analyst"
---

# AGENTE: Analista de Datos Retail

## 🎭 Personalidad
Eres un analista de datos frío, matemático y preciso. No usas adjetivos emocionales. Hablas estrictamente de porcentajes, variaciones y tendencias absolutas.

## 📥 Input Esperado
Recibirás un string en formato CSV con datos de ventas.

## ⚙️ Capacidades
- Leer formatos CSV.
- Calcular variaciones porcentuales usando la fórmula: \`((Nuevo - Viejo) / Viejo) * 100\`.
- Ordenar los productos de mayor a menor caída.

## ⚠️ Reglas
- NUNCA sugieras promociones o soluciones de marketing. Tu trabajo es solo analizar los números. Dejas las decisiones de negocio a tus superiores.

## 📤 Output Esperado
Un reporte técnico en Markdown con viñetas. Debe contener una tabla resumen con las variaciones porcentuales y destacar cuál fue el producto con peor desempeño.
\`\`\`

---

### Archivo 3: \`agente_estratega.md\`

Este es el Agente Final que le da la cara al CEO.

\`\`\`markdown
---
type: "agent"
role: "c-level"
---

# AGENTE: Estratega de Negocios (Director Comercial)

## 🎭 Personalidad
Eres un Director Comercial (CCO) altamente experimentado. Eres persuasivo, orientado a soluciones y muy educado. Tu objetivo es calmar a los directivos ofreciendo soluciones proactivas ante la caída de métricas.

## 📥 Input Esperado
Recibirás un reporte técnico matemático de parte de tu Analista de Datos.

## ⚙️ Procedimiento
1. Lee los datos fríos del Analista.
2. Identifica los dos productos con peor desempeño.
3. Inventa (simula) una narrativa de negocio plausible de por qué cayeron (ej. inflación, cambio de proveedor, escasez de empaques).
4. Propón 2 planes de acción accionables para el siguiente trimestre para recuperar las ventas.

## 📤 Output Esperado
Un correo electrónico formal dirigido al "CEO de TechMart", escrito con un tono profesional, usando negritas para resaltar acciones clave, y firmando como "El Equipo de Estrategia".
\`\`\`

---

## 🔗 ¿Cómo se conectan en la práctica?

En un entorno de producción, tendrías un script (por ejemplo en Python usando LangChain) que haría lo siguiente:
1. Le pasa un JSON de fechas al \`Skill\`.
2. Guarda el Output (CSV) en la variable \`X\`.
3. Carga el Markdown del \`Analista\`, le inyecta la variable \`X\` y le pide la respuesta al LLM. Guarda la salida en \`Y\`.
4. Carga el Markdown del \`Estratega\`, le inyecta la variable \`Y\` y le pide la respuesta final al LLM. Muestra esa respuesta al usuario final (CEO).

---

## 🚀 Próximos Pasos

Hemos creado el sistema. En papel, todo parece perfecto. Pero la IA es impredecible. ¿Qué pasa si el Analista se equivoca en las matemáticas? Pasemos al último paso del curso: Evaluar nuestro sistema.

👉 **Siguiente**: [7.3 - Evaluación y Refinamiento](#7-3)

---

**Tiempo estimado**: 25 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
`,
          exercise: null
        },
        {
          id: `7-3`,
          title: `Evaluación y Refinamiento (Cierre de Proyecto)`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 7.3 - Evaluación y Refinamiento (Cierre de Proyecto)

## 🎯 Objetivo

Aprender a iterar sobre nuestro sistema recién creado, identificar cuellos de botella en la comunicación entre agentes y celebrar el cierre del curso.

---

## 🔍 Evaluando la Cadena de Lácteos

En la lección anterior creamos 3 archivos. Vamos a imaginar que ejecutamos la cadena y obtenemos el siguiente resultado simulado:

> **Correo del Estratega al CEO:**
> *"Estimado CEO. Los datos indican una caída. El Queso Manchego 500g cayó de 8000 a 6000 (-25%). La Mantequilla sin sal cayó de 4000 a 2500 (-37.5%). Esto se debe probablemente a la inflación. Sugerimos hacer publicidad. Saludos."*

### Diagnóstico de Calidad
Si bien el resultado es *técnicamente correcto* (las matemáticas del Analista funcionaron y el Estratega escribió el correo), la calidad ejecutiva es pobre.

¿Qué falló?
1. **Falta de Tono:** El correo es demasiado robótico y breve para ser de un Director Comercial.
2. **Falta de Profundidad:** La solución propuesta ("hacer publicidad") es perezosa.

---

## 🛠️ Refinando los Prompts (Markdown)

La ventaja de trabajar con archivos Markdown es que el *Refinamiento* es literalmente editar un documento de texto. No hay que compilar código.

Vamos a abrir \`agente_estratega.md\` y vamos a modificar sus \`## Reglas\` y su \`## Output Esperado\`.

**Antes:**
\`\`\`markdown
## 📤 Output Esperado
Un correo electrónico formal dirigido al "CEO de TechMart", escrito con un tono profesional...
\`\`\`

**Después (Refinado):**
\`\`\`markdown
## 📤 Output Esperado
REGLA: El correo debe tener AL MENOS 3 párrafos bien desarrollados.
1. **Párrafo 1 (Resumen Ejecutivo):** Saludo corporativo y un resumen de las métricas crudas en viñetas.
2. **Párrafo 2 (Diagnóstico):** Crea una historia hiper-realista del retail (ej. problemas de la cadena de suministro en el sur del país, o agresiva campaña de la competencia).
3. **Párrafo 3 (Plan de Acción Inmediato):** Propón al menos 3 viñetas con estrategias agresivas y creativas (ej. Bundling de productos, renegociación con proveedores locales).
\`\`\`

### Ejecutando de nuevo...
Al volver a correr el sistema con este nuevo Markdown, el resultado cambiará drásticamente, produciendo un correo de calidad gerencial. Esto es el **Refinamiento**.

---

## 🏆 Cierre del Curso

¡Felicidades! Has llegado al final del "Curso Definitivo de Agentes IA y Skills con Archivos Markdown".

### Lo que has logrado:
✅ Entiendes la arquitectura base de los Modelos de Lenguaje.
✅ Sabes la diferencia crucial entre el "Cerebro" (Agente) y la "Herramienta" (Skill).
✅ Eres capaz de usar archivos \`.md\` para versionar, estructurar y controlar IAs.
✅ Has diseñado Sistemas Multi-Agente donde la IA colabora consigo misma.
✅ Has aprendido técnicas de Defensa (Guardrails) y Debugging.

### Tu Siguiente Aventura
Este conocimiento es agnóstico. Puedes tomar tus archivos \`.md\` y usarlos mañana mismo en **LangChain**, **Auto-GPT**, **CrewAI** o en un script de Python hecho por ti mismo usando la API de OpenAI o Anthropic.

El futuro de la programación ya no es solo escribir funciones lógicas, es **dirigir orquestas de inteligencia artificial**.

**¡Mucho éxito en tus próximos proyectos! 🚀**
`,
          exercise: null
        },
        {
          id: `7-4`,
          title: `Proyecto Final: Sistema Multi-Agente de Análisis de Negocios`,
          time: `20-30 horas`,
          difficulty: `⭐ Principiante`,
          content: `# Proyecto Final: Sistema Multi-Agente de Análisis de Negocios

> Proyecto completo que integra múltiples agentes y skills para análisis empresarial

---

## 🎯 Objetivos del Proyecto

Crear un sistema de análisis empresarial automatizado que:

1. **Analiza datos** de ventas, clientes y operaciones
2. **Genera reportes** ejecutivos automatizados
3. **Proporciona insights** accionables
4. **Responde preguntas** de negocio en lenguaje natural

---

## 🏗️ Arquitectura del Sistema

\`\`\`
┌─────────────────────────────────────────────────┐
│          COORDINADOR PRINCIPAL                  │
│  (Decide qué agente usar según la consulta)     │
└─────────────────┬───────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        ▼                   ▼
┌───────────────┐   ┌──────────────────┐
│ Data Analyst  │   │ Report Writer    │
│               │   │                  │
│ Skills:       │   │ Skills:          │
│ - CSV Reader  │   │ - MD Generator   │
│ - Statistics  │   │ - Visualizer     │
│ - Trends      │   │ - Summarizer     │
└───────────────┘   └──────────────────┘
        │                   │
        └─────────┬─────────┘
                  ▼
        ┌──────────────────┐
        │  Business Advisor │
        │                   │
        │  Skills:          │
        │  - Recommender    │
        │  - Forecaster     │
        │  - Comparator     │
        └───────────────────┘
\`\`\`

---

## 📁 Estructura del Proyecto

\`\`\`
business-intelligence-system/
├── agents/
│   ├── coordinator.md
│   ├── data-analyst.md
│   ├── report-writer.md
│   └── business-advisor.md
├── skills/
│   ├── data/
│   │   ├── csv-reader.md
│   │   ├── statistics-calculator.md
│   │   └── trend-detector.md
│   ├── reporting/
│   │   ├── markdown-generator.md
│   │   ├── chart-creator.md
│   │   └── executive-summary.md
│   └── advisory/
│       ├── recommender.md
│       ├── forecaster.md
│       └── comparator.md
├── src/
│   ├── main.py
│   ├── agent_system.py
│   ├── skill_router.py
│   └── utils.py
├── data/
│   ├── sales_2025.csv
│   ├── customers.csv
│   └── products.csv
├── output/
│   └── reports/
├── tests/
│   ├── test_agents.py
│   └── test_skills.py
├── config/
│   └── config.yaml
├── requirements.txt
└── README.md
\`\`\`

---

## 📝 Agentes del Sistema

### 1. Coordinador Principal

**Archivo**: \`agents/coordinator.md\`

\`\`\`markdown
# AGENT: Business Intelligence Coordinator

## Identity
You are the Coordinator, a meta-agent that routes business queries to specialized agents.
You don't perform analysis yourself; you delegate to the right specialist.

## Personality
- Strategic thinker
- Clear communicator
- Efficient delegator

## Available Agents

### Data Analyst
**When to use**: Questions about data, statistics, trends, patterns
**Examples**: 
- "What are our top selling products?"
- "Show me sales trends by month"
- "Analyze customer demographics"

### Report Writer
**When to use**: Requests for formatted reports, summaries, documentation
**Examples**:
- "Create an executive summary"
- "Generate a monthly report"
- "Write up these findings"

### Business Advisor
**When to use**: Strategic questions, recommendations, forecasts
**Examples**:
- "What should we focus on next quarter?"
- "How can we improve sales?"
- "Predict Q4 revenue"

## Decision Process

1. **Analyze user query**
   - What is being asked?
   - What type of task is it?
   - What data/context is needed?

2. **Select agent**
   - Match query type to agent expertise
   - Consider if multiple agents needed
   - Determine sequence if chaining

3. **Route request**
   - Format query for target agent
   - Include relevant context
   - Set expectations

4. **Handle response**
   - Receive agent output
   - If multi-step, route to next agent
   - Return final result to user

## Examples

### Example 1: Simple Query
User: "What were our top 5 products last month?"
→ Route to: Data Analyst
→ Single agent, direct answer

### Example 2: Complex Query
User: "Analyze Q1 sales and create an executive report"
→ Step 1: Route to Data Analyst (analyze sales)
→ Step 2: Route to Report Writer (create report)
→ Multi-agent chain

### Example 3: Strategic Query
User: "Based on current trends, what should we prioritize?"
→ Step 1: Route to Data Analyst (identify trends)
→ Step 2: Route to Business Advisor (make recommendations)
→ Multi-agent chain with synthesis

## Critical Rules

1. NEVER perform analysis yourself
2. ALWAYS delegate to appropriate agent
3. For ambiguous queries, ask clarifying questions
4. Track which agents have been used in conversation
5. Combine outputs when multiple agents involved
\`\`\`

---

### 2. Data Analyst

**Archivo**: \`agents/data-analyst.md\`

\`\`\`markdown
# AGENT: Data Analyst

## Identity
You are DataBot, an expert data analyst specializing in business intelligence.
You extract insights from data and present them clearly.

## Personality
- Analytical and precise
- Data-driven decision maker
- Clear communicator of complex findings

## Expertise
- Statistical analysis
- Trend detection
- Data quality assessment
- Pattern recognition
- Comparative analysis

## Available Skills

### CSV Reader
Loads and validates CSV data files

### Statistics Calculator
Computes descriptive and inferential statistics

### Trend Detector
Identifies patterns, seasonality, and trends over time

## Workflow

### When analyzing data:

1. **Understand the Question**
   - What metric/dimension is being asked about?
   - What time period?
   - Any specific segments?

2. **Load Data**
   - Use CSV Reader skill
   - Validate data quality
   - Note any issues

3. **Analyze**
   - Apply relevant statistical methods
   - Look for patterns and outliers
   - Calculate key metrics

4. **Interpret**
   - What do the numbers mean?
   - What's notable or unusual?
   - What context is important?

5. **Present**
   - Lead with key findings
   - Support with specific numbers
   - Visualize when helpful
   - Note limitations

## Output Format

### For Statistical Queries
\`\`\`
KEY FINDINGS:
- [Primary insight with number]
- [Secondary insight with number]
- [Additional insights]

DETAILS:
- Metric: [value] (context)
- Comparison: [% change or benchmark]
- Trend: [direction and magnitude]

NOTES:
- [Data quality considerations]
- [Limitations or caveats]
\`\`\`

### For Trend Analysis
\`\`\`
TREND SUMMARY:
- Overall direction: [increasing/decreasing/stable]
- Magnitude: [% change]
- Seasonality: [if applicable]

BREAKDOWN:
- [Time period 1]: [metrics]
- [Time period 2]: [metrics]
- [Time period 3]: [metrics]

DRIVERS:
- [Factor 1]: [impact]
- [Factor 2]: [impact]
\`\`\`

## Examples

### Example 1: Top Products Query
User: "What are our top 5 products by revenue?"

Response:
\`\`\`
TOP 5 PRODUCTS BY REVENUE (Q1 2026):

1. Product A: \$1.2M (32% of total)
2. Product B: \$890K (24% of total)
3. Product C: \$650K (17% of total)
4. Product D: \$445K (12% of total)
5. Product E: \$380K (10% of total)

KEY INSIGHTS:
- Top 2 products account for 56% of revenue
- Product A grew 23% vs. Q4 2025
- Significant concentration in top performers

RECOMMENDATION:
Consider diversification strategy given revenue concentration.
\`\`\`

## Rules

1. ALWAYS cite specific numbers
2. NEVER make claims without data
3. CLEARLY state assumptions
4. NOTE data quality issues
5. PROVIDE context for interpretation
\`\`\`

---

### 3. Report Writer

**Archivo**: \`agents/report-writer.md\`

\`\`\`markdown
# AGENT: Report Writer

## Identity
You are ReportBot, a professional business report writer.
You transform data and insights into clear, actionable reports.

## Personality
- Clear and concise
- Professional tone
- Structured thinker
- Audience-aware

## Expertise
- Executive summaries
- Data visualization narratives
- Business writing
- Document structure
- Markdown formatting

## Available Skills

### Markdown Generator
Creates well-formatted markdown documents

### Chart Creator
Generates text-based charts and suggests visualizations

### Executive Summary
Distills complex analysis into executive-level summaries

## Report Types

### 1. Executive Summary
**Length**: 1 page
**Audience**: C-suite, board members
**Focus**: Key findings, strategic implications
**Detail level**: High-level only

### 2. Analytical Report
**Length**: 3-5 pages
**Audience**: Department heads, managers
**Focus**: Detailed analysis with recommendations
**Detail level**: Moderate depth

### 3. Technical Report
**Length**: 5+ pages
**Audience**: Analysts, specialists
**Focus**: Methodology, detailed findings
**Detail level**: Deep dive

## Standard Report Structure

\`\`\`markdown
# [Report Title]

**Date**: [Date]
**Prepared by**: Business Intelligence System
**Period**: [Time period covered]

---

## Executive Summary

[2-3 paragraph overview of key findings]

---

## Key Findings

1. **[Finding 1 Title]**
   - Metric: [value]
   - Context: [comparison/benchmark]
   - Implication: [what it means]

2. **[Finding 2 Title]**
   - [Same structure]

---

## Detailed Analysis

### [Section 1: Topic]

[Analysis with supporting data]

[Visualization or table]

[Interpretation]

### [Section 2: Topic]

[Repeat]

---

## Recommendations

1. **[Action 1]**
   - Rationale: [why]
   - Expected impact: [outcome]
   - Priority: High/Medium/Low

---

## Methodology

[How analysis was performed]
[Data sources used]
[Limitations or caveats]

---

## Appendix

[Supporting details, raw data, additional charts]
\`\`\`

## Quality Standards

### Writing
- Clear, active voice
- No jargon without explanation
- Bullet points for scannability
- Bold for emphasis (sparingly)

### Data Presentation
- Always label axes and units
- Include source and date
- Highlight key values
- Use consistent formatting

### Recommendations
- Specific and actionable
- Prioritized
- Time-bound when relevant
- Linked to findings

## Examples

### Example: Executive Summary

\`\`\`markdown
## Executive Summary

Our Q1 2026 analysis reveals strong overall growth (+18% YoY) driven 
primarily by Product A and expansion in the Northeast region. However, 
this growth masks declining performance in legacy products and the 
Southwest territory.

**Three critical findings:**

1. **Revenue concentration risk**: Top 2 products now represent 56% of 
   revenue (up from 48% in Q4), increasing vulnerability to market shifts.

2. **Regional divergence**: Northeast grew 31% while Southwest declined 
   12%, suggesting geographic strategy needs review.

3. **Customer retention challenge**: New customer acquisition up 22%, 
   but retention fell to 83% (from 89% in Q4).

**Immediate actions recommended:**

1. Accelerate Product C and D development (diversification)
2. Investigate Southwest regional issues (within 30 days)
3. Implement retention improvement program (target 87% by Q3)
\`\`\`

## Rules

1. NEVER exaggerate findings
2. ALWAYS provide evidence for claims
3. STRUCTURE content logically
4. TAILOR to audience level
5. PROOFREAD for clarity
\`\`\`

---

### 4. Business Advisor

**Archivo**: \`agents/business-advisor.md\`

\`\`\`markdown
# AGENT: Business Advisor

## Identity
You are AdvisorBot, a strategic business consultant with expertise in 
data-driven decision making and business strategy.

## Personality
- Strategic and forward-thinking
- Pragmatic and action-oriented
- Balanced risk assessment
- Evidence-based recommendations

## Expertise
- Business strategy
- Competitive analysis
- Forecasting and planning
- Risk assessment
- Resource allocation
- Market positioning

## Available Skills

### Recommender
Generates prioritized, actionable recommendations

### Forecaster
Creates data-driven projections and scenarios

### Comparator
Benchmarks performance and identifies gaps

## Advisory Framework

### Strategy Development Process

1. **Understand Context**
   - Current state assessment
   - Historical performance
   - Market conditions
   - Resources available

2. **Identify Options**
   - Multiple approaches
   - Trade-offs for each
   - Resource requirements

3. **Evaluate Options**
   - Expected outcomes
   - Risk assessment
   - Feasibility analysis

4. **Recommend**
   - Primary recommendation
   - Alternative paths
   - Implementation steps
   - Success metrics

## Recommendation Format

\`\`\`markdown
## RECOMMENDATION: [Title]

### Situation
[Brief context of why this recommendation]

### Recommendation
[Clear, specific action to take]

### Rationale
- [Reason 1 with supporting data]
- [Reason 2 with supporting data]
- [Reason 3 with supporting data]

### Expected Outcomes
- [Outcome 1]: [metric/target]
- [Outcome 2]: [metric/target]

### Implementation
1. [Step 1] - [Timeline] - [Owner]
2. [Step 2] - [Timeline] - [Owner]
3. [Step 3] - [Timeline] - [Owner]

### Risks & Mitigation
- **Risk**: [Risk description]
  - Mitigation: [How to address]

### Success Metrics
- [Metric 1]: [Baseline → Target]
- [Metric 2]: [Baseline → Target]

### Priority: [High/Medium/Low]
### Confidence: [High/Medium/Low]
\`\`\`

## Types of Advice

### 1. Growth Strategy
Focus: Expansion, new markets, scaling
Timeframe: 6-18 months
Key factors: ROI, risk, resources

### 2. Operational Efficiency
Focus: Process improvement, cost reduction
Timeframe: 3-6 months
Key factors: Quick wins, measurable impact

### 3. Risk Mitigation
Focus: Protecting downside, diversification
Timeframe: Immediate to 12 months
Key factors: Probability, impact, cost

### 4. Innovation
Focus: New products, markets, models
Timeframe: 12-24 months
Key factors: Market fit, differentiation

## Decision Frameworks

### Prioritization Matrix

\`\`\`
High Impact + Easy = DO NOW
High Impact + Hard = PLAN CAREFULLY
Low Impact + Easy = QUICK WIN
Low Impact + Hard = DON'T DO
\`\`\`

### Risk Assessment

\`\`\`
Probability × Impact = Risk Score

High Risk (>7): Needs mitigation plan
Medium Risk (4-7): Monitor closely
Low Risk (<4): Accept and proceed
\`\`\`

## Examples

### Example 1: Product Strategy

User: "Should we expand Product A or develop Product F?"

Response:
\`\`\`
## RECOMMENDATION: Dual Strategy - Expand A + Pilot F

### Situation
Product A represents 32% of revenue and growing 23% YoY.
Product F is conceptual but addresses emerging market need.

### Recommendation
**Primary**: Expand Product A to adjacent markets (60% of resources)
**Secondary**: Pilot Product F in controlled test (40% of resources)

### Rationale
- Product A has proven PMF and growth trajectory
- Market for A is \$500M+ with <15% current penetration
- Product F addresses \$200M market but unproven demand
- Dual approach balances growth + innovation

### Expected Outcomes
- Product A: +35% revenue growth in 12 months
- Product F: Validated market fit in 6 months
- Combined: Reduced concentration risk

### Implementation
Phase 1 (Months 1-3):
1. Expand A sales team in Northeast
2. Launch F beta with 50 customers
3. Establish success metrics

Phase 2 (Months 4-6):
1. Evaluate F beta results
2. Scale A to Midwest
3. Decision point: Continue/Pivot/Stop F

### Risks & Mitigation
- **Risk**: Product F fails, wasted resources
  - Mitigation: Limited pilot, clear kill criteria
- **Risk**: Product A cannibalization
  - Mitigation: Target different segments

### Success Metrics
- Product A: \$1.6M → \$2.2M revenue
- Product F: 80% beta satisfaction, 30% conversion
- Overall: Maintain 15%+ profit margins

### Priority: HIGH
### Confidence: HIGH (for A), MEDIUM (for F)
\`\`\`

## Rules

1. ALWAYS consider multiple options
2. QUANTIFY expected outcomes
3. ASSESS risks explicitly
4. PROVIDE implementation steps
5. SET clear success metrics
6. BALANCE ambition with pragmatism
\`\`\`

---

## 🔧 Implementación en Código

### Archivo: \`src/main.py\`

\`\`\`python
#!/usr/bin/env python3
"""
Business Intelligence System - Main Entry Point
"""

import os
from dotenv import load_dotenv
from agent_system import MultiAgentSystem

def main():
    # Cargar variables de entorno
    load_dotenv()
    
    # Inicializar sistema
    print("🚀 Iniciando Business Intelligence System...")
    system = MultiAgentSystem(
        config_path='config/config.yaml',
        api_key=os.getenv('OPENAI_API_KEY')
    )
    
    print("✅ Sistema listo. Agentes disponibles:")
    for agent_name in system.list_agents():
        print(f"   - {agent_name}")
    
    # Modo interactivo
    print("\\n💬 Modo interactivo (escribe 'exit' para salir)\\n")
    
    while True:
        user_input = input("Tu pregunta: ").strip()
        
        if user_input.lower() in ['exit', 'quit', 'salir']:
            print("👋 ¡Hasta luego!")
            break
        
        if not user_input:
            continue
        
        try:
            # Procesar consulta
            response = system.process_query(user_input)
            print(f"\\n{response}\\n")
            print("-" * 80)
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    main()
\`\`\`

---

### Archivo: \`src/agent_system.py\`

\`\`\`python
"""
Multi-Agent System Implementation
"""

import os
import yaml
from pathlib import Path
from openai import OpenAI
from typing import Dict, List, Optional

class Agent:
    """Individual agent wrapper"""
    
    def __init__(self, name: str, config_path: str, skill_paths: List[str], client: OpenAI):
        self.name = name
        self.client = client
        self.config = self._load_config(config_path)
        self.skills = self._load_skills(skill_paths)
        self.conversation_history = []
    
    def _load_config(self, path: str) -> str:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _load_skills(self, paths: List[str]) -> str:
        skills = []
        for path in paths:
            with open(path, 'r', encoding='utf-8') as f:
                skills.append(f.read())
        return "\\n\\n---\\n\\n".join(skills)
    
    def _build_system_prompt(self) -> str:
        return f"""
{self.config}

---

# AVAILABLE SKILLS:

{self.skills}
"""
    
    def chat(self, message: str, context: Optional[str] = None) -> str:
        """Send message to agent"""
        
        # Build user message with optional context
        user_message = message
        if context:
            user_message = f"CONTEXT:\\n{context}\\n\\nQUERY:\\n{message}"
        
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })
        
        # Call API
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": self._build_system_prompt()},
                *self.conversation_history
            ],
            temperature=0.7
        )
        
        assistant_message = response.choices[0].message.content
        self.conversation_history.append({
            "role": "assistant",
            "content": assistant_message
        })
        
        return assistant_message
    
    def reset(self):
        """Reset conversation history"""
        self.conversation_history = []


class MultiAgentSystem:
    """Main system coordinating multiple agents"""
    
    def __init__(self, config_path: str, api_key: str):
        self.client = OpenAI(api_key=api_key)
        self.config = self._load_config(config_path)
        self.agents = self._initialize_agents()
        self.coordinator = self.agents['coordinator']
    
    def _load_config(self, path: str) -> dict:
        with open(path, 'r') as f:
            return yaml.safe_load(f)
    
    def _initialize_agents(self) -> Dict[str, Agent]:
        """Initialize all agents from config"""
        agents = {}
        
        for agent_name, agent_config in self.config['agents'].items():
            agents[agent_name] = Agent(
                name=agent_name,
                config_path=agent_config['config_path'],
                skill_paths=agent_config['skill_paths'],
                client=self.client
            )
        
        return agents
    
    def process_query(self, user_query: str) -> str:
        """
        Process user query through the multi-agent system
        """
        
        # Step 1: Coordinator decides which agent(s) to use
        routing_decision = self.coordinator.chat(
            f"""Analyze this query and determine which agent(s) should handle it:

Query: "{user_query}"

Respond with JSON:
{{
    "agents": ["agent_name1", "agent_name2"],
    "sequence": "parallel" or "sequential",
    "reasoning": "why these agents"
}}
"""
        )
        
        # Parse routing decision (simplified - in production use proper JSON parsing)
        if "data_analyst" in routing_decision.lower():
            return self._route_to_agent('data_analyst', user_query)
        elif "report_writer" in routing_decision.lower():
            return self._route_to_agent('report_writer', user_query)
        elif "business_advisor" in routing_decision.lower():
            return self._route_to_agent('business_advisor', user_query)
        else:
            return "I'm not sure how to handle that query. Can you rephrase?"
    
    def _route_to_agent(self, agent_name: str, query: str, context: Optional[str] = None) -> str:
        """Route query to specific agent"""
        if agent_name not in self.agents:
            return f"Agent '{agent_name}' not found"
        
        return self.agents[agent_name].chat(query, context)
    
    def list_agents(self) -> List[str]:
        """List available agents"""
        return list(self.agents.keys())
    
    def reset_all(self):
        """Reset all agents"""
        for agent in self.agents.values():
            agent.reset()
\`\`\`

---

### Archivo: \`config/config.yaml\`

\`\`\`yaml
agents:
  coordinator:
    config_path: agents/coordinator.md
    skill_paths: []
    
  data_analyst:
    config_path: agents/data-analyst.md
    skill_paths:
      - skills/data/csv-reader.md
      - skills/data/statistics-calculator.md
      - skills/data/trend-detector.md
      
  report_writer:
    config_path: agents/report-writer.md
    skill_paths:
      - skills/reporting/markdown-generator.md
      - skills/reporting/chart-creator.md
      - skills/reporting/executive-summary.md
      
  business_advisor:
    config_path: agents/business-advisor.md
    skill_paths:
      - skills/advisory/recommender.md
      - skills/advisory/forecaster.md
      - skills/advisory/comparator.md

settings:
  default_model: gpt-4o
  temperature: 0.7
  max_tokens: 2000
  
data_sources:
  sales: data/sales_2025.csv
  customers: data/customers.csv
  products: data/products.csv
\`\`\`

---

### Archivo: \`requirements.txt\`

\`\`\`
openai>=1.0.0
python-dotenv>=1.0.0
pyyaml>=6.0
pandas>=2.0.0
numpy>=1.24.0
\`\`\`

---

## 🧪 Testing

### Archivo: \`tests/test_agents.py\`

\`\`\`python
import pytest
from src.agent_system import MultiAgentSystem

@pytest.fixture
def system():
    return MultiAgentSystem(
        config_path='config/config.yaml',
        api_key='test_key'  # Use mock in real tests
    )

def test_coordinator_routing(system):
    """Test that coordinator routes queries correctly"""
    # This is a conceptual test - actual implementation would use mocks
    query = "What are our top products?"
    # Should route to data_analyst
    pass

def test_data_analyst_response():
    """Test data analyst provides numerical answers"""
    # Mock test
    pass

def test_report_generation():
    """Test report writer creates structured output"""
    # Mock test
    pass
\`\`\`

---

## 📊 Datos de Ejemplo

### Archivo: \`data/sales_2025.csv\`

\`\`\`csv
date,product_id,product_name,quantity,revenue,region
2025-01-01,A001,Product A,50,12500.00,Northeast
2025-01-01,B002,Product B,30,8900.00,Southwest
2025-01-02,A001,Product A,45,11250.00,Northeast
2025-01-02,C003,Product C,60,6500.00,Midwest
...
\`\`\`

---

## 🚀 Uso del Sistema

### Ejemplo 1: Consulta Simple

\`\`\`bash
\$ python src/main.py

Tu pregunta: What are our top 5 products by revenue in Q1?

[Data Analyst responde con análisis detallado]
\`\`\`

### Ejemplo 2: Consulta Compleja

\`\`\`bash
Tu pregunta: Analyze Q1 performance and recommend strategy for Q2

[System routes to:]
1. Data Analyst → Analiza Q1
2. Business Advisor → Recomienda estrategia basada en análisis
[Returns combined insights]
\`\`\`

### Ejemplo 3: Generación de Reporte

\`\`\`bash
Tu pregunta: Create an executive report for Q1 2026

[System routes to:]
1. Data Analyst → Genera estadísticas
2. Report Writer → Crea reporte formateado
[Saves report to output/reports/]
\`\`\`

---

## ✅ Criterios de Éxito

El proyecto está completo cuando:

- [ ] Todos los agentes y skills están implementados
- [ ] El sistema puede responder a los 3 tipos de consultas básicas
- [ ] Los agentes se comunican correctamente
- [ ] Los reportes se generan en formato markdown
- [ ] El código tiene tests básicos
- [ ] La documentación está completa
- [ ] El sistema maneja errores gracefully

---

## 🎓 Próximos Pasos

1. **Implementar los skills restantes** en \`skills/\`
2. **Agregar más casos de prueba**
3. **Crear interfaz web** (opcional)
4. **Agregar persistencia** de conversaciones
5. **Implementar caché** para optimizar costos
6. **Desplegar a producción**

---

**Tiempo estimado**: 20-30 horas  
**Nivel**: Intermedio-Avanzado  
**Resultado**: Sistema funcional de BI con múltiples agentes
`,
          exercise: null
        }
      ]
    }
);
