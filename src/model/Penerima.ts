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

export interface PenerimaEntity extends Penerima {
  _id: string
  _rev: string
  v: 0.00
}

export const defaultPenerima: Penerima = {
  dataset: '',
  nama: '',
  umur: 0,
  pendidikan: KPendidikan.TidakSekolah,
  pekerjaan: KPekerjaan.Buruh,
  penghasilan: 0,
  tanah: KTanah.Bukan,
  rumah: KRumah.BukanMilikSendiri,
  jumlahPenghuni: 1,
  atap: C3Enum.CukupLayak,
  dinding: C3Enum.CukupLayak,
  lantai: C3Enum.CukupLayak,
  kamarMandi: KKamarMandi.MCKKomunal,
  sumberAir: KSumberAir.AirKemasan,
  sumberListrik: KSumberListrik.BukanListrik
}