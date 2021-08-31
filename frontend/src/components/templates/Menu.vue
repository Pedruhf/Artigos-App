<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-md">
      </i>
      <input
        type="text"
        placeholder="Pesquisar"
        v-model="treeFilter"
        class="filter-field"
      />
    </div>
    <Tree
      :data="treeData"
      :options="treeOptions"
      :filter="treeFilter"
      ref="tree"
      />
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { baseApiUrl } from "@/global";
import Tree from "liquor-tree";
import axios from "axios";

export default {
  name: "Menu",
  components: {
    Tree,
  },

  data() {
    return {
      treeData: this.getTreeData(),
      treeOptions: {
        propertyNames: {
          text: "name",
        },
        filter: {
          emptyText: "Categoria não encontrada",
        },
      },
      treeFilter: "",
    };
  },

  methods: {
    getTreeData() {
      const url = `${baseApiUrl}/categories/tree`;
      return axios.get(url).then((res) => res.data);
    },

    onNodeSelect(node) {
      this.$router.push({
        name: "ArticlesByCategory",
        params: { id: node.id },
      });

      if(this.$mq === "xs" || this.$mq === "sm") {
        this.$store.commit("toggleMenu", false);
      }
    },
  },

  computed: {
    ...mapState(["isMenuVisible"]),
  },

  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  },
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #303030, #606060);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.menu a,
.menu a:hover {
  color: #d9d9d9;
  text-decoration: none;
}

.menu .tree-node.selected > .tree-content,
.menu .tree-node .tree-content:hover {
  background: rgba(255, 255, 255, 0.1);
}

.tree-arrow.has-child {
  filter: brightness(2);
}

.menu .menu-filter {
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1.25rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #808080;
}

.menu .menu-filter i {
  color: #aaa;
  margin-right: 0.6rem;
}

.menu input {
  color: #ccc;
  font-size: 1.2rem;
  border: 0;
  outline: 0;
  width: 100%;
  background: transparent;
}

.tree-filter-empty {
  color: #ccc;
  margin-left: 1.25rem;
  font-size: 1.1rem;
}
</style>
