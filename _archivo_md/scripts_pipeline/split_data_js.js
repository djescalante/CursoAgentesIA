/**
 * split_data_js.js — Migración ONE-TIME (2026-07-18)
 * Divide el data.js monolítico (451KB) en archivos por módulo/sección bajo js/data/.
 * Tras la migración, cada archivo js/data/*.js es fuente única de verdad (sin build step).
 *
 * Uso:  node split_data_js.js
 * Verifica sintaxis y conteos al finalizar.
 */
const fs = require('fs');
const path = require('path');

const WEB = path.join(__dirname, '..', '..', 'CursoAgentesWebV3');
const SRC = path.join(WEB, 'js', 'data.js');
const OUT_DIR = path.join(WEB, 'js', 'data');

const lines = fs.readFileSync(SRC, 'utf8').split(/\r?\n/);
const L = (a, b) => lines.slice(a - 1, b).join('\r\n'); // 1-indexed inclusive

// ─── Fronteras conocidas (verificadas por inspección) ───
const MODULE_ID_LINES = [13, 423, 881, 2241, 4802, 6044, 7744, 8840, 10270];
const MODULES_ARRAY_END = 10564;   // línea `    }` que cierra modulo-8
const SECTIONS = {
  resources:    { start: 10568, end: 13596 },
  templates:    { start: 13600, end: 14536 },
  examples:     { start: 14540, end: 15776 },
  achievements: { start: 15780, end: 15864 },
};

// ─── Assertions de sanidad sobre las fronteras ───
MODULE_ID_LINES.forEach((idLine, i) => {
  const openLine = lines[idLine - 2]; // línea anterior al id: debe ser `    {`
  if (openLine.trim() !== '{') throw new Error(`modulo-${i}: se esperaba '{' en línea ${idLine - 1}, encontrado: ${openLine}`);
  if (!lines[idLine - 1].includes(`id: \`modulo-${i}\``)) throw new Error(`modulo-${i}: id no coincide en línea ${idLine}`);
});
if (lines[MODULES_ARRAY_END - 1].trim() !== '}') throw new Error(`modules end esperado '}' en ${MODULES_ARRAY_END}`);
Object.entries(SECTIONS).forEach(([k, s]) => {
  const closer = lines[s.end + 1 - 1 + 1]; // línea tras el contenido
});
if (lines[10567 - 1].trim() !== 'resources: [') throw new Error('resources start');
if (lines[13599 - 1].trim() !== 'templates: [') throw new Error('templates start');
if (lines[14539 - 1].trim() !== 'examples: [') throw new Error('examples start');
if (lines[15779 - 1].trim() !== 'achievements: [') throw new Error('achievements start');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const HEADER_COMMON = ` * Fuente única de verdad del curso — editar directamente (sin build step).\r\n`;

// ─── core.js ───
const core = `/**
 * COURSE DATA — Núcleo: metadatos + logros.
${HEADER_COMMON} * Debe cargarse ANTES que los módulos y secciones (ver index.html).
 */
const COURSE_DATA = {
  title: "Domina Agentes IA y Skills con Markdown",
  version: "3.0",
  totalLessons: 36,

  modules: [],      // se rellena desde js/data/modulo-0.js … modulo-8.js
  resources: [],    // js/data/recursos.js
  templates: [],    // js/data/templates.js
  examples: [],     // js/data/ejemplos.js

  achievements: [
${L(SECTIONS.achievements.start, SECTIONS.achievements.end)}
  ]
};
`;
fs.writeFileSync(path.join(OUT_DIR, 'core.js'), core, 'utf8');

// ─── modulo-N.js ───
const MODULE_TITLES = [
  'Inicio y Mapa de Ruta', 'Fundamentos', 'Creando tu Primer Agente',
  'Skills Avanzados', 'Integración y Workflows', 'Casos de Uso Reales',
  'Optimización y Seguridad', 'Proyecto Final', 'Integración IDEs'
];
MODULE_ID_LINES.forEach((idLine, i) => {
  const start = idLine - 1; // línea `    {`
  const end = i < MODULE_ID_LINES.length - 1 ? MODULE_ID_LINES[i + 1] - 2 : MODULES_ARRAY_END;
  const closing = lines[end - 1].trim();
  if (!/^},?$/.test(closing)) throw new Error(`modulo-${i}: cierre inesperado en línea ${end}: ${closing}`);
  // Quita la coma final del objeto si la tiene (la gestiona push)
  let body = L(start, end).replace(/,\r?$/, '');
  const file = `/**
 * Módulo ${i} — ${MODULE_TITLES[i]}
${HEADER_COMMON} */
COURSE_DATA.modules.push(
${body}
);
`;
  fs.writeFileSync(path.join(OUT_DIR, `modulo-${i}.js`), file, 'utf8');
});

// ─── Secciones ───
const SECTION_META = {
  resources: { file: 'recursos.js',  key: 'resources',  label: 'Recursos del curso' },
  templates: { file: 'templates.js', key: 'templates',  label: 'Templates y plantillas' },
  examples:  { file: 'ejemplos.js',  key: 'examples',   label: 'Ejemplos completos' },
};
Object.values(SECTION_META).forEach(({ file, key, label }) => {
  const content = `/**
 * ${label}.
${HEADER_COMMON} */
COURSE_DATA.${key} = [
${L(SECTIONS[key].start, SECTIONS[key].end)}
];
`;
  fs.writeFileSync(path.join(OUT_DIR, file), content, 'utf8');
});

// ─── Verificación: evalúa los archivos generados en orden y compara con el original ───
const order = ['core.js', ...MODULE_ID_LINES.map((_, i) => `modulo-${i}.js`), 'recursos.js', 'templates.js', 'ejemplos.js'];
const evalFile = (src, name) => {
  try { (0, eval)(src + '\n;COURSE_DATA;'); }
  catch (e) { throw new Error(`${name}: ${e.message}`); }
};
let combined = '';
order.forEach(f => { combined += fs.readFileSync(path.join(OUT_DIR, f), 'utf8') + '\n'; });
const rebuilt = (0, eval)(combined + '\n;COURSE_DATA;');
const original = (0, eval)(fs.readFileSync(SRC, 'utf8') + '\n;COURSE_DATA;');

const stats = o => ({
  modules: o.modules.length,
  lessons: o.modules.reduce((s, m) => s + m.lessons.length, 0),
  exercises: o.modules.reduce((s, m) => s + m.lessons.filter(l => l.exercise).length, 0),
  resources: o.resources.length,
  templates: o.templates.length,
  examples: o.examples.length,
  achievements: o.achievements.length,
});
const a = stats(original), b = stats(rebuilt);
console.log('ORIGINAL :', JSON.stringify(a));
console.log('DIVIDIDO :', JSON.stringify(b));
if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('¡Los conteos no coinciden!');

// Comparación profunda por campos clave
original.modules.forEach((m, i) => {
  const r = rebuilt.modules[i];
  if (m.id !== r.id || m.title !== r.title || m.lessons.length !== r.lessons.length) {
    throw new Error(`Módulo ${i} difiere tras la división`);
  }
  m.lessons.forEach((l, j) => {
    if (l.id !== r.lessons[j].id || l.content.length !== r.lessons[j].content.length) {
      throw new Error(`Lección ${l.id} difiere tras la división`);
    }
  });
});
console.log('OK — 9 módulos, 36 lecciones y secciones idénticas. Archivos en js/data/');
