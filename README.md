# Église Source de Grâce — site officiel

Site vitrine Next.js entièrement rédigé en français. Le français est l’unique langue de l’interface et la langue définie dans le document HTML (`lang="fr"`).

## Lancer le projet en local

```bash
npm install
npm run dev
```

Ouvrez ensuite http://localhost:3000.

## Personnalisation avant publication

- Remplacez les photos temporaires de la galerie par les photos officielles de l’église.
- Ajoutez la photo officielle du pasteur dans la section qui lui est consacrée.
- Dans `app/page.tsx`, renseignez `YOUTUBE_VIDEO_ID` et `YOUTUBE_CHANNEL_URL` avec les informations réelles de la chaîne.
- Remplacez l’adresse e-mail provisoire `contact@eglisesourcedegrace.org` par l’adresse officielle.
- Confirmez l’horaire du culte dominical avant publication.

## Déploiement

1. Envoyez le contenu du dossier sur votre dépôt GitHub.
2. Importez le dépôt dans Vercel.
3. Conservez les paramètres de construction Next.js proposés par Vercel.
4. Déployez le site.

Le contenu public du site est en français : navigation, titres, descriptions, boutons, légendes, messages, événements, coordonnées, métadonnées et textes alternatifs des images.


## Espace d'administration et demandes des fidèles

L'espace privé est disponible sur `/admin`. Le formulaire public « Déposer une demande » est intégré à la section Contact.

### Configuration Supabase (obligatoire)

1. Créez un projet sur https://supabase.com.
2. Dans **Project Settings > API**, copiez l'URL du projet et la clé `anon` / publishable.
3. Créez `.env.local` à la racine à partir de `.env.example` et renseignez les deux valeurs.
4. Dans **SQL Editor** de Supabase, exécutez tout le contenu de `supabase/schema.sql`.
5. Dans **Authentication > Providers / Sign In**, désactivez les inscriptions publiques (Allow new users to sign up).
6. Dans **Authentication > Users**, créez manuellement un utilisateur pour chaque administrateur autorisé. Utilisez une adresse e-mail et un mot de passe robustes.
7. Pour Vercel, ajoutez les mêmes variables `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans **Project Settings > Environment Variables**, puis redéployez.

### Utilisation

- Les fidèles déposent leurs demandes depuis la section Contact du site.
- L'administrateur se connecte sur `https://votre-site.vercel.app/admin/connexion`.
- Le tableau de bord affiche les demandes, les filtres et les compteurs.
- Chaque demande peut être ouverte, classée (En attente / En cours / Traitée), annotée avec une note interne ou supprimée.
- Les politiques RLS de Supabase permettent l'insertion publique, mais réservent la lecture, la modification et la suppression aux utilisateurs authentifiés.
- Ne placez jamais une clé `service_role` dans le navigateur ou dans les variables `NEXT_PUBLIC_*`.

### Démarrage local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Sans configuration Supabase, le site vitrine reste accessible mais le formulaire et l'administration ne peuvent pas enregistrer/afficher les demandes.

## Administration par rôles (Super Admin, Pasteur, Finance, Secrétaire, Diacres)

1. Dans Supabase > SQL Editor, exécuter `supabase/schema.sql` (faire une sauvegarde avant migration).
2. Dans Supabase > Authentication > Users, créer/inviter le premier compte Super Admin.
3. Copier son UUID puis exécuter la requête d'amorçage commentée à la fin de `supabase/schema.sql`, avec son UUID et son nom.
4. Dans Vercel > Settings > Environment Variables, ajouter `SUPABASE_SERVICE_ROLE_KEY` avec la clé secrète `service_role` du projet Supabase. Cette variable doit rester côté serveur : ne jamais lui donner le préfixe `NEXT_PUBLIC_`, ne pas la placer dans le code client et ne pas la committer dans Git.
5. Redéployer le projet. Le Super Admin pourra ouvrir `/admin/utilisateurs` pour inviter les Pasteurs, membres Finance, Secrétaires et plusieurs Diacres. Chaque personne reçoit une invitation par e-mail pour définir son mot de passe.

Les comptes ne sont pas ouverts à l'inscription publique. Les rôles sont vérifiés côté serveur et les politiques RLS contrôlent l'accès aux données. Vérifier et personnaliser les politiques métier avant d'utiliser des données réelles.
