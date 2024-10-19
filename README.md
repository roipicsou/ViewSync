
# Projet Écran Dynamique

Ce projet consiste en une application web développée avec Vue.js qui permet d'afficher différents contenus sur un écran en fonction des interactions de l'utilisateur. L'application peut être contrôlée à l'aide d'une API pour changer le contenu affiché.

## Fonctionnalités

- Affichage dynamique de différents écrans (Screen1, Screen2, Screen3, ......).
- Rafraîchissement automatique du contenu affiché.
- Intégration facile avec un Stream Deck via une API.
- Utilisation de composants Vue.js pour une architecture modulaire.

## Technologies Utilisées

- [Vue.js](https://vuejs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/) (pour le backend)

## Prérequis

- Node.js et npm installés sur votre machine.
- Accès à un terminal de commande.

## Installation

1. **Clonez le dépôt** :

```bash
git clone https://github.com/votre_nom_utilisateur/votre_repertoire.git
cd votre_repertoire
```

2. **Installez les dépendances pour le frontend** :

```bash
cd frontend
npm install
```

3. **Installez les dépendances pour le backend** :

```bash
cd backend
npm install
```

## Configuration

Assurez-vous que votre backend est configuré pour écouter sur le port approprié (par défaut 3000) et que les routes API sont définies comme suit :

- **GET /current-screen** : retourne l'écran actuel.
- **POST /change-screen** : change l'écran affiché.

## Utilisation

1. **Démarrez le serveur backend** :

```bash
cd backend
node server.js
```

2. **Démarrez le serveur frontend** :

```bash
cd frontend
npm run serve
```

3. **Ouvrez votre navigateur et accédez à** `http://localhost:8080` **pour voir l'application en action**.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre ces étapes :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Faites vos modifications et ajoutez-les (`git commit -m 'Ajoute ma fonctionnalité'`).
4. Poussez la branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

## Auteurs

    roipicsou88

## License

Ce projet est sous licence MIT.