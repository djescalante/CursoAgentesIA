# Lab CloudFormation - teardown: eliminar el stack y todos sus recursos
# Uso: .\99-cleanup.ps1
$ErrorActionPreference = "Continue"
$EP = "http://localhost:4566"
$Stack = "curso-cfn"

aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack >$null 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No existe el stack $Stack. Nada que borrar." -ForegroundColor Yellow
    exit 0
}

Write-Host "==> Eliminando stack $Stack ..." -ForegroundColor Cyan
aws --endpoint-url $EP cloudformation delete-stack --stack-name $Stack | Out-Null

$i = 0
$gone = $false
do {
    Start-Sleep -Seconds 5
    $s = aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack --query "Stacks[0].StackStatus" --output text 2>$null
    if ($LASTEXITCODE -ne 0) { $gone = $true; break }
    Write-Host "    estado: $s"
    $i++
} while ($s -eq "DELETE_IN_PROGRESS" -and $i -lt 60)

if ($gone) {
    Write-Host "Stack eliminado" -ForegroundColor Green
} else {
    Write-Host "Borrado incompleto. Estado final: $s" -ForegroundColor Yellow
}
