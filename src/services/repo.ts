import { Penerima } from '@/model/Penerima'
import pouchDB from './pouchDB'

const MAX_ID = 99999999
const MIN_ID = 1

export default {
  async findAll (dataset: string) {
    // let _k = (keyword === undefined) ? '' : keyword
    const result = await pouchDB.find({
      selector: {
        dataset
      }
    })
    return result.docs
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
