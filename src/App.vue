<script setup>
import { Container } from '~/composables/image'
</script>

<template>
  <main font-sans text="center gray-700 dark:gray-200">
    <TheNav />
    <RouterView />
    <Container port="0"/>
    <Container port="1"/>
    <Container port="2"/>
    <Container port="3"/>
  </main>
</template>
