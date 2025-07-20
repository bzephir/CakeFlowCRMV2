import { Inquiry, InquiryAction, CelebrationInquiryDetails, WeddingInquiryDetails, CorporateInquiryDetails } from '../types';

// Customer interface for mock data
interface MockCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

// Product interface for mock data
interface MockProduct {
  id: string;
  name: string;
  price: number;
}

// Order interface for mock data (matching the Order type from types/index.ts)
interface MockOrder {
  id: string;
  customer?: string;
  email?: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime?: string;
  deliveryTime?: string;
  customerId: string;
  customerName: string;
  eventDate: string;
  eventType: string;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'in-production' | 'completed' | 'cancelled';
  items: string[];
  subtotal: number;
  tax: number;
  total: number;
  deposited?: number;
  balance?: number;
  details?: CelebrationInquiryDetails | WeddingInquiryDetails | CorporateInquiryDetails;
  depositPaid: number;
  createdAt: string;
  eventTime?: string;
}

// Order Detail interface for detailed order view
interface MockOrderDetail {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  issueDate: string;
  eventDate: string;
  eventType: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime?: string;
  deliveryTime?: string;
  eventTime?: string;
  poNumber?: string;
  lineItems: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  shippingFee: number;
  total: number;
  deposited: number;
  balance: number;
  customerNotes?: string;
  internalNotes?: string;
  details?: CelebrationInquiryDetails | WeddingInquiryDetails | CorporateInquiryDetails;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'in-production' | 'completed' | 'cancelled';
}

// Mock inquiry data simulating a backend database
export const mockInquiries: Inquiry[] = [
  {
    id: 'INQ-2025-001',
    type: 'wedding',
    status: 'new',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.rodriguez@email.com',
    phone: '(555) 123-4567',
    eventDate: '2025-08-15',
    fulfillmentType: 'delivery',
    deliveryTime: '14:00',
    eventTime: '16:00',
    guestCount: 120,
    budget: '$2,500 - $5,000',
    hearAboutUs: 'Instagram',
    additionalNotes: 'Looking for a romantic, elegant design with blush pink and gold accents.',
    details: {
      weddingDate: '2025-08-15',
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
    submittedAt: '2025-01-15T10:30:00Z',
    lastUpdated: '2025-01-15T10:30:00Z',
    actions: [
      {
        id: 'ACT-001',
        type: 'status_change',
        description: 'Inquiry submitted',
        performedBy: 'System',
        performedAt: '2025-01-15T10:30:00Z',
        details: {
          newStatus: 'new'
        }
      }
    ]
  },
  {
    id: 'INQ-2025-002',
    type: 'celebration',
    status: 'opened',
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@email.com',
    phone: '(555) 234-5678',
    eventDate: '2025-03-22',
    fulfillmentType: 'pickup',
    pickupTime: '12:00',
    eventTime: '14:00',
    guestCount: 25,
    budget: '$250 - $500',
    hearAboutUs: 'Google',
    additionalNotes: 'Surprise party for my wife\'s 40th birthday. She loves chocolate!',
    details: {
      occasion: 'Birthday',
      services: ['Custom Birthday Cake', 'Cupcakes'],
      theme: 'Elegant Adult Birthday',
      colors: 'Purple and Silver',
      cakeTasting: false,
      inspirationPhotos: ['photo1.jpg', 'photo2.jpg']
    },
    submittedAt: '2025-01-14T15:45:00Z',
    lastUpdated: '2025-01-15T09:15:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-002',
        type: 'status_change',
        description: 'Inquiry submitted',
        performedBy: 'System',
        performedAt: '2025-01-14T15:45:00Z',
        details: {
          newStatus: 'new'
        }
      },
      {
        id: 'ACT-003',
        type: 'status_change',
        description: 'Inquiry opened and reviewed',
        performedBy: 'admin',
        performedAt: '2025-01-15T09:15:00Z',
        details: {
          previousStatus: 'new',
          newStatus: 'opened'
        }
      },
      {
        id: 'ACT-004',
        type: 'note_added',
        description: 'Added note about customer preferences',
        performedBy: 'admin',
        performedAt: '2025-01-15T09:20:00Z',
        details: {
          notes: 'Customer specifically mentioned chocolate preference. Consider our signature chocolate fudge cake.'
        }
      }
    ]
  },
  {
    id: 'INQ-2025-003',
    type: 'corporate',
    status: 'contacted',
    firstName: 'Jennifer',
    lastName: 'Williams',
    email: 'j.williams@techcorp.com',
    phone: '(555) 345-6789',
    eventDate: '2025-02-14',
    fulfillmentType: 'delivery',
    deliveryTime: '10:30',
    eventTime: '12:00',
    guestCount: 50,
    budget: '$500 - $1,000',
    hearAboutUs: 'Referral',
    additionalNotes: 'Monthly team celebration. Need professional presentation.',
    details: {
      companyName: 'TechCorp Solutions',
      eventType: 'Team Celebration',
      services: ['Corporate Cupcakes', 'Branded Cookies'],
      recurring: true,
      frequency: 'Monthly',
      brandingRequired: true,
      deliveryAddress: '456 Business Plaza, Suite 200',
      contactPerson: {
        name: 'Jennifer Williams',
        title: 'HR Manager',
        department: 'Human Resources'
      },
      approvalProcess: 'Manager approval required for orders over $300',
      invoicingRequirements: 'Net 30 payment terms, PO number required'
    },
    submittedAt: '2025-01-13T11:20:00Z',
    lastUpdated: '2025-01-14T16:30:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-005',
        type: 'status_change',
        description: 'Inquiry submitted',
        performedBy: 'System',
        performedAt: '2025-01-13T11:20:00Z',
        details: {
          newStatus: 'new'
        }
      },
      {
        id: 'ACT-006',
        type: 'status_change',
        description: 'Inquiry opened',
        performedBy: 'admin',
        performedAt: '2025-01-14T10:00:00Z',
        details: {
          previousStatus: 'new',
          newStatus: 'opened'
        }
      },
      {
        id: 'ACT-007',
        type: 'email_sent',
        description: 'Initial response email sent',
        performedBy: 'admin',
        performedAt: '2025-01-14T14:15:00Z',
        details: {
          emailSubject: 'Re: Corporate Catering Inquiry - TechCorp Solutions'
        }
      },
      {
        id: 'ACT-008',
        type: 'call_made',
        description: 'Phone consultation completed',
        performedBy: 'admin',
        performedAt: '2025-01-14T16:30:00Z',
        details: {
          callDuration: 25,
          notes: 'Discussed monthly recurring orders, branding requirements, and delivery logistics.'
        }
      },
      {
        id: 'ACT-009',
        type: 'status_change',
        description: 'Status updated after phone consultation',
        performedBy: 'admin',
        performedAt: '2025-01-14T16:35:00Z',
        details: {
          previousStatus: 'opened',
          newStatus: 'contacted'
        }
      }
    ]
  },
  {
    id: 'INQ-2025-004',
    type: 'celebration',
    status: 'quoted',
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david.thompson@email.com',
    phone: '(555) 456-7890',
    eventDate: '2025-04-10',
    fulfillmentType: 'pickup',
    pickupTime: '16:00',
    eventTime: '18:00',
    guestCount: 75,
    budget: '$1,000 - $2,500',
    hearAboutUs: 'Facebook',
    additionalNotes: 'Anniversary party for my parents\' 50th wedding anniversary.',
    details: {
      occasion: 'Anniversary',
      services: ['Anniversary Cake', 'Mini Desserts', 'Cake Delivery'],
      theme: 'Golden Anniversary',
      colors: 'Gold and Cream',
      cakeTasting: true,
      inspirationPhotos: ['anniversary1.jpg', 'anniversary2.jpg', 'anniversary3.jpg']
    },
    submittedAt: '2025-01-10T14:20:00Z',
    lastUpdated: '2025-01-12T11:45:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-010',
        type: 'status_change',
        description: 'Inquiry submitted',
        performedBy: 'System',
        performedAt: '2025-01-10T14:20:00Z',
        details: {
          newStatus: 'new'
        }
      },
      {
        id: 'ACT-011',
        type: 'status_change',
        description: 'Inquiry reviewed and opened',
        performedBy: 'admin',
        performedAt: '2025-01-11T09:30:00Z',
        details: {
          previousStatus: 'new',
          newStatus: 'opened'
        }
      },
      {
        id: 'ACT-012',
        type: 'email_sent',
        description: 'Follow-up email sent with questions',
        performedBy: 'admin',
        performedAt: '2025-01-11T10:15:00Z',
        details: {
          emailSubject: 'Re: 50th Anniversary Celebration Inquiry'
        }
      },
      {
        id: 'ACT-013',
        type: 'meeting_scheduled',
        description: 'Cake tasting appointment scheduled',
        performedBy: 'admin',
        performedAt: '2025-01-11T15:20:00Z',
        details: {
          meetingDate: '2025-01-18T14:00:00Z',
          notes: 'Scheduled for Friday afternoon, customer will bring spouse'
        }
      },
      {
        id: 'ACT-014',
        type: 'quote_sent',
        description: 'Formal quote sent to customer',
        performedBy: 'admin',
        performedAt: '2025-01-12T11:45:00Z',
        details: {
          quoteId: 'Q-2025-001'
        }
      },
      {
        id: 'ACT-015',
        type: 'status_change',
        description: 'Status updated to quoted',
        performedBy: 'admin',
        performedAt: '2025-01-12T11:45:00Z',
        details: {
          previousStatus: 'contacted',
          newStatus: 'quoted'
        }
      }
    ]
  },
  {
    id: 'INQ-2025-005',
    type: 'wedding',
    status: 'converted',
    firstName: 'Amanda',
    lastName: 'Foster',
    email: 'amanda.foster@email.com',
    phone: '(555) 567-8901',
    eventDate: '2025-06-28',
    fulfillmentType: 'delivery',
    deliveryTime: '15:00',
    eventTime: '17:30',
    guestCount: 200,
    budget: 'Over $5,000',
    hearAboutUs: 'Wedding Planner',
    additionalNotes: 'Outdoor garden wedding. Need weather-resistant setup.',
    details: {
      weddingDate: '2025-06-28',
      venue: 'Rosewood Garden Estate',
      weddingSize: 'large',
      services: ['Wedding Cake', 'Groom\'s Cake', 'Dessert Station', 'Late Night Snacks'],
      cakeStyle: 'Four-tier with cascading sugar flowers',
      flavors: ['Red Velvet', 'Vanilla Bean', 'Chocolate Salted Caramel', 'Strawberry'],
      dietaryRestrictions: ['Vegan option', 'Nut-free'],
      deliverySetup: true,
      tastingRequested: true,
      budgetRange: 'Over $5,000',
      weddingPlanner: {
        name: 'Rebecca Stone',
        company: 'Stone Events',
        contact: 'rebecca@stoneevents.com'
      }
    },
    submittedAt: '2025-01-05T16:45:00Z',
    lastUpdated: '2025-01-09T14:20:00Z',
    assignedTo: 'admin',
    actions: [
      {
        id: 'ACT-016',
        type: 'status_change',
        description: 'Inquiry submitted',
        performedBy: 'System',
        performedAt: '2025-01-05T16:45:00Z',
        details: {
          newStatus: 'new'
        }
      },
      {
        id: 'ACT-017',
        type: 'status_change',
        description: 'High-priority inquiry opened immediately',
        performedBy: 'admin',
        performedAt: '2025-01-06T08:00:00Z',
        details: {
          previousStatus: 'new',
          newStatus: 'opened'
        }
      },
      {
        id: 'ACT-018',
        type: 'call_made',
        description: 'Initial consultation call',
        performedBy: 'admin',
        performedAt: '2025-01-06T10:30:00Z',
        details: {
          callDuration: 45,
          notes: 'Detailed discussion about wedding vision, dietary needs, and logistics.'
        }
      },
      {
        id: 'ACT-019',
        type: 'meeting_scheduled',
        description: 'In-person consultation and tasting scheduled',
        performedBy: 'admin',
        performedAt: '2025-01-06T11:15:00Z',
        details: {
          meetingDate: '2025-01-08T15:00:00Z',
          notes: 'Couple + wedding planner attending'
        }
      },
      {
        id: 'ACT-020',
        type: 'quote_sent',
        description: 'Comprehensive wedding package quote sent',
        performedBy: 'admin',
        performedAt: '2025-01-08T18:30:00Z',
        details: {
          quoteId: 'Q-2025-002'
        }
      },
      {
        id: 'ACT-021',
        type: 'status_change',
        description: 'Quote accepted, converted to order',
        performedBy: 'admin',
        performedAt: '2025-01-09T14:20:00Z',
        details: {
          previousStatus: 'quoted',
          newStatus: 'converted'
        }
      }
    ]
  }
];

