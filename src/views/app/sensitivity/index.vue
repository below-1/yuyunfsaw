<template>
  <div>
    <v-container fluid>
      <fsaw-loader :show="loading"/>
      <v-layout v-if="resultFlag === 'idle'" row justify-center class="text-md-center" style="margin-top: 42px;">
        <v-flex md4>
          <div class="display-2 font-weight-bold py-4">Pengujian Sensitivitas</div>
          <v-select :items="datasets" v-model="activeDataset" label="Pilih dataset"></v-select>
          
          <v-text-field
            v-for="(w, idx) in weights"
            :key="`criteria-${idx}-weight`"
            :label="`C${idx+1}`"
            type="number"
            :min="0"
            :max="1"
            step="0.01"
            v-model.number="weights[idx]">
          </v-text-field>

          <v-btn @click="runSense" dark large depressed color="cyan">Start</v-btn>
        </v-flex>
      </v-layout>

      <v-divider/>
      <div v-if="resultFlag === 'success'">
        <v-layout row justify-center class="text-md-center">
          <v-flex md8>
            <div class="title py-2">
              Total Data Benar: {{ dataWithVs.length - totalChange }}
            </div>
            <div class="title py-2">
              Total Data Salah: {{ totalChange }}
            </div>
          </v-flex>
        </v-layout>
        <v-layout row justify-center style="margin-top: 42px;">
          <v-flex md8>
            <v-card flat>
              <v-toolbar flat>
                <v-toolbar-title>Hasil Sensitivitas</v-toolbar-title>
                <v-spacer/>
                <v-btn flat @click="resultFlag = 'idle'">Ulangi</v-btn>
              </v-toolbar>
              <v-data-table :headers="resultHeaders" :items="dataWithVs" :total-items="dataWithVs.length" hide-actions="">
                <template v-slot:items="props">
                  <tr v-bind:class="{ 'red white--text': props.item.changed }">
                    <td>{{ props.item.nama }}</td>
                    <td>{{ props.item.oriV }}</td>
                    <td>{{ props.item.weightedV }}</td>
                    <td>{{ props.item.changed }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </div>

    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'
import repo from '@/services/repo'
import { fsawWeighted } from '@/services/fsaw'

const criteriaKeys = [
  'umur', 'pendidikan', 'pekerjaan',
  'penghasilan', 'tanah', 'rumah',
  'jumlahPenghuni', 'atap', 'dinding', 'lantai',
  'kamarMandi', 'sumberAir', 'sumberListrik',
]

const resultHeaders = [
  { text: 'Nama', value: 'nama' },
  { text: 'Preferensi Asli', value: 'oriV' },
  { text: 'Preferensi (Ubah)', value: 'weightedV' },
  { text: 'Hasil', value: 'changed' },
]

@Component({
  name: 'Sensitivity',
  data () {
    return {
      datasets: [],
      activeDataset: '',
      loading: false,
      resultFlag: 'idle',
      criteriaKeys,
      weights: [],
      dataWithVs: [],
      resultHeaders
    }
  },
  mounted () {
    this.loadSettings()
  },
  computed: {
    totalChange () {
      return this.dataWithVs.filter(d => d.changed).length
    }
  },
  methods: {
    loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
      let weightsFuzzy = settings.weights
      const crisp = x => (x.a + x.b + x.c) / 3.0
      this.weights = criteriaKeys.map(k => {
        return crisp(weightsFuzzy[k])
      })
    },
    async runSense () {
      this.loading = true
      const weights = this.weights

      let weightsFuzzy = settings.weights
      const crisp = x => (x.a + x.b + x.c) / 3.0
      const originalWeights =  criteriaKeys.map(k => {
        return crisp(weightsFuzzy[k])
      })
      
      const data = await repo.findAll(this.activeDataset, '')

      let weightedResult = (await fsawWeighted({ data, weights })).dataVs
      let oriResult = (await fsawWeighted({ data, weights: originalWeights })).dataVs
      const compareDataV = (a, b) => {
        return b.v - a.v
      }

      weightedResult = weightedResult.sort(compareDataV)
      oriResult = oriResult.sort(compareDataV)

      const n = data.length
      let dataWithVs = []
      for (let i = 0; i < n; i++) {
        let ori = oriResult[i]
        let weighted = weightedResult[i]
        let changed = false
        let oriV = ori.v
        let weightedV = weighted.v
        if (ori._id !== weighted._id) {
          changed = true
        }

        let nama = ori.nama
        let id = ori.id
        dataWithVs.push({
          id,
          nama,
          oriV,
          weightedV,
          changed
        })
      }
      this.dataWithVs = dataWithVs

      this.loading = false
      this.resultFlag = 'success'
    }
  }
})
export default class Sensitivity extends Vue {

}
</script>

<style>

</style>
