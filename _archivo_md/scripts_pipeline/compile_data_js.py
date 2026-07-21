import os
import re
import sys
from pathlib import Path

# Paths
ROOT_PATH = Path(__file__).parent.parent.resolve()
MD_PATH = ROOT_PATH / "CursoAgentesMD"

# Modules Metadata
MODULES_METADATA = {
    0: {
        "icon": "🧭",
        "title": "Inicio y Mapa de Ruta",
        "subtitle": "Tu punto de partida",
        "description": "El mapa de ruta completo del curso y la guía del creador para expandir o agregar nuevas secciones sin fricción.",
        "difficulty": "beginner"
    },
    1: {
        "icon": "🧠",
        "title": "Fundamentos",
        "subtitle": "¿Qué son los Agentes y Skills?",
        "description": "Comprende los conceptos fundamentales: qué son los agentes IA, qué son los skills, y por qué usar Markdown para definirlos.",
        "difficulty": "beginner"
    },
    2: {
        "icon": "🤖",
        "title": "Creando tu Primer Agente",
        "subtitle": "De cero a agente funcional",
        "description": "Aprende a crear agentes completos paso a paso: estructura básica, personalidad, comportamiento y capacidades avanzadas.",
        "difficulty": "beginner"
    },
    3: {
        "icon": "⚡",
        "title": "Skills Avanzados",
        "subtitle": "Diseña herramientas modulares",
        "description": "Aprende a diseñar y construir habilidades independientes (skills) que tus agentes pueden activar dinámicamente bajo demanda.",
        "difficulty": "intermediate"
    },
    4: {
        "icon": "🔗",
        "title": "Integración y Workflows",
        "subtitle": "Conecta agentes y skills",
        "description": "Aprende a encadenar múltiples agentes, coordinar llamadas a herramientas y gestionar la memoria compartida del sistema.",
        "difficulty": "intermediate"
    },
    5: {
        "icon": "🏢",
        "title": "Casos de Uso Reales",
        "subtitle": "Sistemas listos para producción",
        "description": "Explora agentes reales que auditan reportes de incidentes, clasifican datos transaccionales de ATM y automatizan tareas repetitivas.",
        "difficulty": "advanced"
    },
    6: {
        "icon": "🔧",
        "title": "Optimización y Seguridad",
        "subtitle": "Refina y protege tus agentes",
        "description": "Técnicas avanzadas de testing, detección de loops de ejecución, mitigación de alucinaciones y guardrails de seguridad.",
        "difficulty": "advanced"
    },
    7: {
        "icon": "🚀",
        "title": "Proyecto Final",
        "subtitle": "Sistema BI Multi-Agente",
        "description": "Diseña e implementa de punta a punta un sistema autónomo de Business Intelligence para clasificar e indexar criticidades de incidentes.",
        "difficulty": "advanced"
    },
    8: {
        "icon": "💻",
        "title": "Integración IDEs",
        "subtitle": "OpenCode y Antigravity",
        "description": "Aprende a integrar agentes y skills en entornos de desarrollo modernos mediante archivos de configuración.",
        "difficulty": "advanced"
    }
}

# Resources Metadata
RESOURCES_METADATA = {
    "cheatsheet": {
        "title": "📋 Cheatsheet Rápida",
        "description": "Referencia rápida para crear y usar agentes y skills",
        "icon": "📄",
        "tag": "Referencia"
    },
    "faq": {
        "title": "❓ Preguntas Frecuentes",
        "description": "Respuestas a las dudas más comunes y problemas frecuentes",
        "icon": "❓",
        "tag": "Soporte"
    },
    "guia-implementacion": {
        "title": "🗺️ Guía de Implementación",
        "description": "Cómo estructurar tus proyectos en producción",
        "icon": "🗺️",
        "tag": "Guía"
    },
    "biblioteca-skills": {
        "title": "📚 Biblioteca de Skills",
        "description": "Catálogo de skills listos para integrar",
        "icon": "📚",
        "tag": "Biblioteca"
    }
}

# Templates Metadata
TEMPLATES_METADATA = {
    "agents/AGENT_TEMPLATE": {
        "id": "agents-AGENT_TEMPLATE",
        "title": "📋 Template de Agente",
        "description": "Plantilla completa para crear tus propios agentes",
        "icon": "📋",
        "tag": "Agente"
    },
    "skills/SKILL_TEMPLATE": {
        "id": "skills-SKILL_TEMPLATE",
        "title": "⚡ Template de Skill",
        "description": "Plantilla completa para crear skills reutilizables",
        "icon": "⚡",
        "tag": "Skill"
    }
}

# Examples Metadata
EXAMPLES_METADATA = {
    "agente-python-dev": {
        "title": "🐍 Agente Python Dev",
        "description": "Asistente experto en desarrollo Python con debugging y optimización",
        "icon": "🐍",
        "tag": "Agente"
    },
    "skill-csv-analyzer": {
        "title": "📊 Skill CSV Analyzer",
        "description": "Skill para cargar, resumir y graficar datos desde archivos CSV",
        "icon": "📊",
        "tag": "Skill"
    }
}

