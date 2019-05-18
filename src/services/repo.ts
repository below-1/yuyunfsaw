import { Penerima } from '@/model/Penerima'
import PouchDB from 'pouchdb'

const MAX_ID = 99999999
const MIN_ID = 1
const DB_NAME = 'yuyun.fsaw.penerima'
const pouchDB = new PouchDB(DB_NAME)

export default {
  async findAll (keyword?: string) {
    let _k = (keyword === undefined) ? '' : keyword
    const docs = await pouchDB.allDocs()
    docs.rows.map(row => {
    })
  },

  async add (payload: Penerima) {
    const fid = Math.random() * (MAX_ID - MIN_ID) + MIN_ID
    const intId = Math.floor(fid)
    const _id = `${intId}`
    await pouchDB.put({
      _id,
      ...payload
    })
  },

  async update (id: string, rev: string, payload: Penerima) {
    
  }
}
