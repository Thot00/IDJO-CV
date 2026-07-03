# Installation rapide - IDJÔ CV

## Démarrage en 5 minutes

### 1. Cloner et installer
```bash
git clone https://github.com/Thot00/IDJO-CV.git
cd IDJO-CV

# Backend
cd backend
npm install
cp .env.example .env
npm run migrate
npm run dev

# Frontend (dans un autre terminal)
cd frontend
npm install
npm run dev
```

### 2. Ouvrir dans le navigateur
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### 3. Créer un compte et commencer
- S'inscrire ou se connecter
- Créer un nouveau CV
- Remplir les informations
- Télécharger en PDF

## Commandes utiles

### Backend
```bash
npm run dev              # Mode développement
npm run build            # Compilation
npm run migrate          # Créer la base de données
npm run lint             # Vérifier le code
```

### Frontend
```bash
npm run dev              # Mode développement
npm run build            # Build de production
npm run preview          # Prévisualiser
npm run lint             # Vérifier le code
```
