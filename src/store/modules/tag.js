import { READ_TAGS, OPER_TAG_ERR } from "../types";
import axios from "../../settings/api";

const state = {
  tags: null,
  error: null
};

const getters = {
  tags: state => state.tags,
  tagError: state => state.error
};

const mutations = {
  READ_TAGS: (state, payload) => {
    state.tags = payload.data;
    state.error = null;
  },
  OPER_TAG_ERR: (state, payload) => {
    state.error = payload.message;
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
