#!/bin/bash
# userdata-web-a.sh - Bootstrap del servidor A (equivale a un Windows Server con IIS)
# En AWS real este script seria un PowerShell (.ps1) instalando IIS:
#   Install-WindowsFeature Web-Server; Set-Content C:\inetpub\wwwroot\index.html "<h1>...</h1>"
# En floci la instancia es un contenedor Amazon Linux, asi que usamos dnf + nginx.
dnf install -y nginx >/var/log/bootstrap.log 2>&1
echo "<h1>SERVIDOR A - AZ us-east-1a</h1>" > /usr/share/nginx/html/index.html
systemctl enable nginx >/dev/null 2>&1
systemctl start nginx >>/var/log/bootstrap.log 2>&1 || nginx >>/var/log/bootstrap.log 2>&1
echo "bootstrap A done" >>/var/log/bootstrap.log
