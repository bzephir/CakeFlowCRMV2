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
  customer?: string;
  email?: string;
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
  depositPaid: number;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Quote {
  id: string;
  eventType: string;
  eventTime?: string;
  pickupTime: string;
  deliveryTime: string;
  eventDate: string;
  status: 'accepted' | 'sent' | 'draft' | 'rejected' | 'expired';
  total: number;
  createdAt: string;
  expiryDate: string;
}

export interface Invoice {
  id: string;
  eventDate: string;
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
  servings: number;
  prepTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  ingredients: Ingredient[];
  instructions: string[];
  cost: number;
  profitMargin: number;
  sellingPrice: number;
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
  dietaryRestrictions?: string[];
  deliverySetup: boolean;
  tastingRequested: boolean;
  budgetRange?: string;
  weddingPlanner?: {
    name: string;
    company: string;
    contact: string;
  };
}

export interface CorporateInquiryDetails {
  companyName: string;
  eventType: string;
  services: string[];
  recurring: boolean;
  frequency?: string;
  brandingRequired: boolean;
  deliveryAddress?: string;
  contactPerson: {
    name: string;
    title: string;
    department: string;
  };
  approvalProcess?: string;
  invoicingRequirements?: string;
}

// Inquiry action/timeline interface
export interface InquiryAction {
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

// Updated InquiryForm interface to align with new Inquiry type
export interface InquiryForm {
  id: string;
  type: 'celebration' | 'wedding' | 'corporate';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  occasion: string;
  services: string[];
  guestCount: number;
  theme: string;
  colors: string;
  budget: string;
  cakeTasting: boolean;
  hearAboutUs: string;
  inspirationPhotos: File[];
  submittedAt: string;
  status: 'new' | 'contacted' | 'quoted' | 'converted' | 'declined';
}