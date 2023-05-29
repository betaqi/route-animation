<script setup lang="ts">
import { StarportProxy } from '../../core/index'
const router = useRoute()
</script>

<template>
  <div border="b gray-400/10" p4 flex="~" items-center justify-between>
    <div text-lg font-mono>
      {{ router.path }}
    </div>
    <div>
      <StarportProxy w-50px h-24px v-if="router.path !== '/'">
        <Theme />
      </StarportProxy>
    </div>
    <div flex="~ gap-1" justify-center>
      <RouterLink to="/" btn>
        /
      </RouterLink>
      <RouterLink to="/bar" btn>
        Bar
      </RouterLink>
    </div>
  </div>
</template>
