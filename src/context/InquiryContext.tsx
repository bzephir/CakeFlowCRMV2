import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Inquiry, InquiryAction } from '../types';
import { mockInquiries, getNewInquiriesCount } from '../data/inquiries';

interface InquiryContextType {
  inquiries: Inquiry[];
  newInquiriesCount: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'submittedAt' | 'lastUpdated' | 'actions'>) => void;
  updateInquiry: (id: string, updates: Partial<Inquiry>) => void;
  markAsOpened: (id: string) => void;
  addAction: (inquiryId: string, action: Omit<InquiryAction, 'id' | 'performedAt'>) => void;
  deleteInquiry: (id: string) => void;
  
  // Getters
  getInquiryById: (id: string) => Inquiry | undefined;
  getInquiriesByStatus: (status: string) => Inquiry[];
  getInquiriesByType: (type: 'celebration' | 'wedding' | 'corporate') => Inquiry[];
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const useInquiryContext = () => {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error('useInquiryContext must be used within an InquiryProvider');
  }
  return context;
};

interface InquiryProviderProps {
  children: ReactNode;
}

export const InquiryProvider: React.FC<InquiryProviderProps> = ({ children }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    try {
      setInquiries(mockInquiries);
      setLoading(false);
    } catch (err) {
      setError('Failed to load inquiries');
      setLoading(false);
    }
  }, []);

  // Calculate new inquiries count
  const newInquiriesCount = inquiries.filter(inquiry => inquiry.status === 'new').length;

  // Generate unique ID for new inquiries
  const generateInquiryId = (): string => {
    const year = new Date().getFullYear();
    const existingIds = inquiries
      .map(inquiry => inquiry.id)
      .filter(id => id.startsWith(`INQ-${year}-`))
      .map(id => parseInt(id.split('-')[2]))
      .filter(num => !isNaN(num));
    
    const nextNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    return `INQ-${year}-${nextNumber.toString().padStart(3, '0')}`;
  };

  // Generate unique ID for actions
  const generateActionId = (): string => {
    return `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addInquiry = (inquiryData: Omit<Inquiry, 'id' | 'submittedAt' | 'lastUpdated' | 'actions'>) => {
    const now = new Date().toISOString();
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: generateInquiryId(),
      submittedAt: now,
      lastUpdated: now,
      actions: [
        {
          id: generateActionId(),
          type: 'status_change',
          description: 'Inquiry submitted',
          performedBy: 'System',
          performedAt: now,
          details: {
            newStatus: inquiryData.status
          }
        }
      ]
    };

    setInquiries(prev => [newInquiry, ...prev]);
  };

  const updateInquiry = (id: string, updates: Partial<Inquiry>) => {
    setInquiries(prev => prev.map(inquiry => {
      if (inquiry.id === id) {
        const updatedInquiry = {
          ...inquiry,
          ...updates,
          lastUpdated: new Date().toISOString()
        };

        // If status is being updated, add an action
        if (updates.status && updates.status !== inquiry.status) {
          const statusAction: InquiryAction = {
            id: generateActionId(),
            type: 'status_change',
            description: `Status changed from ${inquiry.status} to ${updates.status}`,
            performedBy: updates.assignedTo || 'admin',
            performedAt: new Date().toISOString(),
            details: {
              previousStatus: inquiry.status,
              newStatus: updates.status
            }
          };

          updatedInquiry.actions = [...inquiry.actions, statusAction];
        }

        return updatedInquiry;
      }
      return inquiry;
    }));
  };

  const markAsOpened = (id: string) => {
    const inquiry = inquiries.find(inq => inq.id === id);
    if (inquiry && inquiry.status === 'new') {
      updateInquiry(id, { 
        status: 'opened',
        assignedTo: 'admin' // In a real app, this would be the current user
      });
    }
  };

  const addAction = (inquiryId: string, actionData: Omit<InquiryAction, 'id' | 'performedAt'>) => {
    const newAction: InquiryAction = {
      ...actionData,
      id: generateActionId(),
      performedAt: new Date().toISOString()
    };

    setInquiries(prev => prev.map(inquiry => {
      if (inquiry.id === inquiryId) {
        return {
          ...inquiry,
          actions: [...inquiry.actions, newAction],
          lastUpdated: new Date().toISOString()
        };
      }
      return inquiry;
    }));
  };

  const deleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(inquiry => inquiry.id !== id));
  };

  const getInquiryById = (id: string): Inquiry | undefined => {
    return inquiries.find(inquiry => inquiry.id === id);
  };

  const getInquiriesByStatus = (status: string): Inquiry[] => {
    return inquiries.filter(inquiry => inquiry.status === status);
  };

  const getInquiriesByType = (type: 'celebration' | 'wedding' | 'corporate'): Inquiry[] => {
    return inquiries.filter(inquiry => inquiry.type === type);
  };

  const contextValue: InquiryContextType = {
    inquiries,
    newInquiriesCount,
    loading,
    error,
    addInquiry,
    updateInquiry,
    markAsOpened,
    addAction,
    deleteInquiry,
    getInquiryById,
    getInquiriesByStatus,
    getInquiriesByType
  };

  return (
    <InquiryContext.Provider value={contextValue}>
      {children}
    </InquiryContext.Provider>
  );
};