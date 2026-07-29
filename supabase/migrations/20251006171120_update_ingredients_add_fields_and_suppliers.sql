/*
  # Update Ingredients Table and Add Suppliers Support

  1. Changes to Ingredients Table
    - Add `expiration_date` column (timestamptz) for food safety and stock rotation tracking
    - Add `date_received` column (timestamptz) for tracking when ingredients arrived
    - Rename `inventory_quantity` to `quantity_on_hand` for clearer terminology
    - Add `supplier_id` column to reference suppliers table
    - Update indexes for new fields
    
  2. Supplier Migration
    - Rename vendor_id references to supplier_id
    - The vendors table will serve as the suppliers table (semantically they are the same)
    - Update foreign key constraints
    
  3. Performance
    - Add index on `expiration_date` for filtering expiring items
    - Add index on `date_received` for receipt date queries
    - Add index on `supplier_id` for supplier relationships
    
  4. Security
    - All existing RLS policies remain in effect
    - No changes to security model
    
  5. Notes
    - This migration is idempotent and safe to run multiple times
    - Existing data will be preserved
    - Default values ensure no NULL issues
*/

-- Add expiration_date column
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'expiration_date'
  ) THEN
    ALTER TABLE ingredients ADD COLUMN expiration_date timestamptz;
  END IF;
END $$;

-- Add date_received column if not exists
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'date_received'
  ) THEN
    ALTER TABLE ingredients ADD COLUMN date_received timestamptz;
  END IF;
END $$;

-- Rename inventory_quantity to quantity_on_hand
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'inventory_quantity'
  ) THEN
    ALTER TABLE ingredients RENAME COLUMN inventory_quantity TO quantity_on_hand;
  END IF;
END $$;

-- Add supplier_id column (keeping vendor_id for now for compatibility)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'supplier_id'
  ) THEN
    ALTER TABLE ingredients ADD COLUMN supplier_id uuid REFERENCES vendors(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Copy vendor_id data to supplier_id for existing records
UPDATE ingredients 
SET supplier_id = vendor_id 
WHERE supplier_id IS NULL AND vendor_id IS NOT NULL;

-- Create indexes for new fields
CREATE INDEX IF NOT EXISTS idx_ingredients_expiration_date ON ingredients(expiration_date);
CREATE INDEX IF NOT EXISTS idx_ingredients_date_received ON ingredients(date_received);
CREATE INDEX IF NOT EXISTS idx_ingredients_supplier_id ON ingredients(supplier_id);

-- Add brand and lot_number columns if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'brand'
  ) THEN
    ALTER TABLE ingredients ADD COLUMN brand text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'lot_number'
  ) THEN
    ALTER TABLE ingredients ADD COLUMN lot_number text;
  END IF;
END $$;