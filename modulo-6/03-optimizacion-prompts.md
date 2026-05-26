# 6.3 - Optimización de Prompts para Agentes y Skills

> Cómo maximizar la efectividad de tus agentes con prompt engineering avanzado

---

## 🎯 ¿Por Qué Optimizar?

**El problema**: Un prompt mal optimizado puede:
- 🐌 Generar respuestas lentas y costosas
- 🎲 Producir resultados inconsistentes
- 🔄 Requerir múltiples intentos
- 💸 Desperdiciar tokens (dinero)

**La solución**: Optimización sistemática

---

## 📏 Principios de Optimización

### 1. Claridad > Longitud

```markdown
❌ MAL (Vago y largo):
"You are a helpful assistant that helps users with various tasks and 
tries to provide good answers when they ask questions about different 
topics and should be friendly and professional while doing so and also 
make sure to give detailed responses when needed but also be concise 
when that's more appropriate..."

✅ BIEN (Claro y conciso):
"You are a data analyst. Provide statistical insights from datasets.
Be precise with numbers. Explain methodology briefly."
```

**Regla**: Si puedes decirlo en 10 palabras, no uses 50.

---

### 2. Estructura > Párrafos

```markdown
❌ MAL (Párrafo denso):
When analyzing data you should first load it and check for issues then 
calculate statistics and look for patterns and after that generate 
insights and finally create a report with your findings.

✅ BIEN (Estructurado):
## Analysis Process
1. Load and validate data
2. Calculate statistics
3. Identify patterns
4. Generate insights
5. Create report
```

**Regla**: Usa listas, headers, y separadores visuales.

---

### 3. Ejemplos > Explicaciones

```markdown
❌ MAL (Solo descripción):
"Provide concise summaries that capture the main points"

✅ BIEN (Con ejemplo):
"Provide concise summaries:

Input: [500 word article]
Output: 
SUMMARY: [2-3 sentences capturing main points]
KEY POINTS:
- Point 1
- Point 2"
```

**Regla**: Un ejemplo vale más que mil palabras de explicación.

---

## 🔧 Técnicas de Optimización

### Técnica 1: Token Reduction

**Objetivo**: Reducir tokens sin perder funcionalidad

#### Antes (150 tokens):
```markdown
You are an expert Python developer with many years of experience in 
writing clean, efficient, and maintainable code. When users share their 
Python code with you, you should carefully review it looking for any 
potential bugs, performance issues, code style problems, or areas where 
the code could be improved. You should explain your findings in a clear 
and educational manner, always being professional and helpful.
```

#### Después (50 tokens):
```markdown
Expert Python developer. Review code for:
- Bugs
- Performance issues  
- Style (PEP 8)
- Improvements

Explain findings clearly and educationally.
```

**Ahorro**: 66% de tokens

---

### Técnica 2: Front-Loading Critical Info

**Colocar información importante al inicio**

```markdown
❌ MAL (Reglas importantes al final):
You are a customer support agent. Be helpful and friendly. Try to 
resolve issues. Make customers happy. Ask clarifying questions.

IMPORTANT: Never promise refunds without manager approval. Never share 
customer data. Always log interactions.

✅ BIEN (Reglas críticas primero):
# CRITICAL RULES
1. NEVER promise refunds without manager approval
2. NEVER share customer data
3. ALWAYS log all interactions

# Role
Customer support agent: helpful, friendly, solution-focused.
```

**Por qué**: Los modelos priorizan información temprana en el prompt.

---

### Técnica 3: Formato XML para Secciones Complejas

**Para información muy estructurada**

```markdown
✅ EXCELENTE (XML estructurado):
<agent>
  <identity>Data Analyst specializing in business intelligence</identity>
  
  <capabilities>
    <capability name="statistical_analysis" confidence="high"/>
    <capability name="data_visualization" confidence="high"/>
    <capability name="forecasting" confidence="medium"/>
  </capabilities>
  
  <rules>
    <rule type="critical">Always cite data sources</rule>
    <rule type="critical">Never fabricate statistics</rule>
    <rule type="preference">Prefer visualizations over tables</rule>
  </rules>
</agent>
```

**Ventaja**: Parsing más fácil para el modelo, estructura clara.

---

### Técnica 4: Delimitadores Consistentes

**Usar separadores visuales únicos**

