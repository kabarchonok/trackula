<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})

const SPEECH_DURATION = 1000
const SPEECH_PAUSE = 700

const typedText = ref('')
const typedTextTimer = ref(null) // FIXME

function typeEffect() {
  let i = 0
  let speed = SPEECH_DURATION / props.text.length

  const typeWriter = () => {
    if (i < props.text.length) {
      if (props.text.substring(i, i - 3) === '...') {
        speed = SPEECH_PAUSE
      }
      else if (speed !== SPEECH_DURATION) {
        speed = SPEECH_DURATION / props.text.length
      }

      typedText.value += props.text.charAt(i)
      i++
      typedTextTimer.value = setTimeout(typeWriter, speed)
    }
  }

  typeWriter()
}

watch(() => props.text, () => {
  clearTimeout(typedTextTimer.value)
  typedText.value = ''
  typeEffect()
})

onMounted(typeEffect)
</script>

<template>
  <div class="speech-bubble">
    {{ typedText }}
  </div>
</template>

<style scoped>
:global(:root) {
  --speech-bubble-background: var(--vp-c-bg-alt);

  --speech-bubble-font-size: 14px;
  --speech-bubble-line-height: 21px;

  --speech-bubble-padding: 8px 16px;

  --speech-bubble-border-width: 3px;
  --speech-bubble-border-color: var(--vp-c-border);

  --speech-bubble-box-shadow:
      0 calc(var(--speech-bubble-border-width) * -1) var(--speech-bubble-background),
      0 calc(var(--speech-bubble-border-width) * -2) var(--speech-bubble-border-color),
      0 calc(var(--speech-bubble-border-width) * 1) var(--speech-bubble-background),
      0 calc(var(--speech-bubble-border-width) * 2) var(--speech-bubble-border-color),

      calc(var(--speech-bubble-border-width) * -1) 0  var(--speech-bubble-background),
      calc(var(--speech-bubble-border-width) * -2) 0  var(--speech-bubble-border-color),
      calc(var(--speech-bubble-border-width) * 1)  0 var(--speech-bubble-background),
      calc(var(--speech-bubble-border-width) * 2)  0 var(--speech-bubble-border-color),

      0 0 0 calc(var(--speech-bubble-border-width) * 1) var(--speech-bubble-border-color);
}

.speech-bubble {
  display: block;
  user-select: none;

  font-family: "Press Start 2P", system-ui;
  font-variant-ligatures: none;
  font-weight: 400;
  font-style: normal;
  font-size: var(--speech-bubble-font-size);

  color: var(--vp-c-text-1);
  background: var(--speech-bubble-background);

  margin: calc(var(--speech-bubble-border-width) * 2);
  padding: var(--speech-bubble-padding);
  line-height: var(--speech-bubble-line-height);
  box-sizing: border-box;
  box-shadow: var(--speech-bubble-box-shadow);
}

@media screen and (max-width: 639px) {
  :global(:root) {
    --speech-bubble-font-size: 8px;
    --speech-bubble-line-height: 12px;

    --speech-bubble-padding: 8px 16px;

    --speech-bubble-border-width: 3px;
  }
}
</style>
