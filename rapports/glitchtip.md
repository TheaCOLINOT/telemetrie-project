# GlitchTip - Suivi télémétrique ECO HARDWARE

## Contexte

GlitchTip est une plateforme open source de monitoring et de télémétrie compatible avec les SDK Sentry. Elle permet de :

* Centraliser les erreurs applicatives.
* Suivre les exceptions JavaScript et backend.
* Recevoir des alertes lors de dysfonctionnements.
* Analyser les performances de l'application.
* Disposer d'un historique des incidents.

Dans le cadre de ce projet, GlitchTip est utilisé pour collecter les erreurs générées par l'application React déployée sur Vercel.


# Architecture mise en place

L'architecture repose sur trois composants :

```text
React (Vercel)
      │
      ▼
  GlitchTip
      │
      ├── PostgreSQL
      └── Redis
```

## PostgreSQL

PostgreSQL est utilisé pour stocker :

* les organisations ;
* les utilisateurs ;
* les projets ;
* les erreurs collectées ;
* les traces ;
* les événements de télémétrie.

## Redis

Redis est utilisé comme système de cache et de gestion des tâches asynchrones.

Il permet notamment :

* d'améliorer les performances ;
* de gérer les files de traitement ;
* de traiter les événements entrants de manière efficace.

---

# Déploiement avec Docker Compose

Les services suivants ont été déployés :

| Service            | Description                      |
| ------------------ | -------------------------------- |
| glitchtip          | Application principale GlitchTip |
| glitchtip-postgres | Base de données PostgreSQL       |
| redis              | Cache et file de traitement      |


# Initialisation de la base de données

Après le démarrage des conteneurs, les migrations ont été appliquées :

```bash
docker compose run --rm glitchtip python manage.py migrate
```

Les migrations créent l'ensemble des tables nécessaires au fonctionnement de GlitchTip.

---

# Création du compte administrateur

Un compte administrateur a été créé afin d'accéder à l'interface d'administration :

```bash
docker compose run --rm glitchtip python manage.py createsuperuser
```

Cette commande demande :

* un nom d'utilisateur ;
* une adresse e-mail ;
* un mot de passe.

---

# Création d'un projet

Une fois connecté à GlitchTip :

1. Création d'une organisation.
2. Création d'un projet.
3. Récupération du DSN (Data Source Name).

Exemple :

```text
https://xxxxxxxxxxxxxxxx@app.glitchtip.com/24496
```

Le DSN permet à l'application React d'envoyer ses événements vers GlitchTip.

---

# Intégration dans l'application React

Le SDK officiel Sentry est utilisé car GlitchTip est compatible avec celui-ci.

Installation :

```bash
npm install @sentry/react
```

Configuration dans `main.jsx` :

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://xxxxxxxxxxxxxxxx@app.glitchtip.com/24496",
  tracesSampleRate: 0.01,
  autoSessionTracking: false,
});
```

### Paramètres utilisés

| Paramètre           | Description                              |
| ------------------- | ---------------------------------------- |
| dsn                 | Identifiant du projet GlitchTip          |
| tracesSampleRate    | Pourcentage de traces envoyées           |
| autoSessionTracking | Désactivé car non supporté par GlitchTip |

---

# Vérification du fonctionnement

Afin de vérifier la connexion entre React et GlitchTip, un message de test a été envoyé :

```javascript
Sentry.captureMessage("Test message GlitchTip");
```

La présence d'une requête HTTP de type :

```text
/api/{project_id}/envelope/
```

avec un code HTTP 200 confirme que l'événement est correctement transmis à GlitchTip.

---

# Résultats obtenus

La plateforme permet désormais :

* la remontée automatique des erreurs JavaScript ;
* le suivi des exceptions React ;
* la centralisation des événements ;
* l'analyse des incidents ;
* l'historisation des erreurs applicatives.

Les événements générés par l'application apparaissent directement dans l'interface GlitchTip et peuvent être analysés afin de faciliter le diagnostic et la maintenance de l'application.

---

# Sécurité

Plusieurs variables sensibles sont externalisées :

```yaml
SECRET_KEY
DATABASE_URL
POSTGRES_PASSWORD
```

La variable `SECRET_KEY` est utilisée par GlitchTip pour :

* signer les sessions ;
* protéger les cookies ;
* sécuriser certaines opérations internes.

Elle doit être longue, aléatoire et ne jamais être versionnée dans un dépôt Git public.

---

# Conclusion

L'intégration de GlitchTip permet de mettre en place une solution complète de télémétrie et de surveillance des erreurs pour l'application React. Grâce à l'utilisation conjointe de PostgreSQL et Redis, la plateforme est capable de collecter, stocker et analyser efficacement les événements générés par l'application en production.
