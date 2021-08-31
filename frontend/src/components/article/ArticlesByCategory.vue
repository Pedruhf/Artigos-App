<template>
  <div class="articles-by-category">
    <PageTitle
      icon="fa fa-folder-o"
      :main="category.name"
      sub="Categoria"
    />
    <ul>
      <li v-for="article in articles" :key="article.id">
        <ArticleItem :article="article"/>
      </li>
    </ul>

    <div class="load-more">
      <b-button v-if="loadMore" class="btn-md" @click="getArticles">Mostrar mais</b-button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../templates/PageTitle.vue";
import ArticleItem from "./ArticleItem.vue";

export default {
  name: "ArticlesByCategory",
  components: {
    PageTitle,
    ArticleItem,
  },

  data() {
    return {
      category: {},
      articles: [],
      page: 1,
      loadMore: true,
    };
  },

  methods: {
    getCategory() {
      const url = `${baseApiUrl}/categories/${this.category.id}`;
      axios.get(url).then((res) => (this.category = res.data));
    },

    getArticles() {
      const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${
        this.page
      }`;
      axios.get(url).then((res) => {
        this.articles = this.articles.concat(res.data);
        this.page++;

        if (res.data.length === 0) {
          this.loadMore = false;
        }
      });
    },
  },

  watch: {
    // Monitora o componente de rotas
    $route(to) {
      this.category.id = to.params.id;
      this.articles = [];
      this.page = 1;
      this.loadMore = true;

      this.getCategory();
      this.getArticles();
    }
  },

  mounted() {
    this.category.id = this.$route.params.id;
    this.getCategory();
    this.getArticles();
  },
};
</script>

<style>
.articles-by-category {
  color: #d0d0d0;
}

.articles-by-category ul {
  list-style-type: none;
  padding: 0;
}

.articles-by-category .load-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 1.5rem;
}
</style>
