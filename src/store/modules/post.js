import { READ_POSTS, READ_POST, OPER_POST_ERR } from "../types";
import axios from "../../settings/api";

const state = {
  posts: null,
  pagination: null,
  error: null
};

const getters = {
  posts: state => state.posts,
  post: state => (state.posts ? state.posts[0] : null),
  pagination: state => state.pagination,
  postError: state => state.error
};

const mutations = {
  READ_POSTS: (state, payload) => {
    state.posts = payload.data;
    state.pagination = payload.meta;
    state.error = null;
  },
  READ_POST: (state, payload) => {
    state.posts = [payload.data]; // Put it in the array
    state.error = null;
    state.pagination = null;
  },
  OPER_POST_ERR: (state, payload) => {
    state.error = payload;
  }
};

const actions = {
  readPosts: async (context, payload) => {
    const { page, categoryId, tagId } = payload;
    const currentPage = page || 1;
    let apiUrl = `/api/posts?status=1&page=${currentPage}`;
    // console.log(categoryId);
    if (categoryId) {
      apiUrl += `&category=${categoryId}`;
    }
    if (tagId) {
      apiUrl += `&tag=${tagId}`;
    }
    // console.log(apiUrl);

    try {
      const response = await axios.get(apiUrl);
      context.commit(READ_POSTS, response.data);
    } catch (e) {
      const errorData = e.response ? e.response.data : e;
      context.commit(OPER_POST_ERR, errorData.message);
    }
  },
  readPost: async (context, id) => {
    try {
      const response = await axios.get(`/api/posts/${id}?status=1`);
      context.commit(READ_POST, response.data);
    } catch (e) {
      const errorData = e.response ? e.response.data : e;
      context.commit(OPER_POST_ERR, errorData.message);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
