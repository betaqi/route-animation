<script setup>
import { TheImageCarrier } from '~/composables/image'
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-200">
    <TheNav />
    <RouterView />
    <TheImageCarrier />
  </main>
</template>
