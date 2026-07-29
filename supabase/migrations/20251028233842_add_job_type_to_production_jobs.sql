/*
  # Add Job Type to Production Jobs

  ## Summary
  Adds job_type column to production_jobs table to distinguish between internal and external production jobs.

  ## Changes
  1. New Column
    - `job_type` (text) - Type of production job: 'internal' or 'external'
      - 'internal': Jobs for stock production, sub-recipes, or internal use
      - 'external': Jobs linked to customer orders

  2. Constraints
    - Add CHECK constraint to validate job_type values
    - Set default value to 'external' for safety

  3. Index
    - Create index on job_type for efficient filtering

  ## Notes
  - This field enables tab-based filtering in the UI
  - Existing jobs will default to 'external' (customer-facing)
  - The field is required for all new production jobs
*/

-- Add job_type column to production_jobs table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'production_jobs' AND column_name = 'job_type'
  ) THEN
    ALTER TABLE production_jobs 
    ADD COLUMN job_type text NOT NULL DEFAULT 'external';
    
    -- Add constraint to validate job_type values
    ALTER TABLE production_jobs
    ADD CONSTRAINT valid_job_type CHECK (job_type IN ('internal', 'external'));
  END IF;
END $$;

-- Create index for efficient filtering by job_type
CREATE INDEX IF NOT EXISTS idx_production_jobs_job_type ON production_jobs(job_type);