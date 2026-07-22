# AGENTS.md — CursoAgentesWebV3 (Curso Interactivo de Agentes IA)

SPA 100% offline (sin build, sin CDN, sin dependencias). Se abre directo con `index.html`.

## ⚠️ REGLA #1 — OBLIGATORIA antes de tocar contenido

1. Lee `specs/01-content-structure.md` (estructura de lecciones, escapes, enlaces).
2. Lee `specs/02-web-interface.md` (componentes CSS vigentes, clases prohibidas, verificación).
3. Para colaboración multi-agente, lee además `specs/03-agent-workflow.md`.

**NO hace falta leer las lecciones completas**: los specs resumen todas las reglas.

## 🗺️ Mapa de arquitectura

| Ruta | Qué es | ¿Editar? |
|---|---|---|
| `js/data/core.js` | Metadatos del curso + logros (achievements) | ✏️ contenido |
| `js/data/modulo-0.js … modulo-8.js` | Lecciones (1 archivo por módulo) | ✏️ contenido |
| `js/data/recursos.js · templates.js · ejemplos.js` | Secciones extra | ✏️ contenido |
| `js/app.js` | Lógica de la SPA | 🚫 no para contenido |
| `js/markdown.js` | Parser Markdown + resaltado | 🚫 no para contenido |
| `js/prism.js` | Stub de compatibilidad | 🚫 |
| `css/style.css` | Sistema de diseño | solo interfaz |
| `specs/` | Especificaciones canónicas | actualizar si cambian reglas |
| `tests/` | Suite de verificación (node) | ejecutar siempre |

## ⛔ Reglas críticas (resumen — detalle en specs/01 §4)

- Backticks escapados como `` \` `` dentro de los template literals (un fallo = página en blanco).
- Enlaces internos: solo hash-links `#4-2`, `#recursos`, `#templates`, `#ejemplos`, `#progreso` (prohibidas rutas `.md`).
- Fences anidados: externo de 4 backticks.
- Clases CSS eliminadas — NO usar: `memory-grid`, `flow-tabs`, `chain-*`, `kpi-*`… (lista completa en specs/02 §3).
- Sin build step: lo que editas en `js/data/` es lo que se muestra.
- 100% offline: no añadir CDN ni dependencias externas.

## ✅ Verificación obligatoria tras cada edición

Desde `CursoAgentesWebV3/`:

```powershell
node tests/verify-course.js
node tests/test-markdown.js
node tests/test-e2e.js
node tests/test-smoke.js
```

Criterio: las 4 en verde + consola del navegador sin errores.

## ➕ Receta: añadir una lección

1. Abre `js/data/modulo-N.js` del módulo correspondiente.
2. Añade el objeto al array `lessons` (formato en specs/01 §3).
3. Actualiza `totalLessons` en `core.js` y los stats en `index.html`.
4. Ejecuta la verificación (arriba).

## ➕ Receta: añadir un módulo

1. Crea `js/data/modulo-9.js` (copia la estructura de otro módulo).
2. Regístralo en `index.html` con su `<script>` tras `modulo-8.js`.
3. Actualiza `totalLessons` (core.js), stats (`index.html`) y añade el logro `mod-9-master` (core.js).
4. Ejecuta la verificación.
