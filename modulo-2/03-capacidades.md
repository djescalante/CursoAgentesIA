# 2.3 - Configurando Capacidades

## 🎯 Objetivo

Aprender a definir de forma estructurada qué puede hacer nuestro agente, garantizando que el Modelo de Lenguaje entienda sus herramientas y límites.

---

## 🛠️ ¿Qué son las Capacidades?

Las capacidades (Capabilities) son las habilidades funcionales que le otorgamos al agente. Mientras que la "Personalidad" define *cómo actúa*, las capacidades definen **qué puede lograr**.

Si le decimos a un agente "eres un programador", el agente asumirá muchas cosas. Pero si definimos sus capacidades de forma explícita, controlamos su alcance real.

---

## 📝 Estructurando Capacidades

La sección `## Capabilities` o `## Habilidades` en tu archivo Markdown debe ser una lista clara y concisa de acciones. 

### ❌ Mal Ejemplo (Demasiado vago)

```markdown
## Capacidades
- Puede ayudar con bases de datos.
- Sabe programar.
- Resuelve dudas.
```
*Problema:* El modelo no sabe qué lenguajes soporta, qué nivel de acceso tiene a la base de datos o qué tipo de dudas debe resolver.

### ✅ Buen Ejemplo (Específico y accionable)

```markdown
## Capacidades
- Diseñar esquemas de bases de datos relacionales (PostgreSQL/MySQL).
- Redactar y optimizar consultas SQL complejas.
- Traducir requerimientos de negocio a diagramas de Entidad-Relación.
- Detectar ineficiencias (N+1 queries, falta de índices) en código existente.
```
*Ventaja:* El agente sabe exactamente su perímetro de acción. No intentará programar el frontend porque no está en sus capacidades.

---

## 🔗 Enlazando Capacidades con Skills

En arquitecturas avanzadas, las capacidades de un agente a menudo se implementan llamando a un **Skill** externo. 
En tu archivo Markdown, puedes hacer referencia a estos skills:

```markdown
## Capacidades y Herramientas (Tools)
- **Web_Search_Skill**: Utiliza este skill para buscar información actualizada en internet.
- **Python_Interpreter_Skill**: Utiliza este skill para ejecutar el código generado y validar que no tenga errores de sintaxis.
- **PDF_Reader_Skill**: Utiliza este skill para leer y extraer texto de documentos adjuntos.
```

De esta manera, el LLM sabe que cuando enfrente un problema específico, tiene una "herramienta" concreta a la que puede llamar.

---

## 🚨 Limitando Capacidades (Anti-Capacidades)

Tan importante como decir qué *puede* hacer, es definir explícitamente qué *NO debe* hacer. Esto suele ir en la sección `## Reglas` o `## Guidelines`, pero está intrínsecamente ligado a las capacidades.

```markdown
## Reglas y Límites
- NUNCA modifiques ni elimines datos (NO DELETE, NO DROP). Solo realizas operaciones de lectura (SELECT).
- Si el usuario te pide código de Frontend (HTML/CSS/JS), debes declinar amablemente y recordar que solo eres experto en Backend (SQL).
```

---

## 🚀 Próximos Pasos

Ya sabes definir la identidad, la personalidad y las capacidades de tu agente. Es hora de poner todo esto a prueba.

👉 **Siguiente**: [2.4 - Proyecto práctico: Agente asistente personal](04-proyecto-asistente.md)

---

## 💡 Ejercicio Práctico

1. Toma el esqueleto del agente que creaste en el módulo 1.3.
2. Añade la sección `## Capacidades`.
3. Escribe 5 capacidades altamente específicas usando verbos de acción fuertes (Generar, Traducir, Evaluar, Optimizar, Extraer).
4. Añade 2 reglas de límite (cosas que el agente NO debe hacer).

---

**Tiempo estimado**: 15 minutos  
**Dificultad**: ⭐⭐ Intermedio
