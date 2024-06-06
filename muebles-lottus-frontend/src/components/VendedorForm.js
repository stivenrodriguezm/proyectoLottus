// src/components/VendedorForm.js

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const VendedorForm = ({ vendedor, fetchVendedores, setSelectedVendedor }) => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [esJefe, setEsJefe] = useState(false);
  const [nombreContactoEmergencia, setNombreContactoEmergencia] = useState('');
  const [numeroContactoEmergencia, setNumeroContactoEmergencia] = useState('');

  useEffect(() => {
    if (vendedor) {
      setNombre(vendedor.nombre);
      setCorreo(vendedor.correo);
      setEsJefe(vendedor.esJefe);
      setNombreContactoEmergencia(vendedor.nombreContactoEmergencia);
      setNumeroContactoEmergencia(vendedor.numeroContactoEmergencia);
    }
  }, [vendedor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const vendedorData = { nombre, correo, esJefe, nombreContactoEmergencia, numeroContactoEmergencia };

    try {
      if (vendedor) {
        await api.put(`/vendedores/${vendedor.id}/`, vendedorData);
        setSelectedVendedor(null);
      } else {
        await api.post('/vendedores/', vendedorData);
      }
      fetchVendedores();
      setNombre('');
      setCorreo('');
      setEsJefe(false);
      setNombreContactoEmergencia('');
      setNumeroContactoEmergencia('');
    } catch (error) {
      console.error('Error saving seller:', error);
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
        <label>Correo:</label>
        <input 
          type="email" 
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Es Jefe:</label>
        <input 
          type="checkbox" 
          checked={esJefe}
          onChange={(e) => setEsJefe(e.target.checked)}
        />
      </div>
      <div>
        <label>Nombre Contacto de Emergencia:</label>
        <input 
          type="text" 
          value={nombreContactoEmergencia}
          onChange={(e) => setNombreContactoEmergencia(e.target.value)}
          required 
        />
      </div>
      <div>
        <label>Número Contacto de Emergencia:</label>
        <input 
          type="text" 
          value={numeroContactoEmergencia}
          onChange={(e) => setNumeroContactoEmergencia(e.target.value)}
          required 
        />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
};

export default VendedorForm;
