<script setup>
import { ref, watch } from 'vue'

import AssistantAvatar from './AssistantAvatar.vue'
import AssistantSpeechBubble from './AssistantSpeechBubble.vue'

const props = defineProps({
  inputType: {
    type: String,
    default: 'initial',
  },
})

const speechMap = {
  initial: [
    'I vill be vatching closely how you interact vith ze interface! Go ahead, make your move, I am ready!',
  ],

  mouse: [
    'Ah, I can smell it in ze air, you’re playing with ze mouse again!',
    'Ze mouse, I feel it under your hand, moving so quickly!',
    'Mmm, I sense zat click, zat unmistakable sound of ze mouse!',
  ],

  keyboard: [
    'I hear ze little taps, each key, a tiny heartbeat of ze keyboard!',
    'Your fingers, zey dance on ze keyboard, I can feel every step!',
    'Ze sound of typing, it echoes in my ears you’re using ze keyboard!',
  ],

  touch: [
    'Your touch it’s like a whisper on ze screen, I can feel it!',
    'Ah, ze smooth glide of your fingers on ze screen I sense it all!',
    'Zat gentle tap-tap on ze screen, I know you’re there so close!',
  ],
}
const currentSpeech = ref(null)
const currentSpeechTimeout = ref(null)

watch(() => props.inputType, (value) => {
  getSpeechByInputType(value)
}, { immediate: true })

function getSpeechByInputType(inputType) {
  if (inputType === 'initial') {
    currentSpeech.value = _getRandomElementFromArray(speechMap[inputType])
    return
  }

  clearTimeout(currentSpeechTimeout.value)
  currentSpeech.value = _getRandomElementFromArray(speechMap[inputType])
}

function _getRandomElementFromArray(array) {
  return array[Math.floor(Math.random() * array.length)]
}
</script>

<template>
  <div class="assistant">
    <div class="assistant__avatar">
      <AssistantAvatar small class="assistant__avatar-inner" />
    </div>

    <AssistantSpeechBubble v-if="currentSpeech" class="assistant__speech-bubble" :text="currentSpeech" />
  </div>
</template>

<style scoped>
.assistant {
  display: flex;
  flex-direction: row;

  z-index: 100;
}

.assistant__avatar {
  flex-shrink: 0;
}

.assistant__avatar-inner {
  width: 100%;
}

.assistant__speech-bubble {
  flex-grow: 1;
}

@media screen and (max-width: 959px) {
  .assistant {
    background: var(--vp-c-bg);

    padding: 16px 8px;
    gap: 16px;

    position: sticky;
    top: 48px;

    width: 100%;
  }

  .assistant__avatar {
    width: 70px;
  }
}

@media screen and (min-width: 960px) {
  .assistant {
    align-items: flex-end;

    padding: 24px 24px;
    gap: 24px;

    position: fixed;
    bottom: 0;
    left: 0;
  }

  .assistant__avatar {
    width: 90px;
  }

  .assistant__speech-bubble {
    width: 400px;
  }
}
</style>
