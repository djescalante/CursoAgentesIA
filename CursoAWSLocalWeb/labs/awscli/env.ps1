# env.ps1 - Variables de entorno de AWS apuntando a floci
# No requiere credenciales reales: floci acepta cualquier valor no vacío.
$env:AWS_ENDPOINT_URL    = "http://localhost:4566"
$env:AWS_ACCESS_KEY_ID   = "test"
$env:AWS_SECRET_ACCESS_KEY = "test"
$env:AWS_DEFAULT_REGION  = "us-east-1"

# Archivo de estado donde los scripts guardan/leen los IDs creados (formato JSON)
$script:VARS_FILE = Join-Path $PSScriptRoot "vars.json"

function Set-Var($name, $value) {
    $vars = @{}
    if (Test-Path $script:VARS_FILE) {
        $obj = Get-Content $script:VARS_FILE -Raw | ConvertFrom-Json
        if ($obj) { $obj.PSObject.Properties | ForEach-Object { $vars[$_.Name] = [string]$_.Value } }
    }
    $vars[$name] = [string]$value
    $vars | ConvertTo-Json | Set-Content -Path $script:VARS_FILE -Encoding UTF8
}

function Get-Var($name) {
    if (Test-Path $script:VARS_FILE) {
        $obj = Get-Content $script:VARS_FILE -Raw | ConvertFrom-Json
        if ($obj) {
            $prop = $obj.PSObject.Properties[$name]
            if ($prop) { return [string]$prop.Value }
        }
    }
    return $null
}
