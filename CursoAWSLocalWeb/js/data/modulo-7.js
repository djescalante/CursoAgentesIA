/**
 * Módulo 7 — IaC con CloudFormation
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-7`,
    number: 7,
    icon: `🧩`,
    title: `IaC con CloudFormation`,
    subtitle: `Templates nativos de AWS`,
    description: `Describe toda tu infraestructura en un template YAML y deja que CloudFormation la cree, actualice y elimine por ti.`,
    difficulty: `advanced`,
    lessons: [
      {
        id: `7-1`,
        title: `Qué es CloudFormation`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 7.1 - Qué es CloudFormation

## 🧩 CloudFormation

**CloudFormation** es el servicio de IaC **nativo de AWS**. Escribes un **template** (YAML o JSON) que describe TODOS tus recursos, y AWS se encarga de crearlos en el orden correcto, gestionar las dependencias y permitirte actualizarlos o borrarlos como una unidad (un **stack**).

\`\`\`text
template.yaml ──► create-stack ──► STACK (todos los recursos juntos)
\`\`\`

---

## 📦 Qué es un Stack

Un **stack** es la "caja" que agrupa los recursos definidos en un template. Con él puedes:

- **Crear** todo de golpe (\`create-stack\`).
- **Actualizar** el template (\`update-stack\`) — solo cambia lo que difiere.
- **Eliminar** todo (\`delete-stack\`) — borra los recursos en orden inverso.

---

## 📄 Anatomía de un template

\`\`\`yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: Mi infraestructura

Parameters:      # entradas configurables
  Az1:
    Type: String
    Default: us-east-1a

Resources:       # los recursos (lo importante)
  MiVpc:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16

Outputs:         # valores de salida (IPs, DNS, IDs)
  VpcId:
    Value: !Ref MiVpc
\`\`\`

---

## 🔗 Funciones clave del template

| Función | Qué hace | Ejemplo |
|---|---|---|
| \`!Ref\` | Referencia un recurso/parámetro | \`!Ref MiVpc\` |
| \`!GetAtt\` | Obtiene un atributo | \`!GetAtt Instancia.PrivateIp\` |
| \`!Join\` | Une cadenas | \`!Join [":", [ip, port]]\` |
| \`!Sub\` | Interpola \`\${var}\` | \`\${AWS::Region}\` |
| \`!Base64\` | Codifica en base64 | \`!Base64 !Sub ...\` |

---

## 🌟 Ventajas frente a scripts

- **Declarativo**: tú defines el QUÉ; CFN resuelve el CÓMO y el orden.
- **Despliegues atómicos**: si falla algo, puedes hacer rollback.
- **Detección de cambios**: \`update-stack\` solo toca lo que cambió.
- **Integrado**: \`StackId\`, eventos, estados.

---

## ✅ Resumen

- CloudFormation es el **IaC nativo de AWS** (template YAML/JSON → stack).
- Un **stack** agrupa recursos y se crea/actualiza/borra como unidad.
- Funciones clave: \`!Ref\`, \`!GetAtt\`, \`!Sub\`, \`!Base64\`.
- Declarativo: describe el QUÉ, CFN resuelve el CÓMO.`,
        exercise: {
          title: `Conceptos CFN`,
          prompt: `Explica qué es un stack de CloudFormation, qué tres operaciones permite y para qué sirven las funciones !Ref y !Sub en un template.`
        }
      },
      {
        id: `7-2`,
        title: `Escribiendo tu Template (YAML)`,
        time: `40 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 7.2 - Escribiendo tu Template (YAML)

## 🧱 Los recursos del proyecto

Vamos a describir TODA la infraestructura en un solo archivo \`template.yaml\`. Estos son los 20 recursos:

| Grupo | Recursos |
|---|---|
| Red | VPC, 4 Subnets, IGW, Route Table, Ruta, 2 Asociaciones |
| Seguridad | SG Web, SG ALB |
| BD | DB Subnet Group, 2 RDS |
| Servidores | 2 EC2 |
| Balanceo | Target Group, ALB, Listener |

---

## 📄 Fragmentos clave del template

### VPC y Subnets

\`\`\`yaml
Resources:
  Vpc:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsSupport: true
      EnableDnsHostnames: true
      Tags: [{ Key: Name, Value: curso-cfn-vpc }]

  Pub1:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref Vpc
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Ref Az1
      MapPublicIpOnLaunch: true
\`\`\`

### Instancias EC2 con User Data

\`\`\`yaml
  Web1:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: !Ref AmiId
      InstanceType: !Ref InstanceType
      SubnetId: !Ref Pub1
      SecurityGroupIds: [!Ref SgWeb]
      UserData:
        Fn::Base64:
          !Sub |
            #!/bin/bash
            dnf install -y nginx
            echo "<h1>SERVIDOR A</h1>" > /usr/share/nginx/html/index.html
            systemctl start nginx
      Tags: [{ Key: Name, Value: curso-cfn-web-1 }]
\`\`\`

> ⚠️ En **AWS real** este user-data con \`Fn::Base64\` es correcto. En **floci** debes usar el texto **plano** (ver lección 7-4).

### ALB y Target Group

\`\`\`yaml
  Alb:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Type: application
      Scheme: internet-facing
      Subnets: [!Ref Pub1, !Ref Pub2]
      SecurityGroups: [!Ref SgAlb]

  WebTg:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Protocol: HTTP
      Port: 80
      VpcId: !Ref Vpc
      HealthCheckProtocol: HTTP
      HealthCheckPath: /

  Listener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref Alb
      Protocol: HTTP
      Port: 80
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref WebTg
\`\`\`

---

## 🧮 Outputs

\`\`\`yaml
Outputs:
  VpcId:
    Value: !Ref Vpc
  Web1Id:
    Value: !Ref Web1
  AlbDns:
    Value: !GetAtt Alb.DNSName
  DbPedidosEndpoint:
    Value: !Join [":", [!GetAtt DbPedidos.Endpoint.Address,
                        !GetAtt DbPedidos.Endpoint.Port]]
\`\`\`

---

## ✅ Resumen

- Un solo YAML describe los 20 recursos del proyecto.
- \`!Ref\` conecta dependencias (subnet→VPC, EC2→subnet, listener→ALB).
- El user-data de EC2 usa \`Fn::Base64\` + \`!Sub\` (en AWS real).
- Los **Outputs** exponen IDs, DNS y endpoints del stack.`,
        exercise: {
          title: `Escribe tu template`,
          prompt: `Escribe las secciones Resources de tu template.yaml (VPC, subnets, 2 EC2, 2 RDS, ALB, TG, listener) y los Outputs con el DNS del ALB y los endpoints de las BD.`
        }
      },
      {
        id: `7-3`,
        title: `Deploy y Verificación del Stack`,
        time: `30 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 7.3 - Deploy y Verificación del Stack

## 🚀 Crear el stack

Primero **valida** el template y después crea el stack:

\`\`\`powershell
# 1. Validar
aws --endpoint-url=http://localhost:4566 cloudformation validate-template \`
  --template-body file://template.yaml

# 2. Crear el stack
aws --endpoint-url=http://localhost:4566 cloudformation create-stack \`
  --stack-name curso-cfn \`
  --template-body file://template.yaml \`
  --parameters ParameterKey=Az1,ParameterValue=us-east-1a \`
               ParameterKey=Az2,ParameterValue=us-east-1b
\`\`\`

> 💡 Gotcha PowerShell: con \`file://\` usa la **ruta absoluta** (p. ej. \`file://C:/.../template.yaml\`); el CLI no siempre resuelve rutas relativas.

---

## ⏳ Esperar el estado CREATE_COMPLETE

CloudFormation es asíncrono. Espera a que el stack termine:

\`\`\`powershell
do {
  Start-Sleep -Seconds 10
  $st = aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \`
    --stack-name curso-cfn \`
    --query "Stacks[0].StackStatus" --output text
  Write-Host "Estado: $st"
} while ($st -eq "CREATE_IN_PROGRESS")
\`\`\`

Estados: \`CREATE_IN_PROGRESS\` → \`CREATE_COMPLETE\` (o \`ROLLBACK_COMPLETE\` si falló).

---

## 📋 Inspeccionar el stack

\`\`\`powershell
# Recursos creados
aws --endpoint-url=http://localhost:4566 cloudformation describe-stack-resources \`
  --stack-name curso-cfn --query "StackResources[*].[LogicalResourceId,ResourceType,ResourceStatus]"

# Outputs
aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \`
  --stack-name curso-cfn --query "Stacks[0].Outputs[*].[OutputKey,OutputValue]"

# Eventos (si algo falló)
aws --endpoint-url=http://localhost:4566 cloudformation describe-stack-events \`
  --stack-name curso-cfn --query "StackEvents[0:5].[ResourceStatus,ResourceStatusReason]"
\`\`\`

---

## 📎 Registro manual de targets

Como veremos en 7-4, el target group del stack **no auto-registra** los targets en floci. Hay que hacerlo tras el deploy:

\`\`\`powershell
$tgArn = aws --endpoint-url=http://localhost:4566 cloudformation describe-stack-resources \`
  --stack-name curso-cfn --logical-resource-id TargetGroup \`
  --query "StackResources[0].PhysicalResourceId" --output text

$web1 = aws --endpoint-url=http://localhost:4566 ec2 describe-instances \`
  --filters "Name=tag:Name,Values=curso-cfn-web-1" \`
  --query "Reservations[0].Instances[0].InstanceId" --output text

$web2 = aws --endpoint-url=http://localhost:4566 ec2 describe-instances \`
  --filters "Name=tag:Name,Values=curso-cfn-web-2" \`
  --query "Reservations[0].Instances[0].InstanceId" --output text

aws --endpoint-url=http://localhost:4566 elbv2 register-targets \`
  --target-group-arn $tgArn --targets Id=$web1 Id=$web2
\`\`\`

---

## 🧪 Verificar el round-robin

Igual que en el lab CLI: espera a los health checks y lanza 6 peticiones al DNS del ALB:

\`\`\`powershell
$dns = aws --endpoint-url=http://localhost:4566 cloudformation describe-stacks \`
  --stack-name curso-cfn --query "Stacks[0].Outputs[?OutputKey=='AlbDnsName'].OutputValue" --output text
# ... 6 peticiones → A=3 B=3 ...
\`\`\`

---

## 🧹 Actualizar y borrar

\`\`\`powershell
# Actualizar (solo cambia lo que difiere del template)
aws --endpoint-url=http://localhost:4566 cloudformation update-stack \`
  --stack-name curso-cfn --template-body file://template.yaml

# Borrar TODO de una vez
aws --endpoint-url=http://localhost:4566 cloudformation delete-stack \`
  --stack-name curso-cfn
\`\`\`

---

## ✅ Resumen

- \`validate-template\` → \`create-stack\` → espera \`CREATE_COMPLETE\`.
- Inspecciona recursos, outputs y eventos para depurar.
- En floci, registra los targets del stack de forma manual.
- Verifica el round-robin y usa \`delete-stack\` para limpiar.`,
        exercise: {
          title: `Despliega tu stack`,
          prompt: `Valida y crea tu stack curso-cfn, espera a CREATE_COMPLETE, registra los targets y muestra los outputs (DNS del ALB y endpoints).`
        }
      },
      {
        id: `7-4`,
        title: `Gotchas de floci: UserData, SG y Targets`,
        time: `25 min`,
        difficulty: `🔴 Avanzado`,
        content: `# 7.4 - Gotchas de floci: UserData, SG y Targets

## 🐛 Los tres tropiezos reales

Durante la validación del curso (un smoke test real contra floci) encontramos 3 comportamientos que **difieren de AWS real**. Son esenciales para que tu stack no falle.

---

## 1️⃣ UserData debe ir en CLARO (no en Base64)

**En AWS real:** el user-data de CloudFormation se envía con \`Fn::Base64\`.

**En floci:** el emulador espera el script **en texto plano** (que empiece por \`#!/bin/bash\`). Si envías base64, el provisioner lo pasa **sin decodificar** y la instancia falla al arrancar con el error:

\`\`\`text
did not contain executable shellscript parts
\`\`\`

**Solución en floci:**

\`\`\`yaml
UserData: |
  #!/bin/bash
  dnf install -y nginx
  ...
\`\`\`

> 📌 Anótalo: en tu plantilla para floci usa user-data plano; en el curso queda documentado que **AWS real exige base64**.

---

## 2️⃣ El Security Group se crea SIN reglas

En floci, el SG creado por CloudFormation puede quedar **sin \`SecurityGroupIngress\`** (sin reglas de entrada), aunque el template las defina.

**Consecuencia:** no se crean los "sidecars" socat del puerto 80 en las instancias.

**Pero el ALB funciona igual:** el emulador resuelve los targets por su **IP de contenedor** (\`containerBridgeIp\`, \`172.18.0.x\`), sin depender de las reglas del SG.

> 📌 No bloquees tu debug pensando que el SG está mal: en floci el ALB alcanza a los servidores por IP de contenedor.

---

## 3️⃣ El Target Group NO auto-registra targets

En AWS real, si el template no registra targets, tú los registras. En floci ocurre lo mismo, pero **puede sorprenderte** porque el stack "completa" sin targets.

**Síntoma:** el ALB responde 502/503 o el target group aparece vacío.

**Solución:** paso manual \`register-targets\` tras \`CREATE_COMPLETE\` (visto en 7-3).

---

## ⏳ Bonus: los health checks tardan

Con intervalo 30s y umbral 5, un target pasa de \`initial\` a \`healthy\` en **~2,5 minutos**. No es un fallo: solo necesita 5 respuestas OK consecutivas.

---

## 🧪 Resultado verificado

El smoke test del curso con estas correcciones dio:

\`\`\`text
create-stack        → CREATE_COMPLETE (20 recursos)
user-data plano     → nginx activo en A y B
register-targets    → targets healthy
round-robin 6 req   → A=3 B=3 ✓
delete-stack        → limpieza completa
\`\`\`

---

## ✅ Resumen

- floci exige **user-data en claro**; AWS real exige base64.
- Los **SGs de CFN** pueden quedar sin reglas en floci; el ALB no depende de ellos (usa IP de contenedor).
- El **Target Group** no se auto-registra: haz \`register-targets\` manual.
- Los health checks tardan ~2,5 min. Con esto tu stack funciona a la primera.`,
        exercise: {
          title: `Aplica los gotchas`,
          prompt: `Enumera los 3 gotchas de floci con CloudFormation, qué error produce cada uno y cuál es su solución. ¿Por qué el ALB sigue funcionando aunque el SG quede sin reglas?`
        }
      }
    ]
  }
);
