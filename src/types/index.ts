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
  customer?: string; // Added for consistency with mock data
  email?: string; // Added for consistency with mock data
  customerId: string;
  customerName: string;
  eventDate: string;
  eventType: string;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'in-production' | 'completed' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  deposited?: number; // Added for consistency with mock data
  balance?: number; // Added for consistency with mock data
  items: string[]; // Changed to string[] to match mock data usage
  depositPaid: number;
  balance: number;
  createdAt: string;
}
export interface Quote {
  id: string;
  eventType: string;
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
  type: string; // e.g., 'images', 'document'
  size: string;
  uploadDate: string;
  uploadedBy: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string; // e.g., 'delivery', 'appointment'
  status: string; // e.g., 'confirmed', 'scheduled'
}
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
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