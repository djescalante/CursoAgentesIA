---
title: Capas y Caché
description: Optimizando la velocidad de construcción.
difficulty: Intermedio
time: 20 min
---

# 🥞 Capas y Caché

Entender cómo Docker construye las imágenes te ahorrará muchísimo tiempo.

## ¿Qué son las capas?
Cada instrucción en tu Dockerfile (`FROM`, `RUN`, `COPY`) crea una "capa" de solo lectura. Estas capas se apilan una encima de otra.

## ¿Cómo funciona la caché?
Cuando ejecutas `docker build`, Docker busca en su caché local para ver si ya tiene una capa existente para esa instrucción.
- Si la tiene, usa la caché (rapidísimo).
- Si no la tiene (por ejemplo, cambiaste un archivo que se copia en un `COPY`), Docker **invalida** la caché para esa capa y para **todas las capas subsiguientes**.

## La Regla de Oro: Ordenar por frecuencia de cambio

Coloca las instrucciones que cambian con **menos frecuencia** en la parte superior, y las que cambian **más frecuentemente** (como tu código fuente) en la parte inferior.

### ❌ Mal ejemplo
```dockerfile
COPY . /app
RUN npm install
```
*Si cambias un archivo CSS, se invalida la copia, y se vuelve a instalar todo con `npm install` (lento).*

### ✅ Buen ejemplo
```dockerfile
COPY package*.json ./
RUN npm install
COPY . .
```
*Si cambias un archivo CSS, solo se repite el último `COPY`. Las dependencias se mantienen en caché.*

---

### 💪 Ejercicio Práctico
Revisa el `Dockerfile` de algún proyecto anterior. ¿Está optimizado el orden de las dependencias respecto a la copia del código fuente?
