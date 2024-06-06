// src/pages/Categorias.js

import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CategoriaForm from '../components/CategoriaForm';  // Importa el componente

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await api.get('/categorias/');
      setCategorias(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/categorias/${id}/`);
      fetchCategorias();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div>
      <h1>Categorías</h1>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            {categoria.nombre}
            <button onClick={() => setSelectedCategoria(categoria)}>Editar</button>
            <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {selectedCategoria && <CategoriaForm categoria={selectedCategoria} fetchCategorias={fetchCategorias} setSelectedCategoria={setSelectedCategoria} />}
      <CategoriaForm fetchCategorias={fetchCategorias} />
    </div>
  );
};

export default Categorias;

