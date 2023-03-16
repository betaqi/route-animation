import { createFloating } from './floating'
import TheImage from '~/components/TheImage.vue'
const { Proxy, Container } = createFloating(TheImage)

export {
  Proxy,
  Container,
}
