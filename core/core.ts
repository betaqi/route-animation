import { Component, renderList, StyleValue, Teleport } from 'vue'
import { defineComponent } from 'vue'
import { StarporContext, createStarportContext } from './context'
import { nanoid } from './utils'
type StarportInstance = ReturnType<typeof createStarport>

export const compCarrierMapCounter = ref(0)

export const componetMap = new Map<Component, StarportInstance>()


export function getStarportCarrier<T extends Component>(componet: T) {
  if (!componetMap.has(componet)) {
    compCarrierMapCounter.value += 1
    componetMap.set(componet, createStarport(componet))
  }
  return componetMap.get(componet)!.Carrier
}

export function getStarportProxy<T extends Component>(component: T) {
  if (!componetMap.has(component)) {
    compCarrierMapCounter.value += 1
    componetMap.set(component, createStarport(component))
  }
  return componetMap.get(component)!.Proxy
}


export function createStarport<T extends Component>(component: T) {
  const contextMap = new Map<string, StarporContext>()
  const defaultId = nanoid()

  const counter = ref(0)

  function getStarporContext(port = defaultId) {
    if (!contextMap.has(port)) {
      counter.value += 1
      contextMap.set(port, createStarportContext())
    }

    return contextMap.get(port)!
  }

  const starcraft = defineComponent({
    props: {
      port: {
        type: String,
        default: defaultId
      }
    },
    setup(props) {
      const router = useRouter()
      const context = computed(() => getStarporContext(props.port))

      const Style = computed((): StyleValue => {
        const rect = context.value.rect
        const style: StyleValue = {
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`
        }
        if (!context.value.isVisible || !context.value.el) {
          return {
            ...style,
            // zIndex: -1,
            display: 'none',
          }
        }
        if (!context.value.el) {
          return {
            ...style,
            display: 'none'
          }
        }
        if (context.value.isLanded) {
          style.pointerEvents = 'none'
          style.display = 'none'
        }
        else
          style.transition = 'all 1s ease-in-out'
        return style
      })
      const cleanRouterGuard = router.beforeEach(async () => {
        context.value.fly()
        await nextTick()
      })

      onBeforeUnmount(() => {
        cleanRouterGuard()
      })



      return () => {
        const comp = h(component, { ...context.value.props, ...context.value.attr })
        const teleport = !!(context.value.isLanded && context.value.el)
        return h(
          'div', {
          style: Style.value,
          class: 'container',
          id: `${context.value.id}`,
          onTransitionstart: () => {
            context.value.fly()
          },
          onTransitionend: async () => {
            await nextTick()
            context.value.Land()
          }
        },
          h(Teleport,
            { to: teleport ? `#proxy-${context.value.id}` : 'body', disabled: !context.value.isLanded },
            comp
          )
        )
      }
    },

  })

  const Proxy = defineComponent({
    props: {
      port: {
        type: String,
        default: defaultId
      },
      props: {
        type: Object,
        default: () => { }
      },
      attrs: {
        type: Object,
        default: () => { }
      }
    },
    setup(props, ctx) {
      const context = computed(() => getStarporContext(props.port))
      context.value.attr = props.attrs
      context.value.props = props.props
      const el = context.value.elRef()
      // 第一次出现直接落地
      if (!context.value.isVisible) {
        context.value.Land()
      }

      onBeforeUnmount(() => {
        context.value.rect.update()
      })

      return () => h(
        'div',
        {
          ref: el,
          id: `proxy-${context.value.id}`
        },
        ctx.slots.default
          ? h(ctx.slots.default)
          : undefined
      )
    },
  })

  const Carrier = defineComponent({
    setup() {
      return () => {
        counter.value
        return renderList(
          Array.from(contextMap.keys()),
          prot => h(starcraft, { port: prot, key: prot })
        )
      }
    }
  })

  return {
    Carrier,
    Proxy,
  }
}
