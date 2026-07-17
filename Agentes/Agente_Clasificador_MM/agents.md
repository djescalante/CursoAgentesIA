# Agente Clasificador de Malos Manejos (Agente_Clasificador_MM)

## Descripción General
Este agente automatiza la clasificación de los reportes mensuales de "Malos Manejos" en las instalaciones de cajeros automáticos o sucursales. Toma un archivo consolidado en Excel (el "base file") y distribuye los registros en archivos individuales por empresa proveedora o transportadora, organizándolos en carpetas específicas según la categoría del proveedor.

## Directorios Clave
- `MM_sin_procesar`: Directorio de entrada donde se deben colocar los archivos `.xlsx` base a procesar.
- `MM_Clasificados`: Directorio de salida donde el agente creará la estructura de carpetas (`01. Proveedores de máquina`, `02. Proveedores Mtto`, `03. Transportadoras`) y guardará los archivos clasificados.

## Ejecución
Para ejecutar el agente, asegúrese de usar el entorno virtual configurado y ejecute el script principal:

```bash
venvCagents\Scripts\python.exe Agentes/Agente_Clasificador_MM/main_agent.py
```

O utilizando python del sistema (si pandas está disponible):
```bash
python Agentes/Agente_Clasificador_MM/main_agent.py
```
