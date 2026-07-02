# Déploiement GitHub Pages

## 1. Créer le dépôt GitHub

Crée un nouveau dépôt sur GitHub, par exemple `zakaria-sawadogo`.

## 2. Envoyer le projet

Depuis ce dossier :

```bash
git init
git add .
git commit -m "Initial academic website"
git branch -M main
git remote add origin https://github.com/TON-UTILISATEUR/zakaria-sawadogo.git
git push -u origin main
```

Remplace `TON-UTILISATEUR` par ton nom d'utilisateur GitHub.

## 3. Activer GitHub Pages

Dans GitHub :

1. Ouvre le dépôt.
2. Va dans `Settings`.
3. Va dans `Pages`.
4. Dans `Build and deployment`, choisis `GitHub Actions`.

Le workflow `.github/workflows/deploy.yml` construira automatiquement le site et publiera le dossier `out`.

## 4. URL finale

Si le dépôt s'appelle `zakaria-sawadogo`, le site sera généralement disponible ici :

```text
https://TON-UTILISATEUR.github.io/zakaria-sawadogo/
```

Si le dépôt s'appelle `TON-UTILISATEUR.github.io`, le site sera disponible ici :

```text
https://TON-UTILISATEUR.github.io/
```
