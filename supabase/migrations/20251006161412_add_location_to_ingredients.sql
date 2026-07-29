/*
  # Add Location Field to Ingredients Table

  1. Changes
    - Add `location` column to `ingredients` table
      - Type: text
      - Constraint: NOT NULL
      - Check: Must be 'dry', 'fridge', or 'freezer'
    
  2. Performance
    - Add index on `location` column for filtering

  3. Notes
    - Existing rows will need to be updated with location values
    - This field is required for all ingredients to help with storage organization
*/

-- Add location column with check constraint
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'location'
  ) THEN
    ALTER TABLE ingredients ADD COLUMN location text;
  END IF;
END $$;

-- Add check constraint for valid location values
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'ingredients_location_check'
  ) THEN
    ALTER TABLE ingredients ADD CONSTRAINT ingredients_location_check 
      CHECK (location IN ('dry', 'fridge', 'freezer'));
  END IF;
END $$;

-- Create index for location filtering
CREATE INDEX IF NOT EXISTS idx_ingredients_location ON ingredients(location);

-- Set default location for existing records (can be updated later)
UPDATE ingredients 
SET location = 'dry' 
WHERE location IS NULL;

-- Make location column NOT NULL after setting defaults
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'ingredients' AND column_name = 'location' AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE ingredients ALTER COLUMN location SET NOT NULL;
  END IF;
END $$;