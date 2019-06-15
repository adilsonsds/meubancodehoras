<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Dashoboard works!</h1>
        <grafico :width="1110" :height="400" :chart-data="datacollection"></grafico>
      </div>
    </div>
  </div>
</template>
<script>
import Grafico from "@/components/Grafico.vue";
import { setTimeout } from 'timers';
export default {
  components: {
    Grafico
  },
  data() {
    return {
      datacollection: null
    };
  },
  mounted() {
    setTimeout(
    this.carregarDadosDoGrafico(), 1000);
  },
  methods: {
    carregarDadosDoGrafico() {
      const dias = ['01/06', '02/06', '03/06', '10/06', '11/06', '13/06'];
      const tempo = 

      this.datacollection = {
        labels: dias,
        datasets: [
          {
            label: "Tempo",
            backgroundColor: "transparent",
            borderColor: "green",
            data: [0, 5, 2, 9, 1, 4]
          }
        ]
      };
    }
  }
};
</script>

