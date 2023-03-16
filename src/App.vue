<script setup>
import { Container } from '~/composables/image'
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-200">
    <TheNav />
    <RouterView />
    <Container />
  </main>
</template>
