import { Component, StyleValue, Teleport } from 'vue'
import { defineComponent } from 'vue'

export const createFloating = (component: Component) => {
  const attrs = ref()
  const proxyEl = ref<HTMLElement>()

  let { top, left } = useElementBounding(proxyEl)
  const island = ref(false)
  const Container = defineComponent({
    setup() {
      const router = useRouter()
      const Style = computed((): StyleValue => {
        console.log(island.value)
        return {
          position: 'fixed',
          transition: 'all 1s ease-in-out',
          top: `${top.value}px`,
          left: `${left.value}px`,
          display: `${island.value ? 'none' : 'block'}`,
          boxShadow: ' 5px 5px red'
        }
      })
      const cleanRouterGuard = router.beforeEach(async () => {
        island.value = false
        await nextTick()
      })

      onBeforeUnmount(() => {
        cleanRouterGuard()
      })
      const transitionAttrs = ref([])
      const counter = ref(0)


      return () => h(
        'div', {
        style: Style.value, id: 'container',
        onTransitionstart: (e: { propertyName: never }) => {
          transitionAttrs.value.push(e.propertyName)
        },
        onTransitionend: async () => {
          counter.value++
          console.log(counter.value, transitionAttrs.value.length)
          console.log('end')
          if (counter.value === transitionAttrs.value.length) {
            await nextTick()
            island.value = true
            transitionAttrs.value = []
            counter.value = 0
          }
        }
      },
        h(Teleport,
          { to: island.value ? '#proxy' : 'body', disabled: !island.value },
          h(component, attrs.value)
        )
      )
    },

  })
  const Proxy = defineComponent({
    setup() {
      const attr = useAttrs()
      attrs.value = attr
      return () => h('div', { ref: proxyEl, id: 'proxy' }, [])
    },
  })

  return {
    Container,
    Proxy,
  }
}
