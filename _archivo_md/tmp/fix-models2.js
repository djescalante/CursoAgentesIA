// Fix one-time (2ª parte): referencias a modelos obsoletos → actuales/neutras
const fs = require('fs');
const DIR = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data/';

const FIXES = [
  // ── Bloque de precios (ejemplo orientativo con GPT-4o) ──
  ['recursos.js', '# GPT-4\n- Input: \\$0.03 por 1K tokens\n- Output: \\$0.06 por 1K tokens', '# GPT-4o (precio orientativo)\n- Input: \\$0.0025 por 1K tokens\n- Output: \\$0.01 por 1K tokens', 1],
  ['recursos.js', 'Costo por conversación: ~\\$0.09', 'Costo por conversación: ~\\$0.01', 1],
  // ── Código ──
  ['recursos.js', 'model = "gpt-3.5-turbo"  # Más rápido, más barato', 'model = "gpt-4o-mini"  # Más rápido, más barato', 1],
  ['recursos.js', 'claude-3-5-sonnet-20241022', 'claude-sonnet-4-20250514', 2],
  ['recursos.js', '"gpt-4"', '"gpt-4o"', 8],
  ['recursos.js', 'model: gpt-4', 'model: gpt-4o', 2],
  ['modulo-7.js', 'model="gpt-4",', 'model="gpt-4o",', 1],
  ['modulo-7.js', 'default_model: gpt-4', 'default_model: gpt-4o', 1],
];

const files = [...new Set(FIXES.map(f => f[0]))];
const data = {};
files.forEach(f => { data[f] = fs.readFileSync(DIR + f, 'utf8').replace(/\r\n/g, '\n'); });

for (const [file, search, replacement, expected] of FIXES) {
  const count = data[file].split(search).length - 1;
  if (count !== expected) throw new Error(`${file}: esperadas ${expected}, encontradas ${count} → ${search.slice(0, 60)}`);
  data[file] = data[file].split(search).join(replacement);
  console.log(`OK ${file}: ${count}× ${search.slice(0, 45).replace(/\n/g, '↵')}…`);
}
files.forEach(f => fs.writeFileSync(DIR + f, data[f].replace(/\n/g, '\r\n')));
console.log('Modelos actualizados (parte 2)');
