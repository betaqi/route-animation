<script setup lang="ts">
import { Proxy } from '~/composables/image'
import { images } from '~/composables/data'
</script>

<template>
  <div flex="~ gap-4 wrap" justify-center>
    <RouterLink v-for="(img, idx) in images" :key="idx" :to="`/${idx}`">
      <Proxy :port="String(idx)" :props="{ src: img }" w-100 h-50 />
    </RouterLink>
  </div>
</template>
