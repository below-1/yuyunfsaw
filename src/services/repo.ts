import { Penerima, PenerimaEntity } from '@/model/Penerima'
import pouchDB from './pouchDB'

const MAX_ID = 99999999
const MIN_ID = 1

class Repo {

  randomID () {
    const fid = Math.random() * (MAX_ID - MIN_ID) + MIN_ID
    const intId = Math.floor(fid)
    return `${intId}`
  }

  async findAll (dataset: string, keyword: string) : Promise<PenerimaEntity[]> {
    let _k = (keyword === undefined) ? '' : keyword
    const re = new RegExp(`${_k}`, 'i')
    const result = await pouchDB.find({
      selector: {
        dataset,
        nama: { $regex: re }
      }
    })
    return result.docs as PenerimaEntity[]
  }

  async add (payload: Penerima) {
    const fid = Math.random() * (MAX_ID - MIN_ID) + MIN_ID
    const intId = Math.floor(fid)
    const _id = `${intId}`
    const v = 0.00
    await pouchDB.put({
      _id,
      ...payload,
      v
    })
  }

  async delete (_id: string, _rev: string) {
    await pouchDB.remove(_id, _rev)
  }

  async findById (id: string) {
    return await pouchDB.get(id)
  }

  async update (id: string, rev: string, payload: PenerimaEntity) {
    await pouchDB.put({
      ...payload,
      _id: id,
      _rev: rev
    })
  }
}

const repo = new Repo()

export default repo