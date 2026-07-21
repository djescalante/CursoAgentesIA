/**
 * Recursos del curso.
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.resources = [
    {
      id: `cheatsheet`,
      title: `📋 Cheatsheet Rápida`,
      description: `Referencia rápida para crear y usar agentes y skills`,
      icon: `📄`,
      tag: `Referencia`,
      content: `# 📋 Cheatsheet: Agentes y Skills

> Referencia rápida para crear y usar agentes y skills

---

## 🚀 Quick Start

### Crear un Agente Básico

\`\`\`markdown
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
\`\`\`

### Crear un Skill Básico

\`\`\`markdown
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
\`\`\`

---

## 📝 Templates Rápidos

### Agente de Soporte

\`\`\`markdown
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
\`\`\`

### Skill de Análisis

\`\`\`markdown
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
\`\`\`

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

\`\`\`python
import openai

# Cargar configuración
with open('agent.md') as f:
    agent_config = f.read()

# Usar
client = openai.OpenAI()
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": agent_config},
        {"role": "user", "content": "Tu pregunta aquí"}
    ]
)

print(response.choices[0].message.content)
\`\`\`

### Python + Anthropic Claude

\`\`\`python
import anthropic

# Cargar configuración
with open('agent.md') as f:
    agent_config = f.read()

# Usar
client = anthropic.Anthropic()
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    system=agent_config,
    messages=[
        {"role": "user", "content": "Tu pregunta aquí"}
    ]
)

print(message.content)
\`\`\`

### Combinar Agente + Skills

\`\`\`python
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
\`\`\`

---

## 🎨 Patrones Comunes

### 1. Agente Especializado

\`\`\`markdown
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
\`\`\`

### 2. Skill de Procesamiento

\`\`\`markdown
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
\`\`\`

### 3. Agente Conversacional

\`\`\`markdown
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
\`\`\`

---

## 🔍 Debugging Tips

### Problema: Agente no usa el skill

**Solución:**
\`\`\`markdown
# En el skill, hacer triggers MÁS ESPECÍFICOS

## Triggers
❌ - User asks about data
✅ - User says "analyze", "check", or "review" + "csv"/"data"/"file"
✅ - File with .csv extension is uploaded
\`\`\`

### Problema: Respuestas inconsistentes

**Solución:**
\`\`\`markdown
# En el agente, agregar ejemplos

## Examples

### Good Response
User: "Explain X"
Assistant: [ejemplo de buena respuesta]

### Bad Response to Avoid
User: "Explain X"  
Assistant: [ejemplo de mala respuesta]
\`\`\`

### Problema: Agente ignora instrucciones

**Solución:**
\`\`\`markdown
# Usar estructura más clara y imperativa

## CRITICAL RULES
1. ALWAYS [regla importante]
2. NEVER [prohibición importante]
3. MUST [requisito obligatorio]

## Priority Order
1. Safety first
2. Then accuracy
3. Then helpfulness
\`\`\`

---

## 📊 Métricas y Testing

### Evaluar un Agente

\`\`\`python
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
\`\`\`

---

## 🎯 Casos de Uso por Industria

### Tech/Desarrollo

\`\`\`markdown
Agentes: Code Assistant, DevOps Helper, API Designer
Skills: Code Review, Test Generator, Deployment Automation
\`\`\`

### Negocios/Análisis

\`\`\`markdown
Agentes: Business Analyst, Market Researcher, Report Writer
Skills: Data Analysis, Trend Detection, Executive Summary
\`\`\`

### Educación

\`\`\`markdown
Agentes: Tutor, Study Buddy, Assignment Helper
Skills: Concept Explainer, Quiz Generator, Progress Tracker
\`\`\`

### Soporte

\`\`\`markdown
Agentes: Support Agent, FAQ Bot, Troubleshooter
Skills: Ticket Creator, Knowledge Base Search, Issue Escalator
\`\`\`

---

## 🚨 Errores Comunes

### ❌ No hacer esto

\`\`\`markdown
# AGENT: Helper

I help with stuff.
\`\`\`

**Problema:** Demasiado vago

### ✅ Hacer esto

\`\`\`markdown
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
\`\`\`

---

### ❌ No hacer esto

\`\`\`markdown
# SKILL: Analyzer

Analyzes things when user asks.
\`\`\`

**Problema:** No especifica qué analiza ni cómo

### ✅ Hacer esto

\`\`\`markdown
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
\`\`\`

---

## 🔗 Links Útiles

- [Templates completos](../templates/)
- [Ejemplos reales](../ejemplos/)
- [Guía de implementación](#recursos)
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

\`\`\`markdown
# AGENT: [Nombre]

You are [identidad y rol].

Personality: [tono y estilo]

Capabilities:
- [Cap 1]
- [Cap 2]

Rules:
1. [Regla 1]
2. [Regla 2]
\`\`\`

### Skill Mínimo

\`\`\`markdown
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
\`\`\`

---

**Última actualización**: 2026-05-16  
**Versión**: 1.0
`
    },
    {
      id: `faq`,
      title: `❓ Preguntas Frecuentes`,
      description: `Respuestas a las dudas más comunes y problemas frecuentes`,
      icon: `❓`,
      tag: `Soporte`,
      content: `# ❓ FAQ - Preguntas Frecuentes sobre Agentes y Skills

> Respuestas a las preguntas más comunes

---

## 📚 Conceptos Básicos

### ¿Qué es exactamente un archivo .md de agente?

Es un archivo de texto en formato Markdown que **describe el comportamiento, personalidad y capacidades** de un agente de IA. Piénsalo como un "manual de instrucciones" que le dice al modelo de lenguaje (GPT, Claude, Gemini, etc.) cómo debe comportarse.

**No es código ejecutable**, es una configuración que se carga como parte del "prompt del sistema" en una API de IA.

---

### ¿Cómo "se ejecuta" un archivo .md?

No se ejecuta directamente. El flujo es:

1. Tu código **lee** el archivo .md
2. El contenido se **incluye** en el prompt del sistema
3. Se **envía** a la API de IA junto con el mensaje del usuario
4. El modelo de IA **usa esas instrucciones** para generar la respuesta

\`\`\`python
# Ejemplo simplificado
agent_instructions = read_file('agent.md')  # Leer
api.call(system=agent_instructions, user="Hola")  # Usar
\`\`\`

---

### ¿Cuál es la diferencia entre un agente y un skill?

| Aspecto | Agente | Skill |
|---------|--------|-------|
| **Qué es** | Un "personaje" completo con personalidad | Una capacidad específica |
| **Alcance** | Sistema completo | Tarea puntual |
| **Ejemplo** | "Asistente de Python" | "Revisar código Python" |
| **Contiene** | Personalidad + múltiples skills | Solo proceso de una tarea |
| **Analogía** | Chef completo | Receta específica |

---

### ¿Puedo usar estos archivos sin programar?

Sí y no:

**Sin código**: Puedes usar los archivos .md directamente en algunas plataformas:
- ChatGPT (copiar/pegar en "Custom Instructions")
- Claude (en la sección de "Project Knowledge")
- Algunas herramientas no-code de IA

**Con código**: Para usar todo el potencial (cambiar skills dinámicamente, automatizar, integrar en apps), necesitas programación básica.

---

## 🛠️ Implementación

### ¿Qué API de IA debo usar?

Depende de tus necesidades:

**OpenAI (GPT-4o y sucesores)**
- ✅ Excelente rendimiento general
- ✅ Documentación extensa
- ✅ Gran ecosistema
- ❌ Puede ser costoso

**Anthropic (Claude)**
- ✅ Muy bueno siguiendo instrucciones
- ✅ Ventana de contexto grande
- ✅ Ético y seguro
- ❌ Menos conocido

**Otros (Llama, Mistral, etc.)**
- ✅ Open source
- ✅ Puedes ejecutar localmente
- ❌ Requieren más setup técnico

**Recomendación**: Empieza con OpenAI o Claude, son los más fáciles de usar.

---

### ¿Cuántos skills debe tener un agente?

**Regla general**: 3-7 skills por agente

- **Muy pocos (1-2)**: El agente es limitado
- **Ideal (3-7)**: Versátil pero enfocado
- **Muchos (10+)**: Se vuelve confuso, reduce precisión

**Ejemplo bien balanceado**:
\`\`\`
Agente: Asistente de Código
Skills:
1. Code Review
2. Debugger
3. Test Generator
4. Refactorer
5. Documentation Writer
\`\`\`

---

### ¿Los skills se ejecutan automáticamente?

**No**. El modelo de IA decide cuándo usar cada skill basándose en:

1. Los **triggers** definidos en el skill
2. El **contexto** de la conversación
3. La **relevancia** al mensaje del usuario

Es como tener herramientas en un cinturón: el agente decide cuál usar según la situación.

---

### ¿Puedo hacer que los skills llamen a APIs reales?

¡Sí! Hay dos formas:

**1. Function Calling (recomendado)**
\`\`\`python
# Define funciones que el agente puede llamar
functions = [
    {
        "name": "search_database",
        "description": "Search customer database",
        "parameters": {...}
    }
]

# El modelo decide cuándo llamarlas
response = openai.chat.completions.create(
    model="gpt-4o",
    messages=[...],
    functions=functions
)
\`\`\`

**2. Instrucciones en el skill**
\`\`\`markdown
# SKILL: Database Searcher

## Process
1. User asks to search database
2. Extract search criteria
3. CALL: search_database(criteria)
4. Format results
5. Return to user
\`\`\`

---

## 📝 Creación de Contenido

### ¿Cuánto detalle debo incluir en un agente?

**Balance entre claridad y concisión**:

**Muy poco** (❌):
\`\`\`markdown
You are a helpful assistant.
Be nice.
\`\`\`

**Demasiado** (❌):
\`\`\`markdown
You are an assistant. When a user greets you, respond with a greeting.
If they ask a question, answer it. If the question is about code,
provide code. If it's about math, provide math. Always be polite.
Never be rude. Use examples. Explain clearly... [5 páginas más]
\`\`\`

**Ideal** (✅):
\`\`\`markdown
# AGENT: Code Assistant

## Identity
Expert Python developer with 10+ years experience.

## Personality
- Professional but approachable
- Educational - explains the "why"
- Practical - provides working examples

## Approach
1. Understand the problem
2. Provide solution with explanation
3. Suggest best practices
4. Offer alternatives when relevant
\`\`\`

**Regla**: 100-500 líneas para un agente, 50-200 para un skill.

---

### ¿Debo escribir los archivos en inglés o español?

**Respuesta corta**: Inglés funciona mejor.

**Razones**:
1. Los modelos de IA están más entrenados en inglés
2. La terminología técnica es más clara en inglés
3. Mayor compatibilidad con herramientas

**Pero**: Si tu caso de uso es 100% en español (ej: soporte al cliente en LATAM), puedes usar español sin problemas.

**Solución híbrida** (recomendada):
\`\`\`markdown
# AGENT: Customer Support / Soporte al Cliente

## Identity
You are a bilingual support agent.
Eres un agente de soporte bilingüe.

## Rules
- Detect user's language / Detecta el idioma del usuario
- Respond in same language / Responde en el mismo idioma
\`\`\`

---

### ¿Puedo copiar ejemplos y modificarlos?

**¡Absolutamente!** Ese es el propósito de los templates y ejemplos.

**Mejores prácticas**:
1. ✅ Copia el template
2. ✅ Personaliza para tu caso de uso
3. ✅ Prueba y ajusta
4. ✅ Documenta tus cambios
5. ✅ Versionea (usa Git)

**Licencia**: Los ejemplos de este curso son de uso libre.

---

## 🔧 Problemas Comunes

### Mi agente no sigue las instrucciones

**Posibles causas y soluciones**:

**1. Instrucciones demasiado vagas**
❌ "Be helpful"
✅ "Always provide code examples with explanations"

**2. Instrucciones contradictorias**
❌ "Be concise" + "Explain everything in detail"
✅ "Be concise for simple queries, detailed for complex ones"

**3. Prompt demasiado largo**
- Solución: Reduce a lo esencial, usa skills para detalles

**4. Temperature muy alta**
\`\`\`python
# Menos creativo, más preciso
temperature=0.3  # Para seguir instrucciones

# Más creativo
temperature=0.9  # Para contenido creativo
\`\`\`

---

### Los skills no se activan cuando deberían

**Checklist de debugging**:

1. **¿Los triggers son específicos?**
\`\`\`markdown
❌ Triggers: When user asks about data
✅ Triggers: 
- User says "analyze", "check", or "review"
- AND mentions "csv", "data", or "file"
\`\`\`

2. **¿El skill está incluido en el prompt?**
\`\`\`python
# Verificar que se está cargando
print(system_prompt)  # Debe contener el skill
\`\`\`

3. **¿Hay conflicto con otro skill?**
- Si dos skills tienen triggers similares, el modelo puede confundirse
- Solución: Hacer triggers mutuamente excluyentes

4. **¿El modelo tiene suficiente contexto?**
- Asegúrate de que el mensaje del usuario incluye información relevante

---

### Las respuestas son inconsistentes

**Causas comunes**:

**1. Temperature muy alta**
\`\`\`python
# Para consistencia
temperature=0.3

# Para variedad
temperature=0.7
\`\`\`

**2. Falta de ejemplos**
\`\`\`markdown
## Examples

### Example 1: Code Review
User: "Review this code"
Assistant: "I'll review for: bugs, style, performance..."
\`\`\`

**3. Instrucciones ambiguas**
\`\`\`markdown
❌ "Analyze the data appropriately"
✅ "Analyze data in this order: 1) Statistics, 2) Quality, 3) Insights"
\`\`\`

---

### El agente es muy lento

**Optimizaciones**:

**1. Reduce longitud del prompt**
\`\`\`python
# Malo: Cargar todos los skills siempre
system_prompt = agent + all_skills  # 10,000 tokens

# Bueno: Cargar solo skills relevantes
relevant_skills = select_skills(user_message)
system_prompt = agent + relevant_skills  # 2,000 tokens
\`\`\`

**2. Usa modelo más pequeño cuando sea apropiado**
\`\`\`python
# Tareas simples
model = "gpt-4o-mini"  # Más rápido, más barato

# Tareas complejas
model = "gpt-4o"  # Más lento, mejor calidad
\`\`\`

**3. Implementa caché**
\`\`\`python
# Cachear respuestas frecuentes
cache = {}
if user_message in cache:
    return cache[user_message]
\`\`\`

---

## 💰 Costos

### ¿Cuánto cuesta usar estos agentes?

Depende de:
1. **Qué API usas**
2. **Cuántos tokens consumes**
3. **Qué modelo usas**

**Ejemplo con OpenAI (precios aproximados 2026)**:

\`\`\`python
# GPT-4o (precio orientativo)
- Input: \$0.0025 por 1K tokens
- Output: \$0.01 por 1K tokens

# Conversación típica:
- System prompt (agente + skills): 2,000 tokens
- User message: 100 tokens
- Response: 500 tokens
- Total: 2,600 tokens

Costo por conversación: ~\$0.01
\`\`\`

**Cómo reducir costos**:
1. Usar modelos "mini" para tareas simples (gpt-4o-mini, Claude Haiku: ~10x más baratos)
2. Reducir longitud de prompts
3. Cachear respuestas comunes
4. Usar modelos open-source localmente (gratis pero requiere hardware)

---

### ¿Hay opciones gratuitas?

**Sí**:

1. **APIs con tier gratuito**
   - OpenAI: \$5 de crédito inicial
   - Anthropic: Prueba gratuita limitada

2. **Modelos open-source**
   - Llama 3, Mistral: Gratis, ejecuta localmente
   - Requiere: GPU potente o computadora con buena RAM

3. **Servicios con límites gratuitos**
   - Hugging Face Inference API
   - Groq (muy rápido, limitado)

---

## 🚀 Producción

### ¿Puedo usar esto en producción?

**Sí**, pero considera:

**1. Seguridad**
\`\`\`python
# Nunca incluyas secrets en archivos .md
❌ API_KEY = "sk-xxxxx"

# Usa variables de entorno
✅ API_KEY = os.getenv('API_KEY')
\`\`\`

**2. Validación de entrada**
\`\`\`python
# Sanitiza inputs del usuario
user_input = sanitize(user_input)
\`\`\`

**3. Manejo de errores**
\`\`\`python
try:
    response = agent.chat(message)
except APIError as e:
    # Manejo robusto
    log_error(e)
    return fallback_response()
\`\`\`

**4. Monitoreo**
\`\`\`python
# Log métricas
log_metrics({
    'response_time': time,
    'tokens_used': tokens,
    'success': True/False
})
\`\`\`

---

### ¿Cómo versiono mis agentes?

**Usar Git** + metadata en archivos:

\`\`\`markdown
---
version: 2.1.0
last_updated: 2026-05-16
changelog:
  - 2.1.0: Added async support
  - 2.0.0: Complete rewrite
  - 1.0.0: Initial release
---

# AGENT: [Nombre]
...
\`\`\`

**Estructura de repo**:
\`\`\`
agents-repo/
├── .git/
├── agents/
│   └── code-assistant/
│       ├── v1.0.0.md
│       ├── v2.0.0.md
│       └── latest.md -> v2.0.0.md
└── CHANGELOG.md
\`\`\`

---

## 🤝 Colaboración

### ¿Puedo compartir mis agentes/skills?

**¡Sí!** Es muy común:

**Dónde compartir**:
1. GitHub (repositorio público)
2. Hugging Face Hub
3. Comunidades de IA (Reddit, Discord)
4. Tu blog/sitio personal

**Qué incluir**:
\`\`\`
mi-agente/
├── README.md          # Descripción, uso, ejemplos
├── AGENT.md          # El agente
├── skills/           # Los skills
├── examples/         # Ejemplos de uso
├── LICENSE          # MIT, Apache, etc.
└── requirements.txt  # Dependencias Python
\`\`\`

---

### ¿Cómo contribuyo a proyectos de agentes?

**Proceso típico**:

1. **Fork** el repositorio
2. **Crea** una rama para tu feature
3. **Mejora** el agente/skill
4. **Prueba** exhaustivamente
5. **Documenta** tus cambios
6. **Pull Request** con descripción clara

**Ejemplo de mejora**:
\`\`\`markdown
## Pull Request: Add error handling to CSV Analyzer

### Changes
- Added validation for corrupted CSV files
- Improved error messages
- Added 3 new test cases

### Testing
- Tested with 10 malformed CSV files
- All tests pass
\`\`\`

---

## 📚 Aprendizaje

### ¿Por dónde empiezo si soy principiante?

**Ruta recomendada**:

**Semana 1**: Conceptos
- Leer módulo 1 del curso
- Entender diferencia agente vs skill
- Estudiar un ejemplo completo

**Semana 2**: Práctica simple
- Crear tu primer agente básico
- Crear 1-2 skills simples
- Probar con ChatGPT Custom Instructions

**Semana 3**: Programación
- Aprender Python básico si no sabes
- Usar una API de IA (OpenAI o Claude)
- Cargar tu agente programáticamente

**Semana 4**: Proyecto
- Crear un agente para un problema real tuyo
- Iterar basándote en resultados
- Compartir con la comunidad

---

### ¿Qué recursos adicionales recomiendas?

**Documentación Oficial**:
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic Claude Docs](https://docs.anthropic.com)
- [LangChain Docs](https://python.langchain.com)

**Cursos**:
- "Prompt Engineering for Developers" (DeepLearning.AI)
- "Building Systems with ChatGPT API" (OpenAI)

**Comunidades**:
- r/LanguageTechnology
- r/LocalLLaMA
- Discord de LangChain
- Twitter #PromptEngineering

**Blogs**:
- Anthropic Blog
- OpenAI Blog
- Simon Willison's Blog

---

## 🔮 Futuro

### ¿Este formato de .md seguirá siendo relevante?

**Sí**, porque:

1. **Universal**: Funciona con cualquier modelo de IA
2. **Versionable**: Compatible con Git
3. **Legible**: Humanos pueden leer y editar
4. **Estándar**: Ampliamente adoptado

**Pero evolucionará**:
- Más estandarización (ej: YAML frontmatter)
- Mejor tooling (linters, validators)
- Integración con IDEs

---

### ¿Qué viene después?

**Tendencias emergentes**:

1. **Multi-modal agents**: Texto + imágenes + audio
2. **Agent orchestration**: Múltiples agentes colaborando
3. **AutoGPT-style autonomy**: Agentes que se dan sus propias tareas
4. **Specialized models**: Modelos fine-tuned para roles específicos

**Tu próximo paso**: Domina lo básico ahora, luego experimenta con lo nuevo.

---

## ❓ Más Preguntas

### ¿No encontraste tu pregunta?

**Opciones**:

1. **Busca en el curso**: Usa Ctrl+F en los archivos del curso
2. **Consulta ejemplos**: Revisa \`ejemplos/\` para casos similares
3. **Experimenta**: A veces la mejor forma de aprender es probando
4. **Pregunta a la comunidad**: Foros, Discord, Reddit

---

## 📞 Soporte

**Recursos del curso**:
- [Guía de implementación](#recursos)
- [Cheatsheet](#recursos)
- [Ejemplos completos](../ejemplos/)
- [Templates](../templates/)

---

**Última actualización**: 2026-05-16  
**Versión**: 1.0

---

💡 **Tip**: Si tienes una pregunta no respondida aquí, probablemente otros también la tienen. ¡Contribuye agregándola!
`
    },
    {
      id: `guia-implementacion`,
      title: `🗺️ Guía de Implementación`,
      description: `Cómo estructurar tus proyectos en producción`,
      icon: `🗺️`,
      tag: `Guía`,
      content: `# Guía Práctica: Implementación de Agentes y Skills

> De la teoría a la práctica: Cómo implementar tus agentes y skills en sistemas reales

---

## 🎯 Objetivo

Esta guía te muestra cómo **usar** los archivos \`.md\` de agentes y skills en aplicaciones reales, frameworks populares, y APIs de IA.

---

## 📚 Tabla de Contenidos

1. [Conceptos de Implementación](#conceptos)
2. [Integración con APIs de IA](#apis)
3. [Frameworks y Herramientas](#frameworks)
4. [Patterns de Implementación](#patterns)
5. [Casos de Uso Completos](#casos-uso)
6. [Best Practices](#best-practices)

---

## 🧩 Conceptos de Implementación

### ¿Cómo se "ejecuta" un archivo .md?

Los archivos \`.md\` **NO se ejecutan directamente**. Son **configuraciones** que:

1. **Definen el comportamiento** del agente/skill
2. **Se cargan como prompts** en el sistema de IA
3. **Guían las respuestas** del modelo de lenguaje

### Flujo de Trabajo

\`\`\`
┌─────────────────┐
│  AGENT.md       │──┐
│  (Configuración)│  │
└─────────────────┘  │
                     │
┌─────────────────┐  │    ┌──────────────┐
│  SKILL.md       │──┼───>│   Sistema    │
│  (Capacidad)    │  │    │      +       │
└─────────────────┘  │    │  API de IA   │
                     │    └──────────────┘
┌─────────────────┐  │           │
│  User Input     │──┘           │
│  (Pregunta)     │              ▼
└─────────────────┘     ┌─────────────────┐
                        │   Respuesta     │
                        │   Inteligente   │
                        └─────────────────┘
\`\`\`

---

## 🔌 Integración con APIs de IA

### 1. OpenAI API (GPT-4o y modelos recientes)

\`\`\`python
import openai
import os

# Cargar el archivo del agente
def load_agent(agent_path):
    with open(agent_path, 'r', encoding='utf-8') as f:
        return f.read()

# Cargar skills
def load_skills(skill_paths):
    skills = []
    for path in skill_paths:
        with open(path, 'r', encoding='utf-8') as f:
            skills.append(f.read())
    return "\\n\\n---\\n\\n".join(skills)

# Configurar el agente
agent_config = load_agent('agents/python-dev.md')
skills_config = load_skills([
    'skills/code-analyzer.md',
    'skills/debugger.md'
])

# Combinar en system prompt
system_prompt = f"""
{agent_config}

# Available Skills:
{skills_config}
"""

# Usar con OpenAI
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Review this Python code for bugs"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
\`\`\`

---

### 2. Anthropic Claude API

\`\`\`python
import anthropic
import os

# Cargar configuraciones
agent_config = load_agent('agents/data-analyst.md')
skills_config = load_skills(['skills/csv-analyzer.md'])

# Usar con Claude
client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=4096,
    system=f"{agent_config}\\n\\n{skills_config}",
    messages=[
        {
            "role": "user",
            "content": "Analyze this sales data CSV"
        }
    ]
)

print(message.content)
\`\`\`

---

### 3. Implementación Genérica (Compatible con cualquier API)

\`\`\`python
class AgentSystem:
    def __init__(self, agent_path, skill_paths, api_client):
        self.agent_config = self._load_file(agent_path)
        self.skills = [self._load_file(path) for path in skill_paths]
        self.api_client = api_client
        self.conversation_history = []
    
    def _load_file(self, path):
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _build_system_prompt(self):
        """Construye el prompt del sistema combinando agente y skills"""
        skills_section = "\\n\\n".join([
            f"## SKILL {i+1}:\\n{skill}" 
            for i, skill in enumerate(self.skills)
        ])
        
        return f"""
{self.agent_config}

---

# AVAILABLE SKILLS:
{skills_section}

---

# INSTRUCTIONS:
- Use the skills when their trigger conditions match
- Follow the agent's personality and guidelines
- Provide clear, helpful responses
"""
    
    def chat(self, user_message):
        """Envía un mensaje al agente"""
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })
        
        # Llamar a la API (ejemplo genérico)
        response = self.api_client.complete(
            system=self._build_system_prompt(),
            messages=self.conversation_history
        )
        
        self.conversation_history.append({
            "role": "assistant",
            "content": response
        })
        
        return response
    
    def reset(self):
        """Reinicia la conversación"""
        self.conversation_history = []

# Uso
agent = AgentSystem(
    agent_path='agents/customer-support.md',
    skill_paths=[
        'skills/faq-search.md',
        'skills/ticket-creator.md'
    ],
    api_client=your_api_client
)

response = agent.chat("I need help with my order")
print(response)
\`\`\`

---

## 🛠️ Frameworks y Herramientas

### 1. LangChain

\`\`\`python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate
from langchain.schema import HumanMessage

# Cargar agente y skills
agent_md = load_agent('agents/researcher.md')
skills_md = load_skills(['skills/web-search.md', 'skills/summarizer.md'])

# Crear template
system_template = SystemMessagePromptTemplate.from_template(
    f"{agent_md}\\n\\n# Skills:\\n{skills_md}\\n\\n{{instructions}}"
)

# Configurar chat
chat = ChatOpenAI(model_name="gpt-4o", temperature=0.7)

# Usar
messages = [
    system_template.format(instructions="Be concise and accurate"),
    HumanMessage(content="Research the latest AI developments")
]

response = chat(messages)
print(response.content)
\`\`\`

---

### 2. Haystack

\`\`\`python
from haystack.nodes import PromptNode, PromptTemplate

# Cargar configuración
agent_config = load_agent('agents/qa-assistant.md')

# Crear prompt template
prompt_template = PromptTemplate(
    prompt=f"""
{agent_config}

Question: {{question}}
Context: {{context}}

Answer:
""",
    output_parser={"type": "AnswerParser"}
)

# Configurar nodo
prompt_node = PromptNode(
    model_name_or_path="gpt-4o",
    api_key=os.getenv('OPENAI_API_KEY'),
    default_prompt_template=prompt_template
)

# Usar
result = prompt_node.run(
    question="What is machine learning?",
    context="[Retrieved documents here]"
)
\`\`\`

---

### 3. AutoGen (Microsoft)

\`\`\`python
import autogen

# Cargar configuración
agent_config = load_agent('agents/coder.md')

# Configurar agente
config_list = [{
    "model": "gpt-4o",
    "api_key": os.getenv('OPENAI_API_KEY')
}]

# Crear agente con configuración
assistant = autogen.AssistantAgent(
    name="PythonDev",
    system_message=agent_config,
    llm_config={"config_list": config_list}
)

# Crear usuario
user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "coding"}
)

# Iniciar conversación
user_proxy.initiate_chat(
    assistant,
    message="Write a function to calculate fibonacci numbers"
)
\`\`\`

---

## 🎨 Patterns de Implementación

### Pattern 1: Skill Router (Selector de Skills)

\`\`\`python
class SkillRouter:
    """Selecciona automáticamente el skill apropiado según la entrada"""
    
    def __init__(self, skills_dir):
        self.skills = self._load_all_skills(skills_dir)
        self.skill_triggers = self._extract_triggers()
    
    def _load_all_skills(self, directory):
        skills = {}
        for filename in os.listdir(directory):
            if filename.endswith('.md'):
                name = filename[:-3]
                with open(f"{directory}/{filename}") as f:
                    skills[name] = f.read()
        return skills
    
    def _extract_triggers(self):
        """Extrae keywords de trigger de cada skill"""
        triggers = {}
        for name, content in self.skills.items():
            # Parsear sección de triggers (simplificado)
            keywords = self._parse_triggers_section(content)
            triggers[name] = keywords
        return triggers
    
    def select_skill(self, user_input):
        """Selecciona el skill más relevante"""
        user_lower = user_input.lower()
        
        # Puntuar cada skill
        scores = {}
        for skill_name, keywords in self.skill_triggers.items():
            score = sum(1 for kw in keywords if kw in user_lower)
            scores[skill_name] = score
        
        # Retornar el mejor match
        best_skill = max(scores, key=scores.get)
        return self.skills[best_skill] if scores[best_skill] > 0 else None

# Uso
router = SkillRouter('skills/')
user_message = "analyze this CSV file"
selected_skill = router.select_skill(user_message)

if selected_skill:
    # Usar el skill seleccionado
    response = api_call_with_skill(selected_skill, user_message)
\`\`\`

---

### Pattern 2: Multi-Agent System

\`\`\`python
class MultiAgentSystem:
    """Sistema con múltiples agentes especializados"""
    
    def __init__(self):
        self.agents = {
            'coder': Agent('agents/python-dev.md', ['skills/code-review.md']),
            'analyst': Agent('agents/data-analyst.md', ['skills/csv-analyzer.md']),
            'writer': Agent('agents/content-writer.md', ['skills/seo.md'])
        }
        self.coordinator = Agent('agents/coordinator.md', [])
    
    def process(self, task):
        # El coordinador decide qué agente usar
        decision = self.coordinator.chat(
            f"Which agent should handle this task: {task}"
        )
        
        agent_name = self._parse_agent_name(decision)
        
        if agent_name in self.agents:
            return self.agents[agent_name].chat(task)
        else:
            return "No suitable agent found"

# Uso
system = MultiAgentSystem()
result = system.process("Review this Python code for security issues")
\`\`\`

---

### Pattern 3: Skill Chaining (Encadenamiento)

\`\`\`python
class SkillChain:
    """Ejecuta múltiples skills en secuencia"""
    
    def __init__(self, agent_path, api_client):
        self.agent = load_agent(agent_path)
        self.api_client = api_client
    
    def execute_chain(self, skills_sequence, initial_input):
        """
        Ejecuta skills en orden, pasando output de uno como input del siguiente
        
        skills_sequence: ['skill1.md', 'skill2.md', 'skill3.md']
        """
        current_input = initial_input
        results = []
        
        for skill_path in skills_sequence:
            skill_config = load_agent(skill_path)
            
            # Ejecutar skill con input actual
            response = self.api_client.complete(
                system=f"{self.agent}\\n\\n{skill_config}",
                messages=[{"role": "user", "content": current_input}]
            )
            
            results.append({
                'skill': skill_path,
                'output': response
            })
            
            # Output se convierte en input del siguiente
            current_input = response
        
        return results

# Uso: Pipeline de procesamiento
chain = SkillChain('agents/data-processor.md', api_client)

pipeline = [
    'skills/csv-reader.md',      # 1. Lee CSV
    'skills/data-cleaner.md',    # 2. Limpia datos
    'skills/analyzer.md',        # 3. Analiza
    'skills/report-generator.md' # 4. Genera reporte
]

results = chain.execute_chain(pipeline, "process sales_data.csv")
final_report = results[-1]['output']
\`\`\`

---

### Pattern 4: Context Manager (Gestión de Contexto)

\`\`\`python
class ContextualAgent:
    """Agente que mantiene contexto a través de conversaciones"""
    
    def __init__(self, agent_path, skills_paths, max_context=10):
        self.agent = load_agent(agent_path)
        self.skills = load_skills(skills_paths)
        self.conversation = []
        self.context_summary = ""
        self.max_context = max_context
    
    def chat(self, message):
        # Agregar mensaje a conversación
        self.conversation.append({"role": "user", "content": message})
        
        # Si conversación es muy larga, resumir contexto antiguo
        if len(self.conversation) > self.max_context:
            self._summarize_old_context()
        
        # Construir prompt con contexto
        system_prompt = f"""
{self.agent}

# Available Skills:
{self.skills}

# Context Summary:
{self.context_summary}
"""
        
        # Obtener respuesta
        response = api_client.complete(
            system=system_prompt,
            messages=self.conversation[-self.max_context:]
        )
        
        self.conversation.append({"role": "assistant", "content": response})
        return response
    
    def _summarize_old_context(self):
        """Resume mensajes antiguos para mantener contexto compacto"""
        old_messages = self.conversation[:-self.max_context]
        
        # Pedir al agente que resuma
        summary_request = "Summarize this conversation history: " + \\
                         str(old_messages)
        
        self.context_summary = api_client.complete(
            system="You are a conversation summarizer",
            messages=[{"role": "user", "content": summary_request}]
        )

# Uso
agent = ContextualAgent(
    'agents/therapist.md',
    ['skills/active-listening.md'],
    max_context=10
)

# Conversación larga manteniendo contexto
agent.chat("I'm feeling stressed about work")
agent.chat("My boss keeps adding more tasks")
# ... muchas más interacciones ...
agent.chat("How can I deal with this?")
# El agente recordará el contexto previo
\`\`\`

---

## 💼 Casos de Uso Completos {#casos-uso}

### Caso 1: Sistema de Soporte al Cliente

\`\`\`python
# customer_support_system.py

import os
from openai import OpenAI

class CustomerSupportBot:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Cargar agente principal
        with open('agents/support-agent.md') as f:
            self.agent_config = f.read()
        
        # Cargar skills
        self.skills = {}
        for skill_name in ['faq-search', 'order-lookup', 'ticket-creator']:
            with open(f'skills/{skill_name}.md') as f:
                self.skills[skill_name] = f.read()
        
        self.active_conversations = {}
    
    def handle_message(self, user_id, message):
        # Obtener o crear conversación
        if user_id not in self.active_conversations:
            self.active_conversations[user_id] = []
        
        conversation = self.active_conversations[user_id]
        conversation.append({"role": "user", "content": message})
        
        # Construir system prompt
        system_prompt = self._build_system_prompt()
        
        # Obtener respuesta
        response = self.client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": system_prompt},
                *conversation
            ],
            temperature=0.7
        )
        
        assistant_message = response.choices[0].message.content
        conversation.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def _build_system_prompt(self):
        skills_text = "\\n\\n".join([
            f"# SKILL: {name}\\n{content}" 
            for name, content in self.skills.items()
        ])
        
        return f"""
{self.agent_config}

# Available Skills:
{skills_text}

# Guidelines:
- Be empathetic and helpful
- Use skills when appropriate
- Always try to resolve the issue
- Escalate to human if needed
"""

# Uso
bot = CustomerSupportBot()

# Simular conversación
print(bot.handle_message("user123", "Where is my order #12345?"))
print(bot.handle_message("user123", "It was supposed to arrive yesterday"))
\`\`\`

---

### Caso 2: Asistente de Desarrollo con IDE Integration

\`\`\`python
# ide_assistant.py

import json
from pathlib import Path

class IDEAssistant:
    """Asistente de código que se integra con IDEs"""
    
    def __init__(self, project_root):
        self.project_root = Path(project_root)
        self.agent = self._load_agent()
        self.skills = self._load_skills()
        self.project_context = self._scan_project()
    
    def _load_agent(self):
        with open('agents/code-assistant.md') as f:
            return f.read()
    
    def _load_skills(self):
        skills = {}
        skills_dir = Path('skills/coding/')
        for skill_file in skills_dir.glob('*.md'):
            with open(skill_file) as f:
                skills[skill_file.stem] = f.read()
        return skills
    
    def _scan_project(self):
        """Analiza estructura del proyecto para contexto"""
        context = {
            'language': self._detect_language(),
            'structure': self._get_structure(),
            'dependencies': self._get_dependencies()
        }
        return context
    
    def review_code(self, file_path, code):
        """Revisa código específico"""
        skill = self.skills['code-reviewer']
        
        prompt = f"""
File: {file_path}
Project Context: {json.dumps(self.project_context, indent=2)}

Code to review:
\`\`\`
{code}
\`\`\`

Provide a comprehensive code review.
"""
        
        return self._call_api(skill, prompt)
    
    def suggest_refactor(self, code_snippet):
        """Sugiere refactorizaciones"""
        skill = self.skills['refactorer']
        return self._call_api(skill, f"Suggest refactorings for:\\n{code_snippet}")
    
    def generate_tests(self, function_code):
        """Genera tests unitarios"""
        skill = self.skills['test-generator']
        return self._call_api(skill, f"Generate unit tests for:\\n{function_code}")
    
    def _call_api(self, skill_config, user_message):
        # Implementación de llamada a API
        pass

# Uso en plugin de VS Code
assistant = IDEAssistant('/path/to/project')

# Cuando usuario selecciona código y pide review
selected_code = get_selected_text()
review = assistant.review_code('src/main.py', selected_code)
display_in_sidebar(review)
\`\`\`

---

### Caso 3: Sistema de Análisis de Datos Automatizado

\`\`\`python
# data_analysis_system.py

class DataAnalysisPipeline:
    """Pipeline automatizado de análisis de datos"""
    
    def __init__(self):
        self.analyst = self._setup_analyst()
        self.report_generator = self._setup_reporter()
    
    def _setup_analyst(self):
        agent_config = load_agent('agents/data-analyst.md')
        skills = load_skills([
            'skills/csv-analyzer.md',
            'skills/statistical-tests.md',
            'skills/outlier-detector.md',
            'skills/correlation-finder.md'
        ])
        return Agent(agent_config, skills)
    
    def _setup_reporter(self):
        agent_config = load_agent('agents/report-writer.md')
        skills = load_skills(['skills/markdown-generator.md'])
        return Agent(agent_config, skills)
    
    def analyze_dataset(self, csv_path, questions=[]):
        """
        Analiza dataset y responde preguntas específicas
        """
        results = {}
        
        # 1. Análisis exploratorio automático
        results['eda'] = self.analyst.execute_skill(
            'csv-analyzer',
            f"Analyze {csv_path}"
        )
        
        # 2. Responder preguntas específicas
        if questions:
            results['qa'] = []
            for question in questions:
                answer = self.analyst.chat(
                    f"Based on {csv_path}: {question}"
                )
                results['qa'].append({'question': question, 'answer': answer})
        
        # 3. Generar reporte
        report_data = {
            'dataset': csv_path,
            'eda': results['eda'],
            'qa': results.get('qa', [])
        }
        
        results['report'] = self.report_generator.chat(
            f"Generate analysis report: {json.dumps(report_data)}"
        )
        
        return results
    
    def save_report(self, results, output_path):
        """Guarda reporte en Markdown"""
        with open(output_path, 'w') as f:
            f.write(results['report'])

# Uso
pipeline = DataAnalysisPipeline()

# Analizar datos de ventas
results = pipeline.analyze_dataset(
    'data/sales_2025.csv',
    questions=[
        "What are the top selling products?",
        "Are there any seasonal trends?",
        "Which region has the highest growth?"
    ]
)

# Guardar reporte
pipeline.save_report(results, 'reports/sales_analysis.md')
print("Analysis complete! Report saved.")
\`\`\`

---

## ✅ Best Practices {#best-practices}

### 1. Organización de Archivos

\`\`\`
project/
├── agents/
│   ├── customer-support.md
│   ├── code-assistant.md
│   ├── data-analyst.md
│   └── coordinator.md
├── skills/
│   ├── common/
│   │   ├── text-summarizer.md
│   │   └── translator.md
│   ├── coding/
│   │   ├── code-reviewer.md
│   │   ├── test-generator.md
│   │   └── debugger.md
│   └── data/
│       ├── csv-analyzer.md
│       └── visualizer.md
├── config/
│   └── agent_config.yaml
└── main.py
\`\`\`

---

### 2. Versionado de Agentes/Skills

\`\`\`markdown
# En cada archivo .md

---
version: 2.1.0
changelog:
  - 2.1.0: Added async support
  - 2.0.0: Complete rewrite
  - 1.5.0: Bug fixes
---
\`\`\`

\`\`\`python
# En código
class VersionedAgent:
    def __init__(self, agent_path):
        self.config = self._load_with_version(agent_path)
        self.version = self.config['version']
    
    def _load_with_version(self, path):
        with open(path) as f:
            content = f.read()
            # Parsear metadata
            metadata = self._extract_metadata(content)
            return {
                'version': metadata.get('version', '1.0.0'),
                'content': content
            }
\`\`\`

---

### 3. Testing de Agentes

\`\`\`python
# test_agents.py

import pytest
from agent_system import Agent

class TestCodeAssistant:
    @pytest.fixture
    def agent(self):
        return Agent('agents/code-assistant.md', ['skills/reviewer.md'])
    
    def test_code_review(self, agent):
        code = "def add(a,b): return a+b"
        response = agent.chat(f"Review this code: {code}")
        
        assert "PEP 8" in response or "spacing" in response.lower()
    
    def test_bug_detection(self, agent):
        buggy_code = "def divide(a, b): return a / b"
        response = agent.chat(f"Find bugs: {buggy_code}")
        
        assert "zero" in response.lower() or "division" in response.lower()
\`\`\`

---

### 4. Monitoreo y Logging

\`\`\`python
import logging
from datetime import datetime

class MonitoredAgent:
    def __init__(self, agent_path, skills_paths):
        self.agent = Agent(agent_path, skills_paths)
        self.logger = self._setup_logging()
        self.metrics = {
            'total_requests': 0,
            'successful': 0,
            'failed': 0,
            'avg_response_time': 0
        }
    
    def _setup_logging(self):
        logger = logging.getLogger('AgentSystem')
        logger.setLevel(logging.INFO)
        
        handler = logging.FileHandler('agent_logs.log')
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
        return logger
    
    def chat(self, message):
        start_time = datetime.now()
        self.metrics['total_requests'] += 1
        
        try:
            self.logger.info(f"Request: {message[:100]}")
            response = self.agent.chat(message)
            
            self.metrics['successful'] += 1
            self.logger.info(f"Response: {response[:100]}")
            
            return response
            
        except Exception as e:
            self.metrics['failed'] += 1
            self.logger.error(f"Error: {str(e)}")
            raise
        
        finally:
            duration = (datetime.now() - start_time).total_seconds()
            self._update_avg_response_time(duration)
    
    def get_metrics(self):
        return self.metrics
\`\`\`

---

### 5. Configuración Dinámica

\`\`\`yaml
# config/agent_config.yaml

agents:
  customer_support:
    path: agents/support-agent.md
    skills:
      - skills/faq-search.md
      - skills/ticket-creator.md
    model: gpt-4o
    temperature: 0.7
    max_tokens: 2000
    
  code_assistant:
    path: agents/code-assistant.md
    skills:
      - skills/coding/reviewer.md
      - skills/coding/debugger.md
    model: gpt-4o
    temperature: 0.3
    max_tokens: 4000
\`\`\`

\`\`\`python
# Cargar desde config
import yaml

def load_agent_from_config(agent_name):
    with open('config/agent_config.yaml') as f:
        config = yaml.safe_load(f)
    
    agent_config = config['agents'][agent_name]
    
    return Agent(
        agent_path=agent_config['path'],
        skill_paths=agent_config['skills'],
        model=agent_config['model'],
        temperature=agent_config['temperature'],
        max_tokens=agent_config['max_tokens']
    )

# Uso
support_agent = load_agent_from_config('customer_support')
\`\`\`

---

## 🎓 Resumen

### Puntos Clave

1. **Los archivos .md son configuraciones**, no código ejecutable
2. **Se cargan como prompts** en sistemas de IA
3. **Pueden combinarse** (agente + múltiples skills)
4. **Son compatibles** con cualquier API de IA
5. **Facilitan versionado y mantenimiento**

### Próximos Pasos

1. ✅ Elige un caso de uso real
2. ✅ Crea tu agente y skills en .md
3. ✅ Implementa con tu API favorita
4. ✅ Prueba y refina
5. ✅ Escala a producción

---

**Recursos Adicionales**:
- [Ejemplos completos](../ejemplos/)
- [Templates](../templates/)
- [Proyectos del curso](../modulo-7/)

`
    },
    {
      id: `biblioteca-skills`,
      title: `📚 Biblioteca de Skills`,
      description: `Catálogo de skills listos para integrar`,
      icon: `📚`,
      tag: `Biblioteca`,
      content: `# Biblioteca de Skills Listos para Usar

> Colección de skills probados y funcionales que puedes usar inmediatamente

---

## 📁 Categorías

1. [Procesamiento de Datos](#datos)
2. [Texto y Lenguaje](#texto)
3. [Programación](#programacion)
4. [Productividad](#productividad)
5. [Análisis y Reporting](#analisis)

---

## 📊 Procesamiento de Datos

### SKILL: JSON Validator

\`\`\`\`markdown
# SKILL: JSON Validator

## Description
Valida archivos JSON, detecta errores de sintaxis y sugiere correcciones.

## Triggers
- Usuario menciona archivo .json
- Usuario pega contenido JSON
- Usuario dice "validar json", "check json"

## Process
1. Recibir JSON input
2. Intentar parsear
3. Si hay error:
   - Identificar línea y posición
   - Explicar el error
   - Sugerir corrección
4. Si es válido:
   - Confirmar validez
   - Mostrar estructura básica

## Output
\`\`\`
✅ JSON VÁLIDO

Estructura:
- 3 objetos principales
- 15 campos totales
- Máxima profundidad: 4 niveles

O bien:

❌ ERROR EN JSON

Línea 12, columna 5:
  "name": "John"
          ^
Error: Falta coma después de este valor

Corrección sugerida:
  "name": "John",
\`\`\`
\`\`\`\`

---

### SKILL: CSV Cleaner

\`\`\`\`markdown
# SKILL: CSV Data Cleaner

## Description
Limpia datos CSV: elimina duplicados, maneja valores faltantes, normaliza formatos.

## Triggers
- Usuario menciona "limpiar datos", "clean data"
- Usuario sube CSV con problemas de calidad
- Usuario pide "normalizar", "estandarizar"

## Inputs
- CSV file or data
- Cleaning options (opcional)

## Process
1. **Detectar problemas**:
   - Duplicados
   - Valores faltantes
   - Inconsistencias de formato
   - Outliers obvios

2. **Proponer soluciones**:
   - Eliminar duplicados
   - Rellenar/eliminar valores faltantes
   - Estandarizar formatos
   - Manejar outliers

3. **Aplicar limpieza**:
   - Ejecutar transformaciones
   - Documentar cambios
   - Validar resultado

## Output
\`\`\`
🧹 LIMPIEZA COMPLETADA

Cambios aplicados:
- ❌ Eliminados 15 duplicados (3% del total)
- 📝 Rellenados 27 valores faltantes con media
- 📅 Estandarizadas 45 fechas a formato ISO
- 🔢 Normalizados 120 códigos postales

Datos limpios:
- Filas originales: 500
- Filas después: 485
- Calidad: 98.5% (antes: 82%)

CSV limpio guardado en: cleaned_data.csv
\`\`\`

## Example
Input CSV con problemas:
\`\`\`
name,email,date
John,,2024-1-5
Jane,jane@test,05/01/2024
John,,2024-1-5  # duplicado
Bob,bob@test.com,January 5 2024
\`\`\`

Output CSV limpio:
\`\`\`
name,email,date
John,unknown@domain.com,2024-01-05
Jane,jane@test,2024-01-05
Bob,bob@test.com,2024-01-05
\`\`\`
\`\`\`\`

---

## ✍️ Texto y Lenguaje

### SKILL: Text Summarizer

\`\`\`\`markdown
# SKILL: Smart Text Summarizer

## Description
Genera resúmenes inteligentes de textos largos con niveles ajustables de detalle.

## Triggers
- Usuario dice "resumir", "summarize", "TLDR"
- Usuario pega texto largo (>500 palabras)
- Usuario pide "puntos clave", "main points"

## Inputs
- Text to summarize
- Summary length: short/medium/long
- Focus: general/technical/action-items

## Process
1. **Analizar texto**:
   - Identificar tema principal
   - Detectar puntos clave
   - Reconocer estructura

2. **Extraer información**:
   - Ideas principales
   - Datos importantes
   - Conclusiones

3. **Generar resumen**:
   - Según longitud solicitada
   - Con enfoque apropiado
   - Mantener contexto esencial

## Output Formats

### Short (1-2 oraciones)
\`\`\`
RESUMEN RÁPIDO:
[Tema principal en 1-2 oraciones concisas]
\`\`\`

### Medium (párrafo)
\`\`\`
RESUMEN EJECUTIVO:

[Párrafo de 4-6 oraciones cubriendo:
- Tema/contexto
- Puntos principales (2-3)
- Conclusión/implicación]
\`\`\`

### Long (con bullets)
\`\`\`
RESUMEN DETALLADO:

Tema: [Descripción del tema]

Puntos Clave:
• [Punto 1 con contexto]
• [Punto 2 con contexto]
• [Punto 3 con contexto]

Datos Relevantes:
• [Dato/cifra 1]
• [Dato/cifra 2]

Conclusión:
[Conclusión o próximos pasos]
\`\`\`

## Example

Input: [Artículo de 2000 palabras sobre IA]

Output (Medium):
\`\`\`
RESUMEN EJECUTIVO:

El artículo examina el impacto de los modelos de lenguaje grandes (LLMs) 
en la productividad empresarial. Los estudios muestran aumentos del 30-40% 
en tareas de escritura y programación. Sin embargo, los autores advierten 
sobre dependencia excesiva y la necesidad de verificación humana. Las 
empresas que mejor implementan IA combinan automatización con supervisión 
experta. El futuro apunta hacia herramientas IA más especializadas por 
industria.
\`\`\`
\`\`\`\`

---

### SKILL: Grammar Checker

\`\`\`\`markdown
# SKILL: Grammar & Style Checker

## Description
Revisa gramática, ortografía, y estilo en inglés y español.

## Triggers
- Usuario dice "revisar", "check grammar", "corregir"
- Usuario pega texto para revisar
- Usuario pregunta "está bien escrito?"

## Process
1. Detectar idioma
2. Revisar:
   - Ortografía
   - Gramática
   - Puntuación
   - Estilo/claridad
3. Clasificar errores por severidad
4. Sugerir correcciones

## Output
\`\`\`
📝 REVISIÓN COMPLETADA

ERRORES CRÍTICOS (3):
1. Línea 2: "habian" → "habían" (falta tilde)
2. Línea 5: "hubieron problemas" → "hubo problemas" (verbo impersonal)
3. Línea 8: "a ver si" → "haber si" (confusión homófona)

SUGERENCIAS DE ESTILO (2):
1. Línea 3: Oración muy larga (45 palabras). Considerar dividir.
2. Línea 12: Voz pasiva. Considerar voz activa para más claridad.

PUNTAJE GENERAL: 85/100
\`\`\`
\`\`\`\`

---

## 💻 Programación

### SKILL: Code Explainer

\`\`\`\`markdown
# SKILL: Code Explainer

## Description
Explica código en lenguaje natural, línea por línea si es necesario.

## Triggers
- Usuario pega código sin contexto
- Usuario dice "explica este código", "qué hace esto"
- Usuario pregunta por funcionalidad específica

## Process
1. **Detectar lenguaje** de programación
2. **Analizar estructura**:
   - Funciones/clases principales
   - Flujo lógico
   - Dependencias
3. **Explicar**:
   - Resumen general primero
   - Luego detalles por sección
   - Ejemplos de uso

## Output Format

\`\`\`
🔍 ANÁLISIS DE CÓDIGO

LENGUAJE: Python
TIPO: Función de utilidad

RESUMEN:
Esta función calcula el factorial de un número usando recursión.

EXPLICACIÓN DETALLADA:

Línea 1: \`def factorial(n):\`
  → Define función llamada 'factorial' que recibe parámetro 'n'

Línea 2: \`if n == 0:\`
  → Caso base: si n es 0...

Línea 3: \`return 1\`
  → ...retorna 1 (por definición, 0! = 1)

Línea 4: \`return n * factorial(n-1)\`
  → Caso recursivo: multiplica n por factorial de (n-1)

COMPLEJIDAD:
  Tiempo: O(n)
  Espacio: O(n) por la pila de llamadas

USO EJEMPLO:
  >>> factorial(5)
  120  # porque 5! = 5×4×3×2×1 = 120

NOTA:
  Esta implementación puede causar stack overflow con números grandes.
  Considerar versión iterativa para n > 1000.
\`\`\`
\`\`\`\`

---

### SKILL: Bug Detector

\`\`\`\`markdown
# SKILL: Bug Detector & Fixer

## Description
Identifica bugs comunes en código y sugiere correcciones.

## Triggers
- Usuario dice "encuentra bugs", "qué está mal"
- Usuario reporta comportamiento inesperado
- Código con errores obvios

## Process
1. **Escanear código** buscando:
   - Errores de sintaxis
   - Logic errors
   - Edge cases no manejados
   - Problemas de seguridad
   - Code smells

2. **Clasificar por severidad**:
   - CRÍTICO: Previene ejecución
   - ALTO: Causa comportamiento incorrecto
   - MEDIO: Problemas potenciales
   - BAJO: Mejoras de calidad

3. **Proponer fixes** con explicación

## Output

\`\`\`
🐛 BUGS ENCONTRADOS: 3

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 CRÍTICO - División por cero
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Línea 8:
  result = total / count

PROBLEMA:
  Si 'count' es 0, esto causará ZeroDivisionError

FIX:
  if count == 0:
      return 0  # o manejar caso especial
  result = total / count

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟠 ALTO - Variable no inicializada
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Línea 15:
  total += value

PROBLEMA:
  'total' se usa sin inicializar. Si 'items' está vacío,
  NameError en primera iteración.

FIX:
  total = 0  # Agregar antes del loop
  for item in items:
      total += item.value

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🟡 MEDIO - Posible None
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Línea 22:
  name = user.name.upper()

PROBLEMA:
  Si 'user.name' es None, AttributeError

FIX:
  name = (user.name or '').upper()
  # o
  name = user.name.upper() if user.name else 'UNKNOWN'
\`\`\`
\`\`\`\`

---

## ⚡ Productividad

### SKILL: Meeting Notes Generator

\`\`\`\`markdown
# SKILL: Meeting Notes Generator

## Description
Convierte transcripciones o notas desordenadas de reuniones en 
documentos estructurados con acción items.

## Triggers
- Usuario dice "meeting notes", "resumir reunión"
- Usuario pega transcripción
- Usuario pide "action items"

## Process
1. **Analizar contenido**:
   - Identificar participantes
   - Detectar temas discutidos
   - Extraer decisiones
   - Encontrar action items

2. **Estructurar**:
   - Organizar cronológicamente o por tema
   - Separar discusión de decisiones
   - Listar tareas con responsables

3. **Formatear**:
   - Headers claros
   - Bullets para legibilidad
   - Destacar acciones

## Output Format

\`\`\`
# Meeting Notes: [Título/Tema]

**Date**: [Fecha]
**Attendees**: [Nombres]
**Duration**: [Duración]

---

## Summary
[2-3 oraciones del propósito y resultado general]

---

## Topics Discussed

### 1. [Tema 1]
- [Punto de discusión 1]
- [Punto de discusión 2]
- **Decision**: [Decisión tomada si aplica]

### 2. [Tema 2]
- [Punto de discusión 1]
- [Punto de discusión 2]

---

## Decisions Made

1. ✅ [Decisión 1]
   - Rationale: [Por qué]
   - Impact: [A quién/qué afecta]

2. ✅ [Decisión 2]
   - Rationale: [Por qué]

---

## Action Items

| Task | Owner | Deadline | Status |
|------|-------|----------|--------|
| [Tarea 1] | [Persona] | [Fecha] | 🔵 Todo |
| [Tarea 2] | [Persona] | [Fecha] | 🔵 Todo |

---

## Next Steps

- [ ] [Próximo paso 1]
- [ ] [Próximo paso 2]

---

## Next Meeting

**When**: [Fecha/hora propuesta]
**Agenda**: [Temas para próxima reunión]
\`\`\`

## Example

Input (transcripción caótica):
\`\`\`
John: ok so we need to discuss the Q2 launch
Sarah: yeah I think we should target May 15
John: sounds good, Sarah can you handle marketing?
Sarah: sure, I'll need the budget approved by April 1
Mike: I can get that done
John: perfect, anything else?
Sarah: we should review competitor pricing
Mike: I'll pull that data this week
\`\`\`

Output:
\`\`\`
# Meeting Notes: Q2 Launch Planning

**Date**: March 15, 2026
**Attendees**: John (Lead), Sarah (Marketing), Mike (Finance)
**Duration**: 15 minutes

---

## Summary
Team discussed Q2 product launch timeline and responsibilities. 
Launch date set for May 15. Marketing and finance tasks assigned.

---

## Decisions Made

1. ✅ Launch date: May 15, 2026
   - Rationale: Allows sufficient prep time
   - Impact: All departments

2. ✅ Sarah owns marketing execution
   - Requires budget approval by April 1

---

## Action Items

| Task | Owner | Deadline | Status |
|------|-------|----------|--------|
| Approve marketing budget | Mike | April 1 | 🔵 Todo |
| Pull competitor pricing data | Mike | March 22 | 🔵 Todo |
| Plan marketing campaign | Sarah | May 1 | 🔵 Todo |

---

## Next Steps

- [ ] Mike to send budget proposal
- [ ] Sarah to draft marketing plan once budget approved
- [ ] Review competitor analysis next meeting
\`\`\`
\`\`\`\`

---

### SKILL: Email Drafter

\`\`\`\`markdown
# SKILL: Professional Email Drafter

## Description
Genera emails profesionales basados en contexto y tono deseado.

## Triggers
- Usuario dice "escribe email", "draft email"
- Usuario describe situación que requiere email
- Usuario pide "cómo responder a..."

## Inputs
- Situation/context
- Recipient
- Tone: formal/casual/urgent/apologetic/etc.
- Key points to include

## Process
1. **Entender contexto**
2. **Seleccionar tono** apropiado
3. **Estructurar**:
   - Subject line
   - Greeting
   - Body
   - Closing
4. **Optimizar** para claridad

## Output

\`\`\`
SUBJECT: [Título conciso y claro]

[Saludo apropiado],

[Párrafo 1: Contexto/propósito]

[Párrafo 2: Puntos principales]

[Párrafo 3: Call to action o próximos pasos]

[Cierre apropiado],
[Nombre]

---

ALTERNATIVA (tono más [formal/casual]):
[Versión alternativa si solicitada]
\`\`\`

## Examples

### Ejemplo 1: Follow-up

Contexto: "Necesito hacer follow-up de propuesta enviada hace una semana"

Output:
\`\`\`
SUBJECT: Following up: Proposal for [Project Name]

Hi [Name],

I hope this email finds you well. I wanted to follow up on the 
proposal I sent last week regarding [project].

I'd be happy to discuss any questions you might have or provide 
additional information if needed. Are you available for a brief 
call this week?

Looking forward to hearing from you.

Best regards,
[Your Name]
\`\`\`

### Ejemplo 2: Apologetic

Contexto: "Voy a llegar tarde a entrega de proyecto, necesito avisar"

Output:
\`\`\`
SUBJECT: Project Delivery Timeline - Update Required

Dear [Manager Name],

I'm writing to inform you of a delay in the [Project Name] delivery. 
Due to [brief reason], I will need an extension until [new date] 
to ensure quality standards are met.

I apologize for any inconvenience this may cause. I've already 
[mitigation steps taken] to minimize the impact. I'm committed 
to delivering excellent results and appreciate your understanding.

Please let me know if you'd like to discuss this further.

Sincerely,
[Your Name]
\`\`\`
\`\`\`\`

---

## 📊 Análisis y Reporting

### SKILL: Trend Analyzer

\`\`\`\`markdown
# SKILL: Trend Analyzer

## Description
Identifica tendencias en series temporales y datos históricos.

## Triggers
- Usuario muestra datos con componente temporal
- Usuario pregunta por "tendencias", "patrones"
- Usuario pide "forecasting", "predicción"

## Process
1. **Analizar datos**:
   - Dirección (creciente/decreciente/estable)
   - Magnitud del cambio
   - Volatilidad
   - Seasonality

2. **Detectar patrones**:
   - Ciclos
   - Puntos de inflexión
   - Anomalías

3. **Proyectar**:
   - Tendencia futura (si solicitada)
   - Rango de confianza
   - Factores de riesgo

## Output

\`\`\`
📈 ANÁLISIS DE TENDENCIA

PERIODO: [Rango de fechas]
MÉTRICA: [Qué se midió]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TENDENCIA GENERAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Dirección: ↗️ CRECIENTE
Cambio total: +23% (de X a Y)
Tasa promedio: +4.2% mensual
Volatilidad: MEDIA (SD: ±8%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PATRONES DETECTADOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. 📅 SEASONALITY:
   - Picos en: Diciembre, Mayo
   - Valles en: Febrero, Agosto
   - Patrón: Consistente últimos 3 años

2. 🔄 CICLO:
   - Duración promedio: 4 meses
   - Amplitud: ±15%

3. ⚡ EVENTOS NOTABLES:
   - Marzo 2025: +45% (lanzamiento producto)
   - Julio 2025: -12% (issue técnico)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROYECCIÓN (3 meses)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Escenario base: +12% (IC 95%: +8% a +16%)
Escenario optimista: +18%
Escenario conservador: +6%

SUPOSICIONES:
- Patrón histórico continúa
- No eventos disruptivos
- Seasonality se mantiene

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMENDACIONES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Capitalizar pico de Diciembre (históricamente +30%)
2. Preparar para valle de Febrero
3. Investigar causas de volatilidad en Q2
\`\`\`
\`\`\`\`

---

## 🎁 Cómo Usar Estos Skills

### Opción 1: Copiar Directo
Copia cualquier skill completo a un archivo \`.md\` y úsalo.

### Opción 2: Personalizar
Modifica los skills para tu caso específico.

### Opción 3: Combinar
Agrupa varios skills relacionados en un agente.

---

## 💾 Cómo Llevarte Estos Skills

Usa el botón **Copiar** de cualquier bloque de código de esta página para llevarte el skill completo a tu propio archivo \`.md\`.

---

**Total de skills en esta biblioteca**: 9  
**Categorías**: 5  
**Listos para usar**: ✅ Sí
`
    }
];
