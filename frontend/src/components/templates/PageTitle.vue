<template>
  <div class="page-title">
    <h1>
      <i v-if="icon" :class="icon"></i>
      <span>{{ main }}</span>
    </h1>
    <h2>{{ sub }}</h2>
    <hr>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: ["icon", "main", "sub"],
};
</script>

<style>
.page-title h1 {
  margin: 0;
}

.page-title h1 {
  color: #D9D9D9;
  margin-top: 0.4rem;
  font-size: 1.3rem;
}

.page-title h1 > span {
  margin-left: 0.5rem;
}

.page-title h2 {
  color: #B2B2B2;
  margin-top: 0.5rem;
  margin-left: 1.7rem;
  font-size: 1.1rem;
}
</style>
