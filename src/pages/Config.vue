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
                <div class="input-group">
                  <input
                    type="number"
                    id="tempo-inicial"
                    class="form-control"
                    v-model="saldoInicialEmMinutos"
                    required
                  />
                  <div class="input-group-append">
                    <span class="input-group-text">{{ saldoInicialBancoDeHoras }}</span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="tempo-meta">Minha meta é ficar com:</label>
                <input
                  type="time"
                  id="tempo-meta"
                  class="form-control"
                  v-model="metaBancoDeHoras"
                  required
                />
              </div>
              <div class="form-group">
                <label for="tempo-trabalho">Trabalho x horas por dia:</label>
                <input
                  type="time"
                  id="tempo-trabalho"
                  class="form-control"
                  v-model="tempoDeTrabalhoPorDia"
                  required
                />
              </div>
              <div class="form-group">
                <button type="submit" class="btn btn-primary">Salvar</button>
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
import moment from "moment";
export default {
  data() {
    return {
      saldoBancoDeHoras: 0,
      saldoInicialEmMinutos: null,
      saldoInicialEmMinutosOriginal: null,
      metaBancoDeHoras: null,
      tempoDeTrabalhoPorDia: null
    };
  },
  computed: {
    saldoInicialBancoDeHoras() {
      var duration = moment.duration(parseInt(this.saldoInicialEmMinutos), 'minutes')
      let horas = duration.get('hours')
      let minutos = duration.get('minutes')

      let formatado = moment()
        .startOf('day')
        .add(Math.abs(horas), 'hours')
        .add(Math.abs(minutos), 'minutes')
        .format('HH:mm')
        
      if (horas < 0 || minutos < 0) formatado = '-' + formatado;

      return formatado;
    }
  },
  methods: {
    salvar() {
      let usuario = this.$store.getters.usuarioAutenticado;
      usuario.saldoInicialBancoDeHoras = this.saldoInicialBancoDeHoras;
      usuario.tempoDeTrabalhoPorDia = this.tempoDeTrabalhoPorDia;
      usuario.metaBancoDeHoras = this.metaBancoDeHoras;
      usuario.saldoBancoDeHoras = this.obterSaldoDeHorasAtualizado();

      db.collection("usuarios")
        .doc(usuario.email)
        .set(usuario, { merge: true });

      this.$store.commit("updateUser", usuario);
      this.$router.push({ name: "dashboard" });
    },
    obterSaldoDeHorasAtualizado() {debugger
      let valorAnterior = parseInt(this.saldoInicialEmMinutosOriginal || 0);
      let novoValor = parseInt(this.saldoInicialEmMinutos || 0);
      var saldoParaAplicar = novoValor - valorAnterior;

      return (this.saldoBancoDeHoras || 0) + saldoParaAplicar;
    }
  },
  created() {debugger
    let usuario = this.$store.getters.usuarioAutenticado;
    this.saldoBancoDeHoras = usuario.saldoBancoDeHoras;
    this.saldoInicialEmMinutos = moment.duration(usuario.saldoInicialBancoDeHoras).asMinutes();
    this.saldoInicialEmMinutosOriginal = this.saldoInicialEmMinutos;
    this.tempoDeTrabalhoPorDia = usuario.tempoDeTrabalhoPorDia;
    this.metaBancoDeHoras = usuario.metaBancoDeHoras;
  }
};
</script>
