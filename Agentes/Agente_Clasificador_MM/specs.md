# Especificaciones Técnicas (Specs) - Agente Clasificador MM

## Lógica de Clasificación
La clasificación se basa en la columna `Empresa` del archivo original, la cual se mapea a la columna final `TDV`. El agente evalúa esta columna y ubica el archivo en una de las tres carpetas principales.

### Mapeo de Columnas

| Base de Entrada | Archivo Clasificado | Notas |
| :--- | :--- | :--- |
| `fecha` | `fecha creación` | Convertido a formato datetime. |
| (Derivado) | `Mes` | Extraído de `fecha` como texto (e.g. 'JUNIO'). |
| `codigo ` | `Codigo` | - |
| `nombre` | `Nombre` | - |
| `tipo de mal manejo` | `tipo de mal manejo` | - |
| `Empresa` | `TDV` | Clave para la separación de archivos. |

*(Otras columnas en el archivo original como `Cierre` y `comentarios` son omitidas en los archivos generados).*

### Categorías de Empresas

1. **01. Proveedores de máquina**:
   - NCR
   - DIEBOLD
   - BELLTECH

2. **03. Transportadoras**:
   - ATLAS
   - BRINKS
   - TRANSBANK
   - VATCO

3. **02. Proveedores Mtto**:
   - Actúa como la categoría de fallback (por defecto) para cualquier empresa que no esté listada en las dos categorías anteriores.

## Dependencias
- Python 3.x
- `pandas`
- `openpyxl` (para lectura y escritura de Excel en pandas)
