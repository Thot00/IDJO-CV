# Guide d'installation complet - IDJO CV

## Etapes d'installation

### 1. Prerequisites
- Node.js 18+ (https://nodejs.org/)
- PostgreSQL 14+ (https://www.postgresql.org/)
- Git (https://git-scm.com/)

### 2. Cloner le repository
```bash
git clone https://github.com/Thot00/IDJO-CV.git
cd IDJO-CV
```

### 3. Configuration Backend

#### 3.1 Installer les dependances
```bash
cd backend
npm install
```

#### 3.2 Configurer les variables d'environnement
```bash
cp .env.example .env
```

Editer le fichier `.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/idjo_cv_db"
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

#### 3.3 Creer la base de donnees
```bash
# S'assurer que PostgreSQL est lance
# Puis creer la base de donnees
npm run migrate
```

#### 3.4 Demarrer le backend
```bash
npm run dev
```

Le backend demarrera sur `http://localhost:5000`

### 4. Configuration Frontend

#### 4.1 Installer les dependances
```bash
cd ../frontend
npm install
```

#### 4.2 Configurer les variables d'environnement
```bash
cp .env.example .env
```

Contenu du fichier `.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=IDJO CV
```

#### 4.3 Demarrer le frontend
```bash
npm run dev
```

Le frontend demarrera sur `http://localhost:5173`

## Verification de l'installation

### Verifier que tout fonctionne

1. **Backend Health Check**
```bash
curl http://localhost:5000/api/health
```
Reponse attendue:
```json
{"status":"OK","timestamp":"2024-01-15T10:30:00.000Z"}
```

2. **Frontend**
Ouvrez http://localhost:5173 dans votre navigateur

3. **Creer un compte**
- Cliquez sur "S'inscrire"
- Remplissez le formulaire
- Confirmez l'inscription

4. **Creer un CV**
- Allez au Dashboard
- Cliquez sur "Nouveau CV"
- Remplissez les informations
- Telechargez en PDF

## Commandes utiles

### Backend
```bash
npm run dev              # Demarrage en mode developpement
npm run build            # Compilation TypeScript
npm run start            # Demarrage en production
npm run migrate          # Creer/mettre a jour la base
npm run migrate:prod     # Migration en production
npm run lint             # Verifier le code
npm run type-check       # Verifier les types
```

### Frontend
```bash
npm run dev              # Mode developpement
npm run build            # Build de production
npm run preview          # Previsualiser le build
npm run lint             # Verifier le code
npm run type-check       # Verifier les types
```

## Structure des dossiers

```
IDJO-CV/
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── cv.ts
│   │   │   ├── template.ts
│   │   │   └── joke.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── ProtectedRoute.tsx
│   │   │   ├── DigitalClock.tsx
│   │   │   ├── JokeGenerator.tsx
│   │   │   └── CVPreview.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CVEditor.tsx
│   │   │   ├── Clock.tsx
│   │   │   └── Jokes.tsx
│   │   ├── stores/
│   │   │   ├── authStore.ts
│   │   │   └── cvStore.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Troubleshooting

### Le backend ne se connecte pas a PostgreSQL
**Solution:** Verifiez que:
1. PostgreSQL est lance
2. DATABASE_URL est correct dans .env
3. La base de donnees existe

### Le frontend ne peut pas se connecter au backend
**Solution:** Verifiez que:
1. Le backend est en cours d'execution
2. VITE_API_URL est correct dans .env
3. Les CORS sont configures dans le backend

### Erreur lors du telechargement PDF
**Solution:**
1. Verifiez la console du navigateur pour les erreurs
2. Verifiez que html2canvas et jsPDF sont installes
3. Essayez de recharger la page

## Support

Pour plus d'aide:
- Consultez GUIDE_COMPLET.md
- Consultez QUICK_START.md
- Creez une issue sur GitHub: https://github.com/Thot00/IDJO-CV/issues
