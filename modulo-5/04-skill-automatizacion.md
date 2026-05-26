# 5.4 - Skill de Automatización de Tareas

## 🎯 Objetivo

Aprender a diseñar un archivo Markdown para un Skill enfocado puramente en la automatización de procesos repetitivos y aburridos, como el parseo y clasificación de datos.

---

## 🤖 De la Teoría a la Automatización

En módulos anteriores vimos cómo un Agente de Atención al Cliente interactuaba con los usuarios. Pero, ¿qué pasa cuando llegan 500 correos de quejas durante la noche? No necesitamos que un agente converse con cada uno, necesitamos automatizar el triaje (clasificación).

Para esto construimos un **Skill de Automatización**. Este skill funciona en segundo plano ("Background Process"). Toma un gran volumen de texto, extrae lo importante, lo cataloga y lo escupe en un formato amigable para que un script (ej. en Python o Zapier) lo envíe a una base de datos.

---

## 📝 Estructura del Skill de Triage (Clasificador)

A diferencia de un Agente, fíjate cómo en este archivo omitimos por completo la sección "Personalidad". Vamos directo al procedimiento técnico.

```markdown
# SKILL: Triage de Tickets Automático

## Descripción
Este skill procesa correos electrónicos crudos de clientes y extrae parámetros clave en formato JSON para que el sistema de CRM pueda enrutar el ticket al departamento correcto.

## 📥 Input Esperado
Recibirás un string con el "Asunto" y el "Cuerpo" de un correo electrónico enviado por un cliente.

## ⚙️ Procedimiento
1. Analiza el sentimiento general del texto (Positivo, Neutral, Enojado).
2. Extrae el nombre de la empresa o cliente si se menciona.
3. Clasifica la intención principal en UNA de estas categorías exactas:
   - `FACTURACION` (Menciona pagos, recibos, tarjetas declinadas).
   - `SOPORTE_TECNICO` (Menciona errores, bugs, no funciona, contraseñas).
   - `VENTAS` (Pregunta por precios, planes, demos).
   - `SPAM` (Correos promocionales no deseados).
4. Asigna un nivel de prioridad (`ALTA`, `MEDIA`, `BAJA`). Si el sentimiento es Enojado o mencionan la palabra "cancelar", la prioridad debe ser SIEMPRE `ALTA`.

## 📤 Output Esperado (Estricto)
Debes retornar ÚNICAMENTE un bloque JSON válido con las siguientes llaves. No incluyas explicaciones antes ni después del bloque de código.

```json
{
  "cliente": "nombre_extraido",
  "sentimiento": "ENORJADO/NEUTRAL/POSITIVO",
  "categoria": "FACTURACION/SOPORTE_TECNICO/VENTAS/SPAM",
  "prioridad": "ALTA/MEDIA/BAJA",
  "resumen": "resumen del problema en 1 linea"
}
```
```

---

## ⚠️ ¿Por qué la salida estricta es tan vital?

Cuando automatizas tareas, tu código no tiene ojos. Si el código en Python está esperando un objeto `JSON` para pasarlo a una API de base de datos, y tu Skill decide responder:

*"¡Claro! Aquí tienes los datos extraídos del correo del cliente:*
`{ "cliente": "Juan" }`
*Espero que esto te sea de ayuda"*

**¡Tu código se va a romper (Crash)!** El parser de JSON fallará por el texto introductorio. 
Por eso, en automatización, usamos directivas agresivas como: *"Debes retornar ÚNICAMENTE un bloque JSON... No incluyas explicaciones"*.

---

## 🚀 Próximos Pasos

Con los Casos de Uso reales terminados, es posible que te hayas dado cuenta de que a veces los modelos se equivocan. ¿Qué hacemos cuando el LLM nos devuelve el formato incorrecto o cuando el Agente se niega a hacer su trabajo?
Aprenderemos a diagnosticar y solucionar todo esto en el módulo de Optimización.

👉 **Siguiente**: [6.1 - Testing y evaluación](../modulo-6/01-testing-evaluacion.md)

---

## 💡 Ejercicio Práctico

1. Crea el archivo `skill_extractor_facturas.md`.
2. Asume que el Input será texto extraído (OCR) de una factura escaneada.
3. Diseña el *Procedimiento* para buscar 3 datos: El Total a pagar, la fecha de vencimiento y el RFC o ID de la empresa.
4. Diseña el *Output Esperado* para que devuelva un formato JSON rígido.

---

**Tiempo estimado**: 20 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
