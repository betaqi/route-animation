<script setup>
const a = $ref(false)
</script>

<template>
  <div overflow-hidden transition-all @click="a = !a">
    <img v-if="a" wfull hfull src="https://images.unsplash.com/photo-1676971024972-c1e0807eec15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzNnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60">
    <img v-else wfull hfull src="https://images.unsplash.com/photo-1676971024951-b2bb6289fa6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60">
  </div>
</template>
