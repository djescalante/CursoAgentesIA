# Skills: Procesador de Indicadores ANS por Operador

## Índice de Skills

1. `excel_reader.load_excel_data()`
2. `data_processor.normalize_columns()`
3. `data_processor.validate_data()`
4. `data_processor.map_column_variants()`
5. `data_processor.group_by_operator_period()`
6. `period_generator.create_periods()`
7. `indicator_calculator.calculate_indicators()`
8. `pivot_generator.create_period_tables()`
9. `excel_writer.export_indicators_to_excel()`
10. `report_generator.create_processing_report()`

---

## 1. excel_reader.load_excel_data()

**Descripción**: Lee datos de un archivo Excel específico y valida su estructura básica.

**Parámetros**:
- `file_path` (str): Ruta completa al archivo Excel
- `sheet_name` (str): Nombre de la hoja a leer
- `verbose` (bool): Mostrar mensajes de progreso (default: True)

**Retorna**: DataFrame con los datos cargados o None si hay error

**Salida Esperada**: DataFrame con todas las columnas del archivo original

**Código**:
```python
import pandas as pd
from pathlib import Path

def load_excel_data(file_path: str, sheet_name: str, verbose: bool = True) -> pd.DataFrame:
    """
    Carga datos desde un archivo Excel.
    
    Args:
        file_path: Ruta del archivo Excel
        sheet_name: Nombre de la hoja a cargar
        verbose: Mostrar mensajes de progreso
    
    Returns:
        DataFrame con los datos cargados o None en caso de error
    """
    try:
        # Validar que el archivo existe
        path = Path(file_path)
        if not path.exists():
            print(f"✗ Error: Archivo {file_path} no encontrado")
            return None
        
        # Leer archivo Excel
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        if verbose:
            print(f"✓ Datos cargados exitosamente")
            print(f"  - Filas: {df.shape[0]}")
            print(f"  - Columnas: {df.shape[1]}")
            print(f"  - Columnas identificadas: {', '.join(df.columns.tolist())}")
        
        return df
    
    except FileNotFoundError:
        print(f"✗ Error: Archivo {file_path} no encontrado")
        return None
    except ValueError as e:
        print(f"✗ Error: La hoja '{sheet_name}' no existe en el archivo")
        return None
    except Exception as e:
        print(f"✗ Error al cargar archivo: {str(e)}")
        return None
```

---

## 2. data_processor.normalize_columns()

**Descripción**: Normaliza los nombres de columnas (minúsculas, sin espacios ni caracteres especiales).

**Parámetros**:
- `df` (DataFrame): DataFrame con columnas a normalizar
- `verbose` (bool): Mostrar mapeo de cambios

**Retorna**: DataFrame con columnas normalizadas

**Cambios Realizados**:
- Convierte a minúsculas
- Reemplaza espacios con guiones bajos
- Remueve caracteres especiales
- Preserva la posición de las columnas

**Código**:
```python
import re

def normalize_columns(df: pd.DataFrame, verbose: bool = True) -> pd.DataFrame:
    """
    Normaliza los nombres de las columnas.
    
    Args:
        df: DataFrame a procesar
        verbose: Mostrar cambios realizados
    
    Returns:
        DataFrame con columnas normalizadas
    """
    df = df.copy()
    
    # Mapeo de cambios para auditoría
    cambios = {}
    
    for col in df.columns:
        # Normalizar: minúsculas, reemplazar espacios, remover caracteres especiales
        col_normalizada = col.lower()
        col_normalizada = col_normalizada.replace(' ', '_')
        col_normalizada = re.sub(r'[áéíóú]', lambda m: {
            'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u'
        }[m.group()], col_normalizada)
        col_normalizada = re.sub(r'[^a-z0-9_]', '', col_normalizada)
        
        if col != col_normalizada:
            cambios[col] = col_normalizada
    
    # Aplicar cambios
    df.rename(columns=cambios, inplace=True)
    
    if verbose and cambios:
        print(f"✓ Columnas normalizadas: {len(cambios)} cambios")
        for original, normalizada in list(cambios.items())[:5]:
            print(f"  - {original} → {normalizada}")
        if len(cambios) > 5:
            print(f"  ... y {len(cambios) - 5} cambios más")
    
    return df
```

