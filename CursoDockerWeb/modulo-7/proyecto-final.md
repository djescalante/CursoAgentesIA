---
title: Proyecto Final
description: Despliegue de un Stack Completo moderno.
difficulty: Experto
time: 60 min
---

# 🎓 Proyecto Final: Stack Completo (2026)

¡Felicidades por llegar hasta aquí! Es momento de poner en práctica todo lo aprendido. Vamos a desplegar una arquitectura moderna con 3 servicios.

## La Arquitectura
Tu misión es crear un archivo `compose.yaml` y los `Dockerfile` necesarios para desplegar:
1. **Frontend:** Una aplicación estática (simulada) servida por Nginx.
2. **Backend:** Una API (simulada con un contenedor de Python/Node) que se conecta a la base de datos.
3. **Base de Datos:** PostgresSQL.

## Requisitos del Proyecto
- **Multi-stage build:** El Dockerfile del Frontend debe tener una etapa de compilación y una etapa final con Alpine + Nginx.
- **Redes:** La base de datos no debe publicar puertos a la máquina anfitriona, solo debe ser accesible por el Backend a través de una red privada.
- **Persistencia:** Los datos de Postgres deben guardarse en un volumen gestionado llamado `pg_data`.
- **Seguridad:** El contenedor del Backend no debe correr como root.
- **Variables de Entorno:** Las credenciales de Postgres no deben estar en el `compose.yaml`, usa un archivo `.env`.

## Criterios de Éxito
Al ejecutar `docker compose up -d`, los tres contenedores deben iniciar correctamente.
Al ejecutar `docker compose ps`, todos los servicios deben estar en estado `running` (sin reinicios constantes).

## ¡Manos a la obra!
Crea una carpeta en tu máquina local llamada `proyecto-docker`.
Puedes consultar la carpeta `/ejemplos/` o `/templates/` del curso si te atascas en la estructura de los archivos.

¡Mucho éxito!
