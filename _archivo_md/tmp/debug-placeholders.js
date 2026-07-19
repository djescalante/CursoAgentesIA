// Debug: qué placeholders quedan residuales en 5-1 y 6-2
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
const { COURSE_DATA, MarkdownParser } = vm.runInContext(src + '\n' + fs.readFileSync(WEB + 'js/markdown.js', 'utf8') + '\n;({ COURSE_DATA, MarkdownParser });', ctx);

['5-1', '6-2'].forEach(id => {
  let lesson;
  COURSE_DATA.modules.forEach(m => m.lessons.forEach(l => { if (l.id === id) lesson = l; }));
  const html = MarkdownParser.parse(lesson.content);
  const matches = html.match(/%%(CODE_BLOCK|HTML_BLOCK|INLINE_CODE)_\d+%%/g) || [];
  console.log(`\n=== Lección ${id}: placeholders residuales:`, matches);
  matches.forEach(ph => {
    const i = html.indexOf(ph);
    console.log('  contexto:', JSON.stringify(html.slice(Math.max(0, i - 120), i + 60)));
  });
  // ¿El markdown fuente contiene el literal?
  const inSrc = lesson.content.match(/%%(CODE_BLOCK|HTML_BLOCK|INLINE_CODE)_\d+%%/g) || [];
  console.log('  en fuente markdown:', inSrc.length ? inSrc : '(ninguno)');
});
