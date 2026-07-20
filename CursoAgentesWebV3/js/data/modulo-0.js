/**
 * Módulo 0 — Inicio y Mapa de Ruta
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
    {
      id: `modulo-0`,
      number: 0,
      icon: `🧭`,
      title: `Inicio y Mapa de Ruta`,
      subtitle: `Tu punto de partida`,
      description: `El mapa de ruta completo del curso y la guía del creador para expandir o agregar nuevas secciones sin fricción.`,
      difficulty: `beginner`,
      lessons: [
        {
          id: `0-1`,
          title: `Mapa de Ruta del Aprendizaje`,
          time: `15 min`,
          difficulty: `⭐ Principiante`,
          content: `# 0.1 - Mapa de Ruta del Aprendizaje

## 🏁 Introducción al Curso

¡Bienvenido al **Curso Práctico de Agentes de IA y Skills con Markdown**! En este curso aprenderás una de las habilidades más demandadas y de vanguardia en la era de la inteligencia artificial: **diseñar, estructurar e implementar agentes de IA gobernados por archivos Markdown**.

Nuestra filosofía central es simple pero sumamente potente:
> **Los agentes y las herramientas (skills) se definen como código en archivos de texto legibles (\`.md\`)**. Esto los hace legibles por humanos, versionables con Git y consumibles de forma nativa por modelos de lenguaje avanzados.

---

## 🗺️ Mapa de Ruta del Curso

A continuación, tienes un resumen de todo lo que aprenderás en este viaje formativo, módulo por módulo.

<div class="chart-wrapper">
  <div class="comparison-grid">
    
    <!-- M1 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-from);">
      <div class="comp-icon">🧠</div>
      <h5>M1: Fundamentos</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Principiante</li>
        <li><strong>Duración:</strong> 35 min</li>
        <li>Conceptos clave de agentes y skills.</li>
        <li>Por qué Markdown es el estándar idóneo.</li>
        <li>Anatomía de archivos de configuración.</li>
      </ul>
    </div>

    <!-- M2 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-from);">
      <div class="comp-icon">🤖</div>
      <h5>M2: Tu Primer Agente</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Principiante</li>
        <li><strong>Duración:</strong> 150 min</li>
        <li>Estructura básica: Identity y Personality.</li>
        <li>Configuración de Capabilities.</li>
        <li><strong>Práctica:</strong> Tu primer asistente personal.</li>
      </ul>
    </div>

    <!-- M3 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-from);">
      <div class="comp-icon">⚡</div>
      <h5>M3: Skills Avanzados</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Intermedio</li>
        <li><strong>Duración:</strong> 145 min</li>
        <li>Anatomía y estructura de un \`SKILL.md\`.</li>
        <li>Mecanismos de activación (Triggers).</li>
        <li><strong>Práctica:</strong> Skill de análisis de CSV.</li>
      </ul>
    </div>

    <!-- M4 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-from);">
      <div class="comp-icon">🔗</div>
      <h5>M4: Integración y Workflows</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Intermedio</li>
        <li><strong>Duración:</strong> 160 min</li>
        <li>Encadenamiento de agentes y skills.</li>
        <li>Control de contexto y memoria (Engram).</li>
        <li><strong>Práctica:</strong> Sistema multi-agente básico.</li>
      </ul>
    </div>

  </div>
</div>

<div class="chart-wrapper" style="margin-top: 16px;">
  <div class="comparison-grid">

    <!-- M5 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-to);">
      <div class="comp-icon">🏢</div>
      <h5>M5: Casos de Uso Reales</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Avanzado</li>
        <li><strong>Duración:</strong> 70 min</li>
        <li>Agente de codificación y refactorización.</li>
        <li>Análisis de documentos y atención al cliente.</li>
        <li>Ejemplos funcionales listos para producción.</li>
      </ul>
    </div>

    <!-- M6 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-to);">
      <div class="comp-icon">🔧</div>
      <h5>M6: Optimización</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Avanzado</li>
        <li><strong>Duración:</strong> 140 min</li>
        <li>Testing y evaluación de prompts.</li>
        <li>Evitar loops infinitos y fugas de tokens.</li>
        <li>Seguridad y límites (Guardrails).</li>
      </ul>
    </div>

    <!-- M7 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-to);">
      <div class="comp-icon">🏆</div>
      <h5>M7: Proyecto Final</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Avanzado</li>
        <li><strong>Duración:</strong> 60 min + proyecto (20-30 h)</li>
        <li>Diseño completo de un sistema multi-agente.</li>
        <li>Sistema de análisis de negocios (BI).</li>
        <li>Evaluación sistemática de resultados.</li>
      </ul>
    </div>

    <!-- M8 -->
    <div class="comparison-card" style="border-left: 4px solid var(--brand-to);">
      <div class="comp-icon">💻</div>
      <h5>M8: Integración IDEs</h5>
      <ul class="comp-list" style="font-size: 13px;">
        <li><strong>Nivel:</strong> Avanzado</li>
        <li><strong>Duración:</strong> 60 min</li>
        <li>IDEs agénticos: OpenCode y Antigravity.</li>
        <li>Uso práctico de \`AGENTS.md\` y \`specs.md\`.</li>
        <li>Estándares reales de la industria.</li>
      </ul>
    </div>

  </div>
</div>

---

## 📈 Lo que serás capaz de construir al finalizar
Al completar la ruta, podrás:
1. **Modelar comportamientos complejos de IA** sin tocar código de programación complejo, solo redactando especificaciones Markdown.
2. **Crear librerías de Skills modulares** para que tus agentes realicen tareas técnicas (análisis estadístico, APIs, archivos de datos).
3. **Orquestar redes de agentes autónomos** donde cada uno asume un rol, se auto-auditan y resuelven problemas de negocio reales en segundos.

---
**Dificultad**: ⭐ Principiante
**Tiempo estimado**: 15 minutos
`,
          exercise: null
        },
        {
          id: `0-2`,
          title: `Guía del Creador: Creando Nuevos Módulos y Lecciones`,
          time: `10 min`,
          difficulty: `⭐ Principiante`,
          content: `# 0.2 - Guía del Creador: Creando Nuevos Módulos y Lecciones

## 🏗️ Estructura de Datos del Curso

Desde la versión 3.0, el curso **ya no se compila desde archivos .md**: cada archivo de \`js/data/\` es la fuente única de verdad y se edita directamente, sin build step.

\`\`\`
CursoAgentesWebV3/
│
├── index.html               # Carga los datos en orden: core → módulos → secciones
└── js/
    ├── data/
    │   ├── core.js          # Metadatos del curso + logros (achievements)
    │   ├── modulo-0.js … modulo-8.js   # Un archivo por módulo
    │   ├── recursos.js      # Cheatsheet, FAQ, guías, biblioteca de skills
    │   ├── templates.js     # Plantillas de agente y skill
    │   └── ejemplos.js      # Ejemplos completos
    ├── app.js               # Lógica de la aplicación (no tocar para añadir contenido)
    └── markdown.js          # Parser Markdown → HTML
\`\`\`

---

## 📝 Anatomía de una Lección

Cada módulo es un objeto JavaScript registrado con \`COURSE_DATA.modules.push({...})\`. Dentro, el array \`lessons\` contiene un objeto por lección:

\`\`\`javascript
{
  id: \`9-1\`,                      // Único en todo el curso; la URL admite #9-1
  title: \`Título de la Lección\`,
  time: \`15 min\`,                 // Estimación realista (lectura + práctica)
  difficulty: \`⭐ Principiante\`,   // ⭐ · ⭐⭐ · ⭐⭐⭐ · ⭐⭐⭐⭐
  content: \`# 9.1 - Título de la Lección

## 🎯 Objetivo
...

---
**Dificultad**: ⭐ Principiante
**Tiempo estimado**: 15 minutos
\`,
  exercise: {                     // o null si no hay ejercicio
    title: \`Ejercicio Práctico\`,
    prompt: \`## 💡 Ejercicio Práctico\n\n1. Paso uno...\`,
    type: \`text\`
  }
}
\`\`\`

### Reglas de Oro

1. **El \`id\` debe ser único** en todo el curso (se usa para progreso, logros y enlaces directos).
2. **El contenido va dentro de template literals** (acentos graves): todas las comillas invertidas internas del Markdown deben ir escapadas con barra invertida — copia el patrón de cualquier lección existente.
3. **Cabecera estándar**: el Markdown empieza con \`# N.M - Título\` (N = módulo, M = lección).
4. **Pie obligatorio**: dificultad y tiempo estimado al final del contenido.
5. **Sin enlaces a archivos .md locales**: para referenciar otra lección usa su ancla, por ejemplo \`#4-2\`.

---

## ➕ Crear un Nuevo Módulo

1. Crea \`js/data/modulo-9.js\` copiando la estructura de otro módulo.
2. Regístralo en \`index.html\` añadiendo su etiqueta \`<script>\` después de \`modulo-8.js\`.
3. Actualiza \`totalLessons\` en \`core.js\` y los textos del hero/meta de \`index.html\`.
4. Opcional: añade el logro \`mod-9-master\` en \`core.js\`.

> ⚠️ Verifica siempre la consola del navegador tras editar: un error de sintaxis en cualquier archivo de datos impide que el curso cargue.

---

## ✅ Checklist de Calidad para Nuevas Lecciones

- [ ] \`id\` único con formato \`N-M\`
- [ ] Sección \`## 🎯 Objetivo\` al inicio del contenido
- [ ] Bloques de código con lenguaje especificado (\`python\`, \`markdown\`…)
- [ ] Ejercicio práctico con pasos accionables (si aplica)
- [ ] Pie con dificultad y tiempo estimado realistas
- [ ] Consola del navegador sin errores tras guardar

---
**Dificultad**: ⭐ Principiante
**Tiempo estimado**: 10 minutos
`,
          exercise: {
            title: `Ejercicio Práctico`,
            prompt: `## 💡 Ejercicio Práctico

Diseña la ficha técnica de una lección nueva para este curso:

1. Elige un tema que no esté cubierto (por ejemplo: "Agentes con visión" o "Despliegue de agentes en producción").
2. Escribe su objeto JavaScript completo: \`id\`, \`title\`, \`time\`, \`difficulty\` y un \`content\` en Markdown que incluya la cabecera \`# N.M -\`, la sección \`## 🎯 Objetivo\` y al menos un bloque de código con lenguaje.
3. Redacta además el \`exercise.prompt\` con 2-3 pasos accionables para el estudiante.`,
            type: `text`
          }
        },
        {
          id: `0-3`,
          title: `Guía de Estilo Visual para el Web Viewer`,
          time: `15 min`,
          difficulty: `⭐⭐ Intermedio`,
          content: `# 0.3 - Guía de Estilo Visual para el Web Viewer

## 🎨 Componentes Visuales Premium

El visualizador interactivo del curso (v3) soporta la inserción de HTML enriquecido dentro del contenido de las lecciones. Esto permite mostrar tarjetas, comparaciones y diagramas con una estética moderna y profesional.

A continuación, se detallan los componentes CSS listos para usar en tus lecciones:

---

## 1. Grid de Comparación (\`comparison-grid\`)
Se utiliza para comparar dos conceptos de manera visual (por ejemplo, *Agente vs Skill*).

**Código HTML a embeber:**
\`\`\`html
<div class="chart-wrapper">
  <div class="comparison-grid">
    
    <!-- Columna 1 -->
    <div class="comparison-card">
      <div class="comp-icon">🤖</div>
      <h5>Agente</h5>
      <ul class="comp-list">
        <li><strong>Alcance:</strong> Completo</li>
        <li><strong>Autonomía:</strong> Toma decisiones</li>
      </ul>
    </div>
    
    <!-- Columna 2 -->
    <div class="comparison-card">
      <div class="comp-icon">🛠️</div>
      <h5>Skill</h5>
      <ul class="comp-list">
        <li><strong>Alcance:</strong> Específico</li>
        <li><strong>Autonomía:</strong> Pasivo</li>
      </ul>
    </div>
    
  </div>
</div>
\`\`\`

---

## 2. Grid de Logros o Conceptos (\`achievements-grid\`)
Ideal para listar características clave o requisitos mínimos.

**Código HTML a embeber:**
\`\`\`html
<div class="chart-wrapper">
  <div class="achievements-grid">
    
    <div class="achievement-card earned">
      <div class="ach-icon">👤</div>
      <div class="ach-name">1. Identity</div>
      <div class="ach-desc">Quién es el agente.</div>
    </div>
    
    <div class="achievement-card earned">
      <div class="ach-icon">🎭</div>
      <div class="ach-name">2. Personality</div>
      <div class="ach-desc">Cómo se comporta.</div>
    </div>
    
  </div>
</div>
\`\`\`

---

## 3. Contenedores de Diagramas Visuales (\`visual-diagram-container\`)
Si deseas incrustar diagramas SVGs vectoriales nativos para estructurar arquitecturas.

**Código HTML a embeber:**
\`\`\`html
<div class="visual-diagram-container">
  <div class="diagram-title">🤖 Estructura de Red</div>
  <svg viewBox="0 0 400 150" width="100%" height="auto" style="background: rgba(0,0,0,0.15); border-radius: 8px; padding: 20px;">
    <!-- Rectángulos y textos SVG -->
    <rect x="20" y="50" width="150" height="50" rx="8" fill="rgba(108, 99, 255, 0.1)" stroke="#6C63FF" stroke-width="2"/>
    <text x="95" y="80" fill="#ffffff" font-size="12" text-anchor="middle">Orquestador</text>
  </svg>
</div>
\`\`\`

---

## ⚠️ Regla de Oro de Edición
Cuando uses estos fragmentos de HTML dentro de tus lecciones, ten cuidado de **no utilizar backticks (\`) sin escapar**: el contenido se edita directamente en JavaScript (template literals), así que tú eres el responsable del escape. Tras cada edición, ejecuta la suite de verificación (ver lección 0.4).

> Estos componentes son los únicos vigentes. La lista completa de clases permitidas y eliminadas está en \`specs/02-web-interface.md\`.

---
**Dificultad**: ⭐⭐ Intermedio
**Tiempo estimado**: 15 minutos
`,
          exercise: null
        },
        {
          id: `0-4`,
          title: `Guía de Mantenimiento y Verificación del Curso`,
          time: `10 min`,
          difficulty: `⭐⭐ Intermedio`,
          content: `# 0.4 - Guía de Mantenimiento y Verificación del Curso

## 🧭 El Nuevo Flujo: Edición Directa

Desde la versión 3.0, **el curso ya no se compila**. Los antiguos scripts (\`compile_data_js.py\`, \`update_all.py\`, \`make_portable.py\`) están archivados y no deben ejecutarse.

El flujo de mantenimiento es simple:

1. Editas directamente el archivo del módulo en \`js/data/modulo-N.js\`.
2. Ejecutas la suite de verificación (más abajo).
3. Publicas = guardar y abrir \`index.html\`. Sin build, sin servidor, 100% offline.

---

## 📐 Las Especificaciones Canónicas

Las reglas completas del proyecto viven en la carpeta \`specs/\`:

| Spec | Qué define |
|------|------------|
| \`specs/01-content-structure.md\` | Tono, estructura de lecciones, escapes, enlaces, checklist de calidad |
| \`specs/02-web-interface.md\` | Componentes visuales vigentes, clases CSS eliminadas, verificación |
| \`specs/03-agent-workflow.md\` | Contrato de colaboración multi-agente y uso de Engram |

> Léelas antes de crear o modificar contenido: son la fuente de verdad del mantenimiento.

---

## ✅ La Suite de Verificación

Tras **cada** edición de contenido, ejecuta desde \`CursoAgentesWebV3/\`:

\`\`\`powershell
node tests/verify-course.js   # Parseo + conteos + regresiones
node tests/test-markdown.js   # 41 tests del parser y resaltado
node tests/test-e2e.js        # Render de los 62 contenidos
node tests/test-smoke.js      # Smoke test de la app (init + navegación)
\`\`\`

Criterio de aceptación: las cuatro suites en verde **y** la consola del navegador sin errores.

---

## ⚠️ Errores Frecuentes

1. **Backtick sin escapar** → la página queda en blanco. Todo backtick interno del contenido debe ir como \\\` (barra invertida + acento grave).
2. **Enlace a \`.md\`** → no navega a ningún sitio. Usa hash-links: \`#4-2\`, \`#recursos\`…
3. **Clase CSS eliminada** → se verá sin estilo. Consulta la lista de clases prohibidas en \`specs/02\` §3.

---
**Dificultad**: ⭐⭐ Intermedio
**Tiempo estimado**: 10 minutos
`,
          exercise: null
        }
      ]
    }
);
