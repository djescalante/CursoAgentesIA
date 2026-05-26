# 1.1 - ¿Qué son los Agentes y Skills?

## 🤖 Introducción

En el mundo del desarrollo con IA, los **agentes** y **skills** son conceptos fundamentales que permiten crear sistemas inteligentes modulares y reutilizables.

---

## ¿Qué es un Agente?

Un **agente** es una entidad de IA con:

- **Personalidad definida**: Cómo se comporta y comunica
- **Conocimiento especializado**: Dominio o área de expertise
- **Capacidades**: Qué puede hacer (usar herramientas, acceder APIs, etc.)
- **Contexto**: Memoria y comprensión de la conversación
- **Objetivos**: Propósito específico para el que fue diseñado

### Ejemplo Conceptual

```
Agente: "Asistente de Código Python"
- Personalidad: Técnico, preciso, educativo
- Conocimiento: Python, mejores prácticas, debugging
- Capacidades: Analizar código, sugerir mejoras, detectar bugs
- Contexto: Recuerda el código que estás trabajando
- Objetivo: Ayudar a escribir mejor código Python
```

---

## ¿Qué es un Skill?

Un **skill** es una habilidad específica que un agente puede usar. Es como una "herramienta" o "capacidad" modular.

### Características de un Skill

- **Especializado**: Hace una cosa muy bien
- **Reutilizable**: Puede usarse en múltiples agentes
- **Activable**: Se activa bajo condiciones específicas
- **Documentado**: Incluye cuándo y cómo usarse

### Ejemplo Conceptual

```
Skill: "Análisis de CSV"
- Propósito: Leer y analizar archivos CSV
- Trigger: Usuario menciona archivo .csv o datos tabulares
- Capacidades: 
  - Leer archivos CSV
  - Detectar estructura
  - Generar estadísticas básicas
  - Visualizar datos
```

---

## 🔄 Diferencias Clave

| Aspecto | Agente | Skill |
|---------|--------|-------|
| **Alcance** | Sistema completo | Capacidad específica |
| **Personalidad** | Tiene personalidad propia | Neutral, es una herramienta |
| **Autonomía** | Toma decisiones | Ejecuta cuando se le llama |
| **Composición** | Usa múltiples skills | Es atómico (no usa otros skills) |
| **Contexto** | Mantiene conversación | Ejecución puntual |

---

## 🏗️ Arquitectura Típica

```
┌─────────────────────────────────────┐
│           AGENTE                    │
│  (Personalidad + Contexto)          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ Skill A │  │ Skill B │          │
│  │ (CSV)   │  │ (JSON)  │          │
│  └─────────┘  └─────────┘          │
│                                     │
│  ┌─────────┐  ┌─────────┐          │
│  │ Skill C │  │ Skill D │          │
│  │ (API)   │  │ (Email) │          │
│  └─────────┘  └─────────┘          │
└─────────────────────────────────────┘
```

---

## 💼 Casos de Uso Reales

### Agentes en Acción

1. **Agente de Desarrollo**: Ayuda a escribir, revisar y optimizar código
2. **Agente de Análisis**: Procesa datos y genera insights
3. **Agente de Documentación**: Crea y mantiene documentación técnica
4. **Agente de Testing**: Genera y ejecuta pruebas automatizadas

### Skills en Acción

1. **Skill de Lectura de PDF**: Extrae texto de documentos PDF
2. **Skill de API REST**: Realiza llamadas a APIs externas
3. **Skill de Web Scraping**: Obtiene datos de páginas web
4. **Skill de Visualización**: Genera gráficos y dashboards

---

## 🎯 Por Qué Usar Archivos Markdown

Los archivos `.md` son perfectos para definir agentes y skills porque:

1. **Legibles**: Humanos pueden leerlos y entenderlos fácilmente
2. **Versionables**: Funcionan perfectamente con Git
3. **Estructurados**: Markdown permite organizar información claramente
4. **Estándar**: Ampliamente adoptado en la industria
5. **Flexibles**: Fáciles de editar con cualquier editor de texto

---

## 📝 Ejemplo Básico de Archivo de Agente

```markdown
# Agente: Asistente de Python

## Descripción
Soy un experto en Python que ayuda a desarrolladores a escribir código limpio y eficiente.

## Personalidad
- Técnico pero amigable
- Explico conceptos complejos de forma simple
- Siempre sugiero mejores prácticas

## Capacidades
- Análisis de código Python
- Sugerencias de optimización
- Detección de bugs comunes
- Explicación de errores

## Reglas
- Siempre proporciono ejemplos de código
- Explico el "por qué" detrás de cada sugerencia
- Priorizo la legibilidad sobre la complejidad
```

---

## 📝 Ejemplo Básico de Archivo de Skill

```markdown
# SKILL: Análisis de CSV

## Descripción
Analiza archivos CSV y proporciona estadísticas básicas.

## Triggers
- Usuario menciona archivo .csv
- Usuario pide "analizar datos"
- Usuario sube un archivo CSV

## Procedimiento
1. Leer el archivo CSV
2. Detectar columnas y tipos de datos
3. Calcular estadísticas básicas (media, mediana, moda)
4. Identificar valores faltantes
5. Generar resumen

## Salida
- Tabla con estadísticas
- Reporte de calidad de datos
- Sugerencias de limpieza (si es necesario)
```

---

## 🚀 Próximos Pasos

Ahora que entiendes los conceptos básicos:

1. ✅ Sabes qué es un agente
2. ✅ Sabes qué es un skill
3. ✅ Entiendes sus diferencias
4. ✅ Conoces casos de uso reales

👉 **Siguiente**: [1.2 - Por qué usar archivos Markdown](02-por-que-markdown.md)

---

## 💡 Ejercicio Práctico

**Piensa en tu trabajo diario**: 

- ¿Qué agente te sería útil?
- ¿Qué skills necesitaría ese agente?
- Escribe una descripción de 3-5 líneas de cada uno

*Ejemplo*:
```
Agente: Organizador de Emails
Skills necesarios:
- Clasificar emails por importancia
- Extraer fechas y crear eventos
- Resumir conversaciones largas
```

---

**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐ Principiante
