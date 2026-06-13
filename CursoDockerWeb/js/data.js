const COURSE_DATA = {
  courseName: "DockerWeb 2026",
  version: "2.0",
  modules: [
    {
      id: "modulo-1",
      number: 1,
      icon: "🐳",
      difficulty: "beginner",
      title: "Módulo 1: Fundamentos",
      description: "Conceptos básicos y arquitectura de contenedores.",
      lessons: [
        {
          id: "01-que-es-docker",
          title: "¿Qué es Docker?",
          file: "modulo-1/01-que-es-docker.md"
        },
        {
          id: "02-arquitectura-docker",
          title: "Arquitectura de Docker",
          file: "modulo-1/02-arquitectura-docker.md"
        }
      ]
    },
    {
      id: "modulo-2",
      number: 2,
      icon: "📦",
      difficulty: "beginner",
      title: "Módulo 2: Tu Primer Contenedor",
      description: "Docker Desktop 2026 y ciclo de vida.",
      lessons: [
        {
          id: "01-docker-desktop-2026",
          title: "Docker Desktop en 2026",
          file: "modulo-2/01-docker-desktop-2026.md"
        },
        {
          id: "02-ciclo-de-vida",
          title: "Ciclo de Vida de un Contenedor",
          file: "modulo-2/02-ciclo-de-vida-contenedor.md"
        }
      ]
    },
    {
      id: "modulo-3",
      number: 3,
      icon: "🧩",
      difficulty: "intermediate",
      title: "Módulo 3: Imágenes y Dockerfiles",
      description: "Construyendo tus propias imágenes.",
      lessons: [
        {
          id: "01-estructura-dockerfile",
          title: "Estructura de un Dockerfile",
          file: "modulo-3/01-estructura-dockerfile.md"
        },
        {
          id: "02-capas-cache",
          title: "Capas y Caché",
          file: "modulo-3/02-capas-y-cache.md"
        },
        {
          id: "03-multi-stage",
          title: "Multi-stage Builds",
          file: "modulo-3/03-multi-stage-builds.md"
        }
      ]
    },
    {
      id: "modulo-4",
      number: 4,
      icon: "💾",
      difficulty: "intermediate",
      title: "Módulo 4: Persistencia y Redes",
      description: "Manejando el estado y conectando contenedores.",
      lessons: [
        {
          id: "01-volumenes",
          title: "Volúmenes y Bind Mounts",
          file: "modulo-4/01-volumenes-y-bind-mounts.md"
        },
        {
          id: "02-redes",
          title: "Redes en Docker",
          file: "modulo-4/02-redes-en-docker.md"
        }
      ]
    },
    {
      id: "modulo-5",
      number: 5,
      icon: "🐙",
      difficulty: "advanced",
      title: "Módulo 5: Docker Compose",
      description: "Orquestación multi-contenedor.",
      lessons: [
        {
          id: "01-intro-compose",
          title: "Introducción a Compose",
          file: "modulo-5/01-introduccion-compose.md"
        },
        {
          id: "02-dependencias",
          title: "Servicios y Dependencias",
          file: "modulo-5/02-servicios-y-dependencias.md"
        },
        {
          id: "03-variables",
          title: "Variables y Perfiles",
          file: "modulo-5/03-variables-entorno-y-perfiles.md"
        }
      ]
    },
    {
      id: "modulo-6",
      number: 6,
      icon: "🔒",
      difficulty: "advanced",
      title: "Módulo 6: Optimización y Seguridad",
      description: "Avanzando con Docker Desktop.",
      lessons: [
        {
          id: "01-scout",
          title: "Docker Scout y Seguridad",
          file: "modulo-6/01-docker-scout-y-seguridad.md"
        },
        {
          id: "02-extensions",
          title: "Docker Extensions",
          file: "modulo-6/02-docker-extensions.md"
        },
        {
          id: "03-devenv",
          title: "Dev Environments",
          file: "modulo-6/03-dev-environments.md"
        }
      ]
    },
    {
      id: "modulo-7",
      number: 7,
      icon: "🚀",
      difficulty: "advanced",
      title: "Módulo 7: Proyecto Final",
      description: "Pon a prueba tus conocimientos.",
      lessons: [
        {
          id: "01-proyecto-final",
          title: "Proyecto Final: Stack Completo",
          file: "modulo-7/proyecto-final.md"
        }
      ]
    }
  ],
  resources: [
    {
      id: "cheatsheet",
      title: "Cheatsheet de Comandos",
      description: "Lista de comandos esenciales para el día a día.",
      tag: "Guía Rápida",
      file: "recursos/cheatsheet.md",
      icon: "📌"
    }
  ],
  templates: [
    {
      id: "template-dockerfile",
      title: "Dockerfile Base (Node.js)",
      description: "Plantilla base optimizada para proyectos en Node.js.",
      tag: "Template",
      file: "templates/dockerfiles/DOCKERFILE_TEMPLATE.md",
      icon: "📦"
    },
    {
      id: "template-compose",
      title: "Compose Base",
      description: "Plantilla básica para orquestar servicios con Docker Compose.",
      tag: "Template",
      file: "templates/compose/COMPOSE_TEMPLATE.md",
      icon: "🐙"
    }
  ],
  examples: [
    {
      id: "ejemplo-mern",
      title: "Ejemplo: Stack MERN",
      description: "Arquitectura completa de MongoDB, Express, React y Node.",
      tag: "Proyecto",
      file: "ejemplos/ejemplo-mern.md",
      icon: "💻"
    }
  ]
};
