<script lang="ts" setup>
defineProps<{
  src: string
}>()
</script>

<template>
  <div overflow-hidden duration-800 wfull hfull>
    <img wfull object-cover block hfull :src="src">
  </div>
</template>
