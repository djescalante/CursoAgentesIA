# 🚀 Guía de Inicio Rápido

> Empieza en 30 minutos con tu primer agente y skill

---

## 📋 Prerequisitos

### Conocimientos
- ✅ Markdown básico (muy fácil de aprender)
- ✅ Python básico (si quieres integración programática)
- ⚠️ Conceptos de IA (opcional pero ayuda)

### Herramientas
- Editor de texto (VS Code recomendado)
- Cuenta en OpenAI o Anthropic (para pruebas)
- Terminal/línea de comandos

---

## ⚡ Ruta Rápida (30 minutos)

### Paso 1: Entiende los Conceptos (5 min)

**Agente** = "Personaje" de IA con personalidad y propósito
**Skill** = Capacidad específica que el agente puede usar

```
Ejemplo:
- Agente: "Asistente de Cocina"
- Skills: "Convertir medidas", "Sugerir sustitutos", "Calcular tiempos"
```

---

### Paso 2: Crea Tu Primer Agente (10 min)

Crea un archivo llamado `mi-primer-agente.md`:

```markdown
# AGENT: Asistente Personal

## Identity
Eres un asistente personal amigable que ayuda a organizar tareas diarias.

## Personality
- Amigable y motivador
- Organizado y eficiente
- Proactivo en sugerencias

## Capabilities
- Crear listas de tareas
- Priorizar actividades
- Dar recordatorios
- Sugerir optimizaciones de tiempo

## Behavior
1. Saluda con entusiasmo
2. Pregunta por las prioridades del día
3. Ayuda a estructurar el trabajo
4. Ofrece consejos de productividad

## Examples

### Conversación típica:
User: "Tengo muchas cosas que hacer hoy"
Assistant: "¡Perfecto! Vamos a organizarlo. ¿Cuáles son las 3 cosas más importantes que debes lograr hoy?"
```

✅ **¡Listo! Ya tienes tu primer agente.**

---

### Paso 3: Pruébalo (10 min)

**Opción A: Sin programar (ChatGPT)**

1. Ve a ChatGPT
2. Haz clic en tu nombre → Settings → Personalization → Custom Instructions
3. Copia el contenido de `mi-primer-agente.md`
4. Pégalo en "How would you like ChatGPT to respond?"
5. Prueba conversando

**Opción B: Con código (Python)**

```python
# prueba.py
import openai
import os

# Leer el agente
with open('mi-primer-agente.md') as f:
    agente = f.read()

# Probar
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": agente},
        {"role": "user", "content": "Tengo muchas cosas que hacer hoy"}
    ]
)

print(response.choices[0].message.content)
```

```bash
# Ejecutar
export OPENAI_API_KEY="tu-api-key"
python prueba.py
```

---

### Paso 4: Crea Tu Primer Skill (5 min)

Crea `skill-priorizador.md`:

```markdown
# SKILL: Task Prioritizer

## Description
Ayuda a priorizar tareas usando el método Eisenhower (urgente/importante).

## Triggers
- Usuario dice "priorizar", "qué hago primero", "organizar tareas"
- Usuario lista múltiples tareas

## Process
1. Recibir lista de tareas del usuario
2. Para cada tarea, preguntar:
   - ¿Es urgente? (deadline cercano)
   - ¿Es importante? (impacto alto)
3. Clasificar en matriz:
   - Urgente + Importante = HACER AHORA
   - Importante + No urgente = PROGRAMAR
   - Urgente + No importante = DELEGAR
   - Ni urgente ni importante = ELIMINAR
4. Presentar tareas ordenadas por prioridad

## Output
Lista numerada con tareas priorizadas y recomendación de cuándo hacerlas.

## Example

Input: 
- Responder email del jefe
- Limpiar escritorio
- Preparar presentación para mañana
- Ver curso de YouTube

Output:
🔴 HACER AHORA:
1. Preparar presentación para mañana (urgente + importante)

🟡 PROGRAMAR:
2. Responder email del jefe (importante, no urgente inmediato)

🔵 DELEGAR/MINIMIZAR:
3. Limpiar escritorio (urgente para ti pero bajo impacto)

⚪ ELIMINAR/POSTERGAR:
4. Ver curso de YouTube (ni urgente ni importante ahora)
```

✅ **¡Ahora tienes un skill!**

---

### Paso 5: Combinarlos (5 min bonus)

```python
# agente_con_skill.py

# Leer ambos archivos
with open('mi-primer-agente.md') as f:
    agente = f.read()

with open('skill-priorizador.md') as f:
    skill = f.read()

# Combinar
sistema_completo = f"""
{agente}

---

# AVAILABLE SKILLS:

{skill}
"""

# Usar
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": sistema_completo},
        {"role": "user", "content": "Ayúdame a priorizar mis tareas de hoy"}
    ]
)

print(response.choices[0].message.content)
```

---

## 🎯 ¿Qué Acabas de Lograr?

✅ Creaste tu primer agente con personalidad  
✅ Creaste tu primer skill especializado  
✅ Los combinaste en un sistema funcional  
✅ Lo probaste con IA real  

**Tiempo total**: ~30 minutos  
**Resultado**: Sistema de asistente personal funcional

---

## 🚀 Próximos Pasos

Ahora que entiendes lo básico:

### Nivel 1: Mejorar tu sistema
- [ ] Agrega 2-3 skills más
- [ ] Refina la personalidad del agente
- [ ] Prueba con diferentes tipos de tareas

### Nivel 2: Aprender más
- [ ] Lee [Módulo 1: Fundamentos](modulo-1/01-que-son-agentes-skills.md)
- [ ] Estudia [Ejemplos Completos](ejemplos/)
- [ ] Revisa [Templates](templates/)

