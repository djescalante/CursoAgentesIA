---
title: Docker Scout y Seguridad
description: Manteniendo tus imágenes libres de vulnerabilidades.
difficulty: Avanzado
time: 20 min
---

# 🛡️ Docker Scout y Seguridad

En 2026, la seguridad no es una idea de último momento. Docker Scout viene integrado en Docker Desktop para ayudarte a encontrar y solucionar vulnerabilidades en tus imágenes antes de desplegarlas.

## ¿Qué es Docker Scout?
Es una herramienta de análisis de vulnerabilidades que inspecciona las capas de tu imagen en busca de CVEs (Common Vulnerabilities and Exposures) conocidos.

## Cómo Usarlo
1. **Desde la Terminal:** 
   ```bash
   docker scout cves nginx:latest
   ```
2. **Desde Docker Desktop:**
   Ve a la pestaña **Images**, selecciona una imagen y haz clic en la pestaña **Scout**. Verás un desglose gráfico de las vulnerabilidades por severidad (Crítica, Alta, Media, Baja).

## Buenas Prácticas de Seguridad
- **Usa imágenes base oficiales y mínimas** (`alpine`, `distroless`).
- **No corras como root:** Por defecto, los contenedores corren como root. En tu Dockerfile, crea un usuario no privilegiado y usa la instrucción `USER`.
  ```dockerfile
  RUN adduser -D appuser
  USER appuser
  ```
- **Escanea siempre:** Añade `docker scout` a tus pipelines de CI/CD.

---

### 💪 Ejercicio Práctico
Ejecuta `docker scout cves python:3.9` en tu terminal. ¿Cuántas vulnerabilidades críticas encuentra? Ahora ejecuta `docker scout cves python:3.11-alpine`. ¿Ves la diferencia?
