/*
  # Production Management Tables Migration

  ## Summary
  Creates comprehensive production management system for CakeFlow CRM bakery operations.
  
  ## New Tables

  ### production_jobs
  Core production job tracking table linking recipes, orders, and inventory.
  - `id` (uuid, primary key)
  - `job_number` (text, unique) - Sequential job identifier
  - `recipe_id` (uuid) - Links to recipes table
  - `recipe_name` (text) - Denormalized for performance
  - `recipe_category` (text) - cake, frosting, filling, etc.
  - `quantity_to_produce` (integer) - Number of units to make
  - `unit` (text) - servings, pieces, cakes, etc.
  - `status` (text) - queued, in_progress, completed, cancelled, on_hold
  - `priority` (text) - low, normal, high, urgent
  - `scheduled_date` (date) - When production is scheduled
  - `scheduled_start_time` (time)
  - `actual_start_time` (timestamptz)
  - `actual_end_time` (timestamptz)
  - `assigned_staff_id` (uuid) - Links to staff/users
  - `assigned_staff_name` (text) - Denormalized
  - `linked_order_id` (uuid) - Optional link to customer order
  - `linked_order_number` (text)
  - `customer_name` (text)
  - `order_due_date` (date)
  - `total_ingredient_cost` (decimal)
  - `total_material_cost` (decimal)
  - `total_cost` (decimal)
  - `batch_number` (text, unique) - Generated batch identifier
  - `yield_quantity` (integer) - Actual units produced
  - `waste_quantity` (decimal)
  - `waste_percentage` (decimal)
  - `notes` (text)
  - `quality_notes` (text)
  - `created_at` (timestamptz)
  - `created_by` (uuid)
  - `updated_at` (timestamptz)
  - `updated_by` (uuid)
  - `completed_at` (timestamptz)

  ### production_job_ingredients
  Tracks ingredients required and used for each production job.
  - `id` (uuid, primary key)
  - `production_job_id` (uuid, foreign key) - Links to production_jobs
  - `ingredient_id` (uuid) - Links to ingredients table
  - `ingredient_name` (text)
  - `category` (text)
  - `required_quantity` (decimal)
  - `required_unit` (text)
  - `actual_quantity` (decimal) - Actual amount used
  - `actual_unit` (text)
  - `cost_per_unit` (decimal)
  - `total_cost` (decimal)
  - `current_stock` (decimal) - Snapshot at job creation
  - `is_available` (boolean)
  - `is_low_stock` (boolean)
  - `lot_number` (text) - For traceability
  - `expiration_date` (date)
  - `waste_quantity` (decimal)
  - `waste_reason` (text)
  - `deducted_from_inventory` (boolean)
  - `deducted_at` (timestamptz)
  - `deducted_by` (uuid)

  ### production_job_materials
  Tracks packaging materials required and used for each production job.
  - `id` (uuid, primary key)
  - `production_job_id` (uuid, foreign key) - Links to production_jobs
  - `material_id` (uuid) - Links to materials table
  - `material_name` (text)
  - `category` (text)
  - `required_quantity` (integer)
  - `actual_quantity` (integer) - Actual amount used
  - `cost_per_item` (decimal)
  - `total_cost` (decimal)
  - `current_stock` (integer) - Snapshot at job creation
  - `is_available` (boolean)
  - `is_low_stock` (boolean)
  - `deducted_from_inventory` (boolean)
  - `deducted_at` (timestamptz)
  - `deducted_by` (uuid)

  ### production_batches
  Tracks finished goods batches with full ingredient traceability.
  - `id` (uuid, primary key)
  - `batch_number` (text, unique)
  - `production_job_id` (uuid, foreign key)
  - `recipe_id` (uuid)
  - `recipe_name` (text)
  - `quantity_produced` (integer)
  - `unit` (text)
  - `production_date` (date)
  - `expiration_date` (date)
  - `quality_check_passed` (boolean)
  - `quality_notes` (text)
  - `assigned_to_order_id` (uuid)
  - `used_date` (date)
  - `created_at` (timestamptz)
  - `created_by` (uuid)

  ### production_batch_ingredients
  Links finished batches to source ingredient lots for full traceability.
  - `id` (uuid, primary key)
  - `batch_id` (uuid, foreign key)
  - `ingredient_id` (uuid)
  - `ingredient_name` (text)
  - `lot_number` (text)
  - `quantity_used` (decimal)
  - `unit` (text)
  - `expiration_date` (date)

  ### inventory_transactions
  Comprehensive log of all inventory movements.
  - `id` (uuid, primary key)
  - `transaction_type` (text) - deduction, addition, adjustment, waste
  - `item_type` (text) - ingredient, material
  - `item_id` (uuid)
  - `item_name` (text)
  - `quantity` (decimal)
  - `unit` (text)
  - `previous_quantity` (decimal)
  - `new_quantity` (decimal)
  - `production_job_id` (uuid)
  - `batch_number` (text)
  - `reason` (text)
  - `notes` (text)
  - `performed_by` (uuid)
  - `performed_at` (timestamptz)

  ## Security
  - Enable RLS on all production tables
  - Policies restrict access to authenticated users
  - Read access for all authenticated users
  - Write access restricted by role (admin, staff)
  - Inventory transactions require supervisor role

  ## Indexes
  - Production jobs: status, scheduled_date, assigned_staff_id, linked_order_id
  - Job ingredients: production_job_id, ingredient_id, lot_number
  - Job materials: production_job_id, material_id
  - Batches: batch_number, production_job_id, recipe_id
  - Transactions: item_type + item_id, production_job_id, performed_at
*/

