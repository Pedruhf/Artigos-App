<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Content",
};
</script>

<style>
  .content {
    grid-area: content;
    background: rgb(32, 32, 36);
    padding: 1.25rem;
  }
</style>
