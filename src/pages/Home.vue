<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-12 p-md-5 p-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Já sou cadastrado</h5>
            <form v-on:submit.prevent="entrar">
              <div class="form-group">
                <label for="signin-email">E-mail</label>
                <input type="email" name="signin-email" id="signin-email" class="form-control">
              </div>
              <div class="form-group">
                <label for="signin-senha">Senha</label>
                <input type="password" name="signin-senha" id="signin-senha" class="form-control">
              </div>
              <div class="form-row">
                <button type="submit" class="btn btn-primary">Entrar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12 p-md-5 p-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Ainda não tenho cadastro</h5>
            <form v-on:submit.prevent="cadastrar">
              <div class="form-group">
                <label for="signup-nome">Nome completo</label>
                <input type="nome" name="signup-nome" id="signup-nome" class="form-control">
              </div>
              <div class="form-group">
                <label for="signup-email">E-mail</label>
                <input type="email" name="signup-email" id="signup-email" class="form-control">
              </div>
              <div class="form-group">
                <label for="signup-senha">Senha</label>
                <input type="password" name="signup-senha" id="signup-senha" class="form-control">
              </div>
              <div class="form-row">
                <button type="submit" class="btn btn-primary">Cadastrar</button>
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
      signin: {
        email: "",
        senha: ""
      },
      signup: {
        nome: "",
        email: "",
        senha: ""
      }
    };
  },
  methods: {
    entrar() {
      this.$router.push({ name: "dashboard" });
    },
    cadastrar() {
      this.$router.push({ name: "config" });
    }
  }
};
</script>
