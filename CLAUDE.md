# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo shape

This is a **monorepo of independent, mostly self-contained subprojects** — a set of interactive course SPAs (offline, no build step), a handful of production Python agents, and support tooling. There is no root-level build/test/lint command; each subproject has its own (or none). A root `AGENTS.md` already documents this workspace — read it first, and read a subproject's own `AGENTS.md`/`specs/` before editing content there, since **the most specific file wins**.

| Folder | What it is | Notes |
|---|---|---|
| `CursoAgentesWebV3/` | Interactive course SPA — "Agentes IA" (8 modules) | Active; has its own `AGENTS.md` + `specs/` + `tests/` (see below) |
| `CursoAWSLocalWeb/` | Interactive course SPA — "AWS Local con floci" (9 modules) | Same architecture pattern as CursoAgentesWebV3 but no AGENTS.md/tests of its own yet — apply the same rules |
| `CursoDockerWeb/` | Interactive course SPA — Docker | Same SPA pattern |
| `cursoAgentesPortable/` | Frozen, self-contained copy of a course | 🚫 Do not edit — per root `AGENTS.md` |
| `Agentes/` | Real production Python agents (not course material) | See "Python agents" below |
| `Emulador Aws Floci.io/` | Standalone draft doc/notes on floci (predates `CursoAWSLocalWeb`) | Not wired into any app; treat as reference notes only |
| `engram/` | Prebuilt binary + docs for Engram (persistent MCP memory tool) | Ships as `engram.exe`; not a source project to build |
| `scripts/` | Small Python utility scripts | — |
| `venvCagents/` | Pre-provisioned Python venv for `Agentes/` | Use its `python.exe` directly, don't recreate |
| `_archivo_md/` | Archived/old content + backups | 🚫 Historical, do not touch |

## Cross-cutting rules (all subprojects)

- Never `git commit`/`push` unless the user explicitly asks.
- Never install or delete anything outside the current working subdirectory without confirmation.
- These course SPAs are edited by hand, in place — there is no bundler/transpiler. What's in `js/data/*.js` is exactly what renders.

## Python agents (`Agentes/`)

- Always run scripts with the repo's pre-built venv, not a system Python:
  - `venvCagents\Scripts\python.exe Agentes/Agente_Malos_Manejos/validador_reporte.py`
  - `venvCagents\Scripts\python.exe Agentes/Agente_Top_Criticidad/ejemplos/run_report.py`
  - `venvCagents\Scripts\python.exe Agentes/AgenteANS/Agent/main_agent.py`
- Dependencies live only in `Agentes/requirements.txt` — don't introduce new/experimental packages.
- No automated test suite; verification = running the entrypoint script against the sample datasets that ship inside each agent's own subfolder.
- Binary Excel inputs (`.xlsb`, the ATM master list) require `engine='pyxlsb'` in `pd.read_excel`.
- Generated verification columns (e.g. `Coincicde?`) must be written as **native Excel formulas** (`=EXACT(...)`, `=IFERROR(...)`), not static booleans — operators edit cells by hand afterward and need live recalculation.
- Domain business rules baked into the agents (needed to modify them correctly, not derivable from a quick code read):
  - **Agente_Malos_Manejos**: `ResponsableCierre` values matching `FUNCIONARIOS`/typos (case-insensitive) bypass the ATM DB lookup entirely and are written straight through as a match. The DB value `"SUC"` (an internal bank office) is mapped to `"FUNCIONARIOS"` before comparison. Site type is classified from the first token of `Ubicacion`: `C`→ATM, `S`→Sucursal, `ED`/`EDF`→Edificio, else keyword search, else default ATM. Never hardcode a specific month — use generic primary/fallback DB parameters.
  - **Agente_Top_Criticidad**: `SiteID` = zero-padded (4-digit) location code + uppercase type, hyphen-joined (e.g. `0123-ATM`). Criticality score is a fixed weighted sum: `0.35*Frecuencia + 0.25*Ultimos30Dias + 0.20*Recency + 0.15*ValorPerdida + 0.05*Hurto`.
  - **AgenteANS**: groups incidents into fixed 8-day windows (`1-8`, `9-15`, `16-22`, `23-end`), with a special-cased label for January (`Enero 23-29`).

## Course SPAs (`CursoAgentesWebV3/`, `CursoAWSLocalWeb/`, `CursoDockerWeb/`)

All three follow the same architecture: a single `index.html` loads `css/style.css` + a chain of `<script>` tags from `js/data/*.js` (one file per module, each doing `COURSE_DATA.modules.push({...})`), then `js/app.js` (SPA routing/rendering) and `js/markdown.js` (a hand-rolled Markdown→HTML renderer, no external lib). **There is no build step** — editing a `js/data/modulo-N.js` file is the entire workflow for content changes.

