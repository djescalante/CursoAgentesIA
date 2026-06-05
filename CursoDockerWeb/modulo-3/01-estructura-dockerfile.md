---
title: Estructura de un Dockerfile
description: Creando tus propias imágenes con Dockerfile.
difficulty: Intermedio
time: 25 min
---

# 📝 Estructura de un Dockerfile

Un `Dockerfile` es un archivo de texto con instrucciones para construir una imagen Docker.

## Instrucciones Básicas

- **`FROM`**: Define la imagen base (ej. `node:20-alpine`, `python:3.11-slim`). Siempre debe ser la primera instrucción.
- **`WORKDIR`**: Establece el directorio de trabajo dentro del contenedor para las instrucciones siguientes.
- **`COPY`**: Copia archivos desde tu máquina host al contenedor.
- **`RUN`**: Ejecuta comandos durante la fase de *construcción* de la imagen (ej. instalar dependencias).
- **`EXPOSE`**: Documenta en qué puerto escucha el contenedor (no publica el puerto por sí solo).
- **`CMD`**: El comando por defecto que se ejecutará cuando el contenedor inicie.

## Ejemplo Básico (Node.js)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## Construyendo la Imagen

Para construir la imagen a partir del Dockerfile:
```bash
docker build -t mi_app_node:1.0 .
```
- `-t`: Etiqueta (nombre) para tu imagen.
- `.`: El contexto de construcción (el directorio actual).

---

### 💪 Ejercicio Práctico
Crea un archivo llamado `Dockerfile` en una carpeta vacía. Escribe las instrucciones para crear una imagen basada en `python:3.11-alpine`, que imprima "Hola desde mi imagen personalizada" al arrancar usando `CMD ["echo", "..."]`.
Constrúyela y ejecútala.
