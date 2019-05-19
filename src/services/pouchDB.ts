import PouchDB from 'pouchdb'
import PouchDBFind from 'pouchdb-find'

PouchDB.plugin(PouchDBFind)

const DB_NAME = 'yuyun.fsaw.penerima'
const pouchDB = new PouchDB(DB_NAME)

pouchDB.createIndex({
  index: {
    fields: ['dataset', 'nama']
  }
})

export default pouchDB
