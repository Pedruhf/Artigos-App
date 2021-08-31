<template>
  <div class="article-item">
    <router-link :to="{ name: 'ArticleById', params: { id: article.id }}">
      <div class="article-item-image d-none d-sm-block">
        <img
          v-if="article.imageUrl"
          :src="article.imageUrl"
          height="150"
          width="150"
          alt="Article Image"
        >
        <img
          v-else
          src="@/assets/article.png"
          height="150"
          width="150"
          alt="Article Image"
        >
      </div>
      <div class="article-item-info">
        <h2>{{ article.name }}</h2>
        <p>{{ article.description }}</p>
        <span class="article-item-author">
          <strong>Autor: {{ article.author }}</strong>
        </span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  props: ['article'],
}
</script>

<style>
.article-item {
  border-radius: 0.5rem;
  margin-bottom: 1.25rem;
  background: #343434;
  padding: 1.25rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 5px solid rgba(0, 0, 0, 0.1);
}

.article-item a {
  text-decoration: none;
  color: #B2B2B2;

  display: flex;
  align-items: flex-start;
}

.article-item-info {
  display: flex;
  align-self: stretch;
  flex-direction: column;
}

.article-item-info h2 {
  font-size: 1.7rem;
}

.article-item-info p {
  flex: 1;
  font-size: 1.1rem;
  color: #909090;
}

.article-item-info span {
  color: #B5B5B5;
}

.article-item-image {
  padding-right: 1.25rem;
  margin-right: 1.25rem;
  border-right: 1px solid #808080;
}

.article-item-image img {
  border-radius: 0.3rem;
}
</style>