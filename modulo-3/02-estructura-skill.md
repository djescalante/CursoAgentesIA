# 3.2 - Estructura de un SKILL.md

## 📋 Anatomía Completa de un Archivo SKILL.md

Un archivo `SKILL.md` bien estructurado es la clave para que tu skill sea efectivo y reutilizable.

---

## 🏗️ Estructura Estándar

```markdown
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
```

---

## 📝 Secciones Detalladas

### 1. Nombre y Descripción

**Propósito**: Identificar rápidamente qué hace el skill

```markdown
# SKILL: PDF Text Extractor

## Description
Extracts text content from PDF files, handling both digital and scanned documents.
Supports multiple pages and preserves basic formatting.
```

**Mejores prácticas**:
- Nombre claro y descriptivo
- Descripción en 1-3 oraciones
- Mencionar capacidades clave

---

### 2. Triggers (Disparadores)

**Propósito**: Definir cuándo el skill debe activarse

```markdown
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
```

**Mejores prácticas**:
- Lista de condiciones positivas (cuándo SÍ usar)
- Lista de exclusiones (cuándo NO usar)
- Ser específico para evitar activaciones incorrectas

---

### 3. Inputs (Entradas)

**Propósito**: Documentar qué información necesita el skill

```markdown
## Inputs

### Required
- `file_path`: Path to the PDF file (string)
- `operation`: Type of extraction ('full' | 'pages' | 'range')

### Optional
- `pages`: Specific pages to extract (array of integers)
  - Default: all pages
- `preserve_formatting`: Keep original formatting (boolean)
  - Default: true
- `ocr_enabled`: Use OCR for scanned PDFs (boolean)
  - Default: false

### Example Input
```python
{
  "file_path": "/path/to/document.pdf",
  "operation": "range",
  "pages": [1, 2, 5],
  "preserve_formatting": true
}
```
```

---

### 4. Process (Proceso)

**Propósito**: Explicar paso a paso cómo funciona el skill

```markdown
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
```

**Mejores prácticas**:
- Numerar los pasos
- Incluir decisiones lógicas (if/then)
- Mencionar herramientas usadas

---

### 5. Outputs (Salidas)

**Propósito**: Documentar qué retorna el skill

```markdown
## Outputs

### Success Response
```json
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
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "PDF_ENCRYPTED",
    "message": "PDF is password protected",
    "suggestion": "Provide password using 'password' parameter"
  }
}
```
```

---

### 6. Error Handling

**Propósito**: Anticipar y documentar manejo de errores

```markdown
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
```

---

### 7. Examples (Ejemplos)

**Propósito**: Mostrar casos de uso reales

```markdown
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
```

---

### 8. Dependencies

**Propósito**: Listar herramientas y requisitos

```markdown
## Dependencies

### Python Libraries
- `PyPDF2>=3.0.0` - PDF parsing
- `pdfplumber>=0.9.0` - Advanced extraction
- `pytesseract>=0.3.10` - OCR engine
- `pdf2image>=1.16.0` - Page to image conversion
- `Pillow>=9.0.0` - Image processing

### System Requirements
- Tesseract OCR installed (for scanned PDFs)
- Poppler utilities (for pdf2image)
- Minimum 2GB RAM (4GB for OCR)

### Optional
- `textract` - Alternative extraction method
- `camelot-py` - Table extraction from PDFs
```

---

## 🎯 Ejemplo Completo: Skill de Análisis JSON

```markdown
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
- `file_path`: Path to JSON file or JSON string

### Optional
- `depth_limit`: Maximum nesting level to analyze (default: unlimited)
- `sample_values`: Show example values (default: true)
- `generate_schema`: Create JSON schema (default: false)
- `validate_against`: Schema to validate against (optional)

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
```json
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
```

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
- `json` (built-in Python)
- `jsonschema>=4.0.0` - Schema validation

### Optional
- `jq` - Advanced querying
- `genson>=1.2.0` - Schema generation

## Notes

- For files > 50MB, uses streaming parser
- Maintains memory efficiency with iterative parsing
- Can handle JSONL (JSON Lines) format
- Supports JSON5 extensions when specified
```

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

👉 **Siguiente**: [3.3 - Triggers y Condiciones](03-triggers-condiciones.md)

👉 **Práctica**: [3.4 - Proyecto: Skill de Análisis de Datos](04-proyecto-skill-datos.md)

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
