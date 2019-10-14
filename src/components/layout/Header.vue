<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top p-3">
    <router-link to="/" class="navbar-brand app--logo">
      <img src="@/assets/logo.png" alt="logo" class="img-fluid mr-2">
      Fan Yang's blog - 杨帆的博客
    </router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
.app--logo {
  display: block;
  margin: 0 auto;
}
.app--logo img {
  max-height: 35px;
}
</style>