import { FuzzyTuple } from './FuzzyTuple'

const FMain = {
  sr: new FuzzyTuple(0.0, 0.0, 0.25, 'SR', 'Sangat Rendah'),
  r: new FuzzyTuple(0.0, 0.25, 0.50, 'R', 'Rendah'),
  c: new FuzzyTuple(0.25, 0.50, 0.75, 'C', 'Cukup'),
  t: new FuzzyTuple(0.50, 0.75, 0.1, 'T', 'Tinggi'),
  st: new FuzzyTuple(0.50, 0.75, 0.1, 'ST', 'Sangat Tinggi')
}

export default FMain
