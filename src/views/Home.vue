<template>
  <div class="main-home">
    <vue-particles color="#dedede"></vue-particles>
    <v-toolbar app dark flat>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          Github
        </v-btn>
        <v-btn flat>
          About Us
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {}
</script>
