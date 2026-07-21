# Spec 03 — Flujo de Trabajo del Sistema Multi-Agente

> Versión 3.0 · Actualizado para el curso web independiente (sin pipeline Markdown → JS).

Este documento establece el "contrato" de colaboración entre los agentes de IA que mantienen el curso.

## 1. Roles

- **course_orchestrator**: Líder. Planea, lee las especificaciones (`specs/01` y `specs/02`), usa la memoria (Engram), valida el resultado ejecutando la suite de verificación y se comunica con el usuario.
- **content_editor**: Ejecutor de contenido. Edita exclusivamente los archivos `js/data/*.js` basándose en las órdenes del orquestador y en `specs/01-content-structure.md` (estructura/tono) y `specs/02-web-interface.md` (componentes visuales vigentes y escapes).

> Nota: los antiguos roles `markdown_writer` y `web_portable_updater` quedan fusionados en `content_editor`: ya no existe un pipeline Markdown → JavaScript que orquestar — el contenido se edita una sola vez, directamente en `js/data/`.

## 2. Flujo de Tareas (Paso a Paso)

1. **Petición del Usuario**: El orquestador recibe la instrucción.
2. **Revisión de Memoria y Specs**: El orquestador busca en Engram (si aplica) y lee las especificaciones en `CursoAgentesWebV3/specs/`.
3. **Delegación de Contenido**: El orquestador invoca a `content_editor` pasándole el esquema de lo que debe redactar o modificar en `js/data/*.js`.
4. **Verificación**: Una vez finalizada la edición, el orquestador ejecuta la suite obligatoria desde `CursoAgentesWebV3/`:
   1. `node tests/verify-course.js`
   2. `node tests/test-markdown.js`
   3. `node tests/test-e2e.js`
   4. `node tests/test-smoke.js`
5. **Aprobación Final**: Si las 4 suites pasan, el orquestador guarda el resumen de la decisión arquitectónica en Engram usando:
   `engram mem_save "Tema Modificado" "Resumen de decisiones y ubicación de los archivos"`

## 3. Uso de Engram

El orquestador es el único agente autorizado para persistir memoria del proyecto:
- Guardar memoria: `engram mem_save "Título" "Contenido"`
- Buscar memoria: `engram mem_search "Término"`

## 4. Reglas de Seguridad del Contenido

- Nunca editar `js/app.js` ni `js/markdown.js` para añadir contenido (solo para cambios de interfaz, que requieren además actualizar los tests si cambia el comportamiento).
- Nunca usar clases CSS de la lista de eliminadas (`specs/02` §3).
- Nunca commitear cambios sin que la suite de verificación esté en verde.
