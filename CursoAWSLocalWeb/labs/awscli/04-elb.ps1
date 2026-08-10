# 04-elb.ps1 - Application Load Balancer (ALB) que reparte trafico entre los 2 servidores
# Uso:  .\04-elb.ps1

. .\env.ps1

$vpc = Get-Var "VPC_ID"
$pub1 = Get-Var "PUB_SUB_1"
$pub2 = Get-Var "PUB_SUB_2"
$instA = Get-Var "INST_A"
$instB = Get-Var "INST_B"
$sg  = Get-Var "SG_WEB"

# Limpieza previa (para que el script sea re-ejecutable)
$oldLb = aws elbv2 describe-load-balancers --load-balancer-names curso-alb --query 'LoadBalancers[0].LoadBalancerArn' --output text 2>$null
if ($oldLb) { aws elbv2 delete-load-balancer --load-balancer-arn $oldLb 2>$null | Out-Null }
$oldTg = aws elbv2 describe-target-groups --target-group-names curso-web-tg --query 'TargetGroups[0].TargetGroupArn' --output text 2>$null
if ($oldTg) { aws elbv2 delete-target-group --target-group-arn $oldTg 2>$null | Out-Null }
$oldSg = aws ec2 describe-security-groups --filters "Name=group-name,Values=curso-alb-sg" --query 'SecurityGroups[0].GroupId' --output text 2>$null
if ($oldSg) { aws ec2 delete-security-group --group-id $oldSg 2>$null | Out-Null }

# 1. Security group del balanceador (solo HTTP 80)
$sgLb = (aws ec2 create-security-group --group-name curso-alb-sg --description "SG del ALB" --vpc-id $vpc --query 'GroupId' --output text)
aws ec2 authorize-security-group-ingress --group-id $sgLb --protocol tcp --port 80 --cidr 0.0.0.0/0 | Out-Null
Set-Var "SG_LB" $sgLb
Write-Host "SG ALB: $sgLb" -ForegroundColor Green

# 2. Target group: HTTP en el VPC
$tg = (aws elbv2 create-target-group `
    --name curso-web-tg `
    --protocol HTTP --port 80 `
    --vpc-id $vpc `
    --target-type instance `
    --query 'TargetGroups[0].TargetGroupArn' --output text)
Set-Var "TG_ARN" $tg
Write-Host "Target Group: $tg" -ForegroundColor Green

# 3. Registrar los 2 servidores como targets
aws elbv2 register-targets --target-group-arn $tg --targets "Id=$instA" "Id=$instB" | Out-Null
Write-Host "Targets registrados: $instA, $instB" -ForegroundColor Green

# 4. Application Load Balancer en las 2 subredes publicas
$lb = (aws elbv2 create-load-balancer `
    --name curso-alb `
    --subnets $pub1 $pub2 `
    --security-groups $sgLb `
    --scheme internet-facing --type application `
    --query 'LoadBalancers[0].LoadBalancerArn' --output text)
Set-Var "LB_ARN" $lb
Write-Host "ALB: $lb" -ForegroundColor Green

# 5. Listener HTTP:80 que envia el trafico al target group
$listener = (aws elbv2 create-listener `
    --load-balancer-arn $lb `
    --protocol HTTP --port 80 `
    --default-actions "Type=forward,TargetGroupArn=$tg" `
    --query 'Listeners[0].ListenerArn' --output text)
Set-Var "LISTENER_ARN" $listener
Write-Host "Listener HTTP:80: $listener" -ForegroundColor Green

# 6. Datos de conexion
aws elbv2 describe-load-balancers --load-balancer-arns $lb --query 'LoadBalancers[0].{DNSName:DNSName,State:State.Code}' --output json
Write-Host "`nALB listo. DNS: http://localhost:4566 ... (consulta el lab para el endpoint local)" -ForegroundColor Cyan
