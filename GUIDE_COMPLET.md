# IDJÔ CV - Documentation Complète

## Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Fonctionnalités](#fonctionnalités)
3. [Architecture](#architecture)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [Utilisation](#utilisation)
7. [API Documentation](#api-documentation)
8. [Déploiement](#déploiement)
9. [Troubleshooting](#troubleshooting)

## Vue d'ensemble

IDJÔ CV est une plateforme web moderne permettant de créer des CV professionnels.

### Fonctionnalités principales
- 200+ modèles de CV
- Éditeur en ligne avec aperçu en temps réel
- Export PDF
- Authentification JWT
- Horloge mondiale
- Générateur de blagues

## Installation

### Prérequis
- Node.js >= 18.x
- PostgreSQL >= 14
- npm >= 9.x

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Le frontend démarrera sur http://localhost:5173
Le backend sur http://localhost:5000
