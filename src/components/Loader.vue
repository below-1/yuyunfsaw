<template>
  <v-container fluid class="fsaw-loader" v-if="show">
    <v-layout justify-center align-center style="padding: 140px;">
      <v-progress-circular width="16" size="120" indeterminate color="cyan"/>
    </v-layout>
  </v-container>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Loader',
  props: ['show']
})
export default class Loader extends Vue {}
</script>

<style lang="scss">
  .fsaw-loader {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 500;
    background: rgba(250, 250, 250, .9);
  }
</style>
