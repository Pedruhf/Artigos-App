<template>
  <div class="auth-content">
    <div class="auth-modal">
      <h3>SeuArtigo.com</h3>
      <hr>
      <div class="auth-title">
        {{ showSignup ? "Cadastro" : "Login"}}
      </div>
      <input
        v-if="showSignup"
        type="text"
        v-model="user.name"
        placeholder="Nome"
      />
      <input
        type="text"
        name="email"
        v-model="user.email"
        placeholder="E-mail"
      />
      <input
        type="password"
        name="password"
        v-model="user.password"
        placeholder="Senha"
      />
      <input
        v-if="showSignup"
        type="password"
        v-model="user.confirmPassword"
        placeholder="Confirme a senha"
      />

      <b-button v-if="showSignup" @click="signup">Cadastrar</b-button>
      <b-button v-else @click="signin">Entrar</b-button>

      <a href @click.prevent="showSignup = !showSignup">
        <span v-if="showSignup">Já está cadastrado? Acesse a tela de login.</span>
        <span v-else>Ainda não está cadastrado? Cadastre-se aqui.</span>
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Auth",
  data() {
    return {
      showSignup: false,
      user: {},
    };
  },

  methods: {
    signin() {
      const url = `${baseApiUrl}/signin`;
      axios
        .post(url, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        }).catch(showError);
    },

    signup() {
      const url = `${baseApiUrl}/signup`;
      axios.post(url, this.user).then(() => {
        this.$toasted.global.defaultSuccess({
          msg: "Usuário cadastrado com sucesso!",
        });
        this.user = {};
        this.showSignup = false;
      }).catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-modal {
  background: #dedede;
  widows: 350px;
  padding: 2rem;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-modal input {
  border: 1px solid #BBB;
  border-radius: 0.25rem;
  width: 100%;
  margin-bottom: 0.75rem;
  padding: 0.2rem 0.5rem;
}

.auth-modal button {
  align-self: flex-end;
  color: #FFF;
  padding: 0.5rem 1rem;
}

.auth-modal a {
  margin-top: 2rem;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, rgba(120, 120, 120, 0), rgba(120, 120, 120, 0.75), rgba(120, 120, 120, 0))
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 0.7rem;
  margin-bottom: 1rem;
}
</style>
