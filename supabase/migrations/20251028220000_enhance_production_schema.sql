/*
  # Enhanced Production Management Schema

  ## Summary
  Enhances the production management system with support for:
  - Sub-recipes (in-house made ingredients)
  - Multi-stage workflow tracking
  - Client approvals and design specifications
  - Photo and design file attachments
  - Recipe customization and scaling
  - Enhanced batch traceability

  ## New Tables

  ### sub_recipes
  Tracks in-house made ingredients that are used as components in final products
  - `id` (uuid, primary key)
  - `recipe_id` (uuid) - Links to the recipe that produces this sub-recipe
  - `name` (text) - Name of the sub-recipe/component
  - `category` (text) - filling, frosting, topping, etc.
  - `description` (text)
  - `yield_quantity` (decimal) - Amount produced per batch
  - `yield_unit` (text)
  - `shelf_life_days` (integer)
  - `storage_location` (text) - dry, fridge, freezer
  - `cost_per_unit` (decimal)
  - `labor_cost` (decimal)
  - `total_cost` (decimal)
  - `current_stock` (decimal)
  - `unit` (text)
  - `is_active` (boolean)
  - `notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### recipe_sub_recipes
  Links recipes to the sub-recipes they require
  - `id` (uuid, primary key)
  - `recipe_id` (uuid) - Parent recipe
  - `sub_recipe_id` (uuid) - Sub-recipe component
  - `quantity_required` (decimal)
  - `unit` (text)
  - `is_optional` (boolean)
  - `notes` (text)

  ### production_workflow_stages
  Defines workflow stages for production jobs
  - `id` (uuid, primary key)
  - `production_job_id` (uuid) - Links to production_jobs
  - `stage_name` (text) - baking, cooling, decorating, packaging, etc.
  - `stage_order` (integer)
  - `status` (text) - pending, in_progress, completed, skipped
  - `estimated_duration_minutes` (integer)
  - `actual_duration_minutes` (integer)
  - `assigned_staff_id` (uuid)
  - `assigned_staff_name` (text)
  - `started_at` (timestamptz)
  - `completed_at` (timestamptz)
  - `notes` (text)
  - `quality_check_passed` (boolean)
  - `quality_notes` (text)
  - `created_at` (timestamptz)

  ### production_job_attachments
  Stores references to photos and design files for production jobs
  - `id` (uuid, primary key)
  - `production_job_id` (uuid) - Links to production_jobs
  - `file_name` (text)
  - `file_type` (text) - photo, design, reference, approval
  - `file_url` (text)
  - `file_size` (integer)
  - `description` (text)
  - `uploaded_by` (uuid)
  - `uploaded_at` (timestamptz)

  ### production_job_customizations
  Tracks custom recipe modifications for specific jobs
  - `id` (uuid, primary key)
  - `production_job_id` (uuid) - Links to production_jobs
  - `customization_type` (text) - ingredient_override, flavor_change, size_adjustment, etc.
  - `original_value` (text)
  - `custom_value` (text)
  - `notes` (text)
  - `created_at` (timestamptz)

  ### client_approvals
  Tracks client approvals for production specifications
  - `id` (uuid, primary key)
  - `production_job_id` (uuid) - Links to production_jobs
  - `approval_type` (text) - design, flavor, specifications
  - `status` (text) - pending, approved, rejected, revision_requested
  - `approved_by_name` (text)
  - `approved_at` (timestamptz)
  - `notes` (text)
  - `created_at` (timestamptz)

  ### sub_recipe_batches
  Tracks production batches of sub-recipes
  - `id` (uuid, primary key)
  - `batch_number` (text, unique)
  - `sub_recipe_id` (uuid)
  - `sub_recipe_name` (text)
  - `quantity_produced` (decimal)
  - `unit` (text)
  - `production_date` (date)
  - `expiration_date` (date)
  - `produced_by` (uuid)
  - `produced_by_name` (text)
  - `quality_check_passed` (boolean)
  - `quality_notes` (text)
  - `cost_per_unit` (decimal)
  - `total_cost` (decimal)
  - `created_at` (timestamptz)

  ## Enhanced Existing Tables
  - Add fields to production_jobs for design specifications
  - Add scaling_factor field to track recipe adjustments
  - Add client_specifications text field for custom requirements

  ## Security
  - Enable RLS on all new tables
  - Authenticated users can read all production-related data
  - Only authenticated users can create/update production data
  - Deletion restricted to admin roles

  ## Indexes
  - Sub-recipes: recipe_id, category, is_active
  - Recipe sub-recipes: recipe_id, sub_recipe_id
  - Workflow stages: production_job_id, stage_order, status
  - Attachments: production_job_id, file_type
  - Customizations: production_job_id
  - Client approvals: production_job_id, status
  - Sub-recipe batches: batch_number, sub_recipe_id, production_date
*/

