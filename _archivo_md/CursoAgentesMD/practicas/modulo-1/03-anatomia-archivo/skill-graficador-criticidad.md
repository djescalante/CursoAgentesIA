# SKILL: Generador de Gráfica de Criticidad

> Toma los datos del ranking de criticidad y genera una gráfica de barras horizontales en formato PNG con formato corporativo.

---

## 📋 Metadata

```yaml
skill_name: generador-grafica-criticidad
version: 1.0.0
author: AnalistaSeguridad
created: 2026-05-24
category: data-visualization
complexity: low
```

---

## Description
Este skill recibe una lista estructurada de los sitios más críticos con sus respectivas puntuaciones, totales de incidentes y valores de pérdidas. Genera una imagen PNG con barras horizontales donde el eje Y muestra la etiqueta compuesta `UBICACIÓN | TIPO | CÓDIGO` e información secundaria como número de incidentes y pérdida económica total. El eje X representa el puntaje de criticidad calculado de 0 a 1.

---

## Triggers

### Use this skill when:
- [x] El usuario solicita ver un gráfico o representación visual de la criticidad de los sitios.
- [x] El skill `analisis-criticidad-excel` ha finalizado con éxito y se requiere el output gráfico.
- [x] Se necesita ilustrar un reporte periódico con indicadores visuales de riesgos.

### Do NOT use this skill when:
- [ ] No se tienen datos estructurados previos del ranking (debe ejecutarse primero `analisis-criticidad-excel`).

### Keywords/Phrases that trigger this skill:
```
"graficar criticidad", "hacer grafico de barras", "visualizar top de sitios", "guardar imagen del top"
```

---

## Inputs

### Required Inputs

| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `data` | `list` | Lista de diccionarios con la información de los sitios críticos a graficar. Debe incluir nombre, tipo, código, score, incidentes y pérdidas. | Ver estructura abajo |
| `output_path` | `string` | Ruta relativa desde el workspace donde se guardará la imagen PNG resultante. | `practicas/modulo-1/03-anatomia-archivo/ejemplos/top_criticidad.png` |

#### Data Parameter Structure
```json
[
  {
    "ubicacion": "BARRIO TUNJUELITO",
    "tipo": "ATM",
    "codigo": "4102",
    "total_incidentes": 3,
    "valor_perdida_total": 0,
    "criticality_score": 0.952
  },
  {
    "ubicacion": "RIOMERCADO",
    "tipo": "ATM",
    "codigo": "7505",
    "total_incidentes": 4,
    "valor_perdida_total": 145900000,
    "criticality_score": 0.814
  }
]
```

---

## Process

### Overview
El skill configura el lienzo de matplotlib, prepara las etiquetas complejas, ordena los datos de forma ascendente en el gráfico, dibuja las barras horizontales y guarda el resultado en disco.

### Detailed Steps

#### Step 1: Preparación y Ordenamiento
- Recibir la lista de entrada.
- Invertir el orden de la lista para que el sitio con mayor score (primer lugar) quede en la parte superior del gráfico de barras horizontal (matplotlib las dibuja de abajo hacia arriba por defecto).

#### Step 2: Construcción de Etiquetas
- Iterar sobre la lista y generar la etiqueta del eje Y para cada barra:
  `"{UBICACIÓN} | {TIPO} | {CÓDIGO}\n({total_incidentes} inc., pérdida: ${valor_perdida_total:,.0f})"`
  *(Por ejemplo: "RIOMERCADO | ATM | 7505\n(4 inc., pérdida: $145,900,000)")*

#### Step 3: Renderizado Gráfico
- Configurar el tamaño de la figura (ej. `figsize=(10, 6)`).
- Graficar barras horizontales usando `plt.barh()` de matplotlib o `sns.barplot()`.
- Utilizar una paleta de colores rojos o degradados oscuros corporativos (G4S style).
- Definir el rango del eje X estrictamente de `0.0` a `1.0`.

#### Step 4: Estética y Exportación
- Agregar título descriptivo: `"FRAUDES/SEGURIDAD — Top Sitios Críticos"`.
- Añadir etiquetas de ejes: Eje X = `"Puntaje de criticidad (0–1)"`.
- Guardar la figura en la ruta especificada usando `plt.savefig(output_path, bbox_inches='tight', dpi=150)`.
- Liberar memoria con `plt.close()`.

---

## Outputs

### Success Output Example
```json
{
  "status": "success",
  "data": {
    "image_path": "practicas/modulo-1/03-anatomia-archivo/ejemplos/top_criticidad.png",
    "dimensions": "1500x900 pixels",
    "file_size_kb": 45.2
  }
}
```

---

## Error Handling

### Common Errors

1. **Empty Data List (Datos de Entrada Vacíos)**
   - Detección: El parámetro `data` es una lista vacía o nula.
   - Acción: Detener el proceso y notificar al usuario.
   - Mensaje: `[ERROR] No se proporcionaron datos válidos de ranking para graficar.`

2. **Invalid Output Path (Ruta de Destino Inválida)**
   - Detección: Ocurre un error de sistema (`FileNotFoundError` o `PermissionError`) al intentar guardar el archivo PNG.
   - Acción: Retornar un error de ruta o permisos sugiriendo verificar que los directorios intermedios existan.
   - Mensaje: `[ERROR] No se pudo escribir la imagen en la ruta indicada. Verifique que la ruta de salida sea accesible.`

---

## Examples

### Example 1: Generar gráfica PNG a partir del Top
**Usuario:** "Grafica los resultados y guárdalos en `practicas/modulo-1/03-anatomia-archivo/ejemplos/top_criticidad.png`"

**Skill Action:**
- Lee la lista de datos estructurados de criticidad.
- Invierte el orden, genera etiquetas y dibuja el gráfico usando `matplotlib`.
- Guarda el archivo PNG en la ruta relativa.

---

## Dependencies
- `matplotlib>=3.7.0`
- `seaborn>=0.12.0` (Opcional, para estilo estilizado)

---

## Notes
- La gráfica se genera de manera que el mayor score se dibuja en la barra superior.
- Se recomienda usar resoluciones de 150 DPI para asegurar nitidez en reportes.
