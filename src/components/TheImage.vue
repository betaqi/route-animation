<script lang="ts" setup>
defineProps<{
  src: string
}>()

const counter = ref(Math.round(Math.random() * 100))
onMounted(() => console.log('Image Mounted'))
onUnmounted(() => console.log('Image onUnmounted'))
</script>


<template>
  <div overflow-hidden duration-800 wfull hfull relative>
    <img wfull object-cover block hfull :src="src">
    <div absolute pt-5 left-0 right-0 bottom-0 bg-gradient-to-t from-black:40 to-transparent text-white font-mono flex
      items-center justify-center @click.prevent="counter += 1" text-1>
      {{ counter }}
    </div>
  </div>
</template>
