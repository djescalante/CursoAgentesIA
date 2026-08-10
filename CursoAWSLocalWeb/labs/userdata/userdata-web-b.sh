#!/bin/bash
# userdata-web-b.sh - Bootstrap del servidor B (equivale a un Windows Server con IIS)
dnf install -y nginx >/var/log/bootstrap.log 2>&1
echo "<h1>SERVIDOR B - AZ us-east-1b</h1>" > /usr/share/nginx/html/index.html
systemctl enable nginx >/dev/null 2>&1
systemctl start nginx >>/var/log/bootstrap.log 2>&1 || nginx >>/var/log/bootstrap.log 2>&1
echo "bootstrap B done" >>/var/log/bootstrap.log
