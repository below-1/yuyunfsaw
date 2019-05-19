import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Loader from './components/Loader.vue'
import Bus from './plugins/bus'
import router from './router'
import './registerServiceWorker'

const VueParticles = require('vue-particles')

import { library } from '@fortawesome/fontawesome-svg-core'
import { faFoursquare } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faFoursquare)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('fsaw-loader', Loader)

Vue.config.productionTip = false
Vue.use(Bus)
Vue.use(VueParticles.default)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
