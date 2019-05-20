<template>
  <div>
    <v-container fluid>
      <fsaw-loader :show="loading"/>
      <v-layout v-if="resultFlag === 'idle'" row justify-center class="text-md-center" style="margin-top: 42px;">
        <v-flex md4>
          <div class="display-2 font-weight-bold py-4">Ready To Sorting!!!</div>
          <v-btn @click="rank" dark large depressed color="cyan">Start</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    <div v-if="resultFlag === 'success'">
      <v-layout row justify-center>
        <v-flex md4 class="text-md-center">
          <div class="display-1 font-weight-bold py-4">Hasil Perangkingan</div>
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

      <v-layout row justify-center style="margin-top: 20px;">
        <v-flex md10>
          <v-card flat>
            <v-toolbar flat>
              <v-toolbar-title>Ranking</v-toolbar-title>
            </v-toolbar>
            <v-data-table :headers="rankHeaders" :items="result.dataVs" :total-items="result.dataVs.length" hide-actions="">
              <template v-slot:items="props">
                <td>{{ props.item.nama }}</td>
                <template v-for="idx in 13">
                  <td :key="`${props.item.id}-crit-${idx}`">{{ props.item.norm[idx - 1].toFixed(4) }}</td>
                </template>
                <td>{{ props.item.v }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'
import fsaw from '@/services/fsaw'
import * as threads from 'threads'

const criteriaKeys = Array.from(Array(13).keys()).map(i => `C${i+1}`)
const weightHeaders = ['Kriteria', 'Fuzzy', 'Crisp', 'Normalisasi Crisp']

const rankHeaders = [
  'Alternative',
  ...criteriaKeys,
  'v'
]

@Component({
  name: 'FsawRanking',
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
      // this.loading = true
      // let x = 10
      // const thread = threads.spawn(fsawWorker)
      // thread
      //   .send({ dataset: this.activeDataset })
      //   .on('message', resp => {
      //     // this.resultFlag = 'success'
      //     console.log('result=', resp)
      //   })
      //   .on('error', err => {
      //     console.log('error--->')
      //     console.log(err)
      //     this.loading = false
      //   })
      //   .on('done', () => {
      //     console.log('done')
      //     thread.kill()
      //     this.loading = false
      //   })
    }
  }
})
export default class FsawRanking extends Vue {}
</script>

<style>

</style>
