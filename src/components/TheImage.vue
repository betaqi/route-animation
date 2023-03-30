<script lang="ts" setup>
defineProps<{
  src: string
}>()
</script>

<template>
  <div overflow-hidden transition-all duration-900 wfull hfull>
    <img wfull object-cover block hfull :src="src">
  </div>
</template>
