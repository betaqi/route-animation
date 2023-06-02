<script setup lang="ts">
import { images } from '~/composables/data'
import { Starport } from 'vue-starport'

const mode = useLocalStorage('image-mode', true)
const toggle = useToggle(mode)

</script>

<template>
  <div p5 flex="~ gap-2" justify-center>
    <button btn @click="toggle()">
      Toggle Size
    </button>
  </div>
  <div flex="~ wrap" justify-center>
    <RouterLink v-for="(img, idx) in images" :key="idx" :to="`/${idx}`">
      <Starport
        :port="String(idx)"
        :class="mode ? 'w-70 h-30' : 'w-64 h-60 m2'"
        transition-all duration-800
        >
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
