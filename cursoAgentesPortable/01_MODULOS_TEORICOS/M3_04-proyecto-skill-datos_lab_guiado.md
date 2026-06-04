# Laboratorio Guiado: Construcción del Skill de Análisis de Datos (Data Insight Extractor)

Este documento es una guía paso a paso para completar el proyecto práctico del **Módulo 3.4**. Aquí encontrarás instrucciones detalladas sobre qué escribir, plantillas de referencia y la explicación teórica y práctica de **por qué** cada sección del skill se diseña de esa manera.

Al finalizar este laboratorio guiado, habrás creado y validado el archivo `data-insight-extractor.md`.

---

## 🏗️ Fase 1: Diseño del Skill (Fase de Definición)

### Paso 1.1: Define el Propósito del Skill
En este paso inicial debes acotar el alcance de tu skill. No queremos crear una herramienta genérica que intente hacer todo, sino un especialista en extraer valor práctico.

* **Qué poner:**
  ```markdown
  Este skill resuelve: La sobrecarga de información y el tiempo perdido en el análisis exploratorio de datos (EDA) inicial.
  Es diferente de otros porque: No genera solo estadísticas descriptivas (promedios, máximos); traduce patrones numéricos en decisiones de negocio accionables y priorizadas.
  El usuario objetivo es: Analistas de negocio, gerentes de producto y tomadores de decisiones que necesitan comprender un dataset sin escribir código SQL o Python de inmediato.
  ```
* **Por qué:**
  * Al definir el **problema específico**, evitas la "deriva de alcance" (scope creep).
  * Al diferenciarlo por su **enfoque accionable**, aseguras que el output final aporte valor real (e.g., sugerir una acción en lugar de solo listar números).
  * Al conocer tu **usuario objetivo**, adaptas el tono del output (debe ser ejecutivo y directo, no excesivamente académico).

---

### Paso 1.2: Diseña los Triggers (Garantía de Activación Precisa)
Los triggers le indican al LLM cuándo debe invocar este skill. Si son demasiado amplios, el skill se activará por error; si son muy estrechos, nunca se usará.

* **Qué poner en la sección de Triggers de tu skill:**
  ```markdown
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
  ```
* **Por qué:**
  * **Triggers de inclusión vs exclusión:** Definir explícitamente cuándo *no* activarse es tan importante como definir cuándo sí. Esto previene que el LLM confunda una consulta estadística simple con un análisis exploratorio completo.
  * **Ejemplos claros:** Los modelos de lenguaje aprenden por ejemplos (few-shot context). Proporcionar frases exactas calibra la sensibilidad del trigger.

---

### Paso 1.3: Define Inputs y Outputs (El Contrato del Skill)
Establece qué necesita recibir el skill obligatoriamente y qué puede recibir de forma opcional, definiendo los rangos permitidos.

* **Qué poner:**
  ```markdown
  ## Inputs

  ### Required:
  - `data`: Dataset en formato tabular (CSV, JSON o texto delimitado). Mínimo 10 filas y 2 columnas para asegurar significancia estadística.
  
  ### Optional:
  - `focus_area`: string - Área en la que centrar el análisis ("trends", "correlations", "segments", "all"). Default: "all".
  - `num_insights`: int - Cantidad de insights deseados a reportar (rango recomendado: 3 a 7). Default: 5.
  - `min_relevance`: int - Puntuación mínima de relevancia de negocio (1 al 10). Default: 7.
  ```
* **Por qué:**
  * **Límites de tamaño (`data`):** Validar un mínimo de filas previene que el skill intente hacer análisis temporal o de correlación con 2 o 3 registros, lo cual daría conclusiones falsas.
  * **Parámetros opcionales con defaults:** Permiten al usuario avanzado personalizar el comportamiento sin complicar la experiencia del usuario básico.

---

## 📝 Fase 2: Implementación del Skill

### Paso 2.1: Estructura de Metadatos y Descripción
Crea el archivo `data-insight-extractor.md` y coloca la cabecera YAML.

