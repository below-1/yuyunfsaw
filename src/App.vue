<template>
  <v-app>
    <v-content>
      <v-toolbar app dense flat dark style="padding-left: 0 !important;">
        <v-toolbar-side-icon>
          <font-awesome-icon size="2x" :icon="['fab', 'foursquare']" class="primary--text text--darken-2"></font-awesome-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title>
          {{ appName }}
        </v-toolbar-title>
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
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import settings from '@/services/settings'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      appName: settings.appName
    }
  }
}
</script>
