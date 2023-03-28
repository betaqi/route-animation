<script lang="ts" setup>
defineProps<{
  src: string
}>()
</script>

<template>
  <div overflow-hidden transition-all wfull hfull>
    <img wfull hfull :src="src">
  </div>
</template>
