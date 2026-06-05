---
title: Ciclo de Vida de un Contenedor
description: Comandos esenciales para manejar contenedores.
difficulty: Principiante
time: 25 min
---

# 🔄 Ciclo de Vida de un Contenedor

Para dominar Docker, necesitas conocer los comandos esenciales que controlan el ciclo de vida de tus contenedores.

## 1. Crear y Ejecutar: `docker run`
Combina la creación y ejecución de un contenedor.
```bash
docker run -d --name mi_web -p 8080:80 nginx
```
- `-d`: Detached mode (se ejecuta en segundo plano).
- `--name`: Asigna un nombre personalizado.
- `-p 8080:80`: Mapea el puerto 8080 de tu máquina al 80 del contenedor.

## 2. Listar Contenedores: `docker ps`
Muestra los contenedores en ejecución.
```bash
docker ps
```
Para ver TODOS los contenedores (incluyendo los detenidos):
```bash
docker ps -a
```

## 3. Detener e Iniciar: `docker stop` y `docker start`
Para pausar temporalmente sin perder la configuración:
```bash
docker stop mi_web
docker start mi_web
```

## 4. Revisar Logs: `docker logs`
Fundamental para depurar problemas.
```bash
docker logs mi_web
```

## 5. Eliminar: `docker rm`
Borra un contenedor (debe estar detenido).
```bash
docker rm mi_web
```
Para forzar el borrado de uno en ejecución: `docker rm -f mi_web`.

---

### 💪 Ejercicio Práctico
1. Inicia un contenedor con nombre `prueba_logs` usando la imagen `hello-world`.
2. Como este contenedor se detiene inmediatamente después de imprimir un mensaje, usa `docker ps -a` para encontrarlo.
3. Mira sus logs con `docker logs prueba_logs`.
4. Elimínalo usando `docker rm prueba_logs`.
