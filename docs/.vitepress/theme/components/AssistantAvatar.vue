<script setup>
const props = defineProps({
  small: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <img class="assistant-avatar" :src="props.small ? '/logo-small.png' : '/logo.png'" alt="">
</template>

<style scoped>
.assistant-avatar {
  image-rendering: pixelated;
  animation: skewAnimation 5s infinite;

  pointer-events: none;
  user-select: none;
}

@keyframes skewAnimation {
  0% {
    transform: skew(0deg, 0deg) rotate(0deg) scale(1);
  }
  25% {
    transform: skew(3deg, 1deg) rotate(5deg) scale(1.05);
  }
  50% {
    transform: skew(5deg, 2deg) rotate(0deg) scale(1.1);
  }
  75% {
    transform: skew(3deg, 1deg) rotate(-5deg) scale(1.05);
  }
  100% {
    transform: skew(0deg, 0deg) rotate(0deg) scale(1);
  }
}
</style>
