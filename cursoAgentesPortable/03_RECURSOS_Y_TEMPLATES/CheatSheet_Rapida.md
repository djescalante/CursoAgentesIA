# 📋 Cheatsheet: Agentes y Skills

> Referencia rápida para crear y usar agentes y skills

---

## 🚀 Quick Start

### Crear un Agente Básico

```markdown
# AGENT: [Nombre]

## Identity
You are [nombre], a [rol] that [propósito].

## Personality
- Tone: [formal/casual/técnico]
- Style: [directo/educativo/amigable]

## Capabilities
- [Capacidad 1]
- [Capacidad 2]

## Behavior
1. [Regla de comportamiento 1]
2. [Regla de comportamiento 2]
```

### Crear un Skill Básico

```markdown
# SKILL: [Nombre]

## Description
[Qué hace en 1-2 oraciones]

## Triggers
- [Cuándo usarlo 1]
- [Cuándo usarlo 2]

## Process
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

## Output
[Qué retorna]
```

---

## 📝 Templates Rápidos

### Agente de Soporte

```markdown
# AGENT: Customer Support Assistant

## Identity
You are SupportBot, a friendly customer service agent that helps users with their questions and issues.

## Personality
- Empathetic and patient
- Clear communicator
- Problem-solver focused

## Capabilities
- Answer FAQs
- Look up order status
- Create support tickets
- Escalate complex issues

## Behavior
1. Always greet warmly
2. Listen actively to user concerns
3. Provide clear solutions
4. Follow up on unresolved issues
```

### Skill de Análisis

```markdown
# SKILL: Data Analyzer

## Description
Analyzes datasets and provides statistical insights.

## Triggers
- User uploads data file (.csv, .xlsx)
- User asks for "analysis" or "statistics"
- User requests data quality check

## Process
1. Load and validate data
2. Detect column types
3. Calculate statistics
4. Identify anomalies
5. Generate report

## Output
Statistical summary with insights and recommendations.
```

---

## 🎯 Secciones Esenciales

### Para Agentes

| Sección | Propósito | Ejemplo |
|---------|-----------|---------|
| **Identity** | Define quién es | "You are PyDev, an expert Python developer" |
| **Personality** | Cómo se comporta | "Professional but approachable" |
| **Capabilities** | Qué puede hacer | "Code review, debugging, optimization" |
| **Guidelines** | Reglas de operación | "Always explain the 'why' behind suggestions" |
| **Limitations** | Qué NO puede hacer | "Does not write production code without review" |

### Para Skills

| Sección | Propósito | Ejemplo |
|---------|-----------|---------|
| **Description** | Resumen breve | "Extracts text from PDF files" |
| **Triggers** | Cuándo activarse | "User uploads .pdf file" |
| **Inputs** | Qué necesita | "file_path (string, required)" |
| **Process** | Cómo funciona | "1. Load PDF, 2. Extract text, 3. Clean" |
| **Outputs** | Qué retorna | "Extracted text + metadata" |
| **Errors** | Manejo de errores | "FILE_NOT_FOUND: Verify path" |

---

## 🔧 Código de Integración

### Python + OpenAI

```python
import openai

# Cargar configuración
with open('agent.md') as f:
    agent_config = f.read()

# Usar
client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": agent_config},
        {"role": "user", "content": "Tu pregunta aquí"}
    ]
)

print(response.choices[0].message.content)
```

### Python + Anthropic Claude

```python
import anthropic

# Cargar configuración
with open('agent.md') as f:
    agent_config = f.read()

# Usar
client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    system=agent_config,
    messages=[
        {"role": "user", "content": "Tu pregunta aquí"}
    ]
)

print(message.content)
```

### Combinar Agente + Skills

```python
def load_file(path):
    with open(path) as f:
        return f.read()

# Cargar todo
agent = load_file('agents/assistant.md')
skill1 = load_file('skills/analyzer.md')
skill2 = load_file('skills/reporter.md')

# Combinar
system_prompt = f"""
{agent}

# Available Skills:

## Skill 1:
{skill1}

## Skill 2:
{skill2}
"""

# Usar con cualquier API
response = api.complete(system=system_prompt, user="mensaje")
```

---

## 🎨 Patrones Comunes

### 1. Agente Especializado

```markdown
# AGENT: [Dominio] Expert

## Identity
Expert in [dominio específico] with [X] years of experience.

## Expertise
- [Área 1]
- [Área 2]
- [Área 3]

## Communication Style
- Technical but accessible
- Uses examples
- Cites sources when relevant

## Approach
1. Understand user's level
2. Provide tailored explanations
3. Suggest next steps
```

### 2. Skill de Procesamiento

```markdown
# SKILL: [Tipo] Processor

## Description
Processes [tipo de dato] to [objetivo].

## Triggers
- Input matches [formato]
- User requests [acción]

## Inputs
- data: [tipo] (required)
- options: [config] (optional)

## Process
1. Validate input
2. Transform data
3. Apply operations
4. Format output

## Output
Processed [tipo de resultado]

## Errors
- INVALID_INPUT: Check format
- PROCESSING_ERROR: Retry with smaller batch
```

### 3. Agente Conversacional

