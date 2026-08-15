# Lab CloudFormation - paso 2: registrar targets en el TargetGroup
# Nota floci: el TargetGroup creado por CloudFormation NO auto-registra las
# instancias como targets. En AWS real esto se hace con autoscaling o
# registrations manuales; aquí lo hacemos con el SDK/CLI.
# Uso: .\02-register-targets.ps1
$ErrorActionPreference = "Stop"
$EP = "http://localhost:4566"
$Stack = "curso-cfn"

Write-Host "==> Obteniendo IDs de los servidores web" -ForegroundColor Cyan
$outs = aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack --query "Stacks[0].Outputs" --output json | ConvertFrom-Json
$i1 = ($outs | Where-Object OutputKey -eq "WebServer1Id").OutputValue
$i2 = ($outs | Where-Object OutputKey -eq "WebServer2Id").OutputValue
Write-Host "    WebServer1 = $i1"
Write-Host "    WebServer2 = $i2"

Write-Host "==> Registrando targets en el TargetGroup" -ForegroundColor Cyan
$tg = aws --endpoint-url $EP elbv2 describe-target-groups --names curso-web-tg-cfn --query "TargetGroups[0].TargetGroupArn" --output text
aws --endpoint-url $EP elbv2 register-targets --target-group-arn $tg --targets Id=$i1 Id=$i2 | Out-Null

Write-Host "==> Esperando health checks (intervalo 30s, umbral 5 => ~2.5 min)" -ForegroundColor Cyan
$i = 0
do {
    Start-Sleep -Seconds 20
    $states = aws --endpoint-url $EP elbv2 describe-target-health --target-group-arn $tg --query "TargetHealthDescriptions[].TargetHealth.State" --output text
    Write-Host "    $i => $states"
    $i++
} while (($states -split "\s+" | Where-Object { $_ -ne "healthy" }) -and $i -lt 15)

if (-not ($states -split "\s+" | Where-Object { $_ -ne "healthy" })) {
    Write-Host "Targets sanos" -ForegroundColor Green
} else {
    Write-Host "!! Los targets no pasaron los health checks" -ForegroundColor Red
}
