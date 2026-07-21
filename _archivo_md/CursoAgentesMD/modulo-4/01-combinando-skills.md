# 4.1 - Combinando Múltiples Skills

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
```
User: "Analyze this data and create a report"
Agent: "I can analyze the data, but I can't create reports"
```

**Agente con múltiples skills**:
```
User: "Analyze this data and create a report"
Agent: "Perfect! I'll:
1. Analyze the data (Data Analyzer skill)
2. Generate insights (Insight Generator skill)
3. Create a formatted report (Report Writer skill)

Let me start..."
```

---

## 🏗️ Arquitectura de Skills Múltiples

### Pattern 1: Secuencial

Skills se ejecutan uno después del otro:

```
Input → Skill A → Output A → Skill B → Output B → Final Result
```

**Ejemplo**: Análisis de Datos + Reporte
```markdown
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
```

---

### Pattern 2: Paralelo

Múltiples skills se ejecutan simultáneamente:

```
Input → ┌─ Skill A → Output A ─┐
        ├─ Skill B → Output B ─┤→ Combined Result
        └─ Skill C → Output C ─┘
```

**Ejemplo**: Análisis Multi-Perspectiva
```markdown
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
```

---

### Pattern 3: Condicional

Skills se activan según condiciones:

```
Input → Condition Check → 
  IF condition A → Skill A
  IF condition B → Skill B
  IF condition C → Skill C
```

**Ejemplo**: Support Bot Adaptativo
```markdown
# AGENT: Smart Support

## Skills
1. FAQ Searcher - Para preguntas comunes
2. Order Tracker - Para status de órdenes
3. Technical Troubleshooter - Para problemas técnicos
4. Escalation Manager - Para casos complejos

## Routing Logic
```
IF user_query contains "order" OR "tracking":
    USE Order Tracker skill

ELSE IF user_query matches FAQ topics:
    USE FAQ Searcher skill

ELSE IF user_query describes technical problem:
    USE Technical Troubleshooter skill

ELSE IF user seems frustrated OR issue unresolved:
    USE Escalation Manager skill
```
```

---

## 📝 Implementación: Agente Multi-Skill

### Ejemplo Completo: Content Creator Assistant

```markdown
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

```
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
```

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
```

---

## 🔧 Manejo de Conflictos Entre Skills

### Problema: Skills Superpuestos

```markdown
Skill A: "General Editor" - Edits any text
Skill B: "Technical Writer" - Writes/edits technical content
Skill C: "Marketing Copy Editor" - Edits marketing content

User: "Edit this technical blog post"
→ Which skill to use? A, B, or both?
```

### Solución: Jerarquía Clara

```markdown
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
```

---

### Problema: Skills Interdependientes

```markdown
Skill A: "Data Analyzer" - Analyzes data
Skill B: "Report Writer" - Creates reports

Problem: Report Writer needs Data Analyzer's output
```

### Solución: Pipeline Explícito

```markdown
## Skill Dependencies

### Report Writer Skill
**Dependencies**: Requires data analysis first

**Workflow**:
```
IF user requests report AND no analysis yet:
  1. INFORM: "To create a report, I need to analyze the data first"
  2. ASK: "May I proceed with analysis?"
  3. IF yes:
     a. RUN Data Analyzer
     b. THEN run Report Writer
  4. IF no:
     EXPLAIN: "I'll need the analysis to create an accurate report"
```

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
```

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
```markdown
"I'll use [Skill A] to [purpose], then [Skill B] to [purpose]"
```

2. **Mostrar Progreso**
```markdown
"Step 1/3: Analyzing... ✓
 Step 2/3: Generating insights... ✓
 Step 3/3: Creating report... ✓"
```

3. **Ofrecer Opciones**
```markdown
"I can:
1. Just analyze (quick)
2. Analyze + create report (complete)
Which would help most?"
```

4. **Validar Entre Skills**
```markdown
"Analysis complete. Before I create the report, does this summary 
look correct? [summary]"
```

### ❌ Don'ts

1. **No ejecutar skills silenciosamente**
```markdown
❌ [Runs 5 skills without telling user]
✅ "I'll use these 3 skills: [list]. Starting now..."
```

2. **No asumir necesidades**
```markdown
❌ User asks for analysis → Agent generates full report unsolicited
✅ "Analysis done. Want me to create a report too?"
```

3. **No encadenar sin validación**
```markdown
❌ Skill A → Skill B → Skill C automáticamente
✅ Skill A → "Look good?" → Skill B → "Continue?" → Skill C
```

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

```markdown
□ Cada skill tiene triggers claros y distintos
□ Hay jerarquía para skills superpuestos
□ Workflows multi-skill están documentados
□ Agente comunica qué skill está usando
□ Hay validación entre pasos cuando necesario
□ Skills pueden usarse independientemente
□ Ejemplos muestran uso individual Y combinado
□ Manejo de dependencies está claro
```

---

## 🚀 Próximos Pasos

Ahora que sabes combinar skills:

1. Toma un agente existente
2. Agrégale 2-3 skills compatibles
3. Define workflows multi-skill
4. Prueba con escenarios complejos

👉 **Siguiente**: [4.2 - Cadenas de Agentes](02-cadenas-agentes.md)

---

**Tiempo estimado**: 90 minutos  
**Dificultad**: ⭐⭐⭐ Intermedio-Avanzado  
**Importancia**: 🔥🔥🔥 ALTA - Esto hace agentes realmente útiles
