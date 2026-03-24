# 📚 Système de Gestion de Bibliothèque (BiblioTech)

Bienvenue dans le projet **BiblioTech**, une plateforme moderne de gestion de bibliothèque basée sur une architecture **microservices** et orchestrée avec **Kubernetes**.

---

## 🚀 Vue d'ensemble du Projet

Ce projet a été conçu pour démontrer des compétences avancées en **DevOps**, **Cloud-Native Architecture** et **Développement Fullstack**. Il permet de gérer un catalogue de livres tout en assurant une isolation complète des services et une haute disponibilité.

### 🛠 Technologies utilisées

-   **Frontend** : React, Vite, Tailwind CSS, Framer Motion (Animations).
-   **Backend** : Node.js, Express.
-   **Base de données** : PostgreSQL.
-   **Infrastructure** : Docker, Kubernetes (K8s), Ingress Nginx.
-   **Outils** : Minikube (déploiement local).

---

## 🏗 Architecture du Système

Le projet est divisé en trois composants principaux :

1.  **Frontend** : Interface utilisateur moderne et responsive.
2.  **User-Service** : Gère l'authentification (JWT), l'inscription et sert de passerelle vers les livres.
3.  **Book-Service** : Gère les opérations CRUD sur le catalogue de livres.
4.  **Base de Données** : Instance PostgreSQL partagée mais isolée au niveau réseau.

---

## 📦 Installation et Lancement

### 1. Prérequis
-   Docker Desktop installé.
-   Minikube installé et lancé (`minikube start`).
-   `kubectl` configuré.

### 2. Déploiement Kubernetes
Depuis la racine du projet, appliquez toutes les configurations :
```bash
kubectl apply -f K8s/
```

### 3. Accès aux Services (Tunnel Minikube)
Sous Windows/Mac avec le driver Docker, vous devez ouvrir des tunnels pour accéder aux services. Ouvrez un terminal pour chaque commande :
```bash
# Tunnel pour le service utilisateur
minikube service user-service --url

# Tunnel pour le service de livres
minikube service book-service --url
```
*Note : Relevez les URLs générées (ex: http://127.0.0.1:XXXXX) et mettez-les à jour dans le fichier `frontend/vite.config.js` si nécessaire.*

### 4. Lancement du Frontend (Développement)
```bash
cd frontend
npm install
npm run dev
```
Accédez à l'application sur : **http://localhost:3255**

---

## 🔐 Identifiants de Test

Pour faciliter la correction, un compte administrateur est automatiquement injecté au démarrage :
-   **Email** : `admin@bibliotheque.com`
-   **Mot de passe** : `admin123`

---

## ✨ Fonctionnalités Clés

### 🖥 Interface Utilisateur
-   **Authentification sécurisée** : Login/Register avec tokens JWT.
-   **Dashboard Dynamique** : Visualisation du catalogue en temps réel.
-   **Gestion CRUD** : Ajout de livres via modal et suppression avec confirmation.
-   **Recherche & Tri** : Filtrage instantané par titre ou auteur.
-   **Design Premium** : Thème sombre, Glassmorphism et animations fluides.

### ⚙️ DevOps & Backend
-   **Microservices** : Isolation totale des domaines métier.
-   **Orchestration K8s** : Gestion automatique des réplicas et du réseau.
-   **Sécurité** : Hachage des mots de passe avec BCrypt et sessions JWT.
-   **Ingress Routing** : Point d'entrée unique pour toutes les requêtes API.

---

## 👨‍💻 Auteurs
Projet réalisé dans le cadre du module DevOps / Microservices.
*(Ajoutez votre nom ici)*