---

## 3. data_processor.validate_data()

**Descripción**: Valida que los datos cumplan con los requisitos mínimos de esquema.

**Parámetros**:
- `df` (DataFrame): DataFrame a validar
- `required_columns` (list): Columnas requeridas que deben existir
- `verbose` (bool): Mostrar detalles de validación

**Retorna**: Tupla (es_valido: bool, mensaje: str, df_validado: DataFrame)

**Validaciones**:
- Verifica columnas requeridas existen
- Elimina filas con valores vacíos en columnas clave
- Valida tipos de datos
- Verifica unicidad donde aplique

**Código**:
```python
def validate_data(df: pd.DataFrame, required_columns: list, verbose: bool = True) -> tuple:
    """
    Valida que el DataFrame cumpla con los requisitos mínimos.
    
    Args:
        df: DataFrame a validar
        required_columns: Lista de columnas requeridas
        verbose: Mostrar detalles de validación
    
    Returns:
        Tupla (es_valido, mensaje, dataframe_limpio)
    """
    df_validado = df.copy()
    problemas = []
    
    # 1. Validar columnas requeridas
    columnas_faltantes = [col for col in required_columns if col not in df.columns]
    if columnas_faltantes:
        problemas.append(f"Columnas faltantes: {', '.join(columnas_faltantes)}")
        if verbose:
            print(f"✗ Columnas faltantes: {columnas_faltantes}")
            print(f"  Columnas disponibles: {df.columns.tolist()}")
        return (False, f"Validación fallida: {'; '.join(problemas)}", None)
    
    # 2. Eliminar filas completamente vacías
    filas_antes = len(df_validado)
    df_validado = df_validado.dropna(how='all')
    filas_eliminadas = filas_antes - len(df_validado)
    if filas_eliminadas > 0:
        problemas.append(f"Se eliminaron {filas_eliminadas} filas completamente vacías")
    
    # 3. Eliminar filas con valores nulos en columnas clave
    for col in required_columns:
        filas_antes = len(df_validado)
        df_validado = df_validado.dropna(subset=[col])
        filas_elimadas_col = filas_antes - len(df_validado)
        if filas_elimadas_col > 0:
            problemas.append(f"Se eliminaron {filas_elimadas_col} filas vacías en {col}")
    
    # 4. Reporte
    es_valido = len(problemas) == 0 or True  # Seguir si solo hay advertencias
    mensaje = "; ".join(problemas) if problemas else "Validación exitosa"
    
    if verbose:
        if es_valido:
            print(f"✓ Validación exitosa")
            print(f"  - Filas válidas: {len(df_validado)}")
            for problema in problemas:
                print(f"  ⚠ {problema}")
        else:
            print(f"✗ {mensaje}")
    
    return (True, mensaje, df_validado)
```

---

## 4. data_processor.map_column_variants()

**Descripción**: Mapea columnas con nombres variantes a nombres estándar.

**Parámetros**:
- `df` (DataFrame): DataFrame con columnas a mapear
- `mapeo` (dict): Diccionario con mapeo de variantes a nombre estándar
- `verbose` (bool): Mostrar cambios

**Retorna**: DataFrame con columnas mapeadas y renombradas

**Mapeo por Defecto**:
```
- operador: ReconocidoPorNombre, operador_reconocimiento, reconocido_por_nombre
- oportunidad: Cumplimiento_ANS, Oportunidad, cumplimiento_ans
- prioridad: prioridad, Prioridad
- fecha: FechaCreacion, Fecha_Creacion, fechacreacion
```

