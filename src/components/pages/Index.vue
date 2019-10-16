<template>
  <div class="container">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="postError || categoryError || tagError">
      <div class="alert alert-danger">Error occurs: {{ postError || categoryError || tagError }}</div>
    </div>
    <div v-else class="row">
      <app-posts-list class="col-lg-9 col-md-8" :posts="posts"></app-posts-list>
      <div class="col-lg-3 col-md-4">
        <app-categories-list :categories="categories"></app-categories-list>
        <div class="my-4"></div>
        <app-tags-list :tags="tags"></app-tags-list>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CategoriesList from "../modules/CategoriesList.vue";
import TagsList from "../modules/TagsList.vue";
import PostsList from "../modules/PostsList.vue";

export default {
  components: {
    appCategoriesList: CategoriesList,
    appTagsList: TagsList,
    appPostsList: PostsList
  },
  data: () => {
    return {
      isLoading: true
    };
  },
  computed: {
    ...mapGetters([
      "tags",
      "categories",
      "categoryError",
      "tagError",
      "posts",
      "postError"
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
    try {
      await this.readPosts();
      await this.readCategories();
      await this.readTags();
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
</style>