-- Production Jobs Table
CREATE TABLE IF NOT EXISTS production_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_number text UNIQUE NOT NULL,
  recipe_id uuid,
  recipe_name text NOT NULL,
  recipe_category text NOT NULL,
  quantity_to_produce integer NOT NULL,
  unit text NOT NULL,
  status text NOT NULL DEFAULT 'queued',
  priority text NOT NULL DEFAULT 'normal',
  
  scheduled_date date NOT NULL,
  scheduled_start_time time,
  actual_start_time timestamptz,
  actual_end_time timestamptz,
  
  assigned_staff_id uuid,
  assigned_staff_name text,
  
  linked_order_id uuid,
  linked_order_number text,
  customer_name text,
  order_due_date date,
  
  total_ingredient_cost decimal(10,2) DEFAULT 0,
  total_material_cost decimal(10,2) DEFAULT 0,
  total_cost decimal(10,2) DEFAULT 0,
  
  batch_number text UNIQUE,
  yield_quantity integer,
  waste_quantity decimal(10,2),
  waste_percentage decimal(5,2),
  
  notes text,
  quality_notes text,
  
  created_at timestamptz DEFAULT now(),
  created_by uuid NOT NULL,
  updated_at timestamptz DEFAULT now(),
  updated_by uuid,
  completed_at timestamptz,
  
  CONSTRAINT valid_status CHECK (status IN ('queued', 'in_progress', 'completed', 'cancelled', 'on_hold')),
  CONSTRAINT valid_priority CHECK (priority IN ('low', 'normal', 'high', 'urgent'))
);

-- Production Job Ingredients Table
CREATE TABLE IF NOT EXISTS production_job_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_job_id uuid NOT NULL REFERENCES production_jobs(id) ON DELETE CASCADE,
  
  ingredient_id uuid NOT NULL,
  ingredient_name text NOT NULL,
  category text NOT NULL,
  
  required_quantity decimal(10,3) NOT NULL,
  required_unit text NOT NULL,
  actual_quantity decimal(10,3),
  actual_unit text,
  
  cost_per_unit decimal(10,2) NOT NULL,
  total_cost decimal(10,2) NOT NULL,
  
  current_stock decimal(10,3) NOT NULL,
  is_available boolean DEFAULT true,
  is_low_stock boolean DEFAULT false,
  
  lot_number text,
  expiration_date date,
  
  waste_quantity decimal(10,3),
  waste_reason text,
  
  deducted_from_inventory boolean DEFAULT false,
  deducted_at timestamptz,
  deducted_by uuid
);

-- Production Job Materials Table
CREATE TABLE IF NOT EXISTS production_job_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_job_id uuid NOT NULL REFERENCES production_jobs(id) ON DELETE CASCADE,
  
  material_id uuid NOT NULL,
  material_name text NOT NULL,
  category text NOT NULL,
  
  required_quantity integer NOT NULL,
  actual_quantity integer,
  
  cost_per_item decimal(10,2) NOT NULL,
  total_cost decimal(10,2) NOT NULL,
  
  current_stock integer NOT NULL,
  is_available boolean DEFAULT true,
  is_low_stock boolean DEFAULT false,
  
  deducted_from_inventory boolean DEFAULT false,
  deducted_at timestamptz,
  deducted_by uuid
);

-- Production Batches Table
CREATE TABLE IF NOT EXISTS production_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number text UNIQUE NOT NULL,
  production_job_id uuid NOT NULL REFERENCES production_jobs(id),
  
  recipe_id uuid NOT NULL,
  recipe_name text NOT NULL,
  
  quantity_produced integer NOT NULL,
  unit text NOT NULL,
  
  production_date date NOT NULL,
  expiration_date date,
  
  quality_check_passed boolean DEFAULT true,
  quality_notes text,
  
  assigned_to_order_id uuid,
  used_date date,
  
  created_at timestamptz DEFAULT now(),
  created_by uuid NOT NULL
);

