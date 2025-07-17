export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'client';
  avatar?: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthday?: string;
  anniversary?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
  status: 'active' | 'inactive';
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
  avatar?: null;
  notes?: string;
  tags?: string[];
}

export interface Order {
  id: string;
  eventType: 'celebration' | 'wedding' | 'corporate';
  customerId: string; 
  status: 'draft' | 'confirmed' | 'pending' | 'on hold' | 'in progress' | 'awaiting payment' | 'paid' | 'fulfilled' | 'cancelled' | 'refunded';
  //Common fields across all order types/stages
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime?: string;
  deliveryTime?: string;
  venue?: string;
  guestCount: number;
  //Order-specific fields
  orderItems: string[];
  payments: Payment[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  depositAmount: number;
  balance: number;
  specialInstructions: string; // Specific instructions for production/delivery
  deliveryNotes: string; // Notes specific to delivery logistics
  // Metadata
  submittedAt: string; // Date/time when the order was initially created/submitted
  lastUpdated: string;
  assignedTo?: string;
  createdAt: string; // Date/time when the order record was created in the system
  actions:OrderAction[];

}

export interface OrderItem {
  id: string;
  name: string;
  description: string;
  quantity: number;
  unitprice: number;
  total: number;
}

export interface Payment {
  id: string;
  date:string;
  amount: number;
  method: string;
  reference?: string; //e.g., transaction ID
}

export interface OrderAction {
  id: string;
  type: 'status_change' | 'note_added' | 'email-sent' | 'call_made' | 'paymenmt_received' |'qoute_sent';
  description:string; 
  performedBy: string;
  performedAt: string;
  details?: {
    previousStatus?: string;
    newStatus?: string;
    emailSubject?: string;
    callDuration?: number;
    quoteId?: string;
    amount?: number; // For payment_received
    method?: string; // For payment_received
    reference?: string; // For payment_received
    notes?: string;
    };
}
export interface Quote {
  id: string;
  type: 'celebration' | 'wedding' | 'corporate';
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  
  // Common fields across all quote types
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime: string;
  deliveryTime: string;
  eventTime: string;
  guestCount?: number;
  budget?: string;
  hearAboutUs?: string;
  additionalNotes?: string;
  
  // Type-specific details
  details: CelebrationInquiryDetails | WeddingInquiryDetails | CorporateInquiryDetails;
  
  // Quote-specific fields
  quoteItems: QuoteItem[];
  subtotal: number;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  shippingFee: number;
  total: number;
  customerNotes: string;
  internalNotes: string;
  termsConditions: string;
  expiryDate: string;
  
  // Metadata
  submittedAt: string;
  lastUpdated: string;
  assignedTo?: string;
  
  // Action history
  actions: QuoteAction[];
}

export interface QuoteItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// Quote action/timeline interface
export interface QuoteAction {
  id: string;
  type: 'status_change' | 'note_added' | 'email_sent' | 'call_made' | 'quote_sent' | 'meeting_scheduled';
  description: string;
  performedBy: string;
  performedAt: string;
  details?: {
    previousStatus?: string;
    newStatus?: string;
    emailSubject?: string;
    callDuration?: number;
    quoteId?: string;
    meetingDate?: string;
    notes?: string;
  };
}

export interface Invoice {
  id: string;
  eventDate: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime?: string;
  deliveryTime?: string;
  eventTime?: string;
  status: 'paid' | 'deposit-paid' | 'pending' | 'overdue' | 'draft';
  total: number;
  balance: number;
  issueDate: string;
  dueDate: string;
}

export interface Communication {
  id: string;
  type: 'email' | 'phone';
  subject: string;
  date: string;
  status: 'sent' | 'completed';
  preview: string;
}

export interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  unit: string;
  costPerUnit: number;
  quantity: number;
  supplier?: string;
  inStock: number;
  reorderLevel: number;
}

// Comprehensive Inquiry Interface
export interface Inquiry {
  id: string;
  type: 'celebration' | 'wedding' | 'corporate';
  status: 'new' | 'opened' | 'contacted' | 'quoted' | 'converted' | 'declined';
  
  // Common fields across all inquiry types
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  fulfillmentType: 'pickup' | 'delivery';
  pickupTime?: string;
  deliveryTime?: string;
  eventTime?: string;
  guestCount?: number;
  budget?: string;
  hearAboutUs?: string;
  additionalNotes?: string;
  
  // Type-specific details
  details: CelebrationInquiryDetails | WeddingInquiryDetails | CorporateInquiryDetails;
  
  // Metadata
  submittedAt: string;
  lastUpdated: string;
  assignedTo?: string;
  
  // Action history
  actions: InquiryAction[];
}

// Type-specific inquiry details
export interface CelebrationInquiryDetails {
  occasion: string;
  services: string[];
  theme?: string;
  colors?: string;
  cakeTasting: boolean;
  inspirationPhotos?: string[];
}

export interface WeddingInquiryDetails {
  weddingDate: string;
  venue?: string;
  weddingSize: 'intimate' | 'medium' | 'large';
  services: string[];
  cakeStyle?: string;
  flavors?: string[];
}