import { FuzzyTuple } from '@/model/FuzzyTuple'
import { Penerima } from '@/model/Penerima'
import {
  ContFuzzOptions,
  ContWeightOptions,
  DiscFuzzOptions,
  DiscWeightOptions
} from './optionsTypes'
import { 
  UMUR_OPTIONS,
  PENDIDIKAN_OPTIONS,
  PEKERJAAN_OPTIONS,
  PENGHASILAN_OPTIONS,
  TANAH_OPTIONS,
  RUMAH_OPTIONS,
  JUMLAH_PENGHUNI_OPTIONS,
  C3_OPTIONS,
  KAMAR_MANDI_OPTIONS,
  SUMBER_AIR_OPTIONS,
  SUMBER_LISTRIK_OPTIONS
} from './options'

const crisp = (ft: FuzzyTuple) => (ft.a + ft.b + ft.c) / 3.0

type ContToFuzz = (x: number) => FuzzyTuple
type ContToWeight = (x: number) => number
type DiscToFuzz<T> = (x: T) => FuzzyTuple
type DiscToWeight<T> = (x: T) => number

function contToFuzz (options: ContFuzzOptions[]) : ContToFuzz {
  return (x: number) => {
    const result = options.find(opt => opt.start <= x && x <= opt.end)
    if (!result) {
      throw new Error(`Can't find category for: ${x}`)
    }
    return result.fuzzy
  }
}

function contToWeight (options: ContWeightOptions[]) {
  return (x: number) => {
    const result = options.find(opt => opt.start <= x && x <= opt.end)
    if (!result) {
      throw new Error(`Can't find category for: ${x}`)
    }
    return result.weight
  }
}

function discToFuzz<T> (options: DiscFuzzOptions<T>[]) : DiscToFuzz<T> {
  return (x: T) => {
    const result = options.find(opt => opt.value === x)
    if (!result) {
      throw new Error(`Can't decode value: ${x}`)
    }
    return result.fuzzy
  }
}

function discToWeight<T> (options: DiscWeightOptions<T>[]) {
  return (x: T) => {
    const result = options.find(opt => opt.value === x)
    if (!result) {
      throw new Error(`Can't find ${x} in ${options}`)
    }
    return result.weight
  }
}

const fuzzyConverter = {
  umur: contToFuzz(UMUR_OPTIONS),
  pendidikan: discToWeight(PENDIDIKAN_OPTIONS),
  pekerjaan: discToWeight(PEKERJAAN_OPTIONS),
  penghasilan: contToFuzz(PENGHASILAN_OPTIONS),
  tanah: discToWeight(TANAH_OPTIONS),
  rumah: discToWeight(RUMAH_OPTIONS),
  jumlahPenghuni: contToWeight(JUMLAH_PENGHUNI_OPTIONS),
  atap: discToFuzz(C3_OPTIONS),
  dinding: discToFuzz(C3_OPTIONS),
  lantai: discToFuzz(C3_OPTIONS),
  kamarMandi: discToWeight(KAMAR_MANDI_OPTIONS),
  sumberAir: discToWeight(SUMBER_AIR_OPTIONS),
  sumberListrik: discToWeight(SUMBER_LISTRIK_OPTIONS)
}

export default function (p: Penerima) {
  const fc = fuzzyConverter
  return {
    umur: crisp(fc.umur(p.umur)),
    pendidikan: fc.pendidikan(p.pendidikan),
    pekerjaan: fc.pekerjaan(p.pekerjaan),
    penghasilan: crisp(fc.penghasilan(p.penghasilan)),
    tanah: fc.tanah(p.tanah),
    rumah: fc.rumah(p.rumah),
    jumlahPenghuni: fc.jumlahPenghuni(p.jumlahPenghuni),
    atap: crisp(fc.atap(p.atap)),
    dinding: crisp(fc.dinding(p.dinding)),
    lantai: crisp(fc.lantai(p.lantai)),
    kamarMandi: fc.kamarMandi(p.kamarMandi),
    sumberAir: fc.sumberAir(p.sumberAir),
    sumberListrik: fc.sumberListrik(p.sumberListrik)
  }
}
