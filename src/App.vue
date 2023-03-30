<script setup>
import { Carrier } from '~/composables/image'
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-200">
    <TheNav />
    <RouterView />
    <Carrier />
  </main>
</template>
