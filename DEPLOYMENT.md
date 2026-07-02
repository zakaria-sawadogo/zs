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
5. Sauvegarde, puis relance le workflow dans l'onglet `Actions`.

Si le workflow échoue avec `Creating Pages deployment failed` puis `HttpError: Not Found`, cela veut dire que GitHub Pages n'est pas encore activé pour le dépôt ou que la source n'est pas réglée sur `GitHub Actions`.

Le workflow `.github/workflows/deploy.yml` construira automatiquement le site et publiera le dossier `out`.

Pendant le déploiement public, la route locale `/admin` est désactivée et retirée de l'artefact GitHub Pages. L'admin reste disponible uniquement en local avec :

```bash
NEXT_PUBLIC_ENABLE_ADMIN=true npm run dev
```

## 4. URL finale

Si le dépôt s'appelle `zakaria-sawadogo`, le site sera généralement disponible ici :

```text
https://TON-UTILISATEUR.github.io/zakaria-sawadogo/
```

Si le dépôt s'appelle `TON-UTILISATEUR.github.io`, le site sera disponible ici :

```text
https://TON-UTILISATEUR.github.io/
```
