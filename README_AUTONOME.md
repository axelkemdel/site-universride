# Univers Ride — Landing Page autonome

Cette archive contient la landing page officielle Univers Ride, ses pages légales, ses styles, ses composants React et ses assets locaux. Elle ne dépend pas du runtime Manus, du proxy de stockage Manus, de la collecte de logs Manus ou du script d’analytics Manus.

## Prérequis

Installez Node.js 20 ou une version plus récente, puis activez pnpm avec `corepack enable` si nécessaire.

## Installation

Depuis le dossier du projet, exécutez :

```bash
pnpm install
pnpm run dev
```

Le serveur Vite sera disponible sur `http://localhost:3000`. Pour tester avec le domaine local, ajoutez `127.0.0.1 universride.net` au fichier hosts de votre système, puis ouvrez `http://universride.net:3000`.

## Build de production

```bash
pnpm run check
pnpm run build
pnpm run start
```

Le dossier `dist/public` contient les fichiers frontend construits. Le serveur Express de production peut servir ce dossier avec `pnpm run start`.

## Assets et contact

Les images de hero, les véhicules, le logo et le favicon se trouvent dans `client/public/assets`. Le formulaire d’assistance ouvre le client email de l’utilisateur avec un message prérempli vers `support@universride.net`. Le Call Center affiché sur le site est le `+236 72 63 63 63`.

## Publication

La landing page peut être publiée sur un hébergement statique en envoyant le contenu de `dist/public`, ou sur un serveur Node.js en utilisant le serveur Express fourni. Configurez HTTPS sur le domaine final avant la mise en production et vérifiez les mentions légales, l’adresse email de support et les liens de téléchargement Android.
