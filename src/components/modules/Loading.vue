<template>
  <div class="text-center text-muted">
    <div class="spinner-border text-center" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-if="message">{{ message}}</div>
  </div>
</template>

<script>
export default {
  props: ["message"]
};
</script>

<style scoped>
</style>