```markdown
✅ BIEN:
=== AGENT CONFIGURATION ===

[content]

=== SKILLS ===

[skills content]

=== EXAMPLES ===

[examples]
```

**Por qué**: Ayuda al modelo a segmentar información.

---

### Técnica 5: Negative Prompting

**Decir qué NO hacer cuando es crítico**

```markdown
## What NOT to do:

❌ NEVER make up statistics or data
❌ NEVER skip data validation
❌ NEVER ignore outliers without noting them
❌ NEVER use complex jargon without explanation

## What to do instead:

✅ State when data is insufficient
✅ Always validate before analyzing
✅ Highlight outliers and explain them
✅ Use simple language, explain technical terms
```

---

## 🎨 Patrones de Optimización Avanzada

### Pattern 1: Chain-of-Thought Prompting

**Forzar razonamiento paso a paso**

```markdown
# SKILL: Complex Problem Solver

## Process
When solving complex problems, ALWAYS think through these steps explicitly:

Step 1: UNDERSTAND
- What is being asked?
- What information do I have?
- What information is missing?

Step 2: PLAN
- What approach will I use?
- What are the steps?
- What could go wrong?

Step 3: EXECUTE
- [Perform the task]

Step 4: VERIFY
- Does the answer make sense?
- Did I address the question fully?
- Are there edge cases?

Show your reasoning for each step.
```

**Ejemplo de uso**:
```
User: "Calculate the ROI of our marketing campaign"

Agent: 
Step 1: UNDERSTAND
- Need: ROI calculation
- Have: Campaign cost, revenue data (assuming from context)
- Missing: Time period, baseline revenue

Let me ask: What time period and do you have baseline revenue?
```

---

### Pattern 2: Role-Based Optimization

**Múltiples "sub-roles" según contexto**

```markdown
# AGENT: Business Analyst

## Context-Adaptive Roles

When user asks about FINANCES:
  → Activate: Financial Analyst persona
  → Focus: ROI, costs, profitability
  → Tone: Precise, number-focused

When user asks about CUSTOMERS:
  → Activate: Customer Insights Analyst persona
  → Focus: Behavior, segments, satisfaction
  → Tone: Empathetic, data-driven

When user asks about OPERATIONS:
  → Activate: Process Analyst persona
  → Focus: Efficiency, bottlenecks, optimization
  → Tone: Practical, action-oriented

## Selection Logic
Detect topic from:
- Keywords (revenue→Finance, churn→Customer, workflow→Operations)
- Context (previous questions)
- Explicit request ("from a financial perspective...")
```

---

### Pattern 3: Confidence Calibration

**Enseñar al agente a comunicar incertidumbre**

```markdown
## Confidence Levels

Express certainty appropriately:

### HIGH CONFIDENCE (90%+):
"The data clearly shows..."
"Definitely..."
"This is certain because..."

### MEDIUM CONFIDENCE (60-90%):
"The data suggests..."
"Likely..."
"This appears to indicate..."

### LOW CONFIDENCE (<60%):
"The data might suggest..."
"Possibly..."
"There's insufficient data, but..."

### NO CONFIDENCE:
"I don't have enough data to determine..."
"This would require more information..."

## When to express doubt:
- Small sample sizes (<30 data points)
- High variance in data
- Extrapolating beyond data range
- Multiple competing explanations
```

---

### Pattern 4: Self-Correction Prompting

**Habilitar autocorrección**

```markdown
## Self-Check Protocol

After generating a response, ALWAYS perform these checks:

1. **Accuracy Check**
   - Are all numbers correct?
   - Are sources cited properly?
   - Any contradictions?

2. **Completeness Check**
   - Did I answer all parts of the question?
   - Did I provide enough context?
   - Are there important caveats?

3. **Clarity Check**
   - Is this understandable to the target audience?
   - Are technical terms explained?
   - Is structure logical?

If any check fails:
- Note the issue
- Provide corrected version
- Explain what was wrong

Example:
"Wait, I need to correct something in my previous response. I stated 
the average was 45%, but checking my calculation, it's actually 42%. 
The error was [explain]. Here's the corrected analysis..."
```

---

## 📊 Optimización por Casos de Uso

### Caso 1: Agente de Alta Precisión (Médico, Legal, Financiero)

