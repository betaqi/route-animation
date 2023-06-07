<script setup lang="ts">
import { images } from '~/composables/data'
import { Starport } from 'vue-starport'
const props = defineProps<{
  idx: string
}>()
const router = useRouter()
const size = ref(useStorage('size', 150))
function LargeSize() {
  size.value && (size.value += 20)
}
function RestSize() {
  size.value && (size.value = 150)
}
const next = computed(() => (+props.idx + 1) % images.length)
</script>

<template>
  {{ next }}
  <div flex="~ col" items-center px6>
    <div>
      <button btn m-3 @click="() => { router.back() }">Back</button>
      <button btn m-3 @click="LargeSize">
        Large
      </button>
      <button btn m-3 @click="RestSize">
        Rest
      </button>
    </div>
    <div flex items-center p2 gap-6 m10 max-w-180>
      <Starport :style="{ width: `${size}px`, height: `${size}px` }" :port="idx">
        <TheImage :src="images[Number(idx)]" class="rounded-1/2 flow-hidden" />
      </Starport>
      <p flex-1>
        Hojas de Estilo en Cascada (del inglés Cascading Style Sheets) o CSS es el lenguaje de estilos utilizado para
        describir la presentación de documentos HTML o XML (en-US) (incluyendo varios lenguajes basados en XML como SVG,
        MathML o XHTML). CSS describe como debe ser renderizado el elemento estructurado en la pantalla, en papel, en el
        habla o en otros medios.CSS es uno de los lenguajes base de la Open Web y posee una especificación estandarizada
        por
        parte del W3C. Anteriormente , el desarrollo de varias partes de las especificaciones de CSS era realizado de
      </p>
    </div>
    <div flex items-center p2 gap-6 m10 max-w-180>
      <p flex-1>
        Hojas de Estilo en Cascada (del inglés Cascading Style Sheets) o CSS es el lenguaje de estilos utilizado para
        describir la presentación de documentos HTML o XML (en-US) (incluyendo varios lenguajes basados en XML como SVG,
        MathML o XHTML). CSS describe como debe ser renderizado el elemento estructurado en la pantalla, en papel, en el
        habla o en otros medios.CSS es uno de los lenguajes base de la Open Web y posee una especificación estandarizada
        por
        parte del W3C. Anteriormente , el desarrollo de varias partes de las especificaciones de CSS era realizado de
      </p>
      <Starport :style="{ width: `${size}px`, height: `${size}px` }" :port="String(next)">
        <TheImage :src="images[Number(next)]" class="rounded-1/2 flow-hidden" />
      </Starport>
    </div>
  </div>
</template>
