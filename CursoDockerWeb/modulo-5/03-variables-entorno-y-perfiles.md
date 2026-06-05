---
title: Variables de Entorno y Perfiles
description: Manejando configuraciones seguras.
difficulty: Avanzado
time: 20 min
---

# 🔐 Variables de Entorno y Perfiles

Docker Compose ofrece múltiples formas de manejar variables de entorno y perfiles de ejecución, lo cual es vital para no escribir contraseñas (hardcoding) en tus repositorios.

## Archivos `.env`
Docker Compose lee automáticamente el archivo `.env` que se encuentre en el mismo directorio que tu `compose.yaml`.

**Archivo `.env`:**
```env
DB_PASS=supersecreto123
WEB_PORT=8080
```

**Archivo `compose.yaml`:**
```yaml
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASS}
  web:
    image: nginx
    ports:
      - "${WEB_PORT}:80"
```

## Docker Compose Profiles
Introducidos recientemente, los profiles permiten definir contenedores que solo se inician en ciertos escenarios (ej. herramientas de depuración).

```yaml
services:
  web:
    image: mi_web
  phpmyadmin:
    image: phpmyadmin
    profiles: ["debug"]
```
Si corres `docker compose up -d`, `phpmyadmin` no iniciará.
Para iniciarlo: `docker compose --profile debug up -d`.

---

### 💪 Ejercicio Práctico
Crea un `compose.yaml` que incluya un contenedor de Redis. Configura a Redis con un profile llamado `testing`. ¿Cómo levantarías todo el entorno activando ese profile?
