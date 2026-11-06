-- Schéma de l'administration de l'Église Source de Grâce.
-- Exécuter dans Supabase > SQL Editor. Sauvegarder la base avant migration.

create table if not exists public.profils_administration (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  phone text,
  avatar_url text,
  role text not null check (role in ('super_admin','pastor','finance','secretary','deacon')),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.current_church_role()
returns text language sql stable security definer set search_path = public
as $$ select role from public.profils_administration where user_id = auth.uid() and active = true limit 1 $$;

create or replace function public.has_church_role(roles text[])
returns boolean language sql stable security definer set search_path = public
as $$ select coalesce(public.current_church_role() = any(roles), false) $$;

alter table public.profils_administration enable row level security;
drop policy if exists "profiles read self or super admin" on public.profils_administration;
drop policy if exists "profiles update self or super admin" on public.profils_administration;
drop policy if exists "profiles update super admin only" on public.profils_administration;
drop policy if exists "profiles insert super admin" on public.profils_administration;
create policy "profiles read self or super admin" on public.profils_administration
for select to authenticated using (user_id = auth.uid() or public.has_church_role(array['super_admin']));
create policy "profiles update super admin only" on public.profils_administration
for update to authenticated using (public.has_church_role(array['super_admin']))
with check (public.has_church_role(array['super_admin']));
create policy "profiles insert super admin" on public.profils_administration
for insert to authenticated with check (public.has_church_role(array['super_admin']));

create table if not exists public.demandes_fideles (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text,
  telephone text,
  type_demande text not null check (type_demande in ('Prière','Accompagnement pastoral','Témoignage','Information','Autre')),
  sujet text not null,
  message text not null,
  statut text not null default 'En attente' check (statut in ('En attente','En cours','Traitée')),
  note_interne text,
  created_at timestamptz not null default now()
);

alter table public.demandes_fideles enable row level security;
drop policy if exists "Visiteurs peuvent envoyer une demande" on public.demandes_fideles;
drop policy if exists "Administrateurs peuvent lire les demandes" on public.demandes_fideles;
drop policy if exists "Administrateurs peuvent modifier les demandes" on public.demandes_fideles;
drop policy if exists "Administrateurs peuvent supprimer les demandes" on public.demandes_fideles;
create policy "Visiteurs peuvent envoyer une demande" on public.demandes_fideles
for insert to anon, authenticated with check (
  char_length(nom) between 2 and 120 and char_length(sujet) between 2 and 180 and char_length(message) between 10 and 5000
);
create policy "Responsables autorisés lisent les demandes" on public.demandes_fideles
for select to authenticated using (public.has_church_role(array['super_admin','pastor','secretary']));
create policy "Responsables autorisés modifient les demandes" on public.demandes_fideles
for update to authenticated using (public.has_church_role(array['super_admin','pastor','secretary']))
with check (public.has_church_role(array['super_admin','pastor','secretary']));
create policy "Super admin supprime les demandes" on public.demandes_fideles
for delete to authenticated using (public.has_church_role(array['super_admin']));

-- IMPORTANT : créer le premier Super Admin manuellement dans Authentication > Users,
-- puis insérer son profil ci-dessous en remplaçant UUID et nom.
-- insert into public.profils_administration (user_id, full_name, role)
-- values ('UUID_DE_L_UTILISATEUR', 'Nom du Super Admin', 'super_admin');
