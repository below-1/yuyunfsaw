import {
  DiscFuzzOptions,
  DiscWeightOptions
} from './optionsTypes'
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
import { KPekerjaan } from '@/model/KPekerjaan'
import { KPendidikan } from '@/model/KPendidikan'
import { C3Enum } from '@/model/C3Enum'
import { KRumah } from '@/model/KRumah'
import { KTanah } from '@/model/KTanah'
import { KSumberAir } from '@/model/KSumberAir'
import { KSumberListrik } from '@/model/KSumberListrik'
import { KKamarMandi } from '@/model/KKamarMandi'

type LabelAndValue<T> = DiscWeightOptions<T> | DiscFuzzOptions<T>
type DiscConverter<T> = (s: string) => T
function discConverter<T> (options: LabelAndValue<T>[]) : DiscConverter<T> {
  return (s: string) => {
    const result = options.find(v => v.label === s)
    if (result === undefined) {
      throw new Error(`Can't parse pekerjaan value (${s})`)
    }
    return result.value
  }
}

const pekerjaanConverter = discConverter<KPekerjaan>(PEKERJAAN_OPTIONS)
const pendidikanConverter = discConverter<KPendidikan>(PENDIDIKAN_OPTIONS)
const c3Converter = discConverter<C3Enum>(C3_OPTIONS)
const rumahConverter = discConverter<KRumah>(RUMAH_OPTIONS)
const tanahConverter = discConverter<KTanah>(TANAH_OPTIONS)
const sumberAirConverter = discConverter<KSumberAir>(SUMBER_AIR_OPTIONS)
const sumberListrikConverter = discConverter<KSumberListrik>(SUMBER_LISTRIK_OPTIONS)
const kamarMandiConverter = discConverter<KKamarMandi>(KAMAR_MANDI_OPTIONS)

export default (row: string[]) => {
  const nama = row[0]
  const umur = parseInt(row[1])
  const pendidikan = pendidikanConverter(row[2])
  const pekerjaan = pekerjaanConverter(row[3])

  let penghasilan: any = row[4]
  // 300 _ rb/bln
  penghasilan = penghasilan.split(' ')[0]
  penghasilan = penghasilan.replace('.', '')
  // append trailing zeros 000
  penghasilan = penghasilan + '000'
  penghasilan = parseInt(penghasilan)

  const tanah = tanahConverter(row[5])
  const rumah = rumahConverter(row[6])
  const jumlahPenghuni = parseInt(row[7].split(' ')[0])
  const atap = c3Converter(row[8])
  const dinding = c3Converter(row[9])
  const lantai = c3Converter(row[10])
  const kamarMandi = kamarMandiConverter(row[11])
  const sumberAir = sumberAirConverter(row[12])
  const sumberListrik = sumberListrikConverter(row[13])

  return {
    nama,
    umur,
    pendidikan,
    pekerjaan,
    penghasilan: penghasilan as number,
    tanah,
    rumah,
    jumlahPenghuni,
    atap,
    dinding,
    lantai,
    kamarMandi,
    sumberAir,
    sumberListrik
  }
}
