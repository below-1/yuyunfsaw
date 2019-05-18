<template>
  <router-view/>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'

@Component({
  name: 'Data',
  data () {
    return {
      datasets: [],
      activeDataset: undefined
    }
  },
  mounted () {
    this.loadSettings()
  },
  methods: {
    async loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
    }
  }
})
export default class Data extends Vue {}
</script>

<style>

</style>