# Achievements List
ACHIEVEMENTS = [
    { "id": "first-lesson", "name": "🎯 Primera Lección", "description": "Completa tu primera lección" },
    { "id": "streak-3", "name": "🔥 En Racha (3)", "description": "Completa 3 lecciones" },
    { "id": "streak-5", "name": "🔥 En Racha (5)", "description": "Completa 5 lecciones" },
    { "id": "streak-10", "name": "⚡ Velocista", "description": "Completa 10 lecciones" },
    { "id": "half-course", "name": "🥈 A Mitad de Camino", "description": "Completa 14 lecciones (50%)" },
    { "id": "streak-20", "name": "💎 Dedicado", "description": "Completa 20 lecciones" },
    { "id": "completionist", "name": "🏆 Curso Completado", "description": "Completa todas las lecciones" },
    { "id": "mod-0-master", "name": "🧭 Iniciado", "description": "Completa el Módulo 0" },
    { "id": "mod-1-master", "name": "🧠 Maestro de Fundamentos", "description": "Completa el Módulo 1" },
    { "id": "mod-2-master", "name": "🤖 Creador de Agentes", "description": "Completa el Módulo 2" },
    { "id": "mod-3-master", "name": "⚡ Arquitecto de Skills", "description": "Completa el Módulo 3" },
    { "id": "mod-4-master", "name": "🔗 Orquestador", "description": "Completa el Módulo 4" },
    { "id": "mod-5-master", "name": "🏢 Profesional", "description": "Completa el Módulo 5" },
    { "id": "mod-6-master", "name": "🔧 Optimizador", "description": "Completa el Módulo 6" },
    { "id": "mod-7-master", "name": "🚀 Experto Final", "description": "Completa el Módulo 7" },
    { "id": "mod-8-master", "name": "💻 IDE Integrador", "description": "Completa el Módulo 8" },
    { "id": "all-exercises", "name": "💪 Practicante", "description": "Completa 5 o más ejercicios" }
]

def clean_title(title_line):
    # Strip '# ' and prefixes like '1.1 - ', '01. ', 'Módulo 8: '
    title = title_line.lstrip('#').strip()
    title = re.sub(r'^(?:\d+(?:\.\d+)?\s*[-–:]\s*|\d+\.\s*|Módulo\s+\d+\s*[-–:]\s*)', '', title, flags=re.IGNORECASE)
    return title.strip()

def parse_lesson(filepath, module_num, lesson_idx):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read().replace('\r\n', '\n')

    # Parse title from first line starting with '# '
    title = "Lección sin título"
    for line in content.split('\n'):
        if line.startswith('#'):
            title = clean_title(line)
            break

    # Parse metadata (Time & Difficulty)
    difficulty_match = re.search(r'\*\*Dificultad\*\*:\s*(.*?)(?:\n|$)', content)
    time_match = re.search(r'\*\*Tiempo(?: estimado)?\*\*:\s*(.*?)(?:\n|$)', content)

    # Clean metadata to default if not found
    difficulty = difficulty_match.group(1).strip() if difficulty_match else "⭐ Principiante"
    time = time_match.group(1).strip() if time_match else "15 min"

    # Normalize time format: if just minutes, keep it
    time = time.replace(" minutos", " min")

    # Parse exercise block
    # Search for header: '## Ejercicio' or similar
    parts = re.split(r'(?i)##\s*(?:💡|📝)?\s*(?:Ejercicio|Práctica)\s*(?:Práctico|Propuesto)?', content)
    exercise = None
    if len(parts) > 1:
        # Get exercise body
        exercise_body = parts[1].strip()
        # Strip trailing difficulty/time metadata from the exercise prompt if it's there
        exercise_prompt = re.sub(r'---.*', '', exercise_body, flags=re.DOTALL).strip()
        if not exercise_prompt:
            exercise_prompt = exercise_body
        
        # Build prompt
        full_prompt = "## 💡 Ejercicio Práctico\n\n" + exercise_prompt
        exercise = {
            "title": "Ejercicio Práctico",
            "prompt": full_prompt,
            "type": "text"
        }

    return {
        "id": f"{module_num}-{lesson_idx}",
        "title": title,
        "time": time,
        "difficulty": difficulty,
        "content": content,
        "exercise": exercise
    }

def serialize_string_to_js(s):
    # Escape backslashes, backticks, and template interpolation ${
    escaped = s.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')
    return f"`{escaped}`"

def to_js_literal(val, indent=0):
    space = "  " * indent
    next_space = "  " * (indent + 1)
    if isinstance(val, str):
        return serialize_string_to_js(val)
    elif isinstance(val, bool):
        return "true" if val else "false"
    elif isinstance(val, (int, float)):
        return str(val)
    elif val is None:
        return "null"
    elif isinstance(val, list):
        if not val:
            return "[]"
        items = []
        for x in val:
            items.append(f"{next_space}{to_js_literal(x, indent + 1)}")
        return "[\n" + ",\n".join(items) + f"\n{space}]"
    elif isinstance(val, dict):
        if not val:
            return "{}"
        pairs = []
        for k, v in val.items():
            key_str = k if k.isidentifier() else f'"{k}"'
            pairs.append(f"{next_space}{key_str}: {to_js_literal(v, indent + 1)}")
        return "{\n" + ",\n".join(pairs) + "\n" + space + "}"
    else:
        return "null"

