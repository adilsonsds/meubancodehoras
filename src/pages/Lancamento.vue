<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h5 class="mb-4">Faça aqui o lançamento do seu dia de trabalho</h5>
        <form @submit.prevent="salvar">
          <div class="form-group row">
            <label class="col-md-2 col-sm-4 col-form-label" for="dia-entrada">Entrada na empresa</label>
            <div class="col-md-5 col-sm-4 mb-2">
              <input
                type="date"
                id="dia-entrada"
                class="form-control"
                v-model="diaEntradaTrabalho"
                @change="carregarDia"
                required
              >
            </div>
            <div class="col-md-5 col-sm-4">
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
            <label class="col-md-2 col-sm-4 col-form-label" for="dia-saida">Saída da empresa</label>
            <div class="col-md-5 col-sm-4 mb-2">
              <input
                type="date"
                id="dia-saida"
                class="form-control"
                v-model="diaSaidaTrabalho"
                required
              >
            </div>
            <div class="col-md-5 col-sm-4">
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
              <router-link :to="{name: 'dashboard'}" class="btn btn-warning">Cancelar</router-link>
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
import db from "@/firebase/init"
import moment from 'moment'
export default {
  data() {
    return {
      diaEntradaTrabalho: null,
      horaEntradaTrabalho: null,
      diaSaidaTrabalho: null,
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
      let lancamento = this.obterDadosParaSalvar();

      db.collection("usuarios")
        .doc(usuario.email)
        .collection("diasDeTrabalho")
        .doc(this.diaEntradaTrabalho)
        .set(lancamento, { merge: true });

      this.$router.push({ name: "dashboard" });
    },
    obterDadosParaSalvar() {
      let usuario = this.$store.getters.usuarioAutenticado;
      
      const entradaNoTrabalho = moment(this.diaEntradaTrabalho + 'T' + this.horaEntradaTrabalho)
      const saidaDoTrabalho = moment(this.diaSaidaTrabalho + 'T' + this.horaSaidaTrabalho)
      
      let quantoFicouNosIntervalos = 0;
      this.intervalos.forEach(intervalo => {

          const inicio = moment(this.diaEntradaTrabalho + 'T' + intervalo.horaInicio)
          const fim = moment(this.diaEntradaTrabalho + 'T' + intervalo.horaFim)

          quantoFicouNosIntervalos += fim.diff(inicio, 'minutes')
      });

      const quantoTrabalhou = saidaDoTrabalho.diff(entradaNoTrabalho, 'minutes') - quantoFicouNosIntervalos;
      const quantoDeveriaTrabalhar = moment.duration(usuario.tempoDeTrabalhoPorDia).asMinutes();
      const quantoTabalharMenosQuantoTrabalho = quantoDeveriaTrabalhar - quantoTrabalhou;

      let lancamento = {
        entradaTrabalho: entradaNoTrabalho.toDate(),
        saidaTrabalho: saidaDoTrabalho.toDate(),
        intervalos: this.intervalos,
        quantoDeveriaTrabalhar: quantoDeveriaTrabalhar,
        quantoTrabalhou: quantoTrabalhou,
        quantoTabalharMenosQuantoTrabalho,
      }

      return lancamento;
    },
    carregarDia() {
      const self = this;
      this.diaSaidaTrabalho = this.diaEntradaTrabalho;
      let usuario = this.$store.getters.usuarioAutenticado;

      db.collection("usuarios")
        .doc(usuario.email)
        .collection("diasDeTrabalho")
        .doc(this.diaEntradaTrabalho)
        .get()
        .then(doc => {
          let lancamento = doc.data();
          if (lancamento) {
            self.diaEntradaTrabalho = moment(lancamento.entradaTrabalho.toDate()).format('YYYY-MM-DD');
            self.horaEntradaTrabalho = moment(lancamento.entradaTrabalho.toDate()).format('HH:mm');
            self.intervalos = lancamento.intervalos;

            if (lancamento.saidaTrabalho) {
              self.diaSaidaTrabalho = moment(lancamento.saidaTrabalho.toDate()).format('YYYY-MM-DD');
              self.horaSaidaTrabalho = moment(lancamento.saidaTrabalho.toDate()).format('HH:mm');
            }
          }
        });
    }
  }
};
</script>
