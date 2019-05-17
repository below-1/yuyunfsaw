import Vue from 'vue'
import Vuex from 'vuex'
import settings from './services/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datasets: settings.datasets,
    activeDataset: settings.activeDataset,
    data: []
  },
  mutations: {
  },
  actions: {
  },
});
