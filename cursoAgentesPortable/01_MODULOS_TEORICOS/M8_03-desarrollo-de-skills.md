# 03. Desarrollo e Inyección de Skills en Antigravity

En el Módulo 3, aprendimos qué son las "Skills": piezas atómicas de funcionalidad que un agente puede invocar cuando se cumplen ciertas condiciones. 

Con **Antigravity**, este concepto se lleva a la práctica de una manera muy concreta. Puedes extender lo que Antigravity sabe hacer inyectando tus propios "Skills" en la raíz de tu proyecto o de forma global en tu IDE.

## Anatomía de un SKILL para Antigravity

Antigravity y sistemas similares buscan carpetas de Skills dentro del directorio de customizaciones (por ejemplo, `.agents/skills/`). Cada Skill es una subcarpeta que **debe contener** un archivo llamado `SKILL.md`.

El archivo `SKILL.md` se compone de dos partes esenciales:
1. **Frontmatter (YAML):** Define el nombre y la descripción para que Antigravity sepa *cuándo* usar la herramienta.
2. **Body (Markdown):** Contiene las instrucciones paso a paso que el agente debe seguir una vez que decide usar el skill.

### Ejemplo de un `SKILL.md`

Imagina que quieres que Antigravity tenga una habilidad especial para auditar la seguridad de tus contenedores Docker usando un script que tú escribiste.

Estructura de archivos:
```
.agents/
└── skills/
    └── auditor_docker/
        ├── SKILL.md
        └── scripts/
            └── audit_security.py
```

Contenido de `.agents/skills/auditor_docker/SKILL.md`:
```markdown
---
name: auditor-seguridad-docker
description: Utiliza este skill cuando el usuario pida revisar la seguridad de un Dockerfile o de contenedores en ejecución.
---

# Instrucciones de Auditoría Docker

Has sido invocado para ejecutar la auditoría de seguridad. Sigue estos pasos de forma estricta:

1. Revisa si existe un `Dockerfile` en el directorio actual.
2. Ejecuta el script de auditoría ubicado en `.agents/skills/auditor_docker/scripts/audit_security.py` pasando el Dockerfile como argumento.
3. Lee el output del script (estará en formato JSON).
4. Genera un reporte en Markdown (crea un archivo llamado `reporte_auditoria.md`) usando los resultados.
5. Usa Alertas de Github (`> [!WARNING]`) para destacar vulnerabilidades graves.
```

## Diferencia con los Agentes Tradicionales

En los primeros módulos del curso, tú construías el bucle (loop) en Python que leía los Markdowns y determinaba qué hacer (Ingeniería de Loops).

Con **OpenCode y Antigravity**, el IDE se encarga del bucle. Tu trabajo se centra puramente en **Ingeniería de Prompts y Diseño de Sistemas**: escribes el Markdown (`AGENTS.md`, `specs.md`, `SKILL.md`) y el agente Antigravity hace el resto, interpretando tus instrucciones al vuelo, ejecutando comandos en consola y editando los archivos reales de tu proyecto.

## Resumen del Módulo

Has aprendido cómo el paradigma "Agentes como Código" no es solo un ejercicio académico, sino el estándar de la industria hoy en día en IDEs modernos. Ya sea que orquestes tus propios agentes con scripts Python, o utilices herramientas de grado empresarial como **OpenCode** y **Antigravity**, el secreto siempre radica en saber comunicarte claramente a través de archivos **Markdown**.
