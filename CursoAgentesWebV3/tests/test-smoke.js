// Smoke test: ejecuta app.js con un DOM stub mínimo (init + renders principales)
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const WEB = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/';

// ── Datos + markdown ──
const d = WEB + 'js/data';
const order = ['core.js', 'modulo-0.js', 'modulo-1.js', 'modulo-2.js', 'modulo-3.js', 'modulo-4.js', 'modulo-5.js', 'modulo-6.js', 'modulo-7.js', 'modulo-8.js', 'recursos.js', 'templates.js', 'ejemplos.js'];
let src = '';
order.forEach(f => { src += fs.readFileSync(path.join(d, f), 'utf8') + '\n'; });
src += fs.readFileSync(WEB + 'js/markdown.js', 'utf8') + '\n';
src += fs.readFileSync(WEB + 'js/app.js', 'utf8') + '\n';

// ── DOM stub ──
function makeEl(tag) {
  const el = {
    tagName: (tag || 'div').toUpperCase(),
    children: [], style: {}, dataset: {}, attributes: {},
    className: '', _innerHTML: '', textContent: '', id: '', disabled: false, tabIndex: -1, onclick: null,
    classList: {
      _s: new Set(),
      add(...c) { c.forEach(x => this._s.add(x)); },
      remove(...c) { c.forEach(x => this._s.delete(x)); },
      toggle(c, f) { const has = f === undefined ? !this._s.has(c) : f; has ? this._s.add(c) : this._s.delete(c); return has; },
      contains(c) { return this._s.has(c); }
    },
    setAttribute(k, v) { this.attributes[k] = v; },
    getAttribute(k) { return this.attributes[k] ?? null; },
    appendChild(c) { this.children.push(c); return c; },
    addEventListener() {}, removeEventListener() {},
    querySelector() { return makeEl('div'); },
    querySelectorAll() { return []; },
    scrollTo() {}, scrollIntoView() {}, click() {}, focus() {},
  };
  Object.defineProperty(el, 'innerHTML', { get() { return this._innerHTML; }, set(v) { this._innerHTML = v; } });
  return el;
}

const ids = ['moduleList', 'globalProgressFill', 'globalProgressPct', 'progressText', 'modulesGrid', 'breadcrumb', 'lessonMeta', 'lessonTitle', 'lessonDifficulty', 'lessonTime', 'lessonContent', 'lessonTOC', 'lessonExerciseBox', 'lessonExercise', 'lessonResources', 'prevLesson', 'nextLesson', 'markComplete', 'recursosContent', 'templatesContent', 'ejemplosContent', 'progresoContent', 'exerciseModal', 'exerciseModalTitle', 'exerciseModalBody', 'submitExercise', 'cancelExercise', 'closeExerciseModal', 'toast', 'themeToggle', 'sidebarOpen', 'sidebarClose', 'sidebar', 'progressBadge', 'startCourseBtn', 'viewProgressBtn', 'contentArea', 'openExerciseBtn', 'resetProgressBtn', 'exerciseInput'];
const registry = {};
ids.forEach(id => { registry[id] = makeEl('div'); registry[id].id = id; });

const pages = {};
['home', 'lesson', 'recursos', 'templates', 'ejemplos', 'progreso'].forEach(p => { pages['page-' + p] = makeEl('section'); });

const documentStub = {
  readyState: 'complete',
  documentElement: makeEl('html'),
  body: makeEl('body'),
  querySelector(sel) {
    if (sel.startsWith('#')) return registry[sel.slice(1)] || pages[sel.slice(1)] || null;
    return makeEl('div');
  },
  querySelectorAll(sel) {
    if (sel === '.page') return Object.values(pages);
    if (sel === '.sidebar-link') return [];
    if (sel === '.module-btn' || sel === '.lesson-sub-btn') return [];
    return [];
  },
  createElement(tag) { return makeEl(tag); },
  addEventListener() {},
};

const storage = {};
const windowStub = {
  innerWidth: 1280,
  location: { hash: '' },
  addEventListener() {},
  App: undefined,
};
const ctx = {
  window: windowStub, document: documentStub, console,
  localStorage: { getItem: k => storage[k] ?? null, setItem: (k, v) => { storage[k] = String(v); }, removeItem: k => { delete storage[k]; } },
  IntersectionObserver: class { constructor() {} observe() {} unobserve() {} disconnect() {} },
  navigator: {}, setTimeout, clearTimeout, confirm: () => true,
};
windowStub.document = documentStub;
windowStub.localStorage = ctx.localStorage;
vm.createContext(ctx);

try {
  vm.runInContext(src + '\n;({ ok: true, App: window.App, COURSE_DATA, MarkdownParser });', ctx);
} catch (e) {
  console.log('EXCEPCIÓN al ejecutar app.js init:', e.message);
  console.log(e.stack.split('\n').slice(0, 4).join('\n'));
  process.exit(1);
}

const app = vm.runInContext('window.App', ctx);
if (!app) { console.log('FALLO: window.App no definido'); process.exit(1); }

// Navegar a una lección de cada módulo y a las secciones
try {
  const CD = vm.runInContext('COURSE_DATA', ctx);
  CD.modules.forEach(m => app.navigateToLesson(m.id, m.lessons[0].id));
  ['recursos', 'templates', 'ejemplos', 'progreso'].forEach(s => app.navigateToSection(s));
  app.goHome();
  const prog = app.getProgress();
  console.log(`Navegación OK — ${CD.modules.length} módulos + 4 secciones + home | progreso: ${prog.completed}/${prog.total} (${prog.pct}%)`);
  console.log('SMOKE TEST OK');
} catch (e) {
  console.log('EXCEPCIÓN en navegación:', e.message);
  console.log(e.stack.split('\n').slice(0, 4).join('\n'));
  process.exit(1);
}
