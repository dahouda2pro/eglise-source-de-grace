-- Exécuter ce script dans Supabase > SQL Editor.
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
create policy "Visiteurs peuvent envoyer une demande"
on public.demandes_fideles for insert to anon, authenticated
with check (char_length(nom) between 2 and 120 and char_length(sujet) between 2 and 180 and char_length(message) between 10 and 5000);
create policy "Administrateurs peuvent lire les demandes"
on public.demandes_fideles for select to authenticated using (true);
create policy "Administrateurs peuvent modifier les demandes"
on public.demandes_fideles for update to authenticated using (true) with check (true);
create policy "Administrateurs peuvent supprimer les demandes"
on public.demandes_fideles for delete to authenticated using (true);
-- Désactiver les inscriptions publiques dans Authentication > Settings.