```markdown
# OPTIMIZATION FOR HIGH-STAKES DOMAINS

## Priority: Accuracy > Speed

### Mandatory Steps:
1. Verify information from multiple angles
2. State confidence level explicitly
3. Cite sources when making claims
4. Include disclaimers
5. Flag when uncertain

### Response Structure:
```
ANSWER: [Direct answer with confidence level]

REASONING: [How you arrived at this answer]

SOURCES: [What information you used]

CAVEATS: [Limitations, what to verify independently]

DISCLAIMER: [Appropriate legal/medical/financial disclaimer]
```

### Example:
User: "Is this investment a good idea?"

Response:
```
ANSWER: Based on available data, this shows MODERATE risk with 
MEDIUM-HIGH potential return. Confidence: MEDIUM (60%)

REASONING:
- Historical performance: +12% annually (5 year average)
- Market conditions: Currently volatile
- Diversification: Would add sector exposure you lack

CAVEATS:
- Past performance doesn't guarantee future results
- My analysis is based on public data only
- Market conditions can change rapidly

DISCLAIMER: I'm an AI assistant, not a licensed financial advisor. 
Consult with a certified financial professional before making 
investment decisions.
```
```

---

### Caso 2: Agente de Alta Velocidad (Chat, Support)

```markdown
# OPTIMIZATION FOR SPEED

## Priority: Quick, helpful responses

### Characteristics:
- Shorter responses by default
- Front-load the answer
- Details only if asked
- Friendly, conversational tone

### Response Pattern:
```
[DIRECT ANSWER - 1 sentence]

[BRIEF CONTEXT - 1-2 sentences if needed]

[OPTIONAL] More details available if needed.
```

### Example:
User: "How do I reset my password?"

❌ SLOW Response:
"Thank you for contacting support. Password resets are a common 
operation that we can help you with. There are several methods 
available depending on your situation and access level..."

✅ FAST Response:
"Click 'Forgot Password' on the login page. You'll get an email 
with a reset link.

Need help if you don't have email access?"
```

---

### Caso 3: Agente Educativo (Tutor, Explicador)

```markdown
# OPTIMIZATION FOR LEARNING

## Priority: Understanding > Brevity

### Teaching Principles:
1. Start simple, build complexity
2. Use analogies and examples
3. Check understanding
4. Encourage questions
5. Adapt to learner level

### Response Structure:
```
SIMPLE EXPLANATION: [High-level concept]

DETAILED EXPLANATION: [How it works]

ANALOGY: [Real-world comparison]

EXAMPLE: [Concrete instance]

CHECK: [Question to verify understanding]
```

### Example:
User: "What is recursion?"

Response:
```
SIMPLE EXPLANATION:
Recursion is when a function calls itself.

DETAILED EXPLANATION:
A function solves a problem by:
1. Solving a smaller version of the same problem
2. Combining small solutions into the final answer
3. Having a "base case" where it stops

ANALOGY:
Like Russian nesting dolls - each doll contains a smaller version 
of itself, until you reach the smallest one.

EXAMPLE:
Calculating factorial:
- factorial(5) = 5 × factorial(4)
- factorial(4) = 4 × factorial(3)
- ...until...
- factorial(1) = 1 (base case)

Does this make sense? What would factorial(3) be?
```
```

---

## 🧪 Testing & Iteration

### Framework de Testing

```markdown
## Optimization Testing Protocol

### 1. Define Success Metrics
- Response accuracy: >95%
- Response time: <5 seconds
- Token usage: <2000 tokens average
- User satisfaction: >4/5 rating

### 2. Create Test Suite
Minimum 20 test cases covering:
- Common queries (50%)
- Edge cases (30%)
- Error conditions (20%)

### 3. Baseline Measurement
Run test suite with current prompt.
Record: accuracy, tokens, time, quality

### 4. Optimize
Make ONE change at a time:
- Reduce wordiness
- Add examples
- Restructure
- Add constraints

### 5. Re-test
Run same test suite.
Compare metrics.

### 6. Keep or Revert
If improvement: keep change
If regression: revert change

### 7. Repeat
Continue optimization cycle.
```

---

### A/B Testing Example

```markdown
## A/B Test: Skill Trigger Optimization

### Version A (Original):
Triggers:
- User asks about data
- User mentions analysis

### Version B (Optimized):
Triggers:
- User says "analyze" + ["data", "csv", "numbers"]
- User uploads data file
- User asks for statistics or trends

### Test Results:
| Metric | Version A | Version B |
|--------|-----------|-----------|
| Precision | 65% | 92% |
| Recall | 88% | 85% |
| F1 Score | 75% | 88% |

### Decision: ✅ Adopt Version B
Reasoning: Higher precision worth slight recall drop.
Fewer false activations = better UX.
```

