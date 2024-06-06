// src/pages/OrdenesPedido.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import OrdenPedidoForm from '../components/OrdenPedidoForm';

const OrdenesPedido = () => {
  const [ordenesPedido, setOrdenesPedido] = useState([]);
  const [selectedOrdenPedido, setSelectedOrdenPedido] = useState(null);

  useEffect(() => {
    fetchOrdenesPedido();
  }, []);

  const fetchOrdenesPedido = async () => {
    try {
      const response = await api.get('/ordenes-pedido/');
      setOrdenesPedido(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/ordenes-pedido/${id}/`);
      fetchOrdenesPedido();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div>
      <h1>Órdenes de Pedido</h1>
      <ul>
        {ordenesPedido.map(ordenPedido => (
          <li key={ordenPedido.id}>
            {ordenPedido.numero_orden_pedido} - {ordenPedido.proveedor.nombreEmpresa} - {ordenPedido.estado}
            <button onClick={() => setSelectedOrdenPedido(ordenPedido)}>Editar</button>
            <button onClick={() => handleDelete(ordenPedido.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedOrdenPedido && <OrdenPedidoForm ordenPedido={selectedOrdenPedido} fetchOrdenesPedido={fetchOrdenesPedido} setSelectedOrdenPedido={setSelectedOrdenPedido} />}
      <OrdenPedidoForm fetchOrdenesPedido={fetchOrdenesPedido} />
    </div>
  );
};

export default OrdenesPedido;
