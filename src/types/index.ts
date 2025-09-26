 export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  cost: number;
  stock: number;
  min_stock: number;
  category: 'bread' | 'pastry' | 'cake' | 'ingredient' | 'other';
  unit: 'kg' | 'unit' | 'liter' | 'gram';
  barcode?: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_id?: string;
  customer_name?: string;
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'paid' | 'cancelled';
  created_at: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: string;
  invoice_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface InventoryMovement {
  id: string;
  product_id: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  created_at: string;
}

export interface DashboardStats {
  totalSales: number;
  totalInvoices: number;
  lowStockProducts: number;
  totalProducts: number;
}