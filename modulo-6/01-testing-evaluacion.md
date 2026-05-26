# 6.1 - Testing y Evaluación de Agentes

## 🎯 Objetivo

Comprender la importancia de evaluar a nuestros agentes de manera sistemática antes de ponerlos a interactuar con usuarios reales o bases de datos productivas.

---

## 🧪 ¿Por qué hacer Testing en IA?

En la programación tradicional, escribimos un test unitario donde si `A + B`, esperamos `C`. Es determinista.
En la Inteligencia Artificial (LLMs), el comportamiento es **probabilístico**. Un agente puede responder maravillosamente el lunes y alucinar o cambiar de tono el martes ante un input similar.

Por ello, el *Testing* de agentes no se trata de buscar código roto, sino de **evaluar la alineación** del modelo con nuestras reglas (Guidelines) y su **tasa de éxito** en tareas específicas.

---

## 🛠️ Métodos de Evaluación

Existen tres enfoques principales para evaluar la eficacia de un Agente configurado con Markdown.

### 1. Pruebas Manuales (Red Teaming)
Consiste en intentar "romper" al agente a propósito interactuando con él en un chat.

- **Pruebas de Límite (Boundary Tests):** Intenta pedirle cosas que sus `## Reglas` prohíben expresamente. Ej: *Si el agente no debe dar reembolsos, exígele uno de manera agresiva.*
- **Pruebas de Out-of-Domain (OOD):** Hazle preguntas que no tienen nada que ver con su identidad. Ej: *Pregúntale la receta de una tarta a tu Agente Analista SQL.*
- **Objetivo:** Asegurarte de que el agente se niegue amablemente y redirija la conversación a su propósito real.

### 2. Testing Automatizado Basado en Reglas
Si tu Skill escupe datos (por ejemplo, en JSON), puedes escribir un script en Python/Node que haga llamadas masivas a la API del LLM con 100 correos de prueba.
Luego, el script verifica:
- ¿El output es un JSON válido?
- ¿Contiene las llaves requeridas (`cliente`, `prioridad`)?
Si falla en el 15% de los casos, tu archivo Markdown necesita ser más restrictivo en la sección `## Output Esperado`.

### 3. LLM-as-a-Judge (IA Evaluando a IA)
Esta es la técnica más avanzada. Creas un segundo agente cuyo único trabajo es calificar las respuestas de tu primer agente.

#### Ejemplo del "Agente Evaluador"
```markdown
# Evaluador de Calidad de Soporte

## Misión
Recibirás una transcripción entre un CLIENTE y nuestro AGENTE DE SOPORTE. 
Debes evaluar la respuesta del Agente del 1 al 5 en estas categorías:

1. **Empatía:** ¿El agente validó la frustración del cliente?
2. **Precisión Técnica:** ¿Siguió los pasos del manual?
3. **Límites:** ¿Ofreció algo que no debía (ej. dinero)?

Entrega tu evaluación final en un breve reporte.
```

---

## 📊 Métricas Clave a Monitorear

Cuando evalúes tus agentes, presta atención a:
1. **Tasa de Cumplimiento de Formato:** Qué tan seguido respeta las estructuras rígidas (JSON, YAML, CSV).
2. **Tasa de Alucinación:** Qué tan a menudo inventa datos que no estaban en su contexto o prompt.
3. **Tasa de Escalabilidad:** Cuántas veces el agente se rinde y pide que un humano tome el control (Si es muy alta, el agente es inútil; si es 0, podría estar inventando respuestas).

---

## 🚀 Próximos Pasos

Si durante tu fase de Testing descubres que tu agente está fallando, alucinando o ignorando tus reglas... ¡No entres en pánico! Necesitas depurarlo.

👉 **Siguiente**: [6.2 - Debugging de agentes](02-debugging.md)

---

## 💡 Ejercicio Práctico

1. Toma el `Agente Asistente Personal` que creaste en el Módulo 2.
2. Escribe una lista de **3 "Ataques" (Red Teaming)** que le harías para probar sus límites.
3. (Opcional) Si tienes acceso a ChatGPT o Claude, pega tu archivo Markdown, asume el rol del usuario, y lánzale tus 3 ataques. Revisa cómo se comporta.

---

**Tiempo estimado**: 20 minutos  
**Dificultad**: ⭐⭐ Intermedio
