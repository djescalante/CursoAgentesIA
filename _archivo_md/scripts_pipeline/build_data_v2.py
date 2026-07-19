"""
build_data_v2.py
Genera data.js V2 a partir de los archivos .md del curso.
"""
import os
import re
import json
from pathlib import Path

BASE = Path(r"E:\IA\CursoAgentesIA\CursoAgentesIA")
OUT = BASE / "CursoAgentesWebV2" / "js" / "data.js"

# ============================================================================
# CONFIGURACIÓN DE MÓDULOS
# ============================================================================

MODULES_CONFIG = [
    {
        "id": "modulo-1",
        "number": 1,
        "icon": "🧠",
        "title": "Fundamentos",
        "subtitle": "¿Qué son los Agentes y Skills?",
        "description": "Comprende los conceptos fundamentales: qué son los agentes IA, qué son los skills, y por qué usar Markdown para definirlos.",
        "difficulty": "beginner",
        "lessons": [
            ("1-1", "01-que-son-agentes-skills.md", "15 min", "⭐ Principiante", True),
            ("1-2", "02-por-que-markdown.md", "10 min", "⭐ Principiante", False),
            ("1-3", "03-anatomia-archivo.md", "20 min", "⭐ Principiante", True),
        ],
    },
    {
        "id": "modulo-2",
        "number": 2,
        "icon": "🤖",
        "title": "Creando tu Primer Agente",
        "subtitle": "De cero a agente funcional",
        "description": "Aprende a crear agentes completos paso a paso: estructura básica, personalidad, comportamiento y capacidades avanzadas.",
        "difficulty": "beginner",
        "lessons": [
            ("2-1", "01-estructura-basica.md", "45 min", "⭐ Principiante", True),
            ("2-2", "02-personalidad-comportamiento.md", "60 min", "⭐⭐ Intermedio", False),
            ("2-3", "03-capacidades.md", "15 min", "⭐⭐ Intermedio", False),
            ("2-4", "04-proyecto-asistente.md", "30 min", "⭐⭐ Intermedio", True),
        ],
    },
    {
        "id": "modulo-3",
        "number": 3,
        "icon": "⚡",
        "title": "Skills Avanzados",
        "subtitle": "Diseña herramientas modulares",
        "description": "Diseña skills efectivos con estructura completa, triggers precisos, y manejo de errores. El módulo más crítico para sistemas robustos.",
        "difficulty": "intermediate",
        "lessons": [
            ("3-1", "01-que-es-skill.md", "10 min", "⭐ Principiante", False),
            ("3-2", "02-estructura-skill.md", "45 min", "⭐⭐ Intermedio", False),
            ("3-3", "03-triggers-condiciones.md", "60 min", "⭐⭐⭐ Intermedio-Avanzado", False),
            ("3-4", "04-proyecto-skill-datos.md", "90 min", "⭐⭐ Intermedio", True),
        ],
    },
    {
        "id": "modulo-4",
        "number": 4,
        "icon": "🔗",
        "title": "Integración y Workflows",
        "subtitle": "Conecta agentes y skills",
        "description": "Aprende a combinar múltiples skills, crear cadenas de agentes, gestionar contexto y memoria, y diseñar sistemas multi-agente.",
        "difficulty": "intermediate",
        "lessons": [
            ("4-1", "01-combinando-skills.md", "90 min", "⭐⭐⭐ Intermedio-Avanzado", False),
            ("4-2", "02-cadenas-agentes.md", "25 min", "⭐⭐⭐ Avanzado", False),
            ("4-3", "03-contexto-memoria.md", "15 min", "⭐⭐⭐ Avanzado", False),
            ("4-4", "04-proyecto-multi-agente.md", "30 min", "⭐⭐⭐ Avanzado", True),
        ],
    },
    {
        "id": "modulo-5",
        "number": 5,
        "icon": "🏢",
        "title": "Casos de Uso Reales",
        "subtitle": "Sistemas listos para producción",
        "description": "Estudia implementaciones completas: agente de desarrollo, análisis de documentos, atención al cliente, y automatización.",
        "difficulty": "advanced",
        "lessons": [
            ("5-1", "01-agente-desarrollo.md", "180 min", "⭐⭐⭐⭐ Avanzado", False),
            ("5-2", "02-agente-documentos.md", "240 min", "⭐⭐⭐⭐ Avanzado", False),
            ("5-3", "03-agente-atencion.md", "20 min", "⭐⭐ Intermedio", False),
            ("5-4", "04-skill-automatizacion.md", "20 min", "⭐⭐⭐ Avanzado", False),
        ],
    },
    {
        "id": "modulo-6",
        "number": 6,
        "icon": "🔧",
        "title": "Optimización y Seguridad",
        "subtitle": "Refina y protege tus agentes",
        "description": "Testing, debugging, optimización de prompts, guardrails de seguridad y manejo de agentes en producción.",
        "difficulty": "advanced",
        "lessons": [
            ("6-1", "01-testing-evaluacion.md", "20 min", "⭐⭐ Intermedio", False),
            ("6-2", "02-debugging.md", "15 min", "⭐⭐⭐ Avanzado", False),
            ("6-3", "03-optimizacion-prompts.md", "90 min", "⭐⭐⭐⭐ Avanzado", False),
            ("6-4", "04-seguridad-limites.md", "15 min", "⭐⭐⭐⭐ Avanzado Experto", False),
        ],
    },
    {
        "id": "modulo-7",
        "number": 7,
        "icon": "🚀",
        "title": "Proyecto Final",
        "subtitle": "Sistema BI Multi-Agente",
        "description": "Integra todo lo aprendido en un sistema completo de Business Intelligence con múltiples agentes y skills colaborativos.",
        "difficulty": "advanced",
        "lessons": [
            ("7-1", "01-diseno-sistema.md", "20 min", "⭐⭐⭐ Avanzado", False),
            ("7-2", "02-implementacion.md", "25 min", "⭐⭐⭐ Avanzado", False),
            ("7-3", "03-evaluacion-refinamiento.md", "20 min", "⭐⭐⭐ Avanzado", True),
        ],
    },
]


