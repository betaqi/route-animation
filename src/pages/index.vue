<script setup lang="ts">
import { images } from '~/composables/data'
import { StarportProxy } from '../../core/index'
</script>

<template>
  <div flex="~ gap-4 wrap" justify-center>
    <RouterLink v-for="(img, idx) in images" :key="idx" :to="`/${idx}`">
      <StarportProxy :port="String(idx)" w-100 h-50>
        <TheImage  :src="img" />
      </StarportProxy>
    </RouterLink>
  </div>
</template>
