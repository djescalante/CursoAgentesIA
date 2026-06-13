# Reglas de Interfaz Web y Visualizador

1. **Estructura de `COURSE_DATA` (`CursoAgentesWebV3/js/data.js`)**:
   - El archivo contiene un gran objeto `COURSE_DATA`. Cada módulo es una clave.
   - El contenido se inyecta en la propiedad `content` usando *template literals* (backticks \` \`).
   - **CRÍTICO**: Cualquier backtick (\`) dentro del contenido de markdown DEBE ser escapado usando una barra invertida (\\\`). De lo contrario, el archivo Javascript se romperá y la página quedará en blanco.

2. **Tarjetas de Interfaz (Memory Grid)**:
   - Para destacar conceptos clave (como características de Engram), usa la estructura CSS permitida:
   ```html
   <div class="memory-grid">
     <div class="memory-type-card" style="background: rgba(R, G, B, 0.04); border-color: rgba(R, G, B, 0.15);">
       <div class="memory-icon-header">EMOJI</div>
       <div class="memory-title-card">Título</div>
       <div class="memory-desc-card">Descripción</div>
     </div>
   </div>
   ```

3. **Flujo de Build Portable**:
   - Después de modificar cualquier archivo en `CursoAgentesWebV3` o los `modulo-*/*.md`, se deben ejecutar de forma obligatoria en la raíz del proyecto:
     1. `python update_all.py`
     2. `python make_portable.py`
