-- Create Vendors and Ingredients Tables
--
-- 1. New Tables
--    - vendors: Store bakery supplier information
--    - ingredients: Store ingredient details with pricing and inventory
--    - ingredient_recipes: Link ingredients to recipes
--
-- 2. Security
--    - Enable RLS on all tables
--    - Add policies for authenticated users
--
-- 3. Indexes for performance

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  contact_person text,
  email text,
  phone text,
  address text,
  city text,
  state text,
  zip text,
  payment_terms text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ingredients table
CREATE TABLE IF NOT EXISTS ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  package_size numeric NOT NULL,
  package_unit text NOT NULL,
  package_description text,
  inventory_quantity numeric NOT NULL DEFAULT 0,
  purchase_price numeric NOT NULL,
  cost_per_unit numeric NOT NULL,
  base_unit text NOT NULL,
  vendor_id uuid REFERENCES vendors(id) ON DELETE SET NULL,
  last_price_update timestamptz DEFAULT now(),
  reorder_level numeric DEFAULT 5,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ingredient_recipes junction table
CREATE TABLE IF NOT EXISTS ingredient_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id uuid NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
  recipe_id text NOT NULL,
  recipe_name text NOT NULL,
  quantity_used numeric NOT NULL,
  unit text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_ingredients_vendor_id ON ingredients(vendor_id);
CREATE INDEX IF NOT EXISTS idx_ingredients_category ON ingredients(category);
CREATE INDEX IF NOT EXISTS idx_ingredient_recipes_ingredient_id ON ingredient_recipes(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_ingredient_recipes_recipe_id ON ingredient_recipes(recipe_id);

-- Enable Row Level Security
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE ingredient_recipes ENABLE ROW LEVEL SECURITY;

-- Vendors policies
CREATE POLICY "Users can view vendors"
  ON vendors FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert vendors"
  ON vendors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update vendors"
  ON vendors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete vendors"
  ON vendors FOR DELETE
  TO authenticated
  USING (true);

-- Ingredients policies
CREATE POLICY "Users can view ingredients"
  ON ingredients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert ingredients"
  ON ingredients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update ingredients"
  ON ingredients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete ingredients"
  ON ingredients FOR DELETE
  TO authenticated
  USING (true);

-- Ingredient recipes policies
CREATE POLICY "Users can view ingredient recipes"
  ON ingredient_recipes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert ingredient recipes"
  ON ingredient_recipes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update ingredient recipes"
  ON ingredient_recipes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete ingredient recipes"
  ON ingredient_recipes FOR DELETE
  TO authenticated
  USING (true);
