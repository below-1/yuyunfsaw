import Vue, { PluginObject } from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $bus: Vue
  }
}

const bus = new Vue()
const Bus: PluginObject<{}> = {
  install: (VueObj, options: any) => {
    VueObj.$bus = bus
  }
}

export default Bus