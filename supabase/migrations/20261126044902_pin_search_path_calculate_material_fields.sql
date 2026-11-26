-- Security fix F2: pin the resolution path on the materials cost trigger so
-- unqualified names cannot be shadowed by objects in an earlier schema.
-- Body is unchanged from 20251003004115_create_materials_table.sql.

CREATE OR REPLACE FUNCTION calculate_material_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.cost_per_item := CASE
    WHEN NEW.unit_quantity > 0 THEN NEW.package_cost / NEW.unit_quantity
    ELSE 0
  END;

  NEW.profit_margin := CASE
    WHEN NEW.cost_per_item > 0 THEN ((NEW.price_per_item - NEW.cost_per_item) / NEW.cost_per_item) * 100
    ELSE 0
  END;

  NEW.updated_at := now();

  RETURN NEW;
END;
$$;
