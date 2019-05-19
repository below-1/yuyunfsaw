<template>
  <div>
    <v-toolbar dense flat>
      <v-toolbar-title>Data Penerima</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat>Tambah</v-btn>
    </v-toolbar>
    <hot-table
      :data="items"
      :readOnly="true"
      :columns="hot.colMappings"
      :colHeaders="hot.colHeaders"
      :colWidths="hot.colWidths"
      :rowHeaders="hot.rowHeaders"
      :stretchH="hot.stretchH"
      :stretchV="hot.stretchV"
      :preventOverflow="hot.preventOverflow"
      :manualColumnFreeze="hot.manualColumnFreeze"
      :fixedColumnsLeft="hot.fixedColumnsLeft"
      :wordWrap="false"
      style="overflow: hidden; width: 100%; height: 500px;"
      licenseKey="non-commercial-and-evaluation"></hot-table>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { HotTable } from '@handsontable/vue'
import Handsontable from 'handsontable'
import settings from '@/services/settings'
import repo from '@/services/repo'
import formatString from '@/services/converter/format'

const headers = [
  { text: '#', value: '_id' },
  { text: 'Nama', value: 'nama' },
  { text: 'Umur', value: 'format.umur' },
  { text: 'pd', value: 'format.pendidikan' },
  { text: 'PK', value: 'format.pekerjaan' },
  { text: 'PH', value: 'format.penghasilan' },
  { text: 'TNH', value: 'format.tanah' },
  { text: 'RMH', value: 'format.rumah' },
  { text: 'JPGH', value: 'format.jumlahPenghuni' },
  { text: 'ATP', value: 'format.atap' },
  { text: 'DDG', value: 'format.dinding' },
  { text: 'LTI', value: 'format.lantai' },
  { text: 'KM', value: 'format.kamarMandi' },
  { text: 'S.AIR', value: 'format.sumberAir' },
  { text: 'S.LTR', value: 'format.sumberListrik' }
]

const colWidths = [
  250, 250, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200
]

let hotColMappings = headers.map(h => ({ data: h.value }))
// Change renderer of first column
hotColMappings[0] = {
  data: '_id',
  renderer: function(instance, td, row, col, prop, value, cellProperties) {
    const butt = document.createElement('div')
    butt.setAttribute('class', `hot-butt-container`)
    const buttInnerHTML = `
    <button type="button" class="v-btn v-btn--small v-btn--icon theme--light blue--text">
      <div class="v-btn__content">
        <i aria-hidden="true" class="v-icon material-icons theme--light">create</i>
      </div>
    </button>
    <button type="button" class="v-btn v-btn--small v-btn--icon theme--light pink--text">
      <div class="v-btn__content">
        <i aria-hidden="true" class="v-icon material-icons theme--light">clear</i>
      </div>
    </button>
    <div class="pl-4 subtitle">${value}</div>
    `
    butt.innerHTML = buttInnerHTML
    Handsontable.dom.empty(td)
    td.appendChild(butt)
    return td
  }
}
const hotColHeaders =  [ '#', 'Nama', 'Umur', 'Pendidikan', 'Pekerjaan', 'Penerima', 'Penghasilan', 'Rumah', 'Jumlah Penghuni', 'Atap', 'Dinding', 'Lantai', 'Kamar Mandi', 'Sumber Air', 'Sumber Listrik' ]

@Component({
  name: 'Data',
  components: {
    HotTable
  },
  data () {
    return {
      datasets: [],
      activeDataset: undefined,
      headers,
      items: [],
      data: [
        ["", "Ford", "Volvo", "Toyota", "Honda"],
        ["2016", 10, 11, 12, 13],
        ["2017", 20, 11, 14, 13],
        ["2018", 30, 15, 12, 13]
      ],
      hot: {
        colMappings: hotColMappings,
        colHeaders: hotColHeaders,
        rowHeaders: true,
        colWidths: 100,
        stretchH: 'all',
        stretchV: 'all',
        preventOverflow: 'horizontal',
        manualColumnFreeze: true,
        fixedColumnsLeft: 2,
        colWidths
      }
    }
  },
  mounted () {
    this.reload()
  },
  methods: {
    async loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
    },
    async loadData () {
      const items = await repo.findAll(this.activeDataset)
      // this.items = items
      this.items = items.map(p => ({
        ...p,
        format: formatString(p)
      }))
    },
    async reload () {
      await this.loadSettings()
      await this.loadData()
    },
    hotColumnFunc (col) {
      return headers[col]
    }
  }
})
export default class Data extends Vue {}
</script>

<style lang="scss">
@import "~handsontable/dist/handsontable.full.css";

.hot-container {
  width: 100%;
  height: 1000px;
  overflow-x: hidden;
}
.hot-butt-container {
  display: flex;
  flex-direction: row;
  align-items: center;

  button {
    margin: 0;
  }
  button:first-child {
    margin-right: 6px;
  }
}
</style>
