// Fix one-time: enlaces .md rotos → hash-links SPA, ruta absoluta, cross-links
const fs = require('fs');
const DIR = 'E:/IA/CursoAgentesIA/CursoAgentesIA/CursoAgentesWebV3/js/data/';

// [archivo, buscar (texto raw del archivo), reemplazo, nº esperado de ocurrencias]
const FIXES = [
  // ── modulo-1.js ──
  ['modulo-1.js', '[1.2 - Por qué usar archivos Markdown](02-por-que-markdown.md)', '[1.2 - Por qué usar archivos Markdown](#1-2)', 1],
  ['modulo-1.js', '[1.3 - Anatomía de un archivo de configuración](03-anatomia-archivo.md)', '[1.3 - Anatomía de un archivo de configuración](#1-3)', 1],
  ['modulo-1.js', '[Módulo 2: Creando tu Primer Agente](../modulo-2/01-estructura-basica.md)', '[Módulo 2: Creando tu Primer Agente](#2-1)', 1],
  // ── modulo-2.js ──
  ['modulo-2.js', '[2.2 - Personalidad y Comportamiento](02-personalidad-comportamiento.md)', '[2.2 - Personalidad y Comportamiento](#2-2)', 1],
  ['modulo-2.js', '[2.3 - Configurando Capacidades](03-capacidades.md)', '[2.3 - Configurando Capacidades](#2-3)', 1],
  ['modulo-2.js', '[2.4 - Proyecto práctico: Agente asistente personal](04-proyecto-asistente.md)', '[2.4 - Proyecto práctico: Agente asistente personal](#2-4)', 1],
  ['modulo-2.js', '[3.1 - Qué es un Skill](../modulo-3/01-que-es-skill.md)', '[3.1 - Qué es un Skill](#3-1)', 1],
  // ── modulo-3.js ──
  ['modulo-3.js', '[3.2 - Estructura de un SKILL.md](02-estructura-skill.md)', '[3.2 - Estructura de un SKILL.md](#3-2)', 1],
  ['modulo-3.js', '[3.3 - Triggers y Condiciones](03-triggers-condiciones.md)', '[3.3 - Triggers y Condiciones](#3-3)', 1],
  ['modulo-3.js', '[3.4 - Proyecto: Skill de Análisis de Datos](04-proyecto-skill-datos.md)', '[3.4 - Proyecto: Skill de Análisis de Datos](#3-4)', 1],
  ['modulo-3.js', '[3.4 - Proyecto Práctico: Skill de Análisis](04-proyecto-skill-datos.md)', '[3.4 - Proyecto Práctico: Skill de Análisis](#3-4)', 1],
  ['modulo-3.js', '[Template de Skill](../../templates/skills/SKILL_TEMPLATE.md)', '[Template de Skill](#templates)', 1],
  ['modulo-3.js', '[Biblioteca de Skills](../../recursos/biblioteca-skills.md)', '[Biblioteca de Skills](#recursos)', 1],
  ['modulo-3.js', '[FAQ](../../recursos/faq.md)', '[FAQ](#recursos)', 1],
  ['modulo-3.js', '[Módulo 4 - Integración y Workflows](../../modulo-4/01-combinando-skills.md)', '[Módulo 4 - Integración y Workflows](#4-1)', 1],
  // ── modulo-4.js ──
  ['modulo-4.js', '[4.2 - Cadenas de Agentes](02-cadenas-agentes.md)', '[4.2 - Cadenas de Agentes](#4-2)', 1],
  ['modulo-4.js', '[4.3 - Manejo de contexto y memoria](03-contexto-memoria.md)', '[4.3 - Manejo de contexto y memoria](#4-3)', 1],
  ['modulo-4.js', '[4.4 - Proyecto: Sistema multi-agente](04-proyecto-multi-agente.md)', '[4.4 - Proyecto: Sistema multi-agente](#4-4)', 1],
  ['modulo-4.js', '[5.1 - Agente de desarrollo de código](../modulo-5/01-agente-desarrollo.md)', '[5.1 - Agente de desarrollo de código](#5-1)', 1],
  // ── modulo-5.js ──
  ['modulo-5.js', '[5.2 - Agente de Análisis de Documentos](02-agente-documentos.md)', '[5.2 - Agente de Análisis de Documentos](#5-2)', 1],
  ['modulo-5.js', '[5.3 - Agente de Atención al Cliente](03-agente-atencion.md)', '[5.3 - Agente de Atención al Cliente](#5-3)', 1],
  ['modulo-5.js', '[5.4 - Skill de automatización de tareas](04-skill-automatizacion.md)', '[5.4 - Skill de automatización de tareas](#5-4)', 1],
  ['modulo-5.js', '[6.1 - Testing y evaluación](../modulo-6/01-testing-evaluacion.md)', '[6.1 - Testing y evaluación](#6-1)', 1],
  ['modulo-5.js', 'Precisamente, veremos esto en el próximo módulo.', 'Precisamente, lo veremos en la próxima lección.', 1],
  // ── modulo-6.js ──
  ['modulo-6.js', '[6.2 - Debugging de agentes](02-debugging.md)', '[6.2 - Debugging de agentes](#6-2)', 1],
  ['modulo-6.js', '[6.4 - Seguridad y límites](04-seguridad-limites.md)', '[6.3 - Optimización de Prompts](#6-3)', 1],
  ['modulo-6.js', '[7.1 - Diseño del Sistema (Proyecto Final)](../modulo-7/01-diseno-sistema.md)', '[7.1 - Diseño del Sistema (Proyecto Final)](#7-1)', 1],
  // ── modulo-7.js ──
  ['modulo-7.js', '[7.2 - Implementación Completa](02-implementacion.md)', '[7.2 - Implementación Completa](#7-2)', 1],
  ['modulo-7.js', '[7.3 - Evaluación y Refinamiento](03-evaluacion-refinamiento.md)', '[7.3 - Evaluación y Refinamiento](#7-3)', 1],
  // ── recursos.js ──
  ['recursos.js', '[Guía de implementación](guia-implementacion.md)', '[Guía de implementación](#recursos)', 2],
  ['recursos.js', '[Cheatsheet](cheatsheet.md)', '[Cheatsheet](#recursos)', 1],
];

