import { createStarport } from './floating'
import TheImage from '~/components/TheImage.vue'
const { Proxy, Carrier } = createStarport(TheImage)

export {
  Proxy,
  Carrier,
}
