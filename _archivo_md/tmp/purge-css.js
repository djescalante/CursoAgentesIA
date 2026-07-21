// Purga one-time de CSS muerto en style.css (verificado contra js/data, index.html, app.js, markdown.js)
const fs = require('fs');
const F = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/css/style.css';
let lines = fs.readFileSync(F, 'utf8').split(/\r?\n/);
const total0 = lines.length;

const assert = (line, fn, msg) => { if (!fn((lines[line - 1] || '').trim())) throw new Error(`Assert línea ${line}: "${(lines[line - 1] || '').trim()}" — ${msg}`); };
const removeRange = (a, b, label) => { lines.splice(a - 1, b - a + 1); console.log(`Purgado ${label}: líneas ${a}-${b} (${b - a + 1})`); };

// ── Rangos muertos, de ABAJO hacia ARRIBA ──

// 1) 2085 → EOF: toda la sección "Module 4 visuals" muerta (css-tabs, flow-flex, parallel, routing, matrix, compare, qa, memory, merge, factory)
assert(2085, s => s === '/* CSS Radio Tabs */', 'inicio sección muerta Module 4');
removeRange(2085, lines.length, 'sección Module 4 visuals (muerta)');

// 2) 1727–1969: flow-tabs, flow-svg, chain-*, risks-*, kpi-* (hasta antes de V2 ACCESSIBILITY)
assert(1971, s => s.includes('V2 ACCESSIBILITY'), 'fin de la zona muerta 4.2');
assert(1727, s => s === '/* Flow diagram tabs */', 'inicio flow tabs');
removeRange(1727, 1969, 'flow-tabs/chain/risks/kpi (muertos)');

// 3) 1724–1726: .comp-list li.bad/.good + blank
assert(1724, s => s.includes('.comp-list li.bad'), 'li.bad');
removeRange(1724, 1726, 'comp-list li.bad/good');

// 4) 1687–1696: .card-bad/.card-good + blank
assert(1687, s => s.includes('.card-bad'), 'card-bad');
removeRange(1687, 1696, 'card-bad/card-good');

// 5) 1659–1669: .chart-title + blank
assert(1659, s => s === '.chart-title {', 'chart-title');
removeRange(1659, 1669, 'chart-title');

// 6) 1644–1648: trim del grupo chart-wrapper (dejar solo .chart-wrapper)
assert(1644, s => s === '.chart-wrapper,', 'grupo chart-wrapper');
assert(1648, s => s === '.metrics-visual {', 'fin grupo');
lines.splice(1644 - 1, 4, '.chart-wrapper {');
console.log('Selector chart-wrapper simplificado');

// 7) 1605–1638: info-box (muerto)
assert(1605, s => s.includes('Section highlight box'), 'info-box comment');
assert(1637, s => s.includes('.info-box.important::before'), 'fin info-box');
assert(1640, s => s.includes('LESSON 4.2'), 'lo que sigue a info-box');
removeRange(1605, 1638, 'info-box');

// 8) 1200–1216: code-viewer (muerto)
assert(1200, s => s.includes('Code viewer modal'), 'code-viewer comment');
assert(1215, s => s === '}', 'fin code-viewer');
assert(1218, s => s.includes('PROGRESS PAGE'), 'lo que sigue a code-viewer');
removeRange(1200, 1216, 'code-viewer');

// 9) 968–972: pre { position: relative } redundante (ya en .lesson-content pre)
assert(968, s => s.includes('Copy button on code blocks'), 'copy comment');
assert(969, s => s === 'pre {', 'pre redundante');
removeRange(969, 972, 'pre { position: relative } redundante');

// 10) 217–218: .module-item {} vacío
assert(217, s => s === '.module-item { }', 'module-item vacío');
removeRange(217, 218, '.module-item {} vacío');

// 11) Variables muertas
assert(9, s => s.startsWith('--brand-mid'), '--brand-mid');
removeRange(9, 9, '--brand-mid');
assert(26, s => s.startsWith('--info'), '--info');
removeRange(26, 26, '--info');

// 12) opacity inútil en scrollbar-thumb
const idx = lines.findIndex(l => l.includes('::-webkit-scrollbar-thumb'));
if (idx < 0) throw new Error('scrollbar-thumb no encontrado');
lines[idx] = lines[idx].replace(' opacity: 0.5;', '');
console.log('opacity inútil eliminado de scrollbar-thumb');

fs.writeFileSync(F, lines.join('\r\n'));
console.log(`\nTOTAL: ${total0} → ${lines.length} líneas (−${total0 - lines.length})`);
