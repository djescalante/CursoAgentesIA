import pandas as pd
import re
import argparse
from pathlib import Path

def parse_args():
    parser = argparse.ArgumentParser(description="Validador de Reporte de Malos Manejos")
    parser.add_argument(
        "--report", 
        type=str, 
        default="D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos/Malos Manejos Para Revision 01 al 29 Abril 2026.xlsx",
        help="Ruta al archivo Excel de reporte de malos manejos."
    )
    parser.add_argument(
        "--cajeros", 
        type=str, 
        default="D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Cajeros en Produccion/CAJEROS EN PRODUCCION ABRIL 30.xlsb",
        help="Ruta a la base de datos de cajeros en producción (.xlsb) de abril."
    )
    parser.add_argument(
        "--cajeros_secundario", 
        type=str, 
        default="D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Cajeros en Produccion/CAJEROS EN PRODUCCION MAYO 30.xlsb",
        help="Ruta a la base de datos de cajeros en producción (.xlsb) del mes secundario."
    )
    parser.add_argument(
        "--sucursales", 
        type=str, 
        default="D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Sucursales en Produccion/SUCURSALES EN PRODUCCION ABRIL 30.xlsx",
        help="Ruta a la base de datos de sucursales en producción (.xlsx)."
    )
    parser.add_argument(
        "--output", 
        type=str, 
        default="D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Para Revision 01 al 29 Abril 2026 Corregidos.xlsx",
        help="Ruta donde guardar el reporte validado y corregido."
    )
    parser.add_argument(
        "--mismatches", 
        type=str, 
        default="D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Para Revision Mismatches.xlsx",
        help="Ruta donde guardar las discrepancias para validación manual."
    )
    return parser.parse_args()

def parse_ubic_prefix(ubic):
    ubic = str(ubic).upper().strip()
    tokens = ubic.split()
    if not tokens:
        return "None"
    for token in tokens:
        # Ignorar tokens puramente numéricos de códigos y guiones
        if re.match(r'^\d+$', token) or token == '-':
            continue
        # Encontrar los prefijos estandarizados
        if token in ['C', 'S', 'ED', 'EDF']:
            return token
        else:
            # Si encontramos otra palabra, no hay prefijo de diseño
            break
    return "None"

def classify_site_type(row):
    desc = str(row.get('DescripcionAlarma', '')).upper()
    alias = str(row.get('AliasDispositivo', '')).upper()
    ubic = str(row.get('Ubicacion', '')).upper()
    sensor = str(row.get('NombreSensor', '')).upper()
    
    # Evaluar prefijo de la ubicación
    prefix = parse_ubic_prefix(ubic)
    if prefix == 'C':
        return "ATM"
    elif prefix == 'S':
        return "Sucursal"
    elif prefix in ['ED', 'EDF']:
        return "Edificio"
        
    # Caída en cascada a palabras clave en caso de prefijo ausente
    is_kiosco = any(k in f for f in [desc, alias, ubic, sensor] for k in ["KIOSKO", "KIOSCO"])
    is_gz = any(k in f for f in [desc, alias, ubic, sensor] for k in ["GZ", "GERENCIA", "ENLACE OPERATIVO", "SALON GRANADA", "MICROFINANZAS"])
    is_edificio = any(k in f for f in [desc, alias, ubic, sensor] for k in ["EDIFICIO", "EDF", "ED MEZZANINE"])
    
    if is_kiosco:
        return "Kiosco"
    if is_gz:
        return "GZ"
    if is_edificio:
        return "Edificio"
        
    return "ATM"

