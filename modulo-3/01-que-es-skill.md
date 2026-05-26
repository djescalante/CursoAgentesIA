# 3.1 - Qué es un Skill

## 🎯 Objetivo

Comprender la diferencia fundamental entre un Agente (el cerebro central) y un Skill (una herramienta especializada), y saber cuándo utilizar cada uno.

---

## 🤖 El Concepto del Agente vs Skill

Imagina un restaurante de alta cocina:

- El **Agente** es el Chef Ejecutivo. Tiene una personalidad (perfeccionista, italiano), conoce todo el contexto del menú, habla con el comensal (el usuario) y delega tareas.
- El **Skill** es como una Cortadora de Fiambre o un Cuchillo para filetear. No tiene "personalidad", no habla con el cliente, solo recibe un input (una pieza de carne), hace un proceso altamente especializado, y devuelve un output (filetes perfectos).

### ¿Por qué separarlos?

Si metieras todas las instrucciones de cómo cortar fiambre, cómo hornear el pan, cómo batir los huevos y cómo limpiar la cocina dentro de la cabeza del Chef Ejecutivo (el Agente), terminaría completamente abrumado y olvidando cosas.

En la Inteligencia Artificial pasa igual. Si en un solo archivo Markdown metes las instrucciones para que el Agente sea un experto en Python, que además sepa analizar bases de datos SQL, que lea archivos PDF y que procese pagos... el **Context Window** se saturará y el Agente sufrirá de *alucinaciones* o ignorará partes del prompt.

La solución es la **Modularidad**: Crear un Agente base simple, y dotarlo de una caja de herramientas (Skills).

---

## 🔧 Características de un Skill

A diferencia de un Agente, un Skill en nuestro formato Markdown se caracteriza por:

1. **Altamente Especializado**: Hace una sola cosa, pero la hace excepcionalmente bien.
2. **Sin Personalidad**: Su tono de salida suele ser puramente funcional o estructurado (ej. un JSON, una tabla, o datos crudos).
3. **Reutilizable**: Un skill de "Buscador Web" puede ser usado por el "Agente Programador", el "Agente Asistente" y el "Agente Analista Financiero".
4. **Basado en Entradas y Salidas**: Está diseñado como una función matemática. `f(x) = y`. Entra un dato, ocurre un proceso detallado, sale un resultado.

---

## 📝 Agente vs Skill: Resumen

| Característica | Agente | Skill |
| :--- | :--- | :--- |
| **Rol principal** | Orquestar, planificar, conversar | Ejecutar una tarea repetitiva/técnica |
| **Tono / Personalidad** | Sí, definida (amigable, formal, etc.) | No, estrictamente funcional |
| **Uso de contexto** | Alto (recuerda la conversación) | Bajo (solo procesa el input recibido) |
| **Interacción** | Interactúa con el usuario y con Skills | Solo interactúa con el Agente que lo llama |

---

## 🚀 Próximos Pasos

Ahora que entiendes filosóficamente qué es un Skill y por qué es vital para escalar el poder de la IA sin que pierda precisión, vamos a ver la estructura técnica de un archivo de Skill.

👉 **Siguiente**: [3.2 - Estructura de un SKILL.md](02-estructura-skill.md)

---

## 💡 Ejercicio Práctico

1. Piensa en el Agente "Asistente Ejecutivo Pro" que hicimos en el módulo anterior.
2. Anota 3 capacidades complejas que ese agente tendría que realizar, y que serían perfectas candidatas para convertirse en "Skills" externos para no sobrecargar el cerebro del asistente.
3. Ejemplo: *Skill_Resumidor_de_PDFs_Extensos*.

---

**Tiempo estimado**: 10 minutos  
**Dificultad**: ⭐ Principiante
