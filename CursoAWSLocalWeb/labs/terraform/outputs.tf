output "vpc_id" {
  value = aws_vpc.main.id
}

output "web1_id" {
  value = aws_instance.web1.id
}

output "web2_id" {
  value = aws_instance.web2.id
}

output "db_pedidos_endpoint" {
  value = format("%s:%s", aws_db_instance.pedidos.address, aws_db_instance.pedidos.port)
}

output "db_inventario_endpoint" {
  value = format("%s:%s", aws_db_instance.inventario.address, aws_db_instance.inventario.port)
}

output "alb_dns_name" {
  value = aws_lb.main.dns_name
}