**Código**:
```python
def map_column_variants(df: pd.DataFrame, mapeo: dict = None, verbose: bool = True) -> pd.DataFrame:
    """
    Mapea columnas con nombres variantes a nombres estándar.
    
    Args:
        df: DataFrame a procesar
        mapeo: Diccionario con mapeo {nombre_estandar: [variantes]}
        verbose: Mostrar cambios
    
    Returns:
        DataFrame con columnas mapeadas
    """
    if mapeo is None:
        mapeo = {
            'operador': ['reconocidopornombre', 'operador_reconocimiento', 'reconocido_por_nombre'],
            'oportunidad': ['cumplimiento_ans', 'oportunidad'],
            'prioridad': ['prioridad'],
            'fecha': ['fechacreacion', 'fecha_creacion', 'fechacreacion']
        }
    
    df_procesado = df.copy()
    cambios_realizados = {}
    
    # Para cada nombre estándar, buscar variantes en el DataFrame
    for nombre_estandar, variantes in mapeo.items():
        for col in df_procesado.columns:
            col_norm = col.lower()
            if col_norm in variantes or col in variantes:
                if col != nombre_estandar:
                    df_procesado.rename(columns={col: nombre_estandar}, inplace=True)
                    cambios_realizados[col] = nombre_estandar
                    if verbose:
                        print(f"✓ Mapeada columna: {col} → {nombre_estandar}")
                break
    
    if not cambios_realizados and verbose:
        print("⚠ No se realizaron cambios de mapeo")
    
    return df_procesado
```

---

## 5. period_generator.create_periods()

**Descripción**: Crea períodos de ~8 días a partir de las fechas de los incidentes.

**Parámetros**:
- `df` (DataFrame): DataFrame con columna de fecha
- `fecha_column` (str): Nombre de la columna con fechas
- `dias_periodo` (int): Días aproximados por período (default: 8)
- `verbose` (bool): Mostrar períodos creados

**Retorna**: DataFrame con columna adicional "periodo" y "periodo_label"

**Ejemplos de Períodos Generados**:
- "01-08", "09-16", "17-24", "25-31" (para meses de 31 días)
- "01-08", "09-16", "17-24", "25-29" (para febrero)

**Código**:
```python
from datetime import datetime, timedelta

def create_periods(df: pd.DataFrame, fecha_column: str, dias_periodo: int = 8, 
                   verbose: bool = True) -> pd.DataFrame:
    """
    Crea períodos de ~8 días basados en fechas.
    
    Args:
        df: DataFrame a procesar
        fecha_column: Nombre de columna con fechas
        dias_periodo: Días por período (default 8)
        verbose: Mostrar períodos creados
    
    Returns:
        DataFrame con columnas "periodo" y "periodo_label" agregadas
    """
    df_procesado = df.copy()
    
    # Convertir a datetime si no lo está
    df_procesado[fecha_column] = pd.to_datetime(df_procesado[fecha_column], errors='coerce')
    
    # Obtener rango de fechas
    fecha_min = df_procesado[fecha_column].min()
    fecha_max = df_procesado[fecha_column].max()
    
    if pd.isna(fecha_min) or pd.isna(fecha_max):
        print("✗ Error: No se encontraron fechas válidas")
        return df_procesado
    
    # Crear períodos
    periodos = []
    fecha_actual = fecha_min.replace(day=1)
    
    while fecha_actual <= fecha_max:
        fecha_fin = fecha_actual + timedelta(days=dias_periodo - 1)
        dia_inicio = fecha_actual.day
        dia_fin = min(fecha_fin.day, int(pd.Timestamp(fecha_actual.year, fecha_actual.month + 1 if fecha_actual.month < 12 else 1, 1) - timedelta(days=1)).day)
        
        periodo_label = f"{dia_inicio:02d}-{dia_fin:02d}"
        periodos.append({
            'fecha_inicio': fecha_actual,
            'fecha_fin': fecha_fin,
            'label': periodo_label
        })
        
        fecha_actual = fecha_fin + timedelta(days=1)
    
    # Crear funciones para mapear fechas a períodos
    def mapear_fecha_a_periodo(fecha):
        if pd.isna(fecha):
            return None
        for periodo in periodos:
            if periodo['fecha_inicio'] <= fecha <= periodo['fecha_fin']:
                return periodo['label']
        return None
    
    # Aplicar mapeo
    df_procesado['periodo'] = df_procesado[fecha_column].apply(mapear_fecha_a_periodo)
    
    if verbose:
        print(f"✓ Períodos creados: {len(periodos)}")
        for p in periodos:
            print(f"  - {p['label']}: {p['fecha_inicio'].date()} a {p['fecha_fin'].date()}")
    
    return df_procesado
```

