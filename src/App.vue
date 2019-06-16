<template>
  <div id="app">
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'config' }">Config</router-link>
      </li>
      <li>
        <button @click.prevent="logout">Sair</button>
      </li>
    </ul>
    <router-view/>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "App",
  methods: {
    logout() {
      const self = this;
      firebase
        .auth()
        .signOut()
        .then(() => {
          self.$router.push({ name: "home" });
        });
    }
  }
};
</script>