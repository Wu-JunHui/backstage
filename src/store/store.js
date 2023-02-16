import { createStore } from 'vuex'

export default createStore({
  state: {
    barCollapse: false
  },
  mutations: {
    updateBarCollapse(state, payload) {
      state.barCollapse = !state.barCollapse
    }
  }
})