---

## 6. data_processor.group_by_operator_period()

**Descripción**: Agrupa incidentes por operador y período.

**Parámetros**:
- `df` (DataFrame): DataFrame con datos de incidentes
- `operador_column` (str): Nombre de columna con operadores
- `periodo_column` (str): Nombre de columna con períodos
- `verbose` (bool): Mostrar resumen

**Retorna**: Diccionario anidado {periodo: {operador: DataFrame}}

**Código**:
```python
def group_by_operator_period(df: pd.DataFrame, operador_column: str = 'operador', 
                             periodo_column: str = 'periodo', 
                             verbose: bool = True) -> dict:
    """
    Agrupa incidentes por operador y período.
    
    Args:
        df: DataFrame con datos
        operador_column: Columna con nombres de operadores
        periodo_column: Columna con período
        verbose: Mostrar resumen
    
    Returns:
        Diccionario anidado {periodo: {operador: DataFrame}}
    """
    grupos = {}
    
    # Agrupar por período primero
    for periodo, df_periodo in df.groupby(periodo_column):
        grupos[periodo] = {}
        
        # Dentro de cada período, agrupar por operador
        for operador, df_operador in df_periodo.groupby(operador_column):
            grupos[periodo][operador] = df_operador
    
    # Reporte
    if verbose:
        total_periodos = len(grupos)
        total_operadores = len(set(df[operador_column].unique()))
        total_incidentes = len(df)
        
        print(f"✓ Agrupación realizada")
        print(f"  - Períodos: {total_periodos}")
        print(f"  - Operadores únicos: {total_operadores}")
        print(f"  - Total incidentes: {total_incidentes}")
        
        # Mostrar distribución por período
        for periodo in sorted(grupos.keys()):
            cant_ops = len(grupos[periodo])
            cant_inc = sum(len(df_op) for df_op in grupos[periodo].values())
            print(f"    Período {periodo}: {cant_ops} operadores, {cant_inc} incidentes")
    
    return grupos
```

---

## 7. indicator_calculator.calculate_indicators()

**Descripción**: Calcula indicadores de oportunidad y efectividad por operador, período y prioridad.

**Parámetros**:
- `grupos` (dict): Diccionario anidado de grupos {periodo: {operador: DataFrame}}
- `oportunidad_column` (str): Columna con datos de oportunidad
- `prioridad_column` (str): Columna con niveles de prioridad
- `verbose` (bool): Mostrar cálculos

**Retorna**: DataFrame con indicadores {Período, Operador, Prioridad, Total, NoOportunos, Efectividad}

**Cálculos**:
- Total: Cantidad total de incidentes
- NoOportunos: Cantidad donde oportunidad = "No Oportuno"
- Efectividad: (Total - NoOportunos) / Total * 100

