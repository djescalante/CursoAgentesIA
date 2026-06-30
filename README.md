<div align="center">

# 🤖 Curso Agentes IA con Claude

**Aprende a diseñar, construir y desplegar agentes de IA funcionales usando archivos Markdown**  
*De los conceptos fundamentales hasta sistemas multi-agente en producción*

---

![Estado](https://img.shields.io/badge/Estado-Activo-brightgreen?style=flat-square)
![Módulos](https://img.shields.io/badge/Módulos-8-blue?style=flat-square)
![Agentes](https://img.shields.io/badge/Agentes%20reales-4-purple?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10%2B-yellow?style=flat-square)

</div>

---

## ¿Qué es este repositorio?

Un ecosistema completo de aprendizaje y desarrollo de **Agentes de IA** con Claude. Combina material de curso estructurado en Markdown con agentes reales ya en producción, interfaces web interactivas y herramientas de soporte.

La filosofía central: **los agentes y skills se definen en archivos `.md`** — legibles por humanos, versionables con Git, y consumibles directamente por los LLMs.

---

## 🗂️ Estructura del Proyecto

```
cursoagenteClaude/
│
├── 📚 CursoAgentesMD/          # Curso completo de Agentes en Markdown
│   ├── modulo-1/               # Fundamentos: qué son agentes y skills
│   ├── modulo-2/               # Estructura y anatomía de un agente
│   ├── modulo-3/               # Skills: diseño y triggers
│   ├── modulo-4/               # Combinando skills y cadenas de agentes
│   ├── modulo-5/               # Agentes especializados (dev, docs, atención)
│   ├── modulo-6/               # Testing, debugging y optimización
│   ├── modulo-7/               # Proyecto final: sistema multi-agente
│   ├── modulo-8/               # Integración IDEs: OpenCode y Antigravity
│   ├── practicas/              # Ejercicios prácticos por módulo
│   ├── recursos/               # Biblioteca de skills, cheatsheet, FAQ
│   ├── templates/              # Plantillas reutilizables de agentes y skills
│   ├── ejemplos/               # Ejemplos funcionales de agentes y skills
│   └── specs/                  # Especificaciones técnicas del curso
│
├── 🤖 Agentes/                 # Agentes reales en producción
│   ├── AgenteANS/              # Análisis de Acuerdos de Nivel de Servicio
│   ├── Agente_Clasificador_MM/ # Clasificador de Malos Manejos
│   ├── Agente_Malos_Manejos/   # Auditoría y validación de reportes
│   ├── Agente_Top_Criticidad/  # Análisis y ranking de incidentes críticos
│   └── requirements.txt        # Dependencias Python de los agentes
│
├── 🌐 CursoAgentesWebV3/       # Interfaz web del curso (v3)
├── 🐳 CursoDockerWeb/          # Versión dockerizada del curso web
├── 📦 cursoAgentesPortable/    # Versión portable sin dependencias
│
├── 🔧 engram/                  # Herramienta Engram (memoria persistente para agentes)
├── 📜 scripts/                 # Scripts utilitarios Python
└── .gitignore
```

---

## 📚 Curso de Agentes en Markdown

> **8 módulos** que llevan al estudiante desde cero hasta sistemas multi-agente funcionales, incluyendo integración con IDEs.

### Ruta de Aprendizaje

```
Módulo 1 → Módulo 2 → Módulo 3 → Módulo 4 → Módulo 5 → Módulo 6 → Módulo 7 → Módulo 8
   ↓           ↓           ↓           ↓           ↓           ↓         ↓         ↓
¿Qué son?  Estructura   Skills     Combinar    Agentes    Testing   Proyecto   OpenCode
Agentes y  y anatomía   triggers   y cadenas  reales en  y debug    Final    y Anti-
  skills   del agente   y condic.  de agentes producción  prompts  multi-ag.  gravity
```

| Módulo | Tema | Archivos |
|--------|------|----------|
| **1** | Fundamentos — Qué son agentes y skills, por qué Markdown | 3 lecciones |
| **2** | Estructura básica, personalidad y capacidades del agente | 4 lecciones |
| **3** | Skills: anatomía, triggers, condiciones y proyecto práctico | 5 lecciones |
| **4** | Combinando skills, cadenas de agentes y contexto/memoria | 4 lecciones |
| **5** | Agentes especializados: desarrollo, documentos, atención al cliente | 4 lecciones |
| **6** | Testing, debugging, optimización de prompts y seguridad | 4 lecciones |
| **7** | Proyecto final: Sistema Multi-Agente de Business Intelligence | 1 proyecto |
| **8** | Integración con IDEs Agenticos: OpenCode y Antigravity | 3 lecciones |

### Recursos Incluidos

- 📖 **Biblioteca de Skills** — catálogo de skills reutilizables
- 📋 **Cheatsheet** — referencia rápida de sintaxis y patrones
- ❓ **FAQ** — preguntas frecuentes y soluciones comunes
- 🗺️ **Guía de Implementación** — cómo llevar agentes a producción
- 🧩 **Templates** — plantillas de agentes y skills listas para usar

---

## 🤖 Agentes en Producción

Agentes funcionales construidos y desplegados como resultado del curso.

### Agente de Auditoría — Malos Manejos

> Valida y cruza reportes operativos de incidentes contra bases de datos de cajeros ATM y sucursales para auditar responsables de cierre.

- **Input**: Reporte de Malos Manejos (`.xlsx`) + BDs de cajeros (`.xlsb`) y sucursales
- **Proceso**: Clasificación de sitio → cruce de responsables → detección de discrepancias
- **Output**: Reporte validado completo + archivo de mismatches para auditoría
- **Skills**: `skill-validador-malos-manejos.md`

```bash
python Agentes/Agente_Malos_Manejos/validador_reporte.py
```

---

### Agente Top Criticidad

> Analiza bases de datos de incidentes de seguridad, calcula scores de criticidad por sitio y genera representaciones visuales del Top N más críticos.

- **Input**: Base de datos de incidentes (Excel)
- **Proceso**: Normalización de códigos → cálculo de score → ranking
- **Output**: Gráfico de barras horizontales del Top críticos
- **Skills**: `skill-analisis-criticidad-excel.md` · `skill-graficador-criticidad.md`

---

### Agente ANS

> Especializado en el análisis de Acuerdos de Nivel de Servicio (ANS/SLA), procesa reportes mensuales y genera análisis de cumplimiento.

---

### Agente Clasificador MM

> Clasifica automáticamente registros de Malos Manejos por empresa, proveedor y función para facilitar el seguimiento operativo.

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Python 3.10+
- Claude / cualquier LLM compatible con MCP
- Git

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>
cd cursoagenteClaude

# Instalar dependencias de los agentes
pip install -r Agentes/requirements.txt
```

### Empezar el Curso

1. Abre la carpeta `CursoAgentesMD/`
2. Comienza con [`modulo-1/01-que-son-agentes-skills.md`](CursoAgentesMD/modulo-1/01-que-son-agentes-skills.md)
3. Sigue la ruta módulo por módulo
4. Usa las plantillas en `CursoAgentesMD/templates/` para tus propios agentes

### Usar la Interfaz Web

```bash
# Abrir el curso en el navegador
start CursoAgentesWebV3/index.html

# O la versión portable
start cursoAgentesPortable/index.html
```

---

## 🧩 Anatomía de un Agente (`.md`)

La estructura básica que aprenderás en el curso:

```markdown
# AGENT: Nombre del Agente

## Identity
Descripción de quién es y cuál es su propósito.

## Personality
- Características de comportamiento
- Tono de comunicación

## Expertise
- Área 1 de conocimiento
- Área 2 de conocimiento

## Available Skills
- [skill-nombre.md]: Para qué sirve y cuándo usarlo

## Rules
1. SIEMPRE hacer X
2. NUNCA hacer Y
3. Cuando Z, entonces W
```

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|------------|------------|
| Definición de agentes | Markdown (`.md`) |
| Lógica de automatización | Python 3.10+ |
| Procesamiento de datos | pandas, openpyxl |
| Interfaz web del curso | HTML + CSS + JS (Vanilla) |
| Memoria de agentes | [Engram](engram/) |
| Control de versiones | Git |

---

## 📁 Recursos Adicionales

| Recurso | Descripción |
|---------|-------------|
| [`CursoAgentesMD/recursos/cheatsheet.md`](CursoAgentesMD/recursos/cheatsheet.md) | Referencia rápida de patrones |
| [`CursoAgentesMD/recursos/biblioteca-skills.md`](CursoAgentesMD/recursos/biblioteca-skills.md) | Catálogo de skills reutilizables |
| [`CursoAgentesMD/recursos/faq.md`](CursoAgentesMD/recursos/faq.md) | Preguntas frecuentes |
| [`CursoAgentesMD/recursos/guia-implementacion.md`](CursoAgentesMD/recursos/guia-implementacion.md) | Llevar agentes a producción |
| [`engram/README.md`](engram/README.md) | Documentación de Engram |

---

<div align="center">

*Construido con 🧠 y mucho ☕ — Aprende. Construye. Automatiza.*

</div>
