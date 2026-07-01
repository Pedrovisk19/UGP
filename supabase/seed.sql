-- supabase/seed.sql
-- Apenas para desenvolvimento local

-- Cria usuário admin de teste
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@ugp.dev',
  crypt('admin123', gen_salt('bf')),
  now(),
  now(),
  now()
) ON CONFLICT DO NOTHING;

INSERT INTO public.profiles (id, full_name, email, role, selected_trail, current_level, xp_points)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'Admin UGP',
  'admin@ugp.dev',
  'admin',
  'junior',
  'Júnior 1',
  400
) ON CONFLICT DO NOTHING;