import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Quote, QuoteAction } from '../types';
import { mockQuotesList, getNewQuotesCount } from '../data/mockData';

interface QuoteContextType {
  quotes: Quote[];
  newQuotesCount: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  addQuote: (quote: Omit<Quote, 'id' | 'createdAt' | 'lastUpdated' | 'actions'>) => void;
  updateQuote: (id: string, updates: Partial<Quote>) => void;
  markAsOpened: (id: string) => void;
  addAction: (quoteId: string, action: Omit<QuoteAction, 'id' | 'performedAt'>) => void;
  deleteQuote: (id: string) => void;
  
  // Getters
  getQuoteById: (id: string) => Quote | undefined;
  getQuotesByStatus: (status: string) => Quote[];
  getQuotesByType: (type: 'celebration' | 'wedding' | 'corporate') => Quote[];
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined);

export const useQuoteContext = () => {
  const context = useContext(QuoteContext);
  if (context === undefined) {
    throw new Error('useQuoteContext must be used within a QuoteProvider');
  }
  return context;
};

interface QuoteProviderProps {
  children: ReactNode;
}

export const QuoteProvider: React.FC<QuoteProviderProps> = ({ children }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    try {
      setQuotes(mockQuotesList as any);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quotes');
      setLoading(false);
    }
  }, []);

  // Calculate new quotes count
  const newQuotesCount = quotes.filter(quote => quote.status === 'draft').length;

  // Generate unique ID for new quotes
  const generateQuoteId = (): string => {
    const year = new Date().getFullYear();
    const existingIds = quotes
      .map(quote => quote.id)
      .filter(id => id.startsWith(`Q-${year}-`))
      .map(id => parseInt(id.split('-')[2]))
      .filter(num => !isNaN(num));
    
    const nextNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    return `Q-${year}-${nextNumber.toString().padStart(4, '0')}`;
  };

  // Generate unique ID for actions
  const generateActionId = (): string => {
    return `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addQuote = (quoteData: Omit<Quote, 'id' | 'createdAt' | 'lastUpdated' | 'actions'>) => {
    const now = new Date().toISOString();
    const newQuote: Quote = {
      ...quoteData,
      id: generateQuoteId(),
      createdAt: now,
      lastUpdated: now,
      actions: [
        {
          id: generateActionId(),
          type: 'status_change',
          description: 'Quote created',
          performedBy: 'System',
          performedAt: now,
          details: {
            newStatus: quoteData.status
          }
        }
      ]
    };

    setQuotes(prev => [newQuote, ...prev]);
  };

  const updateQuote = (id: string, updates: Partial<Quote>) => {
    setQuotes(prev => prev.map(quote => {
      if (quote.id === id) {
        const updatedQuote = {
          ...quote,
          ...updates,
          lastUpdated: new Date().toISOString()
        };

        // If status is being updated, add an action
        if (updates.status && updates.status !== quote.status) {
          const statusAction: QuoteAction = {
            id: generateActionId(),
            type: 'status_change',
            description: `Status changed from ${quote.status} to ${updates.status}`,
            performedBy: updates.assignedTo || 'admin',
            performedAt: new Date().toISOString(),
            details: {
              previousStatus: quote.status,
              newStatus: updates.status
            }
          };

          updatedQuote.actions = [...quote.actions, statusAction];
        }

        return updatedQuote;
      }
      return quote;
    }));
  };

  const markAsOpened = (id: string) => {
    const quote = quotes.find(q => q.id === id);
    if (quote && quote.status === 'draft') {
      updateQuote(id, { 
        status: 'sent',
        assignedTo: 'admin' // In a real app, this would be the current user
      });
    }
  };

  const addAction = (quoteId: string, actionData: Omit<QuoteAction, 'id' | 'performedAt'>) => {
    const newAction: QuoteAction = {
      ...actionData,
      id: generateActionId(),
      performedAt: new Date().toISOString()
    };

    setQuotes(prev => prev.map(quote => {
      if (quote.id === quoteId) {
        return {
          ...quote,
          actions: [...quote.actions, newAction],
          lastUpdated: new Date().toISOString()
        };
      }
      return quote;
    }));
  };

  const deleteQuote = (id: string) => {
    setQuotes(prev => prev.filter(quote => quote.id !== id));
  };

  const getQuoteById = (id: string): Quote | undefined => {
    return quotes.find(quote => quote.id === id);
  };

  const getQuotesByStatus = (status: string): Quote[] => {
    return quotes.filter(quote => quote.status === status);
  };

  const getQuotesByType = (type: 'celebration' | 'wedding' | 'corporate'): Quote[] => {
    return quotes.filter(quote => quote.type === type);
  };

  const contextValue: QuoteContextType = {
    quotes,
    newQuotesCount,
    loading,
    error,
    addQuote,
    updateQuote,
    markAsOpened,
    addAction,
    deleteQuote,
    getQuoteById,
    getQuotesByStatus,
    getQuotesByType
  };

  return (
    <QuoteContext.Provider value={contextValue}>
      {children}
    </QuoteContext.Provider>
  );
};