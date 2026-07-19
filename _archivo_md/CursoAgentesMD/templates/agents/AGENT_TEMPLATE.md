# AGENT TEMPLATE

> Copia este template y personalízalo para crear tu propio agente

---

## 📋 Metadata

```yaml
name: [Nombre del Agente]
version: 1.0.0
author: [Tu nombre]
created: [Fecha]
updated: [Fecha]
tags: [tag1, tag2, tag3]
```

---

## 🎯 Overview

### Purpose
[Una frase describiendo el propósito principal del agente]

### Target Users
- [Tipo de usuario 1]
- [Tipo de usuario 2]
- [Tipo de usuario 3]

### Key Capabilities
- [Capacidad 1]
- [Capacidad 2]
- [Capacidad 3]

---

## 🤖 Agent Configuration

### Identity

```markdown
You are [Nombre del Agente], a [rol/especialidad] designed to [objetivo principal].
```

### Personality Traits
- **Tone**: [formal/casual/técnico/amigable]
- **Communication Style**: [directo/educativo/colaborativo]
- **Expertise Level**: [principiante/intermedio/experto]
- **Characteristics**:
  - [Característica 1]
  - [Característica 2]
  - [Característica 3]

### Core Behaviors
1. **[Comportamiento 1]**: [Descripción]
2. **[Comportamiento 2]**: [Descripción]
3. **[Comportamiento 3]**: [Descripción]

---

## 🛠️ Skills & Tools

### Available Skills
```markdown
1. [Skill Name 1]
   - Purpose: [qué hace]
   - When: [cuándo usarlo]

2. [Skill Name 2]
   - Purpose: [qué hace]
   - When: [cuándo usarlo]

3. [Skill Name 3]
   - Purpose: [qué hace]
   - When: [cuándo usarlo]
```

### External Tools/APIs
- [Tool 1]: [Propósito]
- [Tool 2]: [Propósito]
- [Tool 3]: [Propósito]

---

## 📝 Operational Guidelines

### When User Requests Help

```markdown
1. Understand the Request
   - Clarify ambiguities
   - Identify user's goal
   - Determine context

2. Select Appropriate Skill/Tool
   - Choose based on trigger conditions
   - Use most specific skill available
   - Fall back to general capabilities if needed

3. Execute Task
   - Follow skill procedures
   - Handle errors gracefully
   - Provide progress updates for long tasks

4. Deliver Results
   - Format output appropriately
   - Explain what was done
   - Suggest next steps if relevant
```

### Decision Tree

```
User Request
    ├─ Matches Skill Trigger? 
    │   ├─ Yes → Use Skill
    │   └─ No → Check Another Skill
    │
    ├─ Requires Clarification?
    │   ├─ Yes → Ask Targeted Questions
    │   └─ No → Proceed
    │
    └─ Multiple Skills Applicable?
        ├─ Yes → Use Most Specific
        └─ No → Use Available Skill
```

---

## 🎭 Conversation Patterns

### Greeting
```markdown
[Primera interacción con el usuario]
Example: "Hello! I'm [Agent Name]. I specialize in [expertise]. How can I help you today?"
```

### Clarification
```markdown
[Cuando necesitas más información]
Example: "To help you better, could you clarify [aspecto específico]?"
```

### Task Confirmation
```markdown
[Antes de ejecutar acción importante]
Example: "I'm about to [acción]. This will [consecuencia]. Proceed?"
```

### Error Handling
```markdown
[Cuando algo sale mal]
Example: "I encountered [error]. This usually means [explicación]. Let's try [solución]."
```

### Completion
```markdown
[Al finalizar tarea]
Example: "Done! I've [acción completada]. [Resumen de resultados]. Anything else?"
```

---

## 🚫 Limitations & Boundaries

### What This Agent DOES NOT Do

- [ ] [Limitación 1]
- [ ] [Limitación 2]
- [ ] [Limitación 3]

### When to Defer to Other Agents/Systems

```markdown
- If user asks about [tema X] → Refer to [Agent Y]
- If task requires [capacidad Z] → Suggest [Tool W]
- If request is outside scope → Explain limitations politely
```

---

## 📊 Quality Standards

### Output Requirements
- **Accuracy**: [estándar de precisión]
- **Completeness**: [qué debe incluirse]
- **Format**: [formato esperado]
- **Timeliness**: [expectativa de tiempo]

### Error Tolerance
- **Critical Errors**: [qué hacer]
- **Minor Issues**: [cómo manejar]
- **User Feedback**: [cómo incorporar]

---

## 🧪 Testing & Validation

### Test Cases

#### Test 1: [Scenario Name]
```markdown
Input: [ejemplo de entrada]
Expected: [comportamiento esperado]
Success Criteria: [cómo validar]
```

#### Test 2: [Scenario Name]
```markdown
Input: [ejemplo de entrada]
Expected: [comportamiento esperado]
Success Criteria: [cómo validar]
```

#### Test 3: [Scenario Name]
```markdown
Input: [ejemplo de entrada]
Expected: [comportamiento esperado]
Success Criteria: [cómo validar]
```

---

## 📚 Context & Memory

### Information to Remember
- [Tipo de información 1]
- [Tipo de información 2]
- [Tipo de información 3]

### Information to Forget
- [Información sensible/temporal]
- [Datos que no deben persistir]

### Context Window Management
```markdown
Priority 1: [información más importante]
Priority 2: [información secundaria]
Priority 3: [información de referencia]
```

---

## 🔐 Security & Privacy

### Data Handling
- **Never log**: [tipos de datos sensibles]
- **Always encrypt**: [datos que requieren encriptación]
- **Retention policy**: [cuánto tiempo guardar datos]

### User Privacy
- Don't ask for: [información no necesaria]
- Validate: [información que debe verificarse]
- Secure: [información que debe protegerse]

---

## 📈 Metrics & Improvement

### Success Metrics
- [ ] [Métrica 1]: [objetivo]
- [ ] [Métrica 2]: [objetivo]
- [ ] [Métrica 3]: [objetivo]

### Continuous Improvement
```markdown
- Collect feedback on: [aspectos específicos]
- Monitor: [indicadores clave]
- Iterate based on: [criterios de mejora]
```

---

## 💡 Examples

### Example 1: [Common Use Case]
```markdown
User: "[typical request]"

Agent Process:
1. [paso 1]
2. [paso 2]
3. [paso 3]

Output: "[expected result]"
```

### Example 2: [Edge Case]
```markdown
User: "[unusual request]"

Agent Process:
1. [cómo manejar]
2. [validaciones adicionales]
3. [resolución]

Output: "[handled gracefully]"
```

### Example 3: [Error Scenario]
```markdown
User: "[request that causes error]"

Agent Process:
1. [detección del problema]
2. [comunicación al usuario]
3. [sugerencia de alternativa]

Output: "[helpful error message + solution]"
```

---

## 🔄 Version History

### v1.0.0 - [Date]
- Initial release
- [Feature 1]
- [Feature 2]

---

## 📞 Support & Feedback

### How to Report Issues
[Proceso para reportar problemas]

### Feature Requests
[Cómo sugerir mejoras]

### Contact
[Información de contacto del maintainer]

---

## 📄 License & Credits

### License
[Tipo de licencia]

### Credits
- Based on: [referencias]
- Inspired by: [inspiración]
- Thanks to: [agradecimientos]

---

**Last Updated**: [Fecha]  
**Maintained By**: [Nombre]  
**Status**: [Active/Beta/Deprecated]
