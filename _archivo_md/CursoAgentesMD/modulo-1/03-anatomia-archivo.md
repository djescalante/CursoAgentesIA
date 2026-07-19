# 1.3 - Anatomía de un archivo de configuración

## 🔬 Introducción

Ya sabemos qué son los agentes/skills y por qué utilizamos Markdown para configurarlos. Ahora, analizaremos la estructura interna ("anatomía") típica que debe tener un buen archivo de definición para garantizar que el LLM lo interprete correctamente.

---

## 🏗️ Estructura General

Un archivo `.md` de definición de agente o skill suele dividirse en secciones jerárquicas lógicas. A continuación, desglosamos las partes más comunes:

### 1. Frontmatter o Metadatos (Opcional pero recomendado)
Suele ir al principio del archivo para definir variables de sistema.

```yaml
---
name: "Analista de Datos"
version: "1.0.0"
type: "agent"
---
```

### 2. Título y Propósito General (`#`)
Define de inmediato quién es el agente o qué hace el skill.

```markdown
# Analista de Datos Senior

Eres un experto en el análisis de bases de datos que ayuda a extraer conclusiones de valor de tablas complejas.
```

### 3. Personalidad y Tono (`##`)
Solo aplica para agentes. Le da instrucciones al modelo sobre su comportamiento, forma de hablar e idioma.

```markdown
## 🎭 Tono de Comunicación
- Profesional pero accesible.
- Respondes en español neutro.
- Evitas jergas innecesarias si el usuario no tiene nivel técnico avanzado.
```

### 4. Reglas Estrictas / Constraints (`##`)
Límites que el agente o skill NUNCA debe cruzar. Muy importante para la seguridad.

```markdown
## ⚠️ Reglas
- NUNCA compartas credenciales, contraseñas o tokens.
- SIEMPRE verifica que el archivo exista antes de intentar leerlo.
- NUNCA inventes (alucines) datos si no los encuentras en el texto proporcionado.
```

### 5. Capabilities / Habilidades (`##`)
En el caso de un agente, se listan los skills a los que tiene acceso. En el caso de un skill, se listan los pasos de su algoritmo interno.

```markdown
## ⚙️ Procedimiento
1. Lee el input del usuario.
2. Identifica las columnas clave.
3. Filtra los valores nulos.
4. Devuelve un formato JSON estructurado.
```

### 6. Ejemplos (Few-Shot Prompting) (`##`)
La mejor forma de que una IA entienda qué quieres es dándole ejemplos concretos de Entrada/Salida.

```markdown
## 📝 Ejemplos

**Entrada:** "Resume estas ventas"
**Salida:** 
- Total: $1500
- Promedio: $300
```

---

## 📌 Mejores Prácticas

- **Usa Markdown Semántico**: Los encabezados H1 (`#`) y H2 (`##`) le dan mucho contexto a la IA sobre la jerarquía del documento.
- **Sé Directo**: No uses frases ambiguas. En lugar de *"Trata de ser amable"*, usa *"Debes ser amable en cada respuesta"*.
- **Orden de Importancia**: Coloca las directivas más críticas al principio y al final del archivo. La IA suele prestar más atención a los extremos del prompt.

---

## 🚀 Próximos Pasos

Con esto concluimos el **Módulo 1: Fundamentos**.

1. ✅ Conoces los conceptos básicos.
2. ✅ Entiendes las ventajas del Markdown.
3. ✅ Te familiarizaste con la estructura interna.

👉 **Siguiente paso**: Es hora de crear algo real. Pasa al [Módulo 2: Creando tu Primer Agente](../modulo-2/01-estructura-basica.md)

---

## 💡 Ejercicio Práctico

**Dibuja tu propio esqueleto**:

- Crea un archivo vacío llamado `mi-primer-agente.md`.
- Agrega únicamente los títulos (`## Personalidad`, `## Reglas`, `## Ejemplos`) que creas que va a necesitar.
- No lo llenes aún, simplemente visualiza la estructura que usaremos en el próximo módulo.

---

**Tiempo estimado**: 10 minutos  
**Dificultad**: ⭐ Principiante
