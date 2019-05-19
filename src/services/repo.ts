import { Penerima } from '@/model/Penerima'
import pouchDB from './pouchDB'

const MAX_ID = 99999999
const MIN_ID = 1

class Repo {

  randomID () {
    const fid = Math.random() * (MAX_ID - MIN_ID) + MIN_ID
    const intId = Math.floor(fid)
    return `${intId}`
  }

  async findAll (dataset: string, keyword: string) {
    let _k = (keyword === undefined) ? '' : keyword
    const re = new RegExp(`${_k}`, 'i')
    const result = await pouchDB.find({
      selector: {
        dataset,
        nama: { $regex: re }
      }
    })
    return result.docs
  }

  async add (payload: Penerima) {
    const fid = Math.random() * (MAX_ID - MIN_ID) + MIN_ID
    const intId = Math.floor(fid)
    const _id = `${intId}`
    await pouchDB.put({
      _id,
      ...payload
    })
  }

  async findById (id: string) {
    return await pouchDB.get(id)
  }

  async update (id: string, rev: string, payload: Penerima) {

  }
}

const repo = new Repo()

export default repo