import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';
import './firebase/init';

import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

let app;
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: {
        App
      },
      template: '<App/>'
    });
  }
});