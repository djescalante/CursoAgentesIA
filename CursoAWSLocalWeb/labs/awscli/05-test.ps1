# 05-test.ps1 - Verificacion de toda la infraestructura
# Uso:  .\05-test.ps1

. .\env.ps1

Write-Host "===== 1. VPC y subredes =====" -ForegroundColor Cyan
aws ec2 describe-vpcs --vpc-ids (Get-Var "VPC_ID") --query 'Vpcs[].{VpcId:VpcId,Cidr:CidrBlock}' --output table
aws ec2 describe-subnets --filters "Name=vpc-id,Values=$(Get-Var 'VPC_ID')" --query 'Subnets[].[SubnetId,AvailabilityZone,CidrBlock]' --output table

Write-Host "`n===== 2. Instancias EC2 =====" -ForegroundColor Cyan
aws ec2 describe-instances --filters "Name=instance-id,Values=$(Get-Var 'INST_A'),$(Get-Var 'INST_B')" --query 'Reservations[].Instances[].{Id:InstanceId,State:State.Name,AZ:Placement.AvailabilityZone,Subnet:SubnetId}' --output table

Write-Host "`n===== 3. Bases de datos RDS =====" -ForegroundColor Cyan
aws rds describe-db-instances --query 'DBInstances[].[DBInstanceIdentifier,Engine,DBInstanceStatus,Endpoint.Address,Endpoint.Port]' --output table

Write-Host "`n===== 4. Load Balancer =====" -ForegroundColor Cyan
aws elbv2 describe-load-balancers --query 'LoadBalancers[].[LoadBalancerName,State.Code,Scheme,Type]' --output table
aws elbv2 describe-target-groups --query 'TargetGroups[].[TargetGroupName,Protocol,Port,VpcId]' --output table

Write-Host "`n===== 5. Servidores web (via socat, puertos publicados por floci) =====" -ForegroundColor Cyan
$logs = docker logs floci 2>&1 | Out-String
foreach ($inst in @((Get-Var "INST_A"), (Get-Var "INST_B"))) {
    $m = [regex]::Match($logs, "Published EC2 instance $inst app port 80 on host port (\d+)")
    if ($m.Success) {
        $port = [int]$m.Groups[1].Value
        try {
            $html = (Invoke-WebRequest -Uri "http://localhost:$port" -UseBasicParsing -TimeoutSec 6).Content
            Write-Host "Instancia $inst (host:$port) -> $html" -ForegroundColor Yellow
        } catch {
            Write-Host "Instancia $inst (host:$port) -> sin respuesta todavia" -ForegroundColor Red
        }
    } else {
        Write-Host "Instancia $inst -> puerto publicado no encontrado (revisa docker logs floci)" -ForegroundColor Red
    }
}

Write-Host "`n===== 6. Load Balancer (round-robin) =====" -ForegroundColor Cyan
$hits = @{}
for ($i = 0; $i -lt 6; $i++) {
    try {
        $html = (Invoke-WebRequest -Uri "http://localhost:80" -UseBasicParsing -TimeoutSec 6).Content
        $server = if ($html -match 'SERVIDOR A') { 'A' } else { 'B' }
        $hits[$server] = [int]$hits[$server] + 1
    } catch {
        Write-Host "ALB no responde en :80 -> $($_.Exception.Message)" -ForegroundColor Red
        break
    }
}
$hits.GetEnumerator() | Sort-Object Name | ForEach-Object { Write-Host "  SERVIDOR $($_.Key): $($_.Value) peticiones" -ForegroundColor Yellow }
Write-Host "`nListo. Todo verificado." -ForegroundColor Cyan
