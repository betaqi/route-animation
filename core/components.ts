import type { StarportInstance } from './type'
import { defineComponent, isVNode, renderList } from 'vue'
import { createStarport } from './core'
import { isObject } from '@vueuse/core'

export const compCarrierMapCounter = ref(0)
export const componetMap = new Map<Component, StarportInstance>()

function getStarportInstance(componet: Component) {
  if (!componetMap.has(componet)) {
    compCarrierMapCounter.value += 1
    componetMap.set(componet, createStarport(componet))
  }
  return componetMap.get(componet)!
}

export function getStarportCarrier<T extends Component>(componet: T) {
  return getStarportInstance(componet).carrier
}

export function getStarport<T extends Component>(componet: T) {
  return getStarportInstance(componet).proxy
}

export const StarportCarrier = defineComponent({
  name: 'StarportCarrier',
  render() {
    compCarrierMapCounter.value
    return renderList(
      Array.from(componetMap.keys()),
      (comp, idx) => h(getStarportCarrier(comp), { key: idx })
    )
  }
})

export const Starport = defineComponent({
  name: 'Starport',
  props: {
    port: {
      type: String,
    },
  },
  setup(props, ctx) {
    return () => {
      const slots = ctx.slots.default?.()
      if (!slots)
        throw new Error('Starport requires a slot')

      if (slots.length !== 1)
        throw new Error(`Starport requires exactly one slot, but got ${slots.length}`)

      const slot = slots[0]
      const component = slot.type as any

      // console.log(Object.prototype.toString.call(component) === '[object Object]')
      if (!isObject(component) || isVNode(component))
        throw new Error('The slot in Starport must be a component')

      const proxy = getStarport(component) as any
      return h(proxy, { port: props.port, props: slot.props })
    }
  }
})
