// Verificación E2E: parsea TODO el contenido del curso con MarkdownParser
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
const bundle = src + '\n' + fs.readFileSync(WEB + 'js/markdown.js', 'utf8') + '\n;({ COURSE_DATA, MarkdownParser });';
const { COURSE_DATA, MarkdownParser } = vm.runInContext(bundle, ctx);

let errors = 0, rendered = 0, preCount = 0;
const check = (label, md) => {
  try {
    const html = MarkdownParser.parse(md);
    rendered++;
    preCount += (html.match(/<pre /g) || []).length;
    if (/%%(CODE_BLOCK|HTML_BLOCK|INLINE_CODE)_\d+%%/.test(html)) { console.log('PLACEHOLDER residual en', label); errors++; }
    if (html.includes('[object Object]')) { console.log('[object Object] en', label); errors++; }
    if (html.includes('class=<span')) { console.log('Spans corruptos en', label); errors++; }
    if (html.includes('\x00')) { console.log('Byte nulo residual en', label); errors++; }
  } catch (e) {
    console.log('EXCEPCIÓN en', label, '→', e.message);
    errors++;
  }
};

COURSE_DATA.modules.forEach(m => m.lessons.forEach(l => {
  check(`lección ${l.id}`, l.content);
  if (l.exercise) check(`ejercicio ${l.id}`, l.exercise.prompt);
}));
COURSE_DATA.resources.forEach(r => check(`recurso ${r.id}`, r.content));
COURSE_DATA.templates.forEach(t => check(`template ${t.id}`, t.content));
COURSE_DATA.examples.forEach(e => check(`ejemplo ${e.id}`, e.content));

console.log(`\nRenderizados: ${rendered} contenidos | bloques <pre>: ${preCount} | errores: ${errors}`);
process.exit(errors ? 1 : 0);
