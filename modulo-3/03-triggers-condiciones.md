# 3.3 - Triggers y Condiciones: La Clave de la Activación

> Cómo hacer que tus skills se activen exactamente cuando deben

---

## 🎯 ¿Por Qué Son Importantes Los Triggers?

Los triggers son **la diferencia entre un skill útil y uno ignorado**.

Sin buenos triggers:
- ❌ El skill nunca se activa
- ❌ Se activa cuando no debe
- ❌ Compite con otros skills
- ❌ El agente se confunde

Con buenos triggers:
- ✅ Activación precisa
- ✅ Sin falsos positivos
- ✅ Skills complementarios
- ✅ Agente eficiente

---

## 📚 Tipos de Triggers

### 1. Keywords (Palabras Clave)

**Más simple pero menos preciso**

```markdown
## Triggers
- Usuario dice "analyze"
- Usuario menciona "data"
```

**Problema**: Demasiado amplio
- "Can you analyze why my code fails?" → ¿Analizar datos o código?

**Mejor**:
```markdown
## Triggers
- Usuario dice "analyze" + ["data", "csv", "statistics", "metrics"]
- Usuario menciona "data quality" o "data validation"
```

---

### 2. Contexto de Conversación

**Considera el historial**

```markdown
## Triggers
- Usuario subió archivo CSV en mensajes anteriores
- Conversación sobre análisis de datos
- Usuario pidió estadísticas en mensaje previo
```

**Ejemplo**:
```
User: "I have sales data from Q1"
Agent: [nota el contexto]
User: "Can you check it?"
Agent: [activa CSV analyzer skill - "it" refiere a sales data]
```

---

### 3. Presencia de Artefactos

**Basado en archivos o datos**

```markdown
## Triggers
- Archivo con extensión .csv presente
- URL detectada en mensaje
- Código entre backticks ```
- JSON/XML detectado
```

**Ventaja**: Alta precisión
**Desventaja**: Requiere parseo

---

### 4. Intención del Usuario

**Más sofisticado**

```markdown
## Triggers

### Intenciones que activan este skill:
- EXPLORATION: Usuario quiere explorar datos
- VALIDATION: Usuario quiere verificar calidad
- COMPARISON: Usuario compara datasets

### Señales de intención:
- Preguntas exploratorias: "what's in", "show me", "explore"
- Preguntas de validación: "is this correct", "check if", "validate"
- Preguntas comparativas: "compare", "difference between", "vs"
```

---

### 5. Condiciones Compuestas

**Múltiples requisitos**

```markdown
## Triggers

### Activar SI:
- (Usuario menciona "analyze" O "check" O "review")
  Y
- (Archivo CSV presente O datos tabulares en mensaje)
  Y
- (NO se mencionó "code" - eso es para code analyzer)

### NO activar SI:
- Usuario solo pregunta sobre formato CSV (no análisis)
- Usuario quiere crear CSV (eso es csv-generator)
- Usuario habla de código CSV parsing (eso es code-helper)
```

---

## 🎨 Patterns de Triggers Efectivos

### Pattern 1: Explícito + Implícito

Combina keywords exactos con contexto

```markdown
# SKILL: Database Query Helper

## Triggers

### Explícitos (alta confianza):
- Usuario dice exactamente: "query database", "SQL help"
- Usuario pega query SQL
- Usuario menciona nombres de tablas

### Implícitos (contexto requerido):
- Usuario pregunta por datos + conversación sobre base de datos
- Usuario menciona "rows", "columns", "join" en contexto DB
- Follow-up de consulta previa sobre datos
```

---

### Pattern 2: Cascada de Especificidad

Triggers ordenados de más a menos específico

```markdown
# SKILL: Python Code Reviewer

## Triggers (en orden de prioridad)

### Nivel 1 - DEFINITIVAMENTE ACTIVAR:
- Usuario dice "review this Python code"
- Usuario pega código Python con ```python
- Usuario pregunta "what's wrong with this code?" + código Python visible

### Nivel 2 - PROBABLEMENTE ACTIVAR:
- Usuario menciona "Python" + "bug" o "error"
- Usuario comparte traceback de Python
- Conversación previa sobre código Python

### Nivel 3 - CONSIDERAR ACTIVAR:
- Usuario pregunta sobre "best practices" en conversación Python
- Usuario menciona PEP8 o Python conventions
```

---

### Pattern 3: Exclusión Mutua

