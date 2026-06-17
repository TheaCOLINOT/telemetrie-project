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


Voici une version enrichie avec **travail effectué + commandes utiles + vérification**, adaptée à un README de projet :

---

## GlitchTip (Monitoring & télémétrie)

Dans le cadre de ce projet, une solution de monitoring a été mise en place avec **GlitchTip**, une plateforme open source compatible avec le SDK Sentry. Elle permet de centraliser les erreurs applicatives et de faciliter le suivi ainsi que le débogage en environnement de développement et de production.

---

## Mise en place de l’infrastructure

GlitchTip a été déployé via **Docker Compose** dans une architecture composée de plusieurs services :

* **GlitchTip** : application principale exposant l’interface de monitoring
* **PostgreSQL** : base de données dédiée au stockage des utilisateurs, projets et événements
* **Redis** : gestion des tâches asynchrones et du cache

Cette architecture permet un environnement isolé, reproductible et facilement déployable.

---

## Travail effectué

Les étapes suivantes ont été réalisées :

* Création des services Docker (GlitchTip, PostgreSQL, Redis)
* Configuration des variables d’environnement (DSN, SECRET_KEY, DATABASE_URL)
* Application des migrations de base de données
* Création d’un compte administrateur
* Création d’une organisation et d’un projet GlitchTip
* Récupération et configuration du DSN côté application React
* Intégration du SDK `@sentry/react` dans le frontend

---

## Intégration dans l’application React

Le SDK officiel Sentry (compatible GlitchTip) a été installé et configuré dans le point d’entrée de l’application (`main.jsx`).

Il permet de :

* capturer automatiquement les erreurs JavaScript
* remonter les exceptions non gérées
* envoyer des événements de test
* suivre certaines métriques de performance (optionnel)

---

## Commandes utiles

### Lancer l’environnement

```bash
docker compose up -d
```

### Appliquer les migrations GlitchTip

```bash
docker compose run --rm glitchtip python manage.py migrate
```

### Créer un administrateur

```bash
docker compose run --rm glitchtip python manage.py createsuperuser
```

### Voir les logs

```bash
docker compose logs -f glitchtip
```

### Vérifier les conteneurs actifs

```bash
docker compose ps
```

---

## Vérification du fonctionnement

Le bon fonctionnement de GlitchTip a été vérifié de plusieurs manières :

### 1. Accès à l’interface web

* GlitchTip : `http://localhost:8000`
* Vérification de la connexion et de l’organisation créée

---

### 2. Envoi d’un événement de test

```javascript
import * as Sentry from "@sentry/react";

Sentry.captureMessage("Test GlitchTip");
```

Si la configuration est correcte, l’événement apparaît dans l’interface GlitchTip.

---

### 3. Vérification réseau

Dans l’onglet réseau du navigateur, une requête de type :

```
/api/<project_id>/envelope/
```

avec un code **200 OK** confirme l’envoi des événements.

---

## Résultat obtenu

Grâce à cette mise en place, les erreurs de l’application React sont désormais centralisées dans GlitchTip. Cela permet :

* une meilleure visibilité des bugs
* un suivi en temps réel des erreurs
* une amélioration de la qualité applicative
* une aide au debugging en production