# ============================================================================
# FUNCIONES AUXILIARES
# ============================================================================

def read_md(path: Path) -> str:
    """Lee un archivo .md y devuelve su contenido."""
    if not path.exists():
        print(f"⚠️ No existe: {path}")
        return f"# Contenido no disponible\n\nEl archivo `{path.name}` no fue encontrado."
    return path.read_text(encoding="utf-8")


def extract_exercise(md_content: str, has_exercise: bool) -> dict | None:
    """Extrae la sección de ejercicio de un .md si tiene ejercicio marcado."""
    if not has_exercise:
        return None
    # Buscar bloque de ejercicio (heurística: última sección con "Ejercicio")
    lines = md_content.split("\n")
    exercise_start = None
    for i, line in enumerate(lines):
        if re.match(r"^##\s+.*Ejercicio", line, re.IGNORECASE) or re.match(r"^##\s+💡\s+Ejercicio", line):
            exercise_start = i
    if exercise_start is None:
        return {
            "title": "Ejercicio Práctico",
            "prompt": "Aplica lo aprendido en esta lección a tu propio caso de uso.",
            "type": "text",
        }
    exercise_block = "\n".join(lines[exercise_start:])
    # Limpiar el heading principal
    exercise_block = re.sub(r"^##\s+💡\s+Ejercicio\s*\n", "", exercise_block)
    # Tomar las primeras 500 chars como prompt
    prompt = exercise_block.strip()[:500]
    return {
        "title": "Ejercicio Práctico",
        "prompt": prompt,
        "type": "text",
    }


def js_escape(s: str) -> str:
    """Escapa un string para ser usado en JavaScript."""
    return (
        s.replace("\\", "\\\\")
        .replace("`", "\\`")
        .replace("${", "\\${")
    )


# ============================================================================
# CONSTRUIR DATA.JS
# ============================================================================

