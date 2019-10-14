import Vue from "vue";
import VueRouter from "vue-router";

import Index from "./components/pages/Index.vue";
import Post from "./components/pages/Post.vue";
import PostsInCategory from "./components/pages/PostsInCategory.vue";
import PostsInTag from "./components/pages/PostsInTag.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Index, name: "index" },
  { path: "/post/:id", component: Post, name: "post" },
  {
    path: "/posts/category/:id",
    component: PostsInCategory,
    name: "postInCategory"
  },
  { path: "/posts/tag/:id", component: PostsInTag, name: "postInTag" }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