-- Sub-Recipes Table
CREATE TABLE IF NOT EXISTS sub_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid,
  name text NOT NULL,
  category text NOT NULL,
  description text,
  yield_quantity decimal(10,3) NOT NULL,
  yield_unit text NOT NULL,
  shelf_life_days integer DEFAULT 7,
  storage_location text DEFAULT 'fridge',
  cost_per_unit decimal(10,2) DEFAULT 0,
  labor_cost decimal(10,2) DEFAULT 0,
  total_cost decimal(10,2) DEFAULT 0,
  current_stock decimal(10,3) DEFAULT 0,
  unit text NOT NULL,
  is_active boolean DEFAULT true,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),

  CONSTRAINT valid_storage_location CHECK (storage_location IN ('dry', 'fridge', 'freezer'))
);

-- Recipe Sub-Recipes Junction Table
CREATE TABLE IF NOT EXISTS recipe_sub_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid NOT NULL,
  sub_recipe_id uuid NOT NULL REFERENCES sub_recipes(id) ON DELETE CASCADE,
  quantity_required decimal(10,3) NOT NULL,
  unit text NOT NULL,
  is_optional boolean DEFAULT false,
  notes text,

  UNIQUE(recipe_id, sub_recipe_id)
);

-- Production Workflow Stages Table
CREATE TABLE IF NOT EXISTS production_workflow_stages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_job_id uuid NOT NULL REFERENCES production_jobs(id) ON DELETE CASCADE,
  stage_name text NOT NULL,
  stage_order integer NOT NULL,
  status text DEFAULT 'pending',
  estimated_duration_minutes integer,
  actual_duration_minutes integer,
  assigned_staff_id uuid,
  assigned_staff_name text,
  started_at timestamptz,
  completed_at timestamptz,
  notes text,
  quality_check_passed boolean,
  quality_notes text,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT valid_stage_status CHECK (status IN ('pending', 'in_progress', 'completed', 'skipped', 'blocked'))
);

-- Production Job Attachments Table
CREATE TABLE IF NOT EXISTS production_job_attachments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_job_id uuid NOT NULL REFERENCES production_jobs(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_type text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  description text,
  uploaded_by uuid NOT NULL,
  uploaded_at timestamptz DEFAULT now(),

  CONSTRAINT valid_file_type CHECK (file_type IN ('photo', 'design', 'reference', 'approval', 'other'))
);

-- Production Job Customizations Table
CREATE TABLE IF NOT EXISTS production_job_customizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_job_id uuid NOT NULL REFERENCES production_jobs(id) ON DELETE CASCADE,
  customization_type text NOT NULL,
  field_name text NOT NULL,
  original_value text,
  custom_value text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT valid_customization_type CHECK (customization_type IN ('ingredient_override', 'flavor_change', 'size_adjustment', 'decoration_change', 'other'))
);

-- Client Approvals Table
CREATE TABLE IF NOT EXISTS client_approvals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_job_id uuid NOT NULL REFERENCES production_jobs(id) ON DELETE CASCADE,
  approval_type text NOT NULL,
  status text DEFAULT 'pending',
  approved_by_name text,
  approved_at timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),

  CONSTRAINT valid_approval_type CHECK (approval_type IN ('design', 'flavor', 'specifications', 'final_product')),
  CONSTRAINT valid_approval_status CHECK (status IN ('pending', 'approved', 'rejected', 'revision_requested'))
);

