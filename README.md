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
