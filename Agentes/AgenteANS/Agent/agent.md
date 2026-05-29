# Agente: Procesador de Indicadores ANS por Operador

## Descripción
Este agente automatiza el procesamiento de archivos de incidentes para generar reportes de cumplimiento de ANS (Acuerdos de Nivel de Servicio) por operador. Analiza la oportunidad de los incidentes según su prioridad y genera indicadores de efectividad y cumplimiento por períodos de aproximadamente 8 días.

## Objetivo
Procesar archivos Excel de incidentes y crear tablas consolidadas que muestren, para cada operador, la cantidad de incidentes oportunos y no oportunos por nivel de prioridad (Alta, Media, Baja), así como el indicador de efectividad y el total de incidentes gestionados.

## Entradas
- `input_file_path`: Ruta completa al archivo Excel con datos de incidentes (formato: "Incidentes mes DD1-DD2-YYYY.xlsx")
- `output_file_path`: Ruta donde se guardarán los reportes procesados
- `sheet_name_incidentes`: Nombre de la hoja que contiene los incidentes (ej: "alarmas")
- `sheet_name_indicadores`: Nombre de la hoja destino para indicadores (ej: "indicador alarmas")

## Salidas
- Archivo Excel procesado con las siguientes hojas:
  1. **Hoja "indicador alarmas"**: Tablas consolidadas por períodos (~8 días) con 11 columnas y fórmulas dinámicas de Excel.
  2. **Hoja "alarmas"**: Copia de la hoja original con todos los incidentes (renombrada a "alarmas").


## Estructura de Datos

### Columnas Esperadas en Entrada
- `ReconocidoPorNombre` o `operador reconocimiento`: Nombre del operador que reconoce el incidente
- `Cumplimiento_ANS` o `Oportunidad`: Indicador de si fue oportuno o no oportuno (valores: "Oportuno", "No Oportuno")
- `prioridad`: Nivel de prioridad (Alta, Media, Baja)
- `FechaCreacion` o similar: Fecha de creación del incidente para agrupar en períodos

### Estructura de Salida por Período
```
Operador | No oport. | Alta  | Efect. | No oport.2 | Baja | Efect.3 | No oport.4 | Media | Efect.5 | Total Incidentes gestionados
---------|-----------|-------|--------|------------|------|---------|------------|-------|---------|-----------------------------
Operador1| 2         | 209   | 99.0%  | 0          | 161  | 100.0%  |            | 12    | 100.0%  | 382
```

Donde:
- `Efect.` (Alta): `=(C{r}-B{r})/C{r}`
- `Efect.3` (Baja): `=IFERROR((F{r}-E{r})/F{r},1)`
- `Efect.5` (Media): `=IFERROR((I{r}-H{r})/I{r},1)`
- `Total Incidentes gestionados`: `=SUM(C{r},F{r},I{r})`
- Formato de celdas de efectividad: Porcentaje con un decimal (`0.0%`).
- Fila de **Total general** al final de cada tabla sumando las columnas numéricas mediante `=SUM(...)` y calculando efectividades globales.


## Flujo de Trabajo Detallado

### 1. Carga e Inicialización
- Validar que el archivo de entrada existe
- Leer el archivo Excel
- Cargar la hoja de incidentes especificada

### 2. Normalización de Columnas
- Estandarizar nombres de columnas (minúsculas, sin espacios)
- Mapear variantes de nombres de columnas:
  - "ReconocidoPorNombre", "operador reconocimiento" → `operador`
  - "Cumplimiento_ANS", "Oportunidad" → `oportunidad`
  - "prioridad" → `prioridad`

### 3. Validación de Datos
- Verificar que todas las columnas clave existan
- Eliminar filas con operador o oportunidad vacíos
- Validar valores en `oportunidad` (deben ser "Oportuno" o "No Oportuno")
- Validar valores en `prioridad` (deben ser "Alta", "Media" o "Baja")

### 4. Preparación de Períodos
- Extraer fechas de creación de incidentes
- Agrupar incidentes en períodos de ~8 días (considerando rangos naturales del mes)
- Crear etiqueta descriptiva por período (ej: "01-08", "09-16", "17-27")

