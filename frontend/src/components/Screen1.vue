<template>
  <div class="screen-container">
    <p>Date : {{ currentDate }}</p>
    <p>Heure : {{ currentTime }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: '',
      currentTime: '',
      timer: null,
    };
  },
  methods: {
    updateDateTime() {
      const now = new Date();
      this.currentDate = now.toLocaleDateString();
      this.currentTime = now.toLocaleTimeString();
    },
  },
  created() {
    this.updateDateTime();
    this.timer = setInterval(this.updateDateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.screen-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* S'assure que le conteneur prend toute la hauteur de l'écran */
  text-align: center; /* Centre le texte */
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 18px;
}
</style>