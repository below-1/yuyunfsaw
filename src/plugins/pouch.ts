import PouchDB from 'pouchdb'
import Vue, { PluginObject } from 'vue'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $pouch: PouchDB.Database
  }
}

const DB_NAME = 'yuyun.fsaw.penerima'
const pouchDB = new PouchDB(DB_NAME)

export const Pouch: PluginObject<{}> = {
  install: (VueObj, options: any) => {
    VueObj.$pouch = pouchDB
  }
}