**Código**:
```python
def calculate_indicators(grupos: dict, oportunidad_column: str = 'oportunidad',
                        prioridad_column: str = 'prioridad',
                        verbose: bool = True) -> pd.DataFrame:
    """
    Calcula indicadores de oportunidad y efectividad.
    
    Args:
        grupos: Diccionario anidado con grupos de datos
        oportunidad_column: Columna con oportunidad
        prioridad_column: Columna con prioridad
        verbose: Mostrar cálculos
    
    Returns:
        DataFrame con indicadores
    """
    indicadores = []
    
    # Iterar sobre períodos y operadores
    for periodo, ops in grupos.items():
        for operador, df_operador in ops.items():
            
            # Agrupar por prioridad
            for prioridad in ['Alta', 'Media', 'Baja']:
                df_prioridad = df_operador[df_operador[prioridad_column] == prioridad]
                
                if len(df_prioridad) == 0:
                    continue
                
                total = len(df_prioridad)
                no_oportunos = len(df_prioridad[df_prioridad[oportunidad_column] == 'No Oportuno'])
                efectividad = ((total - no_oportunos) / total * 100) if total > 0 else 100
                
                indicadores.append({
                    'periodo': periodo,
                    'operador': operador,
                    'prioridad': prioridad,
                    'total': total,
                    'no_oportunos': no_oportunos,
                    'efectividad': round(efectividad, 2)
                })
    
    df_indicadores = pd.DataFrame(indicadores)
    
    if verbose:
        print(f"✓ Indicadores calculados: {len(df_indicadores)} registros")
        print(f"  - Períodos: {df_indicadores['periodo'].nunique()}")
        print(f"  - Operadores: {df_indicadores['operador'].nunique()}")
        print(f"  - Prioridades: {df_indicadores['prioridad'].nunique()}")
    
    return df_indicadores
```

---

## 8. pivot_generator.create_period_tables()

**Descripción**: Genera tablas pivote por período con indicadores por operador.

**Parámetros**:
- `df_indicadores` (DataFrame): DataFrame con indicadores calculados
- `verbose` (bool): Mostrar tablas generadas

**Retorna**: Diccionario {periodo: DataFrame_tabla_pivote}

**Estructura de Salida por Tabla**:
```
Operador | No oport. A | Efect. A | No oport. B | Efect. B | No oport. M | Efect. M | Total Inc.
---------|------------|----------|------------|----------|------------|----------|------------
```

**Código**:
```python
def create_period_tables(df_indicadores: pd.DataFrame, verbose: bool = True) -> dict:
    """
    Genera tablas pivote por período.
    
    Args:
        df_indicadores: DataFrame con indicadores
        verbose: Mostrar tablas creadas
    
    Returns:
        Diccionario {periodo: DataFrame_tabla}
    """
    tablas_por_periodo = {}
    
    # Iterar por período
    for periodo in df_indicadores['periodo'].unique():
        df_periodo = df_indicadores[df_indicadores['periodo'] == periodo].copy()
        
        # Crear estructura de tabla
        operadores = df_periodo['operador'].unique()
        tabla = pd.DataFrame({'operador': operadores})
        
        # Para cada prioridad, agregar columnas de no oportunos y efectividad
        for prioridad in ['Alta', 'Media', 'Baja']:
            df_prioridad = df_periodo[df_periodo['prioridad'] == prioridad]
            
            # Crear diccionario para merge
            no_oport_dict = dict(zip(df_prioridad['operador'], df_prioridad['no_oportunos']))
            efect_dict = dict(zip(df_prioridad['operador'], df_prioridad['efectividad']))
            
            # Agregar columnas
            col_no_oport = f'No_oport_{prioridad[0]}'
            col_efect = f'Efect_{prioridad[0]}'
            
            tabla[col_no_oport] = tabla['operador'].map(no_oport_dict).fillna(0).astype(int)
            tabla[col_efect] = tabla['operador'].map(efect_dict).fillna(0)
            tabla[col_efect] = tabla[col_efect].apply(lambda x: f"{x:.1f}%")
        
        # Agregar total de incidentes
        total_dict = {}
        for operador in operadores:
            df_op = df_periodo[df_periodo['operador'] == operador]
            total_dict[operador] = df_op['total'].sum()
        
        tabla['Total_Inc'] = tabla['operador'].map(total_dict).fillna(0).astype(int)
        
        # Reordenar columnas
        tabla = tabla[['operador', 'No_oport_A', 'Efect_A', 'No_oport_B', 'Efect_B', 
                       'No_oport_M', 'Efect_M', 'Total_Inc']]
        
        tablas_por_periodo[periodo] = tabla
    
    if verbose:
        print(f"✓ Tablas de período creadas: {len(tablas_por_periodo)}")
        for periodo in sorted(tablas_por_periodo.keys()):
            print(f"  - Período {periodo}: {len(tablas_por_periodo[periodo])} operadores")
    
    return tablas_por_periodo
```

