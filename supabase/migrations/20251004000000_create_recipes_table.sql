/*
  # Create Recipes Tables

  ## Overview
  This migration creates a comprehensive recipe management system with support for
  ingredients, preparation steps, and packaging materials.

  ## 1. New Tables

  ### `recipes`
  Main recipes table storing core recipe information
  - `id` (uuid, primary key) - Unique recipe identifier
  - `name` (text) - Recipe name
  - `description` (text) - Recipe description
  - `category` (text) - Category: cake, filling, frosting, syrup, fondant, cookie, decoration, dessert, garnish, sauce, pie, doughnuts, other
  - `status` (text) - Status: active, draft, archived
  - `yield_quantity` (numeric) - Number of servings/pieces
  - `yield_unit` (text) - Unit of measurement (servings, pieces, cups, etc.)
  - `yield_description` (text) - Description of yield (e.g., "9-inch round cake")
  - `preparation_time` (integer) - Total preparation time in minutes
  - `total_cost` (numeric) - Total cost of ingredients and materials
  - `cost_per_unit` (numeric) - Cost per serving/piece
  - `created_by` (text) - User who created the recipe
  - `last_used` (timestamptz) - Last time recipe was used
  - `times_used` (integer) - Number of times recipe has been used
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `recipe_ingredients`
  Junction table linking recipes to ingredients
  - `id` (uuid, primary key)
  - `recipe_id` (uuid) - Foreign key to recipes
  - `ingredient_id` (uuid) - Foreign key to ingredients (nullable for custom ingredients)
  - `name` (text) - Ingredient name
  - `quantity` (numeric) - Amount needed
  - `unit` (text) - Unit of measurement
  - `cost_per_unit` (numeric) - Cost per unit
  - `total_cost` (numeric) - Total cost for this ingredient
  - `notes` (text) - Any special notes
  - `is_optional` (boolean) - Whether ingredient is optional
  - `sort_order` (integer) - Display order

  ### `recipe_preparation_steps`
  Stores preparation instructions for recipes
  - `id` (uuid, primary key)
  - `recipe_id` (uuid) - Foreign key to recipes
  - `step_number` (integer) - Step sequence number
  - `instruction` (text) - Step instruction
  - `duration` (integer) - Time for this step in minutes
  - `temperature` (text) - Temperature if applicable
  - `notes` (text) - Additional notes

  ### `recipe_packaging`
  Links recipes to packaging materials
  - `id` (uuid, primary key)
  - `recipe_id` (uuid) - Foreign key to recipes
  - `material_id` (uuid) - Foreign key to materials (nullable)
  - `name` (text) - Package/material name
  - `quantity` (numeric) - Amount needed
  - `unit` (text) - Unit of measurement
  - `cost_per_unit` (numeric) - Cost per unit
  - `total_cost` (numeric) - Total cost for this item

  ## 2. Security
  - Enable RLS on all tables
  - Add policies for authenticated users to read, insert, update, and delete
  - All operations restricted to authenticated users

  ## 3. Indexes
  - Index on recipe category for filtering
  - Index on recipe status for filtering
  - Index on recipe name for searching
  - Foreign key indexes for performance

  ## 4. Important Notes
  - All costs use numeric type for precision
  - Times used defaults to 0 for new recipes
  - Status defaults to 'draft'
  - Categories are stored as lowercase text for consistency
  - Selling prices and margins are reserved for packages, not recipes
*/

-- Create recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'other',
  status text NOT NULL DEFAULT 'draft',
  yield_quantity numeric NOT NULL DEFAULT 1,
  yield_unit text NOT NULL DEFAULT 'servings',
  yield_description text,
  preparation_time integer DEFAULT 0,
  total_cost numeric NOT NULL DEFAULT 0,
  cost_per_unit numeric NOT NULL DEFAULT 0,
  created_by text DEFAULT 'system',
  last_used timestamptz,
  times_used integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create recipe_ingredients table
CREATE TABLE IF NOT EXISTS recipe_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  ingredient_id uuid REFERENCES ingredients(id) ON DELETE SET NULL,
  name text NOT NULL,
  quantity numeric NOT NULL,
  unit text NOT NULL,
  cost_per_unit numeric DEFAULT 0,
  total_cost numeric DEFAULT 0,
  notes text,
  is_optional boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create recipe_preparation_steps table
CREATE TABLE IF NOT EXISTS recipe_preparation_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  step_number integer NOT NULL,
  instruction text NOT NULL,
  duration integer,
  temperature text,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Create recipe_packaging table
CREATE TABLE IF NOT EXISTS recipe_packaging (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  material_id uuid REFERENCES materials(id) ON DELETE SET NULL,
  name text NOT NULL,
  quantity numeric NOT NULL,
  unit text NOT NULL,
  cost_per_unit numeric DEFAULT 0,
  total_cost numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_recipes_status ON recipes(status);
CREATE INDEX IF NOT EXISTS idx_recipes_name ON recipes(name);
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_ingredients_ingredient_id ON recipe_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_recipe_preparation_steps_recipe_id ON recipe_preparation_steps(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_packaging_recipe_id ON recipe_packaging(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_packaging_material_id ON recipe_packaging(material_id);

-- Enable Row Level Security
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_preparation_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_packaging ENABLE ROW LEVEL SECURITY;

-- Recipes policies
CREATE POLICY "Users can view recipes"
  ON recipes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert recipes"
  ON recipes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update recipes"
  ON recipes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete recipes"
  ON recipes FOR DELETE
  TO authenticated
  USING (true);

-- Recipe ingredients policies
CREATE POLICY "Users can view recipe ingredients"
  ON recipe_ingredients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert recipe ingredients"
  ON recipe_ingredients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update recipe ingredients"
  ON recipe_ingredients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete recipe ingredients"
  ON recipe_ingredients FOR DELETE
  TO authenticated
  USING (true);

-- Recipe preparation steps policies
CREATE POLICY "Users can view recipe preparation steps"
  ON recipe_preparation_steps FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert recipe preparation steps"
  ON recipe_preparation_steps FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update recipe preparation steps"
  ON recipe_preparation_steps FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete recipe preparation steps"
  ON recipe_preparation_steps FOR DELETE
  TO authenticated
  USING (true);

-- Recipe packaging policies
CREATE POLICY "Users can view recipe packaging"
  ON recipe_packaging FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert recipe packaging"
  ON recipe_packaging FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update recipe packaging"
  ON recipe_packaging FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete recipe packaging"
  ON recipe_packaging FOR DELETE
  TO authenticated
  USING (true);
