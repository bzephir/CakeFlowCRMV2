import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Invoice, Payment } from '../types';
import { mockInvoices, getOverdueInvoicesCount, getPendingInvoicesCount } from '../data/invoices';

interface InvoiceContextType {
  invoices: Invoice[];
  overdueInvoicesCount: number;
  pendingInvoicesCount: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  addInvoice: (invoice: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateInvoice: (id: string, updates: Partial<Invoice>) => void;
  deleteInvoice: (id: string) => void;
  recordPayment: (invoiceId: string, payment: Omit<Payment, 'id'>) => void;
  
  // Getters
  getInvoiceById: (id: string) => Invoice | undefined;
  getInvoicesByStatus: (status: string) => Invoice[];
  getInvoicesByCustomer: (email: string) => Invoice[];
  getTotalRevenue: () => number;
  getTotalOutstanding: () => number;
}

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);
  if (context === undefined) {
    throw new Error('useInvoiceContext must be used within an InvoiceProvider');
  }
  return context;
};

interface InvoiceProviderProps {
  children: ReactNode;
}

export const InvoiceProvider: React.FC<InvoiceProviderProps> = ({ children }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    try {
      setInvoices(mockInvoices);
      setLoading(false);
    } catch (err) {
      setError('Failed to load invoices');
      setLoading(false);
    }
  }, []);

  // Calculate counts
  const overdueInvoicesCount = invoices.filter(invoice => invoice.status === 'overdue').length;
  const pendingInvoicesCount = invoices.filter(invoice => 
    invoice.status === 'pending' || invoice.status === 'partial' || invoice.status === 'deposit_paid'
  ).length;

  // Generate unique ID for new invoices
  const generateInvoiceId = (): string => {
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const existingIds = invoices
      .map(invoice => invoice.id)
      .filter(id => id.startsWith(`I-${year}${month}-`))
      .map(id => parseInt(id.split('-')[2]))
      .filter(num => !isNaN(num));
    
    const nextNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    return `I-${year}${month}-${nextNumber.toString().padStart(4, '0')}`;
  };

  // Generate unique ID for payments
  const generatePaymentId = (): string => {
    return `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newInvoice: Invoice = {
      ...invoiceData,
      id: generateInvoiceId(),
      createdAt: now,
      updatedAt: now
    };

    setInvoices(prev => [newInvoice, ...prev]);
  };

  const updateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(prev => prev.map(invoice => {
      if (invoice.id === id) {
        const updatedInvoice = {
          ...invoice,
          ...updates,
          updatedAt: new Date().toISOString()
        };

        // Recalculate balance if payments or total changed
        if (updates.payments || updates.total) {
          const totalPaid = (updates.payments || invoice.payments).reduce((sum, payment) => sum + payment.amount, 0);
          const total = updates.total || invoice.total;
          updatedInvoice.amountPaid = totalPaid;
          updatedInvoice.balance = total - totalPaid;
          
          // Update status based on payment
          if (updatedInvoice.balance <= 0) {
            updatedInvoice.status = 'paid';
          } else if (updatedInvoice.amountPaid > 0) {
            updatedInvoice.status = 'partial';
          }
        }

        return updatedInvoice;
      }
      return invoice;
    }));
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(invoice => invoice.id !== id));
  };

  const recordPayment = (invoiceId: string, paymentData: Omit<Payment, 'id'>) => {
    const payment: Payment = {
      ...paymentData,
      id: generatePaymentId()
    };

    setInvoices(prev => prev.map(invoice => {
      if (invoice.id === invoiceId) {
        const updatedPayments = [...invoice.payments, payment];
        const totalPaid = updatedPayments.reduce((sum, p) => sum + p.amount, 0);
        const balance = invoice.total - totalPaid;
        
        let status = invoice.status;
        if (balance <= 0) {
          status = 'paid';
        } else if (totalPaid > 0) {
          status = totalPaid < invoice.total * 0.5 ? 'deposit_paid' : 'partial';
        }

        return {
          ...invoice,
          payments: updatedPayments,
          amountPaid: totalPaid,
          balance: Math.max(0, balance),
          status,
          updatedAt: new Date().toISOString()
        };
      }
      return invoice;
    }));
  };

  const getInvoiceById = (id: string): Invoice | undefined => {
    return invoices.find(invoice => invoice.id === id);
  };

  const getInvoicesByStatus = (status: string): Invoice[] => {
    return invoices.filter(invoice => invoice.status === status);
  };

  const getInvoicesByCustomer = (email: string): Invoice[] => {
    return invoices.filter(invoice => invoice.email.toLowerCase() === email.toLowerCase());
  };

  const getTotalRevenue = (): number => {
    return invoices.reduce((sum, invoice) => sum + invoice.total, 0);
  };

  const getTotalOutstanding = (): number => {
    return invoices.reduce((sum, invoice) => sum + invoice.balance, 0);
  };

  const contextValue: InvoiceContextType = {
    invoices,
    overdueInvoicesCount,
    pendingInvoicesCount,
    loading,
    error,
    addInvoice,
    updateInvoice,
    deleteInvoice,
    recordPayment,
    getInvoiceById,
    getInvoicesByStatus,
    getInvoicesByCustomer,
    getTotalRevenue,
    getTotalOutstanding
  };

  return (
    <InvoiceContext.Provider value={contextValue}>
      {children}
    </InvoiceContext.Provider>
  );
};