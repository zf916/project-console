const state = {
    hCard: {}
  }
  
  // getters
  const getters = {}
  
  // actions
  const actions = {
    hCard({ commit },data) {
        commit('hCard', data)
    }
  }
  
  // mutations
  const mutations = {
    hCard(state, data) {
        console.log(data)
        state.hCard = data
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }