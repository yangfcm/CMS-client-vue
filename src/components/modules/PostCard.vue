<template>
  <div class="container border-bottom mb-4 pb-4">
    <div class="row">
      <div class="col-lg-8 col-md-7 col-12 d-flex flex-column justify-content-around">
        <router-link :to="`/post/${post._id}`">
          <h2>
            {{post.title}}
            <small>
              <span class="badge badge-danger" v-if="post.isTop">TOP</span>
            </small>
          </h2>
        </router-link>
        <div class="pt-3 pb-1">
          <img :src="avatarDefaultSrc" :alt="post.author.username" class="app--avatar-image">
          <span class="text-primary font-weight-bold ml-2">{{post.author.username}}</span>
          wrote {{ moment(post.updatedAt*1000).fromNow() }}
        </div>
      </div>
      <div class="col-lg-4 col-md-5 col-12 d-flex justify-content-center text-center">
        <router-link :to="`/post/${post._id}`">
          <img
            :src="post.featuredImage || postDefaultSrc"
            :alt="post.title"
            class="app--featured-image"
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import avatarDefault from "@/assets/avatar-default.png";
import postDefault from "@/assets/post-default.jpg";
export default {
  props: ["post"],
  data: function() {
    return {
      avatarDefaultSrc: avatarDefault,
      postDefaultSrc: postDefault,
      moment
    };
  }
};
</script>

<style scoped>
.app--avatar-image {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.app--featured-image {
  max-width: 80%;
  height: auto;
}
</style>
