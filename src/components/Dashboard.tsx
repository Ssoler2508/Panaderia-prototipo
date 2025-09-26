import React, { useState, useEffect } from 'react';
import { DashboardStats } from '../types';
import { dashboardApi } from '../services/mockApi';
import { 
  DollarSign, 
  FileText, 
  Package, 
  AlertTriangle,
  TrendingUp,
  ShoppingCart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalInvoices: 0,
    lowStockProducts: 0,
    totalProducts: 0
  });
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Obtener estadísticas
      const statsData = await dashboardApi.getStats();
      setStats(statsData);

      // Obtener datos de ventas para el gráfico
      const salesData = await dashboardApi.getSalesData(7);
      setSalesData(salesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Ventas Totales',
      value: `$${stats.totalSales.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600 bg-green-100'
    },
    {
      name: 'Facturas',
      value: stats.totalInvoices.toString(),
      icon: FileText,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      name: 'Productos',
      value: stats.totalProducts.toString(),
      icon: Package,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      name: 'Stock Bajo',
      value: stats.lowStockProducts.toString(),
      icon: AlertTriangle,
      color: 'text-red-600 bg-red-100'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Resumen general de tu panadería</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Ventas de los últimos 7 días</h2>
          <TrendingUp className="h-5 w-5 text-gray-400" />
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Ventas']} />
              <Bar dataKey="ventas" fill="#d97706" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button className="flex items-center justify-center space-x-2 bg-amber-600 text-white px-4 py-3 rounded-lg hover:bg-amber-700 transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span>Nueva Venta</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <Package className="h-5 w-5" />
            <span>Agregar Producto</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors">
            <FileText className="h-5 w-5" />
            <span>Ver Reportes</span>
          </button>
        </div>
      </div>
    </div>
  );
}