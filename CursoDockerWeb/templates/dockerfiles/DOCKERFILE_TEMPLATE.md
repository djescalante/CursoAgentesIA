# DOCKERFILE - Plantilla de Producción Multi-stage (Node.js)

Usa esta plantilla como base para crear imágenes de aplicaciones Frontend (Vite/React) o Backend (Node/Express). Está optimizada para tamaño y seguridad.

```dockerfile
# ==========================================
# Etapa 1: Builder
# ==========================================
FROM node:20-alpine AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias primero (para aprovechar caché)
COPY package.json package-lock.json ./

# Instala TODAS las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copia el resto del código fuente
COPY . .

# Construye la aplicación (si es necesario)
RUN npm run build

# ==========================================
# Etapa 2: Producción
# ==========================================
FROM node:20-alpine AS runner

# Establece entorno a producción
ENV NODE_ENV=production

# Crea un usuario no-root por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copia los archivos construidos de la etapa builder
# (Ajusta la ruta './dist' según tu framework)
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist
COPY --from=builder --chown=appuser:appgroup /app/package.json ./package.json

# Instala SOLO dependencias de producción
RUN npm install --omit=dev

# Cambia al usuario no-root
USER appuser

# Documenta el puerto que usará el contenedor
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
```
