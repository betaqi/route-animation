<script setup lang="ts">
import { images } from '~/composables/data'
import { Starport } from 'vue-starport'
</script>

<template>
  <div flex="~ gap-4 wrap" justify-center>
    <RouterLink v-for="(img, idx) in images" :key="idx" :to="`/${idx}`">
      <Starport :port="String(idx)" w-100 h-50>
        <TheImage :src="img" />
      </Starport>
    </RouterLink>
  </div>
  <div flex justify-center mt20>
    <Starport w-50px h-24px>
      <Theme />
    </Starport>
  </div>
</template>
