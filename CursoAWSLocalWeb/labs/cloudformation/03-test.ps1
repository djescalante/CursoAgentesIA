# Lab CloudFormation - paso 3: probar el balanceo round-robin
# Uso: .\03-test.ps1
$ErrorActionPreference = "Stop"
$EP = "http://localhost:4566"
$Stack = "curso-cfn"

Write-Host "==> URLs de acceso" -ForegroundColor Cyan
$dns = aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack --query "Stacks[0].Outputs[?OutputKey=='AlbDnsName'].OutputValue" --output text
Write-Host "    ALB: http://$dns"

Write-Host "==> Lanzando 6 peticiones (esperado: 3x A, 3x B)" -ForegroundColor Cyan
$counts = @{}
for ($i = 0; $i -lt 6; $i++) {
    $r = Invoke-WebRequest -Uri "http://$dns" -UseBasicParsing -TimeoutSec 5
    $m = ($r.Content -replace "<[^>]+>", "").Trim()
    $key = if ($m -match "SERVIDOR A") { "A" } elseif ($m -match "SERVIDOR B") { "B" } else { "?" }
    $counts[$key] = [int]$counts[$key] + 1
    Write-Host "    resp $i => $m"
}
Write-Host ""
Write-Host "Resumen: A=$($counts["A"])  B=$($counts["B"])" -ForegroundColor Green
if ($counts["A"] -eq 3 -and $counts["B"] -eq 3) {
    Write-Host "ROUND-ROBIN CORRECTO" -ForegroundColor Green
} else {
    Write-Host "!! El balanceo no es 3/3. Revisa los health checks." -ForegroundColor Yellow
}
