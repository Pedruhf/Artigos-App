<template>
  <div class="home">
    <PageTitle
      icon="fa fa-home"
      main="Dashboard"
      sub="Seu Artigo"
    />

    <div class="stats">
      <Stat
        title="Categorias"
        :value="stat.categories"
        icon="fa fa-folder"
        iconColor="#fd5d00"
      />
      <Stat
        title="Artigos"
        :value="stat.articles"
        icon="fa fa-file"
        iconColor="#78c3f5"
      />
      <Stat
        title="Usuários"
        :value="stat.users"
        icon="fa fa-user"
        iconColor="#b1edf0"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../templates/PageTitle.vue";
import Stat from "./Stat.vue";

import axios from "axios";
import { baseApiUrl } from "../../global";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat,
  },

  data() {
    return {
      stat: {},
    };
  },

  methods: {
    getStats() {
      axios.get(`${baseApiUrl}/stats`).then((res) => (this.stat = res.data));
    },
  },

  mounted() {
    this.getStats();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
