<template>
  <div>
    <h2>Screen 2</h2>
    <p>Vidéo en cours : {{ currentVideo }}</p>
  </div>
</template>

<script>
export default {
  props: {
    currentVideo: Number, // Propriété transmise depuis le parent
  },
};
</script>