<template>
  <div>
    <h4 class="mb-3">
      <i class="far fa-comment-dots mr-2"></i>
      Comments
    </h4>
    <div v-if="comments && comments.length===0">
      <h5 class="text-center text-muted">No Comment</h5>
    </div>
    <div v-else>
      <app-comment-card v-for="(comment, index) in comments" :key="index" :comment="comment"></app-comment-card>
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";

export default {
  props: ["comments", "newComment", "commentError"],
  components: {
    appCommentCard: CommentCard
  }
};
</script>

<style scoped>
</style>
