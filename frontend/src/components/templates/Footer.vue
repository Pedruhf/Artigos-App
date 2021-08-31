<template>
  <footer class="footer">
    <span>Copyright &copy <strong>Seu artigo</strong></span>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
.footer {
  grid-area: footer;
  grid-area: #ddd;
  color: #333;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding-right: 0.65rem;
}
</style>
