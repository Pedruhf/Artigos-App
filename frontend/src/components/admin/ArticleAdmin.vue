<template>
  <div class="article-admin">

    <b-form>
      <input type="hidden" id="article.id" v-model="article.id">

      <b-form-group label="Nome:" label-for="article-name">
        <b-form-input
          id="article-name"
          v-model="article.name"
          type="text"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe o nome do artigo..."
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Descrição:" label-for="article-decription">
        <b-form-input
          id="article-description"
          v-model="article.description"
          type="text"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a descrição do artigo..."
        >
        </b-form-input>
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="article-imageUrl">
        <b-form-input
          id="article-imageUrl"
          v-model="article.imageUrl"
          type="text"
          required
          :readonly="mode === 'remove'"
          placeholder="Informe a URL da imagem..."
        >
        </b-form-input>
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Categoria:" label-for="article-categoryId">
        <b-form-select
          id="article-categoryId"
          :options="categories"
          v-model="article.categoryId"
        ></b-form-select>
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Autor:" label-for="article-userId">
        <b-form-select
          id="article-userId"
          :options="users"
          v-model="article.userId"
        ></b-form-select>
      </b-form-group>

      <b-form-group v-if="mode === 'save'" label="Conteúdo:" label-for="category-content">
        <VueEditor
          v-model="article.content"
          placeholder="Informe o conteúdo do artigo..."
        />
      </b-form-group>

    </b-form>

    <b-row class="mb-3">
      <b-col>
        <b-button
          v-if="mode === 'save'"
          class="mr-2"
          variant="success"
          @click="saveArticle"
        >Salvar</b-button>
        <b-button
          v-if="mode === 'remove'"
          class="mr-2"
          variant="danger"
          @click="removeArticle"
        >Remover</b-button>
        <b-button
          @click="reset"
        >Cancelar</b-button>
      </b-col>
    </b-row>

    <b-table hover striped :items="articles" :fields="tableFields">
      <template slot="actions" slot-scope="data">
        <b-button
          variant="warning"
          @click="loadArticle(data.item)"
          class="mr-2"
        >
        <i class="fa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadArticle(data.item, 'remove')"
          class="mr-2"
        >
        <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

    <b-pagination
      size="md"
      v-model="page"
      :total-rows="count"
      :per-page="limit"
    ></b-pagination>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import { baseApiUrl } from "@/global";
import axios from "axios";
import { showError } from "../../global";

export default {
  name: "ArticleAdmin",
  components: { VueEditor },

  data() {
    return {
      mode: "save",
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
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
          key: "description",
          label: "Descrição",
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
    loadArticles() {
      const url = `${baseApiUrl}/articles?page=${this.page}`;
      axios.get(url).then((res) => {
        this.articles = res.data.data;
        this.count = res.data.count;
        this.limit = res.data.limit;
      });
    },

    loadArticle(article, mode = "save") {
      this.mode = mode;
      const url = `${baseApiUrl}/articles/${article.id}`;
      axios.get(url).then((res) => (this.article = res.data));
    },

    loadCategories() {
      const url = `${baseApiUrl}/categories`;
      axios.get(url).then((res) => {
        this.categories = res.data.map((category) => {
          return { value: category.id, text: category.path };
        });
      });
    },

    loadUsers() {
      const url = `${baseApiUrl}/users`;
      axios.get(url).then((res) => {
        this.users = res.data.map((user) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        });
      });
    },

    saveArticle() {
      const method = this.article.id ? "put" : "post";
      const id = this.article.id ? `/${this.article.id}` : "";
      const url = `${baseApiUrl}/articles${id}`;
      axios[method](url, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess({
            msg: "Artigo cadastrado com sucesso!",
          });
          this.reset();
        })
        .catch(showError);
    },

    removeArticle() {
      const id = this.article.id;
      const url = `${baseApiUrl}/articles/${id}`;
      axios
        .delete(url)
        .then(() => {
          this.$toasted.global.defaultSuccess({
            msg: "Artigo removido com sucesso!",
          });
          this.reset();
        })
        .catch(showError);
    },

    reset() {
      this.mode = "save";
      this.article = {};
      this.loadArticles();
    },
  },

  watch: {
    page() {
      this.loadArticles()
    }
  },

  mounted() {
    this.loadArticles();
    this.loadCategories();
    this.loadUsers();
  },
};
</script>

<style>
</style>
