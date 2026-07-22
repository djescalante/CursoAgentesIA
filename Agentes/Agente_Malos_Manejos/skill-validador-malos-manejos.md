# SKILL: Validador de Reporte de Malos Manejos

> Cruza reportes de malos manejos contra bases de datos en producción de cajeros y oficinas, realiza clasificación de tipo de sitio y separa discrepancias para auditoría manual.

---

## 📋 Metadata

```yaml
skill_name: validador-malos-manejos
version: 1.0.0
author: AuditorControlInterno
created: 2026-05-26
category: data-validation
complexity: medium
```

---

## Description
Este skill está diseñado para automatizar la auditoría de reportes semanales o mensuales de "malos manejos" operativos. Realiza la lectura de la base de datos de cajeros en formato binario (.xlsb) y de sucursales en formato de hoja de cálculo estándar (.xlsx). Asigna el tipo de sitio de forma inteligente a través de un algoritmo parser de prefijos de ubicación y valida que la entidad que realiza el cierre (`ResponsableCierre`) coincida con los proveedores legítimos registrados en producción (Administración o FLM).

---

## Triggers

### Use this skill when:
- [x] El usuario proporciona un archivo de reporte de incidentes por malos manejos operativos.
- [x] Se requiere cruzar el responsable de cierre de incidentes contra la base de datos de cajeros en producción (`CAJEROS EN PRODUCCION...xlsb`) o de sucursales (`SUCURSALES EN PRODUCCION...xlsx`).
- [x] Se necesita clasificar de manera exacta el `Tipo de Sitio` (ATM, Sucursal, Edificio, GZ, Kiosco) basándose en la columna `Ubicacion` o palabras clave.
- [x] Se requiere extraer en un archivo separado los registros que no coinciden (mismatches) para realizar una revisión manual.

### Do NOT use this skill when:
- [ ] Se quiere realizar un análisis de criticidad o de riesgo cuantitativo por puntuación (en su lugar, usar `analisis-criticidad-excel`).
- [ ] No se dispone de las bases de datos de producción correspondientes para el cruce.

### Keywords/Phrases that trigger this skill:
```
"validar malos manejos", "cruzar reporte de incidentes", "auditar responsables de cierre", "clasificar tipo de sitio malos manejos", "generar reporte de discrepancias"
```

---

## Inputs

### Required Inputs

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `report_path` | `string` | Ruta relativa o absoluta al archivo Excel con los datos de malos manejos. | `D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos/Malos Manejos Para Revision 01 al 29 Abril 2026.xlsx` |
| `cajeros_path` | `string` | Ruta a la base de datos maestro de cajeros en producción (.xlsb). | `D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Cajeros en Produccion/CAJEROS EN PRODUCCION ABRIL 30.xlsb` |
| `sucursales_path` | `string` | Ruta a la base de datos maestro de sucursales en producción (.xlsx). | `D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Sucursales en Produccion/SUCURSALES EN PRODUCCION ABRIL 30.xlsx` |

### Optional Inputs

| Parameter | Type | Default | Description | Example |
|-----------|------|---------|-------------|---------|
| `output_path` | `string` | *(Auto)* | Ruta donde guardar el reporte validado y corregido. | `D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Corregidos.xlsx` |
| `mismatches_path` | `string` | *(Auto)* | Ruta donde guardar el reporte de discrepancias. | `D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Mismatches.xlsx` |

---

## Process

### Overview
El skill ejecuta el script en Python `validador_reporte.py` enviando los parámetros indicados. El script realiza la limpieza, clasificación de tipo de sitio y comparación cruzada lógica, guardando los resultados en las rutas configuradas.

### Detailed Steps

#### Step 1: Carga de Bases de Datos de Producción
- Cargar la hoja `Listado cajeros` del archivo de cajeros utilizando el motor `pyxlsb`.
- Limpiar y normalizar los códigos a tipo entero.
- Extraer las columnas de Administración y FLM (proveedor del cajero).
- Cargar la hoja `SUCURSALES EN PRODUCCION ABRIL ` de oficinas físicas y registrar los códigos de oficinas válidas.

#### Step 2: Carga y Limpieza del Reporte de Incidentes
- Cargar la pestaña de malos manejos flexiblemente (identificando la hoja que contenga "MAL MANEJO").
- Limpiar el campo `Codigo` a numérico.

