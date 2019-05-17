import { KPendidikan } from './KPendidikan'
import { KPekerjaan } from './KPekerjaan'
import { KTanah } from './KTanah'
import { KRumah } from './KRumah'
import { C3Enum } from './C3Enum'
import { KKamarMandi } from './KKamarMandi'
import { KSumberAir } from './KSumberAir'
import { KSumberListrik } from './KSumberListrik'

export interface Penerima {
  dataset: string
  nama: string
  umur: number
  pendidikan: KPendidikan
  pekerjaan: KPekerjaan
  penghasilan: number
  tanah: KTanah
  rumah: KRumah
  jumlahPenghuni: number
  atap: C3Enum
  dinding: C3Enum
  lantai: C3Enum
  kamarMandi: KKamarMandi
  sumberAir: KSumberAir
  sumberListrik: KSumberListrik
}