Define claramente cuándo NO activar

```markdown
# SKILL: Image Analyzer

## Triggers
- Usuario sube imagen (.jpg, .png, .gif)
- Usuario pregunta sobre contenido de imagen
- Usuario pide "describe this image"

## Anti-Triggers (NO ACTIVAR)

### Si otro skill es más apropiado:
- Usuario pregunta cómo crear/editar imagen → image-editor
- Usuario quiere generar imagen → image-generator
- Usuario pregunta teoría sobre imágenes → general-knowledge

### Si es ambiguo:
- Ask: "Do you want me to analyze the image content or help you edit it?"
```

---

## 🧪 Testing de Triggers

### Tabla de Test Cases

```markdown
## Trigger Test Matrix

| User Input | Should Activate? | Reason |
|-----------|------------------|---------|
| "analyze sales.csv" | ✅ YES | Explicit + file |
| "what's in this data?" + CSV uploaded | ✅ YES | Context + artifact |
| "how to analyze data in Python" | ❌ NO | Tutorial, not analysis request |
| "can you check if my data is clean?" | ✅ YES | Validation intent + data context |
| "analyze my code for bugs" | ❌ NO | Code analysis, not data |
```

### Casos Edge

```markdown
## Edge Cases to Test

1. **Ambiguous**:
   Input: "review this"
   Context needed: What is "this"? Check conversation history.

2. **Multi-intent**:
   Input: "analyze this data and write code to automate it"
   Decision: Activate data-analyzer first, then code-generator.

3. **Negation**:
   Input: "don't analyze the data yet, just load it"
   Decision: DON'T activate analyzer, only loader.

4. **Conditional**:
   Input: "if the data looks good, analyze it"
   Decision: Check data quality first, then conditionally analyze.
```

---

## 💡 Ejemplos Reales

### Ejemplo 1: E-commerce Product Recommender

```markdown
# SKILL: Product Recommender

## Triggers

### Activation Conditions (ALL must be true):
1. User intent = shopping/browsing (not technical support)
2. One of:
   - User asks for "recommendations" or "suggestions"
   - User describes needs: "I need", "looking for", "want to buy"
   - User mentions budget or preferences
3. Context = product category (not generic)

### Specific Trigger Phrases:
✅ "What laptop should I buy for video editing under $2000?"
✅ "Recommend headphones for running"
✅ "I need a gift for a 10-year-old who likes science"

### Non-Trigger Phrases:
❌ "How do I return a product?" (customer service)
❌ "What are the specs of product X?" (information query)
❌ "Recommend me a good API framework" (not e-commerce product)

## Trigger Logic

```
IF (
  user_intent IN [shopping, browsing, gift_seeking]
  AND
  (
    contains_keywords(["recommend", "suggest", "should I buy"]) OR
    describes_needs(["need", "looking for", "want"])
  )
  AND
  product_category_identified
  AND NOT
  (
    technical_support_query OR
    order_status_query OR
    general_information_only
  )
)
THEN
  activate_skill()
```
```

---

### Ejemplo 2: Meeting Scheduler

```markdown
# SKILL: Meeting Scheduler

## Triggers

### Primary Signals:
- Keywords: "schedule", "meeting", "calendar", "book time"
- Intent: Coordination/planning
- Entities: Time references (dates, times, durations)

### Context Requirements:
- At least 2 participants implied OR
- Calendar access available OR
- Time constraints mentioned

### Activation Examples:

✅ ACTIVATE:
```
"Schedule a meeting with John next Tuesday at 2pm"
→ Has: keyword + time + participant

"Can you find time for our team meeting this week?"
→ Has: keyword + time range + group

"I need to meet with the client before Friday"
→ Has: intent + participant + deadline
```

❌ DON'T ACTIVATE:
```
"What meetings do I have today?"
→ Query only, not scheduling

"Meeting notes from yesterday"
→ Different skill (note-taker)

"The meeting was productive"
→ Statement, not action request
```

## Trigger Decision Tree

```
User message received
  ├─ Contains time reference?
  │   ├─ Yes → Continue
  │   └─ No → Check for implicit timing
  │
  ├─ Contains coordination keywords?
  │   ├─ schedule, book, set up, arrange → High confidence
  │   ├─ meet, call, sync → Medium confidence (check context)
  │   └─ None → Low confidence (needs more signals)
  │
  ├─ Identifies participants?
  │   ├─ Explicit names/titles → High confidence
  │   ├─ Implied ("team", "client") → Medium confidence
  │   └─ Missing → Ask for clarification
  │
  └─ Not a different action?
      ├─ Not querying existing meetings → Good
      ├─ Not asking for advice → Good
      └─ Not past tense → Good
          → ACTIVATE SKILL
