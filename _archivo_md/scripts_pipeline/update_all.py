import os
import re
import sys
import subprocess
from pathlib import Path

base_path = Path(__file__).parent.resolve()

# Run the compilation of data.js first
try:
    print("Compilando data.js desde update_all.py...")
    subprocess.run([sys.executable, str(base_path / "compile_data_js.py")], check=True)
except Exception as e:
    print(f"Error compilando data.js: {e}")
    sys.exit(1)

manifest_paths = [
    base_path / "MANIFEST.md"
]
if (base_path / "curso-agentes-skills").exists():
    manifest_paths.append(base_path / "curso-agentes-skills" / "MANIFEST.md")

new_manifest_content = """# 📦 Manifiesto del Curso - Agentes y Skills

> Inventario completo de contenidos

---

## 📊 Resumen Ejecutivo

**Contenido Total**: 31 archivos principales
**Palabras**: ~65,000+
**Ejemplos de código**: 85+
**Ejercicios prácticos**: 29+
**Proyectos completos**: 5

---

## 📁 Estructura de Archivos

### 🏠 Raíz del Proyecto
```
✅ README.md                    - Índice principal del curso
✅ QUICK_START.md              - Guía de inicio rápido (30 min)
✅ INSTALLATION.md             - Setup e instalación
✅ MANIFEST.md                 - Este archivo
✅ requirements.txt            - Dependencias Python
```

### 🧭 Módulo 0: Inicio y Mapa de Ruta
```
✅ modulo-0/01-mapa-ruta.md
✅ modulo-0/02-plantilla-leccion.md
✅ modulo-0/03-estilo-visual.md
✅ modulo-0/04-compilacion.md
```

### 📚 Módulo 1: Fundamentos
```
✅ modulo-1/01-que-son-agentes-skills.md
✅ modulo-1/02-por-que-markdown.md
✅ modulo-1/03-anatomia-archivo.md
```

### 🎨 Módulo 2: Creando tu Primer Agente
```
✅ modulo-2/01-estructura-basica.md
✅ modulo-2/02-personalidad-comportamiento.md
✅ modulo-2/03-capacidades.md
✅ modulo-2/04-proyecto-asistente.md
```

### 🔧 Módulo 3: Skills Avanzados
```
✅ modulo-3/01-que-es-skill.md
✅ modulo-3/02-estructura-skill.md
✅ modulo-3/03-triggers-condiciones.md
✅ modulo-3/04-proyecto-skill-datos.md
```

### 🔗 Módulo 4: Integración y Workflows
```
✅ modulo-4/01-combinando-skills.md
✅ modulo-4/02-cadenas-agentes.md
✅ modulo-4/03-contexto-memoria.md
✅ modulo-4/04-proyecto-multi-agente.md
```

### 💼 Módulo 5: Casos de Uso Reales
```
✅ modulo-5/01-agente-desarrollo.md
✅ modulo-5/02-agente-documentos.md
✅ modulo-5/03-agente-atencion.md
✅ modulo-5/04-skill-automatizacion.md
```

### ⚙️ Módulo 6: Optimización
```
✅ modulo-6/01-testing-evaluacion.md
✅ modulo-6/02-debugging.md
✅ modulo-6/03-optimizacion-prompts.md
✅ modulo-6/04-seguridad-limites.md
```

### 🎯 Módulo 7: Proyecto Final
```
✅ modulo-7/01-diseno-sistema.md
✅ modulo-7/02-implementacion.md
✅ modulo-7/03-evaluacion-refinamiento.md
✅ modulo-7/proyecto-final.md
```

### 💻 Módulo 8: Integración IDEs
```
✅ modulo-8/01-opencode-y-antigravity.md
✅ modulo-8/02-archivos-de-configuracion.md
✅ modulo-8/03-desarrollo-de-skills.md
✅ modulo-8/04-ecosistema-specs-y-agents.md
```

### 📖 Recursos
```
✅ recursos/cheatsheet.md
✅ recursos/faq.md
✅ recursos/guia-implementacion.md
✅ recursos/biblioteca-skills.md
```

### 🎨 Templates
```
✅ templates/agents/AGENT_TEMPLATE.md
✅ templates/skills/SKILL_TEMPLATE.md
```

### 💡 Ejemplos Completos
```
✅ ejemplos/agente-python-dev.md
✅ ejemplos/skill-csv-analyzer.md
```

---

## 📈 Métricas de Contenido

### Por Módulo

| Módulo | Tema | Archivos | Páginas Est. | Dificultad | Tiempo Est. |
|--------|------|----------|--------------|------------|-------------|
| 0 | Inicio y Mapa de Ruta | 4 | 15 | ⭐ | 50 min |
| 1 | Fundamentos | 3 | 15 | ⭐ | 45 min |
| 2 | Creando tu Primer Agente | 4 | 20 | ⭐⭐ | 120 min |
| 3 | Skills Avanzados | 4 | 25 | ⭐⭐⭐ | 150 min |
| 4 | Integración y Workflows | 4 | 25 | ⭐⭐⭐ | 150 min |
| 5 | Casos de Uso Reales | 4 | 40 | ⭐⭐⭐⭐ | 240 min |
| 6 | Optimización | 4 | 35 | ⭐⭐⭐⭐ | 200 min |
| 7 | Proyecto Final | 4 | 45 | ⭐⭐⭐⭐ | 300 min |
| 8 | Integración IDEs | 4 | 20 | ⭐⭐⭐ | 120 min |
| **Total** | **31** | **240** | **Mixto** | **~22.5 hrs** |

---

## 🔍 Contenido por Tipo

**Versión**: 3.0
**Fecha**: Julio 2026
**Estado**: Completo y funcional
"""

