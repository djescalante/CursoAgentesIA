---
title: Redes en Docker
description: Cómo se comunican los contenedores.
difficulty: Intermedio
time: 20 min
---

# 🌐 Redes en Docker

En el mundo real, tu backend necesita hablar con tu base de datos. Para ello, usamos redes Docker.

## Tipos de Redes Principales

1. **Bridge (Por defecto):** La red predeterminada. Los contenedores en la misma red bridge pueden comunicarse por IP.
2. **User-defined Bridge:** (Recomendado) Redes bridge creadas por el usuario. **¡Súper poder!** Permiten la resolución automática de DNS; los contenedores pueden comunicarse usando su *nombre* en lugar de su IP.
3. **Host:** Elimina el aislamiento de red; el contenedor usa directamente la red del host.
4. **None:** Aisla completamente el contenedor.

## Trabajando con Redes

- **Crear red:** `docker network create mi_red`
- **Correr BD en la red:**
  `docker run -d --name mi_db --network mi_red postgres`
- **Correr Web en la red:**
  `docker run -d --name mi_web --network mi_red mi_imagen_web`

Ahora, la aplicación `mi_web` puede conectarse a la base de datos usando el hostname `mi_db`.

---

### 💪 Ejercicio Práctico
1. Crea una red llamada `test_net`.
2. Inicia un contenedor `alpine` llamado `c1` en esa red.
3. Inicia otro contenedor `alpine` llamado `c2` en esa red.
4. Entra a `c1` (`docker exec -it c1 sh`) y haz un `ping c2`. ¡Observa cómo resuelve el nombre automáticamente!
