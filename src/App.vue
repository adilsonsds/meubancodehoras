<template>
  <div id="app">
    <header class="mb-5">
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <router-link :to="{name: 'dashboard'}" class="navbar-brand">Meu Banco de Horas</router-link>
        <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar7">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <!-- <div class="navbar-collapse collapse justify-content-stretch"> -->
          <ul class="navbar-nav ml-auto" v-if="estaLogado">
            <li class="nav-item">
              <router-link :to="{name: 'config'}" class="nav-link">Configurar</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click.prevent="logout">Sair</a>
            </li>
          </ul>
        <!-- </div> -->
      </nav>
    </header>
    <router-view/>
  </div>
</template>
<script>
import firebase from "firebase";
export default {
  name: "App",
  computed: {
    estaLogado() {
      return this.$store.getters.estaLogado;
    }
  },
  methods: {
    logout() {
      const self = this;
      firebase
        .auth()
        .signOut()
        .then(() => {
          self.$store.commit("logout");
          self.$router.push({ name: "home" });
        });
    }
  }
};
</script>