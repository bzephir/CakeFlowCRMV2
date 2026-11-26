-- Security fix F3: pin the resolution path on the price-history trigger so
-- unqualified names cannot be shadowed by objects in an earlier schema.
-- Body is unchanged from 20251008170127_create_material_price_history_table.sql.

CREATE OR REPLACE FUNCTION calculate_price_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
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
$$;
