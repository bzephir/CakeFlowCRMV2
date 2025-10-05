/*
  # Create Packages Management Tables

  ## Overview
  This migration creates a comprehensive package management system that combines
  recipes and materials into commonly ordered product packages (e.g., "8-inch vanilla cake"
  package = 1 vanilla cake recipe + 1/2 buttercream recipe + cake board + cake box).

  ## 1. New Tables

  ### `packages`
  Main packages table storing package information
  - `id` (uuid, primary key) - Unique package identifier
  - `name` (text, not null) - Package name (e.g., "8-inch Vanilla Birthday Cake")
  - `description` (text) - Package description
  - `category` (text, not null) - Package category: cakes, cupcakes, cookies, desserts, custom
  - `status` (text, not null) - Status: active, draft, archived
  - `total_cost` (numeric, not null) - Total cost from all recipes and materials
  - `base_price` (numeric) - Base price before customizations
  - `selling_price` (numeric) - Standard selling price
  - `profit_margin` (numeric) - Calculated profit margin percentage
  - `labor_cost` (numeric) - Additional labor cost if applicable
  - `times_ordered` (integer) - Number of times this package has been ordered
  - `last_ordered` (timestamptz) - Last time package was ordered
  - `is_template` (boolean) - Whether this package is a template for quick creation
  - `notes` (text) - Internal notes about the package
  - `created_by` (text) - User who created the package
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `package_recipes`
  Junction table linking packages to recipes with quantity multipliers
  - `id` (uuid, primary key)
  - `package_id` (uuid) - Foreign key to packages
  - `recipe_id` (uuid) - Foreign key to recipes
  - `recipe_name` (text) - Recipe name (denormalized for display)
  - `quantity_multiplier` (numeric) - Multiplier for recipe (e.g., 0.5 for half recipe, 2 for double)
  - `cost_contribution` (numeric) - Total cost this recipe contributes to package
  - `notes` (text) - Notes about this recipe in the package
  - `sort_order` (integer) - Display order

  ### `package_materials`
  Junction table linking packages to materials
  - `id` (uuid, primary key)
  - `package_id` (uuid) - Foreign key to packages
  - `material_id` (uuid) - Foreign key to materials
  - `material_name` (text) - Material name (denormalized for display)
  - `quantity` (numeric) - Number of items needed
  - `cost_per_item` (numeric) - Cost per item at time of adding
  - `total_cost` (numeric) - Total cost for this material
  - `notes` (text) - Notes about this material in package
  - `sort_order` (integer) - Display order

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read, insert, update, and delete
  - All operations restricted to authenticated users

  ## 3. Indexes
  - Index on package category for filtering
  - Index on package status for filtering
  - Index on package name for searching
  - Foreign key indexes for performance

  ## 4. Important Notes
  - All costs use numeric type for precision
  - Profit margin is calculated as ((selling_price - total_cost) / total_cost) * 100
  - Recipe multipliers allow fractional quantities (0.5, 1.5, etc.)
  - Material and recipe names are denormalized for display performance
  - Cost contributions are calculated during package creation/update
*/

-- Create packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'custom',
  status text NOT NULL DEFAULT 'draft',
  total_cost numeric NOT NULL DEFAULT 0,
  base_price numeric DEFAULT 0,
  selling_price numeric DEFAULT 0,
  profit_margin numeric DEFAULT 0,
  labor_cost numeric DEFAULT 0,
  times_ordered integer DEFAULT 0,
  last_ordered timestamptz,
  is_template boolean DEFAULT false,
  notes text,
  created_by text DEFAULT 'system',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create package_recipes junction table
CREATE TABLE IF NOT EXISTS package_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  recipe_id uuid REFERENCES recipes(id) ON DELETE SET NULL,
  recipe_name text NOT NULL,
  quantity_multiplier numeric NOT NULL DEFAULT 1,
  cost_contribution numeric NOT NULL DEFAULT 0,
  notes text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create package_materials junction table
CREATE TABLE IF NOT EXISTS package_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  material_id uuid REFERENCES materials(id) ON DELETE SET NULL,
  material_name text NOT NULL,
  quantity numeric NOT NULL DEFAULT 1,
  cost_per_item numeric NOT NULL DEFAULT 0,
  total_cost numeric NOT NULL DEFAULT 0,
  notes text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Function to calculate package totals and profit margin
CREATE OR REPLACE FUNCTION calculate_package_totals()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate profit margin if selling price and total cost are set
  IF NEW.selling_price > 0 AND NEW.total_cost > 0 THEN
    NEW.profit_margin := ((NEW.selling_price - NEW.total_cost) / NEW.total_cost) * 100;
  ELSE
    NEW.profit_margin := 0;
  END IF;

  NEW.updated_at := now();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update package calculations
CREATE TRIGGER update_package_calculations
  BEFORE INSERT OR UPDATE ON packages
  FOR EACH ROW
  EXECUTE FUNCTION calculate_package_totals();

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_packages_category ON packages(category);
CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status);
CREATE INDEX IF NOT EXISTS idx_packages_name ON packages(name);
CREATE INDEX IF NOT EXISTS idx_packages_created_at ON packages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_packages_is_template ON packages(is_template);
CREATE INDEX IF NOT EXISTS idx_package_recipes_package_id ON package_recipes(package_id);
CREATE INDEX IF NOT EXISTS idx_package_recipes_recipe_id ON package_recipes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_package_materials_package_id ON package_materials(package_id);
CREATE INDEX IF NOT EXISTS idx_package_materials_material_id ON package_materials(material_id);

-- Enable Row Level Security
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_materials ENABLE ROW LEVEL SECURITY;

-- Packages policies
CREATE POLICY "Users can view packages"
  ON packages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert packages"
  ON packages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update packages"
  ON packages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete packages"
  ON packages FOR DELETE
  TO authenticated
  USING (true);

-- Package recipes policies
CREATE POLICY "Users can view package recipes"
  ON package_recipes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert package recipes"
  ON package_recipes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update package recipes"
  ON package_recipes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete package recipes"
  ON package_recipes FOR DELETE
  TO authenticated
  USING (true);

-- Package materials policies
CREATE POLICY "Users can view package materials"
  ON package_materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert package materials"
  ON package_materials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update package materials"
  ON package_materials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete package materials"
  ON package_materials FOR DELETE
  TO authenticated
  USING (true);
