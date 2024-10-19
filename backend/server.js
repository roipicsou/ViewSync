const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Autoriser les requêtes cross-origin
app.use(express.json()); // Pour parser le corps des requêtes JSON

let currentScreen = 'Screen1'; // Écran initial

// Route pour obtenir l'écran actuel
app.get('/current-screen', (req, res) => {
    res.json({ screen: currentScreen });
});

// Route pour changer l'écran
app.post('/change-screen', (req, res) => {
    const { screen } = req.body;
    if (['Screen1', 'Screen2', 'Screen3'].includes(screen)) {
        currentScreen = screen; // Met à jour l'écran actuel
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Écran invalide' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});