// Cuenta fences doble-escapados por archivo (needle por códigos de carácter)
const fs = require('fs');
const path = require('path');
const d = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data';
// archivo: \\\`\\\`\\\`  = chars 92,92,92,96,92,96,92,96  → string: \`\`\`  (1 backslash + 3 backticks)
const needle = String.fromCharCode(92, 92, 92, 96, 92, 96, 92, 96);
fs.readdirSync(d).forEach(f => {
  const src = fs.readFileSync(path.join(d, f), 'utf8');
  const n = src.split(needle).length - 1;
  if (n) console.log(`${f}: ${n}`);
});
console.log('fin');
