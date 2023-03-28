import type { UseElementBoundingReturn } from '@vueuse/core'
import { nanoid } from './utils'
import type { Ref } from 'vue'
export function createStarporContext() {
  const id = ref(nanoid())
  const el: Ref<HTMLElement | undefined> = ref()
  let rect: UseElementBoundingReturn = undefined!

  const props: Ref<any> = ref()
  const attr: Ref<any> = ref()
  const isVisible = ref(false)
  const isLanded: Ref<boolean> = ref(false)

  const transitionAttrs: Ref<string[]> = ref([])
  const transitionendCounter = ref(0)

  const scope = effectScope(true)
  scope.run(() => {
    rect = useElementBounding(el)
    watch(el, async (v) => {
      if (v)
        isVisible.value = true
      await nextTick()
      if (!el.value)
        isVisible.value = false
    })
  })

  return reactive({
    el,
    props,
    attr,
    rect,
    scope,
    id,
    isLanded,
    isVisible,
    elRef() {
      return el
    },
    async fly() {
      if (!isLanded.value) return
      isLanded.value = false
    },
    async Land() {
      if (isLanded.value) return
      isLanded.value = true
    },
    transitionAttrsOPN() {
      return {
        addCount() {
          transitionendCounter.value++
        },
        reset() {
          transitionAttrs.value = []
          transitionendCounter.value = 0
        },
        getLength() {
          return transitionAttrs.value.length
        },
        getCount() {
          return transitionendCounter.value
        },
        addAttr(attr: string) {
          transitionAttrs.value.push(attr)
        }

      }
    }
  })
}

export type StarporContext = ReturnType<typeof createStarporContext>
