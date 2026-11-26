-- Security fix F1: the anon role held SELECT/INSERT/UPDATE/DELETE on every
-- public table. No policy targets anon, so these grants are currently inert,
-- but they are the authorization budget handed to the anonymous internet and
-- a single future permissive policy would turn them into a full breach.
-- The application does not query the database from the browser, so revoking
-- these cannot regress any feature. The authenticated grants and every
-- existing policy are left untouched.

REVOKE SELECT, INSERT, UPDATE, DELETE ON public.ingredients FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.ingredient_recipes FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.inventory_transactions FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.material_price_history FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.materials FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.production_batch_ingredients FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.production_batches FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.production_job_ingredients FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.production_job_materials FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.production_jobs FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON public.vendors FROM anon;
