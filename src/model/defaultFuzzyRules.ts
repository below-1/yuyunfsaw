import { FuzzyTuple } from './FuzzyTuple'
import { Rules } from './Rules'
import FMain from './FMain'

const DefaultFuzzyRules: Rules = {
  umur: FMain.c,
  pendidikan: FMain.t,
  pekerjaan: FMain.t,
  penghasilan: FMain.st,
  tanah: FMain.t,
  rumah: FMain.st,
  jumlahPenghuni: FMain.c,
  atap: FMain.st,
  dinding: FMain.st,
  lantai: FMain.st,
  kamarMandi: FMain.t,
  sumberAir: FMain.st,
  sumberListrik: FMain.t
}

export default DefaultFuzzyRules