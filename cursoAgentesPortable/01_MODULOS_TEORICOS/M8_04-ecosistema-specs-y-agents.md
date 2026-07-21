# 04. El Ecosistema Real: specs.md y AGENTS.md

A lo largo del Módulo 8 hemos hablado de la importancia de los archivos Markdown para gobernar a nuestros agentes. Esto no es solo teoría; allá afuera, la industria ya está adoptando estos conceptos como estándares oficiales para el desarrollo nativo con IA.

En esta lección exploraremos dos grandes iniciativas de código abierto: el estándar **AGENTS.md** y el framework **specs.md**. Veremos qué son, qué hacen, cómo se instalan y cómo se usan en proyectos reales.

---

## 1. El estándar `AGENTS.md`

### ¿Qué es y qué hace?
[AGENTS.md](https://agents.md) es una iniciativa de código abierto que propone un formato estándar, abierto y sencillo para guiar a cualquier agente de programación (como GitHub Copilot, Claude Code, Cursor, Antigravity, etc.).

Piensa en él como un `README.md`, pero diseñado exclusivamente para que lo lean las IAs. Su función principal es **proveer un contexto predecible**. Cuando un agente entra a tu proyecto, lo primero que busca es este archivo para entender las reglas del juego.

### ¿Cómo se "instala"?
Dado que es un estándar (un formato de texto) y no un programa, **no requiere instalación**. Funciona universalmente en casi cualquier IDE moderno impulsado por IA.

Para adoptarlo en tu proyecto, simplemente:
1. Abre la raíz de tu proyecto.
2. Crea un archivo llamado `AGENTS.md` (o `.github/AGENTS.md` si prefieres ocultarlo).

### ¿Cómo se usa?
Dentro de tu `AGENTS.md`, escribes instrucciones en Markdown natural. El agente las absorberá antes de realizar cualquier tarea.

**Ejemplo de uso (Plantilla básica):**
```markdown
# Instrucciones para Agentes de IA (AGENTS.md)

## Entorno de Desarrollo
- Este es un proyecto de React con TypeScript usando Vite.
- Usa siempre `pnpm` en lugar de `npm` o `yarn`.
- Para levantar el entorno, ejecuta `pnpm run dev`.

## Reglas de Arquitectura
- Todos los componentes nuevos deben ir en la carpeta `src/components`.
- Utiliza Tailwind CSS para los estilos. No crees archivos `.css` independientes.
- Favorece los componentes funcionales de React sobre las clases.

## Restricciones
- Nunca modifiques los archivos dentro de la carpeta `dist/`.
- Antes de proponer un cambio en producción, corre `pnpm test`.
```

Cuando le pidas a tu IDE "crea un botón", el agente revisará este archivo, sabrá que debe usar `pnpm`, creará el botón en `src/components` y usará Tailwind CSS sin que se lo tengas que pedir de forma explícita.

---

## 2. El framework `specs.md`

### ¿Qué es y qué hace?
[specs.md](https://specs.md) es mucho más que un archivo; es un **Framework de desarrollo nativo con IA** creado por Fabriqa. Mientras que `AGENTS.md` es pasivo (da instrucciones), `specs.md` es **activo**: incluye herramientas de línea de comandos (CLI) que orquestan el trabajo de múltiples IAs (como Claude Code, Gemini CLI, Codex) unificándolas en un solo flujo de trabajo.

Su función es usar archivos Markdown como "Especificaciones ejecutables". Escribes tu plan en un archivo, y el motor de `specs.md` se encarga de llamar a los agentes correctos para que ejecuten el código.

### ¿Cómo se instala?
Dado que este sí es un framework de software (basado en Node.js), necesitas instalarlo mediante tu terminal.

**Requisitos previos:**
Tener instalado Node.js en tu sistema.

**Instalación global vía npm:**
```bash
npm install -g specsmd
```

Alternativamente, puedes usarlo sin instalarlo permanentemente mediante `npx`:
```bash
npx specsmd --help
```

### ¿Cómo se usa?
El ciclo de trabajo con `specs.md` se basa en su "Flujo FIRE" (un modelo iterativo guiado por especificaciones).

**Paso 1: Define tu especificación**
Crea un archivo llamado `feature-login.spec.md` en tu proyecto:
```markdown
# Funcionalidad de Login
Objetivo: Implementar un login usando Firebase Auth.

## Tareas
- [ ] Conectar Firebase Auth en `src/lib/firebase.js`.
- [ ] Crear un formulario de Login en `src/pages/Login.jsx`.
- [ ] Redirigir al usuario a `/dashboard` tras el login.
```

**Paso 2: Ejecuta el orquestador**
Abre tu terminal y dile al framework que procese esa especificación usando su CLI:
```bash
specsmd run feature-login.spec.md
```

**Paso 3: El framework toma el control**
`specsmd` leerá el Markdown, entenderá la arquitectura y delegará las tareas al agente que tengas configurado (Claude, Gemini, etc.). El agente empezará a escribir el código y a marcar los `[ ]` como `[x]` en el archivo Markdown conforme avance, ¡tal como lo hacía nuestro orquestador en el Módulo 3 y 4!

---

## Conclusión

El uso de **AGENTS.md** y **specs.md** demuestra que lo que has aprendido en este curso es la vanguardia de la ingeniería de software. Controlar a la inteligencia artificial mediante **Markdown** es hoy en día la forma más profesional, predecible y escalable de desarrollar software.