#### Step 3: Clasificación Inteligente del Tipo de Sitio
- Analizar los tokens en la columna `Ubicacion` tras omitir los códigos numéricos iniciales.
- Si el primer token de diseño es `C`, el sitio se clasifica como `"ATM"`.
- Si el primer token de diseño es `S`, el sitio se clasifica como `"Sucursal"`.
- Si el primer token de diseño es `ED` o `EDF`, el sitio se clasifica como `"Edificio"`.
- Si no hay prefijo de diseño en la ubicación (`None`), se buscan palabras clave secundarias en descripción, alias, ubicación y sensor:
  - `"KIOSKO"` o `"KIOSCO"` -> `"Kiosco"`.
  - `"GZ"`, `"GERENCIA"`, `"ENLACE"`, etc. -> `"GZ"`.
  - `"EDIFICIO"`, `"EDF"` -> `"Edificio"`.
  - Si no coincide con ninguna palabra clave anterior, clasificar como `"ATM"`.

#### Step 4: Auditoría del Responsable de Cierre
- Si el campo `ResponsableCierre` es `"FUNCIONARIOS"` o alguna de sus variantes singular/errores de tipeo (ej. `"funcionario"`, `"fucionarios"`, `"fucionario"`, `"funcioanrios"`) (caso insensible y omitiendo espacios en blanco):
  - Normalizar el valor a `"FUNCIONARIOS"` en la columna del reporte.
  - Escribir directamente `"FUNCIONARIOS"` en la columna `Cajeros PD` y omitir el cruce con producción (asumiendo coincidencia).
- Si el responsable de cierre es distinto a `"FUNCIONARIOS"` y el código existe en la base de datos de cajeros en producción (mes principal o base secundaria):
  - Obtener el proveedor de administración y FLM de producción.
  - Mapear `"SUC"` de administración a `"FUNCIONARIOS"`.
  - Registrar el proveedor esperado en la columna `Cajeros PD`.
- Si el responsable de cierre es distinto a `"FUNCIONARIOS"` y el código existe en la base de datos de sucursales:
  - Escribir `"FUNCIONARIOS"` en `Cajeros PD`.
- Si el código no existe en ninguna base de datos:
  - Escribir vacío/None en `Cajeros PD`.
- **Validación dinámica:** El valor booleano de coincidencia se maneja en el paso de generación de reportes vía fórmulas de Excel.

#### Step 5: Generación de Reportes
- Para la base completa, crear la columna `Coincicde?` utilizando una **fórmula nativa de Excel** (`=EXACT(...)`) que compara dinámicamente `ResponsableCierre` con `Cajeros PD`. Esto asegura que correcciones manuales actualicen la validación.
- Guardar la base completa actualizada con las columnas `Tipo de Sitio`, `Cajeros PD` y `Coincicde?`.
- Filtrar la base completa por `Coincicde?` evaluada internamente como falsa y guardarla como un archivo Excel independiente de discrepancias para su revisión manual directa, conservando también sus respectivas fórmulas.

---

## Outputs

### Success Output Example
```json
{
  "status": "success",
  "data": {
    "total_registros_procesados": 6144,
    "tipo_sitio_distribucion": {
      "ATM": 4618,
      "Sucursal": 1454,
      "GZ": 54,
      "Kiosco": 6,
      "Edificio": 1,
      "NaN": 11
    },
    "mismatches_identificados": 2283,
    "archivo_procesado_path": "D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Para Revision 01 al 29 Abril 2026 Corregidos.xlsx",
    "archivo_mismatches_path": "D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Para Revision Mismatches.xlsx"
  }
}
```

---

## Error Handling

### Common Errors

1. **Missing Excel Engines (Falta pyxlsb)**
   - Detección: Ocurre un `ImportError` al intentar leer archivos `.xlsb`.
   - Acción: El skill indicará que se debe instalar `pyxlsb` mediante `pip install pyxlsb`.
   - Mensaje: `[ERROR] No se pudo leer el archivo de cajeros. Se requiere instalar la librería 'pyxlsb'.`

2. **File Not Found (Archivos Maestros Faltantes)**
   - Detección: No se encuentra alguno de los tres archivos de entrada en las rutas especificadas.
   - Acción: Detener el proceso y alertar al usuario sobre la ruta incorrecta.

---

## Dependencies
- `pandas>=2.0.0`
- `openpyxl>=3.1.0`
- `pyxlsb>=1.0.10`

---

## Notes
- La clasificación de tipo de sitio alcanza el 100% de precisión matemática bajo el conjunto de reglas de diseño implementado.
- El archivo de discrepancias (mismatches) facilita al operador el proceso de filtrado manual para la elaboración de correos electrónicos corporativos.
