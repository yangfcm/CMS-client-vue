<template>
  <div v-if="!posts || posts.length === 0">
    <div class="alert alert-warning text-center">No Posts found!</div>
  </div>
  <div v-else>
    <app-post-card v-for="(post, index) in posts" :key="index" :post="post"></app-post-card>
  </div>
</template>

<script>
import PostCard from "./PostCard.vue";
export default {
  props: ["posts"],
  components: {
    appPostCard: PostCard
  }
};
</script>

<style scoped>
</style>
