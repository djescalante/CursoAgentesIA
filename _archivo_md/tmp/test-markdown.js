// Batería de tests para markdown.js (post-refactor)
const fs = require('fs');
const vm = require('vm');
const ctx = { window: {}, navigator: {}, document: {} };
vm.createContext(ctx);
const MP = vm.runInContext(fs.readFileSync('E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/markdown.js', 'utf8') + '\n;MarkdownParser;', ctx);

let pass = 0, fail = 0;
const t = (name, cond) => { if (cond) { pass++; } else { fail++; console.log('FALLO:', name); } };
const count = (s, sub) => s.split(sub).length - 1;

// ── 1. Highlight Python: keywords + strings sin corrupción ──
let h = MP._highlight('def f():\n    return "hi"\n    x = 0x1A  # hex', 'python');
t('py: def es keyword', h.includes('<span class="token keyword">def</span>'));
t('py: return es keyword', h.includes('<span class="token keyword">return</span>'));
t('py: "hi" es string', h.includes('<span class="token string">&quot;hi&quot;</span>') || h.includes('<span class="token string">"hi"</span>'));
t('py: sin spans anidados corruptos', !h.includes('class=<span') && !h.includes('<span class=<span'));
t('py: hex completo como número', h.includes('<span class="token number">0x1A</span>'));
t('py: comentario', h.includes('<span class="token comment"># hex</span>'));

// comentario con string dentro → todo comentario
h = MP._highlight('# set "x" to 1', 'python');
t('py: string dentro de comentario no se marca', count(h, 'token comment') === 1 && !h.includes('token string'));

// string con # dentro → todo string
h = MP._highlight('x = "# not comment"', 'python');
t('py: # dentro de string no es comentario', h.includes('token string') && !h.includes('token comment'));

// triple-quoted docstring
h = MP._highlight('"""docstring\nlinea2"""\nx = 1', 'python');
t('py: docstring triple', h.includes('token string') && h.includes('docstring\nlinea2'));

// ── 2. Highlight JS ──
h = MP._highlight('const url = "http://a.com" // endpoint\nfunction go() {}', 'javascript');
t('js: const keyword', h.includes('<span class="token keyword">const</span>'));
t('js: string con // no es comentario', h.includes('token string') && count(h, 'token comment') === 1);
t('js: comentario al final', h.includes('<span class="token comment">// endpoint</span>'));
h = MP._highlight('const t = `tpl ${x}`;', 'javascript');
t('js: template literal es string', h.includes('token string'));

// ── 3. JSON ──
h = MP._highlight('{\n  "key": "value",\n  "n": 42,\n  "b": true\n}', 'json');
t('json: clave attr-name', h.includes('<span class="token attr-name">"key"</span>'));
t('json: valor string', h.includes('<span class="token string">"value"</span>'));
t('json: número', h.includes('<span class="token number">42</span>'));
t('json: boolean', h.includes('<span class="token boolean">true</span>'));

// ── 4. Bash / YAML ──
h = MP._highlight('# instalar\nnpm install -g "pkg"', 'bash');
t('bash: comentario', h.includes('token comment'));
t('bash: npm keyword', h.includes('<span class="token keyword">npm</span>'));
t('bash: string', h.includes('token string'));
h = MP._highlight('name: "valor" # comentario', 'yaml');
t('yaml: clave', h.includes('<span class="token attr-name">name</span>'));
t('yaml: string', h.includes('token string'));
t('yaml: comentario', h.includes('token comment'));

// ── 5. Links ──
h = MP.parse('[Ver lección](#4-2)');
t('link interno: sin target=_blank', h.includes('href="#4-2"') && !h.includes('target="_blank"'));
h = MP.parse('[OpenAI](https://openai.com)');
t('link externo: con target=_blank', h.includes('target="_blank"') && h.includes('href="https://openai.com"'));
h = MP.parse('[x](javascript:alert(1))');
t('link javascript: eliminado', !h.includes('javascript:'));

// ── 6. Tablas: celdas vacías y alineación ──
h = MP.parse('| A | B |\n|---|:---:|\n| 1 | |\n| 2 | x |');
t('tabla: celda vacía conservada', count(h, '<td') === 4);
t('tabla: alineación centro', h.includes('text-align:center'));

// ── 7. Checklist [X] mayúscula ──
h = MP.parse('- [X] hecho');
t('checklist [X]', h.includes('checklist-item checked'));

// ── 8. Blockquote fusionado ──
h = MP.parse('> línea uno\n> línea dos');
t('blockquote: uno solo fusionado', count(h, '<blockquote>') === 1 && h.includes('<br>'));

// ── 9. HR variantes ──
t('hr ---', MP.parse('---').includes('<hr>'));
t('hr ***', MP.parse('***').includes('<hr>'));
t('hr ___', MP.parse('___').includes('<hr>'));
t('hr no confundir con bold', !MP.parse('***bold***').includes('<hr>'));

// ── 10. Fence con c++ ──
h = MP.parse('```c++\nint main() {}\n```');
t('fence c++: extraído como bloque', h.includes('<pre') && h.includes('language-c++'));

// ── 11. details open ──
h = MP.parse('<details open>\n<summary>Ver</summary>\ncontenido\n</details>');
t('details open', h.includes('<details open>'));

// ── 12. Imagen ──
h = MP.parse('![alt](img.png)');
t('imagen', h.includes('<img src="img.png" alt="alt"'));

// ── 13. Fences anidados (patrón biblioteca de skills) ──
const nested = '````markdown\n# SKILL\n\n## Output\n```\nREPORTE ASCII\n```\n````';
h = MP.parse(nested);
t('nested: un solo bloque de código', count(h, '<pre') === 1 && h.includes('REPORTE ASCII'));

// ── 14. Bold/italic con underscores ──
h = MP.parse('__fuerte__ y _suave_');
t('bold __', h.includes('<strong>fuerte</strong>'));
t('italic _', h.includes('<em>suave</em>'));
h = MP.parse('snake_case_variable');
t('underscores intra-palabra intactos', !h.includes('<em>'));

console.log(`\n${pass} tests OK, ${fail} fallos`);
process.exit(fail ? 1 : 0);