```
```

---

### Ejemplo 3: Code Bug Detector

```markdown
# SKILL: Bug Detector

## Triggers

### Strong Triggers (95%+ confidence):
1. User explicitly says:
   - "find bugs"
   - "what's wrong with this code"
   - "debug this"
   - "why isn't this working"

2. User shares:
   - Code + error message
   - Code + "help" or "stuck"
   - Traceback/stack trace

### Moderate Triggers (70-95% confidence):
1. User asks about unexpected behavior:
   - "Why does this return X instead of Y?"
   - "This should work but doesn't"
   - "Getting weird results"

2. Code + question without explicit "bug" mention

### Weak Triggers (50-70% confidence):
1. User shares code without context
   → ASK: "Are you looking for bug detection, code review, or explanation?"

2. General performance question
   → ASK: "Is this a bug or optimization question?"

## Anti-Triggers (DON'T ACTIVATE):

❌ User wants explanation how code works (→ code-explainer)
❌ User wants code written from scratch (→ code-generator)  
❌ User wants refactoring suggestions (→ code-optimizer)
❌ User asking theoretical question (→ general-assistant)

## Disambiguation Strategy

When triggers overlap with other skills:

```
IF code_present AND user_intent_unclear:
    ASK: "I can help you with:
          1. Finding bugs 🐛
          2. Explaining how this works 📖
          3. Improving the code ⚡
          4. Writing tests 🧪
         What would be most helpful?"
```

## Example Trigger Evaluation

```
Input: "This function always returns None, I don't know why"

Analysis:
✅ Code mentioned ("function")
✅ Unexpected behavior ("always returns None")
✅ User is confused ("don't know why")
✅ Implicit bug indicator
❌ No code provided yet

Action:
→ ACTIVATE with high confidence
→ Request code: "I can help debug this! Please share the function code."
```

```
Input: "How would you write a function to sort a list?"

Analysis:
❌ No existing code
❌ Request to write new code
❌ Not debugging scenario
✅ Matches code-generator pattern

Action:
→ DON'T ACTIVATE bug detector
→ Route to code-generator instead
```
```

---

## 🔬 Avanzado: Trigger Scoring

Para sistemas más sofisticados, usa un sistema de puntuación:

```markdown
# SKILL: Data Quality Checker

## Trigger Scoring System

Each signal adds to confidence score:

### Keyword Signals (+points):
- "quality": +20
- "validate": +20
- "check data": +25
- "clean": +15
- "errors": +15
- "missing values": +20

### Context Signals:
- CSV file present: +30
- Previous data analysis in conversation: +15
- User has uploaded data before: +10

### Entity Signals:
- Mentions specific data issues: +25
- Mentions row/column counts: +20
- Shows data sample: +20

### Negative Signals (-points):
- Mentions "create" or "generate": -30
- Asks "how to" (tutorial): -20
- Past tense (already done): -15

## Activation Threshold

```
Total Score >= 50: ACTIVATE with high confidence
Total Score 30-49: ACTIVATE with medium confidence (ask confirmation)
Total Score < 30: DON'T ACTIVATE (not enough signals)
```

## Example Scoring

Input: "Can you check if my sales data has any quality issues?"

Calculation:
- "check": +25
- "quality": +20
- "data": implicit
- "issues": +15
- Total: 60 points

Decision: ✅ ACTIVATE (high confidence)

---

Input: "How do I check data quality in pandas?"

Calculation:
- "check": +25
- "quality": +20
- "how do I" (tutorial): -20
- No file present: 0
- Total: 25 points

Decision: ❌ DON'T ACTIVATE (tutorial request, not action)
```

---

## 🎓 Best Practices

### ✅ Do's

1. **Be Specific**
   ```markdown
   ❌ Trigger: User asks about data
   ✅ Trigger: User says "analyze" + mentions CSV/data + wants insights
   ```

2. **Include Examples**
   ```markdown
   ## Triggers
   Examples that SHOULD activate:
   - "What are the top 5 products?"
   - "Show me sales trends"
   
   Examples that should NOT activate:
   - "How do I calculate trends?" (tutorial)
   - "Tell me about trend analysis" (information)
   ```

