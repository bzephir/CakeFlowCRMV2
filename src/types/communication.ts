export enum CommunicationType {
  EMAIL = 'email',
  CALL = 'call',
  SMS = 'sms',
  NOTE = 'note',
  ANNOUNCEMENT = 'announcement',
  ORDER_UPDATE = 'order_update',
  QUOTE_UPDATE = 'quote_update',
  INVOICE_UPDATE = 'invoice_update',
  TASK_UPDATE = 'task_update',
  SYSTEM = 'system'
}

export enum Priority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum Visibility {
  ALL = 'all',
  STAFF_ONLY = 'staff_only',
  CUSTOMER_SPECIFIC = 'customer_specific'
}

export interface CommunicationEntry {
  id: string;
  type: CommunicationType;
  title: string;
  content: string;
  createdAt: string;
  performedBy: string;
  isPinned: boolean;
  priority: Priority;
  visibility: Visibility;
  
  // Linked entities (optional)
  customerId?: string;
  customerName?: string;
  orderId?: string;
  quoteId?: string;
  invoiceId?: string;
  venueId?: string;
  venueName?: string;
  taskId?: string;
  
  // Communication specific fields
  emailSubject?: string;
  callDuration?: number; // in minutes
  followUpRequired?: boolean;
  followUpDate?: string;
  
  // Metadata
  readBy?: string[]; // Array of user IDs who have read this entry
  isRead?: boolean; // For current user
  attachments?: {
    id: string;
    name: string;
    type: string;
    size: string;
    url: string;
  }[];
}

export interface CommunicationFormData {
  type: CommunicationType;
  title: string;
  content: string;
  priority: Priority;
  isPinned: boolean;
  customerId: string;
  orderId: string;
  quoteId: string;
  invoiceId: string;
  venueId: string;
  followUpRequired: boolean;
  followUpDate: string;
}

export interface CommunicationFilters {
  type: string;
  module: string;
  priority: string;
  dateRange: string;
  showPinnedOnly: boolean;
  showUnreadOnly: boolean;
}