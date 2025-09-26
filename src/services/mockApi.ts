// Mock API service para simular una base de datos
import { Product, Invoice, InvoiceItem, DashboardStats } from '../types';

// Datos iniciales
let products: Product[] = [
  {
    id: '1',
    name: 'Pan Integral',
    description: 'Pan integral fresco y saludable',
    price: 2500,
    cost: 1500,
    stock: 20,
    min_stock: 5,
    category: 'bread',
    unit: 'unit',
    barcode: '123456789',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Croissant',
    description: 'Croissant de mantequilla francés',
    price: 1800,
    cost: 1000,
    stock: 15,
    min_stock: 3,
    category: 'pastry',
    unit: 'unit',
    barcode: '123456790',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Torta de Chocolate',
    description: 'Torta de chocolate para 8 personas',
    price: 15000,
    cost: 8000,
    stock: 2,
    min_stock: 1,
    category: 'cake',
    unit: 'unit',
    barcode: '123456791',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Empanadas de Pollo',
    description: 'Empanadas caseras de pollo',
    price: 1200,
    cost: 600,
    stock: 25,
    min_stock: 10,
    category: 'pastry',
    unit: 'unit',
    barcode: '123456792',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Café Premium',
    description: 'Café molido premium',
    price: 8000,
    cost: 5000,
    stock: 5,
    min_stock: 2,
    category: 'other',
    unit: 'kg',
    barcode: '123456793',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

let invoices: Invoice[] = [
  {
    id: '1',
    invoice_number: 'INV-20241201-001',
    customer_name: 'Juan Pérez',
    subtotal: 42000,
    tax: 7980,
    total: 49980,
    status: 'paid',
    created_at: new Date().toISOString(),
    items: [
      {
        id: '1',
        invoice_id: '1',
        product_id: '1',
        product_name: 'Pan Integral',
        quantity: 2,
        unit_price: 2500,
        total: 5000
      },
      {
        id: '2',
        invoice_id: '1',
        product_id: '2',
        product_name: 'Croissant',
        quantity: 3,
        unit_price: 1800,
        total: 5400
      }
    ]
  },
  {
    id: '2',
    invoice_number: 'INV-20241201-002',
    customer_name: 'María González',
    subtotal: 15000,
    tax: 2850,
    total: 17850,
    status: 'paid',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    items: [
      {
        id: '3',
        invoice_id: '2',
        product_id: '3',
        product_name: 'Torta de Chocolate',
        quantity: 1,
        unit_price: 15000,
        total: 15000
      }
    ]
  },
  {
    id: '3',
    invoice_number: 'INV-20241130-003',
    customer_name: 'Carlos López',
    subtotal: 6000,
    tax: 1140,
    total: 7140,
    status: 'draft',
    created_at: new Date(Date.now() - 172800000).toISOString(),
    items: [
      {
        id: '4',
        invoice_id: '3',
        product_id: '4',
        product_name: 'Empanadas de Pollo',
        quantity: 5,
        unit_price: 1200,
        total: 6000
      }
    ]
  }
];

// Simular delay de red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API de Productos
export const productsApi = {
  async getAll(): Promise<Product[]> {
    await delay(500);
    return [...products];
  },

  async getById(id: string): Promise<Product | null> {
    await delay(300);
    return products.find(p => p.id === id) || null;
  },

  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    await delay(400);
    const newProduct: Product = {
      ...product,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    products.push(newProduct);
    return newProduct;
  },

  async update(id: string, updates: Partial<Product>): Promise<Product> {
    await delay(400);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    
    products[index] = {
      ...products[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    return products[index];
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    const index = products.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    products.splice(index, 1);
  }
};

// API de Facturas
export const invoicesApi = {
  async getAll(): Promise<Invoice[]> {
    await delay(500);
    return [...invoices];
  },

  async getById(id: string): Promise<Invoice | null> {
    await delay(300);
    return invoices.find(i => i.id === id) || null;
  },

  async create(invoice: Omit<Invoice, 'id' | 'created_at' | 'items'>, items: Omit<InvoiceItem, 'id' | 'invoice_id'>[]): Promise<Invoice> {
    await delay(600);
    const newInvoice: Invoice = {
      ...invoice,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      items: items.map(item => ({
        ...item,
        id: crypto.randomUUID(),
        invoice_id: crypto.randomUUID()
      }))
    };
    invoices.unshift(newInvoice);
    return newInvoice;
  },

  async update(id: string, updates: Partial<Invoice>): Promise<Invoice> {
    await delay(400);
    const index = invoices.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Invoice not found');
    
    invoices[index] = {
      ...invoices[index],
      ...updates,
      updated_at: new Date().toISOString()
    };
    return invoices[index];
  },

  async delete(id: string): Promise<void> {
    await delay(300);
    const index = invoices.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Invoice not found');
    invoices.splice(index, 1);
  }
};

// API de Dashboard
export const dashboardApi = {
  async getStats(): Promise<DashboardStats> {
    await delay(400);
    
    const totalSales = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    
    const totalInvoices = invoices.length;
    
    const lowStockProducts = products.filter(p => p.stock <= p.min_stock).length;
    
    const totalProducts = products.length;

    return {
      totalSales,
      totalInvoices,
      lowStockProducts,
      totalProducts
    };
  },

  async getSalesData(days: number = 7): Promise<any[]> {
    await delay(300);
    
    const last7Days = Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map((date, index) => {
      // Simular datos de ventas
      const baseAmount = 20000 + (index * 5000);
      const randomVariation = Math.random() * 10000 - 5000;
      const dayTotal = Math.max(0, baseAmount + randomVariation);
      
      return {
        date: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
        ventas: Math.round(dayTotal)
      };
    });
  }
};


