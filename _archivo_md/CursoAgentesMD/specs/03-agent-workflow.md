# Flujo de Trabajo del Sistema Multi-Agente

Este documento establece el "contrato" de colaboración entre los 3 agentes de IA del proyecto.

## 1. Roles
- **course_orchestrator**: Líder. Planea, lee especificaciones, usa la memoria (Engram), evalúa el resultado y se comunica con el usuario.
- **markdown_writer**: Ejecutor de teoría. Edita exclusivamente archivos `.md` basándose en las órdenes del orquestador y `specs/01-course-structure.md`.
- **web_portable_updater**: Ejecutor web. Inyecta el contenido en `js/data.js`, aplica estilos HTML y compila el curso con los scripts Python basándose en `specs/02-web-interface.md`.

## 2. Flujo de Tareas (Paso a Paso)
1. **Petición del Usuario**: El orquestador recibe la instrucción.
2. **Revisión de Memoria y SDD**: El orquestador busca en Engram (si aplica) y lee las especificaciones en la carpeta `specs/`.
3. **Delegación a Markdown**: El orquestador invoca a `markdown_writer` pasándole el esquema de lo que debe redactar en los `.md`.
4. **Delegación a Web**: Una vez `markdown_writer` finaliza, el orquestador invoca a `web_portable_updater` pasándole la orden de integrar el nuevo contenido al visualizador web y ejecutar los scripts de build.
5. **Aprobación Final**: El orquestador valida el estado del proyecto y guarda el resumen de la decisión arquitectónica en Engram usando:
   `engram mem_save "Tema Modificado" "Resumen de decisiones y ubicación de los archivos"`

## 3. Uso de Engram
El orquestador es el único agente autorizado para ejecutar comandos en la terminal, exclusivamente limitados a interactuar con Engram:
- Guardar memoria: `.\engram.exe mem_save "Título" "Contenido"`
- Buscar memoria: `.\engram.exe mem_search "Término"`