* **Qué poner:**
  ```markdown
  # SKILL: Data Insight Extractor

  ## Metadata
  ```yaml
  version: 1.0.0
  category: data-analysis
  complexity: medium
  estimated_time: 10-30s
  author: Tu Nombre
  last_updated: 2026-05-27
  ```

  ## Description
  Analiza datasets tabulares cargados por el usuario para extraer insights de negocio clave y accionables de forma automática. Identifica patrones estructurados (tendencias, correlaciones y anomalías), los evalúa por relevancia de negocio y presenta un reporte ejecutivo con recomendaciones prácticas.
  ```
* **Por qué:**
  * Los **metadatos** permiten categorizar el skill en una biblioteca organizativa y ayudan al sistema a entender el costo temporal esperado (`estimated_time`).
  * La **descripción** provee un resumen rápido indexable para humanos y para el enrutador de agentes.

---

### Paso 2.2: Diseña la sección "Process" (El Algoritmo Paso a Paso)
El proceso define las instrucciones lógicas que debe seguir el LLM secuencialmente. Cada paso debe tener un propósito, acciones claras y manejo de errores asociado.

* **Qué poner (Estructura de Procesamiento):**
  Copiar e implementar los siguientes pasos dentro de tu archivo markdown:

  #### Paso 2.2.1: Step 1 - Data Loading & Validation
  * **Qué poner:**
    ```markdown
    ### Step 1: Data Loading & Validation
    - **Acción**: Detectar la codificación del archivo y el delimitador (coma, punto y coma, tabulador) para cargarlo correctamente en memoria.
    - **Validación**: Comprobar que el dataset tenga más de 10 filas y al menos 2 columnas con datos no nulos.
    - **Manejo de Errores**: Si el formato es ilegible o faltan datos mínimos, abortar el proceso inmediatamente y devolver `INVALID_FORMAT` o `INSUFFICIENT_DATA`.
    ```
  * **Por qué**: Cargar datos corruptos o insuficientes a mitad del flujo de análisis genera alucinaciones y respuestas inútiles. Validar al inicio ahorra tokens y tiempo de procesamiento.

  #### Paso 2.2.2: Step 2 - Type Detection & Profiling
  * **Qué poner:**
    ```markdown
    ### Step 2: Type Detection & Profiling
    - **Acción**: Analizar cada columna para determinar su tipo de dato (Numérico, Categórico, Fecha/Hora, Texto). Calcular métricas rápidas: medias, modas, valores faltantes y varianza.
    ```
  * **Por qué**: Las operaciones matemáticas permitidas dependen del tipo de dato. Por ejemplo, no puedes buscar correlación de Pearson en variables de texto sin convertirlas, ni buscar tendencias temporales si no identificas primero cuál es la columna de tipo fecha.

  #### Paso 2.2.3: Step 3 - Pattern Recognition (El motor del análisis)
  * **Qué poner:**
    ```markdown
    ### Step 3: Pattern Recognition
    - **Acción**: Buscar activamente patrones en tres categorías primarias:
      1. **Tendencias (Series de tiempo)**: Direccionalidad positiva/negativa a lo largo de fechas.
      2. **Correlaciones (Numéricos)**: Relación lineal entre variables continuas (ej. precio vs. cantidad).
      3. **Anomalías/Outliers**: Picos inusuales, valles marcados, o caídas repentinas en las métricas principales.
    ```
  * **Por qué**: Segmentar la búsqueda en técnicas estadísticas estándar estructuradas le da rigor científico al análisis del LLM y reduce la improvisación o la invención de patrones inexistentes.

  #### Paso 2.2.4: Step 4 - Relevance Scoring & Filter
  * **Qué poner:**
    ```markdown
    ### Step 4: Relevance Scoring & Filter
    - **Acción**: Ponderar cada patrón descubierto asignándole una puntuación del 1 al 10 en función de su impacto potencial de negocio (Magnitud del cambio, Consistencia del patrón y facilidad de acción).
    - **Filtro**: Descartar cualquier insight que no alcance el umbral de `min_relevance` definido en los inputs.
    ```
  * **Por qué**: Un dataset puede tener miles de correlaciones estadísticas irrelevantes (ej. "el ID del cliente correlaciona con la hora de compra"). La puntuación por relevancia filtra el ruido estadístico y mantiene al usuario enfocado en lo que realmente importa para su negocio.

  #### Paso 2.2.5: Step 5 - Output Formatting & Actionable Suggestions
  * **Qué poner:**
    ```markdown
    ### Step 5: Output Formatting & Actionable Suggestions
    - **Acción**: Redactar los insights seleccionados usando un lenguaje sencillo y no puramente matemático.
    - **Estructura por Insight**: Cada insight debe incluir obligatoriamente:
      1. Título con emoticón indicativo (📈, 📉, ⚠️, 💡).
      2. Hallazgo descriptivo.
      3. Evidencia cuantitativa (datos del dataset que lo respaldan).
      4. Recomendación accionable con un horizonte temporal sugerido.
    ```
  * **Por qué**: Un insight sin datos de soporte no es confiable. Un insight sin recomendación no sirve para tomar decisiones. Presentarlo con emoticones y estructura fija mejora la legibilidad visual inmediata.

