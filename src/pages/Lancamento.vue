<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h5 class="mb-4">Faça aqui o lançamento do seu dia de trabalho</h5>
        <form @submit.prevent="salvar">
          <div class="form-group row">
            <label class="col-md-2 col-sm-4 col-form-label" for="dia">Dia</label>
            <div class="col-md-10 col-sm-8">
              <input type="date" id="dia" class="form-control" v-model="diaDeTrabalho" @change="carregarDia" required>
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-sm-4 col-form-label" for="hora-entrada">Entrada na empresa</label>
            <div class="col-md-10 col-sm-8">
              <input
                type="time"
                id="hora-entrada"
                class="form-control"
                required
                v-model="horaEntradaTrabalho"
              >
            </div>
          </div>
          <div class="form-group row">
            <label class="col-md-2 col-sm-4 col-form-label" for="hora-saida">Saída da empresa</label>
            <div class="col-md-10 col-sm-8">
              <input type="time" id="hora-saida" class="form-control" v-model="horaSaidaTrabalho">
            </div>
          </div>
          <h6 class="my-4">Intervalos</h6>
          <div class="row mb-3" v-for="(intervalo, index) in intervalos" :key="'intervalo-'+index">
            <div class="col-5">
              <div class="form-group row">
                <label class="col-md-2 col-sm-4 col-form-label">Início</label>
                <div class="col-md-10 col-sm-8">
                  <input type="time" class="form-control" v-model="intervalo.horaInicio">
                </div>
              </div>
            </div>
            <div class="col-5">
              <div class="form-group row">
                <label class="col-md-2 col-sm-4 col-form-label">Fim</label>
                <div class="col-md-10 col-sm-8">
                  <input type="time" class="form-control" v-model="intervalo.horaFim">
                </div>
              </div>
            </div>
            <div class="col-2 text-center">
              <div class="d-flex justify-content-center align-items-center">
                <button
                  class="btn btn-danger align-self-center"
                  title="Remover intervalo"
                  @click.prevent="removerIntervalo(index)"
                >X</button>
              </div>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col-12">
              <button
                type="button"
                class="btn btn-secondary"
                @click.prevent="adicionarIntervalo"
              >Adicionar intervalo</button>
              <button type="submit" class="btn btn-primary">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import db from "@/firebase/init";
export default {
  data() {
    return {
      diaDeTrabalho: null,
      horaEntradaTrabalho: null,
      horaSaidaTrabalho: null,
      intervalos: [{ horaInicio: null, horaFim: null }]
    };
  },
  methods: {
    removerIntervalo(index) {
      this.intervalos.splice(index, 1);
    },
    adicionarIntervalo() {
      this.intervalos.push({ horaInicio: null, horaFim: null });
    },
    salvar() {
      let usuario = this.$store.getters.usuarioAutenticado;

      let lancamento = {
        horaEntradaTrabalho: this.horaEntradaTrabalho,
        horaSaidaTrabalho: this.horaSaidaTrabalho,
        intervalos: this.intervalos
      };

      db.collection("usuarios")
        .doc(usuario.email)
        .collection("diasDeTrabalho")
        .doc(this.diaDeTrabalho)
        .set(lancamento, { merge: true });

      this.$router.push({ name: "dashboard" });
    },
    carregarDia() {
      const self = this;
      let usuario = this.$store.getters.usuarioAutenticado;

      db.collection("usuarios")
        .doc(usuario.email)
        .collection("diasDeTrabalho")
        .doc(this.diaDeTrabalho)
        .get()
        .then(doc => {
          let lancamento = doc.data();
          self.horaEntradaTrabalho = lancamento.horaEntradaTrabalho;
          self.horaSaidaTrabalho = lancamento.horaSaidaTrabalho;
          self.intervalos = lancamento.intervalos;
        });
    }
  }
};
</script>
