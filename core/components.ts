import type { StarportInstance } from './type'
import { defineComponent, renderList } from 'vue'
import { createStarport } from './core'

export const compCarrierMapCounter = ref(0)

export const componetMap = new Map<Component, StarportInstance>()


export function getStarportCarrier<T extends Component>(componet: T) {
  if (!componetMap.has(componet)) {
    compCarrierMapCounter.value += 1
    componetMap.set(componet, createStarport(componet))
  }
  return componetMap.get(componet)!.carrier
}

export function getStarport<T extends Component>(component: T) {
  if (!componetMap.has(component)) {
    compCarrierMapCounter.value += 1
    componetMap.set(component, createStarport(component))
  }
  return componetMap.get(component)!.proxy
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
      const slot = ctx.slots.default?.()
      if (!slot)
        throw new Error('Starport requires a slot')
      if (slot.length !== 1)
        throw new Error(`Starport requires exactly one slot, but got ${slot.length}`)

      const component = slot[0].type as any
      const proxy = getStarport(component) as any
      return h(proxy, { port: props.port, props: slot[0].props })
    }
  }
})
