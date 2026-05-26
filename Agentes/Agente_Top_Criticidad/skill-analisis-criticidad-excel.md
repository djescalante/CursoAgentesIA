# SKILL: Análisis de Criticidad en Excel

> Procesa bases de datos de incidentes en Excel, limpia códigos, calcula el índice de criticidad ponderado y genera rankings estructurados.

---

## 📋 Metadata

```yaml
skill_name: analisis-criticidad-excel
version: 1.0.0
author: AnalistaSeguridad
created: 2026-05-24
category: data-processing
complexity: medium
```

---

## Description
Este skill está diseñado para el procesamiento y análisis de bases de datos de incidentes de seguridad (robos, fraudes, fleteos). Realiza la normalización y limpieza de códigos identificadores (SiteIDs), detecta y mapea nombres de columnas flexibles de forma autónoma, y calcula una puntuación de criticidad normalizada de 0 a 1 basándose en factores de frecuencia, actividad en los últimos 30 días, recencia del evento, pérdida económica e incidencia de hurtos severos.

---

## Triggers

### Use this skill when:
- [x] El usuario proporciona un archivo de incidentes de seguridad (ej. `.xlsx`, `.xls`).
- [x] El usuario solicita calcular el índice o puntaje de criticidad para sucursales o cajeros automáticos (ATMs).
- [x] Se requiere identificar el Top 3 o Top 5 de sitios más críticos a partir de un listado de eventos históricos.
- [x] Se necesita generar un reporte consolidado con ranking completo en Excel.

### Do NOT use this skill when:
- [ ] El usuario solo tiene datos no tabulados o requiere análisis cualitativo sin base de datos.
- [ ] Se requiere únicamente generar la gráfica (usar `generador-grafica-criticidad`).

### Keywords/Phrases that trigger this skill:
```
"analizar excel de fraudes", "calcular criticidad", "sitios mas criticos", "ranking de incidentes", "criticidad de incidentes"
```

---

## Inputs

### Required Inputs

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `file_path` | `string` | Ruta relativa al archivo Excel con los datos de incidentes desde la raíz del workspace. | `curso-agentes-skills/Agentes/Agente_Top_Criticidad/ejemplos/1. BD_Fraudes (1).xlsx` |

### Optional Inputs

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| `recent_window_days` | `integer` | `30` | Ventana de días para contabilizar actividad reciente. | `60` |
| `weights` | `dict` | Ver default | Pesos para el score. Default: `{"frecuencia": 0.35, "ultimos30d": 0.25, "recency": 0.20, "perdida": 0.15, "hurto": 0.05}` | `{"frecuencia": 0.30, "ultimos30d": 0.30, "recency": 0.20, "perdida": 0.20, "hurto": 0.00}` |

### Input Validation
- El archivo Excel debe contener al menos columnas que representen: Código, Fecha, Tipo de Sitio (ATM/Sucursal), y Ubicación/Nombre.
- Las columnas de pérdida económica y marcador de hurto (Sí/No) son opcionales; si no existen, el skill les asignará un valor base de 0 en el peso.

---

## Process

### Overview
El skill mapea las columnas, limpia códigos y tipos, calcula las métricas normalizadas por SiteID, y genera un dataframe completo ordenado por la puntuación de criticidad (Score desc, total desc, fecha desc).

### Detailed Steps

#### Step 1: Carga y Mapeo Flexible
- Cargar el Excel usando pandas.
- Identificar automáticamente los nombres de las columnas mediante coincidencias parciales (ej. "VALOR PERDIDA" o "VALOR PÉRDIDA" → `perdida`).
- Establecer la `fecha_corte` como la fecha máxima del dataset.

#### Step 2: Limpieza y Normalización
- `codigo_clean`: Extraer solo números del código y formatear con ceros a la izquierda hasta 4 dígitos (ej. "83" → "0083").
- `tipo_normalizado`: Mapear cajeros a "ATM" y oficinas a "SUCURSAL".
- Generar `SiteID` único: `{codigo_clean}-{tipo_normalizado}`.
- Determinar la etiqueta final del sitio tomando el valor de `UBICACIÓN` más reciente asociado a cada `SiteID`.

