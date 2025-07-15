import { Order, OrderAction } from '../types';

// Mock order data simulating a backend database
export const mockOrders: Order[] = [
  {
    id: 'O-202501-0001',
    type: 'wedding',
    status: 'in-production',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@email.com',
    phone: '(555) 123-4567',
    eventDate: '2025-01-15',
    fulfillmentType: 'delivery',
    deliveryTime: '13:00',
    eventTime: '15:00',
    guestCount: 120,
    budget: '$2,500 - $5,000',
    hearAboutUs: 'Instagram',
    additionalNotes: 'Cake should match wedding colors: blush pink and gold.',
    details: {
      weddingDate: '2025-01-15',
      venue: 'Grand Ballroom at The Plaza',
      weddingSize: 'medium',
      services: ['Wedding Cake', 'Groom\'s Cake', 'Dessert Table'],
      cakeStyle: 'Three-tier with fresh flowers',
      flavors: ['Vanilla Bean', 'Chocolate Raspberry', 'Lemon'],
      dietaryRestrictions: ['Gluten-free option for 10 guests'],
      deliverySetup: true,
      tastingRequested: true,
      budgetRange: '$2,500 - $5,000',
      weddingPlanner: {
        name: 'Sarah Mitchell',
        company: 'Elegant Events Co.',
        contact: 'sarah@elegantevents.com'
      }
    },
    orderItems: [
      { id: '1', name: '3-Tier Wedding Cake', description: 'Vanilla cake with buttercream frosting', quantity: 1, unitPrice: 450.00, total: 450.00 }
    ],
    payments: [
      { id: '1', date: '2025-01-01', amount: 225.00, method: 'Credit Card', reference: 'TXID-12345' }
    ],
    subtotal: 450.00,
    taxRate: 7.0,
    taxAmount: 31.50,
    total: 481.50,
    depositAmount: 225.00,
    balance: 256.50,
    specialInstructions: 'Cake should match wedding colors: blush pink and gold.',
    deliveryNotes: 'Delivery to venue at 1:00 PM. Ask for event coordinator at main entrance.',
    submittedAt: '2025-01-01T10:30:00Z',
    lastUpdated: '2025-01-05T14:15:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-001',
        type: 'status_change',
        description: 'Order created',
        performedBy: 'System',
        performedAt: '2025-01-01T10:30:00Z',
        details: {
          newStatus: 'inquiry'
        }
      },
      {
        id: 'ACT-002',
        type: 'status_change',
        description: 'Order confirmed',
        performedBy: 'admin',
        performedAt: '2025-01-02T09:15:00Z',
        details: {
          previousStatus: 'inquiry',
          newStatus: 'confirmed'
        }
      },
      {
        id: 'ACT-003',
        type: 'payment_received',
        description: 'Deposit payment received',
        performedBy: 'admin',
        performedAt: '2025-01-02T09:20:00Z',
        details: {
          amount: 225.00,
          method: 'Credit Card',
          reference: 'TXID-12345'
        }
      },
      {
        id: 'ACT-004',
        type: 'status_change',
        description: 'Order moved to production',
        performedBy: 'admin',
        performedAt: '2025-01-05T14:15:00Z',
        details: {
          previousStatus: 'confirmed',
          newStatus: 'in-production'
        }
      }
    ]
  },
  {
    id: 'O-202501-0002',
    type: 'celebration',
    status: 'confirmed',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@email.com',
    phone: '(555) 234-5678',
    eventDate: '2025-01-16',
    fulfillmentType: 'pickup',
    pickupTime: '15:30',
    eventTime: '17:00',
    guestCount: 25,
    budget: '$250 - $500',
    hearAboutUs: 'Google',
    additionalNotes: 'Birthday cake for 40th celebration. Include "Happy 40th Mike!" text.',
    details: {
      occasion: 'Birthday',
      services: ['Custom Birthday Cake', 'Cupcakes'],
      theme: '40th Birthday Celebration',
      colors: 'Blue and Silver',
      cakeTasting: false,
      inspirationPhotos: ['photo1.jpg']
    },
    orderItems: [
      { id: '1', name: 'Custom Birthday Cake', description: 'Chocolate cake with chocolate ganache', quantity: 1, unitPrice: 85.00, total: 85.00 },
      { id: '2', name: 'Cupcakes (dozen)', description: 'Assorted flavors', quantity: 1, unitPrice: 36.00, total: 36.00 }
    ],
    payments: [
      { id: '1', date: '2025-01-05', amount: 60.00, method: 'Cash' }
    ],
    subtotal: 121.00,
    taxRate: 7.0,
    taxAmount: 8.47,
    total: 129.47,
    depositAmount: 60.00,
    balance: 69.47,
    specialInstructions: 'Birthday cake for 40th celebration. Include "Happy 40th Mike!" text.',
    deliveryNotes: '',
    submittedAt: '2025-01-05T11:45:00Z',
    lastUpdated: '2025-01-05T11:45:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-005',
        type: 'status_change',
        description: 'Order created',
        performedBy: 'System',
        performedAt: '2025-01-05T11:45:00Z',
        details: {
          newStatus: 'inquiry'
        }
      },
      {
        id: 'ACT-006',
        type: 'status_change',
        description: 'Order confirmed',
        performedBy: 'admin',
        performedAt: '2025-01-05T14:30:00Z',
        details: {
          previousStatus: 'inquiry',
          newStatus: 'confirmed'
        }
      },
      {
        id: 'ACT-007',
        type: 'payment_received',
        description: 'Deposit payment received',
        performedBy: 'admin',
        performedAt: '2025-01-05T14:35:00Z',
        details: {
          amount: 60.00,
          method: 'Cash'
        }
      }
    ]
  },
  {
    id: 'O-202501-0003',
    type: 'corporate',
    status: 'quoted',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma@email.com',
    phone: '(555) 345-6789',
    eventDate: '2025-01-18',
    fulfillmentType: 'delivery',
    deliveryTime: '15:30',
    eventTime: '16:00',
    guestCount: 50,
    budget: '$500 - $1,000',
    hearAboutUs: 'Referral',
    additionalNotes: 'All items must have company branding as per provided logo.',
    details: {
      companyName: 'TechCorp Solutions',
      eventType: 'Product Launch',
      services: ['Corporate Cupcakes', 'Branded Cookies'],
      recurring: false,
      brandingRequired: true,
      deliveryAddress: 'TechCorp Headquarters, 789 Tech Plaza',
      contactPerson: {
        name: 'Emma Davis',
        title: 'Event Coordinator',
        department: 'Marketing'
      },
      approvalProcess: 'Requires approval from department head',
      invoicingRequirements: 'PO required for all orders'
    },
    orderItems: [
      { id: '1', name: 'Corporate Cupcakes', description: 'With company logo', quantity: 48, unitPrice: 2.50, total: 120.00 },
      { id: '2', name: 'Branded Cookies', description: 'Company logo cookies', quantity: 48, unitPrice: 3.00, total: 144.00 },
      { id: '3', name: 'Delivery', description: 'Delivery to corporate office', quantity: 1, unitPrice: 25.00, total: 25.00 }
    ],
    payments: [],
    subtotal: 289.00,
    taxRate: 7.0,
    taxAmount: 20.23,
    total: 309.23,
    depositAmount: 0.00,
    balance: 309.23,
    specialInstructions: 'All items must have company branding as per provided logo.',
    deliveryNotes: 'Deliver to reception desk. Contact Emma upon arrival.',
    submittedAt: '2025-01-10T09:30:00Z',
    lastUpdated: '2025-01-10T09:30:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-008',
        type: 'status_change',
        description: 'Order created',
        performedBy: 'System',
        performedAt: '2025-01-10T09:30:00Z',
        details: {
          newStatus: 'inquiry'
        }
      },
      {
        id: 'ACT-009',
        type: 'quote_sent',
        description: 'Quote sent to customer',
        performedBy: 'admin',
        performedAt: '2025-01-10T10:15:00Z',
        details: {
          quoteId: 'Q-202501-0004'
        }
      },
      {
        id: 'ACT-010',
        type: 'status_change',
        description: 'Order status updated to quoted',
        performedBy: 'admin',
        performedAt: '2025-01-10T10:15:00Z',
        details: {
          previousStatus: 'inquiry',
          newStatus: 'quoted'
        }
      }
    ]
  }
];

// Helper functions for working with order data
export const getOrdersByStatus = (status: string): Order[] => {
  return mockOrders.filter(order => order.status === status);
};

export const getNewOrdersCount = (): number => {
  return mockOrders.filter(order => order.status === 'inquiry').length;
};

export const getOrderById = (id: string): Order | undefined => {
  return mockOrders.find(order => order.id === id);
};

export const getOrdersByType = (type: 'celebration' | 'wedding' | 'corporate'): Order[] => {
  return mockOrders.filter(order => order.type === type);
};

export const getRecentOrders = (limit: number = 5): Order[] => {
  return mockOrders
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, limit);
};