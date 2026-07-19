# 0.2 - Guía del Creador: Creando Nuevos Módulos y Lecciones

## 🏗️ Convención de Estructura de Directorios

Si deseas ampliar el curso añadiendo nuevas secciones o lecciones, debes seguir de forma estricta las siguientes convenciones del repositorio:

```
CursoAgentesMD/
│
├── modulo-N/                   # Carpeta del módulo (N = número del módulo, ej: modulo-9)
│   ├── 01-primer-tema.md       # Archivo Markdown con prefijo de 2 dígitos secuenciales
│   ├── 02-segundo-tema.md
│   └── ...
```

---

## 📝 Estructura y Estilo de un Archivo de Lección

Cada lección redactada en Markdown (`.md`) debe seguir un estándar pedagógico y formal para mantener la consistencia en el curso:

1. **Cabecera Principal (`#`)**:
   - Debe empezar con el número de sección y lección: `# N.M - Título`. Por ejemplo: `# 9.1 - Mi Nueva Lección`.
2. **Sección de Objetivo (`## 🎯 Objetivo`)**:
   - Una breve descripción de qué aprenderá el alumno en esta lección.
3. **Contenido Principal (`##`, `###`)**:
   - Explicaciones dinámicas alternando teoría y ejemplos claros.
   - Todo bloque de código debe tener especificado su lenguaje (ej. ` ```python `, ` ```markdown `).
4. **Metadatos al Pie de Página (Obligatorios)**:
   - Al final de la lección, añade siempre la dificultad y el tiempo estimado:
     ```markdown
     ---
     **Dificultad**: ⭐ Principiante | ⭐⭐ Intermedio | ⭐⭐⭐ Avanzado
     **Tiempo estimado**: X minutos
     ```

---

## 📄 Plantilla para Nuevas Lecciones

A continuación se muestra el código base que puedes copiar y pegar al crear un nuevo archivo `.md` en cualquier módulo:

```markdown
# X.Y - [Título de la Lección]

## 🎯 Objetivo
[Describe en 1 o 2 oraciones qué aprenderá el alumno al leer esta lección]

---

## 💡 Concepto Clave
[Desarrolla la teoría de forma didáctica. Usa negritas para términos importantes]

---

## 🛠️ Práctica / Ejemplo
[Proporciona un ejemplo de código o caso práctico útil]

```python
# Ejemplo de código limpio
def saludar_agente(nombre: str) -> str:
    return f"Hola, Agente {nombre}"
```

---

## 📝 Ejercicio Propuesto
[Propón un ejercicio corto para que el estudiante valide su aprendizaje]

1. [Paso 1 del ejercicio]
2. [Paso 2 del ejercicio]

---
**Dificultad**: ⭐ Principiante
**Tiempo estimado**: 15 minutos
```

---
**Dificultad**: ⭐ Principiante
**Tiempo estimado**: 10 minutos
