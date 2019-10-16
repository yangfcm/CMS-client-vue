<template>
  <div class="d-flex justify-content-center">
    <!-- <a @click="() => { readPostsInPage(2)}">Page</button> -->
    <ul class="pagination">
      <li v-if="totalPages > availPages" class="page-item" :class="{ disabled: currentPage==1}">
        <button class="page-link" @click="() => { readPostsInPage(1) }">&laquo;</button>
      </li>
      <li v-if="totalPages > availPages" class="page-item" :class="{ disabled: currentPage ==1}">
        <button class="page-link" @click="() => { readPostsInPage(currentPage-1)}">&lt;</button>
      </li>
      <li
        v-for="(page, index) in pagesArr"
        :key="index"
        class="page-item"
        :class="{active: page==currentPage}"
      >
        <button class="page-link" @click="() => { readPostsInPage(page)}">{{page}}</button>
      </li>
      <li
        v-if="totalPages > availPages"
        class="page-item"
        :class="{ disabled: currentPage ==totalPages}"
      >
        <button class="page-link" @click="() => { readPostsInPage(currentPage+1)}">&gt;</button>
      </li>
      <li
        v-if="totalPages > availPages"
        class="page-item"
        :class="{ disabled: currentPage==totalPages}"
      >
        <button class="page-link" @click="() => { readPostsInPage(totalPages) }">&raquo;</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { PAGE_SPAN } from "../../settings/config";

export default {
  computed: {
    ...mapGetters(["pagination"]),
    availPages() {
      return PAGE_SPAN * 2 + 1;
    },
    totalPages() {
      return this.pagination.totalPages;
    },
    currentPage() {
      return this.pagination.currentPage;
    },
    pagesArr() {
      const _pagesArr = [];
      const { totalPages, currentPage } = this.pagination;
      if (totalPages === 0) {
        return [];
      }
      const pageEnd =
        currentPage + PAGE_SPAN > totalPages
          ? totalPages
          : currentPage + PAGE_SPAN < this.availPages
          ? this.availPages < totalPages
            ? this.availPages
            : totalPages
          : currentPage + PAGE_SPAN;
      const pageStart =
        currentPage - PAGE_SPAN <= 1
          ? 1
          : totalPages - (currentPage - PAGE_SPAN) + 1 < this.availPages
          ? totalPages - this.availPages >= 0
            ? totalPages - this.availPages + 1
            : 1
          : currentPage - PAGE_SPAN;

      for (let i = pageStart; i <= pageEnd; i++) {
        _pagesArr.push(i);
      }
      return _pagesArr;
    }
  },
  methods: {
    ...mapActions({
      readPosts: "readPosts"
    }),
    async readPostsInPage(page) {
      await this.readPosts(page);
    }
  }
};
</script>

<style scoped>
</style>
