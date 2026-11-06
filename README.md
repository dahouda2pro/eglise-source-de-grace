# Église Source de Grâce — Website

A bilingual (French / English), responsive church website built with Next.js.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Create a new GitHub repository, for example `eglise-source-de-grace`.
2. Extract this project and open its folder in VS Code.
3. Run:

```bash
git init
git add .
git commit -m "Initial church website"
git branch -M main
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/eglise-source-de-grace.git
git push -u origin main
```

4. Sign in to https://vercel.com with GitHub.
5. Select **Add New → Project**, import `eglise-source-de-grace`.
6. Keep the detected Next.js settings and click **Deploy**.

Vercel will redeploy automatically whenever you push changes to the connected GitHub repository.

## Content to confirm before public launch

- Exact service days and times
- Church phone number and official email address
- Street address / map pin
- Official social media links
- Pastor's approved biography and photograph
- Sermon and event content
- Giving / donation details (only if the church wants this feature)

## Editing the website

- Main bilingual content and language switch: `app/page.tsx`
- Styling and responsive layout: `app/globals.css`
- Page title and SEO description: `app/layout.tsx`

The pastor portrait is intentionally a placeholder until the official photo is provided.
The contact email is a placeholder and must be replaced before launch.