3. **Consider User Intent**
   ```markdown
   Same words, different intent:
   - "Review this code" → code-reviewer ✅
   - "Review this article" → content-reviewer ✅
   - "Review our meeting notes" → note-summarizer ✅
   ```

4. **Test Edge Cases**
   ```markdown
   Test these specifically:
   - Negations: "don't analyze yet"
   - Questions: "should I analyze?"
   - Conditionals: "if valid, then analyze"
   - Ambiguous: "check this"
   ```

### ❌ Don'ts

1. **Don't Be Vague**
   ```markdown
   ❌ Trigger: When relevant
   ❌ Trigger: If user needs help
   ❌ Trigger: For data tasks
   ```

2. **Don't Overlap Without Disambiguation**
   ```markdown
   ❌ Skill A: Trigger on "review"
      Skill B: Trigger on "review"
   
   ✅ Skill A: Review code (when code present)
      Skill B: Review text (when prose/document present)
   ```

3. **Don't Ignore Context**
   ```markdown
   ❌ Trigger: User mentions "Python"
   ✅ Trigger: User mentions "Python" + has code-related question
   ```

4. **Don't Create Catch-All Triggers**
   ```markdown
   ❌ Trigger: Any question about data
   ✅ Trigger: Specific data analysis requests with data present
   ```

---

## 🧩 Exercises

### Exercise 1: Fix These Bad Triggers

```markdown
# BAD SKILL: Helper

## Triggers
- When user needs help
- User asks questions
- When appropriate

TASK: Rewrite as specific triggers for "Python Debugging Helper"
```

<details>
<summary>Solution</summary>

```markdown
# SKILL: Python Debugging Helper

## Triggers

### Activate When:
1. User provides Python code + error message/traceback
2. User says "debug", "fix", "what's wrong" + Python context
3. User describes unexpected behavior in Python code

### Specific Phrases:
- "Why does this Python code..."
- "Getting [error name] when I run..."
- "This Python function isn't working"

### Required Context:
- Python code visible OR
- Python error message present OR
- Conversation about Python code

### Don't Activate For:
- General Python questions (→ python-tutor)
- Writing new code (→ code-generator)
- Code review without errors (→ code-reviewer)
```
</details>

---

### Exercise 2: Create Disambiguation Logic

Two skills might both activate. Write disambiguation logic:

```
Skill A: Email Responder (drafts email replies)
Skill B: Email Summarizer (summarizes email threads)

Input: "Help me with this email thread"
```

<details>
<summary>Solution</summary>

```markdown
## Disambiguation Logic

### Email Thread Present → Ask clarification:

"I can help you with this email thread in a few ways:
1. 📝 Draft a response
2. 📊 Summarize the conversation
3. 🔍 Extract action items

What would be most helpful?"

### If user says "respond" or "reply" → Email Responder
### If user says "summarize" or "overview" → Email Summarizer
### If user says "action items" → Email Analyzer (different skill)
```
</details>

---

## 📊 Trigger Effectiveness Checklist

Use this to evaluate your triggers:

```markdown
Skill Name: _________________

Trigger Clarity:
□ Triggers are specific (not vague)
□ Include positive examples
□ Include negative examples (anti-triggers)
□ Address edge cases

Precision:
□ Won't activate on unrelated queries
□ Won't conflict with other skills
□ Includes disambiguation strategy
□ Considers user intent, not just keywords

Recall:
□ Will activate on all relevant queries
□ Considers different phrasings
□ Accounts for implicit requests
□ Handles follow-up context

Testing:
□ Have 5+ test cases
□ Tested edge cases
□ Tested against similar skills
□ Real users tested (if possible)

Score: ___/16

12-16: Excellent
8-11: Good, minor improvements needed
4-7: Needs significant refinement
0-3: Start over with clearer triggers
```

---

## 🚀 Next Steps

Now that you understand triggers:

1. ✅ Review your existing skills' triggers
2. ✅ Add specific examples
3. ✅ Test with edge cases
4. ✅ Create disambiguation strategies

👉 **Next Module**: [3.4 - Proyecto Práctico: Skill de Análisis](04-proyecto-skill-datos.md)

---

**Tiempo estimado**: 60 minutos  
**Dificultad**: ⭐⭐⭐ Intermedio-Avanzado  
**Importancia**: 🔥🔥🔥 CRÍTICA - Este módulo determina si tus skills funcionan o no
