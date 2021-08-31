<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
		<Header
			title="SeuArtigo.com"
			:hideToggle="!user"
			:hideUserDropdown="!user"
		/>
		<Menu v-if="user" />
    <Loading v-if="validatingToken" />
		<Content v-else />
		<Footer />
	</div>
</template>

<script>
import Header from "./components/templates/Header.vue";
import Menu from "./components/templates/Menu.vue";
import Content from "./components/templates/Content.vue";
import Footer from "./components/templates/Footer.vue";
import Loading from "./components/templates/Loading.vue";

import { mapState } from "vuex";
import { baseApiUrl, userKey } from "@/global";
import axios from "axios";

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
    Footer,
    Loading,
  },

  data() {
    return {
      validatingToken: true,
    };
  },

  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "Auth" });
        return;
      }

      const url = `${baseApiUrl}/validateToken`;
      const res = await axios.post(url, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
        
        if(this.$mq === "xs" || this.$mq === "sm") {
          this.$store.commit("toggleMenu", false);
        }
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "Auth" });
      }

      this.validatingToken = false;
    },
  },

  computed: {
    ...mapState(["isMenuVisible", "user"]),
  },

  created() {
    this.validateToken();
  }
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-template-rows: 3.75rem 1fr 2.5rem;
  grid-template-columns: 19rem 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>
