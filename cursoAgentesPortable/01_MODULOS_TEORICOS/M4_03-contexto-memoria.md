# 4.3 - Manejo de Contexto y Memoria

## 🎯 Objetivo

Comprender cómo dotar a nuestros agentes de la capacidad de "recordar" información vital a corto y largo plazo sin saturar los límites de tokens del Modelo de Lenguaje.

---

## 🧠 El Problema de la Amnesia en la IA

Por defecto, los Modelos de Lenguaje (LLMs) son **apátridas (stateless)**. Esto significa que cada mensaje que les envías es tratado de forma completamente aislada. Si le dices "Mi nombre es Ana" y en el siguiente mensaje le preguntas "¿Cómo me llamo?", el modelo no lo sabrá a menos que le vuelvas a enviar el historial de la conversación.

Si le enviamos el historial completo cada vez, rápidamente superaremos la "Ventana de Contexto" (Context Window) y el costo de la API se disparará.

---

## 🛠️ Tipos de Memoria para Agentes

Existen tres formas principales de gestionar la memoria, y podemos configurarlas en nuestros archivos Markdown.

### 1. Memoria de Corto Plazo (Historial Reciente)
Consiste en pasar únicamente los últimos *N* mensajes intercambiados (por ejemplo, los últimos 5 mensajes). Es útil para mantener el hilo de una conversación casual.

*En tu archivo Markdown de configuración puedes dictar una regla sobre esto:*
```markdown
## Reglas de Memoria
- Al responder, haz referencia siempre a los datos del mensaje inmediatamente anterior para mantener fluidez.
```

### 2. Memoria de Trabajo (Resumen de Contexto)
En lugar de recordar palabra por palabra, el sistema mantiene un resumen actualizado. Cada vez que hay nueva información, un pequeño "Skill resumidor" reescribe el estado actual.

*Puedes definir un agente que haga esto:*
```markdown
## Capacidades
- Eres el encargado de leer el resumen antiguo y el nuevo turno de conversación. 
- Debes emitir un nuevo resumen consolidado, borrando información irrelevante y conservando fechas y nombres clave.
```

### 3. Memoria de Largo Plazo (RAG - Retrieval-Augmented Generation)
Esta es la técnica más avanzada. Consiste en guardar datos en una base de datos externa (como una base de datos vectorial) e inyectar al agente solo los fragmentos relevantes cuando hace una búsqueda.

*Cómo documentar esto en el Markdown de tu agente principal:*
```markdown
## Habilidades (Skills)
- Tienes acceso al skill `Consultar_Base_Conocimiento`. Úsalo SIEMPRE que el usuario te pregunte sobre políticas de la empresa, historia o datos de clientes pasados, antes de intentar responder con tus datos pre-entrenados.
```

---

## 🏗️ Implementando Variables de Contexto (Context Injection)

A menudo, no necesitas bases de datos complejas. Puedes simplemente usar "placeholders" en tu prompt de Markdown, que tu código Python/Node llenará antes de enviarlo a la IA.

### Ejemplo de Archivo de Configuración Dinámico

```markdown
# Agente: Asistente de Ventas

## Contexto del Cliente Actual
**Nombre:** {{CLIENT_NAME}}
**Última compra:** {{LAST_PURCHASE_DATE}}
**Nivel de queja:** {{COMPLAINT_LEVEL}}

## Instrucciones
Hola Asistente. Estás hablando con {{CLIENT_NAME}}. Su última compra fue el {{LAST_PURCHASE_DATE}}. 
Si el nivel de queja es ALTO, debes usar un tono extremadamente empático y ofrecer un reembolso.
```

Al utilizar esta plantilla, tu sistema simplemente reemplaza las variables `{{...}}` antes de enviarle el Markdown al modelo. ¡Felicidades, le acabas de dar memoria instantánea a tu agente!

---

## 🚀 Próximos Pasos

Dominar el contexto significa que tus agentes ya no sufrirán de amnesia ni alucinarán inventando datos para llenar los vacíos. Con agentes especializados, skills y ahora memoria, estás listo para armar un ecosistema completo.

👉 **Siguiente**: [4.4 - Proyecto: Sistema multi-agente](04-proyecto-multi-agente.md)

---

## 💡 Ejercicio Práctico

1. Abre el archivo de tu Agente Asistente Personal del Módulo 2.
2. Agrega una sección llamada `## Contexto Actual`.
3. Introduce 3 o 4 variables dinámicas (usando la sintaxis `{{VARIABLE}}`) que el agente necesitaría saber sobre ti todos los días para ser verdaderamente útil (ej. `{{HORA_ACTUAL}}`, `{{TAREAS_PENDIENTES}}`).

---

**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
