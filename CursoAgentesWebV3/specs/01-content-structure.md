# Spec 01 — Reglas de Contenido del Curso Web

> Versión 3.0 · Curso web independiente (sin pipeline Markdown → JS).
> Todo el contenido se edita **directamente** en `js/data/*.js`, que es la fuente única de verdad.

---

## 1. Tono y Estilo

- El tono debe ser didáctico, entusiasta y técnico pero accesible.
- Dirígete al lector de "tú".
- Usa emojis moderadamente para destacar secciones (ej. 🛠️ para Prácticas, 💡 para Tips, 🎯 para Objetivos).
- Español para la prosa; los artefactos (agentes, skills, templates) pueden ir en inglés si son más reutilizables así, pero explícalos en español.

## 2. Dónde Vive el Contenido

```
CursoAgentesWebV3/
└── js/data/
    ├── core.js          # Metadatos del curso + logros (achievements)
    ├── modulo-0.js … modulo-8.js   # Un archivo por módulo (COURSE_DATA.modules.push)
    ├── recursos.js      # Cheatsheet, FAQ, guías, biblioteca de skills
    ├── templates.js     # Plantillas de agente y skill
    └── ejemplos.js      # Ejemplos completos
```

- **No existe compilación**: lo que editas en estos archivos es lo que se muestra.
- El orden de carga en `index.html` es obligatorio: `core.js` primero, luego módulos, luego secciones.

## 3. Anatomía de una Lección

Cada lección es un objeto dentro del array `lessons` de su módulo:

```javascript
{
  id: `9-1`,                      // Único en todo el curso; la URL admite #9-1
  title: `Título de la Lección`,
  time: `15 min`,                 // Estimación realista (lectura + práctica)
  difficulty: `⭐ Principiante`,   // ⭐ · ⭐⭐ · ⭐⭐⭐ · ⭐⭐⭐⭐
  content: `# 9.1 - Título de la Lección

## 🎯 Objetivo
...

---
**Dificultad**: ⭐ Principiante
**Tiempo estimado**: 15 minutos
`,
  exercise: {                     // o null si no hay ejercicio
    title: `Ejercicio Práctico`,
    prompt: `## 💡 Ejercicio Práctico\n\n1. Paso uno...`,
    type: `text`
  }
}
```

## 4. Reglas Críticas (CRÍTICO)

1. **Escape de backticks**: el contenido va dentro de *template literals* (acentos graves). Cualquier backtick interno DEBE escaparse como `` \` `` o el archivo JS se rompe y la página queda en blanco.
2. **Enlaces internos**: usa siempre hash-links a lecciones (`[4.2 - Cadenas de Agentes](#4-2)`) o a secciones (`#recursos`, `#templates`, `#ejemplos`, `#progreso`). **Prohibidas** las rutas a archivos `.md`: no existen en el visor.
3. **Fences anidados**: si un bloque de código contiene otros fences ```, el fence externo debe ser de **4 backticks** (```` ````markdown ````) y los internos de 3.
4. **Bloques de código**: siempre con el lenguaje especificado (` ```python `, ` ```json `, ` ```bash `, ` ```yaml `, ` ```markdown `). El resaltado soporta python, javascript/typescript, json, bash/shell y yaml; el resto se muestra como texto. Los bloques ` ```mermaid ` se muestran como código etiquetado (sin renderer, el curso es 100% offline).
5. **HTML embebido**: permitido con moderación usando únicamente los componentes documentados en `specs/02-web-interface.md`.
6. **Referencias a metodologías** (como SDD) deben explicarse brevemente si se introducen por primera vez.
7. **Rutas absolutas del equipo local**: prohibidas en el contenido (usa rutas relativas de ejemplo como `mis-proyectos/`).

## 5. Checklist de Calidad por Lección

- [ ] `id` único con formato `N-M`
- [ ] Sección `## 🎯 Objetivo` al inicio del contenido
- [ ] Bloques de código con lenguaje especificado
- [ ] Ejercicio práctico con pasos accionables (si aplica)
- [ ] Pie con `**Dificultad**` y `**Tiempo estimado**` realistas
- [ ] Sin enlaces a archivos `.md` ni rutas absolutas
- [ ] Suite de verificación en verde (ver `specs/02-web-interface.md` §4)

## 6. Crear un Nuevo Módulo

1. Crea `js/data/modulo-9.js` copiando la estructura de otro módulo.
2. Regístralo en `index.html` con su `<script>` después de `modulo-8.js`.
3. Actualiza `totalLessons` en `core.js` y los textos del hero/meta de `index.html`.
4. Opcional: añade el logro `mod-9-master` en `core.js`.
5. Ejecuta la suite de verificación (`specs/02` §4).
