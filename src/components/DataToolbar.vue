<template>
  <v-toolbar flat color="primary" dark>
    <v-select :items="datasets" v-model="activeDataset" @change="onDatasetChange" style="max-width: 200px;"></v-select>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-text-field
        flat
        class="mx-2"
        label="Keyword..."
        prepend-inner-icon="search"
        v-model="keyword"
        @change="onKeywordChange"
      />
      <v-btn-toggle v-model="mode" @change="onModeChange" class="white--text primary">
        <v-btn flat icon value="list">
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn flat icon value="table">
          <v-icon>border_all</v-icon>
        </v-btn>
      </v-btn-toggle>
      <v-btn flat icon to="/app/add-data">
        <v-icon>create</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>  
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import settings from '@/services/settings'

@Component({
  name: 'DataToolbar',
  data () {
    return {
      datasets: [],
      activeDataset: '',
      keyword: '',
      mode: 'list'
    }
  },
  mounted () {
    this.loadSettings()
    this.onParamChange({})
  },
  methods: {
    onDatasetChange (event) {
      this.onParamChange({ dataset: event })
    },
    onKeywordChange (event) {
      this.onParamChange({ keyword: event })
    },
    onModeChange (event) {
      this.onParamChange({ mode: event })
    },
    onParamChange ({ dataset, keyword, mode }) {
      let result = { dataset, keyword, mode }
      if (!dataset) result.dataset = this.activeDataset
      if (!keyword) result.keyword = this.keyword
      if (!mode) result.mode = this.mode
      this.$emit('param-change', result)
    },
    async loadSettings () {
      this.datasets = settings.datasets
      this.activeDataset = settings.activeDataset
    }
  }
})
export default class DataToolbar extends Vue {}
</script>

<style>

</style>
