<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col-sm-6 col-12">
        <h5>Ações rápidas</h5>
        <div class="d-block">
          <button
            class="btn btn-primary mb-2 mr-2"
            @click="registrarEntrada"
          >Registrar dia de trabalho</button>
          <!-- <button class="btn btn-secondary mb-2">Registrar um dia passado de trabalho</button> -->
        </div>
      </div>
      <!-- <div class="col-md-3 col-sm-4 col-12 mb-2">
        <div class="card text-white bg-danger p-3">
          <div class="car-body">
            <div class="card-text">Seu saldo atual é</div>
            <h5 class="card-title m-0">-72 min</h5>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-sm-4 col-12">
        <div class="card text-white bg-success p-3">
          <div class="car-body">
            <div class="card-text">Você ultrapssou sua meta em</div>
            <h5 class="card-title m-0">2 min</h5>
          </div>
        </div>
      </div>-->
    </div>
    <div class="row mb-4">
      <div class="col">
        <h5>Histórico dos lançamentos</h5>
        <grafico :width="1110" :height="400" :chart-data="datacollection"></grafico>
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Dia</th>
                <th scope="col">Hora de entrada</th>
                <th scope="col">Hora de saída</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(dia, index) in diasDeTrabalho" :key="'dia-'+index">
                <td>{{ moment(dia.entradaTrabalho.toDate()).format('DD/MM/YYYY')}}</td>
                <td>{{ moment(dia.entradaTrabalho.toDate()).format('HH:mm')}}</td>
                <td>{{ moment(dia.saidaTrabalho.toDate()).format('HH:mm')}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Grafico from "@/components/Grafico.vue";
import db from "@/firebase/init";
import moment from "moment";
export default {
  components: {
    Grafico
  },
  data() {
    return {
      moment: moment,
      datacollection: null,
      diasDeTrabalho: [],
      showModal: false,
    };
  },
  mounted() {
    this.carregarDadosDoGrafico();
  },
  methods: {
    carregarDadosDoGrafico() {
      const self = this;
      let usuario = this.$store.getters.usuarioAutenticado;

      db.collection("usuarios")
        .doc(usuario.email)
        .collection("diasDeTrabalho")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            let lancamento = doc.data();
            self.diasDeTrabalho.push(lancamento);
          });

          const dias = self.diasDeTrabalho.map(
            d => moment(d.entradaTrabalho.toDate()).format('DD/MM')
          );

          const saldos = self.diasDeTrabalho.map(
            d => d.quantoTabalharMenosQuantoTrabalho * -1
          );

          self.datacollection = {
            labels: dias,
            datasets: [
              {
                label: "Tempo",
                backgroundColor: "transparent",
                borderColor: "green",
                data: saldos
              }
            ]
          };
        });
    },
    registrarEntrada() {
      this.$router.push({ name: "lancamento" });
    }
  }
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
