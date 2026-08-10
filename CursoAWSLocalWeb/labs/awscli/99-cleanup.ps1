# 99-cleanup.ps1 - Elimina toda la infraestructura del curso (teardown)
# Uso:  .\99-cleanup.ps1

. .\env.ps1

# 1. Load Balancer + listener + target group
$lb = Get-Var "LB_ARN"
if ($lb) { aws elbv2 delete-load-balancer --load-balancer-arn $lb | Out-Null; Write-Host "ALB eliminado" -ForegroundColor DarkYellow }
$tg = Get-Var "TG_ARN"
if ($tg) { aws elbv2 delete-target-group --target-group-arn $tg | Out-Null; Write-Host "Target group eliminado" -ForegroundColor DarkYellow }

# 2. Bases de datos RDS
foreach ($db in @("db-pedidos", "db-inventario")) {
    $exists = aws rds describe-db-instances --db-instance-identifier $db --query 'DBInstances[0].DBInstanceIdentifier' --output text 2>$null
    if ($exists) {
        aws rds delete-db-instance --db-instance-identifier $db --skip-final-snapshot | Out-Null
        Write-Host "RDS $db eliminada" -ForegroundColor DarkYellow
    }
}
aws rds delete-db-subnet-group --db-subnet-group-name curso-db-subnets 2>$null | Out-Null

# 3. Instancias EC2
$instA = Get-Var "INST_A"; $instB = Get-Var "INST_B"
$instances = @()
if ($instA) { $instances += $instA }
if ($instB) { $instances += $instB }
if ($instances.Count -gt 0) {
    aws ec2 terminate-instances --instance-ids $instances | Out-Null
    Write-Host "Instancias terminadas: $($instances -join ', ')" -ForegroundColor DarkYellow
}
aws ec2 delete-key-pair --key-name (Get-Var "KEY_NAME") 2>$null | Out-Null

# 4. Security groups (primero las reglas, luego el grupo)
$sgLb = Get-Var "SG_LB"; $sgWeb = Get-Var "SG_WEB"
if ($sgLb) {
    aws ec2 revoke-security-group-ingress --group-id $sgLb --protocol tcp --port 80 --cidr 0.0.0.0/0 2>$null | Out-Null
    aws ec2 delete-security-group --group-id $sgLb 2>$null | Out-Null
    Write-Host "SG ALB eliminado" -ForegroundColor DarkYellow
}
if ($sgWeb) {
    aws ec2 delete-security-group --group-id $sgWeb 2>$null | Out-Null
    Write-Host "SG servidores eliminado" -ForegroundColor DarkYellow
}

# 5. Red: subredes, route table, IGW, VPC
foreach ($sub in @((Get-Var "PRIV_SUB_2"), (Get-Var "PRIV_SUB_1"), (Get-Var "PUB_SUB_2"), (Get-Var "PUB_SUB_1"))) {
    if ($sub) { aws ec2 delete-subnet --subnet-id $sub 2>$null | Out-Null }
}
$rt = Get-Var "RT_PUBLIC"
if ($rt) {
    foreach ($assoc in @(aws ec2 describe-route-tables --route-table-ids $rt --query 'RouteTables[0].Associations[].RouteTableAssociationId' --output text)) {
        if ($assoc -and $assoc -notmatch 'rtbassoc-') { aws ec2 disassociate-route-table --association-id $assoc 2>$null | Out-Null }
    }
    aws ec2 delete-route-table --route-table-id $rt 2>$null | Out-Null
}
$igw = Get-Var "IGW_ID"
if ($igw) {
    aws ec2 detach-internet-gateway --internet-gateway-id $igw --vpc-id (Get-Var "VPC_ID") 2>$null | Out-Null
    aws ec2 delete-internet-gateway --internet-gateway-id $igw 2>$null | Out-Null
}
$vpc = Get-Var "VPC_ID"
if ($vpc) { aws ec2 delete-vpc --vpc-id $vpc 2>$null | Out-Null; Write-Host "VPC eliminada" -ForegroundColor DarkYellow }

Remove-Item -Path $script:VARS_FILE -ErrorAction SilentlyContinue
Write-Host "`nLimpieza completa." -ForegroundColor Cyan
