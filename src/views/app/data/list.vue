<template>
  <v-container fluid grid-list-xs>

    <fsaw-loader :show="loading"/>

    <v-layout row>
      <v-flex md6>
        <v-data-table
          :items="items"
          :headers="headers"
        >
        <template v-slot:items="props">
          <tr @click="selectedId = props.item._id">
            <td>{{ props.item._id }}</td>
            <td>{{ props.item.nama }}</td>
            <td>
              <v-btn small icon class="text--primary">
                <v-icon small>create</v-icon>
              </v-btn>
              <v-btn small icon class="text--pink">
                <v-icon small>clear</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        </v-data-table>
      </v-flex>
      <!-- <v-flex md6>
        <data-edit :id="selectedId"/>
      </v-flex> -->
    </v-layout>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import repo from '@/services/repo'
import formatString from '@/services/converter/format'
import DataEdit from '@/components/DataEdit.vue'

const headers = [
  { text: '#', value: '_id' },
  { text: 'Nama', value: 'nama' },
  { text: '', sortable: false }
]

@Component({
  name: 'FsawDataList',
  props: ['dataset', 'keyword'],
  components: {
    DataEdit
  },
  data () {
    return {
      loading: false,
      items: [],
      headers,
      selectedId: undefined
    }
  },
  methods: {
    async loadData (dataset, keyword) {
      this.loading = true
      const items = await repo.findAll(dataset, keyword)
      // this.items = items
      this.items = items.map(p => ({
        ...p,
        format: formatString(p)
      }))
      this.loading = false
    },
    async reload () {
      await this.loadData(this.dataset, this.keyword)
    }
  },
  mounted () {
    this.reload()
  },
  watch: {
    keyword: function (val) {
      this.loadData(this.dataset, val)
    },
    dataset: function (val) {
      this.loadData(val, this.keyword)
    }
  }
})
export default class FsawDataList extends Vue {}
</script>

<style>

</style>
