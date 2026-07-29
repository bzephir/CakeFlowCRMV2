import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, OrderAction } from '../types';
import { mockOrdersList, getNewOrdersCount } from '../data/mockData';

interface OrderContextType {
  orders: Order[];
  newOrdersCount: number;
  loading: boolean;
  error: string | null;
  
  // Actions
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'lastUpdated' | 'actions'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  markAsOpened: (id: string) => void;
  addAction: (orderId: string, action: Omit<OrderAction, 'id' | 'performedAt'>) => void;
  deleteOrder: (id: string) => void;
  
  // Getters
  getOrderById: (id: string) => Order | undefined;
  getOrdersByStatus: (status: string) => Order[];
  getOrdersByType: (type: 'celebration' | 'wedding' | 'corporate') => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrderContext must be used within an OrderProvider');
  }
  return context;
};

interface OrderProviderProps {
  children: ReactNode;
}

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize with mock data
  useEffect(() => {
    try {
      setOrders(mockOrdersList as any);
      setLoading(false);
    } catch (err) {
      setError('Failed to load orders');
      setLoading(false);
    }
  }, []);

  // Calculate new orders count
  const newOrdersCount = orders.filter(order => order.status === 'inquiry').length;

  // Generate unique ID for new orders
  const generateOrderId = (): string => {
    const year = new Date().getFullYear();
    const existingIds = orders
      .map(order => order.id)
      .filter(id => id.startsWith(`O-${year}-`))
      .map(id => parseInt(id.split('-')[2]))
      .filter(num => !isNaN(num));
    
    const nextNumber = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
    return `O-${year}-${nextNumber.toString().padStart(4, '0')}`;
  };

  // Generate unique ID for actions
  const generateActionId = (): string => {
    return `ACT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'lastUpdated' | 'actions'>) => {
    const now = new Date().toISOString();
    const newOrder: Order = {
      ...orderData,
      id: generateOrderId(),
      createdAt: now,
      lastUpdated: now,
      actions: [
        {
          id: generateActionId(),
          type: 'status_change',
          description: 'Order created',
          performedBy: 'System',
          performedAt: now,
          details: {
            newStatus: orderData.status
          }
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => {
      if (order.id === id) {
        const updatedOrder = {
          ...order,
          ...updates,
          lastUpdated: new Date().toISOString()
        };

        // If status is being updated, add an action
        if (updates.status && updates.status !== order.status) {
          const statusAction: OrderAction = {
            id: generateActionId(),
            type: 'status_change',
            description: `Status changed from ${order.status} to ${updates.status}`,
            performedBy: updates.assignedTo || 'admin',
            performedAt: new Date().toISOString(),
            details: {
              previousStatus: order.status,
              newStatus: updates.status
            }
          };

          updatedOrder.actions = [...order.actions, statusAction];
        }

        return updatedOrder;
      }
      return order;
    }));
  };

  const markAsOpened = (id: string) => {
    const order = orders.find(o => o.id === id);
    if (order && order.status === 'inquiry') {
      updateOrder(id, { 
        status: 'quoted',
        assignedTo: 'admin' // In a real app, this would be the current user
      });
    }
  };

  const addAction = (orderId: string, actionData: Omit<OrderAction, 'id' | 'performedAt'>) => {
    const newAction: OrderAction = {
      ...actionData,
      id: generateActionId(),
      performedAt: new Date().toISOString()
    };

    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          actions: [...order.actions, newAction],
          lastUpdated: new Date().toISOString()
        };
      }
      return order;
    }));
  };

  const deleteOrder = (id: string) => {
    setOrders(prev => prev.filter(order => order.id !== id));
  };

  const getOrderById = (id: string): Order | undefined => {
    return orders.find(order => order.id === id);
  };

  const getOrdersByStatus = (status: string): Order[] => {
    return orders.filter(order => order.status === status);
  };

  const getOrdersByType = (type: 'celebration' | 'wedding' | 'corporate'): Order[] => {
    return orders.filter(order => order.type === type);
  };

  const contextValue: OrderContextType = {
    orders,
    newOrdersCount,
    loading,
    error,
    addOrder,
    updateOrder,
    markAsOpened,
    addAction,
    deleteOrder,
    getOrderById,
    getOrdersByStatus,
    getOrdersByType
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};