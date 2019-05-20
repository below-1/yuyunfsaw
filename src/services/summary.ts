import repo from './repo'
import fuzzyConverter from './converter/fuzzy'

export default async function summary (dataset: string) {
  const data = (await repo.findAll(dataset, ''))
  const processed = data.map(fuzzyConverter)
  
  // Count pendidikan
  let pendidikan: any = {}
  let pekerjaan: any = {}
  // console.log('HERE=', pendidikan.hasOwnProperty)

  processed.forEach(p => {
    let key = p.pendidikan
    if (!pendidikan.hasOwnProperty(key)) {
      pendidikan[key] = 0
    }
    pendidikan[key] = pendidikan[key] + 1

    key = p.pekerjaan
    if (!pekerjaan.hasOwnProperty(key)) {
      pekerjaan[key] = 0
    }
    pekerjaan[key] = pekerjaan[key] + 1
  })

  console.log(pendidikan)
  console.log(pekerjaan)
}