for mp in manifest_paths:
    if mp.exists():
        with open(mp, "w", encoding="utf-8") as f:
            f.write(new_manifest_content)

make_portable_content = """import os
import shutil
from pathlib import Path

def create_portable_version():
    # base_path resolves to the project root (parent of scripts folder)
    base_path = Path(__file__).parent.parent.resolve()
    portable_path = base_path / "cursoAgentesPortable"
    
    folders = [
        "00_EMPIEZA_AQUI",
        "01_MODULOS_TEORICOS",
        "02_PROYECTOS_Y_EJEMPLOS",
        "03_RECURSOS_Y_TEMPLATES",
        "04_IMPLEMENTACION_TECNICA"
    ]
    
    if portable_path.exists():
        shutil.rmtree(portable_path)
    
    for folder in folders:
        (portable_path / folder).mkdir(parents=True)

    file_map = {
        base_path / "README.md": "00_EMPIEZA_AQUI/00_Indice_General.md",
        base_path / "engram/QUICK_START.md": "00_EMPIEZA_AQUI/01_Quick_Start.md",
        base_path / "engram/INSTALLATION.md": "00_EMPIEZA_AQUI/02_Guia_Instalacion.md",
        
        base_path / "CursoAgentesMD/ejemplos/agente-python-dev.md": "02_PROYECTOS_Y_EJEMPLOS/Agente_Python_Dev.md",
        base_path / "CursoAgentesMD/ejemplos/skill-csv-analyzer.md": "02_PROYECTOS_Y_EJEMPLOS/Skill_CSV_Analyzer.md",
        
        base_path / "CursoAgentesMD/templates/agents/AGENT_TEMPLATE.md": "03_RECURSOS_Y_TEMPLATES/AGENT_TEMPLATE.md",
        base_path / "CursoAgentesMD/templates/skills/SKILL_TEMPLATE.md": "03_RECURSOS_Y_TEMPLATES/SKILL_TEMPLATE.md",
        base_path / "CursoAgentesMD/recursos/cheatsheet.md": "03_RECURSOS_Y_TEMPLATES/CheatSheet_Rapida.md",
        base_path / "CursoAgentesMD/recursos/biblioteca-skills.md": "03_RECURSOS_Y_TEMPLATES/Biblioteca_de_Skills.md",
        base_path / "CursoAgentesMD/recursos/faq.md": "03_RECURSOS_Y_TEMPLATES/FAQ_Troubleshooting.md",
        
        base_path / "CursoAgentesMD/recursos/guia-implementacion.md": "04_IMPLEMENTACION_TECNICA/Guia_de_APIs.md",
    }

    print("Creando version portable en:", portable_path)
    
    copied_count = 0
    for src, dst in file_map.items():
        if src.exists():
            dest_file = portable_path / dst
            shutil.copy2(src, dest_file)
            copied_count += 1
        else:
            print(f"Advertencia: No se encontro el archivo a copiar: {src}")
            
    # Copy all modulos (including module 0 to module 8)
    for mod_idx in range(0, 9):
        mod_dir = base_path / "CursoAgentesMD" / f"modulo-{mod_idx}"
        if mod_dir.exists():
            for md_file in mod_dir.glob("*.md"):
                dst = portable_path / f"01_MODULOS_TEORICOS/M{mod_idx}_{md_file.name}"
                shutil.copy2(md_file, dst)
                copied_count += 1

    struct_file = base_path / "engram" / "structure.txt"
    if struct_file.exists():
        shutil.copy2(struct_file, portable_path / "00_EMPIEZA_AQUI/Mapa_del_Tesoro.txt")

    # Copy web files for local offline viewing
    web_source = base_path / "CursoAgentesWebV3"
    if web_source.exists():
        print("Copiando visualizador web interactivo...")
        shutil.copy2(web_source / "index.html", portable_path / "index.html")
        
        # Copy css folder
        portable_css = portable_path / "css"
        portable_css.mkdir(exist_ok=True)
        for css_file in (web_source / "css").glob("*.css"):
            shutil.copy2(css_file, portable_css / css_file.name)
            
        # Copy js folder
        portable_js = portable_path / "js"
        portable_js.mkdir(exist_ok=True)
        for js_file in (web_source / "js").glob("*.js"):
            shutil.copy2(js_file, portable_js / js_file.name)

    print(f"Exito! {copied_count} archivos organizados y visualizador V3 web copiado.")

if __name__ == "__main__":
    create_portable_version()
"""

with open(base_path / "make_portable.py", "w", encoding="utf-8") as f:
    f.write(make_portable_content)

print("Updated script, make_portable.py and MANIFEST.md")
