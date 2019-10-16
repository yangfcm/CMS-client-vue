<template>
  <div>
    <h4 class="text-center mb-3">Tags</h4>
    <div v-if="tags && !tags.length === 0">
      <div class="alert alert-warning text-center">No Tags</div>
    </div>
    <div v-else>
      <router-link
        v-for="(tag, index) in tags"
        :key="index"
        :to="`/posts/tag/${tag._id}`"
        class="btn btn-outline-primary m-1"
      >{{ tag.name }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["tags", "error"]
};
</script>

<style scoped>
</style>
