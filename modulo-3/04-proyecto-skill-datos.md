# 3.4 - Proyecto Práctico: Skill de Análisis de Datos

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

```markdown
# Tu respuesta aquí:

Este skill resuelve: ___________________

Es diferente de otros porque: ___________________

El usuario objetivo es: ___________________
```

**Ejemplo de respuesta**:
```markdown
Este skill resuelve: Analistas pasan mucho tiempo haciendo EDA manual

Es diferente porque: Se enfoca en insights ACCIONABLES, no solo estadísticas

Usuario objetivo: Analistas de negocio que necesitan decisiones rápidas
```

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

```markdown
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
```

**Tu turno**: Rellena el template para el Data Insight Extractor

---

## 📝 Fase 2: Implementación (40 min)

### Paso 2.1: Estructura Básica

Crea `data-insight-extractor.md`:

```markdown
# SKILL: Data Insight Extractor

## Metadata
```yaml
version: 1.0.0
category: data-analysis
complexity: medium
estimated_time: 10-30 seconds
```

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
```

---

### Paso 2.2: Escribe la Sección Process

**Guía**: Tu proceso debe tener 5-7 pasos claros

```markdown
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
```

**Ejercicio**: Escribe los 5 pasos principales del análisis

<details>
<summary>Ver ejemplo</summary>

```markdown
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
```
</details>

---

### Paso 2.3: Ejemplo Completo de Output

**Ejercicio**: Diseña el output para este dataset de ejemplo:

```csv
date,product,revenue,units_sold,region
2026-01-01,ProductA,5000,50,North
2026-01-01,ProductB,3000,30,South
2026-01-02,ProductA,5200,52,North
2026-01-02,ProductB,2800,28,South
... (imagine 90 días más)
```

**Tu turno**: Escribe cómo debería verse el output

<details>
<summary>Ver ejemplo de output</summary>

```markdown
## Output Example

```
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
   - Jan avg: $5,100/day → March avg: $6,270/day
   - Consistent daily increases (r² = 0.87)
   - No seasonal dips detected

   Recommendation:
   → Invest in ProductA capacity expansion now
   → Forecast suggests Q2 could reach $650K (vs $460K in Q1)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📉 INSIGHT 2: ProductB Declining - Urgent Action Needed
   Relevance: 10/10 | Category: Trend | Confidence: High

   Finding:
   ProductB revenue dropped 15% over Q1. Steepest decline in 
   last 2 weeks (-22% vs Q1 average).

   Evidence:
   - Jan avg: $3,200/day → March avg: $2,720/day
   - Accelerating decline (worse each month)
   - Both revenue AND units down (not just pricing)

   Recommendation:
   → URGENT: Investigate root cause this week
   → Possible causes: competition, product issues, marketing gap
   → If trend continues, Q2 revenue at risk: -$45K

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
   - ProductA-North combo: $5,800/day average
   - ProductA-South combo: $4,200/day average
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
```
</details>

---

## 🧪 Fase 3: Testing (30 min)

### Paso 3.1: Casos de Prueba Básicos

Crea una tabla de test cases:

```markdown
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
```

**Tu tarea**: Ejecuta cada test y marca Pass/Fail

---

### Paso 3.2: Casos Edge

```markdown
## Edge Cases to Test

### Edge Case 1: Single Column
Input: CSV con solo 1 columna
Expected: Analyze distribution, no correlations

Test:
```csv
revenue
100
150
120
```

Result: [Describe qué pasó]

---

### Edge Case 2: Perfect Correlation
Input: Two columns perfectly correlated
Expected: Identify but note it might be derived

Test:
```csv
price,revenue
10,100
20,200
30,300
```

Result: [Describe qué pasó]

---

### Edge Case 3: All Same Values
Input: Column where all values identical
Expected: Note zero variance, exclude from analysis

Test:
```csv
product,revenue
A,100
A,100
A,100
```

Result: [Describe qué pasó]
```

**Tu tarea**: Prueba al menos 3 edge cases

---

### Paso 3.3: Test de Triggers

```markdown
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
```

---

## 🔧 Fase 4: Refinamiento (20 min)

### Paso 4.1: Checklist de Calidad

```markdown
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
```

Marca cada item. Si <80% completo, refina más.

---

### Paso 4.2: Mejora el Output

**Antes** (output genérico):
```
Analysis complete.
Found 3 insights:
1. Revenue increased
2. Product A is popular
3. Some correlation exists
```

**Después** (output accionable):
```
📈 3 CRITICAL INSIGHTS FOUND

1. 🔴 URGENT: Revenue up 45% but margin down 12%
   → Action: Review pricing strategy within 7 days
   
2. 💰 Product A = 67% of revenue (concentration risk)
   → Action: Accelerate Product B/C development
   
3. 🔗 Strong correlation: Marketing spend → Sales (+0.89)
   → Action: Increase marketing budget 15-20%
```

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

1. ✅ `data-insight-extractor.md` - El skill completo
2. ✅ `test-cases.md` - Documentación de pruebas
3. ✅ `examples/` - 3+ ejemplos de outputs reales
4. ✅ `evaluation.md` - Tu auto-evaluación

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

```markdown
# SKILL: Data Insight Extractor

## Metadata
```yaml
version: 1.0.0
category: data-analysis
complexity: medium
estimated_time: 10-30s
author: Your Name
last_updated: 2026-05-18
```

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
- `data`: CSV file or tabular data (string or file path)
  - Minimum: 10 rows, 2 columns
  - Maximum: 100K rows (sample if larger)

### Optional:
- `focus_area`: string - "trends" | "correlations" | "segments" | "all"
  - Default: "all"
- `num_insights`: int - How many insights to return (3-7)
  - Default: 5
- `min_relevance`: int - Minimum relevance score (1-10)
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
```
❌ INSUFFICIENT DATA

The dataset has only X rows. I need at least 10 rows to 
extract reliable insights.

Recommendation: Collect more data or use manual analysis for 
small datasets.
```

**NO_PATTERNS_FOUND**:
```
⚪ NO SIGNIFICANT PATTERNS DETECTED

I analyzed X patterns across Y dimensions but didn't find any 
with relevance score ≥ 7.

This could mean:
- Data is stable/consistent (good for operations)
- Time period too short to see trends
- Need more dimensions to find patterns

Recommendation: Try longer time period or add more data dimensions.
```

**INVALID_FORMAT**:
```
❌ INVALID DATA FORMAT

Error parsing data at line X:
[specific error message]

Common fixes:
- Check delimiter (comma, tab, semicolon?)
- Verify encoding (UTF-8 recommended)
- Remove special characters in headers
```

## Examples

### Example 1: E-commerce Sales Data
[See Phase 2, Step 2.3 for full example]

### Example 2: No Strong Patterns
Input: Stable product sales, minimal variance

Output:
```
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
```

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
```

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
- [Template de Skill](../../templates/skills/SKILL_TEMPLATE.md)
- [Biblioteca de Skills](../../recursos/biblioteca-skills.md)
- [FAQ](../../recursos/faq.md)

---

**Siguiente**: [Módulo 4 - Integración y Workflows](../../modulo-4/01-combinando-skills.md)
