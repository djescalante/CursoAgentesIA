// Fix one-time: fences anidados en biblioteca de skills (recursos.js)
const fs = require('fs');
const f = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data/recursos.js';
let lines = fs.readFileSync(f, 'utf8').split(/\r?\n/);

const BT3 = '\\`\\`\\`';          // \`\`\`
const BT4 = '\\`\\`\\`\\`';       // \`\`\`\`

const pairs = [
  [2251, 2294], // JSON Validator
  [2300, 2368], // CSV Cleaner
  [2376, 2461], // Text Summarizer
  [2467, 2503], // Grammar Checker
  [2511, 2570], // Code Explainer
  [2576, 2654], // Bug Detector
  [2662, 2810], // Meeting Notes Generator
  [2816, 2913], // Email Drafter
  [2921, 3004], // Trend Analyzer
];

for (const [o, c] of pairs) {
  const lo = lines[o - 1].trim();
  const lc = lines[c - 1].trim();
  if (lo !== BT3 + 'markdown') throw new Error(`open ${o}: "${lo}"`);
  if (lc !== BT3) throw new Error(`close ${c}: "${lc}"`);
  lines[o - 1] = lines[o - 1].replace(BT3 + 'markdown', BT4 + 'markdown');
  if (lines[c - 1].trim() !== BT3) throw new Error('close cambió');
  lines[c - 1] = lines[c - 1].replace(BT3, BT4);
}

fs.writeFileSync(f, lines.join('\r\n'));
console.log('OK: 9 skills convertidos a fence externo de 4 backticks');
