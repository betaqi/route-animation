<script setup lang="ts">
const router = useRoute()
const isDark = ref(false)

function toggle(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;
  console.log('x', x, innerWidth - x);
  console.log('y', y, innerHeight - y);
  const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(() => {
    const root = document.documentElement;
    isDark.value = root.classList.contains('dark');
    root.classList.remove(isDark.value ? 'dark' : 'light');
    root.classList.add(isDark.value ? 'light' : 'dark');
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 800,
        easing: 'ease-in',
        pseudoElement: isDark.value ? '::view-transition-old(root)' : '::view-transition-new(root)',
      }
    );
  });
}
</script>

<template>
  <div border="b gray-400/10" p4 flex="~" items-center justify-between>
    <div text-lg font-mono>
      {{ router.path }}
    </div>
    <div @click="toggle">
      <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
        <mask class="moon" id="moon-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
          <circle cx="24" cy="10" r="6" fill="black"></circle>
        </mask>
        <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor"></circle>
        <g class="sun-beams" stroke="currentColor">
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </g>
      </svg>
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
