# Skills - Agente Clasificador de Malos Manejos

Este agente cuenta con las siguientes habilidades (skills) principales implementadas en su lógica:

1. **Lectura y Escritura de Archivos Excel (`pandas`)**:
   - Capacidad de ingerir archivos de gran volumen.
   - Generación de archivos tabulares filtrados.

2. **Transformación de Datos Tabulares**:
   - Renombrado de columnas de acuerdo con el esquema requerido (e.g., `fecha` -> `fecha creación`).
   - Extracción de información específica (e.g., derivación del `Mes` a partir de fechas).

3. **Clasificación Basada en Reglas de Negocio**:
   - Agrupación iterativa por identificadores clave (e.g., la columna `TDV` / `Empresa`).
   - Enrutamiento dinámico a carpetas basándose en diccionarios de clasificación por tipo de servicio.
