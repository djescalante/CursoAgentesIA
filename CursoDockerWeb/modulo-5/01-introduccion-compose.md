---
title: Introducción a Compose
description: Orquestación local con compose.yaml.
difficulty: Intermedio
time: 20 min
---

# 🐙 Introducción a Docker Compose

Iniciar un contenedor con `docker run` está bien. Pero iniciar 5 contenedores interconectados con `docker run` es una pesadilla. Docker Compose es la solución.

## ¿Qué es Docker Compose?
Es una herramienta que te permite definir y ejecutar aplicaciones multi-contenedor. Usas un archivo YAML (`compose.yaml` o `docker-compose.yml`) para configurar todos los servicios de tu aplicación.

## Ventajas de Compose
1. **Infraestructura como Código:** Toda tu configuración (puertos, volúmenes, redes) está documentada en el YAML.
2. **Un solo comando:** Con `docker compose up -d` levantas toda tu arquitectura.
3. **Redes automáticas:** Compose crea una red compartida para todos los servicios definidos en el archivo.

## Estructura de `compose.yaml`
```yaml
services:
  web:
    image: nginx:latest
    ports:
      - "8080:80"
  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: secret
```

---

### 💪 Ejercicio Práctico
Crea un archivo `compose.yaml` basándote en el ejemplo anterior.
Levántalo usando `docker compose up -d`.
Comprueba que ambos contenedores están corriendo con `docker compose ps`.
Baja todo el entorno con `docker compose down`.
