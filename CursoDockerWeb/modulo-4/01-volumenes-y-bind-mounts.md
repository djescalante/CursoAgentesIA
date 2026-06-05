---
title: Volúmenes y Bind Mounts
description: Persistencia de datos en Docker.
difficulty: Intermedio
time: 25 min
---

# 💾 Volúmenes y Bind Mounts

Por defecto, todos los archivos creados dentro de un contenedor se almacenan en una capa escribible temporal. Si el contenedor se elimina, ¡los datos se pierden!

Para datos que deben persistir (como bases de datos), usamos Volúmenes o Bind Mounts.

## 1. Volúmenes (Recomendado)
Son gestionados enteramente por Docker. Son la mejor forma de persistir datos.
- **Crear un volumen:** `docker volume create mi_data`
- **Usarlo:** `docker run -d -v mi_data:/var/lib/postgresql/data postgres`

Beneficios de los volúmenes:
- Independientes de la estructura de carpetas del host.
- Fáciles de respaldar y migrar.
- Funcionan igual en Windows, Mac y Linux.

## 2. Bind Mounts
Mapean un directorio exacto de tu máquina host a un directorio en el contenedor.
- **Usarlo:** `docker run -d -v /ruta/en/mi/host:/app mi_imagen`

Casos de uso para Bind Mounts:
- Desarrollo local: Montas tu código fuente dentro del contenedor para que los cambios se reflejen instantáneamente sin tener que reconstruir la imagen.

---

### 💪 Ejercicio Práctico
1. Crea un contenedor de Redis.
2. Añade algunos datos.
3. Elimina el contenedor y crea uno nuevo. ¿Se conservaron los datos? (Deberían haberse perdido).
4. Repite el proceso, pero esta vez usa un Volumen (ej. `-v redis_data:/data`). Comprueba que los datos sobreviven.