let total = 0;
for (const [file, search, replacement, expected] of FIXES) {
  const p = DIR + file;
  let src = fs.readFileSync(p, 'utf8');
  const count = src.split(search).length - 1;
  if (count !== expected) throw new Error(`${file}: esperadas ${expected} ocurrencias, encontradas ${count} → ${search.slice(0, 60)}`);
  src = src.split(search).join(replacement);
  fs.writeFileSync(p, src);
  total += count;
}
console.log(`OK: ${total} enlaces/referencias corregidos`);

// ── Ruta absoluta filtrada (modulo-3.js) ──
const p3 = DIR + 'modulo-3.js';
let s3 = fs.readFileSync(p3, 'utf8');
const rePath = /d:\\\\cursoagenteClaude\\\\modulo-3\\\\data-insight-extractor\.md/;
if (!rePath.test(s3)) throw new Error('ruta absoluta no encontrada');
s3 = s3.replace(rePath, 'mis-proyectos/data-insight-extractor.md');
// Referencia a "sección de soluciones" → la solución vive en la lección 3.4
const oldSol = 'cargando un dataset ficticio o el ejemplo de e-commerce provisto en la sección de soluciones.';
if (!s3.includes(oldSol)) throw new Error('referencia a soluciones no encontrada');
s3 = s3.replace(oldSol, 'cargando un dataset ficticio o el ejemplo de e-commerce provisto en la Solución de Referencia de la lección 3.4.');
fs.writeFileSync(p3, s3);
console.log('OK: ruta absoluta eliminada y referencia a soluciones corregida');
