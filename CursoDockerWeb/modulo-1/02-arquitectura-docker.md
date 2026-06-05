---
title: Arquitectura de Docker
description: Cómo funciona Docker por dentro.
difficulty: Principiante
time: 20 min
---

# 🏛️ Arquitectura de Docker

Docker utiliza una arquitectura cliente-servidor. El cliente Docker habla con el demonio Docker, que hace el trabajo pesado de construir, ejecutar y distribuir tus contenedores.

## 1. El Docker Engine
Es el núcleo de Docker. Está compuesto por:
- **Server (Docker Daemon):** Proceso en segundo plano (`dockerd`) que maneja imágenes, contenedores, redes y volúmenes.
- **REST API:** Interfaz para interactuar con el Daemon.
- **Client (CLI):** La interfaz de línea de comandos (`docker`).

## 2. Docker Registries
Los registros almacenan imágenes Docker.
- **Docker Hub:** Es el registro público oficial por defecto.
- Puedes tener registros privados (GitHub Container Registry, AWS ECR).

## 3. Objetos de Docker
- **Imágenes:** Plantillas de solo lectura para crear contenedores.
- **Contenedores:** Instancias ejecutables de una imagen.
- **Volúmenes:** Mecanismo preferido para persistir datos generados o usados por contenedores Docker.
- **Redes:** Permiten conectar contenedores de forma aislada.

---

### 💪 Ejercicio Práctico
Dibuja mentalmente o en un papel la relación entre: Imagen, Contenedor y Registro.
¿Quién crea a quién y de dónde se descargan?

**Respuesta Esperada:** Se descargan Imágenes desde un Registro. Los Contenedores son instancias en ejecución creadas a partir de una Imagen.
