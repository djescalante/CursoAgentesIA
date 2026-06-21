# Agente de Auditoría de Malos Manejos (Agente_Malos_Manejos)

Este agente está especializado en la validación, limpieza y cruce de reportes operativos de incidentes catalogados como **Malos Manejos** (errores de personal de transportadora de valores, FLM, técnicos, personal interno, etc.). Cruza de forma automática cada registro del reporte semanal/mensual contra las bases de datos de producción de cajeros (ATMs) y sucursales (oficinas) para constatar la veracidad del responsable de cierre asignado.

---

## 📂 Estructura del Agente

El directorio del agente se compone de los siguientes archivos:
* **`Agente_Malos_Manejos.md`**: Definición de la identidad, personalidad, directrices y capacidades del agente.
* **`skill-validador-malos-manejos.md`**: Especificación formal de la habilidad de auditoría y cruce de bases de datos.
* **`validador_reporte.py`**: Script de automatización en Python que ejecuta la lógica de negocio y genera los reportes validados y discrepantes.
* **`README.md`**: Este archivo instructivo de uso y configuración.

---

## 🛠️ Requisitos de Instalación

El script utiliza **Python 3** y las siguientes librerías que deben ser instaladas antes de la primera ejecución:

```bash
pip install pandas openpyxl pyxlsb
```

* **`pandas`**: Para la manipulación avanzada de datos.
* **`openpyxl`**: Motor para leer y escribir archivos Excel `.xlsx`.
* **`pyxlsb`**: Motor necesario para la lectura rápida de la base de datos binaria de cajeros `.xlsb`.

---

## 🧠 Lógica de Negocio y Reglas de Validación

El script implementa los siguientes procesos clave:

1. **Clasificación del Tipo de Sitio (100% Precisión)**:
   * Examina la columna `Ubicacion`. Tras ignorar códigos numéricos y separadores iniciales, busca los prefijos:
     * `'C'` -> Se clasifica como **ATM** (Cajero).
     * `'S'` -> Se clasifica como **Sucursal**.
     * `'ED'` / `'EDF'` -> Se clasifica como **Edificio**.
   * Si no se detecta prefijo de diseño en la ubicación, aplica búsquedas en cascada por palabras clave secundarias en los campos de texto (`KIOSKO`/`KIOSCO`, `GZ`/`GERENCIA`, `EDIFICIO`/`EDF`).

2. **Cruce y Validación de Responsables (`Cajeros PD` y `Coincicde?`)**:
   * **Bypass de Funcionarios**: Si `ResponsableCierre` es `"FUNCIONARIOS"` (caso insensible), se escribe directamente `"FUNCIONARIOS"` en la columna `Cajeros PD` y se marca `Coincicde?` como `True` de forma inmediata sin consultar las bases de datos de producción.
   * Si el responsable del cierre es distinto y el código del sitio se encuentra en la base de datos de cajeros en producción, extrae los proveedores autorizados:
     * Columna **Administración** (Transportadora responsable: ATLAS, BRINKS, TRANSBANK, etc.).
     * Columna **FLM** (Soporte técnico: NCR, DIEBOLD, etc.).
     * *Mapeo especial*: El valor `"SUC"` de administración representa una oficina o funcionario interno, por lo que se mapea automáticamente a `"FUNCIONARIOS"`.
     * Si `ResponsableCierre` coincide con alguno de ellos, `Coincicde?` se marca como `True` y se escribe el valor coincidente en `Cajeros PD`. De lo contrario, se marca como `False` y se escribe la administración registrada por defecto.
   * Si el código del sitio se encuentra en la base de datos de sucursales, el proveedor esperado es siempre `"FUNCIONARIOS"`. Si `ResponsableCierre` coincide, se marca como `True`, de lo contrario `False`.
   * Si el código no existe en ninguna base de datos, `Cajeros PD` es `None` y `Coincicde?` es `False`.

---

## 🚀 Instrucciones de Ejecución

Puedes ejecutar el script directamente desde la terminal con las rutas predeterminadas de ejemplo o especificando tus propios archivos:

### Ejecución básica (Valores por defecto del directorio Ejemplo)
```bash
python validador_reporte.py
```

### Ejecución personalizada con argumentos de línea de comandos
```bash
python validador_reporte.py \
  --report "ruta/al/reporte_malos_manejos.xlsx" \
  --cajeros "ruta/a/cajeros_produccion.xlsb" \
  --sucursales "ruta/a/sucursales_produccion.xlsx" \
  --output "ruta/de/salida/reporte_procesado.xlsx" \
  --mismatches "ruta/de/salida/reporte_discrepancias.xlsx"
```

---

## 📊 Entregables Generados

Al finalizar, el proceso genera dos archivos Excel:
1. **Archivo Procesado Completo**: Una copia idéntica del reporte de malos manejos original que incluye las tres nuevas columnas calculadas y normalizadas: `Tipo de Sitio`, `Cajeros PD` (o `Cajeros PDN`) y `Coincicde?`.
2. **Archivo de Discrepancias (Mismatches)**: Un libro de Excel filtrado que contiene únicamente los registros donde `Coincicde? == False`. Este archivo es ideal para auditar manualmente y enviar por correo electrónico a los proveedores de operaciones para su respectiva aclaración.
