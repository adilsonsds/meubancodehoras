import {
  ObterUsuario
} from "@/services/AuthService";
import { stat } from "fs";

const usuario = ObterUsuario();

export default {
  state: {
    usuarioAutenticado: usuario,
    estaLogado: !!usuario,
    loading: false,
    auth_error: null,
    evento: {},
    participante: {}
  },
  getters: {
    usuarioAutenticado(state) {
      return state.usuarioAutenticado;
    },
    estaLogado(state) {
      return state.estaLogado;
    },
    loading(state) {
      return state.loading;
    },
    authError(state) {
      return state.auth_error;
    },
    evento(state) {
      return state.evento;
    },
    participante(state) {
      return state.participante;
    }
  },
  mutations: {
    login(state) {
      state.loading = true;
      state.auth_error = null;
    },
    loginSuccess(state, dadosUsuario) {
      state.auth_error = null;
      state.estaLogado = true;
      state.loading = false;
      state.usuarioAutenticado = Object.assign({}, dadosUsuario);

      localStorage.setItem('user', JSON.stringify(state.usuarioAutenticado));
    },
    loginFailed(state, dados) {
      state.loading = false;
      state.auth_error = dados.error;
    },
    logout(state) {
      localStorage.removeItem('user');
      state.estaLogado = false;
      state.auth_error = null;
      state.usuarioAutenticado = null;

      //   delete axios.defaults.headers.common["Authorization"];
    },
    updateUser(state, userUpdated) {debugger
      state.usuarioAutenticado = userUpdated;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    }
  }
}