---

## 💡 Pro Tips

### Tip 1: Use Prompt Variables

```markdown
# AGENT: {AGENT_NAME}

Role: {ROLE_DESCRIPTION}
Expertise: {DOMAIN}

When user asks about {TOPIC}:
- Focus on {FOCUS_AREAS}
- Avoid {AVOID_TOPICS}
```

**Ventaja**: Fácil crear variaciones sin reescribir todo.

---

### Tip 2: Versioning Strategy

```markdown
---
version: 2.1.0
previous_version: 2.0.3
changes:
  - Reduced prompt length by 30%
  - Added example for edge case
  - Clarified trigger conditions
performance:
  accuracy: 94% (was 91%)
  avg_tokens: 1800 (was 2600)
tested_date: 2026-05-15
---

# AGENT: ...
```

---

### Tip 3: Prompt Debugging

```markdown
## Debug Mode Instructions

When {DEBUG_FLAG} is set, provide:

1. **Decision Log**:
   "I activated Skill X because [reasoning]"

2. **Confidence Score**:
   "Confidence in this answer: 85%"

3. **Alternatives Considered**:
   "Also considered Skill Y, but rejected because [reason]"

4. **Token Count**:
   "This response used ~500 tokens"
```

---

## 📈 Antes/Después: Caso Real

### ANTES (Ineficiente)

```markdown
# AGENT: Customer Support Helper

You are a helpful customer support agent who works for an e-commerce 
company. Your job is to help customers with their questions, issues, 
and concerns. You should always be polite, professional, and try your 
best to resolve their problems. If a customer is upset, try to 
empathize with them and understand their frustration. When answering 
questions, make sure to provide accurate information. If you don't 
know something, it's okay to say so and offer to find out or 
escalate to a human agent. Remember to always follow company policies 
and never promise things you can't deliver. Be patient with customers 
who might be confused or frustrated. Try to make their experience as 
positive as possible.

[Continues for 500+ words...]

**Issues**:
- 850 tokens
- Vague instructions
- No structure
- No examples
```

---

### DESPUÉS (Optimizado)

```markdown
# AGENT: E-commerce Support

## Identity
Customer support for [Company]. Resolve issues efficiently and kindly.

## Critical Rules
1. NEVER promise refunds >$50 without approval
2. ALWAYS verify account before sharing order details
3. MUST log all interactions

## Workflow
1. Greet briefly
2. Identify issue
3. Verify account if needed
4. Resolve or escalate
5. Confirm satisfaction

## Tone
- Empathetic but efficient
- Professional but warm
- Solution-focused

## Escalate When
- Refund request >$50
- Legal threat
- Technical issue beyond scope
- Customer requests manager

## Example Response
User: "My order never arrived!"

Agent: "I'm sorry to hear that. Let me help you track it down. 
Can you share your order number?

[After verification]

I see your order #12345. It shows delivered on [date], but I 
understand you didn't receive it. I'm processing a replacement 
to ship today. You'll get tracking in 1 hour.

Anything else I can help with?"

**Improvements**:
- 180 tokens (78% reduction)
- Clear structure
- Specific rules
- Concrete example
- Better performance (tested)
```

---

## ✅ Optimization Checklist

Usa esto para optimizar cualquier agente/skill:

```markdown
□ Removed unnecessary words/phrases
□ Structured with headers and lists
□ Front-loaded critical information
□ Added concrete examples
□ Specified what NOT to do
□ Used clear delimiters
□ Included confidence guidelines
□ Added self-check steps
□ Tested with real queries
□ Measured token reduction
□ Verified accuracy maintained
□ Documented changes
```

---

## 🎯 Next Steps

1. **Toma un agente existente**
2. **Aplica estas técnicas**
3. **Mide mejoras** (tokens, precisión, velocidad)
4. **Itera** hasta optimizar

**Meta razonable**: 30-50% reducción de tokens sin perder calidad.

---

**Tiempo estimado**: 90 minutos  
**Dificultad**: ⭐⭐⭐⭐ Avanzado  
**Impacto**: 🚀 ALTO - Ahorro de costos y mejor rendimiento
