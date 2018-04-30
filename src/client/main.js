import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import AjaxPlugin from './plugins/ajax.js'
import axios from 'axios'

// Proceed to wire up the app
import App from './components/App.vue'
import makeStore from './store.js'
import makeRoutes from './routes'

// Wire plugins before any other actions
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(AjaxPlugin)

// Store
const store = makeStore()

// Routes
const router = new VueRouter({
  routes: makeRoutes(store),
})

// Wire up the Vue instance
const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
