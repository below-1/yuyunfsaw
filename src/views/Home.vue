<template>
  <div class="main-home">
    <v-parallax src="/img/bg4.jpg" id="home-parallax">
      <div id="parallax-stack">
        <vue-particles
          :color="particles.color"
          :linesColor="particles.lineColor"
          :linesWidth="particles.lineWidth"
          :particlesNumber="particles.particlesNumber"
        ></vue-particles>
        <div class="inner-container">
          <v-container>
            <v-layout row>
              <v-flex sm6>
                <div class="display-4 font-weight-bold" style="padding-top: 100px;">{{ appName }}</div>
                <div class="headline font-weight-bold">{{ description }}</div>
              </v-flex>
              <v-flex sm6 align-center justify-center>
                <v-layout align-center justify-center fill-height>
                  <font-awesome-icon
                    :icon="['fab', 'foursquare']"
                    class="cyan--text text--darken-3 display-3"
                    style="padding-top: 80px; font-size: 240px !important;"></font-awesome-icon>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>
    </v-parallax>
    <v-footer height="auto" app class="py-4">
      <v-layout row>
        <v-flex xs12>
          <div class="text-xs-center title">Yuyun Sare Ora</div>
        </v-flex>
      </v-layout>
    </v-footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import settings from '@/services/settings'

@Component({
  components: {
    HelloWorld
  },
  data () {
    return {
      appName: settings.appName,
      description: settings.description,
      particles: {
        color: '#00bcd4',
        lineColor: '#00838f',
        lineWidth: '2',
        particlesNumber: 100
      }
    }
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss">
  #home-parallax {
    .v-parallax__content {
      padding: 0 !important;
      background-color: rgba(0, 0, 0, 0.7);
    }
  }

  #parallax-stack {
    position: relative;
    max-height: 500px;

    .inner-container {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 91;
    }

    #particles-js {
      // background-image: url(/img/bg.jpg);
      // background-size: cover;
      height: 100%;
      width: 100%;
      right: 0;
      left: 0;
    }
  }

  #about {
    min-height: 60vh;
  }
</style>

