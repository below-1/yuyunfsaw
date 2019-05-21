<template>
  <div>
    <fsaw-loader :show="loading" />
    <v-container>
      <v-layout row fill-height justify-center>
        <v-flex md6 justify-center class="text-xs-center" style="padding-top: 80px;">
          <input type="file" ref="fileInput" v-on:change="onFileChange" style="display: none"/>
          <div class="display-2 mb-4">Pilih CSV untuk diimport</div>
        </v-flex>
      </v-layout>
      <v-layout row fill-height justify-center>
        <v-flex md4 justify-center class="text-xs-center">
          <v-select label="Pilih Dataset" class="py-4" :items="datasets" v-model="activeDataset"/>
          <v-select label="Aksi" class="py-2" :items="actionOptions" v-model="action"/>
        </v-flex>
      </v-layout>
      <v-layout row fill-height justify-center>
        <v-flex md4 justify-center class="text-xs-center">
          <v-btn large dark color="cyan" @click="$refs.fileInput.click()" v-bind:disabled="activeDataset === ''">
            Pilih File
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'
import pouchDB from '@/services/pouchDB'
import repo from '@/services/repo'
import csv from 'csvtojson'
import fromCsv from '@/services/converter/fromCsv'

@Component({
  name: 'Backup',
  data () {
    return {
      loading: false,
      fileProcessed: false,
      isSaving: false,
      isError: false,
      activeDataset: '',
      datasets: [],
      actionOptions: ['tambah', 'ganti'],
      action: 'tambah'
    }
  },
  methods: {
    loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
    },
    test () {
      this.$refs.fileInput.click()
    },
    async deleteData () {
      const dataset = this.activeDataset
      const result = await this.$db.find({
        selector: {
          dataset
        }
      })
      for (let i = 0; i < result.docs.length; i++) {
        let doc = result.docs[i]
        let _id = doc._id
        let _rev = doc._rev
        await this.$db.remove(_id, _rev)
      }
    },
    onFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      let reader = new FileReader()
      reader.addEventListener('load', () => {
        this.saveData(reader.result)
      })
      if (files && files.length > 0) {
        reader.readAsText(files[0])
      }
    },
    async saveData (rawString) {
      this.error = false
      this.loading = true
      const csvData = await csv({ noheader: true, output: 'csv' }).fromString(rawString)
      // console.log(csvData)
      const processed = csvData
        .map(fromCsv)
        .map(doc => {
          const id = repo.randomID()
          return {
            dataset: this.activeDataset,
            _id: id,
            ...doc,
            v: 0.00
          }
        })
      try {
        if (this.action === 'ganti') {
          await this.deleteData()
        }
        await pouchDB.bulkDocs(processed)
      } catch (err) {
        console.log(err)
        this.error = true
      } finally {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadSettings()
  }
})
export default class Backup extends Vue {}
</script>

<style>

</style>
