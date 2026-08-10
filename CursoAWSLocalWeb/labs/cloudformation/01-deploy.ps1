# Lab CloudFormation - paso 1: desplegar el stack
# Curso "AWS Local con floci" - VPC 2 AZ + 2 EC2 + 2 RDS + ALB
# Uso: .\01-deploy.ps1
$ErrorActionPreference = "Continue"
$EP = "http://localhost:4566"
$Stack = "curso-cfn"
$Template = Join-Path $PSScriptRoot "template.yaml"

Write-Host "==> Validando plantilla" -ForegroundColor Cyan
aws --endpoint-url $EP cloudformation validate-template --template-body file://$Template >$null 2>$null
if ($LASTEXITCODE -ne 0) { throw "template inválida" }
Write-Host "    OK"

# Idempotencia: si existe un stack con el mismo nombre, se borra primero
aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack >$null 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "==> Borrando stack anterior ($Stack)..." -ForegroundColor Yellow
    aws --endpoint-url $EP cloudformation delete-stack --stack-name $Stack | Out-Null
    do { Start-Sleep -Seconds 4
        $null = aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack --query "Stacks[0].StackStatus" --output text 2>$null
    } while ($LASTEXITCODE -eq 0)
}

Write-Host "==> Creando stack $Stack ..." -ForegroundColor Cyan
aws --endpoint-url $EP cloudformation create-stack --stack-name $Stack `
    --template-body file://$Template `
    --parameters ParameterKey=Az1,ParameterValue=us-east-1a `
                 ParameterKey=Az2,ParameterValue=us-east-1b `
    --capabilities CAPABILITY_IAM

$i = 0
do {
    Start-Sleep -Seconds 5
    $s = aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack --query "Stacks[0].StackStatus" --output text 2>$null
    Write-Host "    estado: $s"
    $i++
} while ($s -match "IN_PROGRESS" -and $i -lt 90)
if ($s -ne "CREATE_COMPLETE") {
    Write-Host "!! El stack no quedó CREATE_COMPLETE. Revisa:" -ForegroundColor Red
    aws --endpoint-url $EP cloudformation describe-stack-events --stack-name $Stack `
        --query "StackEvents[?ResourceStatus=='CREATE_FAILED'].[LogicalResourceId,ResourceStatusReason]" --output table
    throw "deploy fallido"
}

Write-Host ""
Write-Host "Stack $Stack => $s" -ForegroundColor Green
Write-Host "Outputs:" -ForegroundColor Cyan
aws --endpoint-url $EP cloudformation describe-stacks --stack-name $Stack --query "Stacks[0].Outputs" --output table
