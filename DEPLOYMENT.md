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
npm run admin
```

## Modifier les données avec l'admin local

L'admin local affiche et modifie les données dans le navigateur. Pour publier automatiquement après enregistrement, utilise le mode admin :

1. Lance le site en local :

```bash
npm run admin
```

Cette commande démarre Next.js et un petit service local privé qui peut faire `git add`, `commit` et `push`.

2. Ouvre `/admin`.
3. Clique sur `Choisir le dossier`.
4. Sélectionne le dossier racine du projet, celui qui contient `data`.
5. Modifie une section.
6. Clique sur `Save local edits`.
7. Clique sur `Écrire ce fichier` ou `Écrire tout`.
8. Clique sur `Publier sur GitHub`, ou coche `Publier automatiquement après chaque écriture`.

Le bouton `Publier sur GitHub` exécute automatiquement :

```bash
git add data public/images
git commit -m "Update website content ..."
git push origin main
```

Si GitHub demande une authentification, configure d'abord ton accès GitHub dans le terminal.

Pour vérifier manuellement :

```bash
git status
```

Si ton navigateur ne permet pas `Choisir le dossier`, utilise `Export`, remplace manuellement le fichier correspondant dans `data/`, puis commit et push.

## 4. URL finale

Si le dépôt s'appelle `zakaria-sawadogo`, le site sera généralement disponible ici :

```text
https://TON-UTILISATEUR.github.io/zakaria-sawadogo/
```

Si le dépôt s'appelle `TON-UTILISATEUR.github.io`, le site sera disponible ici :

```text
https://TON-UTILISATEUR.github.io/
```
