import Vuex from 'vuex'

export default () =>
  new Vuex.Store({
    state: {
      user: null,
    },
    getters: {
      user: function(state) {
        return state.user
      },
    },
    mutations: {
      login(state, user) {
        state.user = user
      },
      logout(state) {
        state.user = null
      },
      updateBirthday(state, birthday) {
        state.user.birthday = birthday
      },
    },
    actions: {
      login({ commit }, user) {
        // coerce the time string to a Date object
        if (user.birthday) {
          user.birthday = new Date(user.birthday)
        }

        commit('login', user)
      },
      logout({ commit }) {
        commit('logout')
      },
      updateBirthday({ commit }, birthday) {
        commit('updateBirthday', birthday)
      },
    },
  })
