# main/serializers.py

from rest_framework import serializers
from .models import Cliente, Categoria, Inventario, OrdenCompra, OrdenPedido, OrdenPedidoProducto, Producto, Proveedor, Vendedor

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'

class OrdenCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenCompra
        fields = '__all__'

class OrdenPedidoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenPedidoProducto
        fields = '__all__'

class OrdenPedidoSerializer(serializers.ModelSerializer):
    productos = OrdenPedidoProductoSerializer(many=True)

    class Meta:
        model = OrdenPedido
        fields = '__all__'

    def create(self, validated_data):
        productos_data = validated_data.pop('productos')
        orden_pedido = OrdenPedido.objects.create(**validated_data)
        for producto_data in productos_data:
            OrdenPedidoProducto.objects.create(orden_pedido=orden_pedido, **producto_data)
        return orden_pedido

    def update(self, instance, validated_data):
        productos_data = validated_data.pop('productos')
        instance = super().update(instance, validated_data)

        keep_productos = []
        for producto_data in productos_data:
            if 'id' in producto_data.keys():
                if OrdenPedidoProducto.objects.filter(id=producto_data['id']).exists():
                    p = OrdenPedidoProducto.objects.get(id=producto_data['id'])
                    p.orden_pedido = instance
                    p.producto = producto_data.get('producto', p.producto)
                    p.cantidad = producto_data.get('cantidad', p.cantidad)
                    p.save()
                    keep_productos.append(p.id)
                else:
                    continue
            else:
                p = OrdenPedidoProducto.objects.create(orden_pedido=instance, **producto_data)
                keep_productos.append(p.id)

        for producto in instance.productos.all():
            if producto.id not in keep_productos:
                producto.delete()

        return instance

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'

class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = '__all__'
