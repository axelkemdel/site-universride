# Guide de Déploiement Gratuit et de Référencement Google — Univers Ride

Ce guide présente la procédure complète pour publier gratuitement la landing page **Univers Ride** sur un hébergeur cloud haute performance, configurer votre nom de domaine personnalisé avec HTTPS, et soumettre le site à Google pour assurer son indexation rapide.

---

## 1. Choix de l'hébergement gratuit recommandé

Pour une application React / Vite moderne comme Univers Ride, les trois meilleures plateformes gratuites du marché offrent un hébergement statique ultra-rapide, un certificat SSL (HTTPS) automatique et un support natif du routage single-page :

| Hébergeur | Avantages pour Univers Ride | Formule gratuite |
|---|---|---|
| **Vercel** | Déploiement instantané via GitHub, gestion parfaite de Vite/React, CDN mondial, HTTPS automatique | Gratuit (Hobby) |
| **Netlify** | Très simple d'utilisation par glisser-déposer (`drag & drop`) du dossier `dist`, formulaires intégrables, HTTPS inclus | Gratuit (Starter) |
| **GitHub Pages** | Gratuit à vie, hébergé directement sur vos dépôts GitHub | Gratuit |

*Recommandation :* **Vercel** ou **Netlify** sont les plus adaptés et s'installent en moins de 3 minutes.

---

## 2. Étape par étape : Publication sur Netlify ou Vercel

### Option A : Déploiement instantané par glisser-déposer sur Netlify (Sans ligne de commande)
1. Ouvrez votre terminal dans le projet et lancez le build de production :
   ```bash
   pnpm run build
   ```
   Cela génère un dossier prêt à l'emploi nommé `dist` (ou le dossier de sortie de votre build).
2. Rendez-vous sur [Netlify](https://www.netlify.com/) et créez un compte gratuit (ou connectez-vous).
3. Dans votre tableau de bord, allez dans l'onglet **Sites**.
4. Glissez-déposez directement le dossier contenant vos fichiers de build (ou le dossier `dist`) dans la zone de dépôt Netlify.
5. Votre site est immédiatement mis en ligne avec une URL temporaire sécurisée en `*.netlify.app`.

### Option B : Déploiement automatisé via GitHub (Recommandé pour les mises à jour)
1. Créez un dépôt gratuit sur [GitHub](https://github.com/) et poussez-y votre code source (provenant de l'archive autonome).
2. Connectez-vous à **Vercel** ou **Netlify** avec votre compte GitHub.
3. Cliquez sur **New Project** / **Add new site** et sélectionnez votre dépôt GitHub `univers-ride`.
4. Laissez les paramètres de build par défaut :
   - **Build Command** : `pnpm run build` (ou `npm run build`)
   - **Output Directory** : `dist`
5. Cliquez sur **Deploy**. Chaque modification poussée sur GitHub mettra désormais le site à jour automatiquement.

---

## 3. Connexion de votre nom de domaine personnalisé

Pour lier votre nom de domaine (par exemple `universride.net`) :
1. Dans les paramètres de votre projet sur Vercel ou Netlify, allez dans la section **Domain Management** / **Custom Domains**.
2. Entrez votre nom de domaine.
3. Chez votre registrar (votre hébergeur de nom de domaine), ajoutez les enregistrements DNS fournis par la plateforme (généralement un enregistrement **A** pointant vers l'IP du serveur ou un enregistrement **CNAME**).
4. Le certificat **SSL/TLS (HTTPS)** sera généré automatiquement et gratuitement par la plateforme en quelques minutes.

---

## 4. Référencement Google et indexation (Google Search Console)

Pour que votre site apparaisse sur Google lorsque les utilisateurs recherchent des services de mobilité ou de livraison à Bangui :

### Étape 4.1 : Création et vérification de la propriété
1. Rendez-vous sur [Google Search Console](https://search.google.com/search-console).
2. Connectez-vous avec votre compte Google professionnel.
3. Ajoutez votre propriété en entrant l'URL exacte de votre site (ex: `https://universride.net`).
4. Choisissez la méthode de vérification par **Enregistrement DNS (TXT)** : Google vous donnera un code à ajouter dans la zone DNS de votre nom de domaine.

### Étape 4.2 : Soumission du plan du site (`sitemap.xml`)
Votre archive intègre déjà les fichiers de configuration SEO indispensables :
- `/robots.txt` : indique aux robots d'indexation les zones explorables.
- `/sitemap.xml` : liste l'ensemble des pages officielles du site (Accueil, Politique de confidentialité, Suppression de compte, Conditions d'utilisation).

1. Dans le menu de gauche de Google Search Console, cliquez sur **Sitemaps**.
2. Entrez l'URL de votre sitemap :
   ```text
   https://universride.net/sitemap.xml
   ```
3. Cliquez sur **Envoyer**. Google commencera l'exploration de vos pages dans les heures qui suivent.

### Étape 4.3 : Demande d'indexation prioritaire de la page d'accueil
1. En haut de la barre de recherche Google Search Console, entrez l'URL principale de votre site : `https://universride.net`.
2. Appuyez sur Entrée, puis cliquez sur **Demander une indexation**. Google placera votre page en priorité de crawl.

---

## 5. Bonnes pratiques SEO spécifiques à Univers Ride
- **Mots-clés cibles** : Veillez à ce que vos balises et textes intègrent des expressions locales recherchées (ex: *transport Bangui, livraison colis Centrafrique, VTC Bangui, application de mobilité RCA*).
- **Vitesse de chargement** : Les images compressées et le format statique garantissent un score Lighthouse optimal, critère majeur pour le classement de Google.
- **Sécurité et conformité** : La présence des pages légales (Politique de confidentialité, Suppression de compte) et du protocole HTTPS renforce la confiance des robots de recherche et des utilisateurs.
