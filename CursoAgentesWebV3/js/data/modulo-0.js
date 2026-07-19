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

El visualizador interactivo del curso (v3) soporta la inserción de HTML enriquecido dentro de los archivos Markdown. Esto permite mostrar tarjetas, comparaciones y diagramas con una estética moderna y profesional.

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

## ⚠️ Regla de Oro para el Compilador
Cuando uses estos fragmentos de HTML dentro de tus lecciones Markdown, ten cuidado de **no utilizar backticks (\`) sin escapar** en las descripciones si las estás editando directamente en JavaScript. Al usar nuestro compilador automatizado, el script se encargará de realizar el escape automáticamente.

---
**Dificultad**: ⭐⭐ Intermedio
**Tiempo estimado**: 15 minutos
`,
          exercise: null
        },
        {
          id: `0-4`,
          title: `Guía de Compilación y Publicación del Curso`,
          time: `10 min`,
          difficulty: `⭐⭐ Intermedio`,
          content: `# 0.4 - Guía de Compilación y Publicación del Curso

## ⚙️ El Pipeline de Compilación

Para mantener el visualizador web interactivo actualizado sin tener que editar manualmente el objeto JavaScript global, disponemos de una suite de scripts automatizados en la carpeta \`scripts/\`.

El flujo es el siguiente:
1. Redactas tus lecciones en Markdown dentro de carpetas como \`modulo-N/\`.
2. Ejecutas el script de compilación \`compile_data_js.py\` (ubicado en \`scripts/\`), el cual lee los archivos Markdown, escapa caracteres especiales, y genera el archivo \`data.js\`.
3. Ejecutas los scripts de build portable.

---

## 🛠️ Comandos de Compilación

Abre una terminal en la raíz del proyecto y ejecuta los siguientes comandos según corresponda:

### 1. Compilar de Markdown a JavaScript
Este comando regenera los archivos \`data.js\` del visualizador local y portable inyectando los Markdowns limpios.
\`\`\`powershell
python scripts/compile_data_js.py
\`\`\`

### 2. Actualizar el Manifiesto del Curso
Este script actualiza el listado global de contenidos y estadísticas del curso en \`MANIFEST.md\` y reconstruye el script de empaquetado portable.
\`\`\`powershell
python scripts/update_all.py
\`\`\`

### 3. Reconstruir la Versión Portable
Este script crea una versión offline e independiente del curso en la carpeta \`cursoAgentesPortable/\` copiando el visualizador, estilos, scripts y los archivos \`.md\` limpios para distribución local.
\`\`\`powershell
python scripts/make_portable.py
\`\`\`

---

## ⚡ Automatización en un Solo Comando
Para simplificar la creación y despliegue al máximo, al ejecutar \`python scripts/update_all.py\` se llamará en cadena a la compilación y la generación portable automáticamente, haciendo que desplegar nuevos contenidos sea cuestión de segundos.

---
**Dificultad**: ⭐⭐ Intermedio
**Tiempo estimado**: 10 minutos
`,
          exercise: null
        }
      ]
    }
);
