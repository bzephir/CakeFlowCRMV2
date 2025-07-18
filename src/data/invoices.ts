import { Invoice } from '../types';

// Mock invoice data simulating a backend database
export const mockInvoices: Invoice[] = [
  {
    id: 'I-202501-0001',
    invoiceNumber: 'I-202501-0001',
    orderId: 'O-202501-0001',
    firstName: 'David',
    lastName: 'Fraga',
    email: 'david.fraga@example.com',
    phone: '(555) 123-4567',
    address1: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701',
    eventType: 'wedding',
    eventName: 'David & Maria Wedding',
    eventDate: '2025-06-15',
    eventTime: '16:00',
    guestCount: 100,
    fulfillmentType: 'delivery',
    deliveryTime: '14:00',
    venue: 'Grand Hotel Ballroom',
    items: [
      { id: '1', name: '3-Tier Wedding Cake', description: 'Vanilla cake with buttercream frosting', quantity: 1, unitPrice: 450.00, total: 450.00 },
      { id: '2', name: 'Custom Cake Topper', description: 'Personalized bride and groom topper', quantity: 1, unitPrice: 65.00, total: 65.00 },
      { id: '3', name: 'Delivery & Setup', description: 'Professional delivery and setup service', quantity: 1, unitPrice: 85.00, total: 85.00 }
    ],
    subtotal: 600.00,
    taxRate: 7.0,
    taxAmount: 42.00,
    total: 642.00,
    payments: [
      { id: '1', date: '2025-01-15', amount: 300.00, method: 'Credit Card', reference: 'TXID-12345' }
    ],
    amountPaid: 300.00,
    balance: 342.00,
    nextPaymentDueDate: '2025-06-01',
    status: 'deposit_paid',
    issueDate: '2025-01-15',
    dueDate: '2025-06-01',
    notes: 'Cake design to match wedding colors: blush pink and gold. Flavors: vanilla cake with strawberry filling (top tier), chocolate cake with raspberry filling (middle tier), and lemon cake with blueberry filling (bottom tier).',
    internalNotes: 'High-priority client. Ensure all details are confirmed before production.',
    termsConditions: 'Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.',
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },
  {
    id: 'I-202501-0002',
    invoiceNumber: 'I-202501-0002',
    orderId: 'O-202501-0002',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah@email.com',
    phone: '(555) 234-5678',
    address1: '456 Oak Avenue',
    city: 'Springfield',
    state: 'IL',
    zip: '62702',
    eventType: 'celebration',
    eventName: '30th Birthday Celebration',
    eventDate: '2025-01-15',
    eventTime: '14:00',
    guestCount: 25,
    fulfillmentType: 'pickup',
    pickupTime: '12:00',
    venue: 'Private Residence',
    items: [
      { id: '1', name: 'Custom Birthday Cake', description: 'Chocolate cake with chocolate ganache', quantity: 1, unitPrice: 85.00, total: 85.00 },
      { id: '2', name: 'Cupcakes (dozen)', description: 'Assorted flavors with themed decorations', quantity: 3, unitPrice: 36.00, total: 108.00 },
      { id: '3', name: 'Cake Pops (dozen)', description: 'Chocolate and vanilla cake pops', quantity: 2, unitPrice: 24.00, total: 48.00 }
    ],
    subtotal: 241.00,
    taxRate: 7.0,
    taxAmount: 16.87,
    total: 257.87,
    payments: [
      { id: '1', date: '2025-01-10', amount: 257.87, method: 'Cash' }
    ],
    amountPaid: 257.87,
    balance: 0.00,
    status: 'paid',
    issueDate: '2025-01-10',
    dueDate: '2025-01-15',
    notes: 'Birthday cake for 30th celebration with blue and silver theme.',
    termsConditions: 'All sales are final. No refunds for picked-up items.',
    createdAt: '2025-01-10T14:20:00Z',
    updatedAt: '2025-01-10T16:45:00Z'
  },
  {
    id: 'I-202501-0003',
    invoiceNumber: 'I-202501-0003',
    orderId: 'O-202501-0003',
    firstName: 'Mike',
    lastName: 'Chen',
    email: 'mike@email.com',
    phone: '(555) 345-6789',
    address1: '789 Pine Road',
    city: 'Springfield',
    state: 'IL',
    zip: '62703',
    eventType: 'corporate',
    eventName: 'TechCorp Product Launch',
    eventDate: '2025-01-16',
    eventTime: '12:00',
    guestCount: 250,
    fulfillmentType: 'delivery',
    deliveryTime: '10:30',
    venue: 'TechCorp Office',
    items: [
      { id: '1', name: 'Corporate Cupcakes', description: 'With company logo', quantity: 48, unitPrice: 2.50, total: 120.00 },
      { id: '2', name: 'Delivery Fee', description: 'Corporate delivery service', quantity: 1, unitPrice: 25.00, total: 25.00 }
    ],
    subtotal: 145.00,
    taxRate: 7.0,
    taxAmount: 10.15,
    total: 155.15,
    payments: [],
    amountPaid: 0.00,
    balance: 155.15,
    status: 'overdue',
    issueDate: '2025-01-05',
    dueDate: '2025-02-04',
    notes: 'Cupcakes with company logo as per provided design.',
    internalNotes: 'Client has been contacted multiple times regarding overdue payment.',
    termsConditions: 'Payment due within 30 days of invoice date. Late payments subject to 1.5% monthly interest.',
    createdAt: '2025-01-05T09:15:00Z',
    updatedAt: '2025-01-05T09:15:00Z'
  },
  {
    id: 'I-202412-0045',
    invoiceNumber: 'I-202412-0045',
    firstName: 'Emma',
    lastName: 'Davis',
    email: 'emma@email.com',
    phone: '(555) 456-7890',
    address1: '321 Elm Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62704',
    eventType: 'celebration',
    eventName: 'Holiday Party',
    eventDate: '2024-12-20',
    eventTime: '18:30',
    guestCount: 40,
    fulfillmentType: 'delivery',
    deliveryTime: '16:00',
    venue: 'Community Center',
    items: [
      { id: '1', name: 'Holiday Cake', description: 'Festive red velvet cake', quantity: 1, unitPrice: 120.00, total: 120.00 },
      { id: '2', name: 'Holiday Cookies (2 dozen)', description: 'Assorted holiday shapes', quantity: 1, unitPrice: 48.00, total: 48.00 },
      { id: '3', name: 'Delivery', description: 'Holiday delivery service', quantity: 1, unitPrice: 20.00, total: 20.00 }
    ],
    subtotal: 188.00,
    taxRate: 7.0,
    taxAmount: 13.16,
    total: 201.16,
    payments: [],
    amountPaid: 0.00,
    balance: 201.16,
    status: 'pending',
    issueDate: '2024-12-20',
    dueDate: '2025-01-19',
    notes: 'Holiday-themed decorations with red and green colors.',
    termsConditions: 'Payment due within 30 days of invoice date.',
    createdAt: '2024-12-20T11:30:00Z',
    updatedAt: '2024-12-20T11:30:00Z'
  },
  {
    id: 'I-202412-0046',
    invoiceNumber: 'I-202412-0046',
    firstName: 'James',
    lastName: 'Wilson',
    email: 'james@email.com',
    phone: '(555) 567-8901',
    address1: '654 Maple Drive',
    city: 'Springfield',
    state: 'IL',
    zip: '62705',
    eventType: 'celebration',
    eventName: '25th Anniversary',
    eventDate: '2024-12-22',
    eventTime: '17:00',
    guestCount: 75,
    fulfillmentType: 'pickup',
    pickupTime: '15:00',
    venue: 'Private Residence',
    items: [
      { id: '1', name: 'Anniversary Cake', description: '2-tier vanilla cake with gold accents', quantity: 1, unitPrice: 150.00, total: 150.00 },
      { id: '2', name: 'Anniversary Cookies (dozen)', description: 'Heart-shaped cookies', quantity: 2, unitPrice: 30.00, total: 60.00 }
    ],
    subtotal: 210.00,
    taxRate: 7.0,
    taxAmount: 14.70,
    total: 224.70,
    payments: [
      { id: '1', date: '2024-12-15', amount: 100.00, method: 'Check', reference: 'CHK-001' }
    ],
    amountPaid: 100.00,
    balance: 124.70,
    status: 'partial',
    issueDate: '2024-12-15',
    dueDate: '2024-12-22',
    notes: '25th anniversary celebration with gold theme.',
    termsConditions: 'Final payment due at pickup.',
    createdAt: '2024-12-15T13:45:00Z',
    updatedAt: '2024-12-20T10:20:00Z'
  }
];

// Helper functions for working with invoice data
export const getInvoicesByStatus = (status: string): Invoice[] => {
  return mockInvoices.filter(invoice => invoice.status === status);
};

export const getOverdueInvoicesCount = (): number => {
  return mockInvoices.filter(invoice => invoice.status === 'overdue').length;
};

export const getPendingInvoicesCount = (): number => {
  return mockInvoices.filter(invoice => invoice.status === 'pending' || invoice.status === 'partial').length;
};

export const getInvoiceById = (id: string): Invoice | undefined => {
  return mockInvoices.find(invoice => invoice.id === id);
};

export const getInvoicesByCustomer = (email: string): Invoice[] => {
  return mockInvoices.filter(invoice => invoice.email.toLowerCase() === email.toLowerCase());
};

export const getRecentInvoices = (limit: number = 5): Invoice[] => {
  return mockInvoices
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};

export const getTotalRevenue = (): number => {
  return mockInvoices.reduce((sum, invoice) => sum + invoice.total, 0);
};

export const getTotalOutstanding = (): number => {
  return mockInvoices.reduce((sum, invoice) => sum + invoice.balance, 0);
};