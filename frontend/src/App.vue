<template>
  <div>
    <component :is="currentScreenComponent" /> <!-- Affiche le composant de l'écran actuel -->
  </div>
</template>

<script>
import Screen1 from './components/Screen1.vue';
import Screen2 from './components/Screen2.vue';
import Screen3 from './components/Screen3.vue';

export default {
  data() {
    return {
      currentScreen: null,
      screenContents: {
        Screen1,
        Screen2,
        Screen3,
      },
    };
  },
  computed: {
    currentScreenComponent() {
      return this.screenContents[this.currentScreen] || null; // Composant par défaut
    },
  },
  methods: {
    fetchCurrentScreen() {
      fetch('http://localhost:3000/current-screen')
        .then(response => response.json())
        .then(data => {
          this.currentScreen = data.screen; // Met à jour l'écran actuel
        })
        .catch(error => console.error('Erreur:', error));
    },
    changeScreen(newScreen) {
      fetch('http://localhost:3000/change-screen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ screen: newScreen }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.fetchCurrentScreen(); // Rafraîchit l'écran après le changement
          } else {
            alert(data.message || 'Échec du changement d\'écran');
          }
        })
        .catch(error => console.error('Erreur:', error));
    },
    startAutoRefresh() {
      this.fetchCurrentScreen(); // Appel initial
      this.autoRefreshInterval = setInterval(() => {
        this.fetchCurrentScreen(); // Appel régulier sans eval
      }, 500);
    }
  },
  created() {
    this.startAutoRefresh(); // Démarre le rafraîchissement automatique
  },
  beforeDestroy() {
    clearInterval(this.autoRefreshInterval); // Nettoie l'intervalle pour éviter les fuites de mémoire
  }
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>