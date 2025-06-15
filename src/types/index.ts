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
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  eventDate: string;
  eventType: string;
  status: 'inquiry' | 'quoted' | 'confirmed' | 'in-production' | 'completed' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  depositPaid: number;
  balance: number;
  createdAt: string;
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