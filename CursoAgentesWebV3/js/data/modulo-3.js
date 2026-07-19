/**
 * Módulo 3 — Skills Avanzados
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
    {
      id: `modulo-3`,
      number: 3,
      icon: `⚡`,
      title: `Skills Avanzados`,
      subtitle: `Diseña herramientas modulares`,
      description: `Aprende a diseñar y construir habilidades independientes (skills) que tus agentes pueden activar dinámicamente bajo demanda.`,
      difficulty: `intermediate`,
      lessons: [
        {
          id: `3-1`,
          title: `Qué es un Skill`,
          time: `10 min`,
          difficulty: `⭐ Principiante`,
          content: `# 3.1 - Qué es un Skill

## 🎯 Objetivo

Comprender la diferencia fundamental entre un Agente (el cerebro central) y un Skill (una herramienta especializada), y saber cuándo utilizar cada uno.

---

## 🤖 El Concepto del Agente vs Skill

Imagina un restaurante de alta cocina:

- El **Agente** es el Chef Ejecutivo. Tiene una personalidad (perfeccionista, italiano), conoce todo el contexto del menú, habla con el comensal (el usuario) y delega tareas.
- El **Skill** es como una Cortadora de Fiambre o un Cuchillo para filetear. No tiene "personalidad", no habla con el cliente, solo recibe un input (una pieza de carne), hace un proceso altamente especializado, y devuelve un output (filetes perfectos).

### ¿Por qué separarlos?

Si metieras todas las instrucciones de cómo cortar fiambre, cómo hornear el pan, cómo batir los huevos y cómo limpiar la cocina dentro de la cabeza del Chef Ejecutivo (el Agente), terminaría completamente abrumado y olvidando cosas.

En la Inteligencia Artificial pasa igual. Si en un solo archivo Markdown metes las instrucciones para que el Agente sea un experto en Python, que además sepa analizar bases de datos SQL, que lea archivos PDF y que procese pagos... el **Context Window** se saturará y el Agente sufrirá de *alucinaciones* o ignorará partes del prompt.

La solución es la **Modularidad**: Crear un Agente base simple, y dotarlo de una caja de herramientas (Skills).

---

## 🔧 Características de un Skill

A diferencia de un Agente, un Skill en nuestro formato Markdown se caracteriza por:

1. **Altamente Especializado**: Hace una sola cosa, pero la hace excepcionalmente bien.
2. **Sin Personalidad**: Su tono de salida suele ser puramente funcional o estructurado (ej. un JSON, una tabla, o datos crudos).
3. **Reutilizable**: Un skill de "Buscador Web" puede ser usado por el "Agente Programador", el "Agente Asistente" y el "Agente Analista Financiero".
4. **Basado en Entradas y Salidas**: Está diseñado como una función matemática. \`f(x) = y\`. Entra un dato, ocurre un proceso detallado, sale un resultado.

---

## 📝 Agente vs Skill: Resumen

| Característica | Agente | Skill |
| :--- | :--- | :--- |
| **Rol principal** | Orquestar, planificar, conversar | Ejecutar una tarea repetitiva/técnica |
| **Tono / Personalidad** | Sí, definida (amigable, formal, etc.) | No, estrictamente funcional |
| **Uso de contexto** | Alto (recuerda la conversación) | Bajo (solo procesa el input recibido) |
| **Interacción** | Interactúa con el usuario y con Skills | Solo interactúa con el Agente que lo llama |

---

## 🚀 Próximos Pasos

Ahora que entiendes filosóficamente qué es un Skill y por qué es vital para escalar el poder de la IA sin que pierda precisión, vamos a ver la estructura técnica de un archivo de Skill.

👉 **Siguiente**: [3.2 - Estructura de un SKILL.md](#3-2)

---

## 💡 Ejercicio Práctico

1. Piensa en el Agente "Asistente Ejecutivo Pro" que hicimos en el módulo anterior.
2. Anota 3 capacidades complejas que ese agente tendría que realizar, y que serían perfectas candidatas para convertirse en "Skills" externos para no sobrecargar el cerebro del asistente.
3. Ejemplo: *Skill_Resumidor_de_PDFs_Extensos*.

---

**Tiempo estimado**: 10 minutos  
**Dificultad**: ⭐ Principiante
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

1. Piensa en el Agente "Asistente Ejecutivo Pro" que hicimos en el módulo anterior.
2. Anota 3 capacidades complejas que ese agente tendría que realizar, y que serían perfectas candidatas para convertirse en "Skills" externos para no sobrecargar el cerebro del asistente.
3. Ejemplo: *Skill_Resumidor_de_PDFs_Extensos*.`,
            type: `text`
          }
        },
        {
          id: `3-2`,
          title: `Estructura de un SKILL.md`,
          time: `45 min`,
          difficulty: `⭐⭐ Intermedio`,
          content: `# 3.2 - Estructura de un SKILL.md

## 📋 Anatomía Completa de un Archivo SKILL.md

Un archivo \`SKILL.md\` bien estructurado es la clave para que tu skill sea efectivo y reutilizable.

---

## 🏗️ Estructura Estándar

\`\`\`markdown
# SKILL: [Nombre del Skill]

## Description
[Qué hace este skill en 1-3 oraciones]

## Triggers
[Cuándo debe activarse este skill]

## Inputs
[Qué información necesita]

## Process
[Pasos detallados de ejecución]

## Outputs
[Qué produce/retorna]

## Error Handling
[Cómo manejar errores comunes]

## Examples
[Casos de uso concretos]

## Dependencies
[Herramientas/bibliotecas necesarias]

## Notes
[Consideraciones adicionales]
\`\`\`

---

## 📝 Secciones Detalladas

### 1. Nombre y Descripción

**Propósito**: Identificar rápidamente qué hace el skill

\`\`\`markdown
# SKILL: PDF Text Extractor

## Description
Extracts text content from PDF files, handling both digital and scanned documents.
Supports multiple pages and preserves basic formatting.
\`\`\`

**Mejores prácticas**:
- Nombre claro y descriptivo
- Descripción en 1-3 oraciones
- Mencionar capacidades clave

---

### 2. Triggers (Disparadores)

**Propósito**: Definir cuándo el skill debe activarse

\`\`\`markdown
## Triggers
Use this skill when:
- User uploads a .pdf file
- User asks to "extract text from PDF"
- User mentions "reading a PDF document"
- User requests "PDF content analysis"
- A PDF path is detected in the conversation

Do NOT use when:
- User wants to create/generate a PDF (use pdf-creator skill)
- User wants to edit PDF (use pdf-editor skill)
- User asks about PDF metadata only
\`\`\`

**Mejores prácticas**:
- Lista de condiciones positivas (cuándo SÍ usar)
- Lista de exclusiones (cuándo NO usar)
- Ser específico para evitar activaciones incorrectas

---

### 3. Inputs (Entradas)

**Propósito**: Documentar qué información necesita el skill

\`\`\`markdown
## Inputs

### Required
- \`file_path\`: Path to the PDF file (string)
- \`operation\`: Type of extraction ('full' | 'pages' | 'range')

### Optional
- \`pages\`: Specific pages to extract (array of integers)
  - Default: all pages
- \`preserve_formatting\`: Keep original formatting (boolean)
  - Default: true
- \`ocr_enabled\`: Use OCR for scanned PDFs (boolean)
  - Default: false

### Example Input
\`\`\`python
{
  "file_path": "/path/to/document.pdf",
  "operation": "range",
  "pages": [1, 2, 5],
  "preserve_formatting": true
}
\`\`\`


---

### 4. Process (Proceso)

**Propósito**: Explicar paso a paso cómo funciona el skill

\`\`\`markdown
## Process

### Step 1: Validation
- Check if file exists
- Verify file is a valid PDF
- Validate input parameters

### Step 2: PDF Analysis
- Detect PDF type (digital vs scanned)
- Count total pages
- Check for encryption/password

### Step 3: Text Extraction
- For digital PDFs:
  - Extract text using PyPDF2
  - Preserve layout if requested
- For scanned PDFs:
  - Convert pages to images
  - Apply OCR (Tesseract)
  - Clean extracted text

### Step 4: Post-processing
- Remove extra whitespace
- Fix common OCR errors
- Format output as requested

### Step 5: Return Results
- Compile extracted text
- Generate metadata
- Return structured output
\`\`\`

**Mejores prácticas**:
- Numerar los pasos
- Incluir decisiones lógicas (if/then)
- Mencionar herramientas usadas

---

### 5. Outputs (Salidas)

**Propósito**: Documentar qué retorna el skill

\`\`\`markdown
## Outputs

### Success Response
\`\`\`json
{
  "status": "success",
  "data": {
    "text": "Extracted text content...",
    "pages_processed": 5,
    "total_pages": 10,
    "extraction_method": "digital",
    "confidence": 0.98
  },
  "metadata": {
    "processing_time": "2.3s",
    "file_size": "1.2MB",
    "warnings": []
  }
}
\`\`\`

### Error Response
\`\`\`json
{
  "status": "error",
  "error": {
    "code": "PDF_ENCRYPTED",
    "message": "PDF is password protected",
    "suggestion": "Provide password using 'password' parameter"
  }
}
\`\`\`


---

### 6. Error Handling

**Propósito**: Anticipar y documentar manejo de errores

\`\`\`markdown
## Error Handling

### Common Errors

1. **File Not Found**
   - Detection: File path doesn't exist
   - Action: Return error with suggested path
   - User message: "Could not find PDF at [path]"

2. **Corrupted PDF**
   - Detection: PyPDF2 raises PdfReadError
   - Action: Try alternative parser, then fail gracefully
   - User message: "PDF appears to be corrupted. Try re-downloading."

3. **OCR Required but Disabled**
   - Detection: All pages return empty text
   - Action: Suggest enabling OCR
   - User message: "This appears to be a scanned PDF. Enable OCR?"

4. **Memory Limit Exceeded**
   - Detection: PDF > 100MB or > 1000 pages
   - Action: Offer to process in chunks
   - User message: "Large PDF detected. Process in batches?"

### Fallback Strategy
- Digital extraction fails → Try OCR
- OCR fails → Return raw page images
- All fails → Provide diagnostic info
\`\`\`

---

### 7. Examples (Ejemplos)

**Propósito**: Mostrar casos de uso reales

\`\`\`markdown
## Examples

### Example 1: Simple Extraction
**User**: "Extract text from report.pdf"

**Skill Action**:
- Reads /uploads/report.pdf
- Extracts all text
- Returns formatted text

**Output**: Full text content with basic formatting

---

### Example 2: Specific Pages
**User**: "Get me just pages 3-5 from the contract"

**Skill Action**:
- Identifies contract.pdf
- Extracts pages 3, 4, 5
- Returns combined text

**Output**: Text from specified pages only

---

### Example 3: Scanned Document
**User**: "Can you read this scanned invoice?"

**Skill Action**:
- Detects scanned PDF
- Automatically enables OCR
- Processes with Tesseract
- Cleans up OCR errors

**Output**: Extracted text with confidence scores
\`\`\`

---

### 8. Dependencies

**Propósito**: Listar herramientas y requisitos

\`\`\`markdown
## Dependencies

### Python Libraries
- \`PyPDF2>=3.0.0\` - PDF parsing
- \`pdfplumber>=0.9.0\` - Advanced extraction
- \`pytesseract>=0.3.10\` - OCR engine
- \`pdf2image>=1.16.0\` - Page to image conversion
- \`Pillow>=9.0.0\` - Image processing

### System Requirements
- Tesseract OCR installed (for scanned PDFs)
- Poppler utilities (for pdf2image)
- Minimum 2GB RAM (4GB for OCR)

### Optional
- \`textract\` - Alternative extraction method
- \`camelot-py\` - Table extraction from PDFs
\`\`\`

---

## 🎯 Ejemplo Completo: Skill de Análisis JSON

\`\`\`markdown
# SKILL: JSON Analyzer

## Description
Analyzes JSON files to validate structure, detect patterns, and extract insights.
Handles nested objects, arrays, and large files efficiently.

## Triggers
Use this skill when:
- User uploads a .json file
- User asks to "analyze JSON structure"
- User mentions "validate JSON"
- User requests JSON schema generation
- Conversation involves JSON data exploration

Do NOT use when:
- User wants to create/generate JSON (use json-generator)
- Simple JSON formatting needed (use json-formatter)
- Converting from other formats (use data-converter)

## Inputs

### Required
- \`file_path\`: Path to JSON file or JSON string

### Optional
- \`depth_limit\`: Maximum nesting level to analyze (default: unlimited)
- \`sample_values\`: Show example values (default: true)
- \`generate_schema\`: Create JSON schema (default: false)
- \`validate_against\`: Schema to validate against (optional)

## Process

### Step 1: Load and Parse
- Read JSON file or parse JSON string
- Handle encoding issues (UTF-8, etc.)
- Catch parse errors with detailed location

### Step 2: Structure Analysis
- Traverse object recursively
- Count nodes, arrays, objects
- Track maximum depth
- Identify data types used

### Step 3: Pattern Detection
- Find repeated structures
- Detect naming conventions
- Identify potential normalization opportunities
- Flag inconsistencies

### Step 4: Generate Report
- Create visual structure map
- List all unique keys/paths
- Provide statistics
- Generate schema if requested

## Outputs

### Analysis Report
\`\`\`json
{
  "structure": {
    "depth": 4,
    "total_keys": 127,
    "total_arrays": 15,
    "total_objects": 34
  },
  "types": {
    "string": 56,
    "number": 42,
    "boolean": 12,
    "null": 3,
    "array": 15,
    "object": 34
  },
  "patterns": {
    "naming_convention": "snake_case",
    "consistent": true,
    "repeated_structures": ["user_data", "address"]
  },
  "schema": { ... }  // if requested
}
\`\`\`

## Error Handling

1. **Invalid JSON**
   - Show exact error location (line/column)
   - Suggest common fixes (missing comma, quotes)
   
2. **File Too Large**
   - Offer to analyze in streaming mode
   - Suggest sampling approach

3. **Circular References**
   - Detect and report locations
   - Provide graph visualization option

## Examples

### Example 1: API Response Analysis
User: "Analyze this API response structure"
Result: Complete breakdown of response schema with field types

### Example 2: Schema Generation
User: "Generate a JSON schema for this config file"
Result: Valid JSON Schema draft-07 specification

### Example 3: Validation
User: "Check if this JSON matches our schema"
Result: Validation report with specific errors/warnings

## Dependencies

### Required
- \`json\` (built-in Python)
- \`jsonschema>=4.0.0\` - Schema validation

### Optional
- \`jq\` - Advanced querying
- \`genson>=1.2.0\` - Schema generation

## Notes

- For files > 50MB, uses streaming parser
- Maintains memory efficiency with iterative parsing
- Can handle JSONL (JSON Lines) format
- Supports JSON5 extensions when specified


---

## ✅ Checklist de Calidad

Al crear un SKILL.md, verifica:

- [ ] Nombre claro y descriptivo
- [ ] Descripción en 1-3 oraciones
- [ ] Triggers con casos positivos y negativos
- [ ] Inputs documentados con tipos y defaults
- [ ] Process con pasos numerados y lógica clara
- [ ] Outputs con ejemplos de éxito y error
- [ ] Error handling con al menos 3 casos comunes
- [ ] Examples con al menos 2 casos de uso
- [ ] Dependencies listadas completamente
- [ ] Notes con consideraciones especiales

---

## 🚀 Próximos Pasos

👉 **Siguiente**: [3.3 - Triggers y Condiciones](#3-3)

👉 **Práctica**: [3.4 - Proyecto: Skill de Análisis de Datos](#3-4)

---

## 💡 Ejercicio

Crea un SKILL.md completo para: **"Email Summarizer"**

Debe:
- Leer emails de diferentes formatos (Gmail, Outlook)
- Extraer puntos clave
- Generar resumen ejecutivo
- Detectar acción requerida

*Tiempo: 30 minutos*

---

**Dificultad**: ⭐⭐ Intermedio  
**Tiempo estimado**: 45 minutos
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

Crea un SKILL.md completo para: **"Email Summarizer"**

Debe:
- Leer emails de diferentes formatos (Gmail, Outlook)
- Extraer puntos clave
- Generar resumen ejecutivo
- Detectar acción requerida

*Tiempo: 30 minutos*`,
            type: `text`
          }
        },
        {
          id: `3-3`,
          title: `Triggers y Condiciones: La Clave de la Activación`,
          time: `60 min`,
          difficulty: `⭐⭐⭐ Intermedio-Avanzado`,
          content: `# 3.3 - Triggers y Condiciones: La Clave de la Activación

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

\`\`\`markdown
## Triggers
- Usuario dice "analyze"
- Usuario menciona "data"
\`\`\`

**Problema**: Demasiado amplio
- "Can you analyze why my code fails?" → ¿Analizar datos o código?

**Mejor**:
\`\`\`markdown
## Triggers
- Usuario dice "analyze" + ["data", "csv", "statistics", "metrics"]
- Usuario menciona "data quality" o "data validation"
\`\`\`

---

### 2. Contexto de Conversación

**Considera el historial**

\`\`\`markdown
## Triggers
- Usuario subió archivo CSV en mensajes anteriores
- Conversación sobre análisis de datos
- Usuario pidió estadísticas en mensaje previo
\`\`\`

**Ejemplo**:
\`\`\`
User: "I have sales data from Q1"
Agent: [nota el contexto]
User: "Can you check it?"
Agent: [activa CSV analyzer skill - "it" refiere a sales data]
\`\`\`

---

### 3. Presencia de Artefactos

**Basado en archivos o datos**

\`\`\`markdown
## Triggers
- Archivo con extensión .csv presente
- URL detectada en mensaje
- Código entre backticks \`\`\`
- JSON/XML detectado
\`\`\`

**Ventaja**: Alta precisión
**Desventaja**: Requiere parseo

---

### 4. Intención del Usuario

**Más sofisticado**

\`\`\`markdown
## Triggers

### Intenciones que activan este skill:
- EXPLORATION: Usuario quiere explorar datos
- VALIDATION: Usuario quiere verificar calidad
- COMPARISON: Usuario compara datasets

### Señales de intención:
- Preguntas exploratorias: "what's in", "show me", "explore"
- Preguntas de validación: "is this correct", "check if", "validate"
- Preguntas comparativas: "compare", "difference between", "vs"
\`\`\`

---

### 5. Condiciones Compuestas

**Múltiples requisitos**

\`\`\`markdown
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
\`\`\`

---

## 🎨 Patterns de Triggers Efectivos

### Pattern 1: Explícito + Implícito

Combina keywords exactos con contexto

\`\`\`markdown
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
\`\`\`

---

### Pattern 2: Cascada de Especificidad

Triggers ordenados de más a menos específico

\`\`\`markdown
# SKILL: Python Code Reviewer

## Triggers (en orden de prioridad)

### Nivel 1 - DEFINITIVAMENTE ACTIVAR:
- Usuario dice "review this Python code"
- Usuario pega código Python con \`\`\`python
- Usuario pregunta "what's wrong with this code?" + código Python visible

### Nivel 2 - PROBABLEMENTE ACTIVAR:
- Usuario menciona "Python" + "bug" o "error"
- Usuario comparte traceback de Python
- Conversación previa sobre código Python

### Nivel 3 - CONSIDERAR ACTIVAR:
- Usuario pregunta sobre "best practices" en conversación Python
- Usuario menciona PEP8 o Python conventions
\`\`\`

---

### Pattern 3: Exclusión Mutua

Define claramente cuándo NO activar

\`\`\`markdown
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
\`\`\`

---

## 🧪 Testing de Triggers

### Tabla de Test Cases

\`\`\`markdown
## Trigger Test Matrix

| User Input | Should Activate? | Reason |
|-----------|------------------|---------|
| "analyze sales.csv" | ✅ YES | Explicit + file |
| "what's in this data?" + CSV uploaded | ✅ YES | Context + artifact |
| "how to analyze data in Python" | ❌ NO | Tutorial, not analysis request |
| "can you check if my data is clean?" | ✅ YES | Validation intent + data context |
| "analyze my code for bugs" | ❌ NO | Code analysis, not data |
\`\`\`

### Casos Edge

\`\`\`markdown
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
\`\`\`

---

## 💡 Ejemplos Reales

### Ejemplo 1: E-commerce Product Recommender

\`\`\`markdown
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
✅ "What laptop should I buy for video editing under \$2000?"
✅ "Recommend headphones for running"
✅ "I need a gift for a 10-year-old who likes science"

### Non-Trigger Phrases:
❌ "How do I return a product?" (customer service)
❌ "What are the specs of product X?" (information query)
❌ "Recommend me a good API framework" (not e-commerce product)

## Trigger Logic

\`\`\`
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
\`\`\`
\`\`\`

---

### Ejemplo 2: Meeting Scheduler

\`\`\`markdown
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
\`\`\`
"Schedule a meeting with John next Tuesday at 2pm"
→ Has: keyword + time + participant

"Can you find time for our team meeting this week?"
→ Has: keyword + time range + group

"I need to meet with the client before Friday"
→ Has: intent + participant + deadline
\`\`\`

❌ DON'T ACTIVATE:
\`\`\`
"What meetings do I have today?"
→ Query only, not scheduling

"Meeting notes from yesterday"
→ Different skill (note-taker)

"The meeting was productive"
→ Statement, not action request
\`\`\`

## Trigger Decision Tree

\`\`\`
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
\`\`\`
\`\`\`

---

### Ejemplo 3: Code Bug Detector

\`\`\`markdown
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

\`\`\`
IF code_present AND user_intent_unclear:
    ASK: "I can help you with:
          1. Finding bugs 🐛
          2. Explaining how this works 📖
          3. Improving the code ⚡
          4. Writing tests 🧪
         What would be most helpful?"
\`\`\`

## Example Trigger Evaluation

\`\`\`
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
\`\`\`

\`\`\`
Input: "How would you write a function to sort a list?"

Analysis:
❌ No existing code
❌ Request to write new code
❌ Not debugging scenario
✅ Matches code-generator pattern

Action:
→ DON'T ACTIVATE bug detector
→ Route to code-generator instead
\`\`\`
\`\`\`

---

## 🔬 Avanzado: Trigger Scoring

Para sistemas más sofisticados, usa un sistema de puntuación:

\`\`\`markdown
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

\`\`\`
Total Score >= 50: ACTIVATE with high confidence
Total Score 30-49: ACTIVATE with medium confidence (ask confirmation)
Total Score < 30: DON'T ACTIVATE (not enough signals)
\`\`\`

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
\`\`\`

---

## 🎓 Best Practices

### ✅ Do's

1. **Be Specific**
   \`\`\`markdown
   ❌ Trigger: User asks about data
   ✅ Trigger: User says "analyze" + mentions CSV/data + wants insights
   \`\`\`

2. **Include Examples**
   \`\`\`markdown
   ## Triggers
   Examples that SHOULD activate:
   - "What are the top 5 products?"
   - "Show me sales trends"
   
   Examples that should NOT activate:
   - "How do I calculate trends?" (tutorial)
   - "Tell me about trend analysis" (information)
   \`\`\`

3. **Consider User Intent**
   \`\`\`markdown
   Same words, different intent:
   - "Review this code" → code-reviewer ✅
   - "Review this article" → content-reviewer ✅
   - "Review our meeting notes" → note-summarizer ✅
   \`\`\`

4. **Test Edge Cases**
   \`\`\`markdown
   Test these specifically:
   - Negations: "don't analyze yet"
   - Questions: "should I analyze?"
   - Conditionals: "if valid, then analyze"
   - Ambiguous: "check this"
   \`\`\`

### ❌ Don'ts

1. **Don't Be Vague**
   \`\`\`markdown
   ❌ Trigger: When relevant
   ❌ Trigger: If user needs help
   ❌ Trigger: For data tasks
   \`\`\`

2. **Don't Overlap Without Disambiguation**
   \`\`\`markdown
   ❌ Skill A: Trigger on "review"
      Skill B: Trigger on "review"
   
   ✅ Skill A: Review code (when code present)
      Skill B: Review text (when prose/document present)
   \`\`\`

3. **Don't Ignore Context**
   \`\`\`markdown
   ❌ Trigger: User mentions "Python"
   ✅ Trigger: User mentions "Python" + has code-related question
   \`\`\`

4. **Don't Create Catch-All Triggers**
   \`\`\`markdown
   ❌ Trigger: Any question about data
   ✅ Trigger: Specific data analysis requests with data present
   \`\`\`

---

## 🧩 Exercises

### Exercise 1: Fix These Bad Triggers

\`\`\`markdown
# BAD SKILL: Helper

## Triggers
- When user needs help
- User asks questions
- When appropriate

TASK: Rewrite as specific triggers for "Python Debugging Helper"
\`\`\`

<details>
<summary>Solution</summary>

\`\`\`markdown
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
\`\`\`
</details>

---

### Exercise 2: Create Disambiguation Logic

Two skills might both activate. Write disambiguation logic:

\`\`\`
Skill A: Email Responder (drafts email replies)
Skill B: Email Summarizer (summarizes email threads)

Input: "Help me with this email thread"
\`\`\`

<details>
<summary>Solution</summary>

\`\`\`markdown
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
\`\`\`
</details>

---

## 📊 Trigger Effectiveness Checklist

Use this to evaluate your triggers:

\`\`\`markdown
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
\`\`\`

---

## 🚀 Next Steps

Now that you understand triggers:

1. ✅ Review your existing skills' triggers
2. ✅ Add specific examples
3. ✅ Test with edge cases
4. ✅ Create disambiguation strategies

👉 **Next Module**: [3.4 - Proyecto Práctico: Skill de Análisis](#3-4)

---

**Tiempo estimado**: 60 minutos  
**Dificultad**: ⭐⭐⭐ Intermedio-Avanzado  
**Importancia**: 🔥🔥🔥 CRÍTICA - Este módulo determina si tus skills funcionan o no
`,
          exercise: null
        },
        {
          id: `3-4`,
          title: `Proyecto Práctico: Skill de Análisis de Datos`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 3.4 - Proyecto Práctico: Skill de Análisis de Datos

> Construye un skill funcional desde cero con todas las mejores prácticas

---

## 🎯 Objetivo del Proyecto

Crear un **Data Insight Extractor** - un skill que analiza datasets y extrae insights accionables automáticamente.

**Duración**: 90-120 minutos  
**Nivel**: Intermedio  
**Resultado**: Skill completo y probado

---

## 📋 Especificaciones

### Lo Que Debe Hacer

Tu skill debe:

1. ✅ Aceptar datos CSV o tabulares
2. ✅ Detectar automáticamente tipos de columnas
3. ✅ Identificar patrones interesantes
4. ✅ Generar 3-5 insights accionables
5. ✅ Presentar resultados claramente

### Restricciones

- ⚠️ Máximo 200 líneas el archivo del skill
- ⚠️ Triggers específicos (no genéricos)
- ⚠️ Al menos 5 casos de prueba
- ⚠️ Manejo de errores para 3+ escenarios

---

## 🏗️ Fase 1: Diseño (20 min)

### Paso 1.1: Define el Propósito

**Pregunta**: ¿Qué problema específico resuelve?

\`\`\`markdown
# Tu respuesta aquí:

Este skill resuelve: ___________________

Es diferente de otros porque: ___________________

El usuario objetivo es: ___________________
\`\`\`

**Ejemplo de respuesta**:
\`\`\`markdown
Este skill resuelve: Analistas pasan mucho tiempo haciendo EDA manual

Es diferente porque: Se enfoca en insights ACCIONABLES, no solo estadísticas

Usuario objetivo: Analistas de negocio que necesitan decisiones rápidas
\`\`\`

---

### Paso 1.2: Diseña los Triggers

**Ejercicio**: Completa esta tabla

| Situación | ¿Debe Activarse? | Por Qué |
|-----------|------------------|---------|
| "Analiza ventas.csv" | | |
| "¿Qué formato debe tener un CSV?" | | |
| "Encuentra insights en estos datos" | | |
| "Crea un reporte de Q1" | | |
| "¿Cuál es el promedio de ventas?" | | |

<details>
<summary>Ver respuestas sugeridas</summary>

| Situación | ¿Debe Activarse? | Por Qué |
|-----------|------------------|---------|
| "Analiza ventas.csv" | ✅ SÍ | Análisis explícito + archivo |
| "¿Qué formato debe tener un CSV?" | ❌ NO | Pregunta tutorial, no análisis |
| "Encuentra insights en estos datos" | ✅ SÍ | Solicitud explícita de insights |
| "Crea un reporte de Q1" | ⚠️ PARCIAL | Podría usar nuestros insights como parte |
| "¿Cuál es el promedio de ventas?" | ❌ NO | Pregunta específica, no análisis exploratorio |
</details>

---

### Paso 1.3: Define Inputs y Outputs

**Template para completar**:

\`\`\`markdown
## Inputs

### Required:
- [Input 1]: [tipo] - [descripción]
- [Input 2]: [tipo] - [descripción]

### Optional:
- [Input 3]: [tipo] - [descripción] (default: [valor])

## Outputs

### Success:
[Describe estructura del output exitoso]

### Error:
[Describe estructura del output de error]
\`\`\`

**Tu turno**: Rellena el template para el Data Insight Extractor

---

## 📝 Fase 2: Implementación (40 min)

### Paso 2.1: Estructura Básica

Crea \`data-insight-extractor.md\`:

\`\`\`markdown
# SKILL: Data Insight Extractor

## Metadata
\`\`\`yaml
version: 1.0.0
category: data-analysis
complexity: medium
estimated_time: 10-30 seconds
\`\`\`

## Description
[Tu descripción aquí - 2-3 oraciones]

## Triggers
[Tus triggers aquí - siguiendo el módulo 3.3]

## Inputs
[Tus inputs aquí]

## Process
[Tus pasos aquí]

## Outputs
[Tus outputs aquí]

## Error Handling
[Tus errores aquí]

## Examples
[Tus ejemplos aquí]
\`\`\`

---

### Paso 2.2: Escribe la Sección Process

**Guía**: Tu proceso debe tener 5-7 pasos claros

\`\`\`markdown
## Process

### Step 1: Data Loading & Validation
**Purpose**: [para qué sirve este paso]

**Actions**:
- [Acción 1]
- [Acción 2]

**Validations**:
- [Validación 1]
- [Validación 2]

**Error Handling**:
- If [condición] → [acción]

---

### Step 2: Type Detection
[Similar estructura]

---

[Continúa con 3-5 pasos más]
\`\`\`

**Ejercicio**: Escribe los 5 pasos principales del análisis

<details>
<summary>Ver ejemplo</summary>

\`\`\`markdown
## Process

### Step 1: Data Loading & Validation (5s)
**Purpose**: Ensure data is accessible and well-formed

**Actions**:
- Load CSV with encoding detection
- Parse into structured format
- Validate minimum requirements (>0 rows, >1 column)

**Validations**:
- File exists and readable
- Valid CSV format
- Contains data (not empty)

**Error Handling**:
- If file not found → Return FILE_NOT_FOUND error
- If parsing fails → Try alternative delimiters
- If empty → Return NO_DATA error

---

### Step 2: Type Detection & Profiling (3-5s)
**Purpose**: Understand data structure

**Actions**:
- Detect column types (numeric, categorical, datetime, text)
- Calculate basic statistics per column
- Identify key columns (IDs, dates, metrics)

**Output**: Column metadata with types and basic stats

---

### Step 3: Pattern Recognition (5-10s)
**Purpose**: Find interesting patterns

**Patterns to detect**:
- Trends (increasing/decreasing over time)
- Correlations (strong relationships between columns)
- Distributions (normal, skewed, bimodal)
- Anomalies (outliers, gaps, sudden changes)
- Segments (natural groupings)

**Methods**:
- Time series analysis for date columns
- Correlation matrix for numeric columns
- Frequency analysis for categorical
- Statistical outlier detection

---

### Step 4: Insight Generation (5-10s)
**Purpose**: Convert patterns into actionable insights

**For each pattern found**:
- Assess business relevance (0-10 score)
- Formulate in plain language
- Add supporting evidence (numbers, examples)
- Suggest action if applicable

**Ranking**:
- Sort insights by relevance score
- Keep top 3-5
- Ensure diversity (different types of insights)

---

### Step 5: Output Formatting (2s)
**Purpose**: Present insights clearly

**Structure**:
- Executive summary (2-3 sentences)
- Top insights (3-5 items)
- Supporting data for each
- Recommended next steps

**Format**:
- Clear hierarchy
- Numbers for impact
- Specific, not vague
- Action-oriented
\`\`\`
</details>

---

### Paso 2.3: Ejemplo Completo de Output

**Ejercicio**: Diseña el output para este dataset de ejemplo:

\`\`\`csv
date,product,revenue,units_sold,region
2026-01-01,ProductA,5000,50,North
2026-01-01,ProductB,3000,30,South
2026-01-02,ProductA,5200,52,North
2026-01-02,ProductB,2800,28,South
... (imagine 90 días más)
\`\`\`

**Tu turno**: Escribe cómo debería verse el output

<details>
<summary>Ver ejemplo de output</summary>

\`\`\`markdown
## Output Example

\`\`\`
🔍 DATA INSIGHTS REPORT

Dataset: sales_q1_2026.csv
Analyzed: 92 days, 4 products, 2 regions (368 records)
Generated: 2026-05-18 14:30

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Strong overall growth with clear winner. ProductA dominates with 
consistent gains while ProductB shows concerning decline. Regional 
performance diverging significantly.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOP INSIGHTS (Ranked by Business Impact)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 INSIGHT 1: ProductA Accelerating Growth
   Relevance: 9/10 | Category: Trend | Confidence: High

   Finding:
   ProductA revenue grew 23% over Q1 with acceleration in March 
   (+8% vs +4% in Jan). Units sold tracking proportionally.

   Evidence:
   - Jan avg: \$5,100/day → March avg: \$6,270/day
   - Consistent daily increases (r² = 0.87)
   - No seasonal dips detected

   Recommendation:
   → Invest in ProductA capacity expansion now
   → Forecast suggests Q2 could reach \$650K (vs \$460K in Q1)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📉 INSIGHT 2: ProductB Declining - Urgent Action Needed
   Relevance: 10/10 | Category: Trend | Confidence: High

   Finding:
   ProductB revenue dropped 15% over Q1. Steepest decline in 
   last 2 weeks (-22% vs Q1 average).

   Evidence:
   - Jan avg: \$3,200/day → March avg: \$2,720/day
   - Accelerating decline (worse each month)
   - Both revenue AND units down (not just pricing)

   Recommendation:
   → URGENT: Investigate root cause this week
   → Possible causes: competition, product issues, marketing gap
   → If trend continues, Q2 revenue at risk: -\$45K

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌎 INSIGHT 3: Regional Divergence Widening
   Relevance: 8/10 | Category: Segmentation | Confidence: High

   Finding:
   North region outperforming South by growing margin. Gap 
   widened from 15% to 35% over Q1.

   Evidence:
   - North: +18% growth
   - South: -5% decline
   - Affects BOTH products (not product-specific)

   Recommendation:
   → Compare North vs South operations immediately
   → Identify success factors in North
   → Implement South turnaround plan within 30 days

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 INSIGHT 4: Strong Product-Region Fit Opportunity
   Relevance: 7/10 | Category: Correlation | Confidence: Medium

   Finding:
   ProductA performs exceptionally in North (32% above average).
   ProductB historically stronger in South but now declining.

   Evidence:
   - ProductA-North combo: \$5,800/day average
   - ProductA-South combo: \$4,200/day average
   - Suggest optimization opportunity

   Recommendation:
   → Test increased ProductA marketing in South
   → Investigate if ProductB decline is South-specific
   → Consider regional inventory allocation

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 INSIGHT 5: Stable Weekday Pattern - No Weekend Data
   Relevance: 5/10 | Category: Data Quality | Confidence: High

   Finding:
   All sales occur Mon-Fri. Consistent daily pattern with no 
   weekend activity detected.

   Evidence:
   - Saturday: 0 records
   - Sunday: 0 records
   - Mon-Fri: Normal distribution

   Recommendation:
   → If weekend sales expected: investigate data collection
   → If B2B only: document assumption in reports
   → Consider weekend pilot if consumer-facing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED ACTIONS (Priority Order)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 IMMEDIATE (This Week):
1. Investigate ProductB decline root cause
2. Compare North vs South operations

🟡 SHORT-TERM (Within 30 Days):
3. Expand ProductA capacity
4. Implement South region turnaround plan
5. Test ProductA in South market

🟢 ONGOING:
6. Monitor regional performance weekly
7. Track ProductB recovery metrics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANALYSIS METADATA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Processing time: 8.3 seconds
Patterns analyzed: 15
Insights generated: 12
Top insights selected: 5
Confidence level: High (87% avg)

Want deeper analysis on any insight? Ask me:
- "Explain insight #2 in more detail"
- "Show me the data behind insight #1"
- "What if ProductB decline continues?"
\`\`\`
</details>

---

## 🧪 Fase 3: Testing (30 min)

### Paso 3.1: Casos de Prueba Básicos

Crea una tabla de test cases:

\`\`\`markdown
## Test Cases

| # | Input | Expected Behavior | Pass? |
|---|-------|-------------------|-------|
| 1 | Valid CSV, 100 rows | Generate 3-5 insights | |
| 2 | CSV with missing values | Handle gracefully + warning | |
| 3 | Small dataset (5 rows) | Return "insufficient data" | |
| 4 | All numeric columns | Focus on correlations/trends | |
| 5 | All categorical | Focus on distributions | |
| 6 | Time series data | Detect temporal patterns | |
| 7 | No clear patterns | "No significant patterns detected" | |
| 8 | Corrupted CSV | Clear error message | |
\`\`\`

**Tu tarea**: Ejecuta cada test y marca Pass/Fail

---

### Paso 3.2: Casos Edge

\`\`\`markdown
## Edge Cases to Test

### Edge Case 1: Single Column
Input: CSV con solo 1 columna
Expected: Analyze distribution, no correlations

Test:
\`\`\`csv
revenue
100
150
120
\`\`\`

Result: [Describe qué pasó]

---

### Edge Case 2: Perfect Correlation
Input: Two columns perfectly correlated
Expected: Identify but note it might be derived

Test:
\`\`\`csv
price,revenue
10,100
20,200
30,300
\`\`\`

Result: [Describe qué pasó]

---

### Edge Case 3: All Same Values
Input: Column where all values identical
Expected: Note zero variance, exclude from analysis

Test:
\`\`\`csv
product,revenue
A,100
A,100
A,100
\`\`\`

Result: [Describe qué pasó]
\`\`\`

**Tu tarea**: Prueba al menos 3 edge cases

---

### Paso 3.3: Test de Triggers

\`\`\`markdown
## Trigger Tests

Test each input against your trigger conditions:

| Input | Should Activate? | Actually Activates? | Notes |
|-------|------------------|---------------------|-------|
| "Analyze sales data" | YES | | |
| "Find insights in Q1.csv" | YES | | |
| "How to analyze data?" | NO | | |
| "What's the average?" | NO | | |
| User uploads CSV silently | MAYBE | | Need context |
| "Check this data for issues" | MAYBE | | Validation, not insights |
\`\`\`

---

## 🔧 Fase 4: Refinamiento (20 min)

### Paso 4.1: Checklist de Calidad

\`\`\`markdown
□ Triggers son específicos (no "when relevant")
□ Incluye 3+ ejemplos de activación
□ Incluye 3+ ejemplos de NO activación
□ Process tiene 5-7 pasos claros
□ Cada paso tiene error handling
□ Output format está bien documentado
□ Hay al menos 5 test cases
□ Edge cases considerados
□ Error messages son útiles (no solo "error")
□ Incluye metadata (version, category, etc.)
□ Documentación está completa
□ Archivo es <200 líneas
\`\`\`

Marca cada item. Si <80% completo, refina más.

---

### Paso 4.2: Mejora el Output

**Antes** (output genérico):
\`\`\`
Analysis complete.
Found 3 insights:
1. Revenue increased
2. Product A is popular
3. Some correlation exists
\`\`\`

**Después** (output accionable):
\`\`\`
📈 3 CRITICAL INSIGHTS FOUND

1. 🔴 URGENT: Revenue up 45% but margin down 12%
   → Action: Review pricing strategy within 7 days
   
2. 💰 Product A = 67% of revenue (concentration risk)
   → Action: Accelerate Product B/C development
   
3. 🔗 Strong correlation: Marketing spend → Sales (+0.89)
   → Action: Increase marketing budget 15-20%
\`\`\`

**Tu tarea**: Mejora tu output usando este formato

---

## 📊 Fase 5: Evaluación Final (10 min)

### Rubrica de Evaluación

| Criterio | Puntos | Tu Score |
|----------|---------|----------|
| **Triggers** (específicos, probados) | /20 | |
| **Process** (5-7 pasos claros) | /20 | |
| **Error Handling** (3+ escenarios) | /15 | |
| **Output** (claro, accionable) | /15 | |
| **Testing** (5+ casos) | /15 | |
| **Documentation** (completa) | /10 | |
| **Creatividad/Innovación** | /5 | |
| **TOTAL** | /100 | |

**Scoring**:
- 90-100: Excelente, listo para producción
- 75-89: Muy bueno, ajustes menores
- 60-74: Bueno, necesita refinamiento
- <60: Revisa y mejora

---

## 🎁 Bonus Challenges

Si terminaste antes de tiempo:

### Challenge 1: Multi-Dataset
Modifica el skill para aceptar múltiples CSVs y compararlos

### Challenge 2: Interactive
Agrega modo donde el skill hace preguntas para profundizar

### Challenge 3: Export
Genera un PDF o Markdown del reporte

### Challenge 4: Visualizations
Agrega sugerencias de visualizaciones apropiadas

---

## 📤 Entregables

Al finalizar debes tener:

1. ✅ \`data-insight-extractor.md\` - El skill completo
2. ✅ \`test-cases.md\` - Documentación de pruebas
3. ✅ \`examples/\` - 3+ ejemplos de outputs reales
4. ✅ \`evaluation.md\` - Tu auto-evaluación

---

## 🚀 Siguientes Pasos

Una vez completado este proyecto:

1. **Pruébalo en producción** con datos reales
2. **Itera** basándote en feedback
3. **Comparte** en la comunidad
4. **Crea variaciones** para diferentes dominios

---

## 💡 Solución de Referencia

<details>
<summary>Ver skill completo de ejemplo (solo después de intentarlo tú)</summary>

\`\`\`markdown
# SKILL: Data Insight Extractor

## Metadata
\`\`\`yaml
version: 1.0.0
category: data-analysis
complexity: medium
estimated_time: 10-30s
author: Your Name
last_updated: 2026-05-18
\`\`\`

## Description
Automatically analyzes tabular datasets to extract 3-5 actionable 
business insights. Focuses on patterns, trends, correlations, and 
anomalies that warrant attention. Presents findings in executive-
friendly format with clear recommendations.

## Triggers

### Activate When:
- User says: "find insights", "what insights", "analyze for insights"
- User says: "analyze [data/dataset]" + wants business intelligence
- User uploads data + asks exploratory question
- Context: Data present + need for strategic understanding

### Specific Phrases:
✅ "Find insights in sales_q1.csv"
✅ "What insights can you extract from this data?"
✅ "Analyze this dataset and tell me what's interesting"
✅ "Give me business intelligence from this data"

### Do NOT Activate When:
❌ User asks specific question ("what's the average?")
❌ User wants data validation/cleaning
❌ User wants tutorial on analysis
❌ User wants full statistical report (different skill)
❌ Simple data query (no exploratory intent)

### Disambiguation:
If ambiguous, ask: "Would you like me to:
- Find key insights (this skill)
- Calculate specific statistics
- Validate data quality
- Create a detailed report"

## Inputs

### Required:
- \`data\`: CSV file or tabular data (string or file path)
  - Minimum: 10 rows, 2 columns
  - Maximum: 100K rows (sample if larger)

### Optional:
- \`focus_area\`: string - "trends" | "correlations" | "segments" | "all"
  - Default: "all"
- \`num_insights\`: int - How many insights to return (3-7)
  - Default: 5
- \`min_relevance\`: int - Minimum relevance score (1-10)
  - Default: 7

## Process

### Step 1: Data Loading & Validation (2-3s)
Load data and ensure it meets minimum requirements

Actions:
- Parse CSV with encoding detection
- Validate structure and content
- Sample if >100K rows

Validations:
- Has headers
- Has data (>10 rows)
- Has multiple columns (>1)
- Valid format

Error Handling:
- If <10 rows → return INSUFFICIENT_DATA
- If 1 column → return NEED_MORE_DIMENSIONS
- If corrupted → return INVALID_FORMAT with details

### Step 2: Type Detection & Profiling (3-5s)
Understand data structure and content

Actions:
- Detect column types automatically
- Calculate basic statistics per column
- Identify time columns, IDs, metrics, categories
- Assess data quality (missing %, outliers)

Output: Column metadata with types, stats, roles

### Step 3: Pattern Recognition (8-12s)
Find interesting patterns across multiple dimensions

Patterns analyzed:
- **Trends**: Monotonic increase/decrease over time
- **Correlations**: Strong relationships (|r| > 0.7)
- **Distributions**: Skewness, bimodality, uniformity
- **Anomalies**: Outliers, gaps, sudden changes
- **Segments**: Natural groupings in data
- **Concentration**: High/low concentration ratios

Methods:
- Time series decomposition if date column
- Correlation matrix for numerics
- Chi-square tests for categoricals
- Clustering for segmentation
- Statistical outlier detection (IQR method)

### Step 4: Relevance Scoring (2-3s)
Rank patterns by business impact potential

Scoring factors:
- **Magnitude**: Size of effect (larger = more relevant)
- **Consistency**: Pattern strength (r², p-value)
- **Actionability**: Can this drive decisions?
- **Surprise**: Is this unexpected?
- **Impact**: Affects key metrics?

Score: 0-10 for each pattern

### Step 5: Insight Generation (3-5s)
Convert top patterns into business insights

For top 3-7 patterns:
- Frame in business language (no jargon)
- Add supporting evidence (specific numbers)
- Assess confidence level
- Suggest concrete action
- Estimate potential impact

Structure per insight:
- Finding (1-2 sentences)
- Evidence (2-3 data points)
- Recommendation (specific action + timeline)

### Step 6: Output Formatting (1s)
Present insights in executive format

Format:
- Executive summary (2-3 sentences)
- Ranked insights (by relevance)
- Each insight: Finding + Evidence + Recommendation
- Action priorities (immediate/short-term/ongoing)
- Metadata (processing time, confidence)

## Outputs

### Success Output

[See detailed example in Phase 2, Step 2.3 above]

### Error Outputs

**INSUFFICIENT_DATA**:
\`\`\`
❌ INSUFFICIENT DATA

The dataset has only X rows. I need at least 10 rows to 
extract reliable insights.

Recommendation: Collect more data or use manual analysis for 
small datasets.
\`\`\`

**NO_PATTERNS_FOUND**:
\`\`\`
⚪ NO SIGNIFICANT PATTERNS DETECTED

I analyzed X patterns across Y dimensions but didn't find any 
with relevance score ≥ 7.

This could mean:
- Data is stable/consistent (good for operations)
- Time period too short to see trends
- Need more dimensions to find patterns

Recommendation: Try longer time period or add more data dimensions.
\`\`\`

**INVALID_FORMAT**:
\`\`\`
❌ INVALID DATA FORMAT

Error parsing data at line X:
[specific error message]

Common fixes:
- Check delimiter (comma, tab, semicolon?)
- Verify encoding (UTF-8 recommended)
- Remove special characters in headers
\`\`\`

## Examples

### Example 1: E-commerce Sales Data
[See Phase 2, Step 2.3 for full example]

### Example 2: No Strong Patterns
Input: Stable product sales, minimal variance

Output:
\`\`\`
⚪ ANALYSIS COMPLETE - STABLE PATTERNS

Dataset: product_sales_stable.csv
Analyzed: 90 days, 3 products (270 records)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FINDING

No significant insights found (minimum relevance: 7/10).
All analyzed patterns scored below threshold.

WHAT THIS MEANS:

This is actually good news - your metrics are stable and 
predictable. Consistency can be valuable for planning.

PATTERNS OBSERVED (Below Threshold):

• Sales variance: ±3% (very stable)
• Product mix: Consistent (42/31/27% split unchanged)
• Daily patterns: Predictable (no surprises)

RECOMMENDATION:

✅ Continue current strategy (it's working)
✅ Use this stability for accurate forecasting
⚠️  Monitor for external changes that could disrupt

Want deeper analysis? Try:
- Longer time period (find macro trends)
- Add more dimensions (customer segments, channels)
- Compare to competitors or benchmarks
\`\`\`

## Dependencies

None required. Skill provides high-level analysis using 
standard statistical concepts.

For implementation: pandas, numpy, scipy (standard data stack)

## Notes

- Focuses on ACTIONABLE insights, not academic statistics
- Scores insights by business relevance, not statistical significance
- Designed for business users, not data scientists
- Always provides recommendation with each insight
- Handles edge cases gracefully (small data, no patterns, etc.)

## Testing

See separate test-cases.md file with 8+ scenarios

## Version History

v1.0.0 - Initial release
- Core insight extraction
- 5 pattern types
- Action-oriented output
\`\`\`

</details>

---

**Felicitaciones por completar el proyecto!** 🎉

Ahora tienes un skill production-ready que puedes:
- Usar en tus propios proyectos
- Adaptar para otros dominios
- Compartir con la comunidad
- Incluir en tu portfolio

---

## 📚 Recursos Adicionales

- [Ejemplos de Skills](../../ejemplos/)
- [Template de Skill](#templates)
- [Biblioteca de Skills](#recursos)
- [FAQ](#recursos)

---

**Siguiente**: [Módulo 4 - Integración y Workflows](#4-1)
`,
          exercise: null
        },
        {
          id: `3-5`,
          title: `Laboratorio Guiado: Construcción del Skill de Análisis de Datos (Data Insight Extractor)`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# Laboratorio Guiado: Construcción del Skill de Análisis de Datos (Data Insight Extractor)

Este documento es una guía paso a paso para completar el proyecto práctico del **Módulo 3.4**. Aquí encontrarás instrucciones detalladas sobre qué escribir, plantillas de referencia y la explicación teórica y práctica de **por qué** cada sección del skill se diseña de esa manera.

Al finalizar este laboratorio guiado, habrás creado y validado el archivo \`data-insight-extractor.md\`.

---

## 🏗️ Fase 1: Diseño del Skill (Fase de Definición)

### Paso 1.1: Define el Propósito del Skill
En este paso inicial debes acotar el alcance de tu skill. No queremos crear una herramienta genérica que intente hacer todo, sino un especialista en extraer valor práctico.

* **Qué poner:**
  \`\`\`markdown
  Este skill resuelve: La sobrecarga de información y el tiempo perdido en el análisis exploratorio de datos (EDA) inicial.
  Es diferente de otros porque: No genera solo estadísticas descriptivas (promedios, máximos); traduce patrones numéricos en decisiones de negocio accionables y priorizadas.
  El usuario objetivo es: Analistas de negocio, gerentes de producto y tomadores de decisiones que necesitan comprender un dataset sin escribir código SQL o Python de inmediato.
  \`\`\`
* **Por qué:**
  * Al definir el **problema específico**, evitas la "deriva de alcance" (scope creep).
  * Al diferenciarlo por su **enfoque accionable**, aseguras que el output final aporte valor real (e.g., sugerir una acción en lugar de solo listar números).
  * Al conocer tu **usuario objetivo**, adaptas el tono del output (debe ser ejecutivo y directo, no excesivamente académico).

---

### Paso 1.2: Diseña los Triggers (Garantía de Activación Precisa)
Los triggers le indican al LLM cuándo debe invocar este skill. Si son demasiado amplios, el skill se activará por error; si son muy estrechos, nunca se usará.

* **Qué poner en la sección de Triggers de tu skill:**
  \`\`\`markdown
  ## Triggers

  ### Activate When:
  - El usuario solicita explícitamente insights, patrones, tendencias o descubrimientos sobre un conjunto de datos.
  - El usuario adjunta un archivo tabular (CSV, Excel) y pide "analizarlo" para entender la situación del negocio.
  
  ### Specific Phrases (Ejemplos de Activación):
  - "Encuentra insights en sales_q1.csv"
  - "¿Qué patrones interesantes detectas en esta tabla?"
  - "Analiza este dataset e indícame los puntos clave"
  
  ### Do NOT Activate When (Ejemplos de No Activación):
  - El usuario hace una pregunta puntual de cálculo: "¿Cuál es el promedio de la columna ventas?" (Debe usar una herramienta de consulta directa, no este skill).
  - El usuario quiere limpiar datos: "Elimina los duplicados de esta tabla" (Es una tarea de preprocesamiento, no de insights).
  - El usuario quiere graficar sin analizar: "Haz un gráfico de barras de ventas por región".
  \`\`\`
* **Por qué:**
  * **Triggers de inclusión vs exclusión:** Definir explícitamente cuándo *no* activarse es tan importante como definir cuándo sí. Esto previene que el LLM confunda una consulta estadística simple con un análisis exploratorio completo.
  * **Ejemplos claros:** Los modelos de lenguaje aprenden por ejemplos (few-shot context). Proporcionar frases exactas calibra la sensibilidad del trigger.

---

### Paso 1.3: Define Inputs y Outputs (El Contrato del Skill)
Establece qué necesita recibir el skill obligatoriamente y qué puede recibir de forma opcional, definiendo los rangos permitidos.

* **Qué poner:**
  \`\`\`markdown
  ## Inputs

  ### Required:
  - \`data\`: Dataset en formato tabular (CSV, JSON o texto delimitado). Mínimo 10 filas y 2 columnas para asegurar significancia estadística.
  
  ### Optional:
  - \`focus_area\`: string - Área en la que centrar el análisis ("trends", "correlations", "segments", "all"). Default: "all".
  - \`num_insights\`: int - Cantidad de insights deseados a reportar (rango recomendado: 3 a 7). Default: 5.
  - \`min_relevance\`: int - Puntuación mínima de relevancia de negocio (1 al 10). Default: 7.
  \`\`\`
* **Por qué:**
  * **Límites de tamaño (\`data\`):** Validar un mínimo de filas previene que el skill intente hacer análisis temporal o de correlación con 2 o 3 registros, lo cual daría conclusiones falsas.
  * **Parámetros opcionales con defaults:** Permiten al usuario avanzado personalizar el comportamiento sin complicar la experiencia del usuario básico.

---

## 📝 Fase 2: Implementación del Skill

### Paso 2.1: Estructura de Metadatos y Descripción
Crea el archivo \`data-insight-extractor.md\` y coloca la cabecera YAML.

* **Qué poner:**
  \`\`\`markdown
  # SKILL: Data Insight Extractor

  ## Metadata
  \`\`\`yaml
  version: 1.0.0
  category: data-analysis
  complexity: medium
  estimated_time: 10-30s
  author: Tu Nombre
  last_updated: 2026-05-27
  \`\`\`

  ## Description
  Analiza datasets tabulares cargados por el usuario para extraer insights de negocio clave y accionables de forma automática. Identifica patrones estructurados (tendencias, correlaciones y anomalías), los evalúa por relevancia de negocio y presenta un reporte ejecutivo con recomendaciones prácticas.
  \`\`\`
* **Por qué:**
  * Los **metadatos** permiten categorizar el skill en una biblioteca organizativa y ayudan al sistema a entender el costo temporal esperado (\`estimated_time\`).
  * La **descripción** provee un resumen rápido indexable para humanos y para el enrutador de agentes.

---

### Paso 2.2: Diseña la sección "Process" (El Algoritmo Paso a Paso)
El proceso define las instrucciones lógicas que debe seguir el LLM secuencialmente. Cada paso debe tener un propósito, acciones claras y manejo de errores asociado.

* **Qué poner (Estructura de Procesamiento):**
  Copiar e implementar los siguientes pasos dentro de tu archivo markdown:

  #### Paso 2.2.1: Step 1 - Data Loading & Validation
  * **Qué poner:**
    \`\`\`markdown
    ### Step 1: Data Loading & Validation
    - **Acción**: Detectar la codificación del archivo y el delimitador (coma, punto y coma, tabulador) para cargarlo correctamente en memoria.
    - **Validación**: Comprobar que el dataset tenga más de 10 filas y al menos 2 columnas con datos no nulos.
    - **Manejo de Errores**: Si el formato es ilegible o faltan datos mínimos, abortar el proceso inmediatamente y devolver \`INVALID_FORMAT\` o \`INSUFFICIENT_DATA\`.
    \`\`\`
  * **Por qué**: Cargar datos corruptos o insuficientes a mitad del flujo de análisis genera alucinaciones y respuestas inútiles. Validar al inicio ahorra tokens y tiempo de procesamiento.

  #### Paso 2.2.2: Step 2 - Type Detection & Profiling
  * **Qué poner:**
    \`\`\`markdown
    ### Step 2: Type Detection & Profiling
    - **Acción**: Analizar cada columna para determinar su tipo de dato (Numérico, Categórico, Fecha/Hora, Texto). Calcular métricas rápidas: medias, modas, valores faltantes y varianza.
    \`\`\`
  * **Por qué**: Las operaciones matemáticas permitidas dependen del tipo de dato. Por ejemplo, no puedes buscar correlación de Pearson en variables de texto sin convertirlas, ni buscar tendencias temporales si no identificas primero cuál es la columna de tipo fecha.

  #### Paso 2.2.3: Step 3 - Pattern Recognition (El motor del análisis)
  * **Qué poner:**
    \`\`\`markdown
    ### Step 3: Pattern Recognition
    - **Acción**: Buscar activamente patrones en tres categorías primarias:
      1. **Tendencias (Series de tiempo)**: Direccionalidad positiva/negativa a lo largo de fechas.
      2. **Correlaciones (Numéricos)**: Relación lineal entre variables continuas (ej. precio vs. cantidad).
      3. **Anomalías/Outliers**: Picos inusuales, valles marcados, o caídas repentinas en las métricas principales.
    \`\`\`
  * **Por qué**: Segmentar la búsqueda en técnicas estadísticas estándar estructuradas le da rigor científico al análisis del LLM y reduce la improvisación o la invención de patrones inexistentes.

  #### Paso 2.2.4: Step 4 - Relevance Scoring & Filter
  * **Qué poner:**
    \`\`\`markdown
    ### Step 4: Relevance Scoring & Filter
    - **Acción**: Ponderar cada patrón descubierto asignándole una puntuación del 1 al 10 en función de su impacto potencial de negocio (Magnitud del cambio, Consistencia del patrón y facilidad de acción).
    - **Filtro**: Descartar cualquier insight que no alcance el umbral de \`min_relevance\` definido en los inputs.
    \`\`\`
  * **Por qué**: Un dataset puede tener miles de correlaciones estadísticas irrelevantes (ej. "el ID del cliente correlaciona con la hora de compra"). La puntuación por relevancia filtra el ruido estadístico y mantiene al usuario enfocado en lo que realmente importa para su negocio.

  #### Paso 2.2.5: Step 5 - Output Formatting & Actionable Suggestions
  * **Qué poner:**
    \`\`\`markdown
    ### Step 5: Output Formatting & Actionable Suggestions
    - **Acción**: Redactar los insights seleccionados usando un lenguaje sencillo y no puramente matemático.
    - **Estructura por Insight**: Cada insight debe incluir obligatoriamente:
      1. Título con emoticón indicativo (📈, 📉, ⚠️, 💡).
      2. Hallazgo descriptivo.
      3. Evidencia cuantitativa (datos del dataset que lo respaldan).
      4. Recomendación accionable con un horizonte temporal sugerido.
    \`\`\`
  * **Por qué**: Un insight sin datos de soporte no es confiable. Un insight sin recomendación no sirve para tomar decisiones. Presentarlo con emoticones y estructura fija mejora la legibilidad visual inmediata.

---

### Paso 2.3: Diseña la sección "Outputs" y "Error Handling"
Debes definir plantillas exactas de cómo debe responder el skill tanto en casos de éxito como ante fallos controlados.

* **Qué poner en la sección de Outputs de Error:**
  \`\`\`markdown
  ## Outputs

  ### Error: INSUFFICIENT_DATA
  \`\`\`
  ❌ ERROR: DATOS INSUFICIENTES
  
  El dataset cargado contiene solo X filas. Para poder identificar tendencias y correlaciones con validez estadística mínima, se requiere un dataset con al menos 10 filas.
  
  Sugerencia: Intente consolidar un periodo de tiempo más amplio o añadir más registros a su muestra.
  \`\`\`

  ### Error: INVALID_FORMAT
  \`\`\`
  ❌ ERROR: FORMATO DE ARCHIVO NO SOPORTADO
  
  No he podido interpretar correctamente la estructura del archivo.
  Detalle técnico: [Describir error de delimitador o codificación]
  
  Sugerencia: Asegúrese de que el archivo es un CSV delimitado por comas (,) o punto y coma (;), con cabeceras claras en la primera fila y codificación UTF-8.
  \`\`\`
  \`\`\`
* **Por qué:**
  * El control de errores semántico previene la frustración del usuario. En vez de lanzar un error genérico del sistema, le das una explicación contextual de qué está mal y **cómo solucionarlo**.

---

## 🧪 Fase 3: Testing y Validación (La Fase Crítica)

Una vez completado el archivo del skill, debes validarlo con escenarios reales y extremos.

### Paso 3.1: Tabla de Casos de Prueba Básicos
Prepara una tabla de control para registrar los tests que realices sobre el comportamiento del LLM al ejecutar este skill.

* **Qué poner en tu bitácora de testing (\`test-cases.md\`):**
  \`\`\`markdown
  | ID | Dataset de Entrada | Comportamiento Esperado | Resultado Real | Estado (Pass/Fail) |
  |---|---|---|---|---|
  | 1 | CSV Ventas (100 filas) | Generar 3-5 insights con estructura Hallazgo-Evidencia-Recomendación | Generó 4 insights detallados | Pass |
  | 2 | CSV Vacío (solo cabecera) | Detenerse y arrojar error INSUFFICIENT_DATA | Mostró la tarjeta de error formateada | Pass |
  | 3 | Datos con 1 sola columna | Enfocarse en distribución/anomalías de esa variable, omitiendo correlaciones | Indicó que no hay otras variables para correlacionar | Pass |
  \`\`\`
* **Por qué:**
  * El testing sistemático garantiza que el skill es robusto antes de integrarlo a un flujo de trabajo automatizado más grande.

### Paso 3.2: Pruebas en Casos Extremos (Edge Cases)
¿Qué ocurre si los datos son matemáticamente válidos pero semánticamente inusuales?
* **Caso 1: Correlación Perfecta (\$r = 1.0\$)**: Si tienes una columna "Precio" y una columna "Venta Total = Precio * Cantidad", hay una correlación del 100%. Tu skill debe ser capaz de identificar que esta correlación es artificial (derivada de una fórmula) y no un descubrimiento de negocio real.
* **Caso 2: Varianza Cero**: Una columna donde todos los valores son idénticos (ej. Región = "Norte" en todas las filas). El skill debe identificar la falta de varianza y excluir la variable de análisis de correlación o distribución, reportándola únicamente como un filtro o constante del dataset.

---

## 🔧 Fase 4: Refinamiento y checklist de Calidad

Antes de considerar tu skill finalizado, evalúalo contra esta lista de control de diseño técnico:

1. **¿El archivo tiene menos de 200 líneas?**
   * *Por qué*: Los skills cortos son más fáciles de interpretar por el agente, consumen menos tokens de contexto y ejecutan sus instrucciones de manera más fiel.
2. **¿Cada paso del proceso tiene definido su control de errores?**
   * *Por qué*: Si algo falla en el paso 3 (ej. no se puede computar la correlación por valores nulos), el skill debe saber cómo continuar (saltarse ese análisis o imputar los datos) en lugar de congelar la ejecución.
3. **¿La recomendación de negocio tiene un tiempo límite?**
   * *Por qué*: Decir "Se debe mejorar la conversión" no es accionable. Decir "Ejecutar una campaña dirigida en la región Sur durante las próximas 2 semanas" sí lo es.

---

## 🚀 Siguientes Pasos prácticos para el Estudiante

1. **Crea el archivo final**: Guarda tu implementación estructurada en:
   \`mis-proyectos/data-insight-extractor.md\`
2. **Pruébalo**: Pídele a tu agente Claude de desarrollo que actúe bajo las directrices del skill cargando un dataset ficticio o el ejemplo de e-commerce provisto en la Solución de Referencia de la lección 3.4.
3. **Refina**: Ajusta los triggers y las reglas según el comportamiento observado.
`,
          exercise: null
        }
      ]
    }
);
