<template>
  <div>
    <component :is="currentScreenComponent" :currentVideo="currentVideo" />
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
      currentVideo: 0, // Vidéo en cours (par défaut 0)
      screenContents: {
        Screen1,
        Screen2,
        Screen3,
      },
      autoRefreshInterval: null, // Intervalle pour le rafraîchissement
    };
  },
  computed: {
    currentScreenComponent() {
      return this.screenContents[this.currentScreen] || null; // Composant par défaut si l'écran n'existe pas
    },
  },
  methods: {
    async fetchCurrentScreen() {
      try {
        const response = await fetch('http://localhost:3000/current-screen');
        const data = await response.json();
        console.log('Données reçues :', data); // Debug
        this.currentScreen = data.screen;
        this.currentVideo = data.video;
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'écran actuel:', error);
      }
    },
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
          this.fetchCurrentScreen();
        } else {
          alert(data.message || 'Échec du changement d\'écran');
        }
      } catch (error) {
        console.error('Erreur lors du changement d\'écran:', error);
      }
    },
    startAutoRefresh() {
      this.fetchCurrentScreen(); // Appel initial
      this.autoRefreshInterval = setInterval(() => {
        this.fetchCurrentScreen();
      }, 500); // Rafraîchissement toutes les 500 ms
    },
  },
  created() {
    this.startAutoRefresh(); // Démarre le rafraîchissement automatique au chargement
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Nettoie l'intervalle pour éviter les fuites de mémoire
  },
};
</script>

<style scoped>
/* Ajoutez vos styles spécifiques ici */
</style>