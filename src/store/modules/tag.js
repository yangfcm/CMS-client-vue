import { READ_TAGS, READ_TAG, OPER_TAG_ERR } from "../types";
import axios from "../../settings/api";

const state = {
  tags: null,
  tag: null,
  error: null
};

const getters = {
  tags: state => state.tags,
  tag: state => state.tag,
  tagError: state => state.error
};

const mutations = {
  READ_TAGS: (state, payload) => {
    state.tags = payload.data;
    state.error = null;
  },
  READ_TAG: (state, payload) => {
    state.tag = payload.data;
    state.error = null;
  },
  OPER_TAG_ERR: (state, payload) => {
    state.error = payload;
  }
};

const actions = {
  readTags: async context => {
    try {
      const response = await axios.get("/api/tags");
      context.commit(READ_TAGS, response.data);
    } catch (e) {
      const errorData = e.response ? e.response.data : e;
      context.commit(OPER_TAG_ERR, errorData.message);
    }
  },
  readTag: async (context, id) => {
    try {
      const response = await axios.get(`/api/tags/${id}`);
      context.commit(READ_TAG, response.data);
    } catch (e) {
      const errorData = e.response ? e.response.data : e;
      context.commit(OPER_CATEGORY_ERR, errorData.message);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
