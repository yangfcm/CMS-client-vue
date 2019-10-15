<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-9 col-md-8">Posts</div>
      <div class="col-lg-3 col-md-4">
        <app-categories-list :categories="categories" :error="categoryError"></app-categories-list>
        <div class="my-4"></div>
        <app-tags-list :tags="tags" :error="tagError"></app-tags-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CategoriesList from "../modules/CategoriesList.vue";
import TagsList from "../modules/TagsList.vue";

export default {
  components: {
    appCategoriesList: CategoriesList,
    appTagsList: TagsList
  },
  computed: {
    ...mapGetters([
      "tags",
      "categories",
      "categoryError",
      "tagError",
      "posts",
      "postsError"
    ])
  },
  methods: {
    ...mapActions({
      readCategories: "readCategories",
      readTags: "readTags",
      readPosts: "readPosts"
    })
  },
  async created() {
    await this.readCategories();
    await this.readTags();
  }
};
</script>

<style scoped>
</style>