import type { Component, StyleValue } from 'vue'
import { defineComponent } from 'vue'
export function createFloating(component: Component) {
  const matedData = reactive({
    props: {},
    attrs: {},
  })
  const proxyEl = ref<Element>()
  // eslint-disable-next-line vue/one-component-per-file
  const Container = defineComponent({
    setup() {
      const observerOptions = {
        childList: true,
        attributes: true,
        subtree: true,
      }

      const rect = ref<DOMRect | undefined>()
      const Style = computed((): StyleValue => {
        if (!proxyEl.value) {
          return {
            display: 'none',
            translate: '',
          }
        }
        return {
          position: 'fixed',
          transition: 'all .5s',
          top: `${rect.value?.top ?? 0}px`,
          left: `${rect.value?.left ?? 0}px`,
        }
      })

      const observer = new MutationObserver((mutations) => {
        const element = mutations[0].target as Element
        rect.value = element.getBoundingClientRect()
      })

      function update() {
        rect.value = proxyEl.value?.getBoundingClientRect()
        proxyEl.value && observer.observe(proxyEl.value, observerOptions)
      }

      window.addEventListener('resize', update)
      watchEffect(update)
      return () => h('div', { style: Style.value }, [
        h(component, matedData.attrs),
      ])
    },

  })
  // eslint-disable-next-line vue/one-component-per-file
  const Proxy = defineComponent({
    setup() {
      const attr = useAttrs()
      matedData.attrs = attr
      const el = ref()
      onMounted(() => {
        proxyEl.value = el.value
      })

      onUnmounted(() => {
        proxyEl.value = undefined
      })

      return () => h('div', { ref: el }, [])
    },
  })

  return {
    Container,
    Proxy,
  }
}
