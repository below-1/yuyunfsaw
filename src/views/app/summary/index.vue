<template>
  <v-container fluid>
    <v-layout row>
      <v-flex md6 class="text-md-center">
        <div class="headline">Rangkuman Data</div>
        <v-select @change="onDatasetChange" :items="datasets" v-model="activeDataset" label="Pilih Dataset..."></v-select>
      </v-flex>
    </v-layout>
  </v-container>  
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'
import fuzzy from '@/services/converter/fuzzy'
import summary from '@/services/summary'
import repo from '@/services/repo'

@Component({
  name: 'DataSummary',
  data () {
    return {
      datasets: [],
      activeDataset: ''
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
    onDatasetChange (val) {
      this.loadData(val)
    },
    async loadData (dataset) {
      const processed = await summary(dataset)
      console.log(processed)
    }
  }
})
export default class DataSummary extends Vue {}
</script>

<style>

</style>
