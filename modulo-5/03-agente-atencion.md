# 5.3 - Agente de Atención al Cliente

## 🎯 Objetivo

Estudiar el caso de uso real de un **Agente de Soporte de Nivel 1 (Tier 1 Support)**. Aprenderemos cómo configurarlo para que sea empático, seguro y sepa cuándo escalar un problema a un humano.

---

## 🎧 Contexto del Problema

En la industria del software y el comercio electrónico, un alto porcentaje de los tickets de soporte son repetitivos (ej. "¿Dónde está mi pedido?", "¿Cómo restablezco mi contraseña?").
Un Agente Inteligente configurado mediante Markdown puede manejar el 80% de estas consultas, pero conlleva un gran riesgo: **No puede prometer reembolsos ni enfadarse con el cliente.**

---

## 📝 Estructura Base del Agente de Soporte

Este es un ejemplo de cómo estructurar a un agente de atención al cliente de alta fiabilidad.

### 1. Identidad y Personalidad
La empatía es clave. El cliente suele estar frustrado.

```markdown
# Agente: "Soporte Amigable"

## 🎭 Identidad
Eres el primer punto de contacto del servicio de soporte técnico de "TechCorp". Tu misión es resolver problemas de configuración básica y brindar tranquilidad a los usuarios.

## 🗣️ Personalidad
- Extremadamente empático y paciente.
- Validativo ("Entiendo completamente lo frustrante que puede ser esto").
- Profesional, pero sin sonar robótico.
- Usas emojis esporádicamente para aligerar la tensión (✨, 👍, 🛠️).
```

### 2. Capacidades Restringidas
A diferencia de un asistente general, el Agente de Soporte debe tener un cerco perimetral muy estricto sobre lo que puede consultar.

```markdown
## ⚙️ Capacidades (Skills Permitidos)
- Puedes consultar la Base de Datos de Preguntas Frecuentes (FAQ).
- Puedes leer el manual público de usuario.
- Puedes solicitar el número de pedido (Order ID) al cliente.
```

### 3. Las Reglas de Oro (Guardrails)
Esta es la sección más importante de un agente empresarial expuesto al público.

```markdown
## ⚠️ Reglas y Límites Estrictos
1. **Política de Reembolsos:** NUNCA prometas reembolsos, compensaciones económicas ni meses gratis. Si el usuario exige dinero, di: "Solo un supervisor puede gestionar compensaciones financieras. Crearé un ticket prioritario para usted."
2. **Escalamiento Handoff:** Si el usuario usa lenguaje abusivo, menciona acciones legales o si llevas 3 mensajes sin poder resolver el problema, DEBES usar tu habilidad para **Escalar a Humano**.
3. **Privacidad (PII):** NUNCA le pidas al usuario su contraseña, número de tarjeta de crédito o el código CVV.
4. **Alucinación:** Si el manual no menciona la respuesta, NO intentes inventar una solución técnica. Es preferible decir "No tengo esa información en este momento, permítame escalar el caso".
```

---

## 🔄 El Flujo de Escalamiento (Human-in-the-Loop)

Un Agente de Atención al Cliente nunca trabaja solo. Forma parte de un sistema "Human-in-the-Loop".
Cuando el agente choca con una de sus reglas (ej. el cliente exige reembolso), el agente emite un *flag* o llama a un Skill especial (ej. `CrearTicket_En_Zendesk`).

El archivo Markdown no ejecuta el código por sí solo, pero define las **instrucciones lógicas** de cuándo debe dispararse esa herramienta técnica externa.

---

## 🚀 Próximos Pasos

El Agente de Atención al Cliente se vuelve mucho más poderoso cuando se le dota de *Skills* específicos para automatizar la resolución del ticket. Precisamente, veremos esto en el próximo módulo.

👉 **Siguiente**: [5.4 - Skill de automatización de tareas](04-skill-automatizacion.md)

---

## 💡 Ejercicio Práctico

1. Crea un nuevo archivo llamado `agente-devoluciones.md`.
2. Escribe una configuración para un agente cuyo único propósito sea procesar devoluciones de una tienda de ropa en línea.
3. Define la política de qué artículos **NO** se pueden devolver (ej. ropa interior, artículos en rebaja) en la sección de Reglas.
4. Escribe un ejemplo de interacción donde el cliente intente devolver algo no permitido, y el agente se niegue amablemente siguiendo la regla.

---

**Tiempo estimado**: 20 minutos  
**Dificultad**: ⭐⭐ Intermedio
