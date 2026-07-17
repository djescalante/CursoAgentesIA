import os
import pandas as pd
import logging
from datetime import datetime

# Configurar logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Mapeo de meses en español
MESES_ES = {
    1: 'ENERO', 2: 'FEBRERO', 3: 'MARZO', 4: 'ABRIL', 
    5: 'MAYO', 6: 'JUNIO', 7: 'JULIO', 8: 'AGOSTO', 
    9: 'SEPTIEMBRE', 10: 'OCTUBRE', 11: 'NOVIEMBRE', 12: 'DICIEMBRE'
}

# Configuración de categorías y sus respectivas carpetas
CATEGORIAS = {
    'Proveedores de máquina': {
        'folder': '01. Proveedores de máquina',
        'empresas': ['NCR', 'DIEBOLD', 'BELLTECH']
    },
    'Proveedores Mtto': {
        'folder': '02. Proveedores Mtto',
        'empresas': [] # Se pueden agregar empresas específicas aquí
    },
    'Transportadoras': {
        'folder': '03. Transportadoras',
        'empresas': ['ATLAS', 'BRINKS', 'TRANSBANK', 'VATCO']
    }
}

def determinar_categoria(empresa):
    empresa_upper = str(empresa).strip().upper()
    for cat_name, cat_info in CATEGORIAS.items():
        if empresa_upper in cat_info['empresas']:
            return cat_info['folder']
    
    # Si no está en las listas, por defecto va a Proveedores Mtto (o manejar como 'Otros')
    return CATEGORIAS['Proveedores Mtto']['folder']

def procesar_archivo_base(ruta_archivo, directorio_salida):
    logging.info(f"Procesando archivo: {ruta_archivo}")
    
    try:
        # Leer el archivo base
        df_base = pd.read_excel(ruta_archivo)
        
        # Limpiar y renombrar columnas esperadas
        # Base expected: ['fecha', 'codigo ', 'nombre', 'Empresa', 'tipo de mal manejo', 'Cierre', 'comentarios']
        columnas_renombradas = {
            'fecha': 'fecha creación',
            'codigo ': 'Codigo',
            'nombre': 'Nombre',
            'Empresa': 'TDV'
        }
        df_base.rename(columns=columnas_renombradas, inplace=True)
        
        # Extraer el mes de la 'fecha creación' si es de tipo datetime
        if 'fecha creación' in df_base.columns:
            df_base['fecha creación'] = pd.to_datetime(df_base['fecha creación'], errors='coerce')
            df_base['Mes'] = df_base['fecha creación'].dt.month.map(MESES_ES)
        
        # Filtrar solo las columnas de interés
        columnas_finales = ['fecha creación', 'Mes', 'Codigo', 'Nombre', 'tipo de mal manejo', 'TDV']
        columnas_existentes = [col for col in columnas_finales if col in df_base.columns]
        df_procesado = df_base[columnas_existentes].copy()
        
        # Agrupar por empresa
        # Regla de negocio: Mapear 'SUC' a 'FUNCIONARIOS'
        df_procesado['TDV'] = df_procesado['TDV'].replace({'SUC': 'FUNCIONARIOS', 'FUNCIONARIO': 'FUNCIONARIOS'})
        
        empresas = df_procesado['TDV'].dropna().unique()
        
        for empresa in empresas:
            df_empresa = df_procesado[df_procesado['TDV'] == empresa]
            if df_empresa.empty:
                continue
            
            carpeta_destino = determinar_categoria(empresa)
            ruta_carpeta = os.path.join(directorio_salida, carpeta_destino)
            os.makedirs(ruta_carpeta, exist_ok=True)
            
            nombre_archivo = f"{empresa}.xlsx"
            ruta_salida = os.path.join(ruta_carpeta, nombre_archivo)
            
            df_empresa.to_excel(ruta_salida, index=False)
            logging.info(f"Guardado {len(df_empresa)} registros para {empresa} en {ruta_salida}")
            
    except Exception as e:
        logging.error(f"Error al procesar el archivo: {e}")

if __name__ == "__main__":
    # Configuración de directorios relativos al agente
    base_dir = os.path.dirname(os.path.abspath(__file__))
    input_dir = os.path.join(base_dir, 'MM_sin_procesar')
    output_dir = os.path.join(base_dir, 'MM_Clasificados') # O reemplazar por el path que el usuario requiera
    
    os.makedirs(input_dir, exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)
    
    # Procesar todos los archivos en la carpeta de entrada
    archivos_procesados = 0
    for archivo in os.listdir(input_dir):
        if archivo.endswith('.xlsx') and not archivo.startswith('~$'):
            ruta_completa = os.path.join(input_dir, archivo)
            procesar_archivo_base(ruta_completa, output_dir)
            archivos_procesados += 1
            
    if archivos_procesados == 0:
        logging.warning(f"No se encontraron archivos .xlsx en {input_dir}")
    else:
        logging.info("Proceso de clasificación completado.")
