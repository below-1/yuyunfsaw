import { Penerima } from '@/model/Penerima'
import { KPendidikan } from '@/model/KPendidikan'
import { KPekerjaan } from '@/model/KPekerjaan'
import { C3Enum } from '@/model/C3Enum'
import { KRumah } from '@/model/KRumah'
import { KTanah } from '@/model/KTanah'
import { KSumberAir } from '@/model/KSumberAir'
import { KSumberListrik } from '@/model/KSumberListrik'
import { KKamarMandi } from '@/model/KKamarMandi'
import { CategoryValue } from './optionsTypes'
import { 
  PENDIDIKAN_OPTIONS,
  PEKERJAAN_OPTIONS,
  TANAH_OPTIONS,
  RUMAH_OPTIONS,
  C3_OPTIONS,
  KAMAR_MANDI_OPTIONS,
  SUMBER_AIR_OPTIONS,
  SUMBER_LISTRIK_OPTIONS
} from './options'

function formatCategory<T> (options: CategoryValue<T>[]) {
  return (x: T) => {
    const result = options.find(opt => opt.value === x)
    if (!result) {
      throw new Error(`Can't find category for ${x}`)
    }
    return result.label
  }
}

export function thousand(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const stringFormat = {
  pendidikan: formatCategory<KPendidikan>(PENDIDIKAN_OPTIONS),
  pekerjaan: formatCategory<KPekerjaan>(PEKERJAAN_OPTIONS),
  tanah: formatCategory<KTanah>(TANAH_OPTIONS),
  rumah: formatCategory<KRumah>(RUMAH_OPTIONS),
  c3enum: formatCategory<C3Enum>(C3_OPTIONS),
  kamarMandi: formatCategory<KKamarMandi>(KAMAR_MANDI_OPTIONS),
  sumberAir: formatCategory<KSumberAir>(SUMBER_AIR_OPTIONS),
  sumberListrik: formatCategory<KSumberListrik>(SUMBER_LISTRIK_OPTIONS)
}

export default function (p: Penerima) {
  return {
    umur: `${p.umur} tahun`,
    pendidikan: stringFormat.pendidikan(p.pendidikan),
    pekerjaan: stringFormat.pekerjaan(p.pekerjaan),
    penghasilan: thousand(p.penghasilan),
    tanah: stringFormat.tanah(p.tanah),
    rumah: stringFormat.rumah(p.rumah),
    jumlahPenghuni: `${p.jumlahPenghuni} Jiwa`,
    atap: stringFormat.c3enum(p.atap),
    dinding: stringFormat.c3enum(p.dinding),
    lantai: stringFormat.c3enum(p.lantai),
    kamarMandi: stringFormat.kamarMandi(p.kamarMandi),
    sumberAir: stringFormat.sumberAir(p.sumberAir),
    sumberListrik: stringFormat.sumberListrik(p.sumberListrik)
  }
}