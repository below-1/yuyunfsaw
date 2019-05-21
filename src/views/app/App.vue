<template>
  <div>
    <v-navigation-drawer app dark clipped width="220" mini-variant>
      <v-list two-line class="pt-0">
        <v-divider></v-divider>
        <v-list-tile v-for="nav in navItems" :to="nav.path" :key="nav.path">
          <v-list-tile-action>
            <v-icon>{{nav.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{nav.title}}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'MainApp',
  data () {
    return {
      navItems: [
        {
          path: '/',
          icon: 'home',
          title: 'Home'
        },
        {
          path: '/app/data',
          icon: 'list',
          title: 'Data'
        },
        {
          path: '/app/backup',
          icon: 'file_copy',
          title: 'Backup'
        },
        {
          path: '/app/settings',
          icon: 'settings',
          title: 'Settings'
        },
        {
          path: '/app/rank',
          icon: 'title',
          title: 'Ranking'
        },
        {
          path: '/app/sensitivity',
          icon: 'title',
          title: 'Sensitivity'
        },
        {
          path: '/logout',
          icon: 'power_settings_new',
          title: 'Logout'
        }
      ]
    }
  }
})
export default class MainApp extends Vue {}
</script>

<style>

</style>
