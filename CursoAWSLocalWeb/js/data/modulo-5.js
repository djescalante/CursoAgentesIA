/**
 * Módulo 5 — ALB: Balanceo de Carga
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-5`,
    number: 5,
    icon: `⚖️`,
    title: `ALB: Balanceo de Carga`,
    subtitle: `Distribuye el tráfico`,
    description: `Crea un Application Load Balancer que reparte el tráfico entre tus dos servidores web, con health checks y verificación real del round-robin.`,
    difficulty: `advanced`,
    lessons: [
      {
        id: `5-1`,
        title: `Load Balancers en AWS`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 5.1 - Load Balancers en AWS

## ⚖️ Por qué necesitas un Load Balancer

Si tu web vive en un solo servidor y ese servidor falla o se satura, **tu web cae**. La solución es repartir el tráfico entre varios servidores con un **balanceador de carga**.

\`\`\`text
          Usuarios
             │
             ▼
      [Load Balancer]   ← punto único de entrada
       ┌────┴────┐
  Servidor A  Servidor B
\`\`\`

---

## 🔀 Tipos de Load Balancer (ELB)

| Tipo | Capa | Uso |
|---|---|---|
| **ALB** (Application) | 7 (HTTP/HTTPS) | Tráfico web, rutas por path/host |
| NLB (Network) | 4 (TCP/UDP) | Alto rendimiento, IPs estáticas |
| CLB (Classic) | 4 y 7 | Legado, en desuso |

En el curso usamos un **ALB** porque es el estándar para aplicaciones HTTP y permite enrutar por host, path y headers.

---

## 🧩 Piezas del ALB

Un ALB no es un único objeto: se compone de:

1. **Load Balancer** — el punto de entrada (tiene un DNS).
2. **Target Group** — el grupo de servidores que recibe tráfico.
3. **Listener** — las "orejas" (puerto/protocolo) que escuchan.
4. **Health Checks** — cómo decide el balanceador si un servidor está sano.

---

## 🏷️ DNS del ALB

Cada ALB tiene un **DNS público** parecido a:

\`\`\`text
curso-alb-xxxx.elb.localhost.floci.io
\`\`\`

En AWS real sería \`curso-alb-xxxx.us-east-1.elb.amazonaws.com\`. Ese DNS es la URL que comparten tus usuarios.

---

## ✅ Resumen

- Un **balanceador** reparte el tráfico y da resiliencia.
- El **ALB** trabaja en la capa HTTP (7) y es el estándar web.
- Se compone de LB + Target Group + Listener + Health Checks.
- Cada ALB publica un **DNS** que es tu punto de entrada.`,
        exercise: {
          title: `Conceptos del ALB`,
          prompt: `Explica qué hace un Application Load Balancer, en qué capa OSI trabaja y qué 4 piezas lo componen.`
        }
      },
      {
        id: `5-2`,
        title: `Target Groups, Listener y Health Checks`,
        time: `30 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 5.2 - Target Groups, Listener y Health Checks

## 🎯 Target Group

El **Target Group** agrupa los servidores que atenderán el tráfico. Definimos el de nuestros servidores web:

\`\`\`powershell
$tgArn = aws --endpoint-url=http://localhost:4566 elbv2 create-target-group \`
  --name curso-web-tg \`
  --protocol HTTP --port 80 \`
  --vpc-id $vpcId \`
  --health-check-protocol HTTP \`
  --health-check-path "/" \`
  --output text --query "TargetGroups[0].TargetGroupArn"
\`\`\`

---

## 📎 Registrar los targets

Añadimos las dos instancias al grupo:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 elbv2 register-targets \`
  --target-group-arn $tgArn \`
  --targets Id=$web1 Id=$web2
\`\`\`

> 💡 **Si obtienes error de ParamValidation ($tgArn vacía):** significa que tu sesión de PowerShell no tiene cargadas las variables. Puedes recuperarlas dinámicamente ejecutando:
> \`\`\`powershell
> $tgArn = aws --endpoint-url=http://localhost:4566 elbv2 describe-target-groups --names curso-web-tg --query "TargetGroups[0].TargetGroupArn" --output text
> $web1  = aws --endpoint-url=http://localhost:4566 ec2 describe-instances --filters "Name=tag:Name,Values=curso-web-1" --query "Reservations[0].Instances[0].InstanceId" --output text
> $web2  = aws --endpoint-url=http://localhost:4566 ec2 describe-instances --filters "Name=tag:Name,Values=curso-web-2" --query "Reservations[0].Instances[0].InstanceId" --output text
> \`\`\`

> ⚠️ **Gotcha de floci (CloudFormation):** el Target Group creado por CloudFormation **no registra los targets automáticamente**. Hay que hacer un paso manual de \`register-targets\` tras el deploy del stack. (En AWS real el registro lo haces tú igualmente.)

---

## 👂 Listener

El **listener** es el puerto que escucha el balanceador y qué hace con el tráfico (regla por defecto → forward al Target Group):

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 elbv2 create-listener \`
  --load-balancer-arn $lbArn \`
  --protocol HTTP --port 80 \`
  --default-actions Type=forward,TargetGroupArn=$tgArn
\`\`\`

---

## 💓 Health Checks

El health check decide si un target está sano. Configuración usada en el curso:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 elbv2 modify-target-group-attributes \`
  --target-group-arn $tgArn \`
  --attributes Key=health_check.interval.seconds,Value=30 \`
                Key=health_check.healthy_threshold_count,Value=5
\`\`\`

**Estados posibles:**

| Estado | Significado |
|---|---|
| \`initial\` | Recién registrado, probando |
| \`healthy\` | Sano, recibe tráfico |
| \`unhealthy\` | Falló las pruebas |

> 💡 Con intervalo de 30s y umbral de 5, un target tarda ~**2,5 minutos** en pasar de \`initial\` a \`healthy\`. Es normal: solo necesita 5 respuestas OK consecutivas.

---

## 🔍 Ver el estado

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 elbv2 describe-target-health \`
  --target-group-arn $tgArn \`
  --query "TargetHealthDescriptions[*].[Target.Id,TargetHealth.State]"
\`\`\`

---

## ✅ Resumen

- El **Target Group** agrupa los servidores y define el health check.
- **Registra los targets** explícitamente (manual en floci/CFN).
- El **listener** (80/HTTP) reenvía al target group.
- Health check con intervalo 30s y umbral 5 → sano en ~2,5 min.`,
        exercise: {
          title: `Monta el balanceador`,
          prompt: `Crea el target group, registra tus dos instancias, crea el listener y consulta el estado de salud de los targets hasta que estén healthy.`
        }
      },
      {
        id: `5-3`,
        title: `Verificando el Round-Robin A/B`,
        time: `25 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 5.3 - Verificando el Round-Robin A/B

## 🎯 El objetivo final

Cuando todo está listo, una sola URL debe repartir el tráfico **alternando** entre el Servidor A y el Servidor B.

## 🌐 Obtener el DNS del ALB

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 elbv2 describe-load-balancers \`
  --names curso-alb --query "LoadBalancers[0].DNSName" --output text

# → curso-alb-xxxxxxxx.elb.localhost.floci.io
\`\`\`

---

## 🔁 Probar el round-robin

Hacemos 6 peticiones y contamos cuántas veces responde cada servidor:

\`\`\`powershell
$url = "http://curso-alb-xxxxxxxx.elb.localhost.floci.io/"
$counts = @{}

for ($i = 1; $i -le 6; $i++) {
  $r = Invoke-WebRequest -Uri $url -UseBasicParsing
  $m = [regex]::Match($r.Content, 'SERVIDOR ([A-Z])')
  $k = if ($m.Success) { $m.Groups[1].Value } else { '?' }
  $counts[$k] = [int]$counts[$k] + 1
  Write-Host "req $i -> HTTP $($r.StatusCode) SERVIDOR $k"
}

Write-Host "RESUMEN: A=$($counts['A']) B=$($counts['B'])"
\`\`\`

Resultado esperado (con round-robin perfecto):

\`\`\`text
req 1 -> HTTP 200 SERVIDOR A
req 2 -> HTTP 200 SERVIDOR B
...
RESUMEN: A=3 B=3
\`\`\`

---

## ⚠️ Gotcha de floci: varios ALB compiten por el puerto 80

En floci, **todos los ALB comparten el host port 80** del contenedor. El emulador reparte por **Host header**:

- \`http://localhost/\` → devuelve **502** si hay más de un listener.
- \`http://<dns-del-alb>/\` → **funciona**, cada ALB responde por su DNS.

**Regla práctica:** usa siempre el **DNSName del ALB**, nunca \`localhost\`.

---

## 📊 Resultado verificado del curso

Este es el resultado real obtenido en los labs (CLI, CloudFormation y Terraform):

\`\`\`text
req 1 -> HTTP 200 SERVIDOR B
req 2 -> HTTP 200 SERVIDOR A
req 3 -> HTTP 200 SERVIDOR B
req 4 -> HTTP 200 SERVIDOR A
req 5 -> HTTP 200 SERVIDOR B
req 6 -> HTTP 200 SERVIDOR A
RESUMEN: A=3 B=3
\`\`\`

---

## ✅ Resumen

- Usa el **DNSName** del ALB como URL de entrada.
- 6 peticiones → espera **3 respuestas de cada servidor** (round-robin).
- Si usas \`localhost\` con varios ALB verás 502; usa el DNS del ALB.
- ¡Con esto cerramos la parte "a mano"! Los módulos siguientes automatizan **todo** este montaje.`,
        exercise: {
          title: `Demuestra el balanceo`,
          prompt: `Ejecuta 6 peticiones contra el DNS de tu ALB y muestra el resumen A/B. ¿Qué conclusión sacas del resultado? ¿Y qué pasaría si usaras localhost con 2 ALB activos?`
        }
      }
    ]
  }
);
