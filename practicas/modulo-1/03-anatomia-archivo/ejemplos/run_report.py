import pandas as pd
import numpy as np
# pyrefly: ignore [missing-import]
import matplotlib.pyplot as plt
import seaborn as sns
from pathlib import Path

# Paths
base_path = Path(__file__).parent.resolve()
input_file = base_path / "1. BD_Fraudes (1).xlsx"
excel_output = base_path / "fraudes_ranking_ubicacion.xlsx"
plot_output = base_path / "top_criticidad.png"


# 1. Load data
print("Cargando datos...")
df = pd.read_excel(input_file)

# Inspect columns and map them
cols = {c.lower().replace("ó", "o").replace("é", "e").strip(): c for c in df.columns}

mapping = {}
for term, standard in [
    ("fecha", "fecha"),
    ("codigo", "codigo"),
    ("tipo", "tipo"),
    ("nombre", "nombre"),
    ("ubicacion", "nombre"),
    ("regional", "regional"),
    ("hurto", "hurto"),
    ("valor perdida", "perdida"),
    ("perdida", "perdida")
]:
    # Check matches
    for k, original in cols.items():
        if term in k:
            mapping[standard] = original
            break

print("Mapeo de columnas detectado:", mapping)

# Rename to standard for calculation
df_clean = df.rename(columns={v: k for k, v in mapping.items()})

# 2. Normalise and Clean
print("Normalizando y limpiando...")
df_clean["codigo_clean"] = df_clean["codigo"].astype(str).str.replace(r"\D", "", regex=True)
# pad with zeros
df_clean["codigo_clean"] = df_clean["codigo_clean"].apply(lambda x: x.zfill(4) if x.isdigit() else x)

# normalise type
df_clean["tipo_normalizado"] = df_clean["tipo"].astype(str).str.upper().str.strip()
df_clean["tipo_normalizado"] = df_clean["tipo_normalizado"].replace({
    "CAJERO": "ATM", "ATN": "ATM", "ATMS": "ATM", "SUCURSALES": "SUCURSAL"
})

# SiteID
df_clean["SiteID"] = df_clean["codigo_clean"] + "-" + df_clean["tipo_normalizado"]

# Dates
df_clean["fecha"] = pd.to_datetime(df_clean["fecha"], errors="coerce")
fecha_corte = df_clean["fecha"].max()
print("Fecha de corte detectada:", fecha_corte.strftime("%Y-%m-%d"))

# Value loss
df_clean["perdida"] = pd.to_numeric(df_clean["perdida"], errors="coerce").fillna(0)

# Hurto flag
df_clean["hurto_binary"] = df_clean["hurto"].astype(str).str.upper().str.strip().apply(lambda x: 1 if "S" in x else 0)

# Sort by date to get most recent location label
df_clean = df_clean.sort_values("fecha")
site_names = df_clean.groupby("SiteID")["nombre"].last().to_dict()
site_regions = df_clean.groupby("SiteID")["regional"].last().to_dict()

# 3. Calculate metrics per SiteID
print("Calculando métricas por sitio...")
site_groups = df_clean.groupby("SiteID")

metrics = []
for site_id, group in site_groups:
    total_inc = len(group)
    
    # Recency (last occurrence)
    last_date = group["fecha"].max()
    dias_desde_ultima = (fecha_corte - last_date).days
    
    # 30 days activity
    inc_30d = len(group[group["fecha"] >= (fecha_corte - pd.Timedelta(days=30))])
    
    # Loss
    perdida_total = group["perdida"].sum()
    
    # Hurto proportion
    hurto_ratio = group["hurto_binary"].mean()
    
    metrics.append({
        "SiteID": site_id,
        "ubicacion": site_names.get(site_id, "Desconocido"),
        "regional": site_regions.get(site_id, "Desconocido"),
        "total_incidentes": total_inc,
        "inc_ult_30d": inc_30d,
        "ultima_ocurrencia": last_date,
        "dias_desde_ultima": dias_desde_ultima,
        "valor_perdida_total": perdida_total,
        "hurto_ratio": hurto_ratio
    })

df_metrics = pd.DataFrame(metrics)

# 4. Normalization Min-Max
print("Aplicando normalización y cálculo de score...")
def min_max_norm(series, invert=False):
    if series.max() == series.min():
        return pd.Series(0.0, index=series.index)
    norm = (series - series.min()) / (series.max() - series.min())
    if invert:
        return 1.0 - norm
    return norm

