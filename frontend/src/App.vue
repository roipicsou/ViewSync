<template>
  <div>
    <!-- Affiche dynamiquement le composant de l'écran actuel -->
    <component 
      :is="currentScreenComponent" 
      :currentVideo="currentVideo" 
    />
  </div>
</template>

<script>
import Screen1 from './components/Screen1.vue';
import Screen2 from './components/Screen2.vue';
import Screen3 from './components/Screen3.vue';

export default {
  data() {
    return {
      currentScreen: null, // Écran en cours
      currentVideo: null, // Vidéo en cours (uniquement pour Screen2)
      screenContents: {
        Screen1,
        Screen2,
        Screen3,
      },
      autoRefreshInterval: null,
    };
  },
  computed: {
    currentScreenComponent() {
      // Renvoie le composant de l'écran actuel ou null si non défini
      return this.screenContents[this.currentScreen] || null;
    },
  },
  methods: {
    // Récupère l'écran et la vidéo en cours depuis le backend
    async fetchCurrentScreen() {
      try {
        const response = await fetch('http://localhost:3000/current-screen');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.currentScreen = data.screen;
        this.currentVideo = data.video; // Met à jour la vidéo (si applicable)
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'écran actuel:', error);
        alert('Impossible de récupérer les informations de l\'écran.');
      }
    },
    // Change l'écran (et la vidéo pour Screen2) en envoyant une requête au backend
    async changeScreen(newScreen, video = null) {
      try {
        const body = video !== null ? { screen: newScreen, video } : { screen: newScreen };
        const response = await fetch('http://localhost:3000/change-screen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        if (data.success) {
          this.fetchCurrentScreen(); // Rafraîchit l'état après le changement
        } else {
          alert(data.message || 'Échec du changement d\'écran');
        }
      } catch (error) {
        console.error('Erreur lors du changement d\'écran:', error);
        alert('Impossible de changer l\'écran.');
      }
    },
    // Démarre la mise à jour automatique de l'écran
    startAutoRefresh() {
      this.fetchCurrentScreen(); // Appel initial
      this.autoRefreshInterval = setInterval(() => {
        this.fetchCurrentScreen();
      }, 1000); // Rafraîchissement toutes les 1000 ms
    },
  },
  created() {
    this.startAutoRefresh(); // Démarre le rafraîchissement automatique au chargement du composant
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Nettoie l'intervalle pour éviter les fuites de mémoire
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>