// Helper functions for working with inquiry data
export const getInquiriesByStatus = (status: string): Inquiry[] => {
  return mockInquiries.filter(inquiry => inquiry.status === status);
};

export const getNewInquiriesCount = (): number => {
  return mockInquiries.filter(inquiry => inquiry.status === 'new').length;
};

export const getInquiryById = (id: string): Inquiry | undefined => {
  return mockInquiries.find(inquiry => inquiry.id === id);
};

export const getInquiriesByType = (type: 'celebration' | 'wedding' | 'corporate'): Inquiry[] => {
  return mockInquiries.filter(inquiry => inquiry.type === type);
};

export const getRecentInquiries = (limit: number = 5): Inquiry[] => {
  return mockInquiries
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, limit);
};

// Quote Detail interface for mock data
interface MockQuoteDetail {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  issueDate: string;
  expiryDate: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime?: string;
  deliveryTime?: string;
  eventTime?: string;
  poNumber?: string;
  lineItems: {
    id: string;
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  shippingFee: number;
  total: number;
  customerNotes?: string;
  internalNotes?: string;
  termsConditions: string;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  details?: CelebrationInquiryDetails | WeddingInquiryDetails | CorporateInquiryDetails;
  eventType?: string;
}

// Mock sample quote for QuoteDetail page
export const mockSampleQuoteDetail: MockQuoteDetail = {
  id: 'Q-202501-0001',
  customer: {
    id: '1',
    name: 'David Fraga',
    email: 'david.fraga@example.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  },
  issueDate: '2025-01-15',
  expiryDate: '2025-02-15',
  fulfillmentType: 'delivery',
  deliveryTime: '16:00',
  eventTime: '18:00',
  poNumber: 'PO-98765',
  lineItems: [
    { id: '1', name: '3-Tier Wedding Cake', description: 'Vanilla bean with raspberry filling', quantity: 1, unitPrice: 450.00, total: 450.00 },
    { id: '2', name: 'Custom Cake Topper', description: 'Personalized acrylic topper', quantity: 1, unitPrice: 65.00, total: 65.00 },
    { id: '3', name: 'Delivery & Setup', description: 'Includes transport and on-site assembly', quantity: 1, unitPrice: 85.00, total: 85.00 }
  ],
  subtotal: 600.00,
  discountType: 'percentage',
  discountValue: 5, // 5% discount
  discountAmount: 30.00,
  taxRate: 7.0,
  taxAmount: 39.90, // 7% of (600 - 30)
  shippingFee: 0.00,
  total: 609.90,
  customerNotes: 'Looking for a romantic, elegant design with blush pink and gold accents. Please ensure all flowers are edible or easily removable.',
  internalNotes: 'Customer is very particular about color matching. Confirm final design sketch by 01/25.',
  termsConditions: 'Payment terms: 50% deposit required to confirm order. Final payment due 14 days before event date. Cancellations within 30 days of event are subject to 50% fee.',
  status: 'sent',
  eventType: 'Wedding',
  details: {
    weddingDate: '2025-06-15',
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
  } as WeddingInquiryDetails
};

// Mock orders data for Orders page
export const mockOrdersList: MockOrder[] = [
  {
    id: 'O-202501-0001',
    customer: 'Sarah Johnson',
    email: 'sarah@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '13:00',
    customerId: '1',
    customerName: 'Sarah Johnson',
    eventDate: '2025-01-15',
    eventTime: '15:00',
    eventType: 'Wedding',
    status: 'in-production',
    items: ['3-Tier Wedding Cake', 'Cake Toppers'],
    subtotal: 450.00,
    tax: 31.50,
    total: 481.50,
    deposited: 225.00,
    balance: 256.50,
    depositPaid: 225.00,
    createdAt: '2025-01-01',
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
      weddingPlanner: { name: 'Sarah Mitchell', company: 'Elegant Events Co.', contact: 'sarah@elegantevents.com' }
    } as WeddingInquiryDetails
  },
  {
    id: 'O-202501-0002',
    customer: 'Mike Chen',
    email: 'mike@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '15:30',
    customerId: '2',
    customerName: 'Mike Chen',
    eventDate: '2025-01-16',
    eventTime: '17:00',
    eventType: 'Birthday',
    status: 'confirmed',
    items: ['Custom Birthday Cake'],
    subtotal: 120.00,
    tax: 8.40,
    total: 128.40,
    deposited: 60.00,
    balance: 68.40,
    depositPaid: 60.00,
    createdAt: '2025-01-05',
    details: {
      occasion: 'Birthday',
      services: ['Custom Birthday Cake', 'Cupcakes'],
      theme: 'Elegant Adult Birthday',
      colors: 'Purple and Silver',
      cakeTasting: false,
      inspirationPhotos: []
    } as CelebrationInquiryDetails

  },
  {
    id: 'O-202501-0003',
    customer: 'Emma Davis',
    email: 'emma@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '16:00',
    customerId: '3',
    customerName: 'Emma Davis',
    eventDate: '2025-01-18',
    eventTime: '18:30',
    eventType: 'Corporate Event',
    status: 'quoted',
    items: ['Corporate Cupcakes (48)', 'Branded Toppers'],
    subtotal: 280.00,
    tax: 19.60,
    total: 299.60,
    deposited: 0.00,
    balance: 299.60,
    depositPaid: 0.00,
    createdAt: '2025-01-10',
    details: {
      companyName: 'TechCorp Solutions',
      eventType: 'Team Celebration',
      services: ['Corporate Cupcakes', 'Branded Cookies'],
      recurring: true,
      frequency: 'Monthly',
      brandingRequired: true,
      deliveryAddress: '456 Business Plaza, Suite 200',
      contactPerson: { name: 'Jennifer Williams', title: 'HR Manager', department: 'Human Resources' },
      approvalProcess: 'Manager approval required for orders over $300',
      invoicingRequirements: 'Net 30 payment terms, PO number required'
    } as CorporateInquiryDetails
  },
  {
    id: 'O-202412-0025',
    customer: 'James Wilson',
    email: 'james@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '22:00',
    customerId: '4',
    customerName: 'James Wilson',
    eventDate: '2025-03-08',
    eventTime: '23:00',
    eventType: 'Anniversary',
    status: 'inquiry',
    items: ['Anniversary Cake'],
    subtotal: 180.00,
    tax: 12.60,
    total: 192.60,
    deposited: 0.00,
    balance: 192.60,
    depositPaid: 0.00,
    createdAt: '2024-12-12',
    details: {
      occasion: 'Anniversary',
      services: ['Anniversary Cake'],
      theme: 'Golden Anniversary',
      colors: 'Gold and Cream',
      cakeTasting: true,
      inspirationPhotos: []
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202412-0026',
    customer: 'Lisa Park',
    email: 'lisa@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '11:00',
    customerId: '5',
    customerName: 'Lisa Park',
    eventDate: '2025-01-14',
    eventTime: '13:00',
    eventType: 'Baby Shower',
    status: 'completed',
    items: ['Baby Shower Cake', 'Mini Cupcakes (24)'],
    subtotal: 200.00,
    tax: 14.00,
    total: 214.00,
    deposited: 214.00,
    balance: 0.00,
    depositPaid: 214.00,
    createdAt: '2024-11-28',
    details: {
      occasion: 'Baby Shower',
      services: ['Baby Shower Cake', 'Mini Cupcakes'],
      theme: 'Pastel Animals',
      colors: 'Blue, Pink, Yellow',
      cakeTasting: false,
      inspirationPhotos: []
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202412-0027',
    customer: 'Robert Smith',
    email: 'robert@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '14:00',
    customerId: '6',
    customerName: 'Robert Smith',
    eventDate: '2025-02-05',
    eventTime: '16:00',
    eventType: 'Graduation',
    status: 'confirmed',
    items: ['Graduation Cake', 'Cookies (12)'],
    subtotal: 150.00,
    tax: 10.50,
    total: 160.50,
    deposited: 75.00,
    balance: 85.50,
    depositPaid: 75.00,
    createdAt: '2024-12-10',
    details: {
      occasion: 'Graduation',
      services: ['Graduation Cake', 'Cookies'],
      theme: 'School Colors',
      colors: 'Red and Black',
      cakeTasting: false,
      inspirationPhotos: []
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202412-0028',
    customer: 'Jennifer Brown',
    email: 'jennifer@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '15:30',
    customerId: '7',
    customerName: 'Jennifer Brown',
    eventDate: '2025-01-30',
    eventTime: '17:00',
    eventType: 'Birthday',
    status: 'in-production',
    items: ['Custom Birthday Cake'],
    subtotal: 95.00,
    tax: 6.65,
    total: 101.65,
    deposited: 101.65,
    balance: 0.00,
    depositPaid: 101.65,
    createdAt: '2024-12-05',
    details: {
      occasion: 'Birthday',
      services: ['Custom Birthday Cake'],
      theme: 'Superheroes',
      colors: 'Blue, Red, Yellow',
      cakeTasting: false,
      inspirationPhotos: []
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202411-0015',
    customer: 'Michael Taylor',
    email: 'michael@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '16:00',
    customerId: '8',
    customerName: 'Michael Taylor',
    eventDate: '2024-12-15',
    eventTime: '18:00',
    eventType: 'Corporate Event',
    status: 'completed',
    items: ['Corporate Cupcakes (72)', 'Logo Cookies (24)'],
    subtotal: 350.00,
    tax: 24.50,
    total: 374.50,
    deposited: 374.50,
    balance: 0.00,
    depositPaid: 374.50,
    createdAt: '2024-11-20',
    details: {
      companyName: 'Global Corp',
      eventType: 'Corporate Event',
      services: ['Corporate Cupcakes', 'Logo Cookies'],
      recurring: false,
      brandingRequired: true,
      deliveryAddress: '100 Corporate Blvd',
      contactPerson: { name: 'Michael Taylor', title: 'Event Coordinator', department: 'Marketing' },
      approvalProcess: 'Standard',
      invoicingRequirements: 'Invoice to be sent to accounts payable'
    } as CorporateInquiryDetails

  },
  {
    id: 'O-202411-0016',
    customer: 'Jessica Lee',
    email: 'jessica@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '15:30',
    customerId: '9',
    customerName: 'Jessica Lee',
    eventDate: '2025-03-10',
    eventTime: '17:00',
    eventType: 'Wedding',
    status: 'confirmed',
    items: ['3-Tier Wedding Cake', 'Dessert Table'],
    subtotal: 550.00,
    tax: 38.50,
    total: 588.50,
    deposited: 275.00,
    balance: 313.50,
    depositPaid: 275.00,
    createdAt: '2024-11-15',
    details: {
      weddingDate: '2025-03-10',
      venue: 'The Grand Hotel',
      weddingSize: 'large',
      services: ['Wedding Cake', 'Dessert Table'],
      cakeStyle: 'Modern Minimalist',
      flavors: ['Vanilla', 'Chocolate'],
      dietaryRestrictions: [],
      deliverySetup: true,
      tastingRequested: true,
      budgetRange: '$2,500 - $5,000'
    } as WeddingInquiryDetails
  },
  {
    id: 'O-202411-0017',
    customer: 'Daniel Garcia',
    email: 'daniel@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '10:00',
    customerId: '10',
    customerName: 'Daniel Garcia',
    eventDate: '2025-02-20',
    eventTime: '12:00',
    eventType: 'Anniversary',
    status: 'quoted',
    items: ['Anniversary Cake'],
    subtotal: 175.00,
    tax: 12.25,
    total: 187.25,
    deposited: 0.00,
    balance: 187.25,
    depositPaid: 0.00,
    createdAt: '2024-11-10',
    details: {
      occasion: 'Anniversary',
      services: ['Anniversary Cake'],
      theme: 'Romantic',
      colors: 'Red and White',
      cakeTasting: false,
      inspirationPhotos: []
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202411-0018',
    customer: 'Rachel Martinez',
    email: 'rachel.martinez@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '18:00',
    customerId: '11',
    customerName: 'Rachel Martinez',
    eventDate: '2025-12-20',
    eventTime: '19:30',
    eventType: 'Holiday Party',
    status: 'confirmed',
    items: ['Holiday Themed Cupcakes (60)', 'Christmas Cookies (36)', 'Hot Chocolate Bar Setup'],
    subtotal: 420.00,
    tax: 29.40,
    total: 449.40,
    deposited: 200.00,
    balance: 249.40,
    depositPaid: 200.00,
    createdAt: '2024-11-05',
    details: {
      occasion: 'Holiday Party',
      services: ['Holiday Themed Cupcakes', 'Christmas Cookies', 'Hot Chocolate Bar Setup'],
      theme: 'Winter Wonderland',
      colors: 'Red, Green, Gold',
      cakeTasting: false,
      inspirationPhotos: ['holiday1.jpg', 'holiday2.jpg']
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202411-0019',
    customer: 'Thomas Anderson',
    email: 'thomas.anderson@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '14:00',
    customerId: '12',
    customerName: 'Thomas Anderson',
    eventDate: '2025-05-15',
    eventTime: '16:00',
    eventType: 'Retirement Party',
    status: 'in-production',
    items: ['Retirement Celebration Cake', 'Mini Dessert Platters (3)'],
    subtotal: 285.00,
    tax: 19.95,
    total: 304.95,
    deposited: 152.50,
    balance: 152.45,
    depositPaid: 152.50,
    createdAt: '2024-11-01',
    details: {
      occasion: 'Retirement',
      services: ['Retirement Celebration Cake', 'Mini Dessert Platters'],
      theme: 'Career Celebration',
      colors: 'Navy Blue and Gold',
      cakeTasting: true,
      inspirationPhotos: ['retirement1.jpg']
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202410-0025',
    customer: 'Sophia Chen',
    email: 'sophia.chen@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '11:00',
    customerId: '13',
    customerName: 'Sophia Chen',
    eventDate: '2025-04-12',
    eventTime: '13:00',
    eventType: 'Wedding',
    status: 'confirmed',
    items: ['4-Tier Wedding Cake', 'Groom\'s Cake', 'Wedding Favors (100)', 'Dessert Station'],
    subtotal: 850.00,
    tax: 59.50,
    total: 909.50,
    deposited: 450.00,
    balance: 459.50,
    depositPaid: 450.00,
    createdAt: '2024-10-20',
    details: {
      weddingDate: '2025-04-12',
      venue: 'Oceanview Resort & Spa',
      weddingSize: 'large',
      services: ['Wedding Cake', 'Groom\'s Cake', 'Wedding Favors', 'Dessert Station'],
      cakeStyle: 'Four-tier with cascading orchids',
      flavors: ['Lemon Lavender', 'Chocolate Ganache', 'Strawberry Champagne', 'Vanilla Bean'],
      dietaryRestrictions: ['Dairy-free option for 15 guests', 'Sugar-free option for 5 guests'],
      deliverySetup: true,
      tastingRequested: true,
      budgetRange: '$2,500 - $5,000',
      weddingPlanner: {
        name: 'Maria Rodriguez',
        company: 'Elegant Occasions',
        contact: 'maria@elegantoccasions.com'
      }
    } as WeddingInquiryDetails
  },
  {
    id: 'O-202410-0026',
    customer: 'Global Tech Solutions',
    email: 'events@globaltechsolutions.com',
    fulfillmentType: 'delivery',
    deliveryTime: '09:00',
    customerId: '14',
    customerName: 'Global Tech Solutions',
    eventDate: '2025-03-05',
    eventTime: '10:30',
    eventType: 'Corporate Event',
    status: 'quoted',
    items: ['Corporate Logo Cake', 'Branded Cupcakes (120)', 'Coffee & Pastry Station'],
    subtotal: 680.00,
    tax: 47.60,
    total: 727.60,
    deposited: 0.00,
    balance: 727.60,
    depositPaid: 0.00,
    createdAt: '2024-10-15',
    details: {
      companyName: 'Global Tech Solutions',
      eventType: 'Product Launch',
      services: ['Corporate Logo Cake', 'Branded Cupcakes', 'Coffee & Pastry Station'],
      recurring: false,
      brandingRequired: true,
      deliveryAddress: '500 Innovation Drive, Tech Park, Suite 1200',
      contactPerson: {
        name: 'Alex Thompson',
        title: 'Marketing Director',
        department: 'Marketing'
      },
      approvalProcess: 'Director approval required for orders over $500',
      invoicingRequirements: 'Net 45 payment terms, require purchase order number'
    } as CorporateInquiryDetails
  },
  {
    id: 'O-202410-0027',
    customer: 'Maria Gonzalez',
    email: 'maria.gonzalez@email.com',
    fulfillmentType: 'pickup',
    pickupTime: '16:30',
    customerId: '15',
    customerName: 'Maria Gonzalez',
    eventDate: '2025-02-28',
    eventTime: '18:00',
    eventType: 'Quinceañera',
    status: 'in-production',
    items: ['Quinceañera Cake (3-tier)', 'Mini Tres Leches Cakes (24)', 'Decorated Cookies (48)'],
    subtotal: 395.00,
    tax: 27.65,
    total: 422.65,
    deposited: 211.33,
    balance: 211.32,
    depositPaid: 211.33,
    createdAt: '2024-10-10',
    details: {
      occasion: 'Quinceañera',
      services: ['Quinceañera Cake', 'Mini Tres Leches Cakes', 'Decorated Cookies'],
      theme: 'Princess/Fairytale',
      colors: 'Pink, Gold, White',
      cakeTasting: true,
      inspirationPhotos: ['quince1.jpg', 'quince2.jpg', 'quince3.jpg']
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202410-0028',
    customer: 'David Kim',
    email: 'david.kim@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '12:00',
    customerId: '16',
    customerName: 'David Kim',
    eventDate: '2025-06-08',
    eventTime: '14:00',
    eventType: 'Graduation',
    status: 'confirmed',
    items: ['Graduation Cap Cake', 'School Colors Cupcakes (36)', 'Diploma Cookies (24)'],
    subtotal: 245.00,
    tax: 17.15,
    total: 262.15,
    deposited: 131.08,
    balance: 131.07,
    depositPaid: 131.08,
    createdAt: '2024-10-05',
    details: {
      occasion: 'Graduation',
      services: ['Graduation Cap Cake', 'School Colors Cupcakes', 'Diploma Cookies'],
      theme: 'Academic Achievement',
      colors: 'School Colors (Blue and White)',
      cakeTasting: false,
      inspirationPhotos: ['grad1.jpg', 'grad2.jpg']
    } as CelebrationInquiryDetails
  },
  {
    id: 'O-202409-0035',
    customer: 'Amanda Foster',
    email: 'amanda.foster@email.com',
    fulfillmentType: 'delivery',
    deliveryTime: '15:00',
    customerId: '17',
    customerName: 'Amanda Foster',
    eventDate: '2025-07-19',
    eventTime: '17:30',
    eventType: 'Wedding',
    status: 'completed',
    items: ['5-Tier Wedding Cake', 'Groom\'s Cake', 'Dessert Bar', 'Late Night Snacks'],
    subtotal: 1250.00,
    tax: 87.50,
    total: 1337.50,
    deposited: 1337.50,
    balance: 0.00,
    depositPaid: 1337.50,
    createdAt: '2024-09-25',
    details: {
      weddingDate: '2025-07-19',
      venue: 'Rosewood Garden Estate',
      weddingSize: 'large',
      services: ['Wedding Cake', 'Groom\'s Cake', 'Dessert Bar', 'Late Night Snacks'],
      cakeStyle: 'Five-tier with cascading sugar flowers',
      flavors: ['Red Velvet', 'Vanilla Bean', 'Chocolate Salted Caramel', 'Strawberry', 'Lemon'],
      dietaryRestrictions: ['Vegan option', 'Nut-free'],
      deliverySetup: true,
      tastingRequested: true,
      budgetRange: 'Over $5,000',
      weddingPlanner: {
        name: 'Rebecca Stone',
        company: 'Stone Events',
        contact: 'rebecca@stoneevents.com'
      }
    } as WeddingInquiryDetails
  },
  {
    id: 'O-202409-0036',
    customer: 'Innovation Labs Inc',
    email: 'hr@innovationlabs.com',
    fulfillmentType: 'delivery',
    deliveryTime: '14:30',
    customerId: '18',
    customerName: 'Innovation Labs Inc',
    eventDate: '2025-01-25',
    eventTime: '16:00',
    eventType: 'Corporate Event',
    status: 'in-production',
    items: ['Company Anniversary Cake', 'Milestone Celebration Cupcakes (80)', 'Corporate Branded Cookies (60)'],
    subtotal: 520.00,
    tax: 36.40,
    total: 556.40,
    deposited: 278.20,
    balance: 278.20,
    depositPaid: 278.20,
    createdAt: '2024-09-20',
    details: {
      companyName: 'Innovation Labs Inc',
      eventType: 'Company Anniversary',
      services: ['Company Anniversary Cake', 'Milestone Celebration Cupcakes', 'Corporate Branded Cookies'],
      recurring: true,
      frequency: 'Annually',
      brandingRequired: true,
      deliveryAddress: '200 Innovation Boulevard, Research Park',
      contactPerson: {
        name: 'Sarah Williams',
        title: 'HR Director',
        department: 'Human Resources'
      },
      approvalProcess: 'HR Director approval required',
      invoicingRequirements: 'Net 30 payment terms, invoice to accounting department'
    } as CorporateInquiryDetails
  }
];

// Mock customers data for CreateOrder page
export const mockCustomersList: MockCustomer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'mike@email.com',
    phone: '(555) 234-5678',
    address: '456 Oak Avenue',
    city: 'Springfield',
    state: 'IL',
    zip: '62702'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@email.com',
    phone: '(555) 345-6789',
    address: '789 Pine Road',
    city: 'Springfield',
    state: 'IL',
    zip: '62703'
  }
];

// Mock products data for CreateOrder page
export const mockProductsList: MockProduct[] = [
  { id: '1', name: 'Wedding Cake - 3 Tier', price: 450.00 },
  { id: '2', name: 'Birthday Cake - Custom', price: 85.00 },
  { id: '3', name: 'Cupcakes (dozen)', price: 36.00 },
  { id: '4', name: 'Cake Delivery', price: 25.00 },
  { id: '5', name: 'Setup Service', price: 50.00 }
];

// Mock sample order for OrderDetail page
export const mockSampleOrder: MockOrderDetail = {
  id: 'O-202501-0001',
  customer: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@email.com',
    phone: '(555) 123-4567',
    address: '123 Main Street',
    city: 'Springfield',
    state: 'IL',
    zip: '62701'
  },
  issueDate: '2025-01-01',
  eventDate: '2025-01-15',
  eventType: 'Wedding',
  fulfillmentType: 'delivery',
  deliveryTime: '13:00',
  eventTime: '15:00',
  poNumber: 'PO-12345',
  lineItems: [
    { id: '1', name: '3-Tier Wedding Cake', description: 'Vanilla bean with strawberry filling', quantity: 1, unitPrice: 450.00, total: 450.00 },
    { id: '2', name: 'Cake Toppers', description: 'Custom bride and groom toppers', quantity: 1, unitPrice: 50.00, total: 50.00 },
    { id: '3', name: 'Delivery & Setup', description: 'Includes transport and on-site assembly', quantity: 1, unitPrice: 75.00, total: 75.00 }
  ],
  subtotal: 575.00,
  taxRate: 7.0,
  taxAmount: 40.25,
  shippingFee: 0.00,
  total: 615.25,
  deposited: 300.00,
  balance: 315.25,
  customerNotes: 'Customer requested blush pink and gold accents. Cake to be delivered directly to venue coordinator.',
  internalNotes: 'Venue contact: Jane Doe (555) 111-2222. Confirm delivery window 24 hours prior.',
  status: 'in-production',
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
    weddingPlanner: { name: 'Sarah Mitchell', company: 'Elegant Events Co.', contact: 'sarah@elegantevents.com' }
  } as WeddingInquiryDetails
};