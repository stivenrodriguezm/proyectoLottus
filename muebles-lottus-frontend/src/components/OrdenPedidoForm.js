// src/components/OrdenPedidoForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const OrdenPedidoForm = ({ ordenPedido, fetchOrdenesPedido, setSelectedOrdenPedido }) => {
  const [ordenCompra, setOrdenCompra] = useState('');
  const [producto, setProducto] = useState('');
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState('');
  const [productosPedidos, setProductosPedidos] = useState([]);
  const [proveedor, setProveedor] = useState('');
  const [proveedores, setProveedores] = useState([]);
  const [numeroOrdenPedido, setNumeroOrdenPedido] = useState('');
  const [estado, setEstado] = useState('pendiente');

  useEffect(() => {
    if (ordenPedido) {
      setOrdenCompra(ordenPedido.orden_compra.id);
      setProveedor(ordenPedido.proveedor.id);
      setNumeroOrdenPedido(ordenPedido.numero_orden_pedido);
      setEstado(ordenPedido.estado);
      setProductosPedidos(ordenPedido.productos);
    }
    fetchProductos();
    fetchProveedores();
  }, [ordenPedido]);

  const fetchProductos = async () => {
    try {
      const response = await api.get('/productos/');
      setProductos(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchProveedores = async () => {
    try {
      const response = await api.get('/proveedores/');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleAddProducto = () => {
    setProductosPedidos([...productosPedidos, { producto, cantidad }]);
    setProducto('');
    setCantidad('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ordenPedidoData = { orden_compra: ordenCompra, productos: productosPedidos, proveedor, numero_orden_pedido: numeroOrdenPedido, estado };

    try {
      if (ordenPedido) {
        await api.put(`/ordenes-pedido/${ordenPedido.id}/`, ordenPedidoData);
        setSelectedOrdenPedido(null);
      } else {
        await api.post('/ordenes-pedido/', ordenPedidoData);
      }
      fetchOrdenesPedido();
      setOrdenCompra('');
      setProveedor('');
      setNumeroOrdenPedido('');
      setEstado('pendiente');
      setProductosPedidos([]);
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Orden de Compra:</label>
        <input 
          type="text" 
          value={ordenCompra}
          onChange={(e) => setOrdenCompra(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Proveedor:</label>
        <select 
          value={proveedor} 
          onChange={(e) => setProveedor(e.target.value)}
          required
        >
          <option value="">Seleccione un proveedor</option>
          {proveedores.map(proveedor => (
            <option key={proveedor.id} value={proveedor.id}>{proveedor.nombreEmpresa}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Estado:</label>
        <select 
          value={estado} 
          onChange={(e) => setEstado(e.target.value)}
          required
        >
          <option value="pendiente">Pendiente</option>
          <option value="aprobado">Aprobado</option>
          <option value="enviado">Enviado</option>
        </select>
      </div>
      <div>
        <label>Productos:</label>
        {productosPedidos.map((pp, index) => (
          <div key={index}>
            <span>{pp.producto} - {pp.cantidad}</span>
          </div>
        ))}
        <select 
          value={producto} 
          onChange={(e) => setProducto(e.target.value)}
        >
          <option value="">Seleccione un producto</option>
          {productos.map(producto => (
            <option key={producto.id} value={producto.id}>{producto.nombre}</option>
          ))}
        </select>
        <input 
          type="number" 
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          placeholder="Cantidad"
        />
        <button type="button" onClick={handleAddProducto}>Agregar Producto</button>
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrdenPedidoForm;
