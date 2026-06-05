---
title: Servicios y Dependencias
description: Coordinando múltiples contenedores.
difficulty: Avanzado
time: 25 min
---

# 🔗 Servicios y Dependencias

En una arquitectura de microservicios, el orden de inicio importa. Si tu backend arranca antes que la base de datos esté lista para aceptar conexiones, la aplicación fallará.

## La instrucción `depends_on`
En Docker Compose, puedes usar `depends_on` para expresar el orden de inicio.

```yaml
services:
  api:
    build: ./api
    ports:
      - "3000:3000"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: root
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5
```

## Healthchecks ⭐ IMPORTANTE
Nota cómo en el ejemplo la API no arranca cuando el contenedor `db` inicia, sino cuando el contenedor `db` está **saludable** (`service_healthy`). El `healthcheck` es un script que verifica que el servicio interno (Postgres) realmente está respondiendo.

---

### 💪 Ejercicio Práctico
Revisa el código YAML de arriba. ¿Qué pasaría si el `healthcheck` de Postgres falla 5 veces consecutivas?
**Respuesta:** El contenedor `db` se marcará como *unhealthy* y la `api` no se iniciará, evitando un fallo en cascada silencioso.