### Nivel 3: Proyectos reales
- [ ] Crea un agente para TU trabajo/estudio
- [ ] Implementa el [Proyecto Final](modulo-7/proyecto-final.md)
- [ ] Comparte tu agente con la comunidad

---

## 💡 Ideas de Agentes para Crear

### Para Trabajo
- 📊 Analista de Datos Personal
- 💼 Asistente de Emails
- 📝 Generador de Reportes
- 🔍 Investigador de Mercado

### Para Estudio
- 📚 Tutor de Matemáticas
- 🇬🇧 Profesor de Inglés
- 🧪 Asistente de Laboratorio
- 📖 Creador de Resúmenes

### Para Creatividad
- ✍️ Co-escritor de Historias
- 🎨 Generador de Ideas Creativas
- 🎵 Asistente Musical
- 🎬 Brainstorming de Proyectos

### Para Vida Personal
- 🏃 Coach de Fitness
- 🍳 Asistente de Cocina
- 💰 Asesor Financiero Personal
- 🧘 Guía de Mindfulness

---

## 🆘 Problemas Comunes

### "El agente no sigue mis instrucciones"

**Solución**: Sé más específico

❌ Mal:
```markdown
Be helpful
```

✅ Bien:
```markdown
## Rules
1. ALWAYS ask clarifying questions before answering
2. NEVER assume what the user wants
3. PROVIDE examples with every explanation
```

---

### "El skill no se activa"

**Solución**: Triggers más claros

❌ Mal:
```markdown
Triggers: When user needs help
```

✅ Bien:
```markdown
Triggers:
- User says "priorizar", "prioritize", "qué hago primero"
- User lists 3+ tasks
- User asks "how to organize"
```

---

### "Las respuestas varían mucho"

**Solución**: Reduce temperature

```python
# Para más consistencia
temperature=0.3

# Para más creatividad
temperature=0.9
```

---

## 📚 Recursos de Aprendizaje

### Documentación del Curso
- [README principal](README.md) - Índice completo
- [Cheatsheet](recursos/cheatsheet.md) - Referencia rápida
- [FAQ](recursos/faq.md) - Preguntas frecuentes

### Ejemplos Listos para Usar
- [Agente de Python](ejemplos/agente-python-dev.md)
- [Skill de CSV](ejemplos/skill-csv-analyzer.md)
- [Templates](templates/)

### Guías Técnicas
- [Implementación](recursos/guia-implementacion.md)
- [Proyecto Final](modulo-7/proyecto-final.md)

---

## ✨ Tips de Productividad

### 1. Usa Templates
No empieces de cero. Copia un template y modifica.

### 2. Itera Rápido
Crea → Prueba → Ajusta → Repite

### 3. Documenta Decisiones
```markdown
# Por qué hice esto así:
- Razón 1
- Razón 2
```

### 4. Versiona Todo
```bash
git init
git add .
git commit -m "Versión 1.0 de mi agente"
```

### 5. Comparte y Aprende
- Muestra tus agentes a otros
- Pide feedback
- Mejora basándote en uso real

---

## 🎓 Ruta de Aprendizaje Completa

### Semana 1: Fundamentos (5 horas)
- Día 1-2: Leer Módulo 1
- Día 3-4: Crear 3 agentes simples
- Día 5-7: Crear 5 skills diferentes

### Semana 2: Integración (8 horas)
- Día 1-2: Aprender Python básico (si es necesario)
- Día 3-4: Integrar con API de IA
- Día 5-7: Crear sistema multi-skill

### Semana 3: Proyecto Real (10 horas)
- Día 1-2: Diseñar agente para TU caso de uso
- Día 3-5: Implementar
- Día 6-7: Probar y refinar

### Semana 4: Avanzado (10 horas)
- Día 1-3: Sistema multi-agente
- Día 4-6: Proyecto final del curso
- Día 7: Documentar y compartir

**Total**: ~33 horas para dominio completo

---

## 🏆 Hitos de Progreso

Marca tu progreso:

- [ ] ✅ Creé mi primer agente
- [ ] ✅ Creé mi primer skill
- [ ] ✅ Los probé con una API de IA
- [ ] ✅ Combiné agente + múltiples skills
- [ ] ✅ Creé un agente para MI caso de uso
- [ ] ✅ Implementé código en Python
- [ ] ✅ Completé el proyecto final
- [ ] ✅ Compartí mi trabajo

---

## 💬 Siguiente Acción Inmediata

**Elige UNA de estas opciones y hazla AHORA:**

### Opción A: Principiante Total
➡️ Crea `mi-agente.md` con el ejemplo de arriba y pruébalo en ChatGPT

### Opción B: Sé Python Básico
➡️ Clona este repo, instala requirements.txt, ejecuta el ejemplo

### Opción C: Tengo un Caso de Uso Específico
➡️ Define tu agente ideal en un archivo .md (10 minutos máximo)

**No leas más sin hacer algo práctico primero.**

---

## 📞 ¿Necesitas Ayuda?

### Recursos del Curso
- [FAQ Completo](recursos/faq.md)
- [Guía de Implementación](recursos/guia-implementacion.md)
- [Ejemplos](ejemplos/)

### Comunidad
- Comparte tus agentes
- Pide feedback
- Ayuda a otros

---

**¡Felicidades por empezar! 🎉**

El mejor momento para comenzar fue ayer.  
El segundo mejor momento es ahora.

**Empieza con algo simple. Mejora después.**

---

**Última actualización**: 2026-05-16  
**Tiempo de lectura**: 10 minutos  
**Tiempo de implementación**: 30 minutos
