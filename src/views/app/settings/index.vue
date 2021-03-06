<template>
  <div>
    <v-toolbar flat>
      <v-toolbar-title>Pengaturan</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="saveData" dark depressed color="cyan">Simpan</v-btn>
    </v-toolbar>
    <v-container fluid>
      <v-layout row>
        <v-flex md6>
          <v-card flat>
            <v-toolbar dark color="primary lighten-2" dense flat>
              <v-toolbar-title>Umum</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field v-model="appName" label="Nama Applikasi" />
              <v-textarea
                label="Deskripsi Lengkap"
                v-model="description"
              ></v-textarea>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row class="py-4">
        <v-flex md6>
          <v-card flat>
            <v-toolbar dark color="primary lighten-2" dense flat>
              <v-toolbar-title>Akun</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-text-field v-model="username" label="Username" />
              <v-text-field v-model="password" label="Password" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row class="py-4">
        <v-flex md6>
          <v-card flat>
            <v-toolbar dark color="primary lighten-2" dense flat>
              <v-toolbar-title>Dataset</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn flat dark color="primary" icon @click="addDatasetDialog = true">
                <v-icon>create</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-list>
                <template v-for="(dataset, idx) in datasets">
                  <v-list-tile :key="`setting-dataset-${idx}`">
                    <v-list-tile-avatar>{{ idx + 1 }}</v-list-tile-avatar>
                    <v-list-tile-title class="title">{{dataset}}</v-list-tile-title>
                    <v-list-tile-action>
                      <v-switch
                        v-bind:value="activeDataset === dataset"
                        readonly
                        @click="changeDataset(dataset)"
                      />
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider :key="`setting-dataset-divider-${idx}`"/>
                </template>
              </v-list>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row class="py-4">
        <v-flex md8>
          <v-card flat>
            <v-toolbar dark color="primary lighten-2" dense flat>
              <v-toolbar-title>Aturan</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>

              <v-layout row v-for="(ruleKey, idx) in ruleKeys" :key="`rule-list-tile-${idx}`">
                <v-flex xs4>
                  Aturan {{ruleKey}}
                </v-flex>
                <v-flex xs8>
                  <v-select :items="ruleOptions" v-model="weights[`${ruleKey}`]" :label="`Aturan ${ruleKey}`" />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>

      <v-dialog v-model="addDatasetDialog" max-width="500">
        <v-card>
          <v-card-title>Tambah Dataset Baru</v-card-title>
          <v-card-text>
            <v-text-field v-model="addDatasetVal" label="Nama Dataset Baru"/>
          </v-card-text>
          <v-card-actions>
            <v-btn flat small v-bind:disabled="addDatasetVal === ''" @click="doAddDataset">Simpan</v-btn>
            <v-btn flat small @click="addDatasetDialog = false">Batal</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>  
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import settings from '@/services/settings'
import defaultFuzzyRules from '@/model/defaultFuzzyRules'
import FMain from '@/model/FMain'

const FMainList = [
  FMain.sr,
  FMain.r,
  FMain.c,
  FMain.t,
  FMain.st
]
const vuetifyRuleOption = (rule) => {
  // console.log('rule=', rule)
  const label = rule.label
  const a = rule.a
  const b = rule.b
  const c = rule.c
  const text = `${label} [${a.toFixed(2)}, ${b.toFixed(2)}, ${c.toFixed(2)}]`
  const value = rule
  return { text, value }
}

const FMainOptions = FMainList.map(vuetifyRuleOption)

const ruleKeys = [
  'umur',
  'pendidikan',
  'pekerjaan',
  'penghasilan',
  'tanah',
  'rumah',
  'jumlahPenghuni',
  'atap',
  'dinding',
  'lantai',
  'kamarMandi',
  'sumberAir',
  'sumberListrik'
]

@Component({
  name: 'AppSettings',
  data () {
    return {
      appName: '',
      description: '',
      weights: defaultFuzzyRules,
      datasets: [],
      activeDataset: '',
      username: '',
      password: '',
      addDatasetDialog: false,
      addDatasetVal: '',
      ruleOptions: FMainOptions,
      ruleKeys
    }
  },
  methods: {
    loadData () {
      this.appName = settings.appName
      this.description = settings.description
      this.weights = settings.weights
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
      this.username = settings.activeDataset
      this.password = settings.password
    },
    saveData () {
      settings.appName = this.appName
      settings.description = this.description
      settings.weights = this.weights
      settings.datasets = this.datasets
      settings.activeDataset = this.activeDataset
      settings.username = this.username
      settings.password = this.password
      this.loadData()
    },
    doAddDataset () {
      if (this.addDatasetVal === '') {
        return
      }
      this.datasets.push(this.addDatasetVal)
    },
    changeDataset (dataset) {
      this.activeDataset = dataset
      console.log('HERE')
    },
    ruleOptions (rule) {
      const label = rule.label
      const a = rule.a
      const b = rule.b
      const c = rule.c
      return `${label} [${a.toFixed(2)}, ${b.toFixed(2)}, ${c.toFixed(2)}]`
    }
  },
  mounted () {
    this.loadData()
  }
})
export default class AppSettings extends Vue {}
</script>

<style>

</style>
