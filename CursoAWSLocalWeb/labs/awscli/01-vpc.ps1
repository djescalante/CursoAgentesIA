# 01-vpc.ps1 - Red del curso: VPC + 2 AZ + subredes públicas/privadas + IGW + rutas + SG
# Uso:  .\01-vpc.ps1   (debe ejecutarse desde labs/awscli)

. .\env.ps1

# Limpieza previa: si ya hay una VPC del curso, se elimina para re-ejecutar limpio
$oldVpc = Get-Var "VPC_ID"
if ($oldVpc) {
    Write-Host "Eliminando VPC anterior $oldVpc..." -ForegroundColor DarkYellow
    $subs = @((aws ec2 describe-subnets --filters "Name=vpc-id,Values=$oldVpc" --query 'Subnets[].SubnetId' --output text) -split '\s+')
    foreach ($s in $subs) { if ($s) { aws ec2 delete-subnet --subnet-id $s 2>$null | Out-Null } }
    $igw = Get-Var "IGW_ID"
    if ($igw) { aws ec2 detach-internet-gateway --internet-gateway-id $igw --vpc-id $oldVpc 2>$null | Out-Null; aws ec2 delete-internet-gateway --internet-gateway-id $igw 2>$null | Out-Null }
    $rt = Get-Var "RT_PUBLIC"
    if ($rt) { aws ec2 delete-route-table --route-table-id $rt 2>$null | Out-Null }
    $sg = Get-Var "SG_WEB"
    if ($sg) { aws ec2 delete-security-group --group-id $sg 2>$null | Out-Null }
    $sgLb = Get-Var "SG_LB"
    if ($sgLb) { aws ec2 delete-security-group --group-id $sgLb 2>$null | Out-Null }
    aws ec2 delete-vpc --vpc-id $oldVpc 2>$null | Out-Null
}

# 1. VPC 10.0.0.0/16
$vpc = (aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=curso-vpc}]" --query 'Vpc.VpcId' --output text)
Set-Var "VPC_ID" $vpc
Write-Host "VPC creada: $vpc" -ForegroundColor Green

# 2. Zonas de disponibilidad (floci expone us-east-1a y us-east-1b)
$az1 = (aws ec2 describe-availability-zones --query 'AvailabilityZones[0].ZoneName' --output text)
$az2 = (aws ec2 describe-availability-zones --query 'AvailabilityZones[1].ZoneName' --output text)
Set-Var "AZ1" $az1
Set-Var "AZ2" $az2
Write-Host "AZs: $az1 / $az2" -ForegroundColor Green

# 3. Subredes: 2 publicas (servidores web) + 2 privadas (bases de datos)
$pub1 = (aws ec2 create-subnet --vpc-id $vpc --cidr-block 10.0.1.0/24  --availability-zone $az1 --query 'Subnet.SubnetId' --output text)
$pub2 = (aws ec2 create-subnet --vpc-id $vpc --cidr-block 10.0.2.0/24  --availability-zone $az2 --query 'Subnet.SubnetId' --output text)
$priv1 = (aws ec2 create-subnet --vpc-id $vpc --cidr-block 10.0.11.0/24 --availability-zone $az1 --query 'Subnet.SubnetId' --output text)
$priv2 = (aws ec2 create-subnet --vpc-id $vpc --cidr-block 10.0.12.0/24 --availability-zone $az2 --query 'Subnet.SubnetId' --output text)
Set-Var "PUB_SUB_1" $pub1; Set-Var "PUB_SUB_2" $pub2
Set-Var "PRIV_SUB_1" $priv1; Set-Var "PRIV_SUB_2" $priv2
Write-Host "Subredes: pub1=$pub1 pub2=$pub2 priv1=$priv1 priv2=$priv2" -ForegroundColor Green

# 4. Internet Gateway + asociacion
$igw = (aws ec2 create-internet-gateway --query 'InternetGateway.InternetGatewayId' --output text)
aws ec2 attach-internet-gateway --internet-gateway-id $igw --vpc-id $vpc | Out-Null
Set-Var "IGW_ID" $igw
Write-Host "Internet Gateway: $igw" -ForegroundColor Green

# 5. Route table publica con ruta 0.0.0.0/0 -> IGW, asociada a las subredes publicas
$rt = (aws ec2 create-route-table --vpc-id $vpc --query 'RouteTable.RouteTableId' --output text)
aws ec2 create-route --route-table-id $rt --destination-cidr-block 0.0.0.0/0 --gateway-id $igw | Out-Null
aws ec2 associate-route-table --route-table-id $rt --subnet-id $pub1  | Out-Null
aws ec2 associate-route-table --route-table-id $rt --subnet-id $pub2  | Out-Null
Set-Var "RT_PUBLIC" $rt
Write-Host "Route table publica: $rt" -ForegroundColor Green

# 6. Security group de los servidores (HTTP 80, RDP 3389, SSH 22)
$sg = (aws ec2 create-security-group --group-name curso-web-sg --description "SG servidores web del curso" --vpc-id $vpc --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $sg --protocol tcp --port 80   --cidr 0.0.0.0/0 | Out-Null
aws ec2 authorize-security-group-ingress --group-id $sg --protocol tcp --port 3389 --cidr 0.0.0.0/0 | Out-Null
aws ec2 authorize-security-group-ingress --group-id $sg --protocol tcp --port 22   --cidr 0.0.0.0/0 | Out-Null
Set-Var "SG_WEB" $sg
Write-Host "Security Group servidores: $sg" -ForegroundColor Green

# 7. Key pair (en floci los que crea create-key-pair son dummy; se usan solo de referencia)
aws ec2 create-key-pair --key-name curso-key --query 'KeyMaterial' --output text | Out-Null
Set-Var "KEY_NAME" "curso-key"
Write-Host "Key pair: curso-key" -ForegroundColor Green

Write-Host "`nRed lista. IDs guardados en vars.ps1" -ForegroundColor Cyan
