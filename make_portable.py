import os
import shutil
from pathlib import Path

def create_portable_version():
    base_path = Path("e:/IA/cursoagenteClaude")
    source_path = base_path / "curso-agentes-skills"
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
        source_path / "QUICK_START.md": "00_EMPIEZA_AQUI/01_Quick_Start.md",
        source_path / "INSTALLATION.md": "00_EMPIEZA_AQUI/02_Guia_Instalacion.md",
        
        base_path / "ejemplos/agente-python-dev.md": "02_PROYECTOS_Y_EJEMPLOS/Agente_Python_Dev.md",
        base_path / "ejemplos/skill-csv-analyzer.md": "02_PROYECTOS_Y_EJEMPLOS/Skill_CSV_Analyzer.md",
        
        base_path / "templates/agents/AGENT_TEMPLATE.md": "03_RECURSOS_Y_TEMPLATES/AGENT_TEMPLATE.md",
        base_path / "templates/skills/SKILL_TEMPLATE.md": "03_RECURSOS_Y_TEMPLATES/SKILL_TEMPLATE.md",
        base_path / "recursos/cheatsheet.md": "03_RECURSOS_Y_TEMPLATES/CheatSheet_Rapida.md",
        base_path / "recursos/biblioteca-skills.md": "03_RECURSOS_Y_TEMPLATES/Biblioteca_de_Skills.md",
        base_path / "recursos/faq.md": "03_RECURSOS_Y_TEMPLATES/FAQ_Troubleshooting.md",
        
        base_path / "recursos/guia-implementacion.md": "04_IMPLEMENTACION_TECNICA/Guia_de_APIs.md",
    }

    print("Creando version portable en:", portable_path)
    
    copied_count = 0
    for src, dst in file_map.items():
        if src.exists():
            dest_file = portable_path / dst
            shutil.copy2(src, dest_file)
            copied_count += 1
            
    # Copy all modulos
    for mod_idx in range(1, 8):
        mod_dir = base_path / f"modulo-{mod_idx}"
        if mod_dir.exists():
            for md_file in mod_dir.glob("*.md"):
                dst = portable_path / f"01_MODULOS_TEORICOS/M{mod_idx}_{md_file.name}"
                shutil.copy2(md_file, dst)
                copied_count += 1

    struct_file = base_path / "structure.txt"
    if struct_file.exists():
        shutil.copy2(struct_file, portable_path / "00_EMPIEZA_AQUI/Mapa_del_Tesoro.txt")

    print(f"Exito! {copied_count} archivos organizados.")

if __name__ == "__main__":
    create_portable_version()
