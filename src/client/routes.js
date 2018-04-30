import axios from 'axios'

import Register from './components/Register.vue'
import Login from './components/Login.vue'
import Birthday from './components/Birthday.vue'
import PartyFoods from './components/PartyFoods.vue'
import Recommendation from './components/Recommendation.vue'

/**
 * @param {Vuex.Store} store the global store instance
 * @return {array.<object>}  The route objects
 */
export default store => {
  /**
   * A route guard applied to routes that require authenticated users
   *
   * @param {object} to   object representation of target route
   * @param {object} from object representation of previous route
   * @param {function} next A callback to proceed or not
   */
  const beforeEnterAuthGuard = (to, from, next) => {
    store.getters.user ? next() : next({ name: 'login' })
  }

  /**
   * A route guard applied to routes that expect _un_authenticated users
   *
   * @param {object} to   object representation of target route
   * @param {object} from object representation of previous route
   * @param {function} next A callback to proceed or not
   */
  const alreadyAuthenticatedGuard = (to, from, next) => {
    const user = store.getters.user
    if (!user) {
      next()
    } else if (!user.birthday) {
      next({ name: 'birthday' })
    } else {
      next({ name: 'food' })
    }
  }

  return [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: alreadyAuthenticatedGuard,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      beforeEnter: alreadyAuthenticatedGuard,
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: Birthday,
      beforeEnter: beforeEnterAuthGuard,
    },
    {
      path: '/party-foods',
      name: 'food',
      component: PartyFoods,
      beforeEnter: beforeEnterAuthGuard,
    },

    {
      path: '/recommendations/:food',
      name: 'recommendation',
      component: Recommendation,
      beforeEnter: beforeEnterAuthGuard,
    },

    // fall-through / 404
    {
      path: '*',
      redirect: {
        name: 'login',
      },
    },

    {
      path: '/',
      redirect: {
        name: 'login',
      },
    },
  ]
}
