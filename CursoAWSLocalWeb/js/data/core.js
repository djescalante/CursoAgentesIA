/**
 * COURSE DATA — Núcleo: metadatos + logros.
 * Fuente única de verdad del curso — editar directamente (sin build step).
 * Debe cargarse ANTES que los módulos y secciones (ver index.html).
 */
const COURSE_DATA = {
  title: "Domina AWS Local con Floci",
  version: "1.0",
  totalLessons: 28,

  modules: [],      // se rellena desde js/data/modulo-0.js … modulo-8.js
  resources: [],    // js/data/recursos.js
  templates: [],    // js/data/templates.js
  examples: [],     // js/data/ejemplos.js

  achievements: [
    {
      id: `first-lesson`,
      name: `🎯 Primera Lección`,
      description: `Completa tu primera lección`
    },
    {
      id: `streak-3`,
      name: `🔥 Buen Comienzo`,
      description: `Completa 3 lecciones`
    },
    {
      id: `streak-5`,
      name: `🔥 Imparable`,
      description: `Completa 5 lecciones`
    },
    {
      id: `streak-10`,
      name: `⚡ Velocista`,
      description: `Completa 10 lecciones`
    },
    {
      id: `half-course`,
      name: `🥈 A Mitad de Camino`,
      description: `Completa 14 lecciones (50%)`
    },
    {
      id: `streak-20`,
      name: `💎 Dedicado`,
      description: `Completa 20 lecciones`
    },
    {
      id: `completionist`,
      name: `🏆 Curso Completado`,
      description: `Completa todas las lecciones`
    },
    {
      id: `mod-0-master`,
      name: `🧭 Iniciado`,
      description: `Completa el Módulo 0`
    },
    {
      id: `mod-1-master`,
      name: `☁️ Conociendo AWS`,
      description: `Completa el Módulo 1`
    },
    {
      id: `mod-2-master`,
      name: `🌐 Arquitecto de Redes`,
      description: `Completa el Módulo 2`
    },
    {
      id: `mod-3-master`,
      name: `🖥️ Creador de Servidores`,
      description: `Completa el Módulo 3`
    },
    {
      id: `mod-4-master`,
      name: `🗄️ DBA en Formación`,
      description: `Completa el Módulo 4`
    },
    {
      id: `mod-5-master`,
      name: `⚖️ Balanceador de Carga`,
      description: `Completa el Módulo 5`
    },
    {
      id: `mod-6-master`,
      name: `📜 ScriptMaster CLI`,
      description: `Completa el Módulo 6`
    },
    {
      id: `mod-7-master`,
      name: `🧩 CloudFormation Pro`,
      description: `Completa el Módulo 7`
    },
    {
      id: `mod-8-master`,
      name: `🏗️ Terraform Guru`,
      description: `Completa el Módulo 8`
    },
    {
      id: `all-exercises`,
      name: `💪 Practicante`,
      description: `Completa 5 o más ejercicios`
    }
  ]
};
