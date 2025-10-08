/*
  # Create Material Price History Table

  1. New Tables
    - `material_price_history`
      - `id` (uuid, primary key, auto-generated)
      - `material_id` (uuid, foreign key to materials, not null)
      - `old_package_cost` (decimal) - Previous package cost
      - `new_package_cost` (decimal) - New package cost
      - `old_price_per_item` (decimal) - Previous price per item
      - `new_price_per_item` (decimal) - New price per item
      - `cost_change_amount` (decimal) - Calculated change in package cost
      - `cost_change_percentage` (decimal) - Calculated percentage change in package cost
      - `price_change_amount` (decimal) - Calculated change in price per item
      - `price_change_percentage` (decimal) - Calculated percentage change in price per item
      - `reason` (text) - Reason for price change
      - `notes` (text) - Additional notes about the change
      - `changed_by` (text) - User who made the change (email or name)
      - `changed_at` (timestamptz, default now())

  2. Security
    - Enable RLS on `material_price_history` table
    - Add policy for authenticated users to read price history
    - Add policy for authenticated users to insert price history

  3. Indexes
    - Index on material_id for fast lookups
    - Index on changed_at for chronological queries

  4. Notes
    - Tracks all price changes for materials
    - Provides audit trail for cost and pricing decisions
    - Automatically calculates change amounts and percentages
*/

CREATE TABLE IF NOT EXISTS material_price_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid NOT NULL REFERENCES materials(id) ON DELETE CASCADE,
  old_package_cost decimal(10, 2),
  new_package_cost decimal(10, 2),
  old_price_per_item decimal(10, 4),
  new_price_per_item decimal(10, 4),
  cost_change_amount decimal(10, 2),
  cost_change_percentage decimal(10, 2),
  price_change_amount decimal(10, 4),
  price_change_percentage decimal(10, 2),
  reason text,
  notes text,
  changed_by text DEFAULT 'system',
  changed_at timestamptz DEFAULT now()
);

CREATE OR REPLACE FUNCTION calculate_price_changes()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.old_package_cost IS NOT NULL AND NEW.new_package_cost IS NOT NULL THEN
    NEW.cost_change_amount := NEW.new_package_cost - NEW.old_package_cost;
    NEW.cost_change_percentage := CASE 
      WHEN NEW.old_package_cost > 0 THEN ((NEW.new_package_cost - NEW.old_package_cost) / NEW.old_package_cost) * 100
      ELSE 0
    END;
  END IF;
  
  IF NEW.old_price_per_item IS NOT NULL AND NEW.new_price_per_item IS NOT NULL THEN
    NEW.price_change_amount := NEW.new_price_per_item - NEW.old_price_per_item;
    NEW.price_change_percentage := CASE 
      WHEN NEW.old_price_per_item > 0 THEN ((NEW.new_price_per_item - NEW.old_price_per_item) / NEW.old_price_per_item) * 100
      ELSE 0
    END;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_price_history_changes
  BEFORE INSERT ON material_price_history
  FOR EACH ROW
  EXECUTE FUNCTION calculate_price_changes();

CREATE INDEX IF NOT EXISTS idx_material_price_history_material_id ON material_price_history(material_id);
CREATE INDEX IF NOT EXISTS idx_material_price_history_changed_at ON material_price_history(changed_at DESC);

ALTER TABLE material_price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read price history"
  ON material_price_history
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert price history"
  ON material_price_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);