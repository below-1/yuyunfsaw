import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Bus from './plugins/bus'
import router from './router'
import './registerServiceWorker'

const VueParticles = require('vue-particles')

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(VueParticles.default)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
