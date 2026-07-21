// Fix one-time: fences anidados/escapados en lección 5-1 (modulo-5.js)
const fs = require('fs');
const F = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data/modulo-5.js';

const F3 = String.fromCharCode(92, 96, 92, 96, 92, 96);          // \`\`\`
const F4 = F3 + String.fromCharCode(92, 96);                     // \`\`\`\`
const DF = String.fromCharCode(92, 92, 92, 96, 92, 96, 92, 96);  // \\\`\\\`\\\`

let src = fs.readFileSync(F, 'utf8').replace(/\r\n/g, '\n');

// Región = lección 5-1
const startMark = 'id: `5-1`';
const endMark = 'id: `5-2`';
const si = src.indexOf(startMark), ei = src.indexOf(endMark);
if (si < 0 || ei < 0) throw new Error('marcadores de lección no encontrados');
let region = src.slice(si, ei);

// 1) Los dos bloques "template" (reviewing/debugging) → fence externo de 4 backticks
const outers = [
  ['### When reviewing code:\n' + F3 + '\n', '### When reviewing code:\n' + F4 + '\n'],
  ['💡 **Why**: [Reasoning]\n' + F3 + '\n', '💡 **Why**: [Reasoning]\n' + F4 + '\n'],
  ['### When debugging:\n' + F3 + '\n', '### When debugging:\n' + F4 + '\n'],
  ['🛡️ **Prevention**: [How to avoid in future]\n' + F3 + '\n', '🛡️ **Prevention**: [How to avoid in future]\n' + F4 + '\n'],
];
outers.forEach(([a, b]) => {
  const n = region.split(a).length - 1;
  if (n !== 1) throw new Error(`outer esperado 1×, encontrado ${n}×: ${a.slice(0, 40)}`);
  region = region.split(a).join(b);
});

// 2) Desescapar los 30 fences doble-escapados
const nDF = region.split(DF).length - 1;
if (nDF !== 30) throw new Error(`esperados 30 fences escapados, encontrados ${nDF}`);
region = region.split(DF).join(F3);

// 3) Lang tags placeholder → python
region = region.split(F3 + '[language]').join(F3 + 'python');
region = region.split(F3 + 'language\n').join(F3 + 'python\n');

src = src.slice(0, si) + region + src.slice(ei);
fs.writeFileSync(F, src.replace(/\n/g, '\r\n'));
console.log('OK: lección 5-1 — 2 bloques 4-backtick, 30 fences desescapados, lang tags normalizados');
