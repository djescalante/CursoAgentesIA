# 02-ec2.ps1 - Dos instancias EC2 (Windows Server en AWS real / Linux en floci) con UserData
# Uso:  .\02-ec2.ps1

. .\env.ps1

$sg  = Get-Var "SG_WEB"
$key = Get-Var "KEY_NAME"
$pub1 = Get-Var "PUB_SUB_1"
$pub2 = Get-Var "PUB_SUB_2"
$ami = "ami-0c02fb55956c7d316"   # en AWS real seria una AMI de Windows Server 2022

# Limpieza previa (para que el script sea re-ejecutable)
$oldInst = @()
$oldA = Get-Var "INST_A"; $oldB = Get-Var "INST_B"
if ($oldA) { $oldInst += $oldA }
if ($oldB) { $oldInst += $oldB }
if ($oldInst.Count -gt 0) {
    aws ec2 terminate-instances --instance-ids $oldInst | Out-Null
    Write-Host "Instancias previas terminadas: $($oldInst -join ', ')" -ForegroundColor DarkYellow
}

# Nota: se pasa el userdata con file:// para evitar que PowerShell fragmente las
# lineas del script al llamar al CLI. El CLI lo codifica a base64 automaticamente.
$udA = "file://" + (Resolve-Path "..\userdata\userdata-web-a.sh").Path
$udB = "file://" + (Resolve-Path "..\userdata\userdata-web-b.sh").Path

$instA = (aws ec2 run-instances --image-id $ami --instance-type t3.micro --key-name $key `
    --security-group-ids $sg --subnet-id $pub1 --user-data $udA `
    --query 'Instances[0].InstanceId' --output text)
Set-Var "INST_A" $instA
Write-Host "Servidor A lanzado: $instA" -ForegroundColor Green

$instB = (aws ec2 run-instances --image-id $ami --instance-type t3.micro --key-name $key `
    --security-group-ids $sg --subnet-id $pub2 --user-data $udB `
    --query 'Instances[0].InstanceId' --output text)
Set-Var "INST_B" $instB
Write-Host "Servidor B lanzado: $instB" -ForegroundColor Green

Write-Host "Instancias lanzadas. El userdata instala nginx y arranca el sitio web." -ForegroundColor Cyan
