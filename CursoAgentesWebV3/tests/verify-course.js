// Verificación completa del curso: parseo + conteos + chequeos de regresión
const fs = require('fs');
const path = require('path');
const d = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data';
const order = ['core.js', 'modulo-0.js', 'modulo-1.js', 'modulo-2.js', 'modulo-3.js', 'modulo-4.js', 'modulo-5.js', 'modulo-6.js', 'modulo-7.js', 'modulo-8.js', 'recursos.js', 'templates.js', 'ejemplos.js'];
let src = '';
order.forEach(f => { src += fs.readFileSync(path.join(d, f), 'utf8') + '\n'; });
const CD = eval(src + ';COURSE_DATA;');

const lessons = CD.modules.reduce((s, m) => s + m.lessons.length, 0);
const exercises = CD.modules.reduce((s, m) => s + m.lessons.filter(l => l.exercise).length, 0);
console.log(`parse OK — módulos: ${CD.modules.length} | lecciones: ${lessons} | ejercicios: ${exercises} | recursos: ${CD.resources.length} | templates: ${CD.templates.length} | ejemplos: ${CD.examples.length} | logros: ${CD.achievements.length}`);

const all = JSON.stringify(CD);
const checks = [
  ['sin gpt-3.5', !all.includes('gpt-3.5')],
  ['sin "gpt-4" exacto', !all.includes('"gpt-4"')],
  ['sin claude-3-5', !all.includes('claude-3-5')],
  ['sin Llama 2', !all.includes('Llama 2')],
  ['sin ruta d:\\cursoagenteClaude', !all.includes('cursoagenteClaude')],
  ['sin enlaces .md internos', !/\]\((?!https?:)[^)]*\.md[^)]*\)/.test(all)],
  ['sin placeholder X min', !all.includes('`X min`') && !all.includes('time: `X min`')],
  ['sin anclas {#...}', !/\{#\w+\}/.test(all)],
  ['half-course = 18', all.includes('Completa 18 lecciones')],
  ['biblioteca = 9 skills', all.includes('Total de skills en esta biblioteca**: 9')],
];
let fails = 0;
checks.forEach(([name, ok]) => { if (!ok) { console.log('FALLO:', name); fails++; } });
console.log(fails === 0 ? 'TODOS LOS CHEQUEOS OK' : `${fails} chequeos fallaron`);
process.exit(fails === 0 ? 0 : 1);