### 5. Cálculo de Indicadores por Operador y Período
Para cada combinación (Operador, Período, Prioridad):
- Contar total de incidentes
- Contar incidentes no oportunos
- Calcular efectividad = (Total - No Oportunos) / Total * 100

### 6. Construcción de Tablas de Reporte
- Crear una tabla por período
- Cada tabla tiene filas de operadores y columnas de indicadores por prioridad
- Incluir total de incidentes gestionados por operador en el período

### 7. Exportación
- Guardar archivo Excel con:
  - Hoja original de incidentes (preservada)
  - Nueva/actualizada hoja "indicador alarmas" con todas las tablas de períodos
  - Aplicar formato (encabezados en negrita, alineación, bordes)
- Guardar en la ruta especificada

### 8. Validación de Salida
- Verificar que todas las tablas se crearon correctamente
- Generar reporte de procesamiento con:
  - Total de incidentes procesados
  - Total de operadores únicos identificados
  - Rango de fechas cubierto
  - Cantidad de períodos generados

## Habilidades Requeridas

*Consultar `skills.md` para definiciones y código detallado:*

- `excel_reader.load_excel_data()`: Leer archivo de incidentes
- `data_processor.normalize_columns()`: Normalizar nombres de columnas
- `data_processor.validate_data()`: Validar que los datos cumplan con esquema esperado
- `data_processor.map_column_variants()`: Mapear variantes de nombres de columnas
- `period_generator.create_periods()`: Crear períodos de ~8 días
- `data_processor.group_by_operator_period()`: Agrupar incidentes por operador y período
- `indicator_calculator.calculate_indicators()`: Calcular indicadores por grupo
- `pivot_generator.create_period_tables()`: Crear tabla pivote por período
- `excel_writer.export_indicators_to_excel()`: Exportar resultados a Excel
- `report_generator.create_processing_report()`: Generar reporte de procesamiento

## Parámetros Configurables

```yaml
CONFIGURACION:
  MAPEO_COLUMNAS:
    operador:
      - "ReconocidoPorNombre"
      - "operador reconocimiento"
      - "Reconocido Por Nombre"
    
    oportunidad:
      - "Cumplimiento_ANS"
      - "Oportunidad"
      - "cumplimiento ans"
    
    prioridad:
      - "prioridad"
      - "Prioridad"
    
    fecha:
      - "FechaCreacion"
      - "Fecha Creacion"
      - "fechacreacion"
  
  VALORES_VALIDOS:
    oportunidad:
      - "Oportuno"
      - "No Oportuno"
    
    prioridad:
      - "Alta"
      - "Media"
      - "Baja"
  
  PERIODOS:
    tamanio_aproximado: 8  # días
    grupos_defecto:
      - "01-08"
      - "09-16"
      - "17-27"  # adaptable según el mes
  
  FORMATO_EXCEL:
    fuente: "Calibri"
    tamanio_fuente: 11
    encabezados_negrita: true
    colores:
      encabezado: "D3D3D3"
      total: "FFFFFF"
```

## Ejemplos de Uso

### Caso 1: Procesar archivo de Mayo
```
Input: "Incidentes mayo 01-27-2026.xlsx"
Sheet origen: "alarmas"
Sheet destino: "indicador alarmas"

Output: Archivo con tablas de indicadores por operador y período
```

### Caso 2: Parámetros Personalizados
```
input_file_path: "C:/datos/Incidentes mayo 01-27-2026.xlsx"
output_file_path: "C:/reportes/Incidentes_procesados_mayo_2026.xlsx"
sheet_name_incidentes: "alarmas"
sheet_name_indicadores: "indicador alarmas"
```

## Estado de Implementación
- [ ] Versión 1.0 - Funcionalidad básica
- [ ] Versión 1.1 - Validación y manejo de errores
- [ ] Versión 1.2 - Optimización de rendimiento
- [ ] Versión 2.0 - Parámetros configurables avanzados