---

## 9. excel_writer.export_indicators_to_excel()

**Descripción**: Exporta tablas de indicadores a un archivo Excel con formato.

**Parámetros**:
- `input_file_path` (str): Ruta del archivo original
- `output_file_path` (str): Ruta donde guardar el archivo procesado
- `tablas_por_periodo` (dict): Diccionario con tablas por período
- `sheet_name` (str): Nombre de la hoja destino (default: "indicador alarmas")
- `verbose` (bool): Mostrar progreso

**Retorna**: Boolean indicando éxito

**Formato Aplicado**:
- Encabezados en negrita
- Bordes en celdas
- Alineación centrada en indicadores
- Ancho automático de columnas

**Código**:
```python
from openpyxl import load_workbook
from openpyxl.styles import Font, Border, Side, Alignment, PatternFill
import shutil

def export_indicators_to_excel(input_file_path: str, output_file_path: str,
                              df_indicadores: pd.DataFrame, df_original: pd.DataFrame,
                              sheet_name: str = 'indicador alarmas') -> bool:
    """
    Exporta los indicadores calculados al archivo Excel aplicando fórmulas y estilos exactos.
    
    Args:
        input_file_path: Ruta del archivo original
        output_file_path: Ruta de destino
        df_indicadores: DataFrame con agrupaciones y conteos básicos
        df_original: DataFrame original
        sheet_name: Nombre de hoja destino
    
    Returns:
        True si fue exitoso, False en caso contrario
    """
    try:
        # Copiar archivo original
        shutil.copy(input_file_path, output_file_path)
        
        # Cargar workbook
        wb = load_workbook(output_file_path)
        
        # Renombrar hoja de origen a "alarmas" para cumplir con el esquema
        sheet_origen = wb.sheetnames[0]
        if sheet_origen != 'alarmas':
            ws_orig = wb[sheet_origen]
            ws_orig.title = 'alarmas'
        
        # Crear o limpiar hoja de indicadores
        if sheet_name in wb.sheetnames:
            del wb[sheet_name]
        ws = wb.create_sheet(sheet_name, 0)
        
        # Estilos
        title_font = Font(bold=True, size=11, name="Calibri")
        header_font = Font(bold=True, size=11, name="Calibri")
        data_font = Font(size=11, name="Calibri")
        header_fill = PatternFill(start_color="D3D3D3", end_color="D3D3D3", fill_type="solid")
        total_fill = PatternFill(start_color="F2F2F2", end_color="F2F2F2", fill_type="solid")
        
        thin_border = Border(
            left=Side(style='thin', color='D9D9D9'),
            right=Side(style='thin', color='D9D9D9'),
            top=Side(style='thin', color='D9D9D9'),
            bottom=Side(style='thin', color='D9D9D9')
        )
        
        headers = [
            'Operador', 'No oport.', 'Alta ', 'Efect.', 
            'No oport.2', 'Baja', 'Efect.3', 
            'No oport.4', 'Media', 'Efect.5', 
            'Total Incidentes gestionados'
        ]
        
        fila_actual = 1
        
        # Agrupar por período
        for periodo in sorted(df_indicadores['periodo'].unique()):
            df_p = df_indicadores[df_indicadores['periodo'] == periodo].copy()
            df_p = df_p.sort_values(by='operador')
            
            # Título del Período
            ws.cell(row=fila_actual, column=1, value=periodo).font = title_font
            fila_actual += 1
            
            # Escribir Headers
            for col_idx, h in enumerate(headers, 1):
                cell = ws.cell(row=fila_actual, column=col_idx, value=h)
                cell.font = header_font
                cell.fill = header_fill
                cell.border = thin_border
                cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
            
            ws.row_dimensions[fila_actual].height = 28
            fila_header = fila_actual
            fila_actual += 1
            
            start_data_row = fila_actual
            
            # Escribir Datos de Operadores
            for _, row in df_p.iterrows():
                ws.cell(row=fila_actual, column=1, value=row['operador']).font = data_font
                
                # Alta
                ws.cell(row=fila_actual, column=2, value=row['Alta_NoOport']).font = data_font
                ws.cell(row=fila_actual, column=3, value=row['Alta_Total']).font = data_font
                cell_ef_alta = ws.cell(row=fila_actual, column=4, value=f"=(C{fila_actual}-B{fila_actual})/C{fila_actual}")
                cell_ef_alta.font = data_font
                cell_ef_alta.number_format = '0.0%'
                
                # Baja
                ws.cell(row=fila_actual, column=5, value=row['Baja_NoOport']).font = data_font
                ws.cell(row=fila_actual, column=6, value=row['Baja_Total']).font = data_font
                cell_ef_baja = ws.cell(row=fila_actual, column=7, value=f"=IFERROR((F{fila_actual}-E{fila_actual})/F{fila_actual},1)")
                cell_ef_baja.font = data_font
                cell_ef_baja.number_format = '0.0%'
                
                # Media
                no_oport_media = row['Media_NoOport'] if row['Media_NoOport'] > 0 else None
                ws.cell(row=fila_actual, column=8, value=no_oport_media).font = data_font
                ws.cell(row=fila_actual, column=9, value=row['Media_Total']).font = data_font
                cell_ef_media = ws.cell(row=fila_actual, column=10, value=f"=IFERROR((I{fila_actual}-H{fila_actual})/I{fila_actual},1)")
                cell_ef_media.font = data_font
                cell_ef_media.number_format = '0.0%'
                
                # Total
                cell_total = ws.cell(row=fila_actual, column=11, value=f"=SUM(C{fila_actual},F{fila_actual},I{fila_actual})")
                cell_total.font = data_font
                
                # Estilo a las celdas
                for col_c in range(1, 12):
                    cell_item = ws.cell(row=fila_actual, column=col_c)
                    cell_item.border = thin_border
                    if col_c > 1:
                        cell_item.alignment = Alignment(horizontal='center')
                
                fila_actual += 1
            
            end_data_row = fila_actual - 1
            
            # Fila de Total General
            ws.cell(row=fila_actual, column=1, value="Total general").font = Font(bold=True, size=11)
            
            ws.cell(row=fila_actual, column=2, value=f"=SUM(B{start_data_row}:B{end_data_row})")
            ws.cell(row=fila_actual, column=3, value=f"=SUM(C{start_data_row}:C{end_data_row})")
            cell_tot_ef_alta = ws.cell(row=fila_actual, column=4, value=f"=(C{fila_actual}-B{fila_actual})/C{fila_actual}")
            cell_tot_ef_alta.number_format = '0.0%'
            
            ws.cell(row=fila_actual, column=5, value=f"=SUM(E{start_data_row}:E{end_data_row})")
            ws.cell(row=fila_actual, column=6, value=f"=SUM(F{start_data_row}:F{end_data_row})")
            cell_tot_ef_baja = ws.cell(row=fila_actual, column=7, value=f"=(F{fila_actual}-E{fila_actual})/F{fila_actual}")
            cell_tot_ef_baja.number_format = '0.0%'
            
            ws.cell(row=fila_actual, column=8, value=f"=SUM(H{start_data_row}:H{end_data_row})")
            ws.cell(row=fila_actual, column=9, value=f"=SUM(I{start_data_row}:I{end_data_row})")
            cell_tot_ef_media = ws.cell(row=fila_actual, column=10, value=f"=(I{fila_actual}-H{fila_actual})/I{fila_actual}")
            cell_tot_ef_media.number_format = '0.0%'
            
            ws.cell(row=fila_actual, column=11, value=f"=SUM(K{start_data_row}:K{end_data_row})")
            
            for col_c in range(1, 12):
                cell_tot = ws.cell(row=fila_actual, column=col_c)
                cell_tot.font = Font(bold=True, size=11, name="Calibri")
                cell_tot.fill = total_fill
                cell_tot.border = thin_border
                if col_c > 1:
                    cell_tot.alignment = Alignment(horizontal='center')
            
            fila_actual += 3
        
        # Ajustar anchos
        for col in range(1, 12):
            col_letter = ws.cell(row=1, column=col).column_letter
            max_len = 0
            for row in range(1, fila_actual):
                cell_val = ws.cell(row=row, column=col).value
                if cell_val is not None:
                    max_len = max(max_len, len(str(cell_val)))
            ws.column_dimensions[col_letter].width = min(max(max_len + 3, 12), 40)
        
        wb.save(output_file_path)
        return True
    except Exception as e:
        print(f"✗ Error al exportar: {str(e)}")
        return False
```