#### Step 3: Agrupación y Cálculo de Métricas por SiteID
- **Frecuencia Histórica**: Conteo total de eventos.
- **Actividad Reciente**: Conteo de eventos en el rango `[fecha_corte - recent_window_days, fecha_corte]`.
- **Días desde último evento**: Diferencia en días entre la `fecha_corte` y el último evento del `SiteID`.
- **Pérdida Económica**: Sumatoria del valor de pérdida.
- **Hurto Ratio**: Proporción de eventos donde `HURTO == "Sí"` o similar.

#### Step 4: Normalización Min-Max y Puntuación
- Aplicar Min-Max a las métricas. Invertir la métrica de días transcurridos: `Recency = 1 - MinMax(Dias)`.
- Calcular `Score = 0.35*Frecuencia_Norm + 0.25*Actividad_Norm + 0.20*Recency_Norm + 0.15*Perdida_Norm + 0.05*Hurto_Norm`.
- Ordenar los registros y extraer el Top 3 o Top 5.

#### Step 5: Generación de Excel de Salida
- Escribir un archivo Excel con las pestañas: `Ranking_Completo` y `Top5_Global_Ubicacion` (o Top3).

---

## Outputs

### Success Output Example
```json
{
  "status": "success",
  "data": {
    "fecha_corte": "2026-02-28",
    "total_sitios_analizados": 42,
    "top_3_sitios": [
      {
        "site_id": "4102-ATM",
        "ubicacion": "BARRIO TUNJUELITO",
        "total_incidentes": 3,
        "dias_desde_ultima": 2,
        "valor_perdida_total": 0,
        "criticality_score": 0.952
      },
      {
        "site_id": "7505-ATM",
        "ubicacion": "RIOMERCADO",
        "total_incidentes": 4,
        "dias_desde_ultima": 5,
        "valor_perdida_total": 145900000,
        "criticality_score": 0.814
      }
    ],
    "excel_output_path": "curso-agentes-skills/Agentes/Agente_Top_Criticidad/ejemplos/fraudes_ranking_ubicacion.xlsx"
  }
}
```

---

## Error Handling

### Common Errors

1. **File Not Found (Archivo No Encontrado)**
   - Detección: La ruta `file_path` especificada no existe en el sistema.
   - Acción: Retornar un error sugiriendo verificar la ruta relativa al workspace.
   - Mensaje: `[ERROR] No se pudo encontrar el archivo Excel en la ruta especificada.`

2. **Missing Columns (Columnas Clave Faltantes)**
   - Detección: No se encuentra correspondencia para campos obligatorios como Código, Fecha o Tipo.
   - Acción: Detener el análisis e informar qué columnas obligatorias no pudieron ser detectadas.
   - Mensaje: `[ERROR] No se detectaron las columnas requeridas para el análisis. Verifique los nombres del dataset.`

3. **Insufficient Data (Datos Insuficientes)**
   - Detección: El dataset cargado está vacío o contiene menos de 2 registros.
   - Acción: Retornar error de tamaño insuficiente para cálculo de criticidad.
   - Mensaje: `[ERROR] El archivo contiene datos insuficientes para realizar un ranking comparativo.`

---

## Examples

### Example 1: Ejecutar análisis de criticidad completo
**Usuario:** "Calcula la criticidad usando el archivo `curso-agentes-skills/Agentes/Agente_Top_Criticidad/ejemplos/1. BD_Fraudes (1).xlsx`"

**Skill Action:**
- Carga el archivo excel de manera relativa.
- Normaliza los códigos (ej. "83" -> "0083") y genera SiteIDs.
- Calcula el puntaje de criticidad aplicando normalizaciones Min-Max.
- Escribe el reporte en `curso-agentes-skills/Agentes/Agente_Top_Criticidad/ejemplos/fraudes_ranking_ubicacion.xlsx`.

---

## Dependencies
- `pandas>=2.0.0`
- `openpyxl>=3.1.0` (Para lectura/escritura de Excel)
- `numpy>=1.24.0`

---

## Notes
- La ruta del archivo resultante de Excel es relativa al directorio raíz del proyecto (`cursoagenteClaude`).
- La normalización Min-Max devuelve `0` para todas las filas si el valor de la métrica es constante en todos los sitios analizados.
