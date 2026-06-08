# Application E-Commerce React

application e-commerce moderne développée avec React, Vite, et Tailwind CSS

## Fonctionnalités

- Affichage de produits avec filtrage par catégorie
- Gestion du panier avec Context API
- Pages de panier et de checkout
- Design responsive avec Tailwind CSS
- Routing avec React Router
- Interface utilisateur moderne et intuitive

## Structure du projet

```
src/
├── components/          # Composants réutilisables (Header, Footer, ProductCard)
├── pages/              # Pages principales (Home, Products, Cart, Checkout)
├── contexts/           # Gestion d'état (CartContext)
├── data/               # Données statiques (produits, catégories)
├── App.jsx             # Composant principal
├── main.jsx            # Point d'entrée
└── index.css           # Styles globaux

public/                # Fichiers statiques
```

## 🛠️ Installation

1. **Cloner ou initialiser le projet**
```bash
https://github.com/TheaCOLINOT/telemetrie-project.git
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

L'application s'ouvrira automatiquement à `http://localhost:3000`

## Dépendances principales

- **React** - Bibliothèque UI
- **React Router** - Routage entre pages
- **Tailwind CSS** - Framework CSS utilitaire
- **Vite** - Bundler et serveur de développement

## Pages disponibles

- **/** - Accueil avec présentation
- **/products** - Catalogue de produits avec filtres
- **/cart** - Panier d'achat
- **/checkout** - Formulaire de commande

## Commandes disponibles

```bash
# Développement
npm run dev

# Build pour production
npm run build

# Aperçu de la build
npm run preview

# Linting
npm run lint
```

## Reste à faire :

- Glitchtip
- 1 base de données PostgreSQL
- 1 base de données Redis
- 1 service Glitchtip
- Analytique
- 1 base de données PostgreSQL
- 1 service Umami
- Implémenter l'authentification utilisateur (jsp si c'est vrm nécessaire en vrai)
- Créer une page de détails produit
- Créer une page panier
- Créer une page paiement
- Créer une page listes produits
- Créer une page accueil

## Notes de développement

- Les produits affichés sont des données de démonstration
- Le panier est stocké en mémoire (sera perdu au rechargement)
- La commande est simulée sans paiement réel
- Utilisez `localStorage` pour persister le panier entre sessions

## Prochaines étapes

1. Ajouter `localStorage` pour persister le panier (en vrai mitigée)
2. Créer les pages manquantes
3. Ajouter Glitchip
4. Mettre en place Umami
5. Faire les BDD

