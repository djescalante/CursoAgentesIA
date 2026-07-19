# Ejercicio Práctico: 01-diseno-sistema

A continuación, se presentan 4 ejemplos de **Implementaciones Reales de Agentes y Skills** en diferentes entornos y casos de uso prácticos, enfocados en resolver problemas corporativos o técnicos comunes.

---

## 1. Agente Generador y Ejecutor de Consultas SQL (Multi-Motor)
**Problema:** Los usuarios de negocio necesitan datos constantemente, pero no saben programar en SQL. El equipo de datos está saturado.
**Diseño del Sistema:**
- **Agente Traductor de Negocio:**
  - **Propósito:** Recibir preguntas en lenguaje natural ("¿Cuáles fueron los productos más vendidos en enero en Monterrey?") y entender la intención.
  - **Input:** Pregunta del usuario + Esquema de la base de datos (nombres de tablas y columnas).
- **Skill Generador SQL:**
  - **Propósito:** Traducir la intención a código SQL específico para el motor (SQL Server, PostgreSQL, MySQL) respetando las sintaxis y funciones propias de cada uno (ej. `TOP` vs `LIMIT`, `ISNULL` vs `COALESCE`).
- **Skill Ejecutor de Consultas (Músculo):**
  - **Propósito:** Conectarse a la base de datos de solo lectura de forma segura, ejecutar la consulta y devolver los resultados en crudo (JSON o CSV).
- **Agente Presentador:** Toma el JSON/CSV crudo y lo transforma en una tabla legible o resumen de texto para el usuario de negocio.

---

## 2. Agente Limpiador y Estandarizador de Excel (Data Cleanser)
**Problema:** Los equipos operativos exportan reportes en Excel de sistemas legacy que vienen con formatos desastrosos, requiriendo horas de limpieza manual antes de poder usarlos.
**Diseño del Sistema:**
- **Agente Analista de Calidad:**
  - **Propósito:** Identificar los problemas comunes en los datos y decidir qué reglas de limpieza aplicar.
- **Skill de Manipulación de Excel (Python/Pandas/OpenPyXL):**
  - **Propósito:** Tomar el archivo crudo y aplicar las transformaciones programáticamente.
  - **Limpiezas aplicadas:**
    1. Reemplazar valores de texto `"NULL"`, `"N/A"`, o `"#VALUE!"` por celdas realmente vacías o nulos reales.
    2. Eliminar dobles o triples espacios dentro de cadenas de texto (ej. "Juan   Perez " -> "Juan Perez").
    3. Corregir y capitalizar nombres propios de forma estandarizada (ej. "mArIA De LoS anGeleS" -> "Maria De Los Angeles").
    4. Homologar formatos de fecha y número que vienen como texto.
  - **Output:** Un archivo Excel limpio y estandarizado listo para su uso en BI (PowerBI, Tableau).

---

## 3. Agente de Soporte Técnico (Triage y Resolución Nivel 1)
**Problema:** La bandeja de entrada de soporte está colapsada con problemas repetitivos y solicitudes críticas mezcladas.
**Diseño del Sistema:**
- **Agente Clasificador (Triage):**
  - **Propósito:** Leer el correo/ticket entrante y etiquetarlo por nivel de urgencia, categoría y sentimiento del cliente.
- **Skill de Búsqueda Vectorial (RAG):**
  - **Propósito:** Buscar en la base de conocimientos interna la posible solución basándose en el problema reportado.
- **Agente Resolutor:**
  - **Propósito:** Si el problema es conocido (ej. "restablecer contraseña", "¿cómo configuro el VPN?"), redacta un correo paso a paso con la solución y cierra el ticket. Si es un problema crítico o desconocido, escala el ticket directamente a un humano añadiendo un resumen del caso.

---

## 4. Agente Paralegal Revisor de Contratos y Documentos
**Problema:** Los abogados dedican demasiadas horas leyendo contratos de cientos de páginas solo para buscar cláusulas abusivas, fechas de vencimiento o renovaciones automáticas.
**Diseño del Sistema:**
- **Skill Lector de Documentos (OCR / PDF Parser):**
  - **Propósito:** Extraer el texto completo de archivos PDF escaneados o Word.
- **Agente Extractor de Entidades (El Lector Rápido):**
  - **Propósito:** Navegar por el texto masivo e identificar datos clave: Nombres de las partes, Fechas de vigencia, Montos, Jurisdicción aplicable.
- **Agente Analista de Riesgos (El Abogado Junior):**
  - **Propósito:** Comparar las cláusulas extraídas con un "Manual de Políticas de la Empresa". Por ejemplo, alertar si el contrato incluye renovaciones automáticas, si las multas por cancelación superan el 10%, o si la jurisdicción no es local.
  - **Output:** Un reporte ejecutivo de una página ("Term Sheet" o Resumen de Riesgos) donde se resaltan en rojo los puntos que el abogado senior debe revisar detalladamente.