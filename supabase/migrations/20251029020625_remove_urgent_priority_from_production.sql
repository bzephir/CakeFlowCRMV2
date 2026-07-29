/*
  # Remove Urgent Priority from Production Jobs

  ## Summary
  Removes the 'urgent' priority level from the production management system, leaving only three priority levels: low, normal (medium), and high.

  ## Changes Made
  
  1. **Data Migration**
     - Updates all existing production jobs with 'urgent' priority to 'high' priority
     - Ensures no data loss during the transition
  
  2. **Constraint Update**
     - Removes the existing CHECK constraint on the priority column
     - Creates a new CHECK constraint that only allows 'low', 'normal', 'high' values
     - Enforces the three-tier priority system at the database level
  
  3. **Impact**
     - All urgent priority jobs are automatically converted to high priority
     - Future production jobs cannot be created with urgent priority
     - Maintains data integrity and consistency across the system
  
  ## Notes
  - This is a breaking change that removes urgent priority completely
  - No backward compatibility is maintained
  - Frontend components must be updated to reflect this change
*/

-- Step 1: Update all existing production jobs with 'urgent' priority to 'high'
UPDATE production_jobs
SET priority = 'high'
WHERE priority = 'urgent';

-- Step 2: Drop the existing priority constraint
ALTER TABLE production_jobs
DROP CONSTRAINT IF EXISTS valid_priority;

-- Step 3: Create new constraint without 'urgent' option
ALTER TABLE production_jobs
ADD CONSTRAINT valid_priority CHECK (priority IN ('low', 'normal', 'high'));