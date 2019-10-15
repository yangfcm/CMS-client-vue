<template>
  <div>
    <h4 class="text-center mb-3">Categories</h4>
    <div v-if="!error && categories && categories.length===0">
      <div class="alert alert-warning text-center">No Categories</div>
    </div>
    <div v-else-if="error">
      <div class="alert alert-danger text-center">{{ error }}</div>
    </div>
    <div v-else>
      <router-link
        v-for="(category, index) in categories"
        :key="index"
        :to="`/posts/category/${category._id}`"
      >
        <div class="card bg-light mb-2">
          <div class="card-body py-3">
            <h5 class="card-title mb-0 text-center">{{ category.name }}</h5>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories", "error"]
};
</script>

<style scoped>
</style>
