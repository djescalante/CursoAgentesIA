# AGENTS.md

Instructions and technical guidelines for AI agents working on this repository.

## Developer Environment & CLI Commands

- **Python Virtual Environment**: This repository contains a pre-configured Python virtual environment at the root folder `venvCagents`. Always execute Python scripts using this environment's Python binary:
  - Windows: `venvCagents\Scripts\python.exe`
- **Dependencies**: Package requirements are managed in `Agentes/requirements.txt`. Do not use external or experimental packages not present here.

## Execution Entrypoints

Use the following commands to execute or test each production agent:

- **Agente_Malos_Manejos**:
  `venvCagents\Scripts\python.exe Agentes/Agente_Malos_Manejos/validador_reporte.py`
- **Agente_Top_Criticidad**:
  `venvCagents\Scripts\python.exe Agentes/Agente_Top_Criticidad/ejemplos/run_report.py`
- **AgenteANS**:
  `venvCagents\Scripts\python.exe Agentes/AgenteANS/Agent/main_agent.py`

## Core Excel Toolchain Quirks

- **Binary Excel Files (.xlsb)**: The master list of ATMs is in binary Excel format (`.xlsb`). You **must** specify `engine='pyxlsb'` when reading these with Pandas:
  `pd.read_excel(file_path, sheet_name='Listado cajeros', engine='pyxlsb')`
- **Formula Injection**: When generating verified report columns (such as `Coincicde?` or efficiency indicators), do not write static boolean or numeric values. Instead, inject native Excel formulas (e.g., `=EXACT(...)` or `=IFERROR(...)`) to ensure real-time updates when human operators modify cells manually.

## Agent Business Rules & Crucial Mappings

### Agente_Malos_Manejos (Auditoría)
- **Bypass of "FUNCIONARIOS"**: If `ResponsableCierre` is `"FUNCIONARIOS"` or any of its singular/typo variations (e.g., `"FUNCIONARIO"`, `"FUCIONARIOS"`, `"FUCIONARIO"`, `"FUNCIOANRIOS"`) (case-insensitive), normalize it to `"FUNCIONARIOS"`, bypass checking the ATMs database entirely. Write `"FUNCIONARIOS"` directly into the target ATM column (`Cajeros PD` or similar) and mark `Coincicde?` as `True`.
- **Generic Monthly Databases**: Do not hardcode specific months (e.g., April, May, June) in the codebase logic, variables, or command-line parameters. Use generic parameters/variables like `primary` and `secondary/fallback` databases to ensure the script remains reusable as months progress.
- **"SUC" Administration Mapping**: In the master ATM database, the administrative value `"SUC"` represents an internal bank office. Map this string value to `"FUNCIONARIOS"` before conducting any comparisons.
- **Prefix-Based Site Classification**: Classify the site type using the first non-numeric/non-hyphen token of the `Ubicacion` string:
  - `"C"` -> ATM
  - `"S"` -> Sucursal
  - `"ED"` / `"EDF"` -> Edificio
  - Fallbacks: If no prefix is matched, search cascadingly for keywords (`"KIOSKO"`, `"GZ"`, `"EDIFICIO"`) within description, alias, sensor, and location fields. Default to `"ATM"` if none match.

### Agente_Top_Criticidad
- **SiteID Formatting**: Standardize device IDs by combining the cleaned location code (padded to 4 digits if numeric) with the standardized uppercase type (e.g., `ATM`, `SUCURSAL`, `EDIFICIO`), separated by a hyphen (e.g., `0123-ATM`).
- **Weighted Criticality Score**: Calculate the overall criticality using normalized Min-Max features and the exact weights:
  - Score = $0.35 \times \text{Frecuencia} + 0.25 \times \text{Ultimos30Dias} + 0.20 \times \text{Recency} + 0.15 \times \text{ValorPerdida} + 0.05 \times \text{Hurto}$

### AgenteANS
- **Dynamic 8-Day Period Grouping**: Group incidents dynamically based on their date. Standard periods are `1-8`, `9-15`, `16-22`, and `23-max_day_of_month` (with custom formatting rules for specific months such as Enero: `Enero 23- 29`).

## Testing & Verification

- No automated test suites (e.g., `pytest`) are configured. Verification is achieved by executing the respective entrypoint scripts with sample datasets located inside the agents' subdirectories.
