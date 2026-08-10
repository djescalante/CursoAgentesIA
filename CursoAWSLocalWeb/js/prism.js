/* prism.js — Stub de compatibilidad.
 * El resaltado de sintaxis real lo hace MarkdownParser._highlight (js/markdown.js),
 * 100% offline y sin dependencias externas.
 * Este archivo solo garantiza que cualquier llamada legada a Prism.* no falle.
 */
window.Prism = window.Prism || {
  highlight: function (text) { return text; },
  highlightAll: function () {},
  highlightAllUnder: function () {},
  highlightElement: function () {}
};
