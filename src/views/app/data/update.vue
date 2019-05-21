<template>
  <div>
    <fsaw-loader :show="loading"/>
    <v-container>
      <v-layout row justify-center>
        <v-flex xs12 md6>
          <v-card flat>
            <v-toolbar dense flat dark color="primary lighten-1">
              <v-toolbar-title>Tambah Data</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-select
                :items="datasets"
                v-model="penerima.dataset"
                label="Dataset"
              />
              <template v-for="fd in fieldsDescriptions">
                <v-text-field v-if="fd.type === 'number'"
                  :key="`add-field-${fd.field}`"
                  type="number"
                  v-model="penerima[fd.field]"
                  :min="fd.min"
                  :max="fd.max"
                  :label="fd.label"
                />
                <v-select v-if="fd.type === 'option'"
                  :key="`add-field-${fd.field}`"
                  :items="options[fd.field]"
                  v-model="penerima[fd.field]"
                  :label="fd.label"
                />
                <v-text-field v-if="fd.type === 'short-text'"
                  :key="`add-field-${fd.field}`"
                  v-model="penerima[fd.field]"
                  :label="fd.label"
                />
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn v-bind:disabled="dataInvalid" flat @click="doUpdatePenerima">Simpan</v-btn>
              <v-btn flat>Batal</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'
import { Penerima, defaultPenerima } from '@/model/Penerima'
import { vuetifyOptions } from '@/services/converter/options'
import repo from '@/services/repo'

const fieldsDescriptions = [
  {
    type: 'short-text',
    field: 'nama',
    label: 'Nama'
  },
  {
    type: 'number',
    field: 'umur',
    min: 1,
    max: 100,
    label: 'Umur'
  },
  {
    type: 'option',
    field: 'pendidikan',
    label: 'Pendidikan'
  },
  {
    type: 'option',
    field: 'pekerjaan',
    label: 'Pekerjaan'
  },
  {
    type: 'number',
    field: 'penghasilan',
    min: 1,
    max: 9999999,
    label: 'Penghasilan'
  },
  {
    type: 'option',
    field: 'tanah',
    label: 'Kepemilikan Tanah'
  },
  {
    type: 'option',
    field: 'rumah',
    label: 'Kepemilikan Rumah'
  },
  {
    type: 'number',
    field: 'jumlahPenghuni',
    min: 1,
    max: 9,
    label: 'Jumlah Penghuni'
  },
  {
    type: 'option',
    field: 'atap',
    label: 'Kondisi Atap'
  },
  {
    type: 'option',
    field: 'dinding',
    label: 'Kondisi Dinding'
  },
  {
    type: 'option',
    field: 'lantai',
    label: 'Kondisi Lantai'
  },
  {
    type: 'option',
    field: 'kamarMandi',
    label: 'Kamar Mandi'
  },
  {
    type: 'option',
    field: 'sumberAir',
    label: 'Sumber Air'
  },
  {
    type: 'option',
    field: 'sumberListrik',
    label: 'Sumber Listrik'
  }
]

@Component({
  props: ['id'],
  name: 'UpdateData',
  data () {
    return {
      loading: true,
      penerima: defaultPenerima,
      rev: '',
      options: vuetifyOptions,
      fieldsDescriptions,
      datasets: [],
      activeDataset: ''
    }
  },
  computed: {
    dataInvalid () {
      return this.penerima.nama === '' && this.activeDataset === ''
    }
  },
  mounted () {
    this.loadSettings()
      .then(() => this.loadDataPenerima())
  },
  methods: {
    async loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
    },
    async doUpdatePenerima () {
      await repo.update(this.id, this.rev, this.penerima)
      alert(`Sukses mengubah data`)
      this.$router.push('/app/data')
    },
    async loadDataPenerima () {
      if (!this.id) return
      this.loading = true
      const { _rev, ...penerima } = await repo.findById(this.id)
      this.rev = _rev
      this.penerima = penerima
      this.loading = false
    }
  }
})
export default class AddData extends Vue {}
</script>

<style>

</style>
