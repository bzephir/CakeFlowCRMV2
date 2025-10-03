import { Quote, QuoteAction } from '../types';

// Mock quote data simulating a backend database
export const mockQuotes: Quote[] = [
  {
    id: 'Q-202501-0001',
    eventType: 'wedding',
    status: 'sent',
    firstName: 'David',
    lastName: 'Fraga',
    email: 'david.fraga@example.com',
    phone: '(555) 123-4567',
    eventDate: '2025-06-15',
    fulfillmentType: 'delivery',
    deliveryTime: '14:00',
    eventTime: '16:00',
    guestCount: 150,
    budget: 'Over $5,000',
    hearAboutUs: 'Wedding Planner',
    additionalNotes: 'Looking for an elegant wedding cake that matches our color scheme.',
    details: {
      weddingDate: '2025-06-15',
      venue: 'Grand Hotel Ballroom',
      weddingSize: 'large',
      services: ['Wedding Cake', 'Groom\'s Cake', 'Dessert Table'],
      cakeStyle: 'Four-tier with cascading flowers',
      flavors: ['Vanilla Bean', 'Chocolate Raspberry', 'Lemon'],
      dietaryRestrictions: ['Nut-free option for 10 guests'],
      deliverySetup: true,
      tastingRequested: true,
      budgetRange: 'Over $5,000',
      weddingPlanner: {
        name: 'Rebecca Stone',
        company: 'Stone Events',
        contact: 'rebecca@stoneevents.com'
      }
    },
    quoteItems: [
      { id: '1', name: '4-Tier Wedding Cake', description: 'Vanilla cake with buttercream frosting', quantity: 1, unitPrice: 450.00, total: 450.00 },
      { id: '2', description: 'Custom Cake Topper', quantity: 1, unitPrice: 65.00, total: 65.00 },
      { id: '3', description: 'Delivery & Setup', quantity: 1, unitPrice: 85.00, total: 85.00 }
    ],
    subtotal: 600.00,
    discountType: 'percentage',
    discountValue: 0,
    discountAmount: 0,
    taxRate: 7.0,
    taxAmount: 42.00,
    shippingFee: 0,
    total: 642.00,
    customerNotes: 'Please ensure the cake matches our wedding colors: blush pink and gold.',
    internalNotes: 'Client is very detail-oriented. Confirm all details before production.',
    termsConditions: 'Payment terms: 50% deposit required to confirm order. Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.',
    issueDate: '2025-02-08',
    expirationDate: '2025-02-15',
    submittedAt: '2025-01-15T10:30:00Z',
    lastUpdated: '2025-01-15T10:30:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-001',
        type: 'status_change',
        description: 'Quote created',
        performedBy: 'System',
        performedAt: '2025-01-15T10:30:00Z',
        details: {
          newStatus: 'draft'
        }
      },
      {
        id: 'ACT-002',
        type: 'status_change',
        description: 'Quote sent to customer',
        performedBy: 'admin',
        performedAt: '2025-01-15T11:45:00Z',
        details: {
          previousStatus: 'draft',
          newStatus: 'sent'
        }
      },
      {
        id: 'ACT-003',
        type: 'email_sent',
        description: 'Quote email sent',
        performedBy: 'admin',
        performedAt: '2025-01-15T11:45:00Z',
        details: {
          emailSubject: 'Your Wedding Cake Quote from Sweet Delights Bakery'
        }
      }
    ]
  },
  {
    id: 'Q-202501-0002',
    eventType: 'celebration',
    status: 'accepted',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@email.com',
    phone: '(555) 234-5678',
    eventDate: '2025-03-15',
    fulfillmentType: 'pickup',
    pickupTime: '12:00',
    eventTime: '14:00',
    guestCount: 25,
    budget: '$250 - $500',
    hearAboutUs: 'Google',
    additionalNotes: 'Looking for a birthday cake with an "Under the Sea" theme.',
    details: {
      occasion: 'Birthday',
      services: ['Custom Birthday Cake', 'Cupcakes'],
      theme: 'Under the Sea',
      colors: 'Blue and Teal',
      cakeTasting: false,
      inspirationPhotos: ['photo1.jpg', 'photo2.jpg']
    },
    quoteItems: [
      { id: '1', name: 'Custom Birthday Cake', description: '2-layer chocolate cake with buttercream', quantity: 1, unitPrice: 85.00, total: 85.00 },
      { id: '2', name: 'Cupcakes (dozen)', description: 'Assorted flavors', quantity: 3, unitPrice: 36.00, total: 108.00 },
      { id: '3', name: 'Cake Pops (dozen)', description: 'Chocolate and vanilla', quantity: 2, unitPrice: 24.00, total: 48.00 }
    ],
    subtotal: 241.00,
    discountType: 'fixed',
    discountValue: 20,
    discountAmount: 20.00,
    taxRate: 7.0,
    taxAmount: 15.47,
    shippingFee: 0,
    total: 236.47,
    customerNotes: 'Theme is "Under the Sea" with blue and teal colors.',
    internalNotes: 'Customer is a repeat client, very easy to work with.',
    termsConditions: 'Payment terms: Full payment required at time of pickup. Cancellations with less than 48 hours notice are subject to 50% fee.',
    issueDate: '2025-02-03',
    expirationDate: '2025-02-10',
    submittedAt: '2025-01-10T14:45:00Z',
    lastUpdated: '2025-01-11T09:15:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-004',
        type: 'status_change',
        description: 'Quote created',
        performedBy: 'System',
        performedAt: '2025-01-10T14:45:00Z',
        details: {
          newStatus: 'draft'
        }
      },
      {
        id: 'ACT-005',
        type: 'status_change',
        description: 'Quote sent to customer',
        performedBy: 'admin',
        performedAt: '2025-01-10T15:30:00Z',
        details: {
          previousStatus: 'draft',
          newStatus: 'sent'
        }
      },
      {
        id: 'ACT-006',
        type: 'email_sent',
        description: 'Quote email sent',
        performedBy: 'admin',
        performedAt: '2025-01-10T15:30:00Z',
        details: {
          emailSubject: 'Your Birthday Cake Quote from Sweet Delights Bakery'
        }
      },
      {
        id: 'ACT-007',
        type: 'status_change',
        description: 'Quote accepted by customer',
        performedBy: 'admin',
        performedAt: '2025-01-11T09:15:00Z',
        details: {
          previousStatus: 'sent',
          newStatus: 'accepted'
        }
      }
    ]
  },
  {
    id: 'Q-202501-0003',
    eventType: 'corporate',
    status: 'draft',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@email.com',
    phone: '(555) 345-6789',
    eventDate: '2025-02-16',
    fulfillmentType: 'delivery',
    deliveryTime: '10:00',
    eventTime: '12:00',
    guestCount: 50,
    budget: '$500 - $1,000',
    hearAboutUs: 'Referral',
    additionalNotes: 'Need corporate-branded desserts for company event.',
    details: {
      companyName: 'TechCorp Solutions',
      occasion: 'Product Launch',
      services: ['Corporate Cupcakes', 'Branded Cookies'],
      recurring: false,
      brandingRequired: true,
      deliveryAddress: '789 Tech Plaza, Suite 400',
      contactPerson: {
        name: 'Mike Chen',
        title: 'Marketing Director',
        department: 'Marketing'
      },
      approvalProcess: 'Requires approval from finance department',
      invoicingRequirements: 'PO required for all orders'
    },
    quoteItems: [
      { id: '1', name: 'Corporate Cupcakes', description: 'With company logo', quantity: 48, unitPrice: 2.50, total: 120.00 }
    ],
    subtotal: 120.00,
    discountType: 'percentage',
    discountValue: 0,
    discountAmount: 0,
    taxRate: 7.0,
    taxAmount: 8.40,
    shippingFee: 25.00,
    total: 153.40,
    customerNotes: 'Please ensure cupcakes have our company logo as discussed.',
    internalNotes: 'Need to get high-resolution logo from client for printing.',
    termsConditions: 'Payment terms: Net 30 days. PO required for all orders.',
    issueDate: '2025-01-30',
    expirationDate: '2025-02-05',
    submittedAt: '2025-01-05T11:20:00Z',
    lastUpdated: '2025-01-05T11:20:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-008',
        type: 'status_change',
        description: 'Quote created',
        performedBy: 'System',
        performedAt: '2025-01-05T11:20:00Z',
        details: {
          newStatus: 'draft'
        }
      }
    ]
  }
];

// Helper functions for working with quote data
export const getQuotesByStatus = (status: string): Quote[] => {
  return mockQuotes.filter(quote => quote.status === status);
};

export const getNewQuotesCount = (): number => {
  return mockQuotes.filter(quote => quote.status === 'draft').length;
};

export const getQuoteById = (id: string): Quote | undefined => {
  return mockQuotes.find(quote => quote.id === id);
};

export const getQuotesByType = (type: 'celebration' | 'wedding' | 'corporate'): Quote[] => {
  return mockQuotes.filter(quote => quote.type === type);
};

export const getRecentQuotes = (limit: number = 5): Quote[] => {
  return mockQuotes
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, limit);
};