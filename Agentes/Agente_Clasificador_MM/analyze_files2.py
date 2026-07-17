import pandas as pd

# Check some classified files
classified_files = [
    r"D:\cursoagenteClaude\Agentes\Agente_Clasificador_MM\Archivos Ejemplos\Malos Manejos Junio 2026\01. Proveedores de máquina\NCR.xlsx",
    r"D:\cursoagenteClaude\Agentes\Agente_Clasificador_MM\Archivos Ejemplos\Malos Manejos Junio 2026\03. Transportadoras\ATLAS.xlsx"
]

for f in classified_files:
    df_c = pd.read_excel(f)
    print(f"\n--- {f} ---")
    print("Columns:", list(df_c.columns))
    print("Shape:", df_c.shape)
    if df_c.shape[0] > 0:
        print("Sample row:")
        print(df_c.iloc[0].to_dict())
