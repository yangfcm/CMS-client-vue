<template>
  <div>
    Index page
    <app-categories-list :categories="categories"></app-categories-list>
    <app-tags-list></app-tags-list>
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
    ...mapGetters(["tags", "categories"])
  },
  methods: {
    ...mapActions({
      readCategories: "readCategories",
      readTags: "readTags"
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