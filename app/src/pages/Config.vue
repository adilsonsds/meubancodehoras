<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Configurações</h5>
            <h6 class="card-subtitle text-muted mb-4">Aplique as configurações iniciais.</h6>
            <form class="form" v-on:submit.prevent="salvar">
              <div class="form-group">
                <label for="tempo-inicial">Meu banco de horas inicial é:</label>
                <input
                  type="time"
                  id="tempo-inicial"
                  class="form-control"
                  v-model="saldoInicialBancoDeHoras"
                  required
                >
              </div>
              <div class="form-group">
                <label for="tempo-meta">Minha meta é ficar com:</label>
                <input
                  type="time"
                  id="tempo-meta"
                  class="form-control"
                  v-model="metaBancoDeHoras"
                  required
                >
              </div>
              <div class="form-group">
                <label for="tempo-trabalho">Trabalho x horas por dia:</label>
                <input
                  type="time"
                  id="tempo-trabalho"
                  class="form-control"
                  v-model="tempoDeTrabalhoPorDia"
                  required
                >
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Continuar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
export default {
  data() {
    return {
      saldoInicialBancoDeHoras: null,
      metaBancoDeHoras: null,
      tempoDeTrabalhoPorDia: null
    };
  },
  methods: {
    salvar() {
      let usuario = this.$store.getters.usuarioAutenticado;
      usuario.saldoInicialBancoDeHoras = this.saldoInicialBancoDeHoras;
      usuario.tempoDeTrabalhoPorDia = this.tempoDeTrabalhoPorDia;
      usuario.metaBancoDeHoras = this.metaBancoDeHoras;

      db.collection("usuarios")
        .doc(usuario.email)
        .set(usuario, { merge: true });

      this.$store.commit("updateUser", usuario);
      this.$router.push({ name: "dashboard" });
    }
  },
  created() {
    let usuario = this.$store.getters.usuarioAutenticado;
    this.saldoInicialBancoDeHoras = usuario.saldoInicialBancoDeHoras;
    this.tempoDeTrabalhoPorDia = usuario.tempoDeTrabalhoPorDia;
    this.metaBancoDeHoras = usuario.metaBancoDeHoras;
  }
};
</script>
