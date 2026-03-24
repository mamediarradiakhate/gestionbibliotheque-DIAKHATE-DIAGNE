# Système de Gestion de Bibliothèque (BiblioTech)

Projet réalisé en binôme par :
- **DIAKHATE Mame Diarra Bousso**
- **DIAGNE Maguette Madiodio**

Bienvenue dans le projet **BiblioTech**, une plateforme moderne de gestion de bibliothèque basée sur une architecture **microservices** et orchestrée avec **Kubernetes**.

---

## Vue d'ensemble du Projet

Ce projet a été conçu pour démontrer des compétences avancées en **DevOps**, **Cloud-Native Architecture** et **Développement Fullstack**. Il permet de gérer un catalogue de livres tout en assurant une isolation complète des services, une sécurité renforcée et une haute disponibilité.

### Stack Technique

| Domaine | Technologie |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express |
| **Base de données** | PostgreSQL |
| **Conteneurisation** | Docker |
| **Orchestration** | Kubernetes (K8s) |
| **Routage** | Nginx Ingress Controller |
| **Environnement** | Minikube |

---

## Architecture du Système

L'application suit une architecture découplée :

1.  **Frontend** : Application Single Page (SPA) moderne avec design "Glassmorphism".
2.  **User-Service** : Microservice gérant l'authentification (JWT), le hachage des mots de passe (BCrypt) et servant de passerelle sécurisée.
3.  **Book-Service** : Microservice gérant le cycle de vie des ouvrages (CRUD).
4.  **PostgreSQL** : Système de gestion de base de données relationnelle, déployé de manière isolée au sein du cluster.

---

## Installation et Lancement

### 1. Prérequis
-   **Docker Desktop** (avec le moteur de conteneurs actif).
-   **Minikube** installé.
-   **kubectl** installé et configuré.

### 2. Déploiement du Cluster Kubernetes
Depuis la racine du projet, exécutez la commande suivante pour déployer tous les composants (Deployments, Services, Ingress, Jobs) :
```bash
kubectl apply -f K8s/
```

### 3. Configuration du Réseau (Tunnel Minikube)
Sous Windows avec le driver Docker, le réseau Kubernetes est isolé. Vous devez impérativement ouvrir des tunnels dans des terminaux séparés pour rendre les services accessibles :
```bash
minikube service user-service --url

minikube service book-service --url
```
*Important : Si les ports générés (ex: 127.0.0.1:XXXXX) diffèrent de ceux configurés, veuillez mettre à jour le fichier `frontend/vite.config.js`.*

### 4. Lancement de l'Interface Utilisateur
```bash
cd frontend
npm install
npm run dev
```
L'application sera accessible sur : **http://localhost:3255**

---

## Identifiants de Test (Démonstration)

Un compte administrateur est automatiquement injecté dans la base de données via un **Kubernetes Job** au démarrage :
-   **Email** : `admin@bibliotheque.com`
-   **Mot de passe** : `admin123`

---

## Fonctionnalités Implémentées

### Interface Utilisateur (Bonus)
-   **Authentification complète** : Flux de connexion/inscription sécurisé.
-   **Gestion du Catalogue** : Visualisation, ajout via modal dynamique et suppression avec confirmation.
-   **Expérience Premium** : Animations fluides, thème sombre et interface responsive.
-   **Filtrage en temps réel** : Recherche instantanée par titre ou auteur.

### Excellence DevOps
-   **Microservices** : Séparation stricte des domaines métier.
-   **Infrastructure as Code** : Configuration complète via manifestes YAML.
-   **Automatisation** : Initialisation automatique de la DB (Schemas + Seed Data).
-   **Routage Centralisé** : Ingress Controller pour une gestion propre des points d'entrée API.

---

## Réalisation
Projet réalisé avec succès dans le cadre du module **DevOps & Microservices**.