def main():
    print("Iniciando compilador de Markdown a data.js...")
    
    if not MD_PATH.exists():
        print(f"Error: No se encontró la carpeta CursoAgentesMD en {MD_PATH}")
        sys.exit(1)

    # 1. Compile Modules
    modules = []
    total_lessons = 0
    
    # Sort modules dynamically from modulo-0 to modulo-8
    for mod_idx in sorted(MODULES_METADATA.keys()):
        mod_dir = MD_PATH / f"modulo-{mod_idx}"
        if not mod_dir.exists():
            print(f"Advertencia: No se encontró la carpeta {mod_dir.name}, se omitirá.")
            continue
        
        meta = MODULES_METADATA[mod_idx]
        lessons = []
        
        # Read all markdown files in modulo dir sorted
        md_files = sorted(list(mod_dir.glob("*.md")))
        
        for lesson_idx, md_file in enumerate(md_files, start=1):
            # Skip templates or non-lesson markdown if any
            if md_file.name.startswith("_") or md_file.name == "README.md":
                continue
            
            lesson = parse_lesson(md_file, mod_idx, lesson_idx)
            lessons.append(lesson)
            total_lessons += 1
            
        modules.append({
            "id": f"modulo-{mod_idx}",
            "number": mod_idx,
            "icon": meta["icon"],
            "title": meta["title"],
            "subtitle": meta["subtitle"],
            "description": meta["description"],
            "difficulty": meta["difficulty"],
            "lessons": lessons
        })
        print(f"Módulo {mod_idx} procesado: {len(lessons)} lecciones encontradas.")

    # 2. Compile Resources
    resources = []
    recursos_dir = MD_PATH / "recursos"
    if recursos_dir.exists():
        for res_name, meta in RESOURCES_METADATA.items():
            filepath = recursos_dir / f"{res_name}.md"
            if filepath.exists():
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read().replace('\r\n', '\n')
                resources.append({
                    "id": res_name,
                    "title": meta["title"],
                    "description": meta["description"],
                    "icon": meta["icon"],
                    "tag": meta["tag"],
                    "content": content
                })
        print(f"Recursos procesados: {len(resources)} archivos.")

    # 3. Compile Templates
    templates = []
    templates_dir = MD_PATH / "templates"
    if templates_dir.exists():
        for key, meta in TEMPLATES_METADATA.items():
            filepath = templates_dir / f"{key}.md"
            if filepath.exists():
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read().replace('\r\n', '\n')
                templates.append({
                    "id": meta["id"],
                    "title": meta["title"],
                    "description": meta["description"],
                    "icon": meta["icon"],
                    "tag": meta["tag"],
                    "content": content
                })
        print(f"Plantillas (Templates) procesadas: {len(templates)} archivos.")

    # 4. Compile Examples
    examples = []
    ejemplos_dir = MD_PATH / "ejemplos"
    if ejemplos_dir.exists():
        for ex_name, meta in EXAMPLES_METADATA.items():
            filepath = ejemplos_dir / f"{ex_name}.md"
            if filepath.exists():
                with open(filepath, "r", encoding="utf-8") as f:
                    content = f.read().replace('\r\n', '\n')
                examples.append({
                    "id": ex_name,
                    "title": meta["title"],
                    "description": meta["description"],
                    "icon": meta["icon"],
                    "tag": meta["tag"],
                    "content": content
                })
        print(f"Ejemplos procesados: {len(examples)} archivos.")

    # Build COURSE_DATA Javascript
    js_content = f"""/**
 * COURSE DATA V3 — Domina Agentes IA y Skills con Markdown
 * Generado automáticamente desde archivos .md del curso original.
 * Total: {len(modules)} módulos · {total_lessons} lecciones · Recursos · Templates · Ejemplos · Logros
 */
const COURSE_DATA = {{
  title: "Domina Agentes IA y Skills con Markdown",
  version: "3.0",
  totalLessons: {total_lessons},

  modules: {to_js_literal(modules, 1)},

  resources: {to_js_literal(resources, 1)},

  templates: {to_js_literal(templates, 1)},

  examples: {to_js_literal(examples, 1)},

  achievements: {to_js_literal(ACHIEVEMENTS, 1)}
}};
"""

    # Target files to update
    targets = [
        ROOT_PATH / "CursoAgentesWebV3" / "js" / "data.js",
        ROOT_PATH / "CursoDockerWeb" / "js" / "data.js"
    ]
    
    # We will write to targets
    for target_file in targets:
        if target_file.parent.exists():
            with open(target_file, "w", encoding="utf-8") as f:
                f.write(js_content)
            print(f"Éxito: Archivo generado en {target_file}")
        else:
            print(f"Aviso: Carpeta no encontrada para {target_file}, se omitió.")

if __name__ == "__main__":
    main()
