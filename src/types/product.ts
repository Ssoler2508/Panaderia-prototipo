// src/types/product.ts
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  cost?: number;
  stock?: number;
  min_stock?: number;
  category?: string;
  unit?: string;
  barcode?: string;
  created_at: string;
  updated_at: string;
}
