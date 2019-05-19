<template>
  <div>
    <fsaw-loader :show="loading"/>
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
      style="overflow: hidden; width: 100%; height: 500px; z-index: 4;"
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
  data: function (d) {
    return { _id: d._id, _rev: d._rev }
  },
  renderer: function(instance, td, row, col, prop, value, cellProperties) {
    const butt = document.createElement('div')
    butt.setAttribute('class', `hot-butt-container`)
    const buttInnerHTML = `
      <i id="fsaw-hot-btn-upd-${value._id}"
        aria-hidden="true" class="v-icon material-icons theme--light"
        data-fsaw-id="${value._id}"
        data-fsaw-rev="${value._rev}">create</i>
      <i id="fsaw-hot-btn-del-${value._id}"
        data-fsaw-id="${value._id}"
        data-fsaw-rev="${value._rev}"
        aria-hidden="true"
        class="v-icon material-icons theme--light">clear</i>
    <div class="pl-4 subtitle">${value._id}</div>
    `
    butt.innerHTML = buttInnerHTML
    Handsontable.dom.empty(td)
    td.appendChild(butt)
    return td
  }
}
const hotColHeaders =  [ '#', 'Nama', 'Umur', 'Pendidikan', 'Pekerjaan', 'Penghasilan', 'Tanah', 'Rumah', 'Jumlah Penghuni', 'Atap', 'Dinding', 'Lantai', 'Kamar Mandi', 'Sumber Air', 'Sumber Listrik' ]

var updHandler = undefined
var delHandler = undefined

@Component({
  name: 'FsawDataTable',
  props: ['keyword', 'dataset'],
  components: {
    HotTable
  },
  data () {
    return {
      loading: false,
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
    // Event delegation for dynamic button inside HOT table
    updHandler = (e) => {
      if (e.target) {
        console.log(e.target)
        const id = e.target.id
        if (id.startsWith('fsaw-hot-btn-upd')) {
          const pouchId = e.target.getAttribute('data-fsaw-id')
          const pouchRev = e.target.getAttribute('data-fsaw-rev')
          this.$router.push(`/app/update-data/${pouchId}`)
        }
      }
      e.stopPropagation()
    }
    document.addEventListener('click', updHandler)
  },
  beforeDestroy () {
    if (updHandler) {
      document.removeEventListener('click', updHandler)
    }
  },
  methods: {
    async loadData (dataset, keyword) {
      this.loading = true
      const items = await repo.findAll(dataset, keyword)
      // this.items = items
      this.items = items.map(p => ({
        ...p,
        format: formatString(p)
      }))
      this.loading = false
    },
    async reload () {
      await this.loadData(this.dataset, this.keyword)
    },
    hotColumnFunc (col) {
      return headers[col]
    }
  },
  watch: {
    keyword: function (val) {
      this.loadData(this.dataset, val)
    },
    dataset: function (val) {
      this.loadData(val, this.keyword)
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

  i {
    margin: 0;
  }
  i:first-child {
    margin-right: 6px;
  }
}
</style>
