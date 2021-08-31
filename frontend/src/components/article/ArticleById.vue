<template>
  <div class="article-by-id">
    <PageTitle 
      icon="fa fa-file-o"
      :main="article.name"
      :sub="article.description"
    />
    <div class="article-content" v-html="article.content"></div>
  </div>
</template>

<script>
import "highlightjs/styles/dracula.css";
import hljs from "highlightjs/highlight.pack.js";
import { baseApiUrl } from "@/global";
import axios from "axios";
import PageTitle from "../templates/PageTitle.vue";

export default {
  name: "ArticleById",
  components: { PageTitle },

  data() {
    return {
      article: {},
    };
  },

  methods: {
    getArticleById() {
      const id = this.$route.params.id;
      const url = `${baseApiUrl}/articles/${id}`;
      axios.get(url).then((res) => (this.article = res.data));
    },
  },

  mounted() {
    this.getArticleById();
  },

  updated() {
    document.querySelectorAll(".article-content pre").forEach((element) => {
      hljs.highlightBlock(element);
    });
  },
};
</script>

<style>
.article-content {
  background: #343434;
  border-radius: 0.5rem;
  padding: 1.5rem;
  color: #b2b2b2;
}

.article-content pre {
  padding: 1.75rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  background: #1e1e1e;
  color: #fff;
}

.article-content :last-child {
  max-width: 100%;
}

.article-content img {
  margin-bottom: 0;
  border-radius: 50%;
}
</style>
