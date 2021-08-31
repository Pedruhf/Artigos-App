<template>
  <div class="category-admin">

    <b-form>
      <input type="hidden" id="category.id" v-model="category.id">

      <b-form-group label="Nome:" label-for="category-name">
        <b-form-input
          id="category-name"
          v-model="category.name"
          type="text"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o nome do usuário..."
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Categoria Pai:" label-for="category-parentId">
        <b-form-select
          v-if="mode === 'save'"
          id="category-parentId"
          :options="categories"
          v-model="category.parentId"
        ></b-form-select>
        <b-form-input
          v-else
          id="category-parentId"
          v-model="categoryPath"
          type="text"
          readonly
        >
        </b-form-input>
      </b-form-group>

    </b-form>

    <b-row class="mb-3">
      <b-col>
        <b-button
          v-if="mode === 'save'"
          class="mr-2"
          variant="success"
          @click="saveCategory"
        >Salvar</b-button>
        <b-button
          v-if="mode === 'remove'"
          class="mr-2"
          variant="danger"
          @click="removeCategory"
        >Remover</b-button>
        <b-button
          @click="reset"
        >Cancelar</b-button>
      </b-col>
    </b-row>

    <b-table hover striped :items="categories" :fields="tableFields">
      <template slot="actions" slot-scope="data">
        <b-button
          variant="warning"
          @click="loadCategory(data.item)"
          class="mr-2"
        >
        <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadCategory(data.item, 'remove')"
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
  name: "CategoryAdmin",
  data() {
    return {
      mode: "save",
      categoryPath: "",
      category: {},
      categories: [],
      tree: [],
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
          key: "path",
          label: "Caminho",
          sortable: true,
        },
        {
          key: "actions",
          label: "Ações",
        },
      ],
    };
  },

  methods: {
    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { ...category, value: category.id, text: category.path };
        });
      });
    },

    loadCategory(category, mode = "save") {
      this.mode = mode;
      this.category = {
        id: category.id,
        name: category.name,
        parentId: category.parentId,
      };
      this.categoryPath = category.path;
    },

    loadTree() {
      const url = `${baseApiUrl}/categories/tree`;
      axios.get(url).then((res) => {
        this.tree = res.data;
      });
    },

    saveCategory() {
      const method = this.category.id ? "put" : "post";
      const id = this.category.id ? `/${this.category.id}` : "";
      const url = `${baseApiUrl}/categories${id}`;
      axios[method](url, this.category)
        .then(() => {
          this.$toasted.global.defaultSuccess({
            msg: "Categoria cadastrada com sucesso!",
          });
          this.reset();
        })
        .catch(showError);
    },

    removeCategory() {
      const id = this.category.id;
      const url = `${baseApiUrl}/categories/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess({
            msg: "Categoria removida com sucesso!",
          });
          this.reset();
        })
        .catch(showError);
    },

    reset() {
      this.mode = "save";
      this.category = {};
      this.loadCategories();
    },
  },

  mounted() {
    this.loadCategories();
    this.loadTree();
  },
};
</script>

<style>
</style>
