<template>
  <div>
    <data-toolbar @param-change="setParams"/>
    <fsaw-data-table v-if="mode === 'table'" :dataset="dataset" :keyword="keyword"/>
    <fsaw-data-list v-else :dataset="dataset" :keyword="keyword"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { HotTable } from '@handsontable/vue'
import DataToolbar from '@/components/DataToolbar.vue'
import FsawDataTable from './table.vue'
import FsawDataList from './list.vue'
import Handsontable from 'handsontable'
import settings from '@/services/settings'
import repo from '@/services/repo'
import formatString from '@/services/converter/format'

@Component({
  name: 'Data',
  components: {
    HotTable,
    DataToolbar,
    FsawDataTable,
    FsawDataList
  },
  data () {
    return {
      keyword: '',
      dataset: '',
      mode: 'list'
    }
  },
  methods: {
    setParams (data) {
      this.dataset = data.dataset
      this.keyword = data.keyword
      this.mode = data.mode
    }
  }
})
export default class Data extends Vue {}
</script>

<style lang="scss">
</style>
