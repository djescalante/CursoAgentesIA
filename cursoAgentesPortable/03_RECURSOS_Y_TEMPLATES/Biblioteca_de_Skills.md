# Biblioteca de Skills Listos para Usar

> Colección de skills probados y funcionales que puedes usar inmediatamente

---

## 📁 Categorías

1. [Procesamiento de Datos](#datos)
2. [Texto y Lenguaje](#texto)
3. [Programación](#programacion)
4. [Productividad](#productividad)
5. [Análisis y Reporting](#analisis)

---

## 📊 Procesamiento de Datos {#datos}

### SKILL: JSON Validator

```markdown
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
```
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
```
```

---

### SKILL: CSV Cleaner

```markdown
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
```
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
```

## Example
Input CSV con problemas:
```
name,email,date
John,,2024-1-5
Jane,jane@test,05/01/2024
John,,2024-1-5  # duplicado
Bob,bob@test.com,January 5 2024
```

Output CSV limpio:
```
name,email,date
John,unknown@domain.com,2024-01-05
Jane,jane@test,2024-01-05
Bob,bob@test.com,2024-01-05
```
```

---

## ✍️ Texto y Lenguaje {#texto}

### SKILL: Text Summarizer

```markdown
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
```
RESUMEN RÁPIDO:
[Tema principal en 1-2 oraciones concisas]
```

### Medium (párrafo)
```
RESUMEN EJECUTIVO:

[Párrafo de 4-6 oraciones cubriendo:
- Tema/contexto
- Puntos principales (2-3)
- Conclusión/implicación]
```

### Long (con bullets)
```
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
```

## Example

Input: [Artículo de 2000 palabras sobre IA]

Output (Medium):
```
RESUMEN EJECUTIVO:

El artículo examina el impacto de los modelos de lenguaje grandes (LLMs) 
en la productividad empresarial. Los estudios muestran aumentos del 30-40% 
en tareas de escritura y programación. Sin embargo, los autores advierten 
sobre dependencia excesiva y la necesidad de verificación humana. Las 
empresas que mejor implementan IA combinan automatización con supervisión 
experta. El futuro apunta hacia herramientas IA más especializadas por 
industria.
```
```

---

### SKILL: Grammar Checker

```markdown
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
```
📝 REVISIÓN COMPLETADA

ERRORES CRÍTICOS (3):
1. Línea 2: "habian" → "habían" (falta tilde)
2. Línea 5: "hubieron problemas" → "hubo problemas" (verbo impersonal)
3. Línea 8: "a ver si" → "haber si" (confusión homófona)

SUGERENCIAS DE ESTILO (2):
1. Línea 3: Oración muy larga (45 palabras). Considerar dividir.
2. Línea 12: Voz pasiva. Considerar voz activa para más claridad.

PUNTAJE GENERAL: 85/100
```
```

---

## 💻 Programación {#programacion}

### SKILL: Code Explainer

```markdown
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

```
🔍 ANÁLISIS DE CÓDIGO

LENGUAJE: Python
TIPO: Función de utilidad

RESUMEN:
Esta función calcula el factorial de un número usando recursión.

EXPLICACIÓN DETALLADA:

Línea 1: `def factorial(n):`
  → Define función llamada 'factorial' que recibe parámetro 'n'

Línea 2: `if n == 0:`
  → Caso base: si n es 0...

Línea 3: `return 1`
  → ...retorna 1 (por definición, 0! = 1)

Línea 4: `return n * factorial(n-1)`
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
```
```

---

### SKILL: Bug Detector

```markdown
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

```
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
```
```

---

## ⚡ Productividad {#productividad}

### SKILL: Meeting Notes Generator

```markdown
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

```
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
```

## Example

Input (transcripción caótica):
```
John: ok so we need to discuss the Q2 launch
Sarah: yeah I think we should target May 15
John: sounds good, Sarah can you handle marketing?
Sarah: sure, I'll need the budget approved by April 1
Mike: I can get that done
John: perfect, anything else?
Sarah: we should review competitor pricing
Mike: I'll pull that data this week
```

Output:
```
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
```
```

---

### SKILL: Email Drafter

```markdown
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

```
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
```

## Examples

### Ejemplo 1: Follow-up

Contexto: "Necesito hacer follow-up de propuesta enviada hace una semana"

Output:
```
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
```

### Ejemplo 2: Apologetic

Contexto: "Voy a llegar tarde a entrega de proyecto, necesito avisar"

Output:
```
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
```
```

---

## 📊 Análisis y Reporting {#analisis}

### SKILL: Trend Analyzer

```markdown
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

```
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
```
```

---

## 🎁 Cómo Usar Estos Skills

### Opción 1: Copiar Directo
Copia cualquier skill completo a un archivo `.md` y úsalo.

### Opción 2: Personalizar
Modifica los skills para tu caso específico.

### Opción 3: Combinar
Agrupa varios skills relacionados en un agente.

---

## 💾 Descargar Todos

Todos estos skills están disponibles en:
```
templates/skills/biblioteca/
```

---

**Total de skills en esta biblioteca**: 12  
**Categorías**: 5  
**Listos para usar**: ✅ Sí
