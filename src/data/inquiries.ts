import { Inquiry, InquiryAction } from '../types';

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