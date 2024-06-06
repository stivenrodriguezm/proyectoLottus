// src/components/ClienteForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ClienteForm = ({ cliente, fetchClientes, setSelectedCliente }) => {
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [email, setEmail] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [telefono2, setTelefono2] = useState('');
  const [cedula, setCedula] = useState('');  // Añadir estado para cedula

  useEffect(() => {
    if (cliente) {
      setNombre(cliente.nombre);
      setDireccion(cliente.direccion);
      setCiudad(cliente.ciudad);
      setEmail(cliente.email);
      setTelefono1(cliente.telefono1);
      setTelefono2(cliente.telefono2);
      setCedula(cliente.cedula);  // Establecer el valor de cedula
    }
  }, [cliente]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteData = { nombre, direccion, ciudad, email, telefono1, telefono2, cedula };  // Incluir cedula

    try {
      if (cliente) {
        await api.put(`/clientes/${cliente.id}/`, clienteData);
        setSelectedCliente(null);
      } else {
        await api.post('/clientes/', clienteData);
      }
      fetchClientes();
      setNombre('');
      setDireccion('');
      setCiudad('');
      setEmail('');
      setTelefono1('');
      setTelefono2('');
      setCedula('');  // Resetear el campo cedula
    } catch (error) {
      console.error('Error saving client:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input 
          type="text" 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Dirección:</label>
        <input 
          type="text" 
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Ciudad:</label>
        <input 
          type="text" 
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Teléfono 1:</label>
        <input 
          type="text" 
          value={telefono1}
          onChange={(e) => setTelefono1(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Teléfono 2:</label>
        <input 
          type="text" 
          value={telefono2}
          onChange={(e) => setTelefono2(e.target.value)}
        />
      </div>
      <div>
        <label>Cédula:</label>
        <input 
          type="text" 
          value={cedula}
          onChange={(e) => setCedula(e.target.value)}
          required 
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default ClienteForm;
