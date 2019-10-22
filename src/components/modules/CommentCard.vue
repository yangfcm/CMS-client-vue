<template>
  <div>
    <div class="card mb-3" :class="comment.isNew ? 'border-danger':'bg-light'">
      <div class="card-header d-md-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <img
            :src="comment.author.avatar || avatarDefaultSrc"
            :alt="comment.author.username"
            class="mr-2 app--avatar-image"
          >
          <div>{{ comment.author.firstName }} {{ comment.author.lastName }}</div>
        </div>
        <div>{{ moment(comment.createdAt *1000).format("D MMM YYYY hh:mmA") }}</div>
      </div>
      <div class="card-body">
        <span v-if="comment.isTop" class="badge badge-danger">TOP</span>
        {{ comment.content }}
      </div>
    </div>
    <div v-if="comment.isNew" class="alert alert-danger">Thank you for your comment.</div>
  </div>
</template>

<script>
import moment from "moment";
import avatarDefault from "@/assets/avatar-default.png";

export default {
  props: {
    comment: Object,
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
      moment,
      avatarDefaultSrc: avatarDefault
    };
  }
};
</script>

<style scoped>
.app--avatar-image {
  height: 35px;
  border-radius: 50%;
}
</style>
