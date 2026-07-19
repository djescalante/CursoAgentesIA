// Simula el emparejamiento de fences en lecciones 5-1 y 6-2
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const WEB = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/';
const d = WEB + 'js/data';
const order = ['core.js', 'modulo-0.js', 'modulo-1.js', 'modulo-2.js', 'modulo-3.js', 'modulo-4.js', 'modulo-5.js', 'modulo-6.js', 'modulo-7.js', 'modulo-8.js', 'recursos.js', 'templates.js', 'ejemplos.js'];
let src = '';
order.forEach(f => { src += fs.readFileSync(path.join(d, f), 'utf8') + '\n'; });
const ctx = { window: {}, navigator: {}, document: {}, console };
vm.createContext(ctx);
const { COURSE_DATA } = vm.runInContext(src + '\n;({ COURSE_DATA });', ctx);

['5-1', '6-2'].forEach(id => {
  let lesson;
  COURSE_DATA.modules.forEach(m => m.lessons.forEach(l => { if (l.id === id) lesson = l; }));
  const lines = lesson.content.split('\n');
  console.log(`\n===== Lección ${id} (${lines.length} líneas de contenido) =====`);
  let inBlock = false, fenceLen = 0, lang = '', start = 0;
  lines.forEach((line, i) => {
    if (!inBlock) {
      const m = line.match(/^ {0,3}(`{3,})([\w+#.\[\]-]*)\s*$/);
      if (m) { inBlock = true; fenceLen = m[1].length; lang = m[2]; start = i + 1; }
    } else {
      const m = line.match(/^ {0,3}(`{3,})\s*$/);
      if (m && m[1].length >= fenceLen) {
        console.log(`  bloque ${start}(${fenceLen}x ${lang || 'txt'}) → cierra ${i + 1}`);
        inBlock = false;
      }
    }
  });
  if (inBlock) console.log(`  bloque ${start}(${fenceLen}x ${lang}) → SIN CERRAR (EOF)`);
  // líneas doble-escapadas (\\\`...)
  const dbl = lines.map((l, i) => [i + 1, l]).filter(([_, l]) => l.includes('\\`\\`\\`'));
  console.log(`  líneas doble-escapadas (\\\`\\\`\\\`): ${dbl.length}`);
  dbl.slice(0, 20).forEach(([n, l]) => console.log(`    ${n}: ${l.slice(0, 60)}`));
});
