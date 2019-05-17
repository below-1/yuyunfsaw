import { FuzzyTuple } from '@/model/FuzzyTuple'
import { KPendidikan } from '@/model/KPendidikan'
import { KPekerjaan } from '@/model/KPekerjaan'
import { C3Enum } from '@/model/C3Enum'
import { KRumah } from '@/model/KRumah'
import { KTanah } from '@/model/KTanah'
import { KSumberAir } from '@/model/KSumberAir'
import { KSumberListrik } from '@/model/KSumberListrik'
import { KKamarMandi } from '@/model/KKamarMandi'
import {
  ContFuzzOptions,
  ContWeightOptions,
  DiscFuzzOptions,
  DiscWeightOptions
} from './optionsTypes'

export const UMUR_OPTIONS: ContFuzzOptions[] = [
  { start: 17, end: 35, fuzzy: new FuzzyTuple(0.0, 0.5, 0.75, 'M', 'Muda') },
  { start: 36, end: 55, fuzzy: new FuzzyTuple(0.5, 0.75, 1.0, 'P', 'Parubaya') },
  { start: 55, end: 1000, fuzzy: new FuzzyTuple(0.5, 0.75, 1.0, 'T', 'Tua') }
]

export const PENDIDIKAN_OPTIONS: DiscWeightOptions<KPendidikan>[] = [
  { label: 'Tidak Sekolah', value: KPendidikan.TidakSekolah, weight: 5 },
  { label: 'SD', value: KPendidikan.SD, weight: 4 },
  { label: 'SMP', value: KPendidikan.SMP, weight: 3 },
  { label: 'SMA', value: KPendidikan.SMA, weight: 2 },
  { label: 'D1 / D3', value: KPendidikan.D1_D3, weight: 1}
]

export const PEKERJAAN_OPTIONS: DiscWeightOptions<KPekerjaan>[] = [
  { label: 'PNS', value: KPekerjaan.PNS, weight: 1 },
  { label: 'Wirausaha', value: KPekerjaan.Wirausaha, weight: 2 },
  { label: 'Swasta', value: KPekerjaan.Swasta, weight: 3 },
  { label: 'Petani', value: KPekerjaan.Petani, weight: 4 },
  { label: 'Buruh', value: KPekerjaan.Buruh, weight: 5 }
]

const _5RRB = 500000
const _8RRB = 800000
const  _1JT = 1000000
const _2JT = 2000000
const _100JT = 100000000
export const PENGHASILAN_OPTIONS: ContFuzzOptions[] = [
  { start: _2JT, end: _100JT, fuzzy: new FuzzyTuple(0.0, 0.0, 0.25, 'SB', 'Sangat Banyak') },
  { start: _1JT, end: _2JT, fuzzy: new FuzzyTuple(0.0, 0.25, 0.50, 'B', 'Banyak') },
  { start: _8RRB, end: _1JT, fuzzy: new FuzzyTuple(0.25, 0.50, 0.75, 'C', 'Cukup') },
  { start: _5RRB, end: _8RRB, fuzzy: new FuzzyTuple(0.50, 0.75, 0.1, 'S', 'Sedikit') },
  { start: 0, end: _5RRB, fuzzy: new FuzzyTuple(0.50, 0.75, 0.1, 'S', 'Sangat Sedikit') }
]

export const TANAH_OPTIONS: DiscWeightOptions<KTanah>[] = [
  { label: 'Tanah Negara', value: KTanah.TanahNegara, weight: 1 },
  { label: 'Bukan Milik Sendiri', value: KTanah.Bukan, weight: 2 },
  { label: 'Milik Sendiri', value: KTanah.MilikSendiri, weight: 3 }
]

export const RUMAH_OPTIONS: DiscWeightOptions<KRumah>[] = [
  { label: 'Rumah Dinas', value: KRumah.RumahDinas, weight: 1 },
  { label: 'Sewa / Kontrak', value: KRumah.SewaKontrak, weight: 2 },
  { label: 'Bukan Milik Sendiri', value: KRumah.BukanMilikSendiri, weight: 3 },
  { label: 'Milik Sendiri', value: KRumah.MilikSendiri, weight: 4 }
]

export const JUMLAH_PENGHUNI_OPTIONS: ContWeightOptions[] = [
  { start: 1, end: 2, weight: 1 },
  { start: 3, end: 4, weight: 2 },
  { start: 5, end: 6, weight: 3 },
  { start: 7, end: 9, weight: 4 },
  { start: 10, end: 9999, weight: 4 }
]

export const C3_OPTIONS: DiscFuzzOptions<C3Enum>[] = [
  { label: 'Layak', value: C3Enum.Layak, fuzzy: new FuzzyTuple(0.0, 0.5, 0.75, 'L', 'Layak') },
  { label: 'Cukup Layak', value: C3Enum.CukupLayak, fuzzy: new FuzzyTuple(0.5, 0.75, 1.0, 'Cl', 'Cukup Layak') },
  { label: 'Tidak Layak', value: C3Enum.TidakLayak, fuzzy: new FuzzyTuple(0.5, 0.75, 1.0, 'TL', 'Tidak Layak') }
]

export const KAMAR_MANDI_OPTIONS: DiscWeightOptions<KKamarMandi>[] = [
  { label: 'Sendiri', value: KKamarMandi.Sendiri, weight: 1 },
  { label: 'MCK Komunal / Bersama', value: KKamarMandi.MCKKomunal, weight: 2 },
  { label: 'Tidak Ada', value: KKamarMandi.TidakAda, weight: 3 }
]

export const SUMBER_AIR_OPTIONS: DiscWeightOptions<KSumberAir>[] = [
  { label: 'PDAM', value: KSumberAir.PDAM, weight: 1 },
  { label: 'Air Kemasan', value: KSumberAir.AirKemasan, weight: 2 },
  { label: 'Mata Air, Air Hujan, Sumar', value: KSumberAir.Lain, weight: 3 }
]

export const SUMBER_LISTRIK_OPTIONS: DiscWeightOptions<KSumberListrik>[] = [
  { label: 'PLN Meteran', value: KSumberListrik.PLNMeteran, weight: 1 },
  { label: 'PLN Non Meteran', value: KSumberListrik.PLNNonMeteran, weight: 2 },
  { label: 'Listrik Non PLN / Bukan Listrik', value: KSumberListrik.BukanListrik, weight: 3 }
]
