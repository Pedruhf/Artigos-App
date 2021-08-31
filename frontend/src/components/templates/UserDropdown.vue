<template>
  <div class="user-dropdown">
    <div class="user-button">
      <span class="d-none d-sm-block">{{ user.name }}</span>
      <div class="user-dropdown-img">
        <Gravatar :email="user.email" alt="User"/>
      </div>
      <i class="fa fa-angle-down"></i>
    </div>

    <div class="user-dropdown-content">
      <router-link v-if="user.admin" to="/admin">
        <i class="fa fa-cogs"></i>Administração
      </router-link>
      <a href @click.prevent="logout"><i class="fa fa-sign-out"></i>Sair</a>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userKey } from "@/global";
import Gravatar from "vue-gravatar";

export default {
  name: "UserDropdown",
  components: {
    Gravatar,
  },

  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "Auth" });
    },
  },

  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style>
.user-dropdown {
  position: relative;
  height: 100%;
}

.user-button {
  height: 100%;

  padding: 0 1.25rem;

  display: flex;
  align-items: center;

  color: #8257e6;
  font-weight: 100;

  cursor: pointer;
}

.user-button:hover {
  filter: brightness(0.8);
  background: #242424;
}

.user-dropdown-img {
  margin: 0 0.65rem;
}

.user-dropdown-img > img {
  max-height: 3rem;
  border-radius: 0.5rem;
}

.user-dropdown-content {
  max-width: 11rem;
  min-width: 8rem;

  padding: 0.65rem;

  position: absolute;
  right: 8%;
  z-index: 1;

  background: linear-gradient(to right, #303030, #494949);

  box-shadow: 0px 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.3s linear;
}

.user-dropdown:hover .user-dropdown-content {
  visibility: visible;
  opacity: 1;
}

.user-dropdown-content a {
  text-decoration: none;
  color: #8257e6;
  margin: 0.25rem 0;
}

.user-dropdown-content a:hover {
  text-decoration: none;
  filter: brightness(0.85);
  color: #8257e6;
}
</style>