def build_data_js() -> str:
    parts = []
    parts.append("/**")
    parts.append(" * COURSE DATA V2 — Domina Agentes IA y Skills con Markdown")
    parts.append(" * Generado automáticamente desde archivos .md del curso original.")
    parts.append(" * 7 módulos · 28 lecciones · Recursos · Templates · Ejemplos · Logros")
    parts.append(" */")
    parts.append("const COURSE_DATA = {")
    parts.append("  title: \"Domina Agentes IA y Skills con Markdown\",")
    parts.append("  version: \"2.0\",")
    parts.append("  totalLessons: 28,")
    parts.append("")
    parts.append("  modules: [")
    parts.append("")

    for m_idx, mod in enumerate(MODULES_CONFIG):
        parts.append(f"    // ====== MÓDULO {mod['number']}: {mod['title'].upper()} ======")
        parts.append("    {")
        parts.append(f"      id: \"{mod['id']}\",")
        parts.append(f"      number: {mod['number']},")
        parts.append(f"      icon: \"{mod['icon']}\",")
        parts.append(f"      title: \"{mod['title']}\",")
        parts.append(f"      subtitle: \"{mod['subtitle']}\",")
        parts.append(f"      description: \"{mod['description']}\",")
        parts.append(f"      difficulty: \"{mod['difficulty']}\",")
        parts.append("      lessons: [")
        parts.append("")

        for lesson_id, file_name, time, difficulty, has_ex in mod["lessons"]:
            md_path = BASE / f"modulo-{mod['number']}" / file_name
            content = read_md(md_path)
            exercise = extract_exercise(content, has_ex)

            parts.append(f"        {{")
            parts.append(f"          id: \"{lesson_id}\",")
            parts.append(f"          title: \"{extract_lesson_title(content, file_name)}\",")
            parts.append(f"          time: \"{time}\",")
            parts.append(f"          difficulty: \"{difficulty}\",")
            parts.append(f"          content: `{js_escape(content)}`,")
            if exercise:
                parts.append(f"          exercise: {{")
                parts.append(f"            title: {json.dumps(exercise['title'], ensure_ascii=False)},")
                parts.append(f"            prompt: {json.dumps(exercise['prompt'], ensure_ascii=False)},")
                parts.append(f"            type: \"text\"")
                parts.append(f"          }}")
            else:
                parts.append(f"          exercise: null")
            parts.append(f"        }},")
            parts.append("")

        parts.append("      ]")
        parts.append("    }" + ("," if m_idx < len(MODULES_CONFIG) - 1 else ""))
        parts.append("")

    parts.append("  ],")
    parts.append("")

    # ============================================================================
    # RECURSOS
    # ============================================================================
    parts.append("  // ============================================")
    parts.append("  // RECURSOS")
    parts.append("  // ============================================")
    parts.append("  resources: [")
    rec_dir = BASE / "recursos"
    for f in ["cheatsheet.md", "biblioteca-skills.md", "faq.md", "guia-implementacion.md"]:
        title_map = {
            "cheatsheet.md": ("📋 Cheatsheet Rápida", "Referencia rápida para crear y usar agentes y skills", "Referencia"),
            "biblioteca-skills.md": ("🗂️ Biblioteca de Skills", "Colección de skills probados y listos para usar", "Skills"),
            "faq.md": ("❓ FAQ - Preguntas Frecuentes", "Respuestas a las preguntas más comunes sobre agentes y skills", "FAQ"),
            "guia-implementacion.md": ("🚀 Guía de Implementación", "Cómo llevar tus agentes y skills a producción", "Guía"),
        }
        title, desc, tag = title_map[f]
        path = rec_dir / f
        if path.exists():
            content = read_md(path)
            parts.append("    {")
            parts.append(f"      id: \"{f.replace('.md', '')}\",")
            parts.append(f"      title: \"{title}\",")
            parts.append(f"      description: \"{desc}\",")
            parts.append(f"      icon: \"📄\",")
            parts.append(f"      tag: \"{tag}\",")
            parts.append(f"      content: `{js_escape(content)}`")
            parts.append("    },")
    parts.append("  ],")
    parts.append("")

    # ============================================================================
    # TEMPLATES
    # ============================================================================
    parts.append("  // ============================================")
    parts.append("  // TEMPLATES")
    parts.append("  // ============================================")
    parts.append("  templates: [")
    tpl_dir = BASE / "templates"
    template_files = [
        ("agents/AGENT_TEMPLATE.md", "📋 Template de Agente", "Plantilla completa para crear tus propios agentes", "Agente", "📋"),
        ("skills/SKILL_TEMPLATE.md", "⚡ Template de Skill", "Plantilla completa para crear skills reutilizables", "Skill", "⚡"),
    ]
    for f, title, desc, tag, icon in template_files:
        path = tpl_dir / f
        if path.exists():
            content = read_md(path)
            parts.append("    {")
            parts.append(f"      id: \"{f.replace('/', '-').replace('.md', '')}\",")
            parts.append(f"      title: \"{title}\",")
            parts.append(f"      description: \"{desc}\",")
            parts.append(f"      icon: \"{icon}\",")
            parts.append(f"      tag: \"{tag}\",")
            parts.append(f"      content: `{js_escape(content)}`")
            parts.append("    },")
    parts.append("  ],")
    parts.append("")

    # ============================================================================
    # EJEMPLOS
    # ============================================================================
    parts.append("  // ============================================")
    parts.append("  // EJEMPLOS COMPLETOS")
    parts.append("  // ============================================")
    parts.append("  examples: [")
    ej_dir = BASE / "ejemplos"
    example_files = [
        ("agente-python-dev.md", "🐍 Agente Python Dev", "Asistente experto en desarrollo Python con debugging y optimización", "Agente", "🐍"),
        ("skill-csv-analyzer.md", "📊 Skill CSV Analyzer", "Análisis automático de archivos CSV con estadísticas y visualizaciones", "Skill", "📊"),
    ]
    for f, title, desc, tag, icon in example_files:
        path = ej_dir / f
        if path.exists():
            content = read_md(path)
            parts.append("    {")
            parts.append(f"      id: \"{f.replace('.md', '')}\",")
            parts.append(f"      title: \"{title}\",")
            parts.append(f"      description: \"{desc}\",")
            parts.append(f"      icon: \"{icon}\",")
            parts.append(f"      tag: \"{tag}\",")
            parts.append(f"      content: `{js_escape(content)}`")
            parts.append("    },")
    parts.append("  ],")
    parts.append("")

    # ============================================================================
    # LOGROS
    # ============================================================================
    parts.append("  // ============================================")
    parts.append("  // LOGROS / ACHIEVEMENTS")
    parts.append("  // ============================================")
    parts.append("  achievements: [")
    achievements = [
        ("first-lesson", "🎯 Primera Lección", "Completa tu primera lección", {"threshold": 1}),
        ("streak-3", "🔥 En Racha (3)", "Completa 3 lecciones", {"threshold": 3}),
        ("streak-5", "🔥 En Racha (5)", "Completa 5 lecciones", {"threshold": 5}),
        ("streak-10", "⚡ Velocista", "Completa 10 lecciones", {"threshold": 10}),
        ("half-course", "🥈 A Mitad de Camino", "Completa 14 lecciones (50%)", {"threshold": 14}),
        ("streak-20", "💎 Dedicado", "Completa 20 lecciones", {"threshold": 20}),
        ("completionist", "🏆 Curso Completado", "Completa las 28 lecciones", {"threshold": 32}),
        ("mod-1-master", "🧠 Maestro de Fundamentos", "Completa el Módulo 1", {"module": "modulo-1"}),
        ("mod-2-master", "🤖 Creador de Agentes", "Completa el Módulo 2", {"module": "modulo-2"}),
        ("mod-3-master", "⚡ Arquitecto de Skills", "Completa el Módulo 3", {"module": "modulo-3"}),
        ("mod-4-master", "🔗 Orquestador", "Completa el Módulo 4", {"module": "modulo-4"}),
        ("mod-5-master", "🏢 Profesional", "Completa el Módulo 5", {"module": "modulo-5"}),
        ("mod-6-master", "🔧 Optimizador", "Completa el Módulo 6", {"module": "modulo-6"}),
        ("mod-7-master", "🚀 Experto Final", "Completa el Módulo 7", {"module": "modulo-7"}),
        ("all-exercises", "💪 Practicante", "Completa 5 o más ejercicios", {"id": "all-exercises"}),
    ]
    for i, (aid, name, desc, criteria) in enumerate(achievements):
        sep = "," if i < len(achievements) - 1 else ""
        parts.append(f"    {{ id: \"{aid}\", name: \"{name}\", description: \"{desc}\" }}{sep}")
    parts.append("  ]")
    parts.append("};")
    parts.append("")

    return "\n".join(parts)


def extract_lesson_title(content: str, file_name: str) -> str:
    """Extrae el título H1 de un .md."""
    lines = content.split("\n")
    for line in lines:
        if line.startswith("# "):
            # Quitar el prefijo "1.1 - " o similar
            title = line[2:].strip()
            # Quitar prefijos numéricos tipo "1.1 - "
            title = re.sub(r"^\d+(\.\d+)*\s*[-–—]\s*", "", title)
            return title
    # Fallback: nombre de archivo sin extensión
    return file_name.replace(".md", "").replace("-", " ").title()


# ============================================================================
# EJECUTAR
# ============================================================================

if __name__ == "__main__":
    print("Generando data.js V2...")
    content = build_data_js()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(content, encoding="utf-8")
    size_kb = OUT.stat().st_size / 1024
    lines = content.count("\n")
    print(f"Generado: {OUT}")
    print(f"  Tamaño: {size_kb:.1f} KB ({lines:,} lineas)")