def main():
    args = parse_args()
    
    report_path = Path(args.report)
    
    # Detección dinámica del archivo de reporte si el por defecto no existe
    if not report_path.exists():
        default_dir = Path("D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos")
        if default_dir.exists():
            xlsx_files = [f for f in default_dir.glob("*.xlsx") if not f.name.startswith("~$")]
            if xlsx_files:
                report_path = xlsx_files[0]
                print(f"[INFO] Archivo especificado no existe. Detectado automáticamente: {report_path.name}")
                
    # Definir rutas de salida basadas dinámicamente en el nombre del reporte
    default_out = "D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Para Revision 01 al 29 Abril 2026 Corregidos.xlsx"
    if args.output == default_out:
        output_path = Path("D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados") / f"{report_path.stem} Corregidos.xlsx"
    else:
        output_path = Path(args.output)
        
    default_mis = "D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados/Malos Manejos Para Revision Mismatches.xlsx"
    if args.mismatches == default_mis:
        mismatches_path = Path("D:/cursoagenteClaude/Agentes/Agente_Malos_Manejos/Ejemplo/Malos Manejos Procesados") / f"{report_path.stem} Mismatches.xlsx"
    else:
        mismatches_path = Path(args.mismatches)
        
    cajeros_path = Path(args.cajeros)
    cajeros_sec_path = Path(args.cajeros_secundario) if args.cajeros_secundario else None
    sucursales_path = Path(args.sucursales)
    
    print(f"[INFO] Iniciando validación de reporte...")
    print(f"[INFO] Reporte de incidentes: {report_path.name}")
    print(f"[INFO] BD Cajeros (Principal): {cajeros_path.name}")
    if cajeros_sec_path:
        print(f"[INFO] BD Cajeros (Secundario): {cajeros_sec_path.name}")
    print(f"[INFO] BD Sucursales: {sucursales_path.name}")
    
    # Validar existencia de archivos
    files_to_check = [(report_path, "Reporte"), (cajeros_path, "BD Cajeros"), (sucursales_path, "BD Sucursales")]
    if cajeros_sec_path:
        files_to_check.append((cajeros_sec_path, "BD Cajeros Secundario"))
        
    for path, desc in files_to_check:
        if not path.exists():
            print(f"[ERROR] No se pudo encontrar el archivo {desc} en la ruta: {path}")
            return
            
    # 1. Cargar bases de datos en producción
    print("[INFO] Cargando bases de datos en producción...")
    
    # Cargar Cajeros Abril
    df_cajeros = pd.read_excel(cajeros_path, sheet_name='Listado cajeros', engine='pyxlsb')
    admin_col = [c for c in df_cajeros.columns if "ADMINISTRA" in c.upper()][0]
    
    cajeros_db = df_cajeros[['CODIGO', admin_col, 'FLM', 'NOMBRE']].dropna(subset=['CODIGO']).copy()
    cajeros_db['CODIGO'] = cajeros_db['CODIGO'].astype(int)
    cajeros_db = cajeros_db.rename(columns={
        admin_col: 'Admin_PDN',
        'FLM': 'FLM_PDN',
        'NOMBRE': 'Nombre_PDN'
    })
    
    # Cargar Cajeros Secundario
    cajeros_sec_db = None
    if cajeros_sec_path:
        df_cajeros_sec = pd.read_excel(cajeros_sec_path, sheet_name='Listado cajeros', engine='pyxlsb')
        admin_col_sec = [c for c in df_cajeros_sec.columns if "ADMINISTRA" in c.upper()][0]
        cajeros_sec_db = df_cajeros_sec[['CODIGO', admin_col_sec, 'FLM', 'NOMBRE']].dropna(subset=['CODIGO']).copy()
        cajeros_sec_db['CODIGO'] = cajeros_sec_db['CODIGO'].astype(int)
        cajeros_sec_db = cajeros_sec_db.rename(columns={
            admin_col_sec: 'Admin_PDN',
            'FLM': 'FLM_PDN',
            'NOMBRE': 'Nombre_PDN'
        })
    
    # Cargar Sucursales
    df_sucursales = pd.read_excel(sucursales_path, sheet_name='SUCURSALES EN PRODUCCION ABRIL ')
    sucursales_db = df_sucursales[['CODIGO_NUEVO', 'NOMBRE_ACTUAL']].dropna(subset=['CODIGO_NUEVO']).copy()
    sucursales_db['CODIGO_NUEVO'] = sucursales_db['CODIGO_NUEVO'].astype(int)
    
    # 2. Cargar reporte de malos manejos
    print("[INFO] Cargando reporte de malos manejos...")
    excel_file = pd.ExcelFile(report_path)
    matching_sheets = [s for s in excel_file.sheet_names if "MAL MANEJO" in s.upper()]
    if matching_sheets:
        sheet_name = matching_sheets[0]
    else:
        sheet_name = excel_file.sheet_names[0]
    df_report = pd.read_excel(report_path, sheet_name=sheet_name)
    
    # Normalizar ResponsableCierre (ej. "funcionario", "fucionarios" -> "FUNCIONARIOS")
    if 'ResponsableCierre' in df_report.columns:
        def normalize_resp(val):
            if pd.isna(val):
                return val
            s = str(val).strip().upper()
            if s in ["FUNCIONARIO", "FUNCIONARIOS", "FUCIONARIO", "FUCIONARIOS", "FUNCIOANRIOS"]:
                return "FUNCIONARIOS"
            return val
        df_report['ResponsableCierre'] = df_report['ResponsableCierre'].apply(normalize_resp)
    
    # Conservar el orden original y filas con códigos vacíos
    df_report['Original_Index'] = range(len(df_report))
    
    # Buscar columna de código de forma flexible (case-insensitive)
    code_cols = [c for c in df_report.columns if c.upper() == 'CODIGO']
    if not code_cols:
        print("[ERROR] No se pudo encontrar la columna de código en el reporte.")
        return
    code_col_name = code_cols[0]
    
    # Preparar columnas
    df_report['Codigo_Clean'] = pd.to_numeric(df_report[code_col_name], errors='coerce')
    
    print("[INFO] Clasificando 'Tipo de Sitio' con regla de prefijos...")
    # Calcular Tipo de Sitio
    df_report['Tipo de Sitio'] = df_report.apply(classify_site_type, axis=1)
    
    # 3. Cruzar datos
    print("[INFO] Cruzando datos con bases de datos en producción...")
    
    cajeros_dict = cajeros_db.set_index('CODIGO').to_dict(orient='index')
    cajeros_sec_dict = cajeros_sec_db.set_index('CODIGO').to_dict(orient='index') if cajeros_sec_db is not None else {}
    sucursales_codes = set(sucursales_db['CODIGO_NUEVO'])
    
    cajeros_pdn_list = []
    coincide_list = []
    
    for idx, row in df_report.iterrows():
        code = row['Codigo_Clean']
        resp_cierre = str(row['ResponsableCierre']).strip().upper() if not pd.isna(row['ResponsableCierre']) else "NAN"
        
        # NUEVO AJUSTE: Si ResponsableCierre es FUNCIONARIOS, no se valida con producción.
        # Se escribe directamente "FUNCIONARIOS" en la columna de Cajeros PD y Coincicde? = True.
        if resp_cierre == "FUNCIONARIOS":
            cajeros_pdn_list.append("FUNCIONARIOS")
            coincide_list.append(True)
            continue
            
        if pd.isna(code):
            cajeros_pdn_list.append(None)
            coincide_list.append(False)
            continue
            
        code = int(code)
        
        val_coincide = False
        val_cajeros_pd = None
        found_in_pass1 = False
        
        # Clasificar tipo de responsable
        is_flm_type = resp_cierre in ['NCR', 'DIEBOLD', 'BELLTECH']
        is_admin_type = resp_cierre in ['ATLAS', 'BRINKS', 'TRANSBANK', 'VATCO', 'FUNCIONARIOS', 'SUC']
        
        # Pasada 1: Validar contra Abril (cajeros_dict) y Sucursales (sucursales_codes)
        # Caso A: Código existe en cajeros Abril
        if code in cajeros_dict:
            found_in_pass1 = True
            admin_val = str(cajeros_dict[code]['Admin_PDN']).strip().upper()
            flm_val = str(cajeros_dict[code]['FLM_PDN']).strip().upper()
            
            # Mapeo SUC -> FUNCIONARIOS
            if admin_val == "SUC":
                admin_val = "FUNCIONARIOS"
                
            # Validar coincidencia estricta
            if is_flm_type:
                val_coincide = (resp_cierre == flm_val)
                val_cajeros_pd = flm_val
            elif is_admin_type:
                val_coincide = (resp_cierre == admin_val)
                val_cajeros_pd = admin_val
            else:
                # Caso de respaldo si es vacío o desconocido
                val_coincide = (resp_cierre == admin_val or resp_cierre == flm_val)
                val_cajeros_pd = admin_val if admin_val != "NAN" else flm_val
                
        # Caso B: Código existe en sucursales
        elif code in sucursales_codes:
            found_in_pass1 = True
            val_cajeros_pd = "FUNCIONARIOS"
            if resp_cierre == "FUNCIONARIOS":
                val_coincide = True
            else:
                val_coincide = False
                
        # Pasada 2: Si no coincide o no se encontró en la pasada 1, validar contra BD Secundaria
        if (not val_coincide) and (cajeros_sec_dict is not None) and (code in cajeros_sec_dict):
            admin_val_sec = str(cajeros_sec_dict[code]['Admin_PDN']).strip().upper()
            flm_val_sec = str(cajeros_sec_dict[code]['FLM_PDN']).strip().upper()
            
            if admin_val_sec == "SUC":
                admin_val_sec = "FUNCIONARIOS"
                
            if is_flm_type:
                val_coincide = (resp_cierre == flm_val_sec)
                val_cajeros_pd = flm_val_sec
            elif is_admin_type:
                val_coincide = (resp_cierre == admin_val_sec)
                val_cajeros_pd = admin_val_sec
            else:
                val_coincide = (resp_cierre == admin_val_sec or resp_cierre == flm_val_sec)
                val_cajeros_pd = admin_val_sec if admin_val_sec != "NAN" else flm_val_sec
        elif (not found_in_pass1) and (not val_coincide):
            val_cajeros_pd = None
            val_coincide = False
            
        cajeros_pdn_list.append(val_cajeros_pd)
        coincide_list.append(val_coincide)
            
    # Detectar dinámicamente si existe la columna "Cajeros PD" o "Cajeros PDN" en las originales
    cajeros_pd_cols = [c for c in df_report.columns if "CAJEROS PD" in c.upper()]
    cajeros_pd_col_name = cajeros_pd_cols[0] if cajeros_pd_cols else "Cajeros PD"
            
    df_report[cajeros_pd_col_name] = cajeros_pdn_list
    df_report['Coincicde?'] = coincide_list
    
    # Limpieza final de columnas auxiliares
    df_report = df_report.drop(columns=['Original_Index', 'Codigo_Clean'])
    
    # 4. Guardar Reporte Completo
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Reordenar las columnas para asegurar que 'Tipo de Sitio' esté después de 'codigo'
    cols = list(df_report.columns)
    if 'Tipo de Sitio' in cols:
        cols.remove('Tipo de Sitio')
        idx_codigo = cols.index(code_col_name)
        cols.insert(idx_codigo + 1, 'Tipo de Sitio')
        
    # Colocar Cajeros PD/PDN y Coincicde? después de ResponsableCierre
    resp_cols = [c for c in cols if c.upper() == 'RESPONSABLECIERRE']
    if resp_cols:
        resp_col_name = resp_cols[0]
        if cajeros_pd_col_name in cols:
            cols.remove(cajeros_pd_col_name)
        if 'Coincicde?' in cols:
            cols.remove('Coincicde?')
        idx_resp = cols.index(resp_col_name)
        cols.insert(idx_resp + 1, cajeros_pd_col_name)
        cols.insert(idx_resp + 2, 'Coincicde?')
        
    df_report = df_report[cols]
    
    # 5. Filtrar Mismatches antes de reemplazar por fórmulas
    mismatches_df = df_report[df_report['Coincicde?'] == False].copy()

    # Función auxiliar para convertir índice de columna a letra de Excel
    def get_col_letter(col_idx):
        col_idx += 1
        letter = ""
        while col_idx > 0:
            col_idx, remainder = divmod(col_idx - 1, 26)
            letter = chr(65 + remainder) + letter
        return letter
        
    idx_resp = cols.index(resp_col_name) if resp_cols else -1
    idx_cajeros = cols.index(cajeros_pd_col_name) if cajeros_pd_col_name in cols else -1
    
    if idx_resp != -1 and idx_cajeros != -1:
        letter_resp = get_col_letter(idx_resp)
        letter_cajeros = get_col_letter(idx_cajeros)
        
        # Generar fórmulas para el reporte completo
        formulas_full = [
            f'=EXACT(TRIM(UPPER({letter_resp}{i+2})), TRIM(UPPER({letter_cajeros}{i+2})))'
            for i in range(len(df_report))
        ]
        df_report['Coincicde?'] = formulas_full
        
        # Generar fórmulas para el reporte de discrepancias
        formulas_mismatches = [
            f'=EXACT(TRIM(UPPER({letter_resp}{i+2})), TRIM(UPPER({letter_cajeros}{i+2})))'
            for i in range(len(mismatches_df))
        ]
        mismatches_df['Coincicde?'] = formulas_mismatches
        
    print(f"[INFO] Guardando reporte completo validado en: {output_path}")
    try:
        df_report.to_excel(output_path, sheet_name=sheet_name, index=False)
    except PermissionError:
        alternative_output = output_path.parent / (output_path.stem + "_nuevo" + output_path.suffix)
        print(f"[WARNING] Permiso denegado al guardar en {output_path}. El archivo puede estar abierto en Excel.")
        print(f"[INFO] Guardando en ruta alternativa: {alternative_output}")
        df_report.to_excel(alternative_output, sheet_name=sheet_name, index=False)
    
    print(f"[INFO] Guardando reporte de discrepancias ({len(mismatches_df)} filas) en: {mismatches_path}")
    try:
        mismatches_df.to_excel(mismatches_path, sheet_name="Mismatches", index=False)
    except PermissionError:
        alternative_mismatches = mismatches_path.parent / (mismatches_path.stem + "_nuevo" + mismatches_path.suffix)
        print(f"[WARNING] Permiso denegado al guardar en {mismatches_path}. El archivo puede estar abierto en Excel.")
        print(f"[INFO] Guardando discrepancias en ruta alternativa: {alternative_mismatches}")
        mismatches_df.to_excel(alternative_mismatches, sheet_name="Mismatches", index=False)
    
    print("[SUCCESS] Proceso de validación finalizado con éxito.")
    
if __name__ == "__main__":
    main()
