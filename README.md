# ECO HARDWARE

Application e-commerce développée avec React, Vite et Tailwind CSS. Le projet inclut un système de tracking analytique via Umami et une gestion des erreurs avec GlitchTip, le tout orchestré avec Docker.

---

## Lancer toute la stack en une commande

C'est probablement la chose la plus importante du README donc on la met direct au début.

```bash
docker compose up -d
```

Cette commande démarre **tous** les services en arrière-plan :

| Service | Port | Rôle |
|---|---|---|
| `postgres` | – | Base de données PostgreSQL pour GlitchTip |
| `redis` | – | Cache Redis pour GlitchTip |
| `glitchtip` | 8000 | Dashboard de suivi des erreurs |
| `umami-db` | – | Base de données PostgreSQL dédiée à Umami |
| `umami` | 3001 | Dashboard analytique |

> **Note :** `umami-db` a un healthcheck, donc Umami attend que sa base soit vraiment prête avant de démarrer. Pas besoin de relancer quoi que ce soit manuellement.

### Accès aux services

- Umami → `http://localhost:3001` (login : `admin` / `umami`)
- GlitchTip → `http://localhost:8000`

### Première utilisation d'Umami

La première fois qu'on lance Umami il faut :
1. Se connecter sur `http://localhost:3001`
2. Aller dans Paramètres → Sites web → Ajouter un site
3. Copier le **Website ID** généré
4. Le coller dans le `.env` : `VITE_UMAMI_WEBSITE_ID=xxx`
5. Relancer `npm run dev`

### Arrêter les services

```bash
docker compose down
```

Pour tout supprimer y compris les volumes (attention ça efface les données) :
```bash
docker compose down -v
```

---

## Lancer l'appli React

```bash
npm install
npm run dev
```

L'appli tourne sur `http://localhost:3000`

---

## Fonctionnalités

- Catalogue produits avec filtrage par catégorie
- Gestion du panier (Context API)
- Pages panier et checkout
- Design responsive (Tailwind CSS)
- Tracking analytique complet (Umami)
- Tracking UTM source pour les réseaux sociaux
- Suivi des erreurs (GlitchTip)

---

## Variables d'environnement

Copier `.env.example` en `.env` et remplir les valeurs :

```bash
cp .env.example .env
```

```env
# GlitchTip
[...]

# Umami
[...]

```

---

## Tracking UTM source

Pour tracker d'où viennent les visiteurs (Instagram, TikTok, email...), on ajoute des paramètres UTM aux liens :

```
https://monsite.com?utm_source=instagram&utm_medium=social&utm_campaign=nom_campagne
https://monsite.com?utm_source=tiktok&utm_medium=social&utm_campaign=nom_campagne
https://monsite.com?utm_source=newsletter&utm_medium=email&utm_campaign=relance
```

Ces paramètres sont capturés automatiquement au chargement de la page, stockés en `sessionStorage`, et inclus dans tous les événements Umami de la session. Voir `src/lib/utm.js` pour les détails.

---

## Pages disponibles

- `/` — Accueil
- `/products` — Catalogue avec filtres
- `/products/:id` — Fiche produit
- `/cart` — Panier
- `/checkout` — Formulaire de commande

---

## Commandes utiles

```bash
npm run dev       # serveur de développement
npm run build     # build production
npm run preview   # prévisualiser le build
npm run lint      # linting
```

---

## Notes

- Les produits sont des données de démonstration
- Le panier est en mémoire (perdu au rechargement de page)
- La commande est simulée, pas de vrai paiement
- Pour plus de détails sur l'observabilité, voir /rapports