---

## 10. report_generator.create_processing_report()

**Descripción**: Genera un reporte resumido del procesamiento realizado.

**Parámetros**:
- `df_original` (DataFrame): DataFrame original de incidentes
- `grupos` (dict): Grupos procesados
- `tablas_por_periodo` (dict): Tablas generadas
- `output_file_path` (str): Ruta donde se guardó el archivo

**Retorna**: String con el reporte formateado

**Contenido del Reporte**:
- Fecha y hora de procesamiento
- Total de incidentes procesados
- Rango de fechas
- Operadores únicos
- Períodos generados
- Resumen por período
- Estado: Exitoso/Con advertencias/Error

**Código**:
```python
from datetime import datetime

def create_processing_report(df_original: pd.DataFrame, grupos: dict,
                            tablas_por_periodo: dict, output_file_path: str) -> str:
    """
    Crea un reporte de procesamiento.
    
    Args:
        df_original: DataFrame original
        grupos: Grupos procesados
        tablas_por_periodo: Tablas generadas
        output_file_path: Ruta del archivo de salida
    
    Returns:
        String con el reporte formateado
    """
    reporte = []
    reporte.append("=" * 60)
    reporte.append("REPORTE DE PROCESAMIENTO - INDICADORES ANS")
    reporte.append("=" * 60)
    reporte.append(f"Fecha y Hora: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    reporte.append("")
    
    # Resumen general
    reporte.append("RESUMEN GENERAL")
    reporte.append("-" * 60)
    reporte.append(f"Total incidentes procesados: {len(df_original)}")
    reporte.append(f"Operadores únicos identificados: {len(set(df_original['operador'].unique()))}")
    reporte.append(f"Períodos generados: {len(tablas_por_periodo)}")
    reporte.append("")
    
    # Distribución por período
    reporte.append("DISTRIBUCIÓN POR PERÍODO")
    reporte.append("-" * 60)
    for periodo in sorted(tablas_por_periodo.keys()):
        cant_ops = len(tablas_por_periodo[periodo])
        reporte.append(f"  Período {periodo}: {cant_ops} operadores")
    reporte.append("")
    
    # Detalles de salida
    reporte.append("ARCHIVO DE SALIDA")
    reporte.append("-" * 60)
    reporte.append(f"Ruta: {output_file_path}")
    reporte.append(f"Hoja: indicador alarmas")
    reporte.append("")
    
    # Estado final
    reporte.append("ESTADO FINAL")
    reporte.append("-" * 60)
    reporte.append("✓ Procesamiento exitoso")
    reporte.append("")
    reporte.append("=" * 60)
    
    return "\n".join(reporte)
```

---

## Notas de Implementación

- Todas las funciones incluyen manejo de errores básico
- Los parámetros `verbose` permiten controlar el nivel de salida
- Se recomienda usar las funciones en el orden indicado en el índice
- Cada función es independiente y reutilizable
- Se pueden agregar parámetros adicionales según necesidades futuras