df_metrics["frecuencia_norm"] = min_max_norm(df_metrics["total_incidentes"])
df_metrics["ultimos30d_norm"] = min_max_norm(df_metrics["inc_ult_30d"])
df_metrics["recency_norm"] = min_max_norm(df_metrics["dias_desde_ultima"], invert=True)
df_metrics["perdida_norm"] = min_max_norm(df_metrics["valor_perdida_total"])
df_metrics["hurto_norm"] = min_max_norm(df_metrics["hurto_ratio"])

# Weighting formula
df_metrics["criticality_score"] = (
    0.35 * df_metrics["frecuencia_norm"] +
    0.25 * df_metrics["ultimos30d_norm"] +
    0.20 * df_metrics["recency_norm"] +
    0.15 * df_metrics["perdida_norm"] +
    0.05 * df_metrics["hurto_norm"]
)

# Round score
df_metrics["criticality_score"] = df_metrics["criticality_score"].round(3)

# Sort full ranking
df_ranking = df_metrics.sort_values(
    by=["criticality_score", "total_incidentes", "ultima_ocurrencia"], 
    ascending=[False, False, False]
).reset_index(drop=True)

# Select top 5
df_top5 = df_ranking.head(5).copy()

print("\n--- TOP 5 SITIOS CRÍTICOS ---")
for idx, row in df_top5.iterrows():
    print(f"{idx+1}. {row['ubicacion']} | SiteID: {row['SiteID']} | Score: {row['criticality_score']} | Inc: {row['total_incidentes']} | Perdida: ${row['valor_perdida_total']:,.0f} | Dias desde ult: {row['dias_desde_ultima']}")

# 5. Save Excel
print("\nGuardando Excel...")
with pd.ExcelWriter(excel_output, engine="openpyxl") as writer:
    # Ranking Completo
    df_ranking.to_excel(writer, sheet_name="Ranking_Completo", index=False)
    # Top 5 Global
    df_top5.to_excel(writer, sheet_name="Top5_Global_Ubicacion", index=False)
    
    # Top 5 por Región
    regions = df_ranking["regional"].unique()
    region_top5_list = []
    for r in regions:
        r_df = df_ranking[df_ranking["regional"] == r].head(5)
        region_top5_list.append(r_df)
    df_region_top5 = pd.concat(region_top5_list).reset_index(drop=True)
    df_region_top5.to_excel(writer, sheet_name="Top5_por_Region_Ubicacion", index=False)

# 6. Generate Plot
print("Generando gráfica de barras...")
plt.figure(figsize=(10, 6))

# Order ascending for horizontal bars (descending score but plotted from bottom to top)
df_plot = df_top5.iloc[::-1].copy()

# Add labels
labels = []
for _, row in df_plot.iterrows():
    # Extract code and type from SiteID
    code, stype = row["SiteID"].split("-")
    label = f"{row['ubicacion']} | {stype} | {code}\n({row['total_incidentes']} inc., pérdida: ${row['valor_perdida_total']:,.0f})"
    labels.append(label)

bars = plt.barh(labels, df_plot["criticality_score"], color="#b30000", edgecolor="black")

plt.xlim(0.0, 1.0)
plt.xlabel("Puntaje de criticidad (0-1)", fontsize=11, fontweight="bold")
plt.ylabel("Ubicación | Tipo | Código", fontsize=11, fontweight="bold")
plt.title(f"FRAUDES/SEGURIDAD — Top 5 (global) — UBICACIÓN | TIPO | CÓDIGO\n(Corte al {fecha_corte.strftime('%Y-%m-%d')})", fontsize=12, fontweight="bold", pad=15)

# Add score labels on top of the bars
for bar in bars:
    width = bar.get_width()
    plt.text(width + 0.01, bar.get_y() + bar.get_height()/2, f"{width:.3f}", 
             va="center", ha="left", fontsize=10, fontweight="bold")

plt.grid(axis="x", linestyle="--", alpha=0.5)
plt.tight_layout()
plt.savefig(plot_output, dpi=150)
plt.close()

print(f"Gráfica guardada en: {plot_output}")
print("¡Proceso finalizado con éxito!")
