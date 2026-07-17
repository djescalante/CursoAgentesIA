import pandas as pd
import json

base_file = r"D:\cursoagenteClaude\Agentes\Agente_Clasificador_MM\Archivos Ejemplos\Malos Manejos Junio 2026\00. Malos Manejos\Malos Manejos JUNIO.xlsx"

# Read base file headers and some rows
df_base = pd.read_excel(base_file)

info = {
    'base_shape': df_base.shape,
    'base_columns': list(df_base.columns),
    'base_sample': df_base.head(5).to_dict('records')
}

print(json.dumps(info, indent=2, default=str))

# Check some classified files
classified_files = [
    r"D:\cursoagenteClaude\Agentes\Agente_Clasificador_MM\Archivos Ejemplos\Malos Manejos Junio 2026\01. Proveedores de máquina\NCR.xlsx",
    r"D:\cursoagenteClaude\Agentes\Agente_Clasificador_MM\Archivos Ejemplos\Malos Manejos Junio 2026\03. Transportadoras\ATLAS.xlsx"
]

for f in classified_files:
    df_c = pd.read_excel(f)
    print(f"\n--- {f} ---")
    print("Columns match base:", list(df_c.columns) == list(df_base.columns))
    print("Sample values in 'Proveedor' or similar columns:")
    # print unique values for some columns to see filtering logic
    for col in df_c.columns:
        if 'prov' in col.lower() or 'transp' in col.lower() or 'responsable' in col.lower():
            print(f"Col: {col}, Unique values: {df_c[col].unique()}")

