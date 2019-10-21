<template>
  <div class="container">
    <div v-if="isLoading">
      <app-loading></app-loading>
    </div>
    <div v-else-if="postError">
      <div class="alert alert-danger">Error occurs: {{ postError }}</div>
    </div>
    <div v-else>
      <h1 class="mb-4 text-center text-primary">{{ post.title }}</h1>
      <!-- Title -->
      <div class="pb-1 text-center">
        <!-- Author and post info -->
        <img
          :src="post.author.avatar || avatarDefaultSrc"
          :alt="post.author.username"
          class="app--avatar-image"
        >
        <div class="text-primary font-weight-bold">{{ post.author.username }}</div>
        <div class="text-muted">wrote {{ moment(post.updatedAt*1000).fromNow() }}</div>
      </div>
      <div class="d-flex justify-content-center row">
        <!-- Featured image -->
        <img :src="post.featuredImage || postDefaultSrc" :alt="post.title" class="app--post-image">
      </div>
      <div class="app--content-box">
        <div class="border-top mt-4"></div>
        <!-- A horizontal breaking line -->
        <div class="p-2 pt-4" v-html="post.content"></div>
        <h5 class="mb-3">
          <i class="far fa-folder-open"></i>
          <span class="ml-2">Category</span>
          <span class="text-primary font-weight-bold ml-3">{{post.category.name}}</span>
        </h5>
        <div v-if="post.tags && post.tags.length > 0">
          <h5>
            <i class="fas fa-tags"></i>
            <span class="ml-2">Tags</span>
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="ml-2 pl-1 pr-1 mx-1 badge badge-primary"
            >{{ tag.name }}</span>
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import avatarDefault from "@/assets/avatar-default.png";
import postDefault from "@/assets/post-default.jpg";
import Loading from "../modules/Loading.vue";

export default {
  components: {
    appLoading: Loading
  },
  data: () => {
    return {
      isLoading: true,
      avatarDefaultSrc: avatarDefault,
      postDefaultSrc: postDefault,
      moment
    };
  },
  computed: {
    ...mapGetters(["post", "postError"])
  },
  methods: {
    ...mapActions({
      readPost: "readPost"
    })
  },
  async created() {
    const postId = this.$route.params.id;
    try {
      await this.readPost(postId);
      console.log(this.post);
    } finally {
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.app--avatar-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.app--post-image {
  max-width: 300px;
  max-height: 250px;
}
.app--content-box {
  max-width: 600px;
  margin: 15px auto;
}
</style>