// src/pages/OrdenesCompra.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import OrdenCompraForm from '../components/OrdenCompraForm';  // Importa el componente

const OrdenesCompra = () => {
  const [ordenesCompra, setOrdenesCompra] = useState([]);
  const [selectedOrdenCompra, setSelectedOrdenCompra] = useState(null);

  useEffect(() => {
    fetchOrdenesCompra();
  }, []);

  const fetchOrdenesCompra = async () => {
    try {
      const response = await api.get('/ordenes-compra/');
      setOrdenesCompra(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/ordenes-compra/${id}/`);
      fetchOrdenesCompra();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h1>Órdenes de Compra</h1>
      <ul>
        {ordenesCompra.map(orden => (
          <li key={orden.id}>
            {orden.numero_orden} - {orden.cliente.nombre} - {orden.estado}
            <button onClick={() => setSelectedOrdenCompra(orden)}>Editar</button>
            <button onClick={() => handleDelete(orden.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedOrdenCompra && <OrdenCompraForm orden={selectedOrdenCompra} fetchOrdenesCompra={fetchOrdenesCompra} setSelectedOrdenCompra={setSelectedOrdenCompra} />}
      <OrdenCompraForm fetchOrdenesCompra={fetchOrdenesCompra} />
    </div>
  );
};

export default OrdenesCompra;
