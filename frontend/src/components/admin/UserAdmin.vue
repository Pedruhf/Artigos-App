<template>
  <div class="user-admin">
    <b-form>
      <input type="hidden" id="user-id" v-model="user.id">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="user-name">
            <b-form-input
              id="user-name"
              v-model="user.name"
              type="text"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome do usuário..."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for="user-email">
            <b-form-input
              id="user-email"
              v-model="user.email"
              type="text"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o e-mail do usuário..."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-form-checkbox
        id="user-admin"
        v-model="user.admin"
        v-if="mode === 'save'"
        class="my-3"
      >
      Administrador
      </b-form-checkbox>

      <b-row v-if="mode === 'save'">
        <b-col md="6" sm="12">
          <b-form-group label="Senha:" label-for="user-password">
            <b-form-input
              id="user-password"
              v-model="user.password"
              type="password"
              required
              placeholder="Informe a senha do usuário..."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Confirmação da senha:" label-for="user-confirmPassword">
            <b-form-input
              id="user-confirmPassword"
              v-model="user.confirmPassword"
              type="password"
              required
              placeholder="Confirme a senha do usuário..."
            >
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col xs="12">
          <b-button
            variant="success"
            v-if="mode === 'save'"
            @click="saveUser"
          >Salvar</b-button>

          <b-button
            variant="danger"
            v-if="mode === 'remove'"
            @click="removeUser"
          >Excluir</b-button>

          <b-button
            class="ml-2"
            @click="reset"
          >Cancelar</b-button>
        </b-col>
      </b-row>

    </b-form>

    <hr class="my-10">

    <b-table hover striped :items="users" :fields="tableFields">
      <template slot="actions" slot-scope="data">
        <b-button
          variant="warning"
          @click="loadUser(data.item)"
          class="mr-2"
        >
        <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadUser(data.item, mode='remove')"
          class="mr-2"
        >
        <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import { showError } from "../../global";

export default {
  name: "UserAdmin",
  data() {
    return {
      mode: "save",
      user: {},
      users: [],
      tableFields: [
        {
          key: "id",
          label: "Código",
          sortable: true,
        },
        {
          key: "name",
          label: "Nome",
          sortable: true,
        },
        {
          key: "email",
          label: "E-mail",
          sortable: true,
        },
        {
          key: "admin",
          label: "Administrador",
          sortable: true,
          formatter: (value) => (value ? "Sim" : "Não"),
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },

  methods: {
    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data;
      });
    },

    reset() {
      this.mode = "save";
      this.user = {};
      this.loadUsers();
    },

    saveUser() {
      const method = this.user.id ? "put" : "post";
      const id = this.user.id ? `/${this.user.id}` : "";
      const url = `${baseApiUrl}/users${id}`;
      axios[method](url, this.user)
        .then(() => {
          this.$toasted.global.defaultSuccess({ msg: "Usuário cadastrado com sucesso!" });
          this.reset();
        })
        .catch(showError);
    },

    removeUser() {
      const id = this.user.id;
      const url = `${baseApiUrl}/users/${id}`;
      axios.delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess({ msg: "Usuário removido com sucesso!" });
          this.reset();
        })
        .catch(showError);
    },

    loadUser(user, mode = "save") {
      this.mode = mode;
      this.user = { ...user };
    },
  },

  mounted() {
    this.loadUsers();
  },
};
</script>

<style>
</style>
