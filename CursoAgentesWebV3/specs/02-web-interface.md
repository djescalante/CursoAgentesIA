# Spec 02 — Reglas del Visor Web y Componentes Visuales

> Versión 3.0 · El visor es una SPA 100% offline (sin CDN, sin build).
> Contenido: `js/data/*.js` (spec 01) · Lógica: `js/app.js`, `js/markdown.js` (no tocar para añadir contenido).

---

## 1. Estructura de `COURSE_DATA`

- Los datos se cargan desde `index.html` en este orden **obligatorio**:
  1. `js/data/core.js` — define `const COURSE_DATA` con `modules/resources/templates/examples` vacíos + `achievements`.
  2. `js/data/modulo-0.js` … `modulo-8.js` — cada uno hace `COURSE_DATA.modules.push({...})`.
  3. `js/data/recursos.js`, `templates.js`, `ejemplos.js` — asignan `COURSE_DATA.resources = [...]`, etc.
- Después se cargan `js/prism.js` (stub de compatibilidad), `js/markdown.js` (parser + resaltado) y `js/app.js`.
- **CRÍTICO**: cualquier backtick dentro del contenido DEBE escaparse como `` \` `` (ver spec 01 §4). Un solo backtick sin escapar rompe todo el curso.

## 2. Componentes CSS Vigentes para Contenido Enriquecido

Estos son los **únicos** componentes HTML disponibles dentro del contenido Markdown. Usar otros producirá HTML sin estilo.

### 2.1 Grid de Comparación (`comparison-grid`)
Para comparar dos conceptos (ej. *Agente vs Skill*):

```html
<div class="chart-wrapper">
  <div class="comparison-grid">
    <div class="comparison-card" style="border-left: 4px solid var(--brand-from);">
      <div class="comp-icon">🤖</div>
      <h5>Agente</h5>
      <ul class="comp-list">
        <li><strong>Alcance:</strong> Completo</li>
      </ul>
    </div>
    <div class="comparison-card" style="border-left: 4px solid var(--brand-to);">
      <div class="comp-icon">🛠️</div>
      <h5>Skill</h5>
      <ul class="comp-list">
        <li><strong>Alcance:</strong> Específico</li>
      </ul>
    </div>
  </div>
</div>
```

### 2.2 Grid de Logros/Conceptos (`achievements-grid`)
Para listar características clave o requisitos:

```html
<div class="chart-wrapper">
  <div class="achievements-grid">
    <div class="achievement-card earned">
      <div class="ach-icon">👤</div>
      <div class="ach-name">1. Identity</div>
      <div class="ach-desc">Quién es el agente.</div>
    </div>
  </div>
</div>
```

### 2.3 Contenedor de Diagramas (`visual-diagram-container`)
Para incrustar SVG vectoriales:

```html
<div class="visual-diagram-container">
  <div class="diagram-title">🤖 Estructura de Red</div>
  <svg viewBox="0 0 400 150" width="100%" height="auto">
    <rect x="20" y="50" width="150" height="50" rx="8" fill="rgba(108, 99, 255, 0.1)" stroke="#6C63FF" stroke-width="2"/>
    <text x="95" y="80" fill="#ffffff" font-size="12" text-anchor="middle">Orquestador</text>
  </svg>
</div>
```

### 2.4 Componentes nativos del parser (sin HTML)
- **Checklists interactivos**: `- [ ] tarea` / `- [x] hecha` (clicables, con ARIA).
- **Cajas expandibles**: `<details open><summary>Título</summary>contenido</details>`.
- **Tablas**: con pipes, celdas vacías soportadas y alineación (`:---:` centrado, `---:` derecha).
- **Bloques de código**: resaltado (python, js/ts, json, bash, yaml) + botón **Copiar** automático. Externos de 4 backticks si contienen fences anidados.
- **Mermaid**: ` ```mermaid ` se muestra como código con etiqueta "diagrama" (no hay renderer a propósito: el curso es offline).
- **Imágenes**: `![alt](ruta)` soportadas.
- **Enlaces**: externos abren en pestaña nueva; los internos `#id` navegan dentro de la SPA.

## 3. Clases Eliminadas — NO USAR

Las siguientes clases fueron purgadas del CSS por no usarse. **No las resucites**; si las necesitas, añádelas primero a `css/style.css`:

`memory-grid`, `memory-type-card`, `flow-tabs`, `flow-tab`, `flow-panel`, `flow-svg`, `chain-steps`, `chain-step`, `step-number`, `step-icon`, `step-name`, `step-desc`, `chain-arrow`, `risks-grid`, `risk-card`, `kpi-bars`, `kpi-*`, `css-tabs`, `tab-pane`, `flow-flex`, `flow-step-card`, `parallel-*`, `routing-*`, `router-*`, `route-*`, `matrix-*`, `compare-*`, `qa-*`, `context-merge-visual`, `merge-*`, `factory-deck`, `afc-*`, `spec-*`, `info-box`, `code-viewer`, `chart-title`, `card-bad`, `card-good`.

## 4. Verificación Obligatoria tras Cada Edición

Sustituye al antiguo flujo de build (los scripts `compile_data_js.py`, `update_all.py` y `make_portable.py` fueron archivados y **ya no se usan**). Desde `CursoAgentesWebV3/`:

```powershell
node tests/verify-course.js   # 1. Parseo + conteos + regresiones de contenido
node tests/test-markdown.js   # 2. 41 tests del parser y del resaltado
node tests/test-e2e.js        # 3. Renderiza los 62 contenidos completos
node tests/test-smoke.js      # 4. Smoke test de app.js (init + navegación)
```

Criterio de aceptación: las 4 suites en verde y la consola del navegador sin errores tras abrir `index.html`.

## 5. Publicación

Publicar = guardar y abrir `index.html`. No hay paso de compilación, servidor ni dependencias externas.