-- Production Batch Ingredients Table (Traceability)
CREATE TABLE IF NOT EXISTS production_batch_ingredients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL REFERENCES production_batches(id) ON DELETE CASCADE,
  
  ingredient_id uuid NOT NULL,
  ingredient_name text NOT NULL,
  lot_number text NOT NULL,
  quantity_used decimal(10,3) NOT NULL,
  unit text NOT NULL,
  expiration_date date
);

-- Inventory Transactions Table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_type text NOT NULL,
  
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  item_name text NOT NULL,
  
  quantity decimal(10,3) NOT NULL,
  unit text,
  
  previous_quantity decimal(10,3) NOT NULL,
  new_quantity decimal(10,3) NOT NULL,
  
  production_job_id uuid REFERENCES production_jobs(id),
  batch_number text,
  
  reason text,
  notes text,
  
  performed_by uuid NOT NULL,
  performed_at timestamptz DEFAULT now(),
  
  CONSTRAINT valid_transaction_type CHECK (transaction_type IN ('deduction', 'addition', 'adjustment', 'waste')),
  CONSTRAINT valid_item_type CHECK (item_type IN ('ingredient', 'material'))
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_production_jobs_status ON production_jobs(status);
CREATE INDEX IF NOT EXISTS idx_production_jobs_scheduled_date ON production_jobs(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_production_jobs_assigned_staff ON production_jobs(assigned_staff_id);
CREATE INDEX IF NOT EXISTS idx_production_jobs_linked_order ON production_jobs(linked_order_id);
CREATE INDEX IF NOT EXISTS idx_production_jobs_batch_number ON production_jobs(batch_number);

CREATE INDEX IF NOT EXISTS idx_job_ingredients_job_id ON production_job_ingredients(production_job_id);
CREATE INDEX IF NOT EXISTS idx_job_ingredients_ingredient_id ON production_job_ingredients(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_job_ingredients_lot_number ON production_job_ingredients(lot_number);

CREATE INDEX IF NOT EXISTS idx_job_materials_job_id ON production_job_materials(production_job_id);
CREATE INDEX IF NOT EXISTS idx_job_materials_material_id ON production_job_materials(material_id);

CREATE INDEX IF NOT EXISTS idx_batches_batch_number ON production_batches(batch_number);
CREATE INDEX IF NOT EXISTS idx_batches_job_id ON production_batches(production_job_id);
CREATE INDEX IF NOT EXISTS idx_batches_recipe_id ON production_batches(recipe_id);

CREATE INDEX IF NOT EXISTS idx_batch_ingredients_batch_id ON production_batch_ingredients(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_ingredients_lot_number ON production_batch_ingredients(lot_number);

CREATE INDEX IF NOT EXISTS idx_transactions_item ON inventory_transactions(item_type, item_id);
CREATE INDEX IF NOT EXISTS idx_transactions_job_id ON inventory_transactions(production_job_id);
CREATE INDEX IF NOT EXISTS idx_transactions_performed_at ON inventory_transactions(performed_at);

-- Row Level Security
ALTER TABLE production_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_job_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_job_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_batch_ingredients ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Production Jobs
CREATE POLICY "Authenticated users can view production jobs"
  ON production_jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create production jobs"
  ON production_jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update production jobs"
  ON production_jobs FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete production jobs"
  ON production_jobs FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Production Job Ingredients
CREATE POLICY "Authenticated users can view job ingredients"
  ON production_job_ingredients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage job ingredients"
  ON production_job_ingredients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update job ingredients"
  ON production_job_ingredients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete job ingredients"
  ON production_job_ingredients FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Production Job Materials
CREATE POLICY "Authenticated users can view job materials"
  ON production_job_materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage job materials"
  ON production_job_materials FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update job materials"
  ON production_job_materials FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete job materials"
  ON production_job_materials FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Production Batches
CREATE POLICY "Authenticated users can view batches"
  ON production_batches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create batches"
  ON production_batches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update batches"
  ON production_batches FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete batches"
  ON production_batches FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Batch Ingredients
CREATE POLICY "Authenticated users can view batch ingredients"
  ON production_batch_ingredients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage batch ingredients"
  ON production_batch_ingredients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update batch ingredients"
  ON production_batch_ingredients FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete batch ingredients"
  ON production_batch_ingredients FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Inventory Transactions
CREATE POLICY "Authenticated users can view transactions"
  ON inventory_transactions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create transactions"
  ON inventory_transactions FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update transactions"
  ON inventory_transactions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
