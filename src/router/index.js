import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Dashboard from '@/pages/Dashboard'
import Config from '@/pages/Config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/config',
      name: 'config',
      component: Config
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ],
  mode: 'history'
})
