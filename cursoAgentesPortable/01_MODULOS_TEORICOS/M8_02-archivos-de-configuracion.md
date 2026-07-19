# 02. Archivos de Configuración para IDEs Agenticos

Para dominar a un agente de IA como **Antigravity** dentro de tu IDE, necesitas comunicarte con él en su idioma nativo: **Archivos Markdown**. A diferencia de los modelos de chat donde escribes un prompt efímero, en el desarrollo asistido por IA, los *prompts* se convierten en archivos persistentes en tu repositorio.

## 1. El archivo `specs.md` (Especificaciones del Proyecto)

¿Recuerdas cómo en el Módulo 3 nuestro orquestador leía los archivos de la carpeta `specs/` antes de actuar? Los IDEs agenticos funcionan igual.

El archivo `specs.md` (a veces llamado `PRD.md` o Product Requirements Document) se coloca en la raíz de tu proyecto o en una carpeta específica. 

**Propósito:**
Proveer a Antigravity con el contexto general de lo que estás intentando construir. En lugar de explicarle en el chat "estoy haciendo una app de tareas en Python que usa SQLite", simplemente lo dejas documentado en este archivo.

**Ejemplo de un `specs.md` ideal para Antigravity:**
```markdown
# Sistema de Gestión de Tareas

## Objetivo
Desarrollar una API RESTful en Python usando FastAPI para gestionar tareas pendientes.

## Arquitectura
- **Backend:** FastAPI (Python 3.10+)
- **Base de Datos:** SQLite con SQLAlchemy
- **Autenticación:** JWT Tokens

## Reglas de Negocio
- Una tarea no puede eliminarse, solo marcarse como "inactiva".
- Las tareas deben tener un campo `criticidad` (Alta, Media, Baja).

## Endpoints Esperados
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/{id}`
```
Cuando le pidas a Antigravity: *"Crea el endpoint de actualización de tareas"*, el agente automáticamente leerá este archivo y sabrá qué stack tecnológico usar y qué reglas de negocio aplicar, sin necesidad de que se lo repitas.

## 2. El archivo `AGENTS.md` (Reglas y Comportamiento)

Así como en los módulos anteriores aprendimos que un agente tiene una sección de `Personality` y `Rules` en su archivo de definición, Antigravity busca un archivo especial para definir sus propias reglas globales: `AGENTS.md` (usualmente ubicado en una carpeta `.agents/` o similar en la raíz de tu espacio de trabajo).

**Propósito:**
Dictar el estilo de código, las restricciones de seguridad, el tono de comunicación y las reglas universales del agente para ese proyecto en particular.

**Ejemplo de un `.agents/AGENTS.md`:**
```markdown
# Reglas Globales para Antigravity

## Estilo de Código
- Usa `flake8` para mantener el estándar PEP-8.
- Siempre agrega Type Hints (tipado estático) a las funciones en Python.
- Los docstrings deben estar en formato Google.

## Restricciones Críticas
- **NUNCA** modifiques la estructura de la base de datos sin preguntar primero al usuario.
- **NUNCA** utilices librerías experimentales que no estén en `requirements.txt`.

## Comportamiento del Agente
- Sé extremadamente conciso. Muestra el código directamente sin largas explicaciones.
- Si una prueba (Test) falla, intenta solucionarla automáticamente hasta un máximo de 3 intentos antes de pedir ayuda.
```

## 3. Otros archivos comunes (`.clinerules`)

Dependiendo de la extensión específica que uses (como Cline, RooCode, etc.), el nombre de los archivos puede variar. Un estándar emergente es `.clinerules`, que cumple la misma función que `AGENTS.md`.

Lo importante es **el concepto subyacente**: Transformar tu conocimiento sobre el proyecto en instrucciones persistentes legibles por la IA, asegurando que tus agentes siempre tengan el contexto correcto sin depender de tu memoria a corto plazo.

---

En la próxima lección veremos cómo llevar esto al siguiente nivel: Inyectando "Skills" o habilidades personalizadas en Antigravity para que pueda hacer cosas que por defecto no sabría hacer.
