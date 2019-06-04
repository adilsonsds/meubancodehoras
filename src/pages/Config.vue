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
                <label for="minha-meta">Minha meta é ficar com:</label>
                <div class="input-group">
                    <input type="number" id="minha-meta" class="form-control" v-model="metaEmMinutos" required>
                    <div class="input-group-prepend">
                        <div class="input-group-text">minutos</div>
                    </div>
                </div>
              </div>
              <div class="form-group">
                <label for="valor-inicial">Meu banco de horas inicial é:</label>
                <div class="input-group">
                    <input type="number" id="valor-inicial" class="form-control" v-model="valorInicial" required>
                    <div class="input-group-prepend">
                        <div class="input-group-text">minutos</div>
                    </div>
                </div>
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
export default {
  data() {
    return {
        metaEmMinutos: 0,
        valorInicial: 0
    };
  },
  methods: {
    salvar() {
      this.$router.push({ name: "dashboard" });
    }
  }
};
</script>
