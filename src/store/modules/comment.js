import { READ_COMMENTS, CREATE_COMMENT, OPER_COMMENT_ERR } from "../types";
import axios from "../../settings/api";

const state = {
  comments: null,
  comment: null,
  pagination: null,
  error: null
};

const getters = {
  comments: state => state.comments,
  comment: state => state.comment,
  // This comment here is the new comment just created.

  commentPagination: state => state.pagination,
  commentError: state => state.error
};

const mutations = {
  READ_COMMENTS: (state, payload) => {
    state.comments = payload.data;
    state.pagination = payload.meta;
    state.error = null;
  },
  CREATE_COMMENT: (state, payload) => {
    state.comment = payload.data;
    state.error = null;
  },
  OPER_COMMENT_ERR: (state, payload) => {
    state.error = payload.message;
  }
};

const actions = {
  readComments: async (context, payload) => {
    const { postId, page } = payload;
    const apiUrl = page
      ? `/api/comments/post/${postId}?page={page}`
      : `/api/comments/post/${postId}`;
    try {
      const response = await axios.get(apiUrl);
      context.commit(READ_COMMENTS, response.data);
    } catch (e) {
      const errorData = e.response ? e.response.data : e;
      context.commit(OPER_POST_ERR, errorData.message);
    }
  },
  createComment: async (context, payload) => {}
};

export default {
  state,
  getters,
  actions,
  mutations
};
