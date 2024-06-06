from django.db import models

# Create your models here.

class Cliente(models.Model):
    nombre = models.CharField(max_length=100)
    direccion = models.CharField(max_length=255)
    ciudad = models.CharField(max_length=100)
    email = models.EmailField()
    telefono1 = models.CharField(max_length=20)
    telefono2 = models.CharField(max_length=20, null=True, blank=True)
    cedula = models.CharField(max_length=20, unique=True, null=True)  # Añadir campo cedula

    def __str__(self):
        return self.nombre

class Vendedor(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(max_length=100)
    esJefe = models.BooleanField(default=False)
    nombreContactoEmergencia = models.CharField(max_length=100)
    numeroContactoEmergencia = models.CharField(max_length=20)

    def __str__(self):
        return self.nombre

class Proveedor(models.Model):
    nombreEmpresa = models.CharField(max_length=100)
    nombreEncargado = models.CharField(max_length=100)
    nit = models.CharField(max_length=20)
    correo = models.EmailField(max_length=100)
    direccion = models.CharField(max_length=100)
    nombreContacto1 = models.CharField(max_length=100)
    numeroContacto1 = models.CharField(max_length=20)
    nombreContacto2 = models.CharField(max_length=100, null=True, blank=True)
    numeroContacto2 = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.nombreEmpresa


class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre

class OrdenCompra(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    fecha = models.DateField()
    total = models.DecimalField(max_digits=20, decimal_places=2)
    estado = models.CharField(max_length=50, choices=[('pendiente', 'Pendiente'), ('completa', 'Completa')])
    numero_orden = models.CharField(max_length=20, unique=True)
    fecha_entrega = models.DateField()

    def __str__(self):
        return f"Orden {self.numero_orden} - {self.cliente.nombre}"

class OrdenPedido(models.Model):
    orden_compra = models.ForeignKey(OrdenCompra, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto, through='OrdenPedidoProducto')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    fecha_generacion = models.DateField(auto_now_add=True, null=True)
    fecha_esperada = models.DateField(null=True)
    numero_orden_pedido = models.CharField(max_length=20, unique=True)
    estado = models.CharField(max_length=50, choices=[('pendiente', 'Pendiente'), ('aprobado', 'Aprobado'), ('enviado', 'Enviado')])

    def __str__(self):
        return f"Pedido {self.numero_orden_pedido} - {self.proveedor.nombreEmpresa}"
    
class OrdenPedidoProducto(models.Model):
    orden_pedido = models.ForeignKey(OrdenPedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    def __str__(self):
        return f"{self.producto.nombre} - {self.cantidad}"

class Inventario(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return f"Inventario - {self.producto.nombre}"