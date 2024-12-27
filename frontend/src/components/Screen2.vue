<template>
  <div ref="youtube" />
</template>

<script setup>
import { usePlayer } from '@vue-youtube/core';
import { ref, watch } from 'vue';

// Accéder aux propriétés
const props = defineProps({
  currentVideo: String, // Propriété transmise depuis le parent
});

// Fonction pour extraire l'ID de la vidéo
function extractVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

const videoId = ref(extractVideoId(props.currentVideo));
const youtube = ref();

const { onReady } = usePlayer(videoId, youtube, {
  cookie: false
});

onReady((event) => {
  event.target.playVideo();
  event.target.setSize(1525,925)
});

// Mettre à jour videoId lorsque currentVideo change
watch(() => props.currentVideo, (newVideo) => {
  videoId.value = extractVideoId(newVideo);
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