/**
 * Módulo 4 — RDS: Tus Bases de Datos
 * Fuente única de verdad del curso — editar directamente (sin build step).
 */
COURSE_DATA.modules.push(
  {
    id: `modulo-4`,
    number: 4,
    icon: `🗄️`,
    title: `RDS: Tus Bases de Datos`,
    subtitle: `PostgreSQL y MySQL`,
    description: `Crea bases de datos gestionadas con RDS: PostgreSQL y MySQL, dentro de tu VPC, y aprende a conectarte a ellas.`,
    difficulty: `intermediate`,
    lessons: [
      {
        id: `4-1`,
        title: `Creando un RDS PostgreSQL`,
        time: `25 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 4.1 - Creando un RDS PostgreSQL

## 🗄️ Qué es RDS

**RDS (Relational Database Service)** es el servicio de bases de datos gestionadas de AWS. AWS se encarga de las copias de seguridad, parches y alta disponibilidad; tú solo te preocupas de tus datos.

Soporta varios motores: **PostgreSQL, MySQL, MariaDB, Oracle, SQL Server**.

---

## 🔧 Crear la base de datos

Vamos a crear la base de datos de **pedidos** con PostgreSQL. Primero necesitamos un **DB Subnet Group** (dónde vivirán las réplicas):

\`\`\`powershell
# 1. Grupo de subnets para RDS (usa las subnets privadas)
aws --endpoint-url=http://localhost:4566 rds create-db-subnet-group \`
  --db-subnet-group-name curso-db-subnet \`
  --db-subnet-group-description "Subnets privadas para RDS" \`
  --subnet-ids $priv1 $priv2

# 2. Crear la instancia PostgreSQL
aws --endpoint-url=http://localhost:4566 rds create-db-instance \`
  --db-instance-identifier db-pedidos \`
  --db-instance-class db.t3.micro \`
  --engine postgres \`
  --allocated-storage 20 \`
  --master-username admin \`
  --master-user-password "ChangeMe123!" \`
  --db-subnet-group-name curso-db-subnet \`
  --backup-retention-period 0
\`\`\`

---

## ⏳ El ciclo de vida de RDS

A diferencia de EC2, RDS tarda más en quedar listo:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 rds describe-db-instances \`
  --db-instance-identifier db-pedidos \`
  --query "DBInstances[0].[DBInstanceIdentifier,DBInstanceStatus,Endpoint.Address,Endpoint.Port]"

# Estados: creating → available
\`\`\`

En floci, la creación tarda alrededor de **un minuto** (bastante menos que en AWS real).

---

## 🔌 El endpoint

Cuando la base está \`available\`, obtienes su **endpoint** (IP y puerto):

\`\`\`text
Address: 172.18.0.2
Port:    7003
\`\`\`

Ese es el dato que usará tu aplicación para conectarse.

---

## ✅ Resumen

- **RDS** gestiona la base de datos por ti (backups, parches, HA).
- Crea un **DB Subnet Group** con las subnets privadas.
- \`create-db-instance\` con \`--engine postgres\` y credenciales de admin.
- Espera el estado \`available\` y toma nota del **endpoint**.`,
        exercise: {
          title: `Crea tu PostgreSQL`,
          prompt: `Crea el db-subnet-group y la instancia db-pedidos (PostgreSQL) contra floci. Espera a que esté available y anota su endpoint (IP y puerto).`
        }
      },
      {
        id: `4-2`,
        title: `Creando un RDS MySQL`,
        time: `20 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 4.2 - Creando un RDS MySQL

## 🔁 El mismo patrón, otro motor

Crear la segunda base (inventario, con **MySQL**) es idéntico a la anterior; solo cambia el identificador y el motor:

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 rds create-db-instance \`
  --db-instance-identifier db-inventario \`
  --db-instance-class db.t3.micro \`
  --engine mysql \`
  --allocated-storage 20 \`
  --master-username admin \`
  --master-user-password "ChangeMe123!" \`
  --db-name db_inventario \`
  --db-subnet-group-name curso-db-subnet \`
  --backup-retention-period 0
\`\`\`

---

## 🔍 Verificar ambas

\`\`\`powershell
aws --endpoint-url=http://localhost:4566 rds describe-db-instances \`
  --query "DBInstances[*].[DBInstanceIdentifier,Engine,DBInstanceStatus,Endpoint.Port]"

# db-pedidos     postgres available  7003
# db-inventario  mysql    available  7004
\`\`\`

---

## 🧮 Motor vs. Puerto por defecto

| Motor | Puerto estándar | En floci |
|---|---|---|
| PostgreSQL | 5432 | ~7003 |
| MySQL | 3306 | ~7004 |

> 💡 floci asigna puertos dinámicos (7001-7099) a cada contenedor. El puerto **importante es el que devuelve el endpoint**, no el puerto "de manual".

---

## 📦 Nuestro inventario de bases de datos

Al final del curso tendrás **4 bases de datos** si haces los 3 labs (uno por herramienta):

\`\`\`text
CLI             CloudFormation   Terraform
db-pedidos      db-pedidos-cfn   db-pedidos-tf     (PostgreSQL)
db-inventario   db-inventario-cfn db-inventario-tf (MySQL)
\`\`\`

Cada pareja usa el mismo puerto base, así que **es habitual que al crear un nuevo lab haya que parar o borrar el anterior** para no saturar puertos.

---

## ✅ Resumen

- Crear MySQL es igual que PostgreSQL: cambia \`--engine mysql\` y el nombre.
- Verifica todas las bases con \`describe-db-instances\`.
- Anota el **puerto real** que devuelve el endpoint (floci usa 7001-7099).
- Cada lab (CLI/CFN/Terraform) crea su pareja de bases.`,
        exercise: {
          title: `Crea tu MySQL`,
          prompt: `Crea la instancia db-inventario (MySQL) y muestra el listado de todas tus bases de datos con su motor, estado y puerto real.`
        }
      },
      {
        id: `4-3`,
        title: `Conectando y Gestionando tus BD`,
        time: `25 min`,
        difficulty: `🟡 Intermedio`,
        content: `# 4.3 - Conectando y Gestionando tus BD

## 🔌 Conectarse a PostgreSQL

Una vez \`available\`, puedes conectarte con el cliente de PostgreSQL. Desde tu PC (Host) apunta a \`localhost\`:

\`\`\`powershell
$env:PGPASSWORD = 'ChangeMe123!'
& "C:\\Program Files\\PostgreSQL\\16\\bin\\psql.exe" \`
  -h localhost -p 7003 -U admin -d postgres
\`\`\`

O alternativamente usando Docker (si no tienes el cliente instalado en tu PC):

\`\`\`powershell
# Conectarse al contenedor dedicado de PostgreSQL en Docker
$pg = (docker ps --filter "name=floci-rds" --format "{{.Names}} {{.Image}}" | Select-String "postgres" | ForEach-Object { $_.Line.Split(' ')[0] })
docker exec -it $pg psql -U admin -d postgres
\`\`\`

---

## 🔌 Conectarse a MySQL

Desde tu PC (Host) apunta a \`localhost\`:

\`\`\`powershell
mysql -h localhost -P 7004 -u admin -pChangeMe123!
\`\`\`

O alternativamente usando Docker (si no tienes el cliente instalado en tu PC):

\`\`\`powershell
# Conectarse al contenedor dedicado de MySQL en Docker
$my = (docker ps --filter "name=floci-rds" --format "{{.Names}} {{.Image}}" | Select-String "mysql" | ForEach-Object { $_.Line.Split(' ')[0] })
docker exec -it $my mysql -u admin -pChangeMe123!
\`\`\`

---

## ✍️ Pruebas rápidas

Crea una tabla y escribe unos datos para verificar que el motor responde:

\`\`\`sql
-- PostgreSQL (db-pedidos)
CREATE TABLE pedidos (id SERIAL PRIMARY KEY, producto TEXT, cantidad INT);
INSERT INTO pedidos (producto, cantidad) VALUES ('laptop', 3);
SELECT * FROM pedidos;
\`\`\`

\`\`\`sql
-- MySQL (db-inventario)
USE db_inventario;
CREATE TABLE inventario (id INT AUTO_INCREMENT PRIMARY KEY, item VARCHAR(50), stock INT);
INSERT INTO inventario (item, stock) VALUES ('mouse', 25);
SELECT * FROM inventario;
\`\`\`

---

## 🧰 Gestión con el CLI

No necesitas un cliente gráfico: el CLI puede gestionar y consultar el estado:

\`\`\`powershell
# Listar parámetros del motor
aws --endpoint-url=http://localhost:4566 rds describe-db-parameters \`
  --db-parameter-group-name default.postgres16

# Modificar la instancia (tamaño, etc.)
aws --endpoint-url=http://localhost:4566 rds modify-db-instance \`
  --db-instance-identifier db-pedidos --db-instance-class db.t3.large

# Borrar la base
aws --endpoint-url=http://localhost:4566 rds delete-db-instance \`
  --db-instance-identifier db-pedidos --skip-final-snapshot
\`\`\`

---

## ⚠️ Gotcha de floci con Terraform (importante)

En el lab de Terraform descubrimos una limitación clave del emulador:

- El provider de Terraform **v5/v6** lee \`aws_db_instance\` usando el **DBI Resource ID** (\`dbi-resource-id\`), un ID interno que AWS devuelve al crear la base.
- **floci solo resuelve las lecturas por el NOMBRE del identificador**, no por el \`dbi-resource-id\`.
- Resultado: Terraform moderno falla con \`reading RDS DB Instance: empty result\`.

**Solución (ver Módulo 8):** fijar el provider a la serie \`~> 4.0\`, donde el recurso se identifica por su nombre y floci lo resuelve sin problema.

---

## ✅ Resumen

- Conéctate con \`psql\` (PostgreSQL) o \`mysql\` (MySQL) usando el endpoint real.
- Verifica el motor creando tablas e insertando datos.
- Gestiona con \`describe\`/\`modify\`/\`delete-db-instance\`.
- Gotcha: Terraform v5/v6 lee RDS por \`dbi-resource-id\`; floci solo entiende el nombre (usa provider v4).`,
        exercise: {
          title: `Juega con tus datos`,
          prompt: `Conéctate a db-pedidos (PostgreSQL) y db-inventario (MySQL), crea una tabla en cada una, inserta 2 filas y muestra el SELECT. Incluye también el comando de borrado con --skip-final-snapshot.`
        }
      }
    ]
  }
);
