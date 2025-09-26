import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Invoices from './components/Invoices';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="customers" element={<div className="p-8 text-center text-gray-500">Módulo de Clientes - Próximamente</div>} />
          <Route path="reports" element={<div className="p-8 text-center text-gray-500">Módulo de Reportes - Próximamente</div>} />
          <Route path="settings" element={<div className="p-8 text-center text-gray-500">Configuración - Próximamente</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
