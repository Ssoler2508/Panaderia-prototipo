import { useState, useEffect } from 'react';
import { Invoice, InvoiceItem } from '../types';
import { invoicesApi } from '../services/mockApi';

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoicesApi.getAll();
      setInvoices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching invoices');
    } finally {
      setLoading(false);
    }
  };

  const createInvoice = async (invoice: Omit<Invoice, 'id' | 'created_at' | 'items'>, items: Omit<InvoiceItem, 'id' | 'invoice_id'>[]) => {
    try {
      const newInvoice = await invoicesApi.create(invoice, items);
      setInvoices(prev => [newInvoice, ...prev]);
      return newInvoice;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Error creating invoice');
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return {
    invoices,
    loading,
    error,
    createInvoice,
    refetch: fetchInvoices
  };
}