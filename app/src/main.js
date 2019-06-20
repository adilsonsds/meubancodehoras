import Vue from 'vue'
import Vuex from 'vuex';
import App from './App'
import storeData from './store';
import router from './router'
import firebase from 'firebase';
import './firebase/init';

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

Vue.use(Vuex);
const store = new Vuex.Store(storeData);

let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: {
        App
      },
      template: '<App/>'
    });
  }
});