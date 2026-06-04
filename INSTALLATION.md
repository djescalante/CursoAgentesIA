# 📦 Instalación y Setup del Curso

> Cómo configurar tu entorno para trabajar con agentes y skills

---

## 🎯 Opciones de Setup

Elige según tu nivel:

1. **Principiante**: Solo necesitas un editor de texto
2. **Intermedio**: Python + API de IA
3. **Avanzado**: Setup completo con herramientas

---

## 🚀 Setup Mínimo (Principiante)

### Lo que necesitas:
- Editor de texto (cualquiera sirve)
- Navegador web

### Paso 1: Editor de Texto

**Opciones recomendadas**:
- [VS Code](https://code.visualstudio.com/) (recomendado)
- Sublime Text
- Notepad++ (Windows)
- TextEdit (Mac)

### Paso 2: Probar con ChatGPT

1. Ve a [chat.openai.com](https://chat.openai.com)
2. Crea cuenta gratuita
3. Copia un agente del curso
4. Pégalo en Custom Instructions
5. ¡Listo!

**Costo**: $0 (tier gratuito)

---

## 💻 Setup Intermedio (Python)

### Prerequisitos

- Python 3.9 o superior
- pip (viene con Python)
- Terminal/CMD

### Paso 1: Verificar Python

```bash
python --version
# o
python3 --version

# Debería mostrar 3.9+
```

Si no tienes Python:
- **Windows**: [python.org/downloads](https://python.org/downloads)
- **Mac**: `brew install python3`
- **Linux**: `sudo apt install python3 python3-pip`

### Paso 2: Clonar el Curso

```bash
# Opción A: Descargar ZIP
# Descarga desde donde obtuviste el curso

# Opción B: Si está en Git
git clone [url-del-repo]
cd curso-agentes-skills
```

### Paso 3: Crear Virtual Environment

```bash
# Crear entorno virtual
python -m venv venv

# Activar
# Windows:
venv\Scripts\activate

# Mac/Linux:
source venv/bin/activate
```

### Paso 4: Instalar Dependencias

```bash
pip install -r requirements.txt
```

**requirements.txt**:
```
openai>=1.0.0
anthropic>=0.18.0
python-dotenv>=1.0.0
pyyaml>=6.0
```

### Paso 5: Configurar API Keys

Crea archivo `.env`:

```bash
# .env
OPENAI_API_KEY=tu-api-key-aqui
# o
ANTHROPIC_API_KEY=tu-api-key-aqui
```

**Obtener API Keys**:
- OpenAI: [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Anthropic: [console.anthropic.com](https://console.anthropic.com)

### Paso 6: Probar Setup

```bash
python ejemplos/test_setup.py
```

---

## 🔧 Setup Avanzado (Full Stack)

### Herramientas Adicionales

#### 1. Git
```bash
# Windows
# Descargar de git-scm.com

# Mac
brew install git

# Linux
sudo apt install git
```

#### 2. VS Code Extensions

Extensiones recomendadas:
- Python
- Markdown All in One
- YAML
- GitLens

Instalar:
1. Abrir VS Code
2. Ctrl+Shift+X (Cmd+Shift+X en Mac)
3. Buscar e instalar cada extensión

#### 3. LangChain (opcional)

```bash
pip install langchain langchain-openai
```

#### 4. Jupyter (para notebooks)

```bash
pip install jupyter notebook
jupyter notebook
```

---

## 📁 Estructura del Proyecto

Después de la instalación:

```
curso-agentes-skills/
├── .venv/                  # Virtual environment
├── agents/                 # Tus agentes
├── skills/                 # Tus skills
├── ejemplos/              # Ejemplos del curso
├── templates/             # Templates reutilizables
├── data/                  # Datos de prueba
├── output/                # Outputs generados
├── .env                   # API keys (no subir a Git)
├── .gitignore
├── requirements.txt
└── README.md
```

---

## 🧪 Verificar Instalación

### Test 1: Python y Dependencias

```python
# test_imports.py
import openai
import anthropic
import yaml
from dotenv import load_dotenv

print("✅ Todas las dependencias instaladas correctamente")
```

```bash
python test_imports.py
```

### Test 2: API Connection

```python
# test_api.py
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hola, esto es una prueba"}],
    max_tokens=50
)

print("✅ Conexión a API exitosa")
print(response.choices[0].message.content)
```

```bash
python test_api.py
```

### Test 3: Agente Básico

```python
# test_agent.py
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

# Cargar agente
with open('templates/agents/AGENT_TEMPLATE.md') as f:
    agent = f.read()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": agent},
        {"role": "user", "content": "Hola"}
    ]
)

print("✅ Agente funcionando")
print(response.choices[0].message.content)
```

```bash
python test_agent.py
```

---

## 🐛 Troubleshooting

### Problema: "Python not found"

**Solución**:
```bash
# Intenta con python3
python3 --version

# O agrega Python al PATH
# Windows: Variables de entorno → PATH → Agregar carpeta Python
```

### Problema: "pip not found"

**Solución**:
```bash
# Windows
python -m pip install --upgrade pip

# Mac/Linux
python3 -m pip install --upgrade pip
```

### Problema: "ModuleNotFoundError"

**Solución**:
```bash
# Asegúrate de estar en el virtual environment
# Debería verse (venv) en tu terminal

# Si no está activo, activar:
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstalar dependencias
pip install -r requirements.txt
```

### Problema: "API Key Error"

**Solución**:
```bash
# Verificar que .env existe
ls -la .env

# Verificar contenido (sin mostrar la key completa)
cat .env | head -c 50

# Asegúrate de no tener espacios
# ❌ OPENAI_API_KEY = sk-...
# ✅ OPENAI_API_KEY=sk-...
```

### Problema: "Rate limit exceeded"

**Solución**:
- Espera unos minutos
- Revisa tu plan/límites en la plataforma
- Usa modelo más barato (gpt-3.5-turbo)

---

## 💰 Costos Estimados

### OpenAI (precios aproximados 2026)

**Desarrollo/Aprendizaje**:
- GPT-3.5-turbo: ~$2-5/mes
- GPT-4: ~$10-20/mes

**Producción ligera**:
- ~$50-100/mes

### Anthropic Claude

**Desarrollo/Aprendizaje**:
- Claude 3 Haiku: ~$2-5/mes
- Claude 3 Sonnet: ~$10-20/mes

### Tips para Reducir Costos

1. **Usa tier gratuito primero**
2. **Empieza con modelos pequeños** (GPT-3.5, Haiku)
3. **Optimiza prompts** (menos tokens = menos costo)
4. **Cachea respuestas comunes**
5. **Establece límites de gasto** en la plataforma

---

## 🎓 Próximos Pasos

Después de la instalación:

1. ✅ Lee [Quick Start](QUICK_START.md)
2. ✅ Prueba un [ejemplo](ejemplos/)
3. ✅ Crea tu primer agente
4. ✅ Empieza el [Módulo 1](modulo-1/01-que-son-agentes-skills.md)

---

## 📞 Ayuda Adicional

**Documentación**:
- [FAQ](recursos/faq.md)
- [Cheatsheet](recursos/cheatsheet.md)
- [Guía de Implementación](recursos/guia-implementacion.md)

**Comunidad**:
- Issues en GitHub
- Foros de OpenAI/Anthropic
- Stack Overflow

---

**Última actualización**: 2026-05-16
