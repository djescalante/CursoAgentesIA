// Verifica qué selectores CSS candidatos a purga están realmente muertos
const fs = require('fs');
const path = require('path');
const WEB = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/';

// Todo el contenido que puede referenciar clases
let haystack = '';
const sources = ['index.html', 'js/app.js', 'js/markdown.js'];
sources.forEach(f => { haystack += fs.readFileSync(WEB + f, 'utf8'); });
fs.readdirSync(WEB + 'js/data').forEach(f => { haystack += fs.readFileSync(WEB + 'js/data/' + f, 'utf8'); });

const candidates = [
  'code-viewer', 'info-box', 'chart-title', 'card-bad', 'card-good',
  'flow-tabs', 'flow-tab', 'flow-panel', 'flow-desc', 'flow-svg',
  'chain-steps', 'chain-step', 'step-final', 'step-number', 'step-icon', 'step-name', 'step-desc', 'step-output', 'chain-arrow',
  'risks-grid', 'risk-card', 'risk-icon', 'risk-desc', 'risk-solution',
  'kpi-bars', 'kpi-item', 'kpi-label', 'kpi-bar-track', 'kpi-bar-fill',
  'css-tabs', 'css-tabs-nav', 'tab-pane',
  'flow-flex', 'flow-step-card', 'step-title', 'flow-arrow-icon',
  'parallel-grid', 'parallel-branches', 'parallel-node', 'parallel-icon',
  'routing-container', 'router-box', 'router-icon', 'route-path', 'route-cond', 'route-target',
  'matrix-flex-grid', 'matrix-item-card', 'matrix-badge', 'matrix-situation', 'matrix-skills',
  'compare-two-col', 'compare-box', 'compare-header', 'compare-list',
  'qa-loop-wrapper', 'qa-node', 'qa-loop-arrow',
  'memory-grid', 'memory-type-card',
  'context-merge-visual', 'merge-pane', 'merge-action-arrow',
  'factory-deck', 'agent-factory-card',
  'chain-diagram-section', 'example-chain-viz', 'metrics-visual',
  // los que deben VIVIR (control):
  'chart-wrapper', 'comparison-grid', 'comparison-card', 'comp-icon', 'comp-list',
  'visual-diagram-container', 'diagram-title',
];

const dead = [], alive = [];
candidates.forEach(cls => {
  // busca la clase como palabra (en class="..." o classList o querySelector)
  const re = new RegExp('(^|[\\s"\'`=.])' + cls.replace(/-/g, '\\-') + '([\\s"\'`=.]|$)');
  (re.test(haystack) ? alive : dead).push(cls);
});
console.log('MUERTOS confirmados:', dead.length);
console.log(dead.join(', '));
console.log('\nVIVOS (no purgar):', alive.length);
console.log(alive.join(', '));
