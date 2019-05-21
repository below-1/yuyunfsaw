<template>
  <div>
    <v-container fluid>
      <fsaw-loader :show="loading"/>
      <v-layout v-if="resultFlag === 'idle'" row justify-center class="text-md-center" style="margin-top: 42px;">
        <v-flex md4>
          <div class="display-2 font-weight-bold py-4">Ready To Sorting!!!</div>
          <v-select :items="datasets" v-model="activeDataset" label="Pilih dataset"></v-select>
          <v-btn @click="rank" dark large depressed color="cyan">Start</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <div v-if="resultFlag === 'success'">
      <v-layout row justify-center>
        <v-flex md4 class="text-md-center">
          <div class="display-1 font-weight-bold py-4">Hasil Perangkingan</div>
          <v-btn dark color="primary" large @click="resultFlag = 'idle'">Ulangi</v-btn>
        </v-flex>
      </v-layout>

      <v-divider/>

      <v-layout row justify-center style="margin-top: 42px;">
        <v-flex md6>
          <v-card flat>
            <v-toolbar flat>
              <v-toolbar-title>Bobot Fuzzy SAW</v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="weightHeaders" :items="criteriaKeys" :total-items="criteriaKeys.length" hide-actions="">
              <template v-slot:items="props">
                <td>{{ criteriaKeys[props.index] }}</td>
                <td>{{ result.weightsLabels[props.index] }}</td>
                <td>{{ result.weights[props.index] }}</td>
                <td>{{ result.weightsNormalized[props.index] }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>

      <v-divider/>
      <hot-table
        :data="result.dataVs"
        readOnly
        :columnSorting="true"
        :manualColumnResize="true"
        :manualRowResize="true"
        :stretchH="hot.stretchH"
        :stretchV="hot.stretchV"
        :columns="hot.colMappings"
        :colHeaders="hot.colHeaders"
        :rowHeaders="hot.rowHeaders"
        :manualColumnFreeze="hot.manualColumnFreeze"
        :fixedColumnsLeft="hot.fixedColumnsLeft"
        style="overflow: hidden; width: 100%; height: 500px; z-index: 4;"
        licenseKey="non-commercial-and-evaluation">
      </hot-table>
      <!-- <v-card flat>
        <v-toolbar flat>
          <v-toolbar-title>Ranking</v-toolbar-title>
        </v-toolbar>
      
      </v-card> -->
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { HotTable } from '@handsontable/vue'
import settings from '@/services/settings'
import repo from '@/services/repo'
import pouchDB from '@/services/pouchDB'
import fsaw from '@/services/fsaw'

const nCritArray = Array.from(Array(13).keys())
const criteriaKeys = nCritArray.map(i => `C${i+1}`)
const weightHeaders = ['Kriteria', 'Fuzzy', 'Crisp', 'Normalisasi Crisp']

const numericFormat = {
  pattern: {
    trimMantissa: true,
    mantissa: 3
  }
};

const hotColMappings = [
  { data: 'nama' },
  { data: 'c1', type: 'numeric', numericFormat },
  { data: 'c2', type: 'numeric', numericFormat } ,
  { data: 'c3', type: 'numeric', numericFormat },
  { data: 'c4', type: 'numeric', numericFormat },
  { data: 'c5', type: 'numeric', numericFormat },
  { data: 'c6', type: 'numeric', numericFormat },
  { data: 'c7', type: 'numeric', numericFormat },
  { data: 'c8', type: 'numeric', numericFormat },
  { data: 'c9', type: 'numeric', numericFormat },
  { data: 'c10', type: 'numeric', numericFormat },
  { data: 'c11', type: 'numeric', numericFormat },
  { data: 'c12', type: 'numeric', numericFormat },
  { data: 'c13', type: 'numeric', numericFormat },
  { data: 'v', type: 'numeric', numericFormat }
]

// const worker = new Worker('@/worker/fsaw.worker', { type: 'module' })

const rankHeaders = [
  'Alternative',
  ...criteriaKeys,
  'v'
]

@Component({
  name: 'FsawRanking',
  components: {
    HotTable
  },
  data () {
    return {
      datasets: [],
      activeDataset: '',
      loading: false,
      resultFlag: 'idle',
      result: {
        weights: [],
        weightsLabels: [],
        weightsNormalized: [],
        dataVs: []
      },
      hot: {
        colMappings: hotColMappings,
        colHeaders: rankHeaders,
        rowHeaders: true,
        colWidths: 100,
        stretchH: 'all',
        stretchV: 'all',
        preventOverflow: 'horizontal',
        manualColumnFreeze: true,
        fixedColumnsLeft: 1
      },
      weightHeaders: weightHeaders.map(t => ({ text: t, sortable: false })),
      criteriaKeys,
      rankHeaders: rankHeaders.map(t => ({ text: t, sortable: false }))
    }
  },
  mounted () {
    this.loadSettings()
  },
  methods: {
    loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
    },
    async rank () {
      this.loading = true
      let data = await repo.findAll(this.activeDataset, '')
      let weightsFuzzy = settings.weights

      const result = await fsaw({ data, weightsFuzzy })
      const promises = result.dataVs.map(async pen => {
        const { norm, ...data } = pen
        await pouchDB.put(data)
      })
      await Promise.all(promises)

      this.result = result
      this.result.dataVs = result.dataVs.map(dvs => {
        let hotDvs = {}
        hotDvs.nama = dvs.nama
        nCritArray.forEach((critKey) => {
          hotDvs[`c${critKey + 1}`] = dvs.norm[critKey]
        })
        hotDvs.v = dvs.v
        return hotDvs
      })

      this.loading = false
      this.resultFlag = 'success'
    }
  }
})
export default class FsawRanking extends Vue {}
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
