<template>
  <div class="container">
    <div v-if="isLoading">
      <app-loading></app-loading>
    </div>
    <div v-else-if="postError || categoryError || tagError">
      <div class="alert alert-danger">Error occurs: {{ postError || categoryError || tagError }}</div>
    </div>
    <div v-else class="row">
      <div class="col-lg-9 col-md-8 mb-5" :posts="posts">
        <app-posts-list :posts="posts"></app-posts-list>
        <app-pagination></app-pagination>
      </div>
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
import Pagination from "../modules/Pagination.vue";
import Loading from "../modules/Loading.vue";

export default {
  components: {
    appCategoriesList: CategoriesList,
    appTagsList: TagsList,
    appPostsList: PostsList,
    appPagination: Pagination,
    appLoading: Loading
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
      await this.readPosts({ page: 1 });
      // await this.$store.dispatch("readPosts", { page: 1 });
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