# Guía Práctica: Implementación de Agentes y Skills

> De la teoría a la práctica: Cómo implementar tus agentes y skills en sistemas reales

---

## 🎯 Objetivo

Esta guía te muestra cómo **usar** los archivos `.md` de agentes y skills en aplicaciones reales, frameworks populares, y APIs de IA.

---

## 📚 Tabla de Contenidos

1. [Conceptos de Implementación](#conceptos)
2. [Integración con APIs de IA](#apis)
3. [Frameworks y Herramientas](#frameworks)
4. [Patterns de Implementación](#patterns)
5. [Casos de Uso Completos](#casos-uso)
6. [Best Practices](#best-practices)

---

## 🧩 Conceptos de Implementación {#conceptos}

### ¿Cómo se "ejecuta" un archivo .md?

Los archivos `.md` **NO se ejecutan directamente**. Son **configuraciones** que:

1. **Definen el comportamiento** del agente/skill
2. **Se cargan como prompts** en el sistema de IA
3. **Guían las respuestas** del modelo de lenguaje

### Flujo de Trabajo

```
┌─────────────────┐
│  AGENT.md       │──┐
│  (Configuración)│  │
└─────────────────┘  │
                     │
┌─────────────────┐  │    ┌──────────────┐
│  SKILL.md       │──┼───>│   Sistema    │
│  (Capacidad)    │  │    │      +       │
└─────────────────┘  │    │  API de IA   │
                     │    └──────────────┘
┌─────────────────┐  │           │
│  User Input     │──┘           │
│  (Pregunta)     │              ▼
└─────────────────┘     ┌─────────────────┐
                        │   Respuesta     │
                        │   Inteligente   │
                        └─────────────────┘
```

---

## 🔌 Integración con APIs de IA {#apis}

### 1. OpenAI API (GPT-4, GPT-3.5)

```python
import openai
import os

# Cargar el archivo del agente
def load_agent(agent_path):
    with open(agent_path, 'r', encoding='utf-8') as f:
        return f.read()

# Cargar skills
def load_skills(skill_paths):
    skills = []
    for path in skill_paths:
        with open(path, 'r', encoding='utf-8') as f:
            skills.append(f.read())
    return "\n\n---\n\n".join(skills)

# Configurar el agente
agent_config = load_agent('agents/python-dev.md')
skills_config = load_skills([
    'skills/code-analyzer.md',
    'skills/debugger.md'
])

# Combinar en system prompt
system_prompt = f"""
{agent_config}

# Available Skills:
{skills_config}
"""

# Usar con OpenAI
client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": "Review this Python code for bugs"}
    ],
    temperature=0.7
)

print(response.choices[0].message.content)
```

---

### 2. Anthropic Claude API

```python
import anthropic
import os

# Cargar configuraciones
agent_config = load_agent('agents/data-analyst.md')
skills_config = load_skills(['skills/csv-analyzer.md'])

# Usar con Claude
client = anthropic.Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

message = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=4096,
    system=f"{agent_config}\n\n{skills_config}",
    messages=[
        {
            "role": "user",
            "content": "Analyze this sales data CSV"
        }
    ]
)

print(message.content)
```

---

### 3. Implementación Genérica (Compatible con cualquier API)

```python
class AgentSystem:
    def __init__(self, agent_path, skill_paths, api_client):
        self.agent_config = self._load_file(agent_path)
        self.skills = [self._load_file(path) for path in skill_paths]
        self.api_client = api_client
        self.conversation_history = []
    
    def _load_file(self, path):
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def _build_system_prompt(self):
        """Construye el prompt del sistema combinando agente y skills"""
        skills_section = "\n\n".join([
            f"## SKILL {i+1}:\n{skill}" 
            for i, skill in enumerate(self.skills)
        ])
        
        return f"""
{self.agent_config}

---

# AVAILABLE SKILLS:
{skills_section}

---

# INSTRUCTIONS:
- Use the skills when their trigger conditions match
- Follow the agent's personality and guidelines
- Provide clear, helpful responses
"""
    
    def chat(self, user_message):
        """Envía un mensaje al agente"""
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })
        
        # Llamar a la API (ejemplo genérico)
        response = self.api_client.complete(
            system=self._build_system_prompt(),
            messages=self.conversation_history
        )
        
        self.conversation_history.append({
            "role": "assistant",
            "content": response
        })
        
        return response
    
    def reset(self):
        """Reinicia la conversación"""
        self.conversation_history = []

# Uso
agent = AgentSystem(
    agent_path='agents/customer-support.md',
    skill_paths=[
        'skills/faq-search.md',
        'skills/ticket-creator.md'
    ],
    api_client=your_api_client
)

response = agent.chat("I need help with my order")
print(response)
```

---

## 🛠️ Frameworks y Herramientas {#frameworks}

### 1. LangChain

```python
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate
from langchain.schema import HumanMessage

# Cargar agente y skills
agent_md = load_agent('agents/researcher.md')
skills_md = load_skills(['skills/web-search.md', 'skills/summarizer.md'])

# Crear template
system_template = SystemMessagePromptTemplate.from_template(
    f"{agent_md}\n\n# Skills:\n{skills_md}\n\n{{instructions}}"
)

# Configurar chat
chat = ChatOpenAI(model_name="gpt-4", temperature=0.7)

# Usar
messages = [
    system_template.format(instructions="Be concise and accurate"),
    HumanMessage(content="Research the latest AI developments")
]

response = chat(messages)
print(response.content)
```

---

### 2. Haystack

```python
from haystack.nodes import PromptNode, PromptTemplate

# Cargar configuración
agent_config = load_agent('agents/qa-assistant.md')

# Crear prompt template
prompt_template = PromptTemplate(
    prompt=f"""
{agent_config}

Question: {{question}}
Context: {{context}}

Answer:
""",
    output_parser={"type": "AnswerParser"}
)

# Configurar nodo
prompt_node = PromptNode(
    model_name_or_path="gpt-4",
    api_key=os.getenv('OPENAI_API_KEY'),
    default_prompt_template=prompt_template
)

# Usar
result = prompt_node.run(
    question="What is machine learning?",
    context="[Retrieved documents here]"
)
```

---

### 3. AutoGen (Microsoft)

```python
import autogen

# Cargar configuración
agent_config = load_agent('agents/coder.md')

# Configurar agente
config_list = [{
    "model": "gpt-4",
    "api_key": os.getenv('OPENAI_API_KEY')
}]

# Crear agente con configuración
assistant = autogen.AssistantAgent(
    name="PythonDev",
    system_message=agent_config,
    llm_config={"config_list": config_list}
)

# Crear usuario
user_proxy = autogen.UserProxyAgent(
    name="User",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "coding"}
)

# Iniciar conversación
user_proxy.initiate_chat(
    assistant,
    message="Write a function to calculate fibonacci numbers"
)
```

---

## 🎨 Patterns de Implementación {#patterns}

### Pattern 1: Skill Router (Selector de Skills)

```python
class SkillRouter:
    """Selecciona automáticamente el skill apropiado según la entrada"""
    
    def __init__(self, skills_dir):
        self.skills = self._load_all_skills(skills_dir)
        self.skill_triggers = self._extract_triggers()
    
    def _load_all_skills(self, directory):
        skills = {}
        for filename in os.listdir(directory):
            if filename.endswith('.md'):
                name = filename[:-3]
                with open(f"{directory}/{filename}") as f:
                    skills[name] = f.read()
        return skills
    
    def _extract_triggers(self):
        """Extrae keywords de trigger de cada skill"""
        triggers = {}
        for name, content in self.skills.items():
            # Parsear sección de triggers (simplificado)
            keywords = self._parse_triggers_section(content)
            triggers[name] = keywords
        return triggers
    
    def select_skill(self, user_input):
        """Selecciona el skill más relevante"""
        user_lower = user_input.lower()
        
        # Puntuar cada skill
        scores = {}
        for skill_name, keywords in self.skill_triggers.items():
            score = sum(1 for kw in keywords if kw in user_lower)
            scores[skill_name] = score
        
        # Retornar el mejor match
        best_skill = max(scores, key=scores.get)
        return self.skills[best_skill] if scores[best_skill] > 0 else None

# Uso
router = SkillRouter('skills/')
user_message = "analyze this CSV file"
selected_skill = router.select_skill(user_message)

if selected_skill:
    # Usar el skill seleccionado
    response = api_call_with_skill(selected_skill, user_message)
```

---

### Pattern 2: Multi-Agent System

```python
class MultiAgentSystem:
    """Sistema con múltiples agentes especializados"""
    
    def __init__(self):
        self.agents = {
            'coder': Agent('agents/python-dev.md', ['skills/code-review.md']),
            'analyst': Agent('agents/data-analyst.md', ['skills/csv-analyzer.md']),
            'writer': Agent('agents/content-writer.md', ['skills/seo.md'])
        }
        self.coordinator = Agent('agents/coordinator.md', [])
    
    def process(self, task):
        # El coordinador decide qué agente usar
        decision = self.coordinator.chat(
            f"Which agent should handle this task: {task}"
        )
        
        agent_name = self._parse_agent_name(decision)
        
        if agent_name in self.agents:
            return self.agents[agent_name].chat(task)
        else:
            return "No suitable agent found"

# Uso
system = MultiAgentSystem()
result = system.process("Review this Python code for security issues")
```

---

### Pattern 3: Skill Chaining (Encadenamiento)

```python
class SkillChain:
    """Ejecuta múltiples skills en secuencia"""
    
    def __init__(self, agent_path, api_client):
        self.agent = load_agent(agent_path)
        self.api_client = api_client
    
    def execute_chain(self, skills_sequence, initial_input):
        """
        Ejecuta skills en orden, pasando output de uno como input del siguiente
        
        skills_sequence: ['skill1.md', 'skill2.md', 'skill3.md']
        """
        current_input = initial_input
        results = []
        
        for skill_path in skills_sequence:
            skill_config = load_agent(skill_path)
            
            # Ejecutar skill con input actual
            response = self.api_client.complete(
                system=f"{self.agent}\n\n{skill_config}",
                messages=[{"role": "user", "content": current_input}]
            )
            
            results.append({
                'skill': skill_path,
                'output': response
            })
            
            # Output se convierte en input del siguiente
            current_input = response
        
        return results

# Uso: Pipeline de procesamiento
chain = SkillChain('agents/data-processor.md', api_client)

pipeline = [
    'skills/csv-reader.md',      # 1. Lee CSV
    'skills/data-cleaner.md',    # 2. Limpia datos
    'skills/analyzer.md',        # 3. Analiza
    'skills/report-generator.md' # 4. Genera reporte
]

results = chain.execute_chain(pipeline, "process sales_data.csv")
final_report = results[-1]['output']
```

---

### Pattern 4: Context Manager (Gestión de Contexto)

```python
class ContextualAgent:
    """Agente que mantiene contexto a través de conversaciones"""
    
    def __init__(self, agent_path, skills_paths, max_context=10):
        self.agent = load_agent(agent_path)
        self.skills = load_skills(skills_paths)
        self.conversation = []
        self.context_summary = ""
        self.max_context = max_context
    
    def chat(self, message):
        # Agregar mensaje a conversación
        self.conversation.append({"role": "user", "content": message})
        
        # Si conversación es muy larga, resumir contexto antiguo
        if len(self.conversation) > self.max_context:
            self._summarize_old_context()
        
        # Construir prompt con contexto
        system_prompt = f"""
{self.agent}

# Available Skills:
{self.skills}

# Context Summary:
{self.context_summary}
"""
        
        # Obtener respuesta
        response = api_client.complete(
            system=system_prompt,
            messages=self.conversation[-self.max_context:]
        )
        
        self.conversation.append({"role": "assistant", "content": response})
        return response
    
    def _summarize_old_context(self):
        """Resume mensajes antiguos para mantener contexto compacto"""
        old_messages = self.conversation[:-self.max_context]
        
        # Pedir al agente que resuma
        summary_request = "Summarize this conversation history: " + \
                         str(old_messages)
        
        self.context_summary = api_client.complete(
            system="You are a conversation summarizer",
            messages=[{"role": "user", "content": summary_request}]
        )

# Uso
agent = ContextualAgent(
    'agents/therapist.md',
    ['skills/active-listening.md'],
    max_context=10
)

# Conversación larga manteniendo contexto
agent.chat("I'm feeling stressed about work")
agent.chat("My boss keeps adding more tasks")
# ... muchas más interacciones ...
agent.chat("How can I deal with this?")
# El agente recordará el contexto previo
```

---

## 💼 Casos de Uso Completos {#casos-uso}

### Caso 1: Sistema de Soporte al Cliente

```python
# customer_support_system.py

import os
from openai import OpenAI

class CustomerSupportBot:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        
        # Cargar agente principal
        with open('agents/support-agent.md') as f:
            self.agent_config = f.read()
        
        # Cargar skills
        self.skills = {}
        for skill_name in ['faq-search', 'order-lookup', 'ticket-creator']:
            with open(f'skills/{skill_name}.md') as f:
                self.skills[skill_name] = f.read()
        
        self.active_conversations = {}
    
    def handle_message(self, user_id, message):
        # Obtener o crear conversación
        if user_id not in self.active_conversations:
            self.active_conversations[user_id] = []
        
        conversation = self.active_conversations[user_id]
        conversation.append({"role": "user", "content": message})
        
        # Construir system prompt
        system_prompt = self._build_system_prompt()
        
        # Obtener respuesta
        response = self.client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_prompt},
                *conversation
            ],
            temperature=0.7
        )
        
        assistant_message = response.choices[0].message.content
        conversation.append({"role": "assistant", "content": assistant_message})
        
        return assistant_message
    
    def _build_system_prompt(self):
        skills_text = "\n\n".join([
            f"# SKILL: {name}\n{content}" 
            for name, content in self.skills.items()
        ])
        
        return f"""
{self.agent_config}

# Available Skills:
{skills_text}

# Guidelines:
- Be empathetic and helpful
- Use skills when appropriate
- Always try to resolve the issue
- Escalate to human if needed
"""

# Uso
bot = CustomerSupportBot()

# Simular conversación
print(bot.handle_message("user123", "Where is my order #12345?"))
print(bot.handle_message("user123", "It was supposed to arrive yesterday"))
```

---

### Caso 2: Asistente de Desarrollo con IDE Integration

```python
# ide_assistant.py

import json
from pathlib import Path

class IDEAssistant:
    """Asistente de código que se integra con IDEs"""
    
    def __init__(self, project_root):
        self.project_root = Path(project_root)
        self.agent = self._load_agent()
        self.skills = self._load_skills()
        self.project_context = self._scan_project()
    
    def _load_agent(self):
        with open('agents/code-assistant.md') as f:
            return f.read()
    
    def _load_skills(self):
        skills = {}
        skills_dir = Path('skills/coding/')
        for skill_file in skills_dir.glob('*.md'):
            with open(skill_file) as f:
                skills[skill_file.stem] = f.read()
        return skills
    
    def _scan_project(self):
        """Analiza estructura del proyecto para contexto"""
        context = {
            'language': self._detect_language(),
            'structure': self._get_structure(),
            'dependencies': self._get_dependencies()
        }
        return context
    
    def review_code(self, file_path, code):
        """Revisa código específico"""
        skill = self.skills['code-reviewer']
        
        prompt = f"""
File: {file_path}
Project Context: {json.dumps(self.project_context, indent=2)}

Code to review:
```
{code}
```

Provide a comprehensive code review.
"""
        
        return self._call_api(skill, prompt)
    
    def suggest_refactor(self, code_snippet):
        """Sugiere refactorizaciones"""
        skill = self.skills['refactorer']
        return self._call_api(skill, f"Suggest refactorings for:\n{code_snippet}")
    
    def generate_tests(self, function_code):
        """Genera tests unitarios"""
        skill = self.skills['test-generator']
        return self._call_api(skill, f"Generate unit tests for:\n{function_code}")
    
    def _call_api(self, skill_config, user_message):
        # Implementación de llamada a API
        pass

# Uso en plugin de VS Code
assistant = IDEAssistant('/path/to/project')

# Cuando usuario selecciona código y pide review
selected_code = get_selected_text()
review = assistant.review_code('src/main.py', selected_code)
display_in_sidebar(review)
```

---

### Caso 3: Sistema de Análisis de Datos Automatizado

```python
# data_analysis_system.py

class DataAnalysisPipeline:
    """Pipeline automatizado de análisis de datos"""
    
    def __init__(self):
        self.analyst = self._setup_analyst()
        self.report_generator = self._setup_reporter()
    
    def _setup_analyst(self):
        agent_config = load_agent('agents/data-analyst.md')
        skills = load_skills([
            'skills/csv-analyzer.md',
            'skills/statistical-tests.md',
            'skills/outlier-detector.md',
            'skills/correlation-finder.md'
        ])
        return Agent(agent_config, skills)
    
    def _setup_reporter(self):
        agent_config = load_agent('agents/report-writer.md')
        skills = load_skills(['skills/markdown-generator.md'])
        return Agent(agent_config, skills)
    
    def analyze_dataset(self, csv_path, questions=[]):
        """
        Analiza dataset y responde preguntas específicas
        """
        results = {}
        
        # 1. Análisis exploratorio automático
        results['eda'] = self.analyst.execute_skill(
            'csv-analyzer',
            f"Analyze {csv_path}"
        )
        
        # 2. Responder preguntas específicas
        if questions:
            results['qa'] = []
            for question in questions:
                answer = self.analyst.chat(
                    f"Based on {csv_path}: {question}"
                )
                results['qa'].append({'question': question, 'answer': answer})
        
        # 3. Generar reporte
        report_data = {
            'dataset': csv_path,
            'eda': results['eda'],
            'qa': results.get('qa', [])
        }
        
        results['report'] = self.report_generator.chat(
            f"Generate analysis report: {json.dumps(report_data)}"
        )
        
        return results
    
    def save_report(self, results, output_path):
        """Guarda reporte en Markdown"""
        with open(output_path, 'w') as f:
            f.write(results['report'])

# Uso
pipeline = DataAnalysisPipeline()

# Analizar datos de ventas
results = pipeline.analyze_dataset(
    'data/sales_2025.csv',
    questions=[
        "What are the top selling products?",
        "Are there any seasonal trends?",
        "Which region has the highest growth?"
    ]
)

# Guardar reporte
pipeline.save_report(results, 'reports/sales_analysis.md')
print("Analysis complete! Report saved.")
```

---

## ✅ Best Practices {#best-practices}

### 1. Organización de Archivos

```
project/
├── agents/
│   ├── customer-support.md
│   ├── code-assistant.md
│   ├── data-analyst.md
│   └── coordinator.md
├── skills/
│   ├── common/
│   │   ├── text-summarizer.md
│   │   └── translator.md
│   ├── coding/
│   │   ├── code-reviewer.md
│   │   ├── test-generator.md
│   │   └── debugger.md
│   └── data/
│       ├── csv-analyzer.md
│       └── visualizer.md
├── config/
│   └── agent_config.yaml
└── main.py
```

---

### 2. Versionado de Agentes/Skills

```markdown
# En cada archivo .md

---
version: 2.1.0
changelog:
  - 2.1.0: Added async support
  - 2.0.0: Complete rewrite
  - 1.5.0: Bug fixes
---
```

```python
# En código
class VersionedAgent:
    def __init__(self, agent_path):
        self.config = self._load_with_version(agent_path)
        self.version = self.config['version']
    
    def _load_with_version(self, path):
        with open(path) as f:
            content = f.read()
            # Parsear metadata
            metadata = self._extract_metadata(content)
            return {
                'version': metadata.get('version', '1.0.0'),
                'content': content
            }
```

---

### 3. Testing de Agentes

```python
# test_agents.py

import pytest
from agent_system import Agent

class TestCodeAssistant:
    @pytest.fixture
    def agent(self):
        return Agent('agents/code-assistant.md', ['skills/reviewer.md'])
    
    def test_code_review(self, agent):
        code = "def add(a,b): return a+b"
        response = agent.chat(f"Review this code: {code}")
        
        assert "PEP 8" in response or "spacing" in response.lower()
    
    def test_bug_detection(self, agent):
        buggy_code = "def divide(a, b): return a / b"
        response = agent.chat(f"Find bugs: {buggy_code}")
        
        assert "zero" in response.lower() or "division" in response.lower()
```

---

### 4. Monitoreo y Logging

```python
import logging
from datetime import datetime

class MonitoredAgent:
    def __init__(self, agent_path, skills_paths):
        self.agent = Agent(agent_path, skills_paths)
        self.logger = self._setup_logging()
        self.metrics = {
            'total_requests': 0,
            'successful': 0,
            'failed': 0,
            'avg_response_time': 0
        }
    
    def _setup_logging(self):
        logger = logging.getLogger('AgentSystem')
        logger.setLevel(logging.INFO)
        
        handler = logging.FileHandler('agent_logs.log')
        formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
        return logger
    
    def chat(self, message):
        start_time = datetime.now()
        self.metrics['total_requests'] += 1
        
        try:
            self.logger.info(f"Request: {message[:100]}")
            response = self.agent.chat(message)
            
            self.metrics['successful'] += 1
            self.logger.info(f"Response: {response[:100]}")
            
            return response
            
        except Exception as e:
            self.metrics['failed'] += 1
            self.logger.error(f"Error: {str(e)}")
            raise
        
        finally:
            duration = (datetime.now() - start_time).total_seconds()
            self._update_avg_response_time(duration)
    
    def get_metrics(self):
        return self.metrics
```

---

### 5. Configuración Dinámica

```yaml
# config/agent_config.yaml

agents:
  customer_support:
    path: agents/support-agent.md
    skills:
      - skills/faq-search.md
      - skills/ticket-creator.md
    model: gpt-4
    temperature: 0.7
    max_tokens: 2000
    
  code_assistant:
    path: agents/code-assistant.md
    skills:
      - skills/coding/reviewer.md
      - skills/coding/debugger.md
    model: gpt-4
    temperature: 0.3
    max_tokens: 4000
```

```python
# Cargar desde config
import yaml

def load_agent_from_config(agent_name):
    with open('config/agent_config.yaml') as f:
        config = yaml.safe_load(f)
    
    agent_config = config['agents'][agent_name]
    
    return Agent(
        agent_path=agent_config['path'],
        skill_paths=agent_config['skills'],
        model=agent_config['model'],
        temperature=agent_config['temperature'],
        max_tokens=agent_config['max_tokens']
    )

# Uso
support_agent = load_agent_from_config('customer_support')
```

---

## 🎓 Resumen

### Puntos Clave

1. **Los archivos .md son configuraciones**, no código ejecutable
2. **Se cargan como prompts** en sistemas de IA
3. **Pueden combinarse** (agente + múltiples skills)
4. **Son compatibles** con cualquier API de IA
5. **Facilitan versionado y mantenimiento**

### Próximos Pasos

1. ✅ Elige un caso de uso real
2. ✅ Crea tu agente y skills en .md
3. ✅ Implementa con tu API favorita
4. ✅ Prueba y refina
5. ✅ Escala a producción

---

**Recursos Adicionales**:
- [Ejemplos completos](../ejemplos/)
- [Templates](../templates/)
- [Proyectos del curso](../modulo-7/)

