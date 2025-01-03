const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Parser le corps des requêtes JSON

// Variables globales
let currentScreen = 'Screen1'; // Écran initial
let currentVideo = 0;
let curentStatus = "L"; // 'L' pour Lecture, 'P' pour Pause

// Liste des écrans valides
const validScreens = ['Screen1', 'Screen2', 'Screen3'];

// Route pour obtenir l'écran actuel
app.get('/current-screen', (req, res) => {
    res.json({ screen: currentScreen, video: currentVideo, status: curentStatus });
});

// Route pour changer l'écran
app.post('/change-screen', (req, res) => {
    const { screen, video, status } = req.body;

    // Validation de l'écran
    if (!validScreens.includes(screen)) {
        return res.status(400).json({ success: false, message: 'Écran invalide.' });
    }

    // Mise à jour des variables en fonction de l'écran
    currentScreen = screen;

    if (screen === 'Screen2') {
        currentVideo = video;
        curentStatus = status;
    }

    res.json({ success: true });
});

// Route pour mettre en pause ou reprendre la vidéo
app.post('/video-control', (req, res) => {
    const { action } = req.body; // 'play' ou 'pause'

    if (!['play', 'pause'].includes(action)) {
        return res.status(400).json({ success: false, message: "Action invalide. Utilisez 'play' ou 'pause'." });
    }

    curentStatus = action === 'play' ? 'L' : 'P';

    res.json({ success: true, status: curentStatus });
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});