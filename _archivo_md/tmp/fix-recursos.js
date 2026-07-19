// Fix one-time: anclas {#...} en headers + total skills + sección "Descargar Todos"
const fs = require('fs');
const f = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data/recursos.js';
let src = fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n');

// 1) Anclas no estándar en headers (el parser las mostraría literalmente)
const before = (src.match(/\{#\w+\}/g) || []).length;
src = src.replace(/ \{#\w+\}/g, '');
console.log(`Anclas eliminadas: ${before}`);

// 2) Total de skills real: 9
if (!src.includes('**Total de skills en esta biblioteca**: 12')) throw new Error('total 12 no encontrado');
src = src.replace('**Total de skills en esta biblioteca**: 12', '**Total de skills en esta biblioteca**: 9');

// 3) "Descargar Todos": la ruta templates/skills/biblioteca/ no existe en el visor web
const oldDesc = '## 💾 Descargar Todos\n\nTodos estos skills están disponibles en:\n\\`\\`\\`\ntemplates/skills/biblioteca/\n\\`\\`\\`';
if (!src.includes(oldDesc)) throw new Error('sección Descargar Todos no encontrada');
src = src.replace(oldDesc, '## 💾 Cómo Llevarte Estos Skills\n\nUsa el botón **Copiar** de cualquier bloque de código de esta página para llevarte el skill completo a tu propio archivo \\`.md\\`.');

fs.writeFileSync(f, src.replace(/\n/g, '\r\n'));
console.log('OK: recursos.js actualizado');
