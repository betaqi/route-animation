import type { Component } from 'vue'

export type ResolvedStarportOptions = Required<StarportOptions>

export interface StarportOptions {
  duration?: number
}

export type StarportInstance = {
  carrier: Component
  proxy: Component,
  options: StarportOptions
}
