# Configuration hPanel — Univers Ride (Node.js / Express / MySQL)

Ce guide décrit la configuration de l'application Node.js sur Hostinger hPanel.
Il concerne le backend Express (`dist/index.js`) qui sert aussi les fichiers
statiques du frontend (`dist/public`) — voir hPanel > Sites web > Node.js.

> Remarque : le dépôt contient aussi `guide-deploiement-referencement.md`, qui
> décrit un déploiement **statique** (Netlify/Vercel/GitHub Pages, dossier
> `dist` seul). Cette procédure-ci ne s'applique **pas** au frontend seul : le
> projet a un backend Express + une base MySQL (authentification admin,
> formulaire de contact, médiathèque, analytics), donc un hébergeur purement
> statique ne peut pas le faire fonctionner. Utilisez ce guide pour Hostinger.

## Point d'entrée Node.js

- **Fichier de démarrage** : `dist/index.js`
- **Dossier des assets statiques servis par Express** : `dist/public`
- Commande de build : `npm run build` (génère les deux dossiers ci-dessus en une seule commande)
- Commande de démarrage : `npm run start` (équivalent à `NODE_ENV=production node dist/index.js`)

## Variables d'environnement requises au runtime

Ce sont les **seules variables strictement nécessaires** pour que le serveur
Express démarre et fonctionne (vérifié directement dans `server/index.ts` et
`server/db/index.ts`) :

| Variable | Exemple | Rôle |
|---|---|---|
| `NODE_ENV` | `production` | Active le mode production (cookies sécurisés, dossier `dist/public`) |
| `DATABASE_URL` | `mysql://u123456789_ride:MotDePasseFort@localhost:3306/u123456789_ride` | Connexion MySQL unique (ou utiliser `DB_HOST`/`DB_PORT`/`DB_USER`/`DB_PASSWORD`/`DB_NAME` séparément si hPanel les affiche individuellement) |
| `JWT_SECRET` | `7de64ac19b0c6c2a88b2563833cfedd3f228f8beed57150b5e6ba772d408f0050c8556ff34d1bc804e620a874834aa4bcff5a7b7be6e21d00ae4ac954d5ca712` | Signature des sessions admin |
| `UPLOADS_DIR` | `/home/u123456789/uploads` | Chemin absolu, en dehors du dossier de build, pour que les fichiers survivent aux redéploiements |

`PORT` est généralement injecté automatiquement par hPanel — ne pas le forcer sauf test local.

`ADMIN_EMAIL` / `ADMIN_PASSWORD` ne sont utilisées que ponctuellement par
`npm run db:seed` (création du premier compte admin) — pas nécessaires comme
variables permanentes dans hPanel.

**`VITE_GOOGLE_MAPS_API_KEY` a été retirée** : le composant qui l'utilisait
(`client/src/components/Map.tsx`) était du code mort, non importé nulle part
dans l'application, et a été supprimé du projet. Le build de production ne
dépend d'aucune variable `VITE_*`. L'application s'appuie désormais uniquement
sur son backend Express et ses variables au runtime listées ci-dessus.

## Étapes hPanel

1. **Sites web > votre site > Node.js** (ou "Créer une application Node.js").
2. **Version de Node.js** : 18 ou supérieure (`engines.node` dans `package.json`).
3. **Racine de l'application** : dossier où le contenu du dépôt a été transféré.
4. **Fichier de démarrage** : `dist/index.js`.
5. **Variables d'environnement** : saisir les 4 variables du tableau ci-dessus.
6. **Installer les dépendances / Exécuter le build** depuis hPanel, ou en SSH :
   ```bash
   npm install
   npm run build
   ```
7. **Redémarrer l'application** depuis hPanel après chaque changement de variable ou de code.
