<script setup lang="ts">
import { Starport } from '../../core/index'
const router = useRoute()
</script>

<template>
  <div border="b gray-400/10" p4 flex="~" items-center justify-between>
    <div text-lg font-mono>
      {{ router.path }}
    </div>
    <div>
      <Starport w-50px h-24px v-if="router.path !== '/'">
        <Theme />
      </Starport>
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
