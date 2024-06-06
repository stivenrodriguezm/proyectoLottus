// src/components/OrdenCompraForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const OrdenCompraForm = ({ orden, fetchOrdenesCompra, setSelectedOrdenCompra }) => {
  const [cliente, setCliente] = useState('');
  const [vendedor, setVendedor] = useState('');
  const [fecha, setFecha] = useState('');
  const [total, setTotal] = useState('');
  const [estado, setEstado] = useState('pendiente');
  const [numeroOrden, setNumeroOrden] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');

  useEffect(() => {
    if (orden) {
      setCliente(orden.cliente.id);
      setVendedor(orden.vendedor.id);
      setFecha(orden.fecha);
      setTotal(orden.total);
      setEstado(orden.estado);
      setNumeroOrden(orden.numero_orden);
      setFechaEntrega(orden.fecha_entrega);
    }
  }, [orden]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ordenData = { cliente, vendedor, fecha, total, estado, numero_orden: numeroOrden, fecha_entrega: fechaEntrega };

    try {
      if (orden) {
        await api.put(`/ordenes-compra/${orden.id}/`, ordenData);
        setSelectedOrdenCompra(null);
      } else {
        await api.post('/ordenes-compra/', ordenData);
      }
      fetchOrdenesCompra();
      setCliente('');
      setVendedor('');
      setFecha('');
      setTotal('');
      setEstado('pendiente');
      setNumeroOrden('');
      setFechaEntrega('');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cliente:</label>
        <input 
          type="text" 
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Vendedor:</label>
        <input 
          type="text" 
          value={vendedor}
          onChange={(e) => setVendedor(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Fecha:</label>
        <input 
          type="date" 
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Total:</label>
        <input 
          type="number" 
          value={total}
          onChange={(e) => setTotal(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Estado:</label>
        <select value={estado} onChange={(e) => setEstado(e.target.value)} required>
          <option value="pendiente">Pendiente</option>
          <option value="completa">Completa</option>
        </select>
      </div>
      <div>
        <label>Número de Orden:</label>
        <input 
          type="text" 
          value={numeroOrden}
          onChange={(e) => setNumeroOrden(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Fecha de Entrega:</label>
        <input 
          type="date" 
          value={fechaEntrega}
          onChange={(e) => setFechaEntrega(e.target.value)}
          required 
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default OrdenCompraForm;
