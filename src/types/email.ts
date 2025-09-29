export enum EmailStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  RECEIVED = 'received',
  REPLIED = 'replied',
  FORWARDED = 'forwarded',
  ARCHIVED = 'archived'
}

export enum EmailPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum EmailFolder {
  INBOX = 'inbox',
  SENT = 'sent',
  DRAFTS = 'drafts',
  ARCHIVED = 'archived',
  TRASH = 'trash'
}

export interface EmailAttachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

export interface Email {
  id: string;
  subject: string;
  content: string;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName: string;
  ccEmails?: string[];
  bccEmails?: string[];
  status: EmailStatus;
  priority: EmailPriority;
  folder: EmailFolder;
  isRead: boolean;
  isStarred: boolean;
  sentAt?: string;
  receivedAt?: string;
  createdAt: string;
  updatedAt: string;
  
  // Linked entities
  customerId?: string;
  customerName?: string;
  orderId?: string;
  quoteId?: string;
  invoiceId?: string;
  
  // Email specific
  attachments?: EmailAttachment[];
  threadId?: string;
  inReplyTo?: string;
  
  // Templates
  templateId?: string;
  templateName?: string;
}

export interface EmailFormData {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  content: string;
  priority: EmailPriority;
  customerId: string;
  orderId: string;
  quoteId: string;
  invoiceId: string;
  templateId: string;
  attachments: File[];
}

export interface EmailFilters {
  folder: EmailFolder;
  status: string;
  priority: string;
  dateRange: string;
  showStarredOnly: boolean;
  showUnreadOnly: boolean;
  customerId: string;
}