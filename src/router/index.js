import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase';

import Home from '@/pages/Home'
import Lancamento from '@/pages/Lancamento'
import Dashboard from '@/pages/Dashboard'
import Config from '@/pages/Config'

Vue.use(Router)

const routers = new Router({
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/lancamento',
      name: 'lancamento',
      component: Lancamento,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/config',
      name: 'config',
      component: Config,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ],
  mode: 'history'
});

routers.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/');
  else if (!requiresAuth && currentUser && to.name == 'home') next('dashboard');
  else next();
});

export default routers;