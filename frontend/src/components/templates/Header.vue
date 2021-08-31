<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>

    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>
    
    <UserDropdown v-if="!hideUserDropdown" />
  </header>
</template>

<script>
import UserDropdown from "./UserDropdown.vue";

export default {
  name: "Header",

  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropdown: Boolean,
  },

  components: {
    UserDropdown,
  },

  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa-angle-left"
        : "fa-angle-down";
    },
  },

  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu", undefined);
    },
  },
};
</script>

<style>
.header {
  grid-area: header;
  background: #121214;

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 1.2rem;
  color: #8257e6;
  font-weight: 100;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #8257e6;
  text-decoration: none;
  cursor: pointer;
}

.title a:hover {
  color: #8257e6;
  filter: brightness(0.9);
  text-decoration: none;
}

header.header > a.toggle {
  width: 3.75rem;
  height: 100%;

  color: #8257e6;
  justify-self: flex-start;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
}

header.header > a.toggle:hover {
  filter: brightness(0.7);
  color: #8257e6;
  background: #303030;
}
</style>