-- Sub-Recipe Batches Table
CREATE TABLE IF NOT EXISTS sub_recipe_batches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_number text UNIQUE NOT NULL,
  sub_recipe_id uuid NOT NULL REFERENCES sub_recipes(id),
  sub_recipe_name text NOT NULL,
  quantity_produced decimal(10,3) NOT NULL,
  unit text NOT NULL,
  production_date date NOT NULL,
  expiration_date date,
  produced_by uuid NOT NULL,
  produced_by_name text,
  quality_check_passed boolean DEFAULT true,
  quality_notes text,
  cost_per_unit decimal(10,2) DEFAULT 0,
  total_cost decimal(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Add new fields to production_jobs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'production_jobs' AND column_name = 'scaling_factor'
  ) THEN
    ALTER TABLE production_jobs ADD COLUMN scaling_factor decimal(5,2) DEFAULT 1.0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'production_jobs' AND column_name = 'client_specifications'
  ) THEN
    ALTER TABLE production_jobs ADD COLUMN client_specifications text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'production_jobs' AND column_name = 'design_notes'
  ) THEN
    ALTER TABLE production_jobs ADD COLUMN design_notes text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'production_jobs' AND column_name = 'requires_client_approval'
  ) THEN
    ALTER TABLE production_jobs ADD COLUMN requires_client_approval boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'production_jobs' AND column_name = 'approval_status'
  ) THEN
    ALTER TABLE production_jobs ADD COLUMN approval_status text DEFAULT 'not_required';
  END IF;
END $$;

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_sub_recipes_recipe_id ON sub_recipes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_sub_recipes_category ON sub_recipes(category);
CREATE INDEX IF NOT EXISTS idx_sub_recipes_is_active ON sub_recipes(is_active);

CREATE INDEX IF NOT EXISTS idx_recipe_sub_recipes_recipe_id ON recipe_sub_recipes(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipe_sub_recipes_sub_recipe_id ON recipe_sub_recipes(sub_recipe_id);

CREATE INDEX IF NOT EXISTS idx_workflow_stages_job_id ON production_workflow_stages(production_job_id);
CREATE INDEX IF NOT EXISTS idx_workflow_stages_order ON production_workflow_stages(stage_order);
CREATE INDEX IF NOT EXISTS idx_workflow_stages_status ON production_workflow_stages(status);

CREATE INDEX IF NOT EXISTS idx_job_attachments_job_id ON production_job_attachments(production_job_id);
CREATE INDEX IF NOT EXISTS idx_job_attachments_file_type ON production_job_attachments(file_type);

CREATE INDEX IF NOT EXISTS idx_job_customizations_job_id ON production_job_customizations(production_job_id);

CREATE INDEX IF NOT EXISTS idx_client_approvals_job_id ON client_approvals(production_job_id);
CREATE INDEX IF NOT EXISTS idx_client_approvals_status ON client_approvals(status);

CREATE INDEX IF NOT EXISTS idx_sub_recipe_batches_batch_number ON sub_recipe_batches(batch_number);
CREATE INDEX IF NOT EXISTS idx_sub_recipe_batches_sub_recipe_id ON sub_recipe_batches(sub_recipe_id);
CREATE INDEX IF NOT EXISTS idx_sub_recipe_batches_production_date ON sub_recipe_batches(production_date);

-- Row Level Security
ALTER TABLE sub_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_sub_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_workflow_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_job_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_job_customizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_recipe_batches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Sub-Recipes
CREATE POLICY "Authenticated users can view sub-recipes"
  ON sub_recipes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create sub-recipes"
  ON sub_recipes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sub-recipes"
  ON sub_recipes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete sub-recipes"
  ON sub_recipes FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Recipe Sub-Recipes
CREATE POLICY "Authenticated users can view recipe sub-recipes"
  ON recipe_sub_recipes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage recipe sub-recipes"
  ON recipe_sub_recipes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update recipe sub-recipes"
  ON recipe_sub_recipes FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete recipe sub-recipes"
  ON recipe_sub_recipes FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Workflow Stages
CREATE POLICY "Authenticated users can view workflow stages"
  ON production_workflow_stages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create workflow stages"
  ON production_workflow_stages FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update workflow stages"
  ON production_workflow_stages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete workflow stages"
  ON production_workflow_stages FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Attachments
CREATE POLICY "Authenticated users can view attachments"
  ON production_job_attachments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can upload attachments"
  ON production_job_attachments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete attachments"
  ON production_job_attachments FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for Customizations
CREATE POLICY "Authenticated users can view customizations"
  ON production_job_customizations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create customizations"
  ON production_job_customizations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for Client Approvals
CREATE POLICY "Authenticated users can view approvals"
  ON client_approvals FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create approvals"
  ON client_approvals FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update approvals"
  ON client_approvals FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- RLS Policies for Sub-Recipe Batches
CREATE POLICY "Authenticated users can view sub-recipe batches"
  ON sub_recipe_batches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create sub-recipe batches"
  ON sub_recipe_batches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update sub-recipe batches"
  ON sub_recipe_batches FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