Content lives as JS template literals (Markdown inside backtick strings), so:
- Any literal backtick inside a lesson's Markdown body **must** be escaped as `` \` `` — one unescaped backtick blanks the whole page.
- Nested code fences: the outer fence must use 4 backticks so inner ` ``` ` examples render.
- Internal links are hash-only (`#4-2`, `#recursos`, etc.) — never link to a `.md` path.

For **`CursoAgentesWebV3/`** specifically: read `specs/01-content-structure.md` and `specs/02-web-interface.md` before touching content (lesson schema, forbidden/removed CSS classes, escaping rules in full) — do not add multi-agent workflow overhead unless already following `specs/03-agent-workflow.md`. After any edit, run from that folder:
```powershell
node tests/verify-course.js
node tests/test-markdown.js
node tests/test-e2e.js
node tests/test-smoke.js
```
All four must pass, and the browser console must be error-free. `CursoAWSLocalWeb/` and `CursoDockerWeb/` don't have an equivalent test suite yet — the same escaping/fence/link rules still apply, verify by opening `index.html` and checking the browser console.

## CursoAWSLocalWeb — floci labs

`CursoAWSLocalWeb/labs/` holds runnable PowerShell labs (`awscli/`, `cloudformation/`, `terraform/`) that pair with the course modules, all driven against **floci** (`floci/floci` + `floci/floci-ui` Docker images — a free local AWS emulator, endpoint `http://localhost:4566`, dummy credentials). Start it with:
```powershell
docker compose -f CursoAWSLocalWeb/labs/floci/compose.yaml up -d
```
Each lab is numbered (`01-deploy`/`01-vpc` → ... → `99-cleanup`) and meant to run in order; `99-cleanup.ps1` tears down that lab's stack/resources only — it does not stop the `floci`/`floci-ui` containers themselves. floci persists state across restarts (`FLOCI_STORAGE_MODE: persistent`), so RDS/EC2 resources from a previous lab run can still be registered on a fresh session; check with `aws --endpoint-url http://localhost:4566 rds describe-db-instances` / `ec2 describe-instances` before assuming a clean slate, and delete via the AWS API (`delete-db-instance`, etc.) rather than `docker rm`, so floci's internal state doesn't go stale.

Known floci quirks that differ from real AWS (documented in course module 7-4, confirmed hands-on):
- CloudFormation `UserData` must be **plain text** in floci, not `Fn::Base64` — base64 is passed through undecoded and the instance fails to boot.
- Security Groups created via CloudFormation can end up with no ingress rules in floci; the ALB still reaches targets because floci resolves them by container bridge IP, not through SG rules.
- ELB Target Groups are never auto-registered — always a manual `register-targets` step after `CREATE_COMPLETE`.
- Health checks take ~2.5 min (30s interval × 5-threshold) before a target flips to `healthy`.
- Outbound HTTPS from the emulated EC2 containers (e.g. `dnf install` in UserData) can fail with a TLS verify error depending on the host's Docker network setup — if a lab's web servers never come healthy, check `docker exec <floci-ec2-container> curl -v https://...` before assuming the template or floci is at fault.

Additional quirks specific to `labs/terraform/` (documented in course module 8-3, confirmed hands-on):
- `aws_db_instance` requires the AWS provider pinned to **`~> 4.0`** in `provider.tf` — v5+ reads RDS by its internal `dbi-resource-id`, which floci doesn't resolve, and every read fails with `empty result`.
- Without `auto_minor_version_upgrade = false` on every `aws_db_instance`, floci always reports that attribute as `false` regardless of config, causing perpetual drift ("1 to change") on every `apply`.
- EC2 instances need `lifecycle { ignore_changes = [subnet_id, vpc_security_group_ids] }` — floci ignores the requested subnet/SG at launch (same root cause as the CLI/CFN labs), and without it Terraform tries to "fix" this on every apply, causing perpetual replacement.
- **`terraform destroy` can hang indefinitely** on floci v1.6.0: deleting a security group makes the AWS provider call `DescribeNetworkInterfaces` to check for attached ENIs, and floci throws an unhandled `NullPointerException` on that call under some filter combinations. Terraform's SDK retries a failing provider call forever instead of erroring out, so the process never exits on its own. If `docker logs floci` shows repeated `Unhandled error dispatching Query action DescribeNetworkInterfaces ... NullPointerException` and the stack hasn't shrunk in a few minutes, kill the `terraform.exe`/provider processes and finish the teardown by hand: `aws ec2 delete-security-group`, `delete-subnet`, then `delete-vpc` for whatever `terraform state list` still shows. `cloudformation delete-stack` hits the same floci bug once per call but tolerates it and completes normally — only Terraform's infinite-retry behavior turns it into a hang.
- Unlike `labs/awscli/` and `labs/cloudformation/`, `labs/terraform/` has no numbered `.ps1` wrapper scripts — the deploy/destroy cycle is the raw `terraform init/plan/apply/destroy` CLI, run directly as documented in lesson 8-3.
