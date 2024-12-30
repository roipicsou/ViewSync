<template>
  <div ref="youtube" class="youtube-container" />
</template>

<script setup>
import { usePlayer } from '@vue-youtube/core';
import { ref, watch, onMounted, onUnmounted } from 'vue';

// Fonction pour extraire l'ID de la vidéo
function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const videoId = ref(null);
const youtube = ref();
const playerStatus = ref('');

const { onReady } = usePlayer(videoId, youtube, {
  cookie: false,
});

let playerInstance;
let statusCheckInterval;

onReady((event) => {
  playerInstance = event.target;
  playerInstance.setSize(1525, 925);
});

async function fetchStatus() {
  try {
    const response = await fetch('http://localhost:3000/current-screen');
    const data = await response.json();

    // Met à jour l'ID de la vidéo si nécessaire
    const newVideoId = extractVideoId(data.video);
    if (newVideoId && newVideoId !== videoId.value) {
      videoId.value = newVideoId;
      playerInstance.loadVideoById(videoId.value);
    }

    // Met à jour le statut (Lecture/Pause)
    if (data.status !== playerStatus.value) {
      playerStatus.value = data.status;
      if (playerStatus.value === 'P') {
        playerInstance.pauseVideo();
      } else if (playerStatus.value === 'L') {
        playerInstance.playVideo();
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'état:', error);
  }
}

// Rafraîchir l'état de la vidéo toutes les 500 ms
onMounted(() => {
  statusCheckInterval = setInterval(fetchStatus, 500);
});

onUnmounted(() => {
  clearInterval(statusCheckInterval);
});
</script>

<style scoped>
.youtube-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>