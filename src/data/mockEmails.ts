import { Email, EmailStatus, EmailPriority, EmailFolder } from '../types/email';

export const mockEmails: Email[] = [
  {
    id: 'EMAIL-001',
    subject: 'Wedding Cake Consultation Follow-up',
    content: `Dear Sarah,

Thank you for meeting with us today to discuss your wedding cake. I wanted to follow up on our conversation and provide you with the information we discussed.

Based on your preferences, I recommend:
- 3-tier cake (6", 8", 10") to serve approximately 75 guests
- Vanilla bean cake with raspberry filling for the top tier
- Chocolate cake with salted caramel filling for the middle tier
- Lemon cake with blueberry compote for the bottom tier

The design will feature smooth buttercream finish in ivory with fresh flowers and delicate piping details as discussed.

I've attached some inspiration photos that align with your vision. Please let me know if you'd like to schedule a tasting appointment to finalize the flavors.

Looking forward to hearing from you!

Best regards,
Sarah Martinez
Sweet Delights Bakery`,
    fromEmail: 'sarah@sweetdelights.com',
    fromName: 'Sarah Martinez',
    toEmail: 'sarah.johnson@email.com',
    toName: 'Sarah Johnson',
    status: EmailStatus.SENT,
    priority: EmailPriority.NORMAL,
    folder: EmailFolder.SENT,
    isRead: true,
    isStarred: false,
    sentAt: '2025-01-17T10:30:00Z',
    createdAt: '2025-01-17T10:25:00Z',
    updatedAt: '2025-01-17T10:30:00Z',
    customerId: '1',
    customerName: 'Sarah Johnson',
    orderId: 'O-202501-0001',
    templateId: 'TMPL-001',
    templateName: 'Wedding Consultation Follow-up'
  },
  {
    id: 'EMAIL-002',
    subject: 'Re: Wedding Cake Consultation Follow-up',
    content: `Hi Sarah,

Thank you so much for the detailed follow-up! The flavor combinations sound absolutely perfect, especially the lemon with blueberry compote - that's exactly what I was hoping for.

I would love to schedule a tasting appointment. I'm available next week on Tuesday or Wednesday afternoon. Please let me know what works best for you.

Also, I wanted to ask about the timeline for finalizing the design. Our wedding is on June 15th, so I want to make sure we have everything confirmed with plenty of time.

Thank you again for your time and expertise!

Best,
Sarah Johnson`,
    fromEmail: 'sarah.johnson@email.com',
    fromName: 'Sarah Johnson',
    toEmail: 'sarah@sweetdelights.com',
    toName: 'Sarah Martinez',
    status: EmailStatus.RECEIVED,
    priority: EmailPriority.NORMAL,
    folder: EmailFolder.INBOX,
    isRead: false,
    isStarred: true,
    receivedAt: '2025-01-17T14:20:00Z',
    createdAt: '2025-01-17T14:20:00Z',
    updatedAt: '2025-01-17T14:20:00Z',
    customerId: '1',
    customerName: 'Sarah Johnson',
    orderId: 'O-202501-0001',
    inReplyTo: 'EMAIL-001',
    threadId: 'THREAD-001'
  },
  {
    id: 'EMAIL-003',
    subject: 'Corporate Event Catering Quote Request',
    content: `Hello,

I hope this email finds you well. I'm reaching out regarding catering services for our upcoming quarterly company meeting.

Event Details:
- Date: February 14, 2025
- Time: 12:00 PM - 2:00 PM
- Location: Downtown Conference Center
- Expected Attendees: 50 people

We're looking for:
- Assorted cupcakes (variety of flavors)
- 2 sheet cakes for celebration
- Coffee and tea service setup

Could you please provide a quote for these services? We would need delivery and setup at the venue.

Thank you for your time and I look forward to hearing from you.

Best regards,
Emma Davis
Corporate Events Manager
TechCorp Solutions`,
    fromEmail: 'emma.davis@techcorp.com',
    fromName: 'Emma Davis',
    toEmail: 'orders@sweetdelights.com',
    toName: 'Sweet Delights Bakery',
    status: EmailStatus.RECEIVED,
    priority: EmailPriority.HIGH,
    folder: EmailFolder.INBOX,
    isRead: false,
    isStarred: false,
    receivedAt: '2025-01-17T09:15:00Z',
    createdAt: '2025-01-17T09:15:00Z',
    updatedAt: '2025-01-17T09:15:00Z',
    customerId: '3',
    customerName: 'Emma Davis'
  },
  {
    id: 'EMAIL-004',
    subject: 'Payment Reminder - Invoice I-202412-0046',
    content: `Dear Emma,

I hope you're doing well. This is a friendly reminder that Invoice I-202412-0046 for $280.00 is now past due.

Invoice Details:
- Invoice Number: I-202412-0046
- Amount: $280.00
- Due Date: January 10, 2025
- Event: Corporate Event Catering

We understand that sometimes invoices can be overlooked, so we wanted to reach out personally. If you have any questions about this invoice or need to discuss payment arrangements, please don't hesitate to contact us.

You can pay online through our customer portal or call us at (555) 987-6543.

Thank you for your business and we look forward to hearing from you soon.

Best regards,
Accounting Department
Sweet Delights Bakery`,
    fromEmail: 'accounting@sweetdelights.com',
    fromName: 'Accounting Department',
    toEmail: 'emma.davis@techcorp.com',
    toName: 'Emma Davis',
    status: EmailStatus.SENT,
    priority: EmailPriority.HIGH,
    folder: EmailFolder.SENT,
    isRead: true,
    isStarred: false,
    sentAt: '2025-01-16T11:00:00Z',
    createdAt: '2025-01-16T10:55:00Z',
    updatedAt: '2025-01-16T11:00:00Z',
    customerId: '3',
    customerName: 'Emma Davis',
    invoiceId: 'I-202412-0046'
  },
  {
    id: 'EMAIL-005',
    subject: 'Birthday Cake Order Confirmation',
    content: `Hi Mike,

Thank you for your order! We're excited to create a special birthday cake for your celebration.

Order Confirmation:
- Order Number: O-202501-0002
- Cake: Custom Birthday Cake
- Pickup Date: January 17, 2025
- Pickup Time: 2:00 PM
- Total: $120.00

Your cake will be ready for pickup at our bakery location. Please bring this email as confirmation when you arrive.

If you need to make any changes or have questions, please contact us at least 24 hours before your pickup date.

We can't wait for you to see your custom creation!

Best regards,
Mike Rodriguez
Sweet Delights Bakery`,
    fromEmail: 'mike@sweetdelights.com',
    fromName: 'Mike Rodriguez',
    toEmail: 'mike.chen@email.com',
    toName: 'Mike Chen',
    status: EmailStatus.SENT,
    priority: EmailPriority.NORMAL,
    folder: EmailFolder.SENT,
    isRead: true,
    isStarred: false,
    sentAt: '2025-01-16T16:45:00Z',
    createdAt: '2025-01-16T16:40:00Z',
    updatedAt: '2025-01-16T16:45:00Z',
    customerId: '2',
    customerName: 'Mike Chen',
    orderId: 'O-202501-0002'
  },
  {
    id: 'EMAIL-006',
    subject: 'Quote Acceptance - Anniversary Celebration',
    content: `Dear Sweet Delights Team,

I'm writing to formally accept your quote Q-202501-0002 for our 25th wedding anniversary celebration.

The proposed menu and pricing look perfect for our intimate gathering of 30 guests. I especially appreciate the attention to detail in the cake design that incorporates our original wedding colors.

Please proceed with the order and let me know the next steps for the deposit payment.

Thank you for your professionalism and creativity!

Warm regards,
Lisa Park`,
    fromEmail: 'lisa.park@email.com',
    fromName: 'Lisa Park',
    toEmail: 'orders@sweetdelights.com',
    toName: 'Sweet Delights Bakery',
    status: EmailStatus.RECEIVED,
    priority: EmailPriority.HIGH,
    folder: EmailFolder.INBOX,
    isRead: true,
    isStarred: true,
    receivedAt: '2025-01-15T13:30:00Z',
    createdAt: '2025-01-15T13:30:00Z',
    updatedAt: '2025-01-15T13:30:00Z',
    customerId: '5',
    customerName: 'Lisa Park',
    quoteId: 'Q-202501-0002'
  },
  {
    id: 'EMAIL-007',
    subject: 'New Recipe Feedback Survey',
    content: `Dear Valued Customer,

We hope you enjoyed your recent order from Sweet Delights Bakery! As part of our commitment to continuous improvement, we've been working on some exciting new recipes.

We recently introduced our new Red Velvet Cake recipe and would love to hear your thoughts. Your feedback helps us create even better desserts for you and all our customers.

Please take a moment to complete our brief survey:
[Survey Link - Would be actual link in real implementation]

As a thank you for your time, we're offering 10% off your next order when you complete the survey.

Thank you for being a valued customer!

Best regards,
Marketing Team
Sweet Delights Bakery`,
    fromEmail: 'marketing@sweetdelights.com',
    fromName: 'Marketing Team',
    toEmail: 'multiple@recipients.com',
    toName: 'Valued Customers',
    status: EmailStatus.SENT,
    priority: EmailPriority.LOW,
    folder: EmailFolder.SENT,
    isRead: true,
    isStarred: false,
    sentAt: '2025-01-15T08:00:00Z',
    createdAt: '2025-01-15T07:45:00Z',
    updatedAt: '2025-01-15T08:00:00Z'
  },
  {
    id: 'EMAIL-008',
    subject: 'Venue Coordination - Grand Hotel Ballroom',
    content: `Hello Sweet Delights Team,

This is Jennifer Martinez from Grand Hotel Ballroom. I wanted to coordinate the details for the upcoming wedding cake delivery on January 22nd.

Delivery Details:
- Date: January 22, 2025
- Setup Time: 8:00 AM
- Event: Johnson-Williams Wedding
- Location: Grand Ballroom, 2nd Floor

Please use the service elevator and check in with our events team upon arrival. We'll have a dedicated setup area ready for you.

If you need any additional information or have questions about access, please don't hesitate to reach out.

Looking forward to working with you!

Best regards,
Jennifer Martinez
Events Coordinator
Grand Hotel Ballroom`,
    fromEmail: 'jennifer@grandhotel.com',
    fromName: 'Jennifer Martinez',
    toEmail: 'delivery@sweetdelights.com',
    toName: 'Delivery Team',
    status: EmailStatus.RECEIVED,
    priority: EmailPriority.NORMAL,
    folder: EmailFolder.INBOX,
    isRead: true,
    isStarred: false,
    receivedAt: '2025-01-14T15:20:00Z',
    createdAt: '2025-01-14T15:20:00Z',
    updatedAt: '2025-01-14T15:20:00Z',
    orderId: 'O-202501-0001'
  },
  {
    id: 'EMAIL-009',
    subject: 'Draft: Thank You for Your Business',
    content: `Dear [Customer Name],

Thank you for choosing Sweet Delights Bakery for your special occasion. We hope you and your guests enjoyed every bite of your custom creation!

Your satisfaction is our top priority, and we'd love to hear about your experience. If you have a moment, we'd appreciate any feedback you can share.

We look forward to being part of your future celebrations!

Warm regards,
The Sweet Delights Team`,
    fromEmail: 'admin@sweetdelights.com',
    fromName: 'Sweet Delights Bakery',
    toEmail: '',
    toName: '',
    status: EmailStatus.DRAFT,
    priority: EmailPriority.NORMAL,
    folder: EmailFolder.DRAFTS,
    isRead: true,
    isStarred: false,
    createdAt: '2025-01-14T12:00:00Z',
    updatedAt: '2025-01-14T12:00:00Z',
    templateId: 'TMPL-002',
    templateName: 'Thank You Template'
  }
];

export const getUnreadEmailsCount = (): number => {
  return mockEmails.filter(email => !email.isRead && email.folder === EmailFolder.INBOX).length;
};

export const getEmailsByFolder = (folder: EmailFolder): Email[] => {
  return mockEmails.filter(email => email.folder === folder);
};

export const getEmailsByCustomer = (customerId: string): Email[] => {
  return mockEmails.filter(email => email.customerId === customerId);
};

export const getStarredEmails = (): Email[] => {
  return mockEmails.filter(email => email.isStarred);
};