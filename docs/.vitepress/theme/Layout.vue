<script setup>
import DefaultTheme from 'vitepress/theme'
import AssistantAvatar from './components/AssistantAvatar.vue'

import NotFoundContent from './components/NotFoundContent.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #home-hero-image>
      <div class="image-src">
        <AssistantAvatar class="layout__hero-image" />
      </div>
    </template>

    <template #not-found>
      <NotFoundContent />
    </template>
  </Layout>
</template>

<style scoped>
.layout__hero-image {
  width: 240px;
}
</style>
