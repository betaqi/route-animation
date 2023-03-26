<script setup lang="ts">
import { Proxy } from '~/composables/image'
import { images } from '~/composables/data'
</script>

<template>
  <div flex="~ gap-4 wrap">
    <Proxy
      v-for="(img, idx) in images" :key="idx"
      :port="String(idx)" :props="{ src: img }"
      :attrs="{ class: 'w-50 h-50' }" />
  </div>
</template>
