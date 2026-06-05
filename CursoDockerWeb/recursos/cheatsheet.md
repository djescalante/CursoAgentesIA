# 📌 Cheatsheet de Docker y Compose (2026)

## 🐳 Comandos Básicos de Docker

**Gestión de Contenedores:**
- `docker run -d -p 80:80 nginx` : Crear y arrancar en segundo plano.
- `docker ps` : Listar contenedores activos.
- `docker ps -a` : Listar todos los contenedores.
- `docker stop <id>` : Detener contenedor.
- `docker start <id>` : Arrancar contenedor detenido.
- `docker rm <id>` : Eliminar contenedor (debe estar detenido).
- `docker rm -f <id>` : Forzar eliminación de contenedor en ejecución.

**Gestión de Imágenes:**
- `docker images` : Listar imágenes locales.
- `docker pull ubuntu` : Descargar imagen.
- `docker rmi <id>` : Eliminar imagen.
- `docker build -t app:1.0 .` : Construir imagen desde el directorio actual.

**Depuración y Logs:**
- `docker logs <id>` : Ver logs.
- `docker logs -f <id>` : Ver logs en tiempo real (follow).
- `docker exec -it <id> sh` : Entrar a la terminal del contenedor.

**Limpieza:**
- `docker system prune` : Elimina contenedores detenidos, redes sin uso e imágenes colgantes.
- `docker system prune -a --volumes` : ⚠️ Elimina TODO lo que no esté en uso.

## 🐙 Comandos de Docker Compose

- `docker compose up -d` : Levantar toda la arquitectura en segundo plano.
- `docker compose down` : Detener y eliminar contenedores y redes.
- `docker compose down -v` : ⚠️ Igual que el anterior, pero TAMBIÉN elimina volúmenes de datos.
- `docker compose ps` : Estado de los servicios.
- `docker compose logs -f` : Logs de todos los servicios.
- `docker compose logs -f <servicio>` : Logs de un solo servicio.
- `docker compose build` : Reconstruir imágenes personalizadas del compose.

## 🛡️ Docker Scout (Seguridad 2026)

- `docker scout cves <imagen>` : Escanea la imagen buscando vulnerabilidades críticas.
- `docker scout recommendations <imagen>` : Sugiere imágenes base más seguras.
