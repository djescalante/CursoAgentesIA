---
title: Dev Environments
description: Entornos de desarrollo consistentes.
difficulty: Avanzado
time: 25 min
---

# 💻 Dev Environments

Imagina poder clonar un repositorio y, sin instalar nada más que Docker, tener un entorno de desarrollo completo (IDE, extensiones, dependencias) listo en 2 minutos. Eso son los Dev Environments.

## ¿Qué son?
Un Dev Environment ejecuta no solo tu aplicación en un contenedor, sino también tus herramientas de desarrollo. Está impulsado por tecnologías como Dev Containers.

## Cómo funciona (VS Code)
1. Tienes una carpeta `.devcontainer` en tu repositorio.
2. Dentro, un `devcontainer.json` y un `Dockerfile`.
3. VS Code lee esto, inicia el contenedor, instala las extensiones de VS Code dentro de él, y conecta tu editor local al contenedor.

## Beneficios
- **Onboarding instantáneo:** Los nuevos desarrolladores no pierden días configurando su máquina.
- **Aislamiento total:** Puedes trabajar en un proyecto Python 3.8 y en otro Python 3.12 sin conflictos globales.
- **Consistencia:** El código se escribe y prueba en el mismo sistema operativo en el que se ejecutará en producción.

---

### 💪 Ejercicio Práctico
Si usas VS Code, instala la extensión "Dev Containers". Crea un archivo `.devcontainer/devcontainer.json` básico para Node.js y usa el comando "Dev Containers: Reopen in Container".
