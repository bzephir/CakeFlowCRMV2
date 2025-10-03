/*
  # Create Materials Inventory Table

  1. New Tables
    - `materials`
      - `id` (uuid, primary key, auto-generated)
      - `name` (text, not null) - Material name (e.g., "1/2 Sheet Cake Board")
      - `category` (text, not null) - Material category
      - `unit_quantity` (integer, not null) - Number of items per package
      - `package_cost` (decimal, not null) - Total cost for the package
      - `cost_per_item` (decimal, generated) - Calculated: package_cost / unit_quantity
      - `price_per_item` (decimal, not null) - Price charged to customers per item
      - `profit_margin` (decimal, generated) - Calculated: ((price_per_item - cost_per_item) / cost_per_item) * 100
      - `inventory_quantity` (integer, not null, default 0) - Number of packages in stock
      - `reorder_level` (integer, not null, default 5) - Threshold for low stock alerts
      - `vendor_id` (uuid, foreign key to vendors) - Associated vendor
      - `can_link_to_recipe` (boolean, default false) - Whether material can be used in recipes
      - `notes` (text) - Additional notes
      - `last_price_update` (timestamptz) - Last time pricing was updated
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `materials` table
    - Add policy for authenticated users to read materials
    - Add policy for authenticated users to insert materials
    - Add policy for authenticated users to update materials
    - Add policy for authenticated users to delete materials

  3. Indexes
    - Index on category for filtering
    - Index on name for searching
    - Index on inventory_quantity for stock level queries

  4. Notes
    - cost_per_item and profit_margin are calculated fields updated via trigger
    - Ensures pricing integrity and automatic margin calculations
    - vendor_id references vendors table created in previous migration
*/

CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  unit_quantity integer NOT NULL CHECK (unit_quantity > 0),
  package_cost decimal(10, 2) NOT NULL CHECK (package_cost >= 0),
  cost_per_item decimal(10, 4) NOT NULL DEFAULT 0,
  price_per_item decimal(10, 4) NOT NULL CHECK (price_per_item >= 0),
  profit_margin decimal(10, 2) NOT NULL DEFAULT 0,
  inventory_quantity integer NOT NULL DEFAULT 0 CHECK (inventory_quantity >= 0),
  reorder_level integer NOT NULL DEFAULT 5 CHECK (reorder_level >= 0),
  vendor_id uuid REFERENCES vendors(id) ON DELETE SET NULL,
  can_link_to_recipe boolean DEFAULT false,
  notes text,
  last_price_update timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION calculate_material_fields()
RETURNS TRIGGER AS $$
BEGIN
  NEW.cost_per_item := CASE 
    WHEN NEW.unit_quantity > 0 THEN NEW.package_cost / NEW.unit_quantity
    ELSE 0
  END;
  
  NEW.profit_margin := CASE 
    WHEN NEW.cost_per_item > 0 THEN ((NEW.price_per_item - NEW.cost_per_item) / NEW.cost_per_item) * 100
    ELSE 0
  END;
  
  NEW.updated_at := now();
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_material_calculations
  BEFORE INSERT OR UPDATE ON materials
  FOR EACH ROW
  EXECUTE FUNCTION calculate_material_fields();

CREATE INDEX IF NOT EXISTS idx_materials_category ON materials(category);
CREATE INDEX IF NOT EXISTS idx_materials_name ON materials(name);
CREATE INDEX IF NOT EXISTS idx_materials_inventory ON materials(inventory_quantity);
CREATE INDEX IF NOT EXISTS idx_materials_vendor ON materials(vendor_id);

ALTER TABLE materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read materials"
  ON materials
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert materials"
  ON materials
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update materials"
  ON materials
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete materials"
  ON materials
  FOR DELETE
  TO authenticated
  USING (true);
