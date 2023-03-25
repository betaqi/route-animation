import { Component, StyleValue, Teleport } from 'vue'
import { defineComponent } from 'vue'
import { StarporContext, createStarporContext } from './context'
import { nanoid } from './utils'
export function createStarport<T extends Component>(component: T) {
  const contextMap = new Map<string, StarporContext>()
  const defaultId = nanoid()

  function getContext(port = defaultId) {
    if (!contextMap.has(port)) {
      contextMap.set(port, createStarporContext(port))
    }

    return contextMap.get(port)!
  }

  const Container = defineComponent({
    props: {
      port: {
        type: String,
        default: defaultId
      }
    },
    setup(props) {
      const router = useRouter()
      const context = computed(() => {

        return getContext(props.port)
      })

      const Style = computed((): StyleValue => {
        const rect = context.value.rect
        const style: StyleValue = {
          position: 'fixed',
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`
        }
        if (!context.value.el) {
          return {
            ...style,
            display: 'none'
          }
        }
        if (context.value.isLanded)
          style.pointerEvents = 'none'
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



      return () => h(
        'div', {
        style: Style.value,
        onTransitionstart: (e: { propertyName: never }) => {
          context.value.transitionAttrsOPN().addAttr(e.propertyName)
        },
        onTransitionend: async () => {
          context.value.transitionAttrsOPN().addCount()
          if (
            context.value.transitionAttrsOPN().getLength()
            === context.value.transitionAttrsOPN().getCount()
          ) {
            await nextTick()
            context.value.Land()
            context.value.transitionAttrsOPN().reset()
          }
        }
      },
        h(Teleport,
          { to: context.value.isLanded ? `#${context.value.id}` : 'body', disabled: !context.value.isLanded },
          h(component, context.value.attr)
        )
      )
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
      const context = computed(() => getContext(props.port))
      context.value.attr = useAttrs()
      context.value.props = props.props
      const el = context.value.elRef()
      return () => h(
        'div',
        {
          ref: el,
          class: 'proxy',
          id: context.value.id
        },
        ctx.slots.default
          ? h(ctx.slots.default)
          : undefined
      )
    },
  })

  return {
    Container,
    Proxy,
  }
}
