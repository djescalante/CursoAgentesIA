# 03-rds.ps1 - Dos bases de datos RDS (PostgreSQL + MySQL) sobre las 2 AZ
# Uso:  .\03-rds.ps1

. .\env.ps1

$priv1 = Get-Var "PRIV_SUB_1"
$priv2 = Get-Var "PRIV_SUB_2"

# Limpieza previa (para que el script sea re-ejecutable)
foreach ($db in @("db-pedidos", "db-inventario")) {
    $exists = aws rds describe-db-instances --db-instance-identifier $db --query 'DBInstances[0].DBInstanceIdentifier' --output text 2>$null
    if ($exists) {
        aws rds delete-db-instance --db-instance-identifier $db --skip-final-snapshot 2>$null | Out-Null
        Write-Host "RDS previa $db eliminada" -ForegroundColor DarkYellow
    }
}
aws rds delete-db-subnet-group --db-subnet-group-name curso-db-subnets 2>$null | Out-Null

# 1. DB subnet group que cubre las 2 AZ
aws rds create-db-subnet-group `
    --db-subnet-group-name curso-db-subnets `
    --db-subnet-group-description "Subnets de base de datos del curso (2 AZ)" `
    --subnet-ids $priv1 $priv2 | Out-Null
Write-Host "DB Subnet Group: curso-db-subnets" -ForegroundColor Green

# 2. Base de datos 1: PostgreSQL
aws rds create-db-instance `
    --db-instance-identifier db-pedidos `
    --db-instance-class db.t3.micro `
    --engine postgres `
    --master-username admin `
    --master-user-password ChangeMe123! `
    --allocated-storage 20 `
    --db-subnet-group-name curso-db-subnets | Out-Null
Write-Host "RDS db-pedidos (postgres) creada" -ForegroundColor Green

# 3. Base de datos 2: MySQL
aws rds create-db-instance `
    --db-instance-identifier db-inventario `
    --db-instance-class db.t3.micro `
    --engine mysql `
    --master-username admin `
    --master-user-password ChangeMe123! `
    --allocated-storage 20 `
    --db-name db_inventario `
    --db-subnet-group-name curso-db-subnets | Out-Null
Write-Host "RDS db-inventario (mysql) creada" -ForegroundColor Green

# 4. Mostrar los endpoints
Start-Sleep -Seconds 5
aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,Engine,DBInstanceStatus,Endpoint.Address,Endpoint.Port]' --output table
Write-Host "`nConectate por ejemplo con: psql -h localhost -p 7001 -U admin -d postgres" -ForegroundColor Cyan
