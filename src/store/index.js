import Vue from "vue";
import Vuex from "vuex";

import post from "./modules/post";
import comment from "./modules/comment";
import category from "./modules/category";
import tag from "./modules/tag";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    post,
    comment,
    category,
    tag
  }
});