---

### Paso 2.3: Diseña la sección "Outputs" y "Error Handling"
Debes definir plantillas exactas de cómo debe responder el skill tanto en casos de éxito como ante fallos controlados.

* **Qué poner en la sección de Outputs de Error:**
  ```markdown
  ## Outputs

  ### Error: INSUFFICIENT_DATA
  ```
  ❌ ERROR: DATOS INSUFICIENTES
  
  El dataset cargado contiene solo X filas. Para poder identificar tendencias y correlaciones con validez estadística mínima, se requiere un dataset con al menos 10 filas.
  
  Sugerencia: Intente consolidar un periodo de tiempo más amplio o añadir más registros a su muestra.
  ```

  ### Error: INVALID_FORMAT
  ```
  ❌ ERROR: FORMATO DE ARCHIVO NO SOPORTADO
  
  No he podido interpretar correctamente la estructura del archivo.
  Detalle técnico: [Describir error de delimitador o codificación]
  
  Sugerencia: Asegúrese de que el archivo es un CSV delimitado por comas (,) o punto y coma (;), con cabeceras claras en la primera fila y codificación UTF-8.
  ```
  ```
* **Por qué:**
  * El control de errores semántico previene la frustración del usuario. En vez de lanzar un error genérico del sistema, le das una explicación contextual de qué está mal y **cómo solucionarlo**.

---

## 🧪 Fase 3: Testing y Validación (La Fase Crítica)

Una vez completado el archivo del skill, debes validarlo con escenarios reales y extremos.

### Paso 3.1: Tabla de Casos de Prueba Básicos
Prepara una tabla de control para registrar los tests que realices sobre el comportamiento del LLM al ejecutar este skill.

* **Qué poner en tu bitácora de testing (`test-cases.md`):**
  ```markdown
  | ID | Dataset de Entrada | Comportamiento Esperado | Resultado Real | Estado (Pass/Fail) |
  |---|---|---|---|---|
  | 1 | CSV Ventas (100 filas) | Generar 3-5 insights con estructura Hallazgo-Evidencia-Recomendación | Generó 4 insights detallados | Pass |
  | 2 | CSV Vacío (solo cabecera) | Detenerse y arrojar error INSUFFICIENT_DATA | Mostró la tarjeta de error formateada | Pass |
  | 3 | Datos con 1 sola columna | Enfocarse en distribución/anomalías de esa variable, omitiendo correlaciones | Indicó que no hay otras variables para correlacionar | Pass |
  ```
* **Por qué:**
  * El testing sistemático garantiza que el skill es robusto antes de integrarlo a un flujo de trabajo automatizado más grande.

### Paso 3.2: Pruebas en Casos Extremos (Edge Cases)
¿Qué ocurre si los datos son matemáticamente válidos pero semánticamente inusuales?
* **Caso 1: Correlación Perfecta ($r = 1.0$)**: Si tienes una columna "Precio" y una columna "Venta Total = Precio * Cantidad", hay una correlación del 100%. Tu skill debe ser capaz de identificar que esta correlación es artificial (derivada de una fórmula) y no un descubrimiento de negocio real.
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
   `d:\cursoagenteClaude\modulo-3\data-insight-extractor.md`
2. **Pruébalo**: Pídele a tu agente Claude de desarrollo que actúe bajo las directrices del skill cargando un dataset ficticio o el ejemplo de e-commerce provisto en la sección de soluciones.
3. **Refina**: Ajusta los triggers y las reglas según el comportamiento observado.
