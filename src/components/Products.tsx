import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { Plus, Edit, Trash2, Package, AlertTriangle } from 'lucide-react';
import ProductForm from './ProductForm';

export default function Products() {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ✅ Guardar (crear o editar)
  const handleSubmit = async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error saving product:', err.message);
      } else {
        console.error('Unexpected error saving product:', err);
      }
    }
  };

  // ✅ Editar
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  // ✅ Eliminar
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    try {
      await deleteProduct(id);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error deleting product:', err.message);
      } else {
        console.error('Unexpected error deleting product:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Package className="w-6 h-6" /> Productos
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </div>

      {/* 🔄 Estado de carga */}
      {loading && <p>Cargando productos...</p>}

      {/* ⚠️ Error */}
      {error && (
        <div className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="w-5 h-5" /> {error}
        </div>
      )}

      {/* 📝 Formulario */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingProduct(null);
          }}
        />
      )}

      {/* 📦 Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.stock <= product.min_stock 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {product.stock <= product.min_stock ? 'Stock Bajo' : 'En Stock'}
              </span>
            </div>
            
            {product.description && (
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            )}
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Precio:</span>
                <span className="font-semibold text-green-600">${product.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Costo:</span>
                <span className="text-gray-700">${product.cost?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stock:</span>
                <span className="font-medium">{product.stock} {product.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Categoría:</span>
                <span className="capitalize text-gray-700">{product.category}</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 flex items-center justify-center gap-2 text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50 px-3 py-2 rounded-md transition-colors"
              >
                <Edit className="w-4 h-4" /> Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 flex items-center justify-center gap-2 text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-2 rounded-md transition-colors"
              >
                <Trash2 className="w-4 h-4" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
