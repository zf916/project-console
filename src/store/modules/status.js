const state = {
    bookingState: [
        //- (1.已登记/已审核，2.体检中，3.已失效，4.未通过，5.已通过，6.已发证)
        { value: 1, label: '已登记/已审核' },
        { value: 2, label: '体检中' },
        { value: 3, label: '已失效' },
        { value: 4, label: '未通过' },
        { value: 5, label: '已通过' },
        { value: 6, label: '已发证' }
    ]
  }
  
  // getters
  const getters = {}
  
  // actions
  const actions = {
    bookingState({ commit },data) {
        commit('bookingState', data)
    }
  }
  
  // mutations
  const mutations = {
    bookingState(state, data) {
        state.bookingState = data
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }