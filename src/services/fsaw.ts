import repo from './repo'
import settings from './settings'
import fuzzyConverter from './converter/fuzzy'

const sum = (list: number[]) => list.reduce((a, b) => a + b, 0)
const criteriaKeys = [
  'umur', 'pendidikan', 'pekerjaan',
  'penghasilan', 'tanah', 'rumah',
  'jumlahPenghuni', 'atap', 'dinding', 'lantai',
  'kamarMandi', 'sumberAir', 'sumberListrik',
]
const crisp = (x: any) => (x.a + x.b + x.c) / 3.0
const greater = (a: number, b: number) => a > b
const lesser = (a: number, b: number) => a < b
type Comparator = (a: number, b: number) => boolean
const better = (op: Comparator, a: number, b: number) => op(a, b)

const divide_array = (xs: number[], ys: number[]) => xs.map((x, idx) => 1.0 * x / ys[idx])
const mult_array = (xs: number[], ys: number[]) => xs.map((x, idx) => x * ys[idx])

// Initialize cost columns.
const costCols = new Set<number>()
costCols.add(3)

export default async function (dataset: string) {
  const data = await repo.findAll(dataset, '')
  const processed = data
    .map(fuzzyConverter)
    .map((p: any) => criteriaKeys.map(k => p[k]))
  const weightsFuzzy: any = settings.weights
  const formatFuzzy = (k: string) => {
    const we = weightsFuzzy[k]
    const a = we.a, b = we.b, c = we.c, label = we.label
    return `${label} [${a}, ${b}, ${c}]`
  }
  const weightsLabels = criteriaKeys.map(formatFuzzy)
  const weights = criteriaKeys.map(k => crisp(weightsFuzzy[k]))
  const totalWeights = sum(weights)
  const weightsNormalized = weights.map(w => w / totalWeights)

  let bestValInCols = Array.from(Array(weights.length).keys()).map(i => -9999.0)
  Array.from(costCols.values()).forEach(costIdx => {
    bestValInCols[costIdx] = 99999
  })

  // console.log('processed = ', processed)

  // Find maximum in each columns
  processed.forEach(p => {
    // console.log(p)
    p.forEach((val, idx) => {
      const currentBest = bestValInCols[idx]
      const op = costCols.has(idx) ? lesser : greater
      if (better(op, val, currentBest)) {
        bestValInCols[idx] = val
      }
    })
  })

  const norm_alt = (xs: number[]) => divide_array(xs, bestValInCols)
  const mult_weight = (xs: number[]) => mult_array(xs, weightsNormalized)
  const normalized = processed.map(norm_alt)
  const vs = normalized.map(mult_weight).map(sum)

  const dataVs = data.map((d, idx) => {
    return {
      ...d,
      v: vs[idx],
      norm: normalized[idx]
    }
  })

  return {
    weights,
    weightsLabels,
    weightsNormalized,
    dataVs
  }
}
