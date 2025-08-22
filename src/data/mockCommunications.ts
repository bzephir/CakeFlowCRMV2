import { CommunicationEntry, CommunicationType, Visibility, Priority } from '../types/communication';

export const mockCommunications: CommunicationEntry[] = [
  {
    id: 'COMM-001',
    type: CommunicationType.ANNOUNCEMENT,
    title: 'New Holiday Menu Available',
    content: 'We\'ve added new holiday-themed cakes and desserts to our menu. Check out the updated recipe collection for seasonal offerings including gingerbread cakes, peppermint cupcakes, and festive sugar cookies.',
    createdAt: '2025-01-17T09:00:00Z',
    performedBy: 'Admin',
    isPinned: true,
    visibility: Visibility.ALL,
    priority: Priority.HIGH,
    isRead: false
  },
  {
    id: 'COMM-002',
    type: CommunicationType.EMAIL,
    title: 'Wedding Cake Consultation Follow-up',
    content: 'Sent follow-up email with cake design options and flavor samples. Customer requested changes to the color scheme and asked about gluten-free options.',
    createdAt: '2025-01-17T08:30:00Z',
    performedBy: 'Sarah Martinez',
    isPinned: false,
    visibility: Visibility.CUSTOMER_SPECIFIC,
    priority: Priority.NORMAL,
    customerId: '1',
    customerName: 'Sarah Johnson',
    orderId: 'O-202501-0001',
    emailSubject: 'Wedding Cake Design Options - Follow Up',
    followUpRequired: true,
    followUpDate: '2025-01-20',
    isRead: true
  },
  {
    id: 'COMM-003',
    type: CommunicationType.CALL,
    title: 'Corporate Event Planning Call',
    content: 'Discussed catering requirements for quarterly company meeting. Client needs 50 assorted cupcakes and 2 sheet cakes. Delivery scheduled for next Friday.',
    createdAt: '2025-01-16T14:15:00Z',
    performedBy: 'Mike Rodriguez',
    isPinned: false,
    visibility: Visibility.CUSTOMER_SPECIFIC,
    priority: Priority.NORMAL,
    customerId: '3',
    customerName: 'Emma Davis',
    quoteId: 'Q-202501-0003',
    callDuration: 25,
    followUpRequired: false,
    isRead: true
  },
  {
    id: 'COMM-004',
    type: CommunicationType.ORDER_UPDATE,
    title: 'Order Status Updated to In Production',
    content: 'Wedding cake order has moved to production phase. All ingredients sourced and prep work begins tomorrow. Estimated completion: January 20th.',
    createdAt: '2025-01-16T11:45:00Z',
    performedBy: 'Chef Maria',
    isPinned: false,
    visibility: Visibility.ALL,
    priority: Priority.NORMAL,
    customerId: '1',
    customerName: 'Sarah Johnson',
    orderId: 'O-202501-0001',
    isRead: false
  },
  {
    id: 'COMM-005',
    type: CommunicationType.SMS,
    title: 'Pickup Reminder Sent',
    content: 'SMS reminder sent to customer about cake pickup tomorrow at 2:00 PM. Customer confirmed receipt and pickup time.',
    createdAt: '2025-01-16T10:20:00Z',
    performedBy: 'System',
    isPinned: false,
    visibility: Visibility.CUSTOMER_SPECIFIC,
    priority: Priority.LOW,
    customerId: '2',
    customerName: 'Mike Chen',
    orderId: 'O-202501-0002',
    isRead: true
  },
  {
    id: 'COMM-006',
    type: CommunicationType.NOTE,
    title: 'Customer Preference Note',
    content: 'Customer mentioned they prefer less sweet frosting and are interested in organic ingredients for future orders. Also noted they have a nut allergy.',
    createdAt: '2025-01-15T16:30:00Z',
    performedBy: 'Lisa Chen',
    isPinned: false,
    visibility: Visibility.STAFF_ONLY,
    priority: Priority.NORMAL,
    customerId: '4',
    customerName: 'James Wilson',
    isRead: true
  },
  {
    id: 'COMM-007',
    type: CommunicationType.ANNOUNCEMENT,
    title: 'Equipment Maintenance Scheduled',
    content: 'Main oven will be serviced this Saturday from 8 AM to 12 PM. Please plan production accordingly and use backup ovens for any urgent orders.',
    createdAt: '2025-01-15T12:00:00Z',
    performedBy: 'Admin',
    isPinned: true,
    visibility: Visibility.STAFF_ONLY,
    priority: Priority.HIGH,
    isRead: false
  },
  {
    id: 'COMM-008',
    type: CommunicationType.QUOTE_UPDATE,
    title: 'Quote Accepted by Customer',
    content: 'Customer accepted quote Q-202501-0002 for anniversary celebration. Ready to convert to confirmed order. Deposit payment expected within 48 hours.',
    createdAt: '2025-01-15T09:45:00Z',
    performedBy: 'Sales Team',
    isPinned: false,
    visibility: Visibility.ALL,
    priority: Priority.HIGH,
    customerId: '5',
    customerName: 'Lisa Park',
    quoteId: 'Q-202501-0002',
    followUpRequired: true,
    followUpDate: '2025-01-17',
    isRead: true
  },
  {
    id: 'COMM-009',
    type: CommunicationType.EMAIL,
    title: 'Invoice Payment Reminder',
    content: 'Sent payment reminder for overdue invoice. Customer responded that payment will be processed by end of week. Updated payment tracking accordingly.',
    createdAt: '2025-01-14T13:20:00Z',
    performedBy: 'Accounting',
    isPinned: false,
    visibility: Visibility.STAFF_ONLY,
    priority: Priority.NORMAL,
    customerId: '3',
    customerName: 'Emma Davis',
    invoiceId: 'I-202412-0046',
    emailSubject: 'Payment Reminder - Invoice I-202412-0046',
    followUpRequired: true,
    followUpDate: '2025-01-21',
    isRead: true
  },
  {
    id: 'COMM-010',
    type: CommunicationType.CALL,
    title: 'Venue Coordination Call',
    content: 'Spoke with Grand Hotel Ballroom event coordinator about delivery logistics for upcoming wedding. Confirmed service elevator access and setup timeline.',
    createdAt: '2025-01-14T11:00:00Z',
    performedBy: 'Delivery Team',
    isPinned: false,
    visibility: Visibility.ALL,
    priority: Priority.NORMAL,
    venueId: 'V-001',
    venueName: 'Grand Hotel Ballroom',
    orderId: 'O-202501-0001',
    callDuration: 15,
    isRead: true
  },
  {
    id: 'COMM-011',
    type: CommunicationType.SYSTEM,
    title: 'Inventory Alert: Low Stock',
    content: 'Automated alert: Vanilla extract inventory has fallen below reorder level (2 bottles remaining). Reorder recommended to avoid production delays.',
    createdAt: '2025-01-14T08:00:00Z',
    performedBy: 'System',
    isPinned: false,
    visibility: Visibility.STAFF_ONLY,
    priority: Priority.URGENT,
    isRead: false
  },
  {
    id: 'COMM-012',
    type: CommunicationType.NOTE,
    title: 'Team Meeting Notes',
    content: 'Weekly team meeting notes: Discussed upcoming Valentine\'s Day promotions, reviewed customer feedback from last month, and planned staff training for new cake decorating techniques.',
    createdAt: '2025-01-13T17:00:00Z',
    performedBy: 'Admin',
    isPinned: false,
    visibility: Visibility.STAFF_ONLY,
    priority: Priority.NORMAL,
    isRead: true
  },
  {
    id: 'COMM-013',
    type: CommunicationType.SMS,
    title: 'Order Confirmation SMS',
    content: 'SMS confirmation sent to customer for birthday cake order. Customer replied with thanks and confirmed all details are correct.',
    createdAt: '2025-01-13T14:30:00Z',
    performedBy: 'System',
    isPinned: false,
    visibility: Visibility.CUSTOMER_SPECIFIC,
    priority: Priority.LOW,
    customerId: '2',
    customerName: 'Mike Chen',
    orderId: 'O-202501-0002',
    isRead: true
  },
  {
    id: 'COMM-014',
    type: CommunicationType.ANNOUNCEMENT,
    title: 'New Staff Member Welcome',
    content: 'Please welcome Jessica Thompson to our team! She\'ll be joining as our new pastry chef and will be working primarily on specialty cake orders. Please introduce yourselves and help her get settled.',
    createdAt: '2025-01-12T10:00:00Z',
    performedBy: 'HR',
    isPinned: true,
    visibility: Visibility.STAFF_ONLY,
    priority: Priority.NORMAL,
    isRead: false
  },
  {
    id: 'COMM-015',
    type: CommunicationType.EMAIL,
    title: 'Recipe Feedback Request',
    content: 'Sent email to recent customers requesting feedback on new red velvet cake recipe. Included survey link and offered 10% discount on next order for participation.',
    createdAt: '2025-01-12T08:15:00Z',
    performedBy: 'Marketing',
    isPinned: false,
    priority: Priority.LOW,
    emailSubject: 'We\'d Love Your Feedback - New Red Velvet Recipe',
    isRead: true
  }
];

export const getNewCommunicationsCount = (): number => {
  return mockCommunications.filter(comm => !comm.isRead).length;
};

export const getPinnedCommunications = (): CommunicationEntry[] => {
  return mockCommunications.filter(comm => comm.isPinned);
};

export const getCommunicationsByType = (type: CommunicationType): CommunicationEntry[] => {
  return mockCommunications.filter(comm => comm.type === type);
};

export const getCommunicationsByCustomer = (customerId: string): CommunicationEntry[] => {
  return mockCommunications.filter(comm => comm.customerId === customerId);
};