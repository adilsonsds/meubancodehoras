<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-12 p-md-5 p-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title mb-4">Já sou cadastrado</h5>
            <button @click.prevent="entrarComGoogle" class="btn" style="color:#FFF;background:#e44a34">
              <i class="fab fa-google" style="font-size: 14px;"></i> | Entrar com Google
            </button>
            <p class="card-text my-2">ou</p>
            <form v-on:submit.prevent="entrar">
              <div class="form-group">
                <label for="signin-email">E-mail</label>
                <input
                  v-model="signin.email"
                  type="email"
                  name="signin-email"
                  id="signin-email"
                  class="form-control"
                  maxlength="100"
                  required
                >
              </div>
              <div class="form-group">
                <label for="signin-senha">Senha</label>
                <input
                  v-model="signin.senha"
                  type="password"
                  name="signin-senha"
                  id="signin-senha"
                  class="form-control"
                  minlength="6"
                  maxlength="20"
                  required
                >
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
            <button @click.prevent="entrarComGoogle" class="btn" style="color:#FFF;background:#e44a34">
              <i class="fab fa-google" style="font-size: 14px;"></i> | Cadastrar com Google
            </button>
            <p class="card-text my-2">ou</p>
            <form v-on:submit.prevent="cadastrar">
              <div class="form-group">
                <label for="signup-nome">Nome completo</label>
                <input
                  v-model="signup.nome"
                  type="nome"
                  name="signup-nome"
                  id="signup-nome"
                  class="form-control"
                  maxlength="100"
                  required
                >
              </div>
              <div class="form-group">
                <label for="signup-email">E-mail</label>
                <input
                  v-model="signup.email"
                  type="email"
                  name="signup-email"
                  id="signup-email"
                  class="form-control"
                  maxlength="100"
                  required
                >
              </div>
              <div class="form-group">
                <label for="signup-senha">Senha</label>
                <input
                  v-model="signup.senha"
                  type="password"
                  name="signup-senha"
                  id="signup-senha"
                  class="form-control"
                  minlength="6"
                  maxlength="20"
                  required
                >
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
import firebase from "firebase";
import db from "@/firebase/init";
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
      const self = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.signin.email, this.signin.senha)
        .then(res => {
          
          db.collection("usuarios")
            .doc(self.signin.email)
            .get()
            .then(doc => {
              self.$store.commit("loginSuccess", doc.data());
              self.$router.push({ name: "dashboard" });
            });
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    cadastrar() {
      const self = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.signup.email, this.signup.senha)
        .then(res => {
          self.cadastrarUsuario(res.user);
        })
        .catch(err => {
          alert("Oops. " + err.message);
        });
    },
    cadastrarUsuario(user) {
      user = user || firebase.auth().currentUser;

      if (!user) return;

      let usuario = {
        nome: user.displayName || this.signup.nome,
        email: user.email,
        urlFoto: user.photoURL
      };

      db.collection("usuarios")
        .doc(usuario.email)
        .set(usuario, { merge: true });

      this.$store.commit("loginSuccess", usuario);
      this.$router.push({ name: "config" });
    },
    entrarComGoogle() {
      const self = this;
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(result => {
          if (result.user) {
            self.cadastrarUsuario(result.user);
          }
        })
        .catch(err => alert("Ops." + err.message));
    }
  }
};
</script>
