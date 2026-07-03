# Contributing - IDJÔ CV

## Comment contribuer

### 1. Fork et Clone
```bash
git clone https://github.com/YOUR_USERNAME/IDJO-CV.git
cd IDJO-CV
```

### 2. Créer une branche
```bash
git checkout -b feature/ma-nouvelle-fonctionnalite
```

### 3. Faire vos modifications
- Suivez le style de code existant
- Utilisez TypeScript
- Testez vos modifications

### 4. Commit et Push
```bash
git commit -m "feat: Add new feature"
git push origin feature/ma-nouvelle-fonctionnalite
```

### 5. Créer une Pull Request

## Format des commits

Utilisez le Conventional Commits:
- `feat:` pour une nouvelle fonctionnalité
- `fix:` pour un bug
- `docs:` pour la documentation
- `style:` pour le formatage
- `refactor:` pour du refactoring

## Standards de code

### TypeScript
- Utilisez des types stricts
- Pas de `any` quand possible

### React
- Composants fonctionnels avec hooks
- PascalCase pour les composants

### Styling
- Utilisez Tailwind CSS
- Pas de CSS inline
