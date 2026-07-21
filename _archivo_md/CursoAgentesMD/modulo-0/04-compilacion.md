# 0.4 - Guía de Compilación y Publicación del Curso

## ⚙️ El Pipeline de Compilación

Para mantener el visualizador web interactivo actualizado sin tener que editar manualmente el objeto JavaScript global, disponemos de una suite de scripts automatizados en la carpeta `scripts/`.

El flujo es el siguiente:
1. Redactas tus lecciones en Markdown dentro de carpetas como `modulo-N/`.
2. Ejecutas el script de compilación `compile_data_js.py` (ubicado en `scripts/`), el cual lee los archivos Markdown, escapa caracteres especiales, y genera el archivo `data.js`.
3. Ejecutas los scripts de build portable.

---

## 🛠️ Comandos de Compilación

Abre una terminal en la raíz del proyecto y ejecuta los siguientes comandos según corresponda:

### 1. Compilar de Markdown a JavaScript
Este comando regenera los archivos `data.js` del visualizador local y portable inyectando los Markdowns limpios.
```powershell
python scripts/compile_data_js.py
```

### 2. Actualizar el Manifiesto del Curso
Este script actualiza el listado global de contenidos y estadísticas del curso en `MANIFEST.md` y reconstruye el script de empaquetado portable.
```powershell
python scripts/update_all.py
```

### 3. Reconstruir la Versión Portable
Este script crea una versión offline e independiente del curso en la carpeta `cursoAgentesPortable/` copiando el visualizador, estilos, scripts y los archivos `.md` limpios para distribución local.
```powershell
python scripts/make_portable.py
```

---

## ⚡ Automatización en un Solo Comando
Para simplificar la creación y despliegue al máximo, al ejecutar `python scripts/update_all.py` se llamará en cadena a la compilación y la generación portable automáticamente, haciendo que desplegar nuevos contenidos sea cuestión de segundos.

---
**Dificultad**: ⭐⭐ Intermedio
**Tiempo estimado**: 10 minutos