```markdown
# AGENT: Conversational Assistant

## Personality
- Friendly and warm
- Patient listener
- Encouraging

## Conversation Flow
1. Greet naturally
2. Ask clarifying questions
3. Provide thoughtful responses
4. Check for understanding

## Memory
- Remember user preferences
- Reference previous context
- Maintain conversation thread
```

---

## 🔍 Debugging Tips

### Problema: Agente no usa el skill

**Solución:**
```markdown
# En el skill, hacer triggers MÁS ESPECÍFICOS

## Triggers
❌ - User asks about data
✅ - User says "analyze", "check", or "review" + "csv"/"data"/"file"
✅ - File with .csv extension is uploaded
```

### Problema: Respuestas inconsistentes

**Solución:**
```markdown
# En el agente, agregar ejemplos

## Examples

### Good Response
User: "Explain X"
Assistant: [ejemplo de buena respuesta]

### Bad Response to Avoid
User: "Explain X"  
Assistant: [ejemplo de mala respuesta]
```

### Problema: Agente ignora instrucciones

**Solución:**
```markdown
# Usar estructura más clara y imperativa

## CRITICAL RULES
1. ALWAYS [regla importante]
2. NEVER [prohibición importante]
3. MUST [requisito obligatorio]

## Priority Order
1. Safety first
2. Then accuracy
3. Then helpfulness
```

---

## 📊 Métricas y Testing

### Evaluar un Agente

```python
test_cases = [
    {
        "input": "Review this code: def add(a,b): return a+b",
        "expected_contains": ["spacing", "type hints"],
        "expected_not_contains": ["syntax error"]
    },
    {
        "input": "Explain recursion",
        "expected_contains": ["function calls itself", "base case"],
        "min_length": 100
    }
]

def test_agent(agent, test_cases):
    results = []
    for test in test_cases:
        response = agent.chat(test["input"])
        
        passed = True
        if "expected_contains" in test:
            passed &= all(x in response.lower() for x in test["expected_contains"])
        if "expected_not_contains" in test:
            passed &= all(x not in response.lower() for x in test["expected_not_contains"])
        if "min_length" in test:
            passed &= len(response) >= test["min_length"]
        
        results.append({"test": test["input"], "passed": passed})
    
    return results
```

---

## 🎯 Casos de Uso por Industria

### Tech/Desarrollo

```markdown
Agentes: Code Assistant, DevOps Helper, API Designer
Skills: Code Review, Test Generator, Deployment Automation
```

### Negocios/Análisis

```markdown
Agentes: Business Analyst, Market Researcher, Report Writer
Skills: Data Analysis, Trend Detection, Executive Summary
```

### Educación

```markdown
Agentes: Tutor, Study Buddy, Assignment Helper
Skills: Concept Explainer, Quiz Generator, Progress Tracker
```

### Soporte

```markdown
Agentes: Support Agent, FAQ Bot, Troubleshooter
Skills: Ticket Creator, Knowledge Base Search, Issue Escalator
```

---

## 🚨 Errores Comunes

### ❌ No hacer esto

```markdown
# AGENT: Helper

I help with stuff.
```

**Problema:** Demasiado vago

### ✅ Hacer esto

```markdown
# AGENT: Python Development Assistant

## Identity
You are PyDev, an expert Python developer specializing in:
- Code review and optimization
- Debugging and error resolution
- Best practices and PEP compliance

## Approach
1. Analyze code thoroughly
2. Provide specific, actionable feedback
3. Explain reasoning behind suggestions
```

---

### ❌ No hacer esto

```markdown
# SKILL: Analyzer

Analyzes things when user asks.
```

**Problema:** No especifica qué analiza ni cómo

### ✅ Hacer esto

```markdown
# SKILL: CSV Data Analyzer

## Description
Analyzes CSV files to detect structure, calculate statistics,
and identify data quality issues.

## Triggers
- User uploads .csv file
- User says "analyze this data" or "check data quality"

## Process
1. Load CSV with encoding detection
2. Detect column types automatically
3. Calculate descriptive statistics
4. Check for missing values, duplicates, outliers
5. Generate comprehensive report

## Output
JSON with structure, stats, quality score, and recommendations
```

---

## 🔗 Links Útiles

- [Templates completos](../templates/)
- [Ejemplos reales](../ejemplos/)
- [Guía de implementación](guia-implementacion.md)
- [Proyecto final](../modulo-7/)

---

## 💡 Tips Finales

1. **Empieza simple**: Un agente básico + 1-2 skills
2. **Itera**: Mejora basándote en resultados reales
3. **Documenta**: Cada decisión de diseño
4. **Testea**: Con casos reales, no solo ejemplos
5. **Versiona**: Usa Git para rastrear cambios

---

## 📚 Plantilla Mínima Funcional

### Agente Mínimo

```markdown
# AGENT: [Nombre]

You are [identidad y rol].

Personality: [tono y estilo]

Capabilities:
- [Cap 1]
- [Cap 2]

Rules:
1. [Regla 1]
2. [Regla 2]
```

### Skill Mínimo

```markdown
# SKILL: [Nombre]

Description: [Qué hace]

Triggers:
- [Trigger 1]
- [Trigger 2]

Process:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

Output: [Qué retorna]
```

---

**Última actualización**: 2026-05-16  
**Versión**: 1.0
