# 6.2 - Debugging de Agentes

## 🎯 Objetivo

Aprender a diagnosticar por qué un agente se está comportando mal, ignorando reglas o alucinando, y aplicar técnicas de corrección ("Debugging") en nuestro archivo Markdown.

---

## 🐛 Síntomas Comunes y Sus Soluciones

El "código fuente" de tu agente es tu archivo Markdown. Cuando el agente falla, no buscas un punto y coma faltante, buscas una instrucción ambigua o un conflicto de reglas.

### 1. El Agente "Alucina" o Inventa Datos
**Síntoma:** Le preguntas por el estado de una factura y te inventa un número de guía o un monto inexistente.
**Causa:** El agente prefiere responder *algo* antes que admitir que no sabe. Su regla de "ser útil" sobrepasa su regla de "ser preciso".
**Solución (El antídoto Markdown):**
Agrega una cláusula absoluta de ignorancia (Ignorance Clause) en tu sección de `## Reglas`.

```markdown
## ⚠️ Reglas Estrictas
- NUNCA inventes información. Si el dato exacto no está presente en el contexto proporcionado, DEBES responder exactamente: "No poseo esa información en mi base de datos actual."
```

### 2. Ignora el Formato de Salida Obligatorio (JSON/CSV)
**Síntoma:** Le pediste un JSON crudo para tu skill, pero responde: *"¡Claro, aquí tienes tu JSON! ```json ... ``` Espero haberte ayudado."*
**Causa:** La personalidad innata del modelo LLM (ser un asistente amigable conversacional) está "sangrando" hacia la directiva funcional.
**Solución:**
Debes ser extremadamente imperativo y aislar la directiva en el output.

```markdown
## 📤 Output Esperado
REGLA CRÍTICA: Debes responder EXCLUSIVAMENTE con el objeto JSON. 
ESTÁ ESTRICTAMENTE PROHIBIDO añadir cualquier texto de saludo, confirmación, conclusión o bloques de markdown alrededor.
Si añades una sola palabra fuera del JSON, el sistema colapsará.
```

### 3. Amnesia Selectiva (Olvida instrucciones del inicio)
**Síntoma:** El archivo de tu agente es enorme (400 líneas). Sigue las reglas del final perfectamente, pero ignora su "Personalidad" definida al principio.
**Causa:** El sesgo de atención del LLM (Recency Bias / Lost in the Middle). Los modelos prestan más atención al final y al principio absoluto del prompt, y olvidan el medio.
**Solución:**
- Mueve las directivas MÁS críticas al mismísimo final de tu archivo Markdown.
- Usa recordatorios en el pie de página.

```markdown
--- (Al final de tu archivo) ---
## 📌 Recordatorio Final Antes de Responder:
1. Recuerda mantener tu tono italiano ("Mamma mia!").
2. Revisa que tu respuesta tenga menos de 3 párrafos.
```

---

## 🛠️ La Técnica del "Explicador" (Chain of Thought)

Si no sabes por qué el agente toma una decisión equivocada, ¡pídele que piense en voz alta!

Al hacer debugging temporal en tu archivo, modifica el `Output` para requerir un bloque `<thought>` antes de la respuesta final.

```markdown
## Formato de Respuesta
Antes de dar tu respuesta final al usuario, debes abrir etiquetas `<thought> ... </thought>`. 
Ahí dentro, escribe paso a paso por qué crees que tu respuesta cumple con las reglas 1 y 2.
Luego de cerrar la etiqueta, da tu respuesta.
```
Esto te permitirá leer la "mente" del modelo y darte cuenta de en qué paso lógico se está confundiendo. Una vez arreglado el problema, borras esta instrucción.

---

## 🚀 Próximos Pasos

Arreglar a tus agentes mediante iteraciones en el Markdown mejorará tu técnica como Ingeniero de Prompts. A continuación, veremos un tema súper importante cuando exponemos a nuestros agentes a usuarios maliciosos en internet.

👉 **Siguiente**: [6.4 - Seguridad y límites](04-seguridad-limites.md)

---

## 💡 Ejercicio Práctico

1. Toma cualquier agente que hayas creado (o el Asistente Ejecutivo).
2. Añádele la técnica del "Chain of Thought" en sus reglas (`<thought>`).
3. Pruébalo en la interfaz de IA y observa cómo el agente "razona" antes de actuar. ¡Ver la lógica interna es el 50% del debugging en IA!

---

**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
