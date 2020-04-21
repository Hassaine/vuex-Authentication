import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import { response } from 'express'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    events: null,
    user: JSON.parse(localStorage.getItem('user')) || null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      // axios.defaults.headers.common['Authorization'] = `Bearer ${
      //   userData.token
      // }`
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_IS_LOADING(state, boolState) {
      state.isLoading = boolState
    },
    LOGOUT(state) {
      localStorage.removeItem('user')
      state.user = null
      state.events = null
    }
  },
  actions: {
    fetchEvents({ commit, state }) {
      if (state.events != null) {
        return
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${
        state.user.token
      }`
      commit('SET_IS_LOADING', true)
      axios.get('//localhost:3000/dashboard').then(({ data }) => {
        commit('SET_EVENTS', data.events.events)
        commit('SET_IS_LOADING', false)
      })
    },
    register({ commit }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    login({ commit }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout({ commit }) {
      commit('LOGOUT')
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.user != null ? true : false
    }
  }
})
