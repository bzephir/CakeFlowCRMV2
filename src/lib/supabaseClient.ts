import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DatabaseMaterial {
  id: string;
  name: string;
  category: string;
  unit_quantity: number;
  package_cost: number;
  cost_per_item: number;
  price_per_item: number;
  profit_margin: number;
  inventory_quantity: number;
  reorder_level: number;
  vendor_id: string | null;
  can_link_to_recipe: boolean;
  notes: string | null;
  last_price_update: string | null;
  created_at: string;
  updated_at: string;
}

export interface DatabasePriceHistory {
  id: string;
  material_id: string;
  old_package_cost: number | null;
  new_package_cost: number | null;
  old_price_per_item: number | null;
  new_price_per_item: number | null;
  cost_change_amount: number | null;
  cost_change_percentage: number | null;
  price_change_amount: number | null;
  price_change_percentage: number | null;
  reason: string | null;
  notes: string | null;
  changed_by: string;
  changed_at: string;
}

export interface MaterialInsert {
  name: string;
  category: string;
  unit_quantity: number;
  package_cost: number;
  price_per_item: number;
  inventory_quantity: number;
  reorder_level: number;
  vendor_id?: string | null;
  can_link_to_recipe: boolean;
  notes?: string | null;
}

export interface MaterialUpdate extends Partial<MaterialInsert> {
  id: string;
}

export interface PriceHistoryInsert {
  material_id: string;
  old_package_cost?: number | null;
  new_package_cost?: number | null;
  old_price_per_item?: number | null;
  new_price_per_item?: number | null;
  reason?: string | null;
  notes?: string | null;
  changed_by?: string;
}
