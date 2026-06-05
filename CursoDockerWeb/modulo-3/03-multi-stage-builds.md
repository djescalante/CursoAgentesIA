---
title: Multi-stage Builds
description: Imágenes ligeras y seguras para producción.
difficulty: Avanzado
time: 30 min
---

# 🚀 Multi-stage Builds

Las construcciones multi-etapa son ⭐ CRÍTICAS para crear imágenes de producción pequeñas y seguras.

## El Problema
Tu código puede necesitar herramientas de compilación pesadas (compiladores C++, SDKs, etc.) para construirse, pero **no** las necesita para ejecutarse. Si dejas todo en la imagen final, pesará gigabytes y tendrá una mayor superficie de ataque.

## La Solución: Multi-stage
Puedes usar múltiples declaraciones `FROM` en tu Dockerfile. Cada `FROM` comienza una nueva etapa. Puedes copiar artefactos de una etapa a otra, dejando atrás todo lo innecesario.

## Ejemplo (Go)

```dockerfile
# Etapa 1: Constructor (pesada)
FROM golang:1.21 AS builder
WORKDIR /app
COPY . .
RUN go build -o mi_app

# Etapa 2: Final (muy ligera)
FROM alpine:latest
WORKDIR /app
# Solo copiamos el binario compilado de la etapa 'builder'
COPY --from=builder /app/mi_app .
CMD ["./mi_app"]
```

## Beneficios
1. **Tamaño drásticamente menor:** Pasas de 800MB a 15MB.
2. **Mayor Seguridad:** Menos herramientas instaladas = menos vulnerabilidades.
3. **Mantenibilidad:** Un solo Dockerfile maneja el entorno de build y el de run.

---

### 💪 Ejercicio Práctico
Implementa un Multi-stage build para un proyecto Frontend (ej. React/Vite).
Usa `node` para la etapa de build (`npm run build`), y usa `nginx:alpine` para la etapa final copiando solo el directorio `dist`.
