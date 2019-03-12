import Vue from 'vue'
import Vuex from 'vuex'
import card from './modules/card'
import status from './modules/status'
import healthCard from './modules/healthCard'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    card,
    status,
    healthCard
  }
})