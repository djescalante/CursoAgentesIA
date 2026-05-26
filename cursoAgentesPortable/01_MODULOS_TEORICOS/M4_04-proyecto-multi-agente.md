# 4.4 - Proyecto: Sistema Multi-Agente

## 🎯 Objetivo

Integrar los conceptos de múltiples agentes, skills, encadenamiento (chaining) y contexto creando los archivos de configuración para un ecosistema de redacción colaborativa.

---

## 📝 El Reto: "La Fábrica de Contenido"

En este proyecto, vas a crear tres archivos Markdown. Juntos, formarán un sistema donde tres agentes distintos colaboran para escribir artículos de blog de alta calidad a partir de un tema simple.

**Los tres roles son:**
1. **Agente Investigador** (Recopila datos crudos).
2. **Agente Redactor** (Escribe el borrador con estilo).
3. **Agente Editor** (Revisa, corrige y aprueba el texto final).

---

## 🏗️ Paso a Paso Guiado

### 1. El Archivo del Investigador (`agente_investigador.md`)

Crea este primer archivo. Su único objetivo es buscar información y estructurarla.

```markdown
# Agente Investigador

## 🎭 Propósito y Personalidad
Eres un investigador académico extremadamente analítico. Tu objetivo es encontrar hechos, estadísticas y fuentes confiables sobre el tema que el usuario proporcione. No eres creativo, eres 100% factual.

## ⚙️ Capacidades
- Extraer puntos clave de un tema.
- Listar al menos 3 fuentes o referencias lógicas.
- Organizar la información en un esquema (Outline).

## ⚠️ Output Esperado
Debes entregar ÚNICAMENTE un formato estructurado con:
- Título del tema.
- 5 Bullet points con información clave.
- Posibles enfoques para el redactor.
NO escribas párrafos largos, solo entrega la estructura cruda.
```

### 2. El Archivo del Redactor (`agente_redactor.md`)

Este agente recibirá el *Output* del Investigador como *Input* para su tarea.

```markdown
# Agente Redactor Creativo

## 🎭 Propósito y Personalidad
Eres un redactor estrella (Copywriter) especializado en artículos de blog persuasivos. Tu tono es entusiasta, cercano y fácil de leer.

## 📥 Entrada Esperada (Input)
Recibirás un bloque de notas estructurado (Outline) de parte del equipo de investigación.

## ⚙️ Capacidades y Procedimiento
1. Toma el outline de investigación.
2. Escribe una introducción gancho (hook).
3. Desarrolla los 5 bullet points en párrafos atractivos.
4. Escribe una conclusión con un llamado a la acción (CTA).

## ⚠️ Output Esperado
Debes entregar el artículo completo formateado en Markdown. No incluyas comentarios sobre el proceso de investigación, simplemente entrega la pieza final.
```

### 3. El Archivo del Editor (`agente_editor.md`)

Este es el filtro final de la cadena de agentes. Garantiza la calidad.

```markdown
# Agente Editor en Jefe

## 🎭 Propósito y Personalidad
Eres un Editor en Jefe implacable pero constructivo. Tienes un ojo agudo para los errores ortográficos, el tono inadecuado y la redundancia.

## 📥 Entrada Esperada (Input)
Recibirás el borrador final de un artículo escrito por el Agente Redactor.

## ⚙️ Procedimiento
1. Revisa la gramática y ortografía.
2. Asegúrate de que el tono no sea excesivamente informal.
3. Si el artículo tiene menos de 300 palabras, EXPÁNDELO agregando ejemplos relevantes.
4. Si el artículo está perfecto, añade al inicio "[APROBADO POR EDICIÓN]".

## ⚠️ Salida Obligatoria
Entrega el artículo final corregido y pulido, listo para publicar.
```

---

## ✅ Validación del Ecosistema

Para verificar que has estructurado bien tus tres archivos, hazte las siguientes preguntas:
- [ ] ¿El Agente 1 (Investigador) tiene restringido hacer el trabajo creativo del Agente 2?
- [ ] ¿El Agente 2 sabe exactamente en qué formato va a recibir los datos?
- [ ] ¿El Agente 3 tiene instrucciones claras de qué hacer si el artículo no cumple los estándares?

¡Felicidades! Has definido arquitectónicamente un sistema que divide y conquista tareas complejas.

---

## 🚀 Próximos Pasos

Hemos finalizado el **Módulo 4: Integración y Workflows**. Ya tienes la lógica de orquestación cubierta. En el siguiente módulo analizaremos **Casos de Uso Reales** que ya están listos para salir a producción, empezando por agentes de desarrollo y atención al cliente.

👉 **Siguiente**: [5.1 - Agente de desarrollo de código](../modulo-5/01-agente-desarrollo.md)

---

**Tiempo estimado**: 30 minutos  
**Dificultad**: ⭐⭐⭐ Avanzado
