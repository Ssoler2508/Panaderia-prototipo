import { useState, useEffect } from 'react';
import { Product } from '../types';
import { productsApi } from '../services/mockApi';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (err) {
      setError('Error cargando productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Crear
  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newProduct = await productsApi.create(product);
      setProducts((prev) => [...prev, newProduct]);
    } catch (err) {
      setError('Error creando producto');
      throw err;
    }
  };

  // Actualizar
  const updateProduct = async (id: string, updatedData: Partial<Product>) => {
    try {
      const updatedProduct = await productsApi.update(id, updatedData);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? updatedProduct : p))
      );
    } catch (err) {
      setError('Error actualizando producto');
      throw err;
    }
  };

  // Eliminar
  const deleteProduct = async (id: string) => {
    try {
      await productsApi.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError('Error eliminando producto');
      throw err;
    }
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
}
