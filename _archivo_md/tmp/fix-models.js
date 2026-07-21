// Fix one-time: referencias a modelos obsoletos → actuales/neutras
const fs = require('fs');
const DIR = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data/';

// [archivo, buscar, reemplazar, nº esperado]
const FIXES = [
  // ── Prosa ──
  ['recursos.js', 'le dice al modelo de lenguaje (GPT-4, Claude, etc.) cómo debe comportarse', 'le dice al modelo de lenguaje (GPT, Claude, Gemini, etc.) cómo debe comportarse', 1],
  ['recursos.js', '**OpenAI (GPT-4)**', '**OpenAI (GPT-4o y sucesores)**', 1],
  ['recursos.js', '### 1. OpenAI API (GPT-4, GPT-3.5)', '### 1. OpenAI API (GPT-4o y modelos recientes)', 1],
  ['recursos.js', '1. Usar GPT-3.5-turbo para tareas simples (10x más barato)', '1. Usar modelos "mini" para tareas simples (gpt-4o-mini, Claude Haiku: ~10x más baratos)', 1],
  ['recursos.js', '   - Llama 2, Mistral: Gratis, ejecuta localmente', '   - Llama 3, Mistral: Gratis, ejecuta localmente', 1],
  ['modulo-1.js', 'como Claude o GPT-4 han sido entrenados', 'como Claude, GPT o Gemini han sido entrenados', 1],
  // ── Bloque de precios (ejemplo orientativo con GPT-4o) ──
  ['recursos.js', '# GPT-4\n- Input: \\$0.03 por 1K tokens\n- Output: \\$0.06 por 1K tokens', '# GPT-4o (precio orientativo)\n- Input: \\$0.0025 por 1K tokens\n- Output: \\$0.01 por 1K tokens', 1],
  ['recursos.js', 'Costo por conversación: ~\\$0.09', 'Costo por conversación: ~\\$0.01', 1],
  // ── Código ──
  ['recursos.js', 'model = "gpt-3.5-turbo"  # Más rápido, más barato', 'model = "gpt-4o-mini"  # Más rápido, más barato', 1],
  ['recursos.js', 'claude-3-5-sonnet-20241022', 'claude-sonnet-4-20250514', 2],
  ['recursos.js', '"gpt-4"', '"gpt-4o"', 7], // model=, model_name=, model_name_or_path=, "model":
  ['recursos.js', 'model: gpt-4', 'model: gpt-4o', 2],
  ['modulo-7.js', 'model="gpt-4",', 'model="gpt-4o",', 1],
  ['modulo-7.js', 'default_model: gpt-4', 'default_model: gpt-4o', 1],
];

for (const [file, search, replacement, expected] of FIXES) {
  const p = DIR + file;
  let src = fs.readFileSync(p, 'utf8');
  const count = src.split(search).length - 1;
  if (count !== expected) throw new Error(`${file}: esperadas ${expected}, encontradas ${count} → ${search.slice(0, 60)}`);
  src = src.split(search).join(replacement);
  fs.writeFileSync(p, src);
  console.log(`OK ${file}: ${count}× ${search.slice(0, 45).replace(/\n/g, '↵')}…`);
}
console.log('Modelos actualizados');
