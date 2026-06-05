# COMPOSE.YAML - Plantilla Estándar

Usa esta plantilla para definir aplicaciones multi-contenedor. Incluye buenas prácticas como healthchecks, depends_on condicionado y manejo de volúmenes.

```yaml
# Se recomienda omitir 'version' en las versiones modernas de Compose (2026)

services:
  # ==========================================
  # Servicio 1: API / Backend
  # ==========================================
  api:
    build: 
      context: ./backend
      dockerfile: Dockerfile
    container_name: mi_api
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DB_HOST=database
      - DB_PASS=${DB_PASSWORD} # Leído desde archivo .env
    volumes:
      - ./backend:/app # Bind mount para desarrollo
      - /app/node_modules # Evita sobreescribir dependencias con el host
    depends_on:
      database:
        condition: service_healthy

  # ==========================================
  # Servicio 2: Base de Datos
  # ==========================================
  database:
    image: postgres:15-alpine
    container_name: mi_db
    restart: unless-stopped
    environment:
      - POSTGRES_USER=admin
      - POSTGRES_PASSWORD=${DB_PASSWORD}
      - POSTGRES_DB=midb
    ports:
      - "5432:5432" # Solo exponer en dev. En producción, elimínalo.
    volumes:
      - pg_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin -d midb"]
      interval: 10s
      timeout: 5s
      retries: 5

# ==========================================
# Declaración de Volúmenes Nombrados
# ==========================================
volumes:
  pg_data:
    name: mi_proyecto_pg_data